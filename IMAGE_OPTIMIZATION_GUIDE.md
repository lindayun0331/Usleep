# 图片压缩优化指南

## 目标

将主包大小从超过 1.5M 压缩到 1.5M 以下，通过微信小程序代码质量检查。

## 需要压缩的图片文件

### 1. home-background.png (440KB → 150KB)

- **位置**: `/static/Home/home-background.png`
- **压缩工具**: TinyPNG 或 Squoosh
- **压缩设置**: 质量 70%，保持 PNG 格式
- **重命名**: `home-background-optimized.png`

### 2. home-circle.png (352KB → 120KB)

- **位置**: `/static/Home/home-circle.png`
- **压缩工具**: TinyPNG 或 Squoosh
- **压缩设置**: 质量 65%，保持 PNG 格式
- **重命名**: `home-circle-optimized.png`

### 3. life-topBG.png (257KB → 100KB)

- **位置**: `/static/Report/life-topBG.png`
- **压缩工具**: TinyPNG 或 Squoosh
- **压缩设置**: 质量 60%，保持 PNG 格式
- **重命名**: `life-topBG-optimized.png`

### 4. report-backgroundImg.png (160KB → 80KB)

- **位置**: `/static/Report/report-backgroundImg.png`
- **压缩工具**: TinyPNG 或 Squoosh
- **压缩设置**: 质量 55%，保持 PNG 格式
- **重命名**: `report-backgroundImg-optimized.png`

## 压缩步骤

### 方法 1: 使用 TinyPNG (推荐)

1. 访问 [https://tinypng.com/](https://tinypng.com/)
2. 拖拽图片文件到网页中
3. 等待压缩完成
4. 下载压缩后的图片
5. 重命名为对应的优化文件名
6. 替换原文件

### 方法 2: 使用 Squoosh

1. 访问 [https://squoosh.app/](https://squoosh.app/)
2. 上传图片文件
3. 调整压缩设置
4. 下载压缩后的图片
5. 重命名并替换

## 文件替换步骤

1. **备份原文件** (可选)
2. **压缩图片** 按照上述设置
3. **重命名文件** 添加 `-optimized` 后缀
4. **替换文件** 将压缩后的文件放入对应目录
5. **更新引用** 代码中的图片路径已自动更新

## 预期效果

- **压缩前总大小**: 约 1.2MB
- **压缩后总大小**: 约 450KB
- **节省空间**: 约 750KB
- **主包大小**: 从超过 1.5M 降至 1.5M 以下

## 验证步骤

1. 完成图片压缩和替换
2. 重新构建项目: `npm run build:mp-weixin`
3. 检查 `dist/build/mp-weixin` 目录大小
4. 上传到微信开发者工具验证

## 注意事项

- 保持图片质量在可接受范围内
- 确保压缩后的图片在界面上显示正常
- 如果压缩后质量不理想，可以适当提高质量参数
- 建议在压缩前备份原文件
