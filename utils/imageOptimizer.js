// 图片优化配置
export const IMAGE_OPTIMIZATION = {
  // 背景图片优化建议
  BACKGROUND_IMAGES: {
    'home-background.png': {
      currentSize: '440KB',
      targetSize: '150KB',
      quality: 70,
      format: 'PNG',
      optimization: '压缩到70%质量，保持PNG格式'
    },
    'home-circle.png': {
      currentSize: '352KB',
      targetSize: '120KB',
      quality: 65,
      format: 'PNG',
      optimization: '压缩到65%质量，保持PNG格式'
    },
    'life-topBG.png': {
      currentSize: '257KB',
      targetSize: '100KB',
      quality: 60,
      format: 'PNG',
      optimization: '压缩到60%质量，保持PNG格式'
    },
    'report-backgroundImg.png': {
      currentSize: '160KB',
      targetSize: '80KB',
      quality: 55,
      format: 'PNG',
      optimization: '压缩到55%质量，保持PNG格式'
    }
  },
  
  // 小图片（无需压缩）
  SMALL_IMAGES: [
    'Equip-Earning.png',
    'home-right.png',
    'home-search.svg',
    'back-home.png',
    'login-Logo.png'
  ],
  
  // 压缩后的图片路径映射
  OPTIMIZED_PATHS: {
    'home-background.png': '/static/Home/home-background-optimized.png',
    'home-circle.png': '/static/Home/home-circle-optimized.png',
    'life-topBG.png': '/static/Report/life-topBG-optimized.png',
    'report-backgroundImg.png': '/static/Report/report-backgroundImg-optimized.png'
  }
}

// 获取优化后的图片路径
export function getOptimizedImagePath(originalPath) {
  const fileName = originalPath.split('/').pop()
  return IMAGE_OPTIMIZATION.OPTIMIZED_PATHS[fileName] || originalPath
}

// 检查图片是否需要优化
export function needsOptimization(filePath) {
  const fileName = filePath.split('/').pop()
  return fileName in IMAGE_OPTIMIZATION.BACKGROUND_IMAGES
}
