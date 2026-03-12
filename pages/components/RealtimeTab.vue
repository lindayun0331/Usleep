<script>
	import {
		request
	} from '../../utils/request';
	import userManager from '../../utils/userManager';
	export default {
		data() {
			return {
				// 添加实时数据获取相关
				realtimeData: [],
				// 离床距离
				distance: 0,
				// 0为'平静',1为'活动'
				status: '0',
				// 0为'离床',1为'在床'
				bedStatus: '0', // 设置为'0'表示离床，用于测试
				// 上次在线时间
				onlineTime: '',
				// 呼吸率
				breathRate: 0,
				// 心率
				heartRate: 0,
				//最大心率
				maxHeartRate: 0,
				//最小心率
				minHeartRate: 0,
				//最大呼吸率
				maxBreathRate: 0,
				//最小呼吸率
				minBreathRate: 0,
				// 离床时长
				leaveDuration: '4时16分钟',
				//是否在加载中
				isLoading: false,
				// 用户手机号
				userPhone: '',
				// 呼吸率折线图数据
				breathingRateData: {
					times: ['23:34', '23:50', '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
						'04:00', '04:30', '05:00', '05:30', '06:00', '06:17', '06:24'
					],
					values: [19, 20, 23, 24, 19, 20, 17, 19, 22, 20, 21, 19, 20, 19, 25, 21, 22],
					// 健康范围：10-25次/分钟
					healthyRange: [10, 25]
				},
				// 心率折线图数据
				heartRateData: {
					times: ['23:34', '23:50', '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30',
						'04:00', '04:30', '05:00', '05:30', '06:00', '06:17', '06:24'
					],
					values: [75, 70, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 84, 82, 80, 78, 76],
					// 健康范围：60-120次/分钟
					healthyRange: [50, 120]
				},
			}
		},
		computed: {
			// 优化时间轴显示，只显示关键时间点
			optimizedBreathingTimes() {
				const times = this.breathingRateData.times || [];
				if (times.length <= 6) return times;

				// 如果时间点太多，只显示首尾和中间几个关键点
				const result = [];
				result.push(times[0]); // 第一个时间点

				// 添加中间的关键时间点
				const step = Math.floor(times.length / 4);
				for (let i = 1; i < 4; i++) {
					const index = i * step;
					if (index < times.length - 1) {
						result.push(times[index]);
					}
				}

				result.push(times[times.length - 1]); // 最后一个时间点
				return result;
			},
			optimizedHeartTimes() {
				const times = this.heartRateData.times || [];
				if (times.length <= 6) return times;

				// 如果时间点太多，只显示首尾和中间几个关键点
				const result = [];
				result.push(times[0]); // 第一个时间点

				// 添加中间的关键时间点
				const step = Math.floor(times.length / 4);
				for (let i = 1; i < 4; i++) {
					const index = i * step;
					if (index < times.length - 1) {
						result.push(times[index]);
					}
				}

				result.push(times[times.length - 1]); // 最后一个时间点
				return result;
			},
		},
		mounted() {
			// 获取用户手机号
			this.getUserPhone();
			// this.getRealtimeData();
			// 页面挂载完成后绘制折线图
			this.$nextTick(() => {
				setTimeout(() => {
					this.drawBreathingRateChart();
					this.drawHeartRateChart();
				}, 100);
			});
		},
		methods: {
			// 获取用户手机号
			getUserPhone() {
				const userInfo = userManager.getUserInfo()
				if (userInfo && userInfo.phone_number) {
					this.userPhone = userInfo.phone_number
				} else {
					this.userPhone = '19040613242'
				}
			},
			// 绘制呼吸率折线图
			drawBreathingRateChart() {
				try {
					const ctx = uni.createCanvasContext('breathingRateChart', this);
					if (!ctx) {
						console.error('Breathing rate chart canvas context creation failed');
						return;
					}

					uni.createSelectorQuery()
						.in(this)
						.select('.chart-canvas')
						.boundingClientRect(rect => {
							if (!rect) return;

							const canvasWidth = rect.width;
							const canvasHeight = 170;
							const padding = 25;
							const chartWidth = canvasWidth - 2 * padding;
							const chartHeight = canvasHeight - 2 * padding;

							// 清空画布
							ctx.clearRect(0, 0, canvasWidth, canvasHeight);

							// 设置背景
							ctx.setFillStyle('#ffffff');
							ctx.fillRect(0, 0, canvasWidth, canvasHeight);

							// 计算数据范围 - 呼吸率固定范围0-30
							const data = this.breathingRateData.values || [];
							const times = this.breathingRateData.times || [];
							if (!data || data.length === 0) {
								return;
							}
							const minValue = 9;
							const maxValue = 26;
							const valueRange = maxValue - minValue;

							// 绘制网格线 - 呼吸率刻度间隔5
							ctx.setStrokeStyle('#240D40');
							ctx.setLineWidth(1);
							for (let i = 0; i <= 6; i++) {
								const y = padding + (chartHeight / 6) * i;
								ctx.beginPath();
								ctx.moveTo(padding, y);
								ctx.lineTo(padding + chartWidth, y);
								ctx.stroke();
							}

							// 绘制Y轴标签 - 呼吸率刻度间隔5
							ctx.setFillStyle('#888');
							ctx.setFontSize(10);
							for (let i = 0; i <= 6; i++) {
								const value = maxValue - (valueRange / 6) * i;
								const y = padding + (chartHeight / 6) * i;
								ctx.fillText(Math.round(value).toString(), 5, y + 3);
							}

							// 绘制健康范围区域
							const healthyMin = this.breathingRateData.healthyRange[0];
							const healthyMax = this.breathingRateData.healthyRange[1];
							const healthyMinY = padding + chartHeight - ((healthyMin - minValue) / valueRange) * chartHeight;
							const healthyMaxY = padding + chartHeight - ((healthyMax - minValue) / valueRange) * chartHeight;

							ctx.setFillStyle('rgba(59, 177, 138, 0.1)');
							ctx.fillRect(padding, healthyMaxY, chartWidth, healthyMinY - healthyMaxY);

							// 绘制健康范围上下限线
							ctx.setStrokeStyle('#3BB18A');
							ctx.setLineWidth(1);
							ctx.setLineDash([3, 3]);

							// 上限线
							ctx.beginPath();
							ctx.moveTo(padding, healthyMaxY);
							ctx.lineTo(padding + chartWidth, healthyMaxY);
							ctx.stroke();

							// 下限线
							ctx.beginPath();
							ctx.moveTo(padding, healthyMinY);
							ctx.lineTo(padding + chartWidth, healthyMinY);
							ctx.stroke();

							// 重置线条样式
							ctx.setLineDash([]);

							// 添加范围标签
							ctx.setFillStyle('#3BB18A');
							ctx.setFontSize(10);
							ctx.fillText(`${healthyMax}`, padding + chartWidth + 5, healthyMaxY + 3);
							ctx.fillText(`${healthyMin}`, padding + chartWidth + 5, healthyMinY + 3);

							// 绘制折线
							ctx.setStrokeStyle('#55CCFA');
							ctx.setLineWidth(2);
							ctx.beginPath();

							data.forEach((value, index) => {
								const x = padding + (index / (data.length - 1)) * chartWidth;
								const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;

								if (index === 0) {
									ctx.moveTo(x, y);
								} else {
									ctx.lineTo(x, y);
								}
							});

							ctx.stroke();

							// 时间轴现在通过HTML组件显示，不再在canvas中绘制

							ctx.draw();
						})
						.exec();
				} catch (error) {
					console.error('Breathing rate chart drawing error:', error);
				}
			},
			// 绘制心率折线图
			drawHeartRateChart() {
				try {
					const ctx = uni.createCanvasContext('heartRateChart', this);
					if (!ctx) {
						console.error('Heart rate chart canvas context creation failed');
						return;
					}

					uni.createSelectorQuery()
						.in(this)
						.select('.chart-canvas')
						.boundingClientRect(rect => {
							if (!rect) return;

							const canvasWidth = rect.width;
							const canvasHeight = 170;
							const padding = 25;
							const chartWidth = canvasWidth - 2 * padding;
							const chartHeight = canvasHeight - 2 * padding;

							// 清空画布
							ctx.clearRect(0, 0, canvasWidth, canvasHeight);

							// 设置背景
							ctx.setFillStyle('#ffffff');
							ctx.fillRect(0, 0, canvasWidth, canvasHeight);

							// 计算数据范围 - 心率固定范围50-130
							const data = this.heartRateData.values || [];
							const times = this.heartRateData.times || [];

							if (!data || data.length === 0) {
								return;
							}
							const minValue = 45;
							const maxValue = 125;
							const valueRange = maxValue - minValue;

							// 绘制网格线 - 心率刻度间隔20
							ctx.setStrokeStyle('#55CCFA');
							ctx.setLineWidth(1);
							for (let i = 0; i <= 4; i++) {
								const y = padding + (chartHeight / 4) * i;
								ctx.beginPath();
								ctx.moveTo(padding, y);
								ctx.lineTo(padding + chartWidth, y);
								ctx.stroke();
							}

							// 绘制Y轴标签 - 心率刻度间隔20
							ctx.setFillStyle('#888');
							ctx.setFontSize(10);
							for (let i = 0; i <= 4; i++) {
								const value = maxValue - (valueRange / 4) * i;
								const y = padding + (chartHeight / 4) * i;
								ctx.fillText(Math.round(value).toString(), 5, y + 3);
							}

							// 绘制健康范围区域
							const healthyMin = this.heartRateData.healthyRange[0];
							const healthyMax = this.heartRateData.healthyRange[1];
							const healthyMinY = padding + chartHeight - ((healthyMin - minValue) / valueRange) * chartHeight;
							const healthyMaxY = padding + chartHeight - ((healthyMax - minValue) / valueRange) * chartHeight;

							ctx.setFillStyle('rgba(59, 177, 138, 0.1)');
							ctx.fillRect(padding, healthyMaxY, chartWidth, healthyMinY - healthyMaxY);

							// 绘制健康范围上下限线
							ctx.setStrokeStyle('#3BB18A');
							ctx.setLineWidth(1);
							ctx.setLineDash([3, 3]);

							// 上限线
							ctx.beginPath();
							ctx.moveTo(padding, healthyMaxY);
							ctx.lineTo(padding + chartWidth, healthyMaxY);
							ctx.stroke();

							// 下限线
							ctx.beginPath();
							ctx.moveTo(padding, healthyMinY);
							ctx.lineTo(padding + chartWidth, healthyMinY);
							ctx.stroke();

							// 重置线条样式
							ctx.setLineDash([]);

							// 添加范围标签
							ctx.setFillStyle('#3BB18A');
							ctx.setFontSize(10);
							ctx.fillText(`${healthyMax}`, padding + chartWidth + 5, healthyMaxY + 3);
							ctx.fillText(`${healthyMin}`, padding + chartWidth + 5, healthyMinY + 3);

							// 绘制折线
							ctx.setStrokeStyle('#7E70D0');
							ctx.setLineWidth(2);
							ctx.beginPath();

							data.forEach((value, index) => {
								const x = padding + (index / (data.length - 1)) * chartWidth;
								const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;

								if (index === 0) {
									ctx.moveTo(x, y);
								} else {
									ctx.lineTo(x, y);
								}
							});

							ctx.stroke();


							ctx.draw();
						})
						.exec();
				} catch (error) {
					console.error('Heart rate chart drawing error:', error);
				}
			},
			// 获取实时数据
			async getRealtimeData() {
				this.isLoading = true;
				try {
					const res = await request({
						url: '/web/develop/devices/Admin/getVitalSigns',
						method: 'GET',
						data: {
							phone_number: this.userPhone
						}
					});

					const payload = res && res.data ? res.data : null;

					if (!payload) {
						// 后端无数据时的安全兜底
						this.realtimeData = {};
						this.status = '0';
						this.bedStatus = '0';
						this.onlineTime = '';
						this.breathRate = 0;
						this.heartRate = 0;
						this.distance = 0;
						this.breathingRateData.values = [];
						this.breathingRateData.times = [];
						this.heartRateData.values = [];
						this.heartRateData.times = [];
						this.maxBreathRate = 0;
						this.minBreathRate = 0;
						this.maxHeartRate = 0;
						this.minHeartRate = 0;
						return;
					}
					this.realtimeData = payload;
					console.log('体征数据:', this.realtimeData);

					const {
						activity = '0',
							bedStatus = '0',
							last_online_time = '',
							breath_rate = 0,
							heart_rate = 0,
							distance = 0,
							breath_data = [],
							data_times = [],
							heart_data = [],
							max_breath_rate = 0,
							min_breath_rate = 0,
							max_heart_rate = 0,
							min_heart_rate = 0
					} = payload || {};

					this.status = String(activity);
					this.bedStatus = String(bedStatus);
					this.onlineTime = last_online_time || '';
					this.breathRate = Number(breath_rate) || 0;
					this.heartRate = Number(heart_rate) || 0;
					this.distance = Number(distance) || 0;

					this.breathingRateData.values = Array.isArray(breath_data) ? breath_data : [];
					this.breathingRateData.times = Array.isArray(data_times) ? data_times : [];
					this.heartRateData.values = Array.isArray(heart_data) ? heart_data : [];
					this.heartRateData.times = Array.isArray(data_times) ? data_times : [];

					this.maxBreathRate = Number(max_breath_rate) || 0;
					this.minBreathRate = Number(min_breath_rate) || 0;
					this.maxHeartRate = Number(max_heart_rate) || 0;
					this.minHeartRate = Number(min_heart_rate) || 0;
				} catch (error) {
					console.error('获取实时数据失败:', error);
					uni.showToast({
						title: '获取实时数据失败',
						icon: 'none'
					});
				} finally {
					this.isLoading = false;
					// 数据更新后重新绘制图表
					this.$nextTick(() => {
						setTimeout(() => {
							this.drawBreathingRateChart();
							this.drawHeartRateChart();
						}, 100);
					});
				}
			},
			goBack() {
				uni.navigateBack();
			},
			goHome() {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			}
		},
		//生命周期函数销毁定时器
		beforeDestroy() {
			// 组件销毁前清除定时器
			if (this.timer) {
				clearInterval(this.timer);
			}
		}
	}
