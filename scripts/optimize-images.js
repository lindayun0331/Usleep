const fs = require('fs');
const path = require('path');

console.log('🚀 开始图片优化流程...\n');

// 需要优化的图片配置
const IMAGES_TO_OPTIMIZE = [
  {
    name: 'home-background.png',
    path: 'static/Home/home-background.png',
    currentSize: '440KB',
    targetSize: '150KB',
    quality: 70
  },
  {
    name: 'home-circle.png',
    path: 'static/Home/home-circle.png',
    currentSize: '352KB',
    targetSize: '120KB',
    quality: 65
  },
  {
    name: 'life-topBG.png',
    path: 'static/Report/life-topBG.png',
    currentSize: '257KB',
    targetSize: '100KB',
    quality: 60
  },
  {
    name: 'report-backgroundImg.png',
    path: 'static/Report/report-backgroundImg.png',
    currentSize: '160KB',
    targetSize: '80KB',
    quality: 55
  }
];

function showOptimizationGuide() {
  console.log('📋 需要优化的图片列表：\n');
  
  IMAGES_TO_OPTIMIZE.forEach((img, index) => {
    console.log(`${index + 1}. ${img.name}`);
    console.log(`   位置: ${img.path}`);
    console.log(`   当前大小: ${img.currentSize}`);
    console.log(`   目标大小: ${img.targetSize}`);
    console.log(`   建议质量: ${img.quality}%\n`);
  });
  
  console.log('🛠️  优化步骤：\n');
  console.log('1. 使用 TinyPNG (https://tinypng.com/) 压缩图片');
  console.log('2. 将压缩后的图片重命名为 [原文件名]-optimized.png');
  console.log('3. 替换原文件');
  console.log('4. 运行 npm run build:mp-weixin 重新构建');
  console.log('5. 运行 npm run check-size 检查主包大小\n');
  
  console.log('💡 优化建议：');
  console.log('- 使用 TinyPNG 在线压缩，无需安装软件');
  console.log('- 保持图片质量在可接受范围内');
  console.log('- 压缩完成后测试界面显示效果');
  console.log('- 如果质量不理想，可以适当提高质量参数\n');
  
  console.log('📊 预期效果：');
  const totalCurrent = IMAGES_TO_OPTIMIZE.reduce((sum, img) => {
    return sum + parseInt(img.currentSize.replace('KB', ''));
  }, 0);
  const totalTarget = IMAGES_TO_OPTIMIZE.reduce((sum, img) => {
    return sum + parseInt(img.targetSize.replace('KB', ''));
  }, 0);
  const saved = totalCurrent - totalTarget;
  
  console.log(`- 压缩前总大小: ${totalCurrent}KB`);
  console.log(`- 压缩后总大小: ${totalTarget}KB`);
  console.log(`- 节省空间: ${saved}KB`);
  console.log(`- 主包大小: 从超过1.5M降至1.5M以下\n`);
}

function checkCurrentStatus() {
  console.log('🔍 检查当前项目状态...\n');
  
  const staticPath = path.join(__dirname, '../static');
  
  if (!fs.existsSync(staticPath)) {
    console.log('❌ static 目录不存在');
    return;
  }
  
  console.log('✅ static 目录存在');
  
  // 检查大图片文件
  IMAGES_TO_OPTIMIZE.forEach(img => {
    const fullPath = path.join(__dirname, '..', img.path);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      const sizeInKB = (stats.size / 1024).toFixed(1);
      console.log(`📁 ${img.name}: ${sizeInKB}KB`);
    } else {
      console.log(`❌ ${img.name}: 文件不存在`);
    }
  });
  
  console.log('\n');
}

// 主函数
function main() {
  console.log('🎯 微信小程序主包大小优化工具\n');
  
  checkCurrentStatus();
  showOptimizationGuide();
  
  console.log('🚀 开始优化吧！完成后记得运行构建和检查命令。');
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { showOptimizationGuide, checkCurrentStatus };
