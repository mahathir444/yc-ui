import fs from 'fs';
import path from 'path';

async function getFolderStats(folderPath, options = {}) {
  let fileCount = 0;
  let totalSize = 0;

  // 标准化排除规则
  const excludePatterns = (options.exclude || []).map((pattern) =>
    typeof pattern === 'string' ? new RegExp(pattern) : pattern
  );

  // 检查路径是否应该被排除
  function shouldExclude(filePath) {
    const relativePath = path.relative(folderPath, filePath);
    return excludePatterns.some((pattern) => pattern.test(relativePath));
  }

  async function traverse(dir) {
    if (shouldExclude(dir)) return; // 排除整个目录

    const entries = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (shouldExclude(fullPath)) continue; // 跳过排除项

      if (entry.isDirectory()) {
        await traverse(fullPath);
      } else if (entry.isFile()) {
        fileCount++;
        const stats = await fs.promises.stat(fullPath);
        totalSize += stats.size;
      }
    }
  }

  await traverse(folderPath);
  return { fileCount, totalSize };
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

// 使用示例 - 排除 node_modules 和所有 .log 文件
getFolderStats('D:/desktop/yc-ui/src/components', {
  exclude: [
    '_shared', // 排除 node_modules 目录
  ],
})
  .then((stats) => {
    console.log(`文件数量: ${stats.fileCount}`);
    console.log(`总大小: ${formatFileSize(stats.totalSize)}`);
  })
  .catch(console.error);
