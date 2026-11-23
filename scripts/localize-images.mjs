import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const IMAGES_DIR = path.join(DOCS_DIR, 'images');

const MIME_TO_EXT = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
  'image/bmp': '.bmp',
  'image/avif': '.avif',
};

const YUQUE_HOST_RE = /^https?:\/\/[^/]*\.(nlark|yuque)\.com\//i;
const IMG_RE = /!\[([^\]]*)\]\((https?:\/\/[^\s)]+)(\s+"[^"]*")?\)/g;

const args = process.argv.slice(2);
const WATCH_MODE = args.includes('--watch') || args.includes('-w');
const STAGED_MODE = args.includes('--staged');
const ALL_REMOTE = args.includes('--all');
const CONCURRENCY = 8;

/** Convert a filesystem path to POSIX slashes for Markdown links. */
function toPosix(p) {
  return p.split(path.sep).join('/');
}

/** Determine whether a URL should be downloaded locally. */
function shouldLocalizeUrl(url) {
  return ALL_REMOTE || YUQUE_HOST_RE.test(url);
}

/** Detect image extension from magic bytes when URL/Content-Type lacks one. */
function detectExtFromBytes(buf) {
  if (buf.length >= 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return '.png';
  }
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return '.jpg';
  }
  if (buf.length >= 4 && buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) {
    return '.gif';
  }
  if (buf.length >= 12 && buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WEBP') {
    return '.webp';
  }
  return '';
}