</script>

<template>
	<view class="realtime-container">
		<!-- 背景图片 -->
		<view class="life-top">
			<view class="life-top-left">
				<image src="/static/Report/life-leftArrow.png" class="life-top-icon" @click="goBack"></image>
			</view>
			<view class="life-Title">Vital Signs</view>
		</view>
		<!-- 卡片 -->
		<view class="life-status">
			<view class="life-background" :class="{ 'life-background-offbed': bedStatus === '0' }">
				<view class="life-background-text">
					<view class="life-background-distance" v-if="bedStatus === '1'">Distance：{{ distance }}cm</view>
					<view class="life-background-statusTitle">
						{{ status === '0' ? 'calm' : 'activity' }}
					</view>
					<view class="life-background-Currentstatus">{{ bedStatus === '0' ? 'out of bed' : 'in bed' }}</view>
				</view>
			</view>
		</view>
		<!-- 呼吸率折线图 -->
		<view class="breath-card">
			<view class="breath-header">
				<view class="breath-title-group">
					<image src="/static/Report/life-breath.png" class="breath-icon"></image>
					<text class="breath-title">Respiratory rate</text>
				</view>
				<view class="breath-value-group">
					<view class="breath-value-wrap">
						<text class="value-num">{{ breathRate }}</text>
						<text class="value-unit">times</text>
					</view>
					<view class="breath-tag">{{ breathRate < 10 ? 'low' : 'normal' }}</view>
				</view>
			</view>
			<view class="breath-chart">
				<!-- 呼吸率折线图 -->
				<canvas canvas-id="breathingRateChart" class="chart-canvas"
					:style="{width: '100%', height: '170px'}"></canvas>
				<!-- 时间轴 -->
				<view class="chart-timeline">
					<view class="timeline-item" v-for="(time, idx) in optimizedBreathingTimes" :key="idx">
						<text class="timeline-time">{{ time }}</text>
					</view>
				</view>
				<view class="breath-data">
					<view class="breath-data-item">
						<view class="data-row">
							<text class="data-label">Maximum</text>
							<text class="data-value">{{ maxBreathRate }} times</text>
						</view>
						<view class="data-row">
							<text class="data-label">Minimum</text>
							<text class="data-value">{{ minBreathRate }} times</text>
						</view>
						<view class="data-row">
							<text class="data-label">Average</text>
							<text class="data-value">{{ breathRate }} times</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 心率折线图 -->
		<view class="breath-card">
			<view class="breath-header">
				<view class="breath-title-group">
					<image src="/static/Report/life-heart.png" class="breath-icon"></image>
					<text class="breath-title">Heart rate</text>
				</view>
				<view class="breath-value-group">
					<view class="breath-value-wrap">
						<text class="value-num">{{ heartRate }}</text>
						<text class="value-unit">times</text>
					</view>
					<view class="hart-tag">{{ heartRate < 50 ? 'low' : 'normal'}}</view>
				</view>
			</view>
			<view class="breath-chart">
				<canvas canvas-id="heartRateChart" class="chart-canvas"
					:style="{width: '100%', height: '170px'}"></canvas>
				<!-- 时间轴 -->
				<view class="chart-timeline">
					<view class="timeline-item" v-for="(time, idx) in optimizedHeartTimes" :key="idx">
						<text class="timeline-time">{{ time }}</text>
					</view>
				</view>
				<view class="breath-data">
					<view class="breath-data-item">
						<view class="data-row">
							<text class="data-label">Maximum</text>
							<text class="data-value">{{ maxHeartRate }} times</text>
						</view>
						<view class="data-row">
							<text class="data-label">Minimum</text>
							<text class="data-value">{{ minHeartRate }} times</text>
						</view>
						<view class="data-row">
							<text class="data-label">Average</text>
							<text class="data-value">{{ heartRate }} times</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
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
		background-color: rgba(255, 255, 255, 0.1);
	}

	.life-top-icon {
		width: 50rpx;
		height: 50rpx;
	}

	.life-Title {
		font-size: 34rpx;
		color: #000000;
		font-weight: bold;
		margin-left: 130rpx;
		margin-top: 26rpx;
	}

	.life-background-distance {
		font-size: 24rpx;
		opacity: 0.9;
		color: rgba(255, 255, 255, 0.9);
	}

	.life-status {
		width: 800rpx;
		display: flex;
		justify-content: flex-start;
		margin-top: 10rpx;
		margin-bottom: 30rpx;
	}

	.life-background {
		width: 96vw;
		height: 13vh;
		position: relative;
		border-radius: 32rpx;
		overflow: hidden;
		background: linear-gradient(90deg, #7B2FF2 0%, #F357A8 100%);
		margin-left: 2vw;
		transition: background 0.3s ease;
	}

	.life-background-offbed .life-background-icon {
		filter: grayscale(100%) !important;
		opacity: 0.8 !important;
	}

	.life-background-icon {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		object-fit: cover;
	}

	.life-background-text {
		position: absolute;
		left: 32rpx;
		top: 32rpx;
		z-index: 2;
		color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.life-background-statusTitle {
		font-size: 60rpx;
		font-weight: 550;
		margin: 0 0 10rpx 0;
	}

	.life-background-Currentstatus {
		font-size: 28rpx;
		opacity: 0.85;
		margin: 14rpx 0 50rpx 0;
	}

	.life-background-testTime {
		font-size: 26rpx;
		opacity: 0.7;
		color: rgba(255, 255, 255, 0.9);
	}

	.realtime-container {
		width: 100%;
		min-height: 100vh;
		padding: 32rpx 0;
		padding-top: var(--status-bar-height);
		box-sizing: border-box;
		position: relative;
		background-color: #eaeef5;
	}

	.tip-icon {
		width: 25px;
		height: 25px;
		margin-right: 5px;
	}

	.status-leave-duration {
		display: flex;
		justify-content: start;
		color: #fff;
		font-size: 14px;
		width: 80%;
		margin: 10px 0 0 10px;
	}

	.status-distance {
		color: #fff;
		font-size: 12px;
		margin-left: 10px;
		width: 80%;
		display: flex;
		justify-content: start;
	}

	.online-time {
		display: flex;
		justify-content: start;
		color: #fff;
		font-size: 10px;
		width: 80%;
		margin: 10px 0 0 10px;
	}

	.breath-card {
		width: 100%;
		max-width: 680rpx;
		margin: 6px auto 0 auto;
		border-radius: 16px;
		background: #ffffff;
		padding: 10rpx 20rpx 10rpx 24rpx;
	}

	.breath-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 12rpx;
		margin: 12rpx 0 0rpx 0;
	}

	.breath-title-group {
		display: flex;
		align-items: center;
	}

	.breath-value-group {
		display: flex;
		align-items: center;
		margin-right: 24rpx;
	}

	.breath-icon {
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}

	.breath-title {
		font-size: 34rpx;
		color: #fff;
		font-weight: bold;
		margin-right: 100rpx;
	}

	.breath-value-wrap {
		display: flex;
		align-items: flex-end;
		margin-right: 10rpx;
	}

	.value-num {
		color: #6e8ef9;
		font-size: 40rpx;
		font-weight: bold;
		line-height: 1;
	}

	.value-unit {
		color: #6e8ef9;
		font-size: 20rpx; // 单位略小
		margin-left: 2rpx;
		font-weight: 500;
		line-height: 1.2;
	}

	.breath-tag,
	.hart-tag {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
		font-weight: bold;
		color: #fff;
		border-radius: 6px;
		padding: 0 10px;
		height: 22px;
		margin-left: 4px;
		margin-top: 0;
		line-height: 22px;
		box-sizing: border-box;
	}

	.breath-tag {
		background: #5BCEFA;
		font-size: 10px;
		margin-left: 4px;
	}

	.hart-tag {
		background: #be77fe;
	}

	.breath-chart {
		width: 100%;
		height: 500rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #ffffff;
		border-radius: 12rpx;
		box-sizing: border-box;
		padding: 16rpx;
	}

	.chart-canvas {
		border-radius: 8rpx;
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 20rpx;
	}

	.breath-data {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		
	}

	.breath-data-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 85%;
		margin: 0 20px 0 20px;
		padding: 5px;
	}

	.breath-data-item-text {
		color: #5BCEFA;
		font-size: 28rpx;
		font-weight: bold;
		padding: 5px 2px 5px 2px;
		border-radius: 2px;
	}

	.heart-data-item-text {
		color: #BE77FE;
		font-size: 28rpx;
		font-weight: bold;
		padding: 5px 2px 5px 2px;
		border-radius: 2px;
	}

	.data-row {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 10rpx;
		text-align: center;
	}

	.data-label {
		color: #000000;
		font-size: 24rpx;
		font-weight: 500;
		margin-bottom: 8rpx;
		opacity: 0.8;
	}

	.data-value {
		color: #5BCEFA;
		font-size: 34rpx;
		font-weight: bold;
		line-height: 1.2;
	}

	.breath-data-item .data-value {
		color: #5BCEFA;
	}

	.breath-card:last-child .data-value {
		color: #BE77FE;
	}

	.chart-timeline {
		display: flex;
		justify-content: space-around;
		align-items: start;
		border-radius: 0 0 12rpx 12rpx;
		min-height: 30rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 0 16rpx;
	}

	.timeline-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		min-width: 0;
		position: relative;
	}

	.timeline-time {
		font-size: 24rpx;
		color: #000000;
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 100%;
		padding: 4rpx 8rpx;
		border-radius: 6rpx;
	}
</style>