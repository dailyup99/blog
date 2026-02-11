const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// 配置
const docsDir = "./docs";
const imagesDir = "./docs/images";
const imageUrlPrefix = "http://139.196.79.103:9001/myimages/imgs";

// 创建images目录
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// 递归遍历目录获取所有md文件
function getAllMdFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllMdFiles(file));
    } else if (path.extname(file) === ".md") {
      results.push(file);
    }
  });

  return results;
}

// 下载图片
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;

    const file = fs.createWriteStream(filepath);
    protocol
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve(filepath);
        });
      })
      .on("error", (err) => {
        fs.unlink(filepath, () => {}); // 删除失败的文件
        reject(err);
      });
  });
}

// 提取并替换图片链接 - 增强版
async function processMdFiles() {
  const mdFiles = getAllMdFiles(docsDir);
  const imageMap = new Map(); // 存储原链接和新链接的映射
  let totalImagesFound = 0;
  let totalImagesProcessed = 0;

  for (const file of mdFiles) {
    try {
      console.log(`\n处理文件: ${file}`);
      let content = fs.readFileSync(file, "utf8");
      let originalContent = content; // 保存原始内容用于比较

      // 多种图片引用模式的正则表达式
      const patterns = [
        // Markdown 图片语法: ![alt](url)
        /!\[([^\]]*)\]\((http:\/\/139\.196\.79\.103:9001\/myimages\/imgs\/[^\)]+)\)/g,

        // HTML img 标签: <img src="url" />
        /<img[^>]*src=["'](http:\/\/139\.196\.79\.103:9001\/myimages\/imgs\/[^"']+)["'][^>]*>/gi,

        // HTML img 标签换行格式
        /<img\s+([^>]*?)src\s*=\s*["'](http:\/\/139\.196\.79\.103:9001\/myimages\/imgs\/[^"']+)["']([^>]*?)>/gi,
      ];

      for (let i = 0; i < patterns.length; i++) {
        const pattern = patterns[i];
        let match;

        while ((match = pattern.exec(originalContent)) !== null) {
          totalImagesFound++;
          const fullMatch = match[0];
          const imageUrl = match[2] || match[1]; // 根据不同模式获取URL

          if (!imageUrl) continue;

          const filename = path.basename(imageUrl);
          const newFilePath = path.join(imagesDir, filename);
          const relativePath = path.relative(path.dirname(file), newFilePath);

          console.log(`  发现图片: ${imageUrl}`);

          // 如果还没有下载过这张图片
          if (!imageMap.has(imageUrl)) {
            try {
              console.log(`    下载图片...`);
              await downloadImage(imageUrl, newFilePath);
              imageMap.set(imageUrl, relativePath);
              totalImagesProcessed++;
            } catch (error) {
              console.error(`    下载失败:`, error.message);
              continue;
            }
          }

          // 根据不同模式进行替换
          if (fullMatch.startsWith("![")) {
            // Markdown 格式替换
            const altText = match[1] || "";
            content = content.replace(
              fullMatch,
              `![${altText}](${imageMap.get(imageUrl)})`
            );
          } else if (fullMatch.includes("<img")) {
            // HTML 格式替换
            content = content.replace(
              fullMatch,
              `<img src="${imageMap.get(imageUrl)}" />`
            );
          }
        }
      }

      // 如果内容有变化，写回文件
      if (content !== originalContent) {
        fs.writeFileSync(file, content, "utf8");
        console.log(`✓ 完成处理: ${file}`);
      } else {
        console.log(`- 无变化: ${file}`);
      }
    } catch (error) {
      console.error(`处理文件 ${file} 时出错:`, error.message);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("处理完成统计:");
  console.log(`总文件数: ${mdFiles.length}`);
  console.log(`发现图片链接: ${totalImagesFound} 个`);
  console.log(`实际下载图片: ${totalImagesProcessed} 个`);
  console.log(`唯一图片数: ${imageMap.size} 个`);
  console.log("=".repeat(50));
}

// 执行
processMdFiles().catch(console.error);
