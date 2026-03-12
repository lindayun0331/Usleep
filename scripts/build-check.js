const fs = require('fs');
const path = require('path');

// 检查主包大小的脚本
function checkMainPackageSize() {
  console.log('🔍 检查主包大小...');
  
  const distPath = path.join(__dirname, '../dist/build/mp-weixin');
  
  if (!fs.existsSync(distPath)) {
    console.log('❌ 构建目录不存在，请先运行 npm run build:mp-weixin');
    return;
  }
  
  // 计算主包大小
  const mainPackageSize = calculateDirectorySize(distPath);
  const sizeInMB = (mainPackageSize / (1024 * 1024)).toFixed(2);
  
  console.log(`📦 主包大小: ${sizeInMB}MB`);
  
  if (mainPackageSize > 1.5 * 1024 * 1024) {
    console.log('❌ 主包大小超过1.5MB限制！');
    console.log('💡 建议：');
    console.log('   1. 压缩大图片文件');
    console.log('   2. 使用分包加载');
    console.log('   3. 移除未使用的资源');
  } else {
    console.log('✅ 主包大小符合要求！');
  }
  
  // 显示大文件列表
  console.log('\n📋 大文件列表 (>100KB):');
  listLargeFiles(distPath);
}

function calculateDirectorySize(dirPath) {
  let totalSize = 0;
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        totalSize += calculateDirectorySize(itemPath);
      } else {
        totalSize += stats.size;
      }
    }
  } catch (error) {
    console.error('读取目录失败:', error.message);
  }
  
  return totalSize;
}

function listLargeFiles(dirPath, basePath = '') {
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const relativePath = path.join(basePath, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        listLargeFiles(itemPath, relativePath);
      } else if (stats.size > 100 * 1024) { // 大于100KB
        const sizeInKB = (stats.size / 1024).toFixed(1);
        console.log(`   ${relativePath}: ${sizeInKB}KB`);
      }
    }
  } catch (error) {
    console.error('读取目录失败:', error.message);
  }
}

// 运行检查
if (require.main === module) {
  checkMainPackageSize();
}

module.exports = { checkMainPackageSize };
