<script>
	import {
		request
	} from '../../utils/request';
	export default {
		data() {
			return {
				activeQuestion: null,
				feedbackType: '建议',
				feedbackContent: '',
				contactInfo: '',
				showSuccessToast: false
			}
		},
		computed: {},
		mounted() {},
		methods: {
			// 返回上一页
			goBack() {
				uni.navigateBack();
			},
			// 返回首页
			goHome() {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			},
			// 切换问题展开/收起状态
			toggleQuestion(index) {
				if (this.activeQuestion === index) {
					this.activeQuestion = null;
				} else {
					this.activeQuestion = index;
				}
			},
			// 选择反馈类型
			selectFeedbackType(type) {
				this.feedbackType = type;
			},
			// 提交反馈
			submitFeedback() {
				if (!this.feedbackContent.trim()) {
					uni.showToast({
						title: '请输入反馈内容',
						icon: 'none'
					});
					return;
				}
				
				// 模拟提交反馈
				// console.log('提交反馈:', {
				// 	type: this.feedbackType,
				// 	content: this.feedbackContent,
				// 	contact: this.contactInfo
				// });
				
				// 显示提交成功提示
				uni.showToast({
					title: '反馈提交成功',
					icon: 'success'
				});
				
				// 重置表单
				this.feedbackContent = '';
				this.contactInfo = '';
			}
		}
	}
</script>

