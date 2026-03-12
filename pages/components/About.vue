<script>
	import {
		request
	} from '../../utils/request';
	export default {
		data() {
			return {

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
			<view class="life-Title">关于我们</view>
		</view>

		<!-- 主要内容区 -->
		<view class="policy-container">
			<!-- 公司标题 -->
			<view class="policy-title">预见（天津）智能科技有限公司</view>

			<!-- 公司简介 -->
			<view class="chapter-title">公司简介</view>
			<view class="policy-content">
				预见（天津）智能科技有限公司是一家面向工业生产制造企业的人工智能+物联网技术服务公司，公司目前已成为华为云、阿里云、阿里钉钉、腾讯企业微信、科大讯飞、中国铁塔、BOSS直聘、尼尔森诺尔、灵奕集团等众多科技公司的AIoT技术服务伙伴。
			</view>
			<view class="policy-content">
				从2019年3月15日成立至今，经过4年的努力，预见（天津）智能科技有限公司围绕能源、石化以及生产制造行业企业的"安全生产""节能环保"以及"效能提升"等问题，积累了包括人工智能算法定制、物联网智能硬件定制、软件及应用平台集成开发、人工智能+物联网综合解决方案在内的诸多服务经验。
			</view>

			<!-- 产品与服务 -->
			<view class="chapter-title">产品与服务</view>
			<view class="policy-content">
				目前我们可提供的产品和服务有：
			</view>
			<view class="policy-list">
				<view class="list-item">1. 工业物联网传感器通信模组</view>
				<view class="list-item">2. 通信基站</view>
				<view class="list-item">3. AI识别算法和摄像头</view>
				<view class="list-item">4. 能源管理系统</view>
				<view class="list-item">5. 环境监测（含有害气体监测）系统</view>
				<view class="list-item">6. 生产联动车辆调度管理系统</view>
				<view class="list-item">7. AI语音识别和控制系统</view>
				<view class="list-item">8. 企业IM即时通信与线上工作台</view>
				<view class="list-item">9. 企业共享网盘</view>
				<view class="list-item">10. 低代码表单系统和流程开发工具等</view>
			</view>

			<!-- 公司使命 -->
			<view class="chapter-title">公司使命</view>
			<view class="policy-content">
				预见（天津）智能科技有限公司以"运用人工智能和物联网技术为客户创造价值"为使命，希望抢跑工业AIoT赛道，成为时代所需的科技企业，助力生产力的发展行业贡献。
			</view>

			<!-- 公司资质 -->
			<view class="chapter-title">公司资质</view>
			<view class="policy-list">
				<view class="list-item">1. 2022、2023年成功入库国家科技型中小企业</view>
				<view class="list-item">2. 2022、2023年成功入库雏鹰企业</view>
				<view class="list-item">3. 2020-2023年共获得15个计算机软件著作权登记证书</view>
				<view class="list-item">4. 2022年获得实用新型专利证书</view>
				<view class="list-item">5. 2022年成为天津人工智能创新发展联盟"理事会员单位"</view>
			</view>

			<!-- 合作伙伴 -->
			<view class="chapter-title">合作伙伴</view>
			<view class="partners-grid">
				<view class="partner-item">华为云</view>
				<view class="partner-item">阿里云</view>
				<view class="partner-item">阿里钉钉</view>
				<view class="partner-item">腾讯企业微信</view>
				<view class="partner-item">科大讯飞</view>
				<view class="partner-item">中国铁塔</view>
				<view class="partner-item">BOSS直聘</view>
				<view class="partner-item">尼尔森诺尔</view>
				<view class="partner-item">灵奕集团</view>
			</view>

			<!-- 联系我们 -->
			<view class="chapter-title">联系我们</view>
			<view class="contact-info">
				<view class="contact-item">
					<view class="contact-label">公司名称：</view>
					<view class="contact-value">预见（天津）智能科技有限公司</view>
				</view>
				<view class="contact-item">
					<view class="contact-label">注册地址：</view>
					<view class="contact-value">天津市滨海新区生态城动漫中路创展大厦B座-4F-416</view>
				</view>
				<view class="contact-item">
					<view class="contact-label">联系电话：</view>
					<view class="contact-value">18322288192</view>
				</view>
				<view class="contact-item">
					<view class="contact-label">联系邮箱：</view>
					<view class="contact-value">sunjian@will-tec.com</view>
				</view>
			</view>

			<!-- 底部声明 -->
			<view class="footer-note">
				预见（天津）智能科技有限公司 版权所有<br>
				© 2019-2025 预见智能 保留所有权利
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

	.users-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20rpx;
		color: #fff;
		padding: 30rpx;
	}

	.user-details {
		flex: 1;
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

	/* 内容段落样式 */
	.policy-content {
		font-size: 24rpx;
		color: #4a5568;
		margin-bottom: 20rpx;
		text-align: justify;
	}

	/* 列表样式 */
	.policy-list {
		margin-left: 30rpx;
		margin-bottom: 20rpx;
	}

	.list-item {
		font-size: 24rpx;
		color: #4a5568;
		margin-bottom: 15rpx;
		position: relative;
		padding-left: 30rpx;
	}

	.list-item:before {
		content: "";
		position: absolute;
		left: 0;
		top: 15rpx;
		width: 12rpx;
		height: 12rpx;
		border-radius: 50%;
		background-color: #3b82f6;
	}

	/* 子列表样式 */
	.sub-list {
		margin-left: 40rpx;
	}

	.sub-list .list-item:before {
		background-color: #64748b;
	}

	/* 高亮文本样式 */
	.highlight {
		color: #3b82f6;
		font-weight: 500;
	}

	/* 合作伙伴网格 */
	.partners-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		margin-bottom: 30rpx;
	}

	.partner-item {
		background-color: #e2e8f0;
		color: #2d3748;
		padding: 15rpx 25rpx;
		border-radius: 8rpx;
		font-size: 24rpx;
		text-align: center;
		white-space: nowrap;
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