/** Build a collision-free local filename inside docs/images. */
function buildTargetName(rawUrl, fallbackExt = '.png') {
  const u = new URL(rawUrl);
  let base = decodeURIComponent(path.basename(u.pathname)).replace(/[<>:"/\\|?*]/g, '_');
  if (!base || base === '/') {
    base = 'image';
  }
  let ext = path.extname(base).toLowerCase();
  if (!ext) {
    ext = fallbackExt;
    base = `${base}${ext}`;
  }
  // Yuque filenames already contain timestamp-uuid; prefix hash only for generic names.
  const isUniqueYuqueName = /^\d{10,}-[0-9a-f-]{8,}\.[a-z0-9]+$/i.test(base);
  if (isUniqueYuqueName) {
    return base;
  }
  const shortHash = crypto.createHash('sha1').update(rawUrl).digest('hex').slice(0, 10);
  const stem = path.basename(base, ext);
  return `${stem}-${shortHash}${ext}`;
}

/** Download an image URL with retry and basic validation. */
async function downloadImage(url) {
  let lastErr;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        signal: AbortSignal.timeout(30000),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      const contentType = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
      if (contentType && !contentType.startsWith('image/') && contentType !== 'application/octet-stream') {
        throw new Error(`Unexpected Content-Type: ${contentType}`);
      }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length === 0) {
        throw new Error('Empty response body');
      }
      const ext = MIME_TO_EXT[contentType] || detectExtFromBytes(buf) || '.png';
      return { buf, ext };
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr;
}

/** Run async tasks with bounded concurrency. */
async function mapConcurrent(items, limit, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;
  async function run() {
    while (nextIndex < items.length) {
      const idx = nextIndex++;
      results[idx] = await worker(items[idx], idx);
    }
  }
  const runners = Array.from({ length: Math.min(limit, items.length) }, run);
  await Promise.all(runners);
  return results;
}

const recentlyWritten = new Map();

/** Process a single Markdown file, downloading remote images and rewriting links. */
async function processMarkdownFile(mdPath) {
  const absPath = path.resolve(mdPath);
  if (!fsSync.existsSync(absPath)) {
    return { changed: false, downloaded: 0, savedFiles: [] };
  }

  const content = await fs.readFile(absPath, 'utf8');
  const urls = new Set();
  for (const match of content.matchAll(IMG_RE)) {
    const url = match[2];
    if (shouldLocalizeUrl(url)) {
      urls.add(url);
    }
  }

  if (urls.size === 0) {
    return { changed: false, downloaded: 0, savedFiles: [] };
  }

  await fs.mkdir(IMAGES_DIR, { recursive: true });

  const urlToLocalName = new Map();
  const savedFiles = [];
  let downloaded = 0;
  const urlList = [...urls];

  await mapConcurrent(urlList, CONCURRENCY, async (url) => {
    const tentativeName = buildTargetName(url);
    const tentativeDest = path.join(IMAGES_DIR, tentativeName);
    if (fsSync.existsSync(tentativeDest)) {
      const stat = await fs.stat(tentativeDest);
      if (stat.size > 0) {
        urlToLocalName.set(url, tentativeName);
        return;
      }
    }
    try {
      const { buf, ext } = await downloadImage(url);
      const finalName = buildTargetName(url, ext);
      const finalDest = path.join(IMAGES_DIR, finalName);
      await fs.writeFile(finalDest, buf);
      urlToLocalName.set(url, finalName);
      savedFiles.push(finalDest);
      downloaded++;
    } catch (err) {
      console.error(`[localize-images] 下载失败: ${url} -> ${err.message}`);
    }
  });

  if (urlToLocalName.size === 0) {
    return { changed: false, downloaded: 0, savedFiles: [] };
  }

  const mdDir = path.dirname(absPath);
  const updated = content.replace(IMG_RE, (full, alt, url, title = '') => {
    const localName = urlToLocalName.get(url);
    if (!localName) {
      return full;
    }
    const relPath = toPosix(path.relative(mdDir, path.join(IMAGES_DIR, localName)));
    return `![${alt}](${relPath}${title || ''})`;
  });

  if (updated !== content) {
    recentlyWritten.set(absPath, Date.now());
    await fs.writeFile(absPath, updated, 'utf8');
    const relMd = toPosix(path.relative(ROOT_DIR, absPath));
    console.log(`[localize-images] 已本地化 ${relMd}: 新下载 ${downloaded} 张，共替换 ${urlToLocalName.size} 处链接`);
    return { changed: true, downloaded, savedFiles };
  }

  return { changed: false, downloaded, savedFiles };
}

/** Recursively collect all .md files under dir. */
async function collectMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'images' || entry.name === 'public' || entry.name === 'node_modules') {
        continue;
      }
      files.push(...(await collectMarkdownFiles(full)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

/** Get staged Markdown files under docs/ for git pre-commit. */
function getStagedMarkdownFiles() {
  const out = execFileSync(
    'git',
    ['-c', 'core.quotePath=false', 'diff', '--cached', '--name-only', '--diff-filter=ACM'],
    { cwd: ROOT_DIR, encoding: 'utf8' }
  );
  return out
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('docs/') && line.toLowerCase().endsWith('.md'))
    .map((line) => path.resolve(ROOT_DIR, line));
}

async function runOnce(targetFiles) {
  const files = targetFiles || (await collectMarkdownFiles(DOCS_DIR));
  let totalChanged = 0;
  let totalDownloaded = 0;
  const allSaved = [];
  const modifiedMds = [];

  for (const f of files) {
    const res = await processMarkdownFile(f);
    if (res.changed) {
      totalChanged++;
      modifiedMds.push(f);
    }
    totalDownloaded += res.downloaded;
    allSaved.push(...res.savedFiles);
  }

  return { totalChanged, totalDownloaded, modifiedMds, allSaved };
}

async function startWatch() {
  await runOnce();
  console.log(`[localize-images] 正在监听 ${toPosix(path.relative(ROOT_DIR, DOCS_DIR))}/**/*.md 中的语雀图片...`);

  const timers = new Map();
  const watcher = fsSync.watch(DOCS_DIR, { recursive: true }, (_eventType, filename) => {
    if (!filename || !filename.toLowerCase().endsWith('.md')) {
      return;
    }
    const absPath = path.resolve(DOCS_DIR, filename);
    const writtenAt = recentlyWritten.get(absPath);
    if (writtenAt && Date.now() - writtenAt < 1500) {
      return;
    }

    if (timers.has(absPath)) {
      clearTimeout(timers.get(absPath));
    }
    timers.set(
      absPath,
      setTimeout(() => {
        timers.delete(absPath);
        processMarkdownFile(absPath).catch((err) => {
          console.error(`[localize-images] 处理失败 ${filename}:`, err);
        });
      }, 350)
    );
  });

  const shutdown = () => {
    watcher.close();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

async function main() {
  if (WATCH_MODE) {
    await startWatch();
    return;
  }

  if (STAGED_MODE) {
    const stagedFiles = getStagedMarkdownFiles();
    if (stagedFiles.length === 0) {
      return;
    }
    const { modifiedMds, allSaved } = await runOnce(stagedFiles);
    const toStage = [...new Set([...modifiedMds, ...allSaved])];
    if (toStage.length > 0) {
      execFileSync('git', ['-c', 'core.quotePath=false', 'add', '--', ...toStage], {
        cwd: ROOT_DIR,
        stdio: 'inherit',
      });
    }
    return;
  }

  const filesFlagIdx = args.indexOf('--files');
  let targetFiles = null;
  if (filesFlagIdx !== -1) {
    targetFiles = args.slice(filesFlagIdx + 1).map((p) => path.resolve(p));
  }

  const { totalChanged, totalDownloaded } = await runOnce(targetFiles);
  if (totalChanged === 0 && totalDownloaded === 0) {
    console.log('[localize-images] 未发现需要本地化的语雀远程图片。');
  }
}

main().catch((err) => {
  console.error('[localize-images] 运行出错:', err);
  process.exit(1);
});