<template>
	<view class="user-manage-container">
		<!-- 背景图片 -->
		<image src="https://usleep.will-tec.com/develop/User/img/home-background.png" class="bg-image"
			mode="aspectFill"></image>

		<!-- 顶部导航栏 -->
		<view class="life-top">
			<view class="life-top-left">
				<image src="/static/Report/life-leftArrow.png" class="life-top-icon" @click="goBack"></image>
				<image src="/static/Home/back-home.png" class="life-top-icon" @click="goHome"></image>
			</view>
			<view class="life-Title">帮助与反馈</view>
		</view>

		<!-- 主要内容区 -->
		<view class="policy-container">
			<!-- 页面标题 -->
			<view class="policy-title">帮助中心</view>

			<!-- 常见问题 -->
			<view class="chapter-title">常见问题</view>
			<view class="faq-container">
				<!-- 问题项 -->
				<view class="faq-item" v-for="(item, index) in [
					{
						question: '如何绑定智能设备？',
						answer: '在首页点击"设备管理"，选择"添加设备"，按照提示步骤操作即可完成设备绑定。支持主流智能手环、手表等设备。'
					},
					{
						question: '数据同步失败怎么办？',
						answer: '请检查设备是否正常连接、蓝牙是否开启、网络是否稳定。如果问题依然存在，可以尝试重启设备或小程序。'
					},
					{
						question: '如何查看历史睡眠数据？',
						answer: '在首页点击"睡眠报告"，然后选择"历史记录"即可查看过去7天、30天的睡眠数据和分析报告。'
					},
					{
						question: '如何修改个人信息？',
						answer: '在"我的"页面点击头像或用户名，进入个人信息编辑页面，可以修改昵称、性别、年龄等个人信息。'
					},
					{
						question: '如何开启睡眠提醒功能？',
						answer: '在"我的"页面点击"设置"，选择"睡眠提醒"，设置提醒时间和重复频率即可开启睡眠提醒功能。'
					}
				]" :key="index">
					<view class="faq-question" @click="toggleQuestion(index)">
						<view class="question-text">{{ item.question }}</view>
						<view class="question-icon">
							<image src="/static/Report/down-arrow.png" class="arrow-icon" v-if="activeQuestion !== index"></image>
							<image src="/static/Report/up-arrow.png" class="arrow-icon" v-if="activeQuestion === index"></image>
						</view>
					</view>
					<view class="faq-answer" v-if="activeQuestion === index">
						{{ item.answer }}
					</view>
				</view>
			</view>

			<!-- 使用指南 -->
			<view class="chapter-title">使用指南</view>
			<view class="guide-container">
				<view class="guide-item" v-for="(item, index) in [
					{
						title: '小程序功能介绍',
						content: '了解【优眠】微信小程序的各项功能和使用方法，包括睡眠监测、数据分析、健康建议等。'
					},
					{
						title: '智能设备使用指南',
						content: '详细介绍如何正确使用智能设备进行睡眠监测，包括佩戴方式、充电方法、注意事项等。'
					},
					{
						title: '睡眠报告解读',
						content: '帮助您理解睡眠报告中的各项指标和数据含义，掌握自己的睡眠状况。'
					},
					{
						title: '健康改善建议',
						content: '基于您的睡眠数据，提供个性化的睡眠改善建议和健康生活方式指导。'
					}
				]" :key="index">
					<view class="guide-title">
						<view class="title-number">{{ index + 1 }}</view>
						<view class="title-text">{{ item.title }}</view>
					</view>
					<view class="guide-content">{{ item.content }}</view>
				</view>
			</view>

			<!-- 意见反馈 -->
			<view class="chapter-title">意见反馈</view>
			<view class="feedback-container">
				<view class="feedback-desc">
					如果您在使用过程中遇到任何问题或有任何建议，欢迎随时反馈给我们，我们将竭诚为您服务。
				</view>

				<!-- 反馈类型选择 -->
				<view class="feedback-type">
					<view class="type-title">反馈类型：</view>
					<view class="type-options">
						<view class="type-option" 
							v-for="type in ['建议', 'bug反馈', '功能需求', '其他']" 
							:key="type"
							:class="{ 'active': feedbackType === type }"
							@click="selectFeedbackType(type)">
							{{ type }}
						</view>
					</view>
				</view>

				<!-- 反馈内容 -->
				<view class="feedback-content">
					<textarea 
						placeholder="请详细描述您遇到的问题或建议..." 
						v-model="feedbackContent"
						maxlength="500"
					></textarea>
					<view class="content-count">{{ feedbackContent.length }}/500</view>
				</view>

				<!-- 联系方式 -->
				<view class="feedback-contact">
					<input 
						placeholder="请留下您的联系方式（选填），以便我们及时回复您" 
						v-model="contactInfo"
					></input>
				</view>

				<!-- 提交按钮 -->
				<view class="feedback-submit">
					<button @click="submitFeedback" class="submit-btn">提交反馈</button>
				</view>
			</view>

			<!-- 联系我们 -->
			<view class="chapter-title">联系我们</view>
			<view class="contact-info">
				<view class="contact-item">
					<view class="contact-label">客服电话：</view>
					<view class="contact-value">400-123-4567</view>
				</view>
				<view class="contact-item">
					<view class="contact-label">客服邮箱：</view>
					<view class="contact-value">support@usleep.com</view>
				</view>
				<view class="contact-item">
					<view class="contact-label">工作时间：</view>
					<view class="contact-value">周一至周日 9:00-18:00</view>
				</view>
			</view>

			<!-- 底部声明 -->
			<view class="footer-note">
				© 2025 预见（天津）智能科技有限公司 版权所有
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	.user-manage-container {
		width: 100vw;
		height: 100vh;
		position: relative;
		overflow: hidden;
		padding-top: var(--status-bar-height);
		box-sizing: border-box;
	}

	.bg-image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100vw;
		height: 200vh;
		z-index: -1;
		pointer-events: none;
	}

	// 顶部导航栏样式
	.life-top {
		width: 100%;
		height: 100rpx;
		display: flex;
		margin-top: 20rpx;
		position: relative;
		z-index: 10;
	}

	.life-top-left {
		width: 150rpx;
		height: 60rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-radius: 30rpx;
		margin: 20rpx 0 0 40rpx;
		background-color: rgba(255, 255, 255, 0.1);
	}

	.life-top-icon {
		width: 50rpx;
		height: 50rpx;
	}

	.life-Title {
		font-size: 34rpx;
		color: #fff;
		font-weight: bold;
		margin-left: 120rpx;
		margin-top: 26rpx;
	}

	/* 全局容器样式 */
	.policy-container {
		background-color: #f5f7fa;
		color: #333;
		line-height: 1.6;
		padding: 32rpx 24rpx;
		height: 80vh;
		overflow-y: auto;
	}

	/* 标题样式 */
	.policy-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #2d3748;
		text-align: center;
		margin-bottom: 40rpx;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #e2e8f0;
	}

	/* 章节标题样式 */
	.chapter-title {
		font-size: 28rpx;
		font-weight: 600;
		color: #2d3748;
		margin: 30rpx 0 20rpx 0;
		padding-left: 10rpx;
		border-left: 6rpx solid #3b82f6;
	}

	/* 常见问题样式 */
	.faq-container {
		margin-bottom: 30rpx;
	}

	.faq-item {
		background-color: #fff;
		border-radius: 10rpx;
		margin-bottom: 15rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	}

	.faq-question {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25rpx 20rpx;
		cursor: pointer;
	}

	.question-text {
		font-size: 24rpx;
		color: #2d3748;
		flex: 1;
	}

	.question-icon {
		width: 40rpx;
		height: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.arrow-icon {
		width: 30rpx;
		height: 30rpx;
	}

	.faq-answer {
		font-size: 22rpx;
		color: #4a5568;
		padding: 0 20rpx 25rpx;
		background-color: #f9fafb;
		border-top: 1rpx solid #f0f0f0;
	}

	/* 使用指南样式 */
	.guide-container {
		margin-bottom: 30rpx;
	}

	.guide-item {
		background-color: #fff;
		border-radius: 10rpx;
		margin-bottom: 15rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	}

	.guide-title {
		display: flex;
		align-items: center;
		padding: 25rpx 20rpx;
		background-color: #f9fafb;
	}

	.title-number {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background-color: #3b82f6;
		color: #fff;
		font-size: 22rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 15rpx;
	}

	.title-text {
		font-size: 24rpx;
		color: #2d3748;
		font-weight: 500;
	}

	.guide-content {
		font-size: 22rpx;
		color: #4a5568;
		padding: 20rpx;
	}

	/* 意见反馈样式 */
	.feedback-container {
		background-color: #fff;
		border-radius: 10rpx;
		padding: 25rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	}

	.feedback-desc {
		font-size: 22rpx;
		color: #4a5568;
		margin-bottom: 25rpx;
	}

	.feedback-type {
		display: flex;
		align-items: center;
		margin-bottom: 25rpx;
	}

	.type-title {
		font-size: 24rpx;
		color: #2d3748;
		margin-right: 20rpx;
	}

	.type-options {
		display: flex;
		flex-wrap: wrap;
		gap: 15rpx;
	}

	.type-option {
		font-size: 22rpx;
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
		background-color: #f0f0f0;
		color: #4a5568;
	}

	.type-option.active {
		background-color: #3b82f6;
		color: #fff;
	}

	.feedback-content {
		margin-bottom: 25rpx;
	}

	.feedback-content textarea {
		width: 100%;
		min-height: 200rpx;
		border: 1rpx solid #e2e8f0;
		border-radius: 10rpx;
		padding: 20rpx;
		font-size: 22rpx;
		color: #2d3748;
		resize: none;
	}

	.content-count {
		text-align: right;
		font-size: 20rpx;
		color: #94a3b8;
		margin-top: 10rpx;
	}

	.feedback-contact input {
		width: 100%;
		height: 80rpx;
		border: 1rpx solid #e2e8f0;
		border-radius: 10rpx;
		padding: 0 20rpx;
		font-size: 22rpx;
		color: #2d3748;
		margin-bottom: 25rpx;
	}

	.feedback-submit {
		display: flex;
		justify-content: center;
	}

	.submit-btn {
		width: 100%;
		height: 80rpx;
		background-color: #3b82f6;
		color: #fff;
		font-size: 24rpx;
		font-weight: 500;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 联系信息样式 */
	.contact-info {
		margin-bottom: 30rpx;
	}

	.contact-item {
		display: flex;
		margin-bottom: 15rpx;
	}

	.contact-label {
		font-size: 24rpx;
		color: #4a5568;
		font-weight: 500;
		width: 150rpx;
	}

	.contact-value {
		font-size: 24rpx;
		color: #4a5568;
		flex: 1;
	}

	/* 底部声明样式 */
	.footer-note {
		font-size: 22rpx;
		color: #64748b;
		text-align: center;
		margin-top: 50rpx;
		padding-top: 20rpx;
		border-top: 2rpx solid #e2e8f0;
	}
</style>
