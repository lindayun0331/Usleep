<template>
	<view class="content">
		<view class="main-content">
			<!-- SleepCare Senior字样和欢迎信息 -->
			<view class="header">
				<view class="welcome-box" @click="handleWelcomeClick">
					<text v-if="isLoggedIn" class="welcome-text">
						Welcome，{{ userName }}
					</text>
					<!-- <button v-else class="login-button">
						Login{{userInfo}}
					</button> -->
				</view>
			</view>
			<!-- 中间设备图案 -->
			<view class="center-box">
				<image class="home-equipment" src="/static/Home/home-equipment.png" mode="widthFix"></image>
			</view>
			<!-- 我的设备字样 -->
			<view class="my-device">
				<text class="my-device-title">My device</text>
			</view>
			<!-- 设备状态 -->
			<view class="my-device">
				<!-- <text class="online-count">online</text> -->
				 <text class="offline-count">offline</text>
			</view>
			<!-- 功能卡片 -->
			<view class="card-grid">
				<view class="card" v-for="(item, idx) in cardList" :key="idx" @click="onCardClick(item)">
					<image class="card-icon" :src="item.icon"></image>
					<view class="card-title-row">
						<text class="card-title">{{ item.title }}</text>
					</view>
					<view class="card-desc-row" v-if="item.showDot">
						<text class="card-desc">{{ item.desc }}</text>
						<view class="card-dot"></view>
					</view>
					<text class="card-desc" v-else>{{ item.desc }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TabBar from '../../components/TabBar.vue'
	import userManager from '../../utils/userManager'

	export default {
		components: {
			TabBar
		},
		data() {
			return {
				userInfo: "",
				userName: '', // 默认用户名
				isLoggedIn: false, // 登录状态
				cardList: [{
						id: 1,
						icon: '/static/Home/home-SleepReport.png',
						title: 'Sleep Report',
						desc: 'View sleep report',
						showDot: false
					},
					{
						id: 2,
						icon: '/static/Home/home-LifeSign.png',
						title: 'Vital Signs',
						desc: 'View vital signs',
						showDot: false
					},
					{
						id: 3,
						icon: '/static/Home/home-EquipInfo.png',
						title: 'Alarm Logs',
						desc: 'View alarm Logs',
						showDot: false
					},
					{
						id: 4,
						icon: '/static/Home/home-UserManagement.png',
						title: 'Users',
						desc: 'View user information',
						showDot: false
					}
				]
			}
		},
		mounted() {
			// 页面加载时获取用户信息
			this.getUserInfo()
		},
		onShow() {
			// 页面显示时重新获取用户信息（从登录页面返回时）
			this.getUserInfo()
		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				const userInfo = userManager.getUserInfo()
				if (userInfo) {
					this.userInfo = userInfo
					this.isLoggedIn = true
					if (userInfo.name) {
						this.userName = userInfo.name
					} else if (userInfo.phone_number) {
						// 如果没有姓名，使用手机号后四位
						this.userName = userInfo.phone_number.slice(-4)
					}
				} else {
					this.isLoggedIn = false
					this.userName = ''
				}
			},
			// 去登录
			handleWelcomeClick() {
				// 只有在未登录时才跳转
				if (!this.isLoggedIn) {
					setTimeout(() => {
						console.log("准备跳转到登录页面")
						uni.reLaunch({
							url: '/pages/Login/LoginPage',
							success: function() {
								console.log("跳转成功")
							},
							fail: function(err) {
								console.log("跳转失败:", err)
								uni.showToast({
									title: '跳转失败: ' + JSON.stringify(err),
									icon: 'none',
									duration: 1000
								})
							}
						})
					}, 1000)
				}
			},
			onCardClick(item) {
				switch (item.id) {
					case 1:
						uni.navigateTo({
							url: '/pages/components/ReportTab'
						});
						break;
					case 2:
						uni.navigateTo({
							url: '/pages/components/RealtimeTab'
						});
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/components/EquipInfo'
						});
						break;
					case 4:
						// uni.navigateTo({
						// 	url: '/pages/components/UserManage'
						// });
						break;
					default:
						// 其他情况
						break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100vw;
		/* 计算视口高度减去44px（适配导航栏高度） */
		height: calc(100vh - 44px);
		padding-top: var(--status-bar-height);
		box-sizing: border-box;
		background-color: #eaeef5;
	}

	.main-content {
		position: relative;
		width: 100vw;
		z-index: 1;
		box-sizing: border-box;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 20rpx 24rpx 0 60rpx;
		position: relative;
	}

	.logo-title-box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: 8rpx;
	}

	.login-title-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		margin-bottom: 12rpx;
	}

	.welcome-box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 8rpx;
		padding: 0 15rpx;
		border-radius: 8rpx;
		transition: background-color 0.3s ease;
		cursor: pointer;
	}

	.welcome-box:active {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.welcome-text {
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.8);
		font-weight: bold;
		text-align: left;
		display: block;
		cursor: pointer;
		transition: color 0.3s ease;
	}

	.welcome-text:active {
		color: rgba(0, 0, 0, 1.0);
	}

	.login-button {
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.8);
		font-weight: bold;
		text-align: left;
		background: transparent;
		border: none;
		padding: 10rpx 15rpx;
		margin: 0;
		cursor: pointer;
		transition: color 0.3s ease;
		display: block;
		width: auto;
		height: auto;
		line-height: 1;
		position: relative;
		z-index: 10;

		&::after {
			border: none;
		}

		&:active {
			color: rgba(0, 0, 0, 1.0);
			background-color: rgba(255, 255, 255, 0.1);
		}
	}

	.header-btns {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 16rpx;
	}

	.icon-btn {
		width: 56rpx;
		height: 56rpx;
		opacity: 0.8;
	}

	.center-box {
		width: 80vw;
		height: 80vw;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		transform: scale(1.25);
		transform-origin: top center;
		margin-top: -120rpx;
		margin-left: 10vw;
	}

	.home-circle {
		width: 650rpx;
		height: 650rpx;
		z-index: 1;
	}

	.home-equipment {
		position: absolute;
		top: 300rpx;
		left: 50%;
		width: 500rpx;
		transform: translateX(-50%);
		z-index: 2;
	}

	.my-device {
		width: 100vw;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.my-device-title {
		font-size: 36rpx;
		color: #000000;
		font-weight: 500;
		letter-spacing: 2rpx;
		z-index: 3;
		margin-top: -40rpx;
		font-family: PingFangSC-Medium;
	}

	.online-count {
		color: #27cc4d;
		margin-left: 4rpx;
		white-space: nowrap;
	}
	.offline-count {
		color: #ff3b30;
		margin-left: 4rpx;
		white-space: nowrap;
	}

	.arrow-box {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.arrow {
		font-size: 40rpx;
		color: #fff;
	}

	.arrow-img {
		width: 48rpx;
		height: 48rpx;
		display: block;
	}

	.card-grid {
		width: 690rpx;
		height: 616rpx;
		margin: 40rpx auto 0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		gap: 38rpx;
	}

	.card {
		width: 326rpx;
		height: 289rpx;
		background: rgba(255, 255, 255, 0.7);
		border-radius: 32rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 32rpx 28rpx 24rpx 28rpx;
		box-sizing: border-box;
		position: relative;
	}

	.card-icon {
		width: 80rpx;
		height: 80rpx;
		margin: 20rpx;
	}

	.card-title-row {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 8rpx;
		margin-top: 30rpx;
		justify-content: flex-start;
	}

	.card-title {
		font-size: 32rpx;
		color: #000000;
		font-weight: 500;
	}

	.card-arrow {
		width: 34rpx;
		height: 34rpx;
		margin-left: 4rpx;
	}

	.card-desc-row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.card-desc {
		font-size: 24rpx;
		color: #807093;
	}

	.card-dot {
		width: 14rpx;
		height: 14rpx;
		background: #ff3b30;
		border-radius: 50%;
		margin-left: 8rpx;
	}

	.divider {
		width: 100vw;
		height: 1rpx;
		background-color: #572B83;
		margin: 70rpx auto 0 auto;
	}
</style>