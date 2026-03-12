<script>
// 模拟 API 导入，实际项目中请确保 api/api.js 中有对应方法
// import api from '@/api/api.js';

export default {
	data() {
		return {
			phoneValue: '',
			alerts: [],
			// 模拟数据，如果 API 未就绪可用于展示效果
			mockAlerts: [{
				id: 1,
				typeText: 'Abnormal heart rate',
				value: 120,
				start_time: '2023-10-27 10:00:00'
			},
			{
				id: 2,
				typeText: 'Apnea',
				value: 0,
				start_time: '2023-10-27 11:30:00'
			}
			]
		}
	},
	onLoad() {
		// 获取手机号
		this.phoneValue = uni.getStorageSync('phone') || '';
		this.getPersonAlarmFun();
	},
	methods: {
		// 获取告警数据
		async getPersonAlarmFun() {
			try {
				// TODO: 请在 api/api.js 中定义 getPersonAlarm 方法后取消注释
				/*
				const response = await api.getPersonAlarm(this.phoneValue);
				if (response.code == 200) {
				  this.alerts = response.data;
				}
				*/

				// 暂时使用模拟数据或空数组，避免报错
				// 如果想看效果，可以把 this.mockAlerts 赋值给 this.alerts
				// this.alerts = this.mockAlerts; 
				this.alerts = [];

			} catch (error) {
				console.error('获取告警数据失败：', error);
			}
		},

		// 处理告警（模拟）
		handleAlert(alert) {
			uni.showToast({
				title: `已处理: ${alert.typeText}`,
				icon: 'success'
			});
			this.alerts = this.alerts.filter((a) => a.id !== alert.id);
		},

		// 返回上一页
		goBack() {
			uni.navigateBack();
		}
	}
}
</script>

<template>
	<view class="equip-info-container">
		<view class="life-top">
			<view class="life-top-left">
				<image src="/static/Report/life-leftArrow.png" class="life-top-icon" @click="goBack"></image>
			</view>
			<view class="life-Title">Alarm Logs</view>
		</view>

		<view class="alerts-section">
			<view class="alerts-list">
				<block v-if="alerts.length > 0">
					<view v-for="alert in alerts" :key="alert.id" class="alert-card">
						<view class="alert-info">
							<view style="font-size: 30px;">
								⚠️
							</view>
							<view class="alert-level">
								<view class="alert-content">
									<text class="alert-message">{{ alert.typeText }}</text>
									<text v-if="alert.value" class="alert-time">{{ alert.value }} times</text>
								</view>
								<text style="color: #bdb7d0; font-size: 24rpx;">time：{{ alert.start_time }}</text>
							</view>
						</view>
					</view>
				</block>

				<view v-else>
					<text class="no-alerts">No data</text>
				</view>
			</view>
		</view>
	</view>
</template>

<style scoped>
.equip-info-container {
	width: 100%;
	min-height: 100vh;
	padding: 32rpx 0;
	padding-top: var(--status-bar-height);
	box-sizing: border-box;
	position: relative;
	background-color: #eaeef5;
}

.life-top {
	width: 100%;
	height: 100rpx;
	display: flex;
	margin-top: 20rpx;
}

.life-top-left {
	width: 150rpx;
	height: 60rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-radius: 30rpx;
	margin: 20rpx 0 0 0rpx;
	/* background-color: #ececec;	 */
}

.life-top-icon {
	width: 50rpx;
	height: 50rpx;
}

.life-Title {
	font-size: 34rpx;
	color: #000000;
	font-weight: bold;
	margin-left: 110rpx;
	margin-top: 26rpx;
}


.back-arrow {
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 50rpx;
	height: 50rpx;
	/* 增加点击区域 */
	padding: 10rpx;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 40rpx;
	flex-wrap: wrap;
	gap: 20rpx;
}

.title {
	font-size: 40rpx;
	font-weight: bold;
	margin: 0;
}

.alerts-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	margin-top: 40rpx;
}

.alert-card {
	background: rgba(30, 13, 60, 0.85);
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	min-height: 160rpx;
	padding: 20rpx;
	box-sizing: border-box;
}

/* uni-app hover-class */
.alert-card-hover {
	transform: translateY(-2px);
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.alert-info {
	display: flex;
	align-items: center;
	gap: 20rpx;
	width: 100%;
}

.alert-level {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.alert-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 10rpx;
}

.alert-message {
	font-size: 32rpx;
	font-weight: bold;
	color: #fff;
}

.alert-time {
	font-size: 28rpx;
	color: #bdb7d0;
}

.no-alerts {
	display: block;
	text-align: center;
	color: #bdb7d0;
	font-size: 32rpx;
	margin-top: 100rpx;
}
</style>