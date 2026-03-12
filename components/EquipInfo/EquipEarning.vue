<script>
export default {
  data() {
    return {
      // 告警消息列表数据
      alarmMessages: [
        {
          id: 1,
          title: '告警标题告警标题',
          time: '2025-03-17 15:23',
          isSelected: true
        },
        {
          id: 2,
          title: '设备异常告警',
          time: '2025-03-17 14:30',
          isSelected: false
        },
        {
          id: 3,
          title: '睡眠质量异常',
          time: '2025-03-17 13:15',
          isSelected: false
        },
        {
          id: 4,
          title: '心率异常告警',
          time: '2025-03-17 12:45',
          isSelected: false
        },
        {
          id: 5,
          title: '呼吸异常告警',
          time: '2025-03-17 11:20',
          isSelected: false
        },
        {
          id: 6,
          title: '设备离线告警',
          time: '2025-03-17 10:10',
          isSelected: false
        },
        {
          id: 7,
          title: '心率异常告警',
          time: '2025-03-17 12:45',
          isSelected: false
        },
        {
          id: 8,
          title: '呼吸异常告警',
          time: '2025-03-17 11:20',
          isSelected: false
        },
        {
          id: 9,
          title: '设备离线告警',
          time: '2025-03-17 10:10',
          isSelected: false
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<template>
  <scroll-view class="alarm-container" scroll-y="true">
    <!-- 告警消息列表 -->
    <view class="message-list">
      <view 
        v-for="message in alarmMessages" 
        :key="message.id"
        class="message-item"
        :class="{ selected: message.isSelected }"
      >
        <!-- 左侧警告图标 -->
        <view class="icon-container">
          <view class="warning-icon">
            <image src="/static/Report/Equip-Earning.png" class="warning-image" mode="aspectFit"></image>
          </view>
          <!-- 选中状态的虚线边框 -->
          <view v-if="message.isSelected" class="selection-border"></view>
        </view>
        
        <!-- 中间内容区域 -->
        <view class="message-content">
          <text class="message-title">{{ message.title }}</text>
          <text class="message-time">发生时间: {{ message.time }}</text>
        </view>
        
        <!-- 右侧箭头 -->
        <view class="arrow-container">
          <image src="/static/Home/home-right.png" class="arrow-image" mode="aspectFit"></image>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style scoped>
.alarm-container {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

.message-list {
  padding: 20rpx;
  box-sizing: border-box;
}

.message-item {
  display: flex;
  align-items: center;
  background: rgba(45, 27, 78, 0.8);
  border-radius: 20rpx;
  padding: 32rpx;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: 28rpx;
}

.message-item:last-child {
  margin-bottom: 0;
}

.message-item:hover {
  background: rgba(45, 27, 78, 0.9);
  transform: translateY(-2rpx);
}

.message-item.selected {
  background: rgba(45, 27, 78, 1);
}

/* 图标容器 */
.icon-container {
  position: relative;
  margin-right: 30rpx;
  flex-shrink: 0;
}

.warning-icon {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.warning-image {
  width: 100%;
  height: 100%;
}

/* 选中状态的虚线边框 */
.selection-border {
  position: absolute;
  top: -10rpx;
  left: -10rpx;
  right: -10rpx;
  bottom: -10rpx;
  border-radius: 50%;
  pointer-events: none;
}

/* 消息内容区域 */
.message-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15rpx;
  text-align: left;
}

.message-title {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: bold;
  line-height: 1.4;
}

.message-time {
  font-size: 26rpx;
  color: #B0B0B0;
  font-weight: 400;
  line-height: 1.4;
}

/* 右箭头容器 */
.arrow-container {
  margin-left: 20rpx;
  flex-shrink: 0;
}

.arrow-image {
  width: 40rpx;
  height: 40rpx;
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 6rpx;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3rpx;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3rpx;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

</style>