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
			<view class="life-Title">我的信息</view>
		</view>

		<!-- 主要内容区 -->
		<view class="policy-container">
			<!-- 政策标题 -->
			<view class="policy-title">【优眠】微信小程序隐私政策</view>

			<!-- 提示条款 -->
			<view class="chapter-title">提示条款</view>
			<view class="policy-content">
				欢迎使用【优眠】微信小程序（以下简称 “本小程序”），由<view class="highlight">【预见（天津）智能科技有限公司】</view>（以下简称
				“我们”）开发运营。我们深知个人信息及健康数据的隐私重要性，将严格遵守《中华人民共和国个人信息保护法》《数据安全法》《微信小程序平台运营规范》等相关法律法规，尽全力保护您的隐私安全。
			</view>
			<view class="policy-content">
				请您在使用本小程序前，仔细阅读并充分理解本隐私政策（尤其是<view class="highlight">粗体标注的条款</view>），您点击 “同意”
				或继续使用本小程序服务，即视为您已充分理解并同意本政策全部内容。如您对本政策有任何疑问、意见或建议，可通过本政策末尾的联系方式与我们联系。
			</view>

			<!-- 一、定义 -->
			<view class="chapter-title">一、定义</view>
			<view class="policy-list">
				<view class="list-item">
					<view class="highlight">个人信息</view>
					：指以电子或其他方式记录的能够单独或与其他信息结合识别特定自然人身份或反映其活动情况的各种信息，包括微信绑定手机号、健康监测数据等。
				</view>
				<view class="list-item">
					<view class="highlight">个人敏感信息</view>：指包含医疗健康信息（如心率、呼吸率、睡眠数据）、手机号等一旦泄露或滥用可能危害人身安全、财产安全的信息。
				</view>
				<view class="list-item">
					<view class="highlight">健康数据</view>：指您使用本小程序过程中产生或上传的与健康状况相关的数据，包括但不限于睡眠时长、睡眠状态、实时心率、呼吸率等。
				</view>
				<view class="list-item">
					<view class="highlight">删除个人信息</view>：指在本小程序相关系统中去除您的个人信息，使其无法被检索、访问的状态。
				</view>
			</view>

			<!-- 二、我们如何收集和使用您的信息 -->
			<view class="chapter-title">二、我们如何收集和使用您的信息</view>
			<view class="policy-content">我们遵循 “最小必要” 原则，仅为实现本小程序功能收集必要的个人信息，具体如下：</view>

			<view class="subchapter-title">（一）必要个人信息收集与使用</view>
			<view class="policy-content">
				<view class="highlight">1. 微信绑定手机号</view>
			</view>
			<view class="policy-list">
				<view class="list-item">收集方式：通过微信官方授权接口（wx.getPhoneNumber）获取，需您主动点击 “同意授权” 后方可收集。</view>
				<view class="list-item">收集目的：用于用户身份核验、账号注册登录、找回账号、客服联系及安全验证，确保您的账号安全与服务连续性。</view>
				<view class="list-item">使用限制：仅用于上述明确目的，不用于其他无关用途，且不会向第三方展示您的完整手机号。</view>
			</view>

			<view class="policy-content">
				<view class="highlight">2. 健康监测数据</view>
			</view>
			<view class="policy-list">
				<view class="list-item">收集方式：通过您授权绑定的智能设备（如手环、手表等）同步、小程序传感器采集或您主动上传。</view>
				<view class="list-item">收集范围：睡眠数据（睡眠时长、睡眠阶段、睡眠质量评分等）、实时心率、呼吸率、历史报警记录（如异常心率报警、睡眠中断报警等）。</view>
				<view class="list-item">收集目的：为您生成睡眠报告、提供实时健康状态监测、触发异常情况报警、推送个性化睡眠改善建议，实现本小程序核心服务功能。</view>
			</view>

			<view class="subchapter-title">（二）信息使用的补充说明</view>
			<view class="policy-list">
				<view class="list-item">我们仅在本政策明示的用途内使用您的信息，若需超出上述范围使用，将再次以弹窗等形式获得您的明示同意。</view>
				<view class="list-item">未经您的单独同意，我们不会将您的个人信息和健康数据用于商业推广、广告推送等其他用途。</view>
				<view class="list-item">我们可能会对收集的健康数据进行匿名化、去标识化处理，处理后的数据不再识别您的个人身份，可用于产品优化、行业研究等合法用途。</view>
			</view>

			<!-- 三、信息的存储与保护 -->
			<view class="chapter-title">三、信息的存储与保护</view>
			<view class="subchapter-title">（一）存储期限与方式</view>
			<view class="policy-list">
				<view class="list-item">存储期限：您的手机号将在您使用本小程序期间持续存储，若您注销账号，我们将在 15 个工作日内删除或匿名化处理；健康监测数据将存储<view
						class="highlight">【2 年】</view>（可根据实际业务调整），逾期将自动删除或匿名化处理，法律法规另有要求的除外。</view>
				<view class="list-item">存储方式：通过加密技术存储在符合中国法律法规要求的服务器（境内服务器），采用数据加密、访问权限控制、防火墙等技术措施保障数据安全。</view>
			</view>

			<view class="subchapter-title">（二）安全保护措施</view>
			<view class="policy-list">
				<view class="list-item">我们建立了完善的安全管理制度，明确数据处理各环节的安全责任，限制数据访问权限，仅授权人员可接触您的个人信息。</view>
				<view class="list-item">采用技术加密（传输加密、存储加密）、安全审计、漏洞防护等措施，防止您的信息被泄露、篡改、丢失。</view>
				<view class="list-item">定期开展数据安全培训与应急演练，提升员工隐私保护意识，若发生数据安全事件，将按照法律法规要求及时告知您并向有关部门报告。</view>
			</view>

			<!-- 四、信息的共享、转让与公开披露 -->
			<view class="chapter-title">四、信息的共享、转让与公开披露</view>
			<view class="policy-content">
				<view class="highlight">1. 共享</view>：我们不会主动将您的个人信息或健康数据共享给任何第三方，除非符合以下情形：
			</view>
			<view class="policy-list">
				<view class="list-item">获得您的单独明示同意；</view>
				<view class="list-item">依据法律法规、司法机关或行政机关的强制性要求；</view>
				<view class="list-item">与第三方服务商合作实现本小程序功能（如服务器托管、支付服务等），但第三方服务商仅可在为我们提供服务的范围内使用您的信息，且需遵守保密义务。</view>
			</view>

			<view class="policy-content">
				<view class="highlight">2. 转让</view>
				：若我们发生合并、收购、破产清算等变更，您的个人信息将由变更后的主体继续保护，如需转让给第三方，将提前以弹窗、公告等形式告知您，获得您同意后再行转让。
			</view>

			<view class="policy-content">
				<view class="highlight">3. 公开披露</view>：除非获得您的单独明示同意或法律法规另有要求，我们不会公开披露您的任何个人信息。
			</view>

			<!-- 五、您的权利 -->
			<view class="chapter-title">五、您的权利</view>
			<view class="policy-content">根据《个人信息保护法》等法律法规，您享有以下个人信息相关权利，我们将为您提供便捷的行使途径：</view>
			<view class="policy-list">
				<view class="list-item">
					<view class="highlight">查阅、复制权</view>：您可通过本小程序 “我的 - 个人中心” 查看您的手机号、健康数据、睡眠报告等个人信息，如需复制，可联系客服协助。
				</view>
				<view class="list-item">
					<view class="highlight">更正权</view>：若您发现您的个人信息（如手机号）有误，可通过 “我的 - 账号设置” 自行修改，或联系客服协助更正。
				</view>
				<view class="list-item">
					<view class="highlight">删除权</view>：您可通过以下方式申请删除个人信息：
					<view class="policy-list sub-list">
						<view class="list-item">路径 1：微信小程序主页右上角 “…”—“设置”—“小程序已获取的信息”— 选择对应信息 — 点击 “通知开发者删除”；</view>
						<view class="list-item">路径 2：联系客服提交删除申请，我们收到申请后将在 15 个工作日内完成处理并反馈结果（法律法规要求保留的除外）。</view>
					</view>
				</view>
				<view class="list-item">
					<view class="highlight">撤回同意权</view>：您可通过微信小程序 “设置”
					页面撤回对手机号、健康数据收集的授权，撤回后我们将不再收集相关信息，但不影响此前基于您的同意已进行的信息处理活动。
				</view>
				<view class="list-item">
					<view class="highlight">注销账号权</view>：您可通过 “我的 - 账号设置 - 注销账号”
					申请注销，账号注销后，我们将删除您的全部个人信息（法律法规要求保留的除外），注销后不可恢复。
				</view>
			</view>

			<!-- 六、未成年人信息保护 -->
			<view class="chapter-title">六、未成年人信息保护</view>
			<view class="policy-content">
				本小程序不面向 14 周岁以下（含）未成年人提供服务，若发现误收集未成年人信息，我们将在核实后立即删除相关信息。如未成年人监护人发现未成年人使用本小程序并提交了个人信息，可联系我们协助删除。
			</view>

			<!-- 七、隐私政策的更新 -->
			<view class="chapter-title">七、隐私政策的更新</view>
			<view class="policy-list">
				<view class="list-item">若因法律法规修订、本小程序功能变更等原因需要更新本政策，我们将在小程序内以弹窗、公告等形式通知您，更新后的政策自您点击 “同意” 或继续使用服务之日起生效。
				</view>
				<view class="list-item">未经您的明确同意，我们不会削减您依据原隐私政策享有的权利。</view>
			</view>

			<!-- 八、联系方式 -->
			<view class="chapter-title">八、联系方式</view>
			<view class="contact-box">
				<view class="policy-content" style="margin-bottom: 16rpx;">如您对本隐私政策有任何疑问、投诉或需要行使个人信息权利，可通过以下方式联系我们：
				</view>
				<view class="contact-item">
					<view class="contact-label">公司名称：</view>
					<view class="contact-value">【预见（天津）智能科技有限公司】</view>
				</view>
				<view class="contact-item">
					<view class="contact-label">注册地址：</view>
					<view class="contact-value">【天津市滨海新区生态城动漫中路创展大厦B座-4F-416】</view>
				</view>
				<view class="contact-item">
					<view class="contact-label">联系电话：</view>
					<view class="contact-value">【18322288192】</view>
				</view>
				<view class="contact-item">
					<view class="contact-label">联系邮箱：</view>
					<view class="contact-value">【sunjian@will-tec.com】</view>
				</view>
				<view class="contact-item">
					<view class="contact-label">反馈处理时限：</view>
					<view class="contact-value">我们将在收到您的反馈后15个工作日内予以回复</view>
				</view>
			</view>

			<!-- 九、其他 -->
			<view class="chapter-title">九、其他</view>
			<view class="policy-list">
				<view class="list-item">本隐私政策的成立、生效、履行、解释及纠纷解决，均适用中华人民共和国法律。</view>
				<view class="list-item">若您与我们就本隐私政策产生争议，应尽量协商解决；协商不成的，任何一方均有权向我们的注册地有管辖权的人民法院提起诉讼。</view>
			</view>

			<!-- 底部声明 -->
			<view class="footer-note">
				本隐私政策最后更新日期：2025年10月24日<br>
				【预见（天津）智能科技有限公司】 版权所有
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
		margin: 40rpx 0 20rpx;
		display: flex;
		align-items: center;
	}

	.chapter-title::before {
		content: "";
		display: inline-block;
		width: 8rpx;
		height: 28rpx;
		background-color: #4a90e2;
		margin-right: 16rpx;
		border-radius: 4rpx;
	}

	/* 子章节标题样式 */
	.subchapter-title {
		font-size: 24rpx;
		font-weight: 500;
		color: #4a5568;
		margin: 32rpx 0 16rpx;
		padding-left: 24rpx;
	}

	/* 正文文本样式 */
	.policy-content {
		font-size: 24rpx;
		color: #666;
		margin-bottom: 24rpx;
		padding: 0 8rpx;
	}

	/* 列表容器样式 */
	.policy-list {
		margin-left: 48rpx;
		margin-bottom: 24rpx;
	}

	/* 列表项样式 */
	.list-item {
		font-size: 24rpx;
		color: #666;
		margin-bottom: 16rpx;
		position: relative;
	}

	/* 子列表样式 */
	.sub-list {
		margin-left: 32rpx;
		margin-top: 16rpx;
	}

	/* 关键信息高亮样式 */
	.highlight {
		color: #4a90e2;
		font-weight: 500;
	}

	/* 联系方式模块样式 */
	.contact-box {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 32rpx;
		margin: 40rpx 0;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
	}

	/* 联系方式项样式 */
	.contact-item {
		display: flex;
		margin-bottom: 16rpx;
		flex-wrap: wrap;
	}

	.contact-label {
		width: 180rpx;
		color: #4a5568;
		font-weight: 500;
		font-size: 24rpx;
	}

	.contact-value {
		color: #666;
		font-size: 24rpx;
		flex: 1;
	}

	/* 底部声明样式 */
	.footer-note {
		font-size: 20rpx;
		color: #999;
		text-align: center;
		margin-top: 64rpx;
		padding-top: 32rpx;
		border-top: 2rpx solid #e2e8f0;
		line-height: 1.8;
	}
</style>