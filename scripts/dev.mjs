import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

const watcher = spawn(process.execPath, [path.join(__dirname, 'localize-images.mjs'), '--watch'], {
  cwd: ROOT_DIR,
  stdio: 'inherit',
});

const vitepressBin = path.join(ROOT_DIR, 'node_modules', 'vitepress', 'bin', 'vitepress.js');
const vpArgs = process.argv.slice(2);
const vitepress = spawn(process.execPath, [vitepressBin, ...vpArgs], {
  cwd: ROOT_DIR,
  stdio: 'inherit',
});

function cleanup() {
  if (!watcher.killed) {
    watcher.kill();
  }
  if (!vitepress.killed) {
    vitepress.kill();
  }
}

vitepress.on('exit', (code) => {
  cleanup();
  process.exit(code ?? 0);
});

process.on('SIGINT', () => {
  cleanup();
  process.exit(0);
});

process.on('SIGTERM', () => {
  cleanup();
  process.exit(0);
});
