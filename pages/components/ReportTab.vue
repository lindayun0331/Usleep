<template>
	<view class="realtime-container">
	  <view class="life-top">
	    <view class="life-top-left">
	      <image src="/static/Report/life-leftArrow.png" class="life-top-icon" @click="goBack"></image>
	    </view>
	    <view class="life-Title">Sleep Report</view>
	  </view>
	  
	  <!-- 时间切换组件 -->
	  <view class="time-switcher">
	    <view class="switcher-container">
	      <view 
	        v-for="(item, index) in timeOptions" 
	        :key="index"
	        class="switcher-item"
	        :class="{ active: currentTimeType === item.value }"
	        @click="switchTimeType(item.value)"
	      >
	        {{ item.label }}
	      </view>
	    </view>
	  </view>
	  
	  <!-- 根据选择的时间类型显示对应的组件 -->
	  <dayReport v-if="currentTimeType === 'day'" />
	  <weekReport v-if="currentTimeType === 'week'" />
	  <monthReport v-if="currentTimeType === 'month'" />
	  <yearReport v-if="currentTimeType === 'year'" />
	</view>
</template>

<script>
import dayReport from '../../components/dayReport.vue'
import weekReport from '../../components/weekReport.vue'
import monthReport from '../../components/monthReport.vue'
import yearReport from '../../components/yearReport.vue' 

export default {
	components: {
		dayReport,
		weekReport,
		monthReport,
		yearReport
	},
	data() {
		return {
			currentTimeType: 'day', // 默认显示日报告
			timeOptions: [
				{ label: 'day', value: 'day' },
				{ label: 'week', value: 'week' },
				{ label: 'month', value: 'month' },
				{ label: 'year', value: 'year' }
			]
		}
	},
	methods: {
		goBack() {
			uni.navigateBack()
		},
		goHome() {
			uni.reLaunch({
				url: '/pages/index/index'
			})
		},
		// 切换时间类型
		switchTimeType(type) {
			this.currentTimeType = type;
		}
	}
}
</script>

<style>
	.realtime-container {
	  width: 100%;
	  min-height: 100vh;
	  padding: 32rpx 0;
	  padding-top: var(--status-bar-height);
	  box-sizing: border-box;
	  position: relative;
	  background-color: #eaeef5;
	}
	.life-top{
	  width: 100%;
	  height: 100rpx;
	  display: flex;
	  margin-top: 20rpx;
	}
	.life-top-left{
	  width: 150rpx;
	  height: 60rpx;
	  display: flex;
	  justify-content: space-around;
	  align-items: center;
	  border-radius: 30rpx;
	  margin:20rpx 0 0 0rpx;
	  background-color: rgba(255,255,255,0.1);
	}
	.life-top-icon{
	  width: 50rpx;
	  height: 50rpx;
	}
	.life-Title{
	  font-size: 34rpx;
	  color: #000000;
	  font-weight: bold;
	  margin-left: 110rpx;
	  margin-top: 26rpx;
	}
	
	/* 时间切换组件样式 */
	.time-switcher {
	  width: 100%;
	  padding: 20rpx 40rpx;
	  box-sizing: border-box;
	  margin-top: 20rpx;
	}
	
	.switcher-container {
	  display: flex;
	  background: rgba(255, 255, 255, 0.1);
	  border-radius: 30rpx;
	  padding: 8rpx;
	  backdrop-filter: blur(10rpx);
	}
	
	.switcher-item {
	  flex: 1;
	  text-align: center;
	  padding: 16rpx 0;
	  color: rgba(0, 0, 0, 0.7);
	  font-size: 28rpx;
	  font-weight: 500;
	  border-radius: 25rpx;
	  transition: all 0.3s ease;
	  cursor: pointer;
	}
	
	.switcher-item.active {
	  background: rgba(255, 255, 255, 0.2);
	  color: #000000;
	  font-weight: bold;
	  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
	}
	
	.switcher-item:not(.active):hover {
	  color: rgba(0, 0, 0, 0.9);
	}
	

</style>