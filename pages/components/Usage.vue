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
			<view class="life-Title">使用协议</view>
		</view>

		<!-- 主要内容区 -->
		<view class="policy-container">
			<!-- 协议标题 -->
			<view class="policy-title">【优眠】微信小程序使用协议</view>

			<!-- 欢迎条款 -->
			<view class="chapter-title">欢迎使用</view>
			<view class="policy-content">
				欢迎您使用【优眠】微信小程序（以下简称 “本小程序”），本小程序由<view class="highlight">预见（天津）智能科技有限公司</view>（以下简称 “我们”）开发并运营。
			</view>
			<view class="policy-content">
				本使用协议（以下简称 “本协议”）是您与我们之间就使用本小程序服务所订立的具有法律约束力的契约。请您在注册、登录或使用本小程序服务前，仔细阅读并充分理解本协议全部内容（尤其是<view class="highlight">粗体标注的条款</view>）。
			</view>
			<view class="policy-content">
				您点击 “同意”、完成注册流程或实际使用本小程序服务，即视为您已充分理解并同意接受本协议的全部约定，包括我们后续根据法律法规修订或业务需要对本协议作出的更新。若您不同意本协议任何内容，请您立即停止使用本小程序服务。
			</view>

			<!-- 一、服务内容 -->
			<view class="chapter-title">一、服务内容</view>
			<view class="policy-content">
				本小程序为您提供以下核心服务，我们有权根据业务发展调整服务内容，调整前将通过弹窗、公告等形式通知您：
			</view>
			<view class="policy-list">
				<view class="list-item">1. 账号相关服务：基于微信授权的账号注册、登录、找回及安全验证服务；</view>
				<view class="list-item">2. 健康监测服务：通过绑定智能设备（手环、手表等）同步或小程序采集睡眠数据（睡眠时长、睡眠阶段、睡眠质量评分等）、实时心率、呼吸率等健康数据；</view>
				<view class="list-item">3. 数据解读服务：根据收集的健康数据生成睡眠报告、提供异常情况报警、推送个性化睡眠改善建议；</view>
				<view class="list-item">4. 历史记录查询：为您提供健康数据、报警记录、睡眠报告的历史查询服务；</view>
				<view class="list-item">5. 其他：我们根据业务发展新增的合理服务功能（新增服务将遵循 “最小必要” 原则，如需收集额外信息将单独获得您的同意）。</view>
			</view>

			<!-- 二、用户权利与义务 -->
			<view class="chapter-title">二、用户权利与义务</view>

			<view class="subchapter-title">（一）用户权利</view>
			<view class="policy-list">
				<view class="list-item">1. 依法使用本小程序提供的各项服务，获得服务过程中的技术支持；</view>
				<view class="list-item">2. 有权查阅、更正、删除本人的个人信息及健康数据，有权撤回信息收集授权或注销账号（具体操作方式详见《隐私政策》）；</view>
				<view class="list-item">3. 对本小程序服务质量、功能优化有建议权，对服务过程中遇到的问题有投诉、反馈权；</view>
				<view class="list-item">4. 法律法规规定的其他合法权利。</view>
			</view>

			<view class="subchapter-title">（二）用户义务</view>
			<view class="policy-list">
				<view class="list-item">1. 保证您是具有完全民事行为能力的自然人，若您为限制民事行为能力人，需在监护人同意的前提下使用本服务；</view>
				<view class="list-item">2. 遵守中华人民共和国法律法规、微信小程序平台运营规范及本协议约定，不得利用本小程序从事违法违规活动；</view>
				<view class="list-item">3. 妥善保管与本小程序关联的微信账号及相关信息，因您自身保管不善导致的账号泄露、被盗等损失，由您自行承担；</view>
				<view class="list-item">4. 提供真实、准确的个人信息，不得提供虚假信息或冒用他人信息，若信息发生变更应及时更新；</view>
				<view class="list-item">5. 不得对本小程序进行反向工程、破解、篡改、外挂等破坏服务安全的操作，不得干扰或影响本小程序的正常运行；</view>
				<view class="list-item">6. 尊重本小程序的知识产权，不得擅自复制、传播、使用本小程序的软件代码、界面设计、商标等知识产权相关内容；</view>
				<view class="list-item">7. 理解并同意：本小程序提供的睡眠报告、健康建议仅为参考，不能替代专业医疗诊断，若您有健康疑虑，应及时咨询专业医疗机构；</view>
				<view class="list-item">8. 不得将本小程序服务转让给第三方使用，不得利用本服务为第三方提供商业服务。</view>
			</view>

			<!-- 三、我们的权利与义务 -->
			<view class="chapter-title">三、我们的权利与义务</view>

			<view class="subchapter-title">（一）我们的权利</view>
			<view class="policy-list">
				<view class="list-item">1. 有权根据法律法规修订、技术升级、业务发展需要调整本小程序的服务内容及功能，调整后将通过合理方式通知您；</view>
				<view class="list-item">2. 对您使用本服务的行为进行监督，若发现您违反本协议或法律法规规定，有权采取警告、限制服务、注销账号等措施；</view>
				<view class="list-item">3. 对收集的健康数据进行匿名化、去标识化处理后，有权用于产品优化、行业研究等合法用途；</view>
				<view class="list-item">4. 因不可抗力、微信平台政策变更、第三方服务故障等非我们可控因素导致服务中断的，有权暂停服务并及时告知您。</view>
			</view>

			<view class="subchapter-title">（二）我们的义务</view>
			<view class="policy-list">
				<view class="list-item">1. 按照本协议约定提供稳定、安全的服务，建立健全数据安全管理制度，保护您的个人信息及健康数据安全（具体保护措施详见《隐私政策》）；</view>
				<view class="list-item">2. 遵守《个人信息保护法》等法律法规，依法收集、使用、存储您的信息，不得泄露、篡改、出售您的个人信息；</view>
				<view class="list-item">3. 及时回应您的咨询、投诉及反馈，在15个工作日内给出处理结果；</view>
				<view class="list-item">4. 向您提供本协议及《隐私政策》的查询渠道，保障您的知情权；</view>
				<view class="list-item">5. 法律法规规定的其他法定义务。</view>
			</view>

			<!-- 四、知识产权 -->
			<view class="chapter-title">四、知识产权</view>
			<view class="policy-list">
				<view class="list-item">1. 本小程序的软件代码、界面设计、商标、logo、文字内容、图形素材等所有知识产权均归我们所有，受《著作权法》《商标法》等法律法规保护；</view>
				<view class="list-item">2. 您仅获得本小程序服务的使用权，未获得任何知识产权的转让或许可，不得擅自复制、修改、传播、出租、出售本小程序相关知识产权成果；</view>
				<view class="list-item">3. 您在使用本服务过程中产生的健康数据，您享有合法使用权，我们仅在您授权范围内使用（具体详见《隐私政策》）。</view>
			</view>

			<!-- 五、免责声明 -->
			<view class="chapter-title">五、免责声明</view>
			<view class="policy-list">
				<view class="list-item">1. 本小程序提供的健康监测数据、睡眠报告、改善建议仅为参考，不构成医疗诊断、治疗建议，您据此采取的健康管理行为风险自担，我们不承担相关责任；</view>
				<view class="list-item">2. 因您自身操作不当、设备故障、网络中断、微信账号问题等非我们原因导致的服务无法使用或数据丢失，我们不承担责任；</view>
				<view class="list-item">3. 因不可抗力（如自然灾害、政策变更、网络攻击等）导致本服务中断或无法正常提供的，我们不承担违约责任，但将尽力减少损失并及时通知您；</view>
				<view class="list-item">4. 您违反本协议约定或法律法规规定导致的自身损失或第三方索赔，由您自行承担，若给我们造成损失，我们有权向您追偿。</view>
			</view>

			<!-- 六、协议的变更与终止 -->
			<view class="chapter-title">六、协议的变更与终止</view>

			<view class="subchapter-title">（一）协议变更</view>
			<view class="policy-list">
				<view class="list-item">1. 因法律法规修订或业务发展需要，我们有权对本协议进行变更，变更后将通过小程序弹窗、公告等形式通知您；</view>
				<view class="list-item">2. 您继续使用本服务即视为同意变更后的协议，若您不同意变更，可停止使用服务并注销账号。</view>
			</view>

			<view class="subchapter-title">（二）协议终止</view>
			<view class="policy-list">
				<view class="list-item">1. 您主动注销账号的，本协议自账号注销完成之日起终止；</view>
				<view class="list-item">2. 您违反本协议约定或法律法规规定，我们有权终止提供服务，本协议随之终止；</view>
				<view class="list-item">3. 我们因业务调整不再提供本服务的，将提前30日通过公告等形式通知您，本协议自服务停止之日起终止；</view>
				<view class="list-item">4. 协议终止后，您应停止使用本小程序服务，我们将按照《隐私政策》约定处理您的个人信息，法律法规要求保留的除外。</view>
			</view>

			<!-- 七、争议解决 -->
			<view class="chapter-title">七、争议解决</view>
			<view class="policy-list">
				<view class="list-item">1. 本协议的成立、生效、履行、解释及争议解决均适用中华人民共和国法律；</view>
				<view class="list-item">2. 您与我们之间因本协议产生的任何争议，应首先通过友好协商解决；协商不成的，任何一方均有权向我们的注册地（天津市滨海新区）有管辖权的人民法院提起诉讼。</view>
			</view>

			<!-- 八、其他 -->
			<view class="chapter-title">八、其他</view>
			<view class="policy-list">
				<view class="list-item">1. 本协议未尽事宜，由《隐私政策》及相关法律法规补充约定；</view>
				<view class="list-item">2. 本协议中的条款若因法律法规规定被认定为无效或不可执行，不影响其他条款的效力；</view>
				<view class="list-item">3. 您的联系方式以您在本小程序预留的信息为准，若信息变更未及时更新导致的通知无法送达，责任由您自行承担；</view>
				<view class="list-item">4. 我们的联系方式：</view>
				<view class="policy-list sub-list">
					<view class="list-item">公司名称：预见（天津）智能科技有限公司</view>
					<view class="list-item">注册地址：天津市滨海新区生态城动漫中路创展大厦B座-4F-416</view>
					<view class="list-item">联系电话：18322288192</view>
					<view class="list-item">联系邮箱：sunjian@will-tec.com</view>
				</view>
			</view>

			<!-- 底部声明 -->
			<view class="footer-note">
				本使用协议最后更新日期：2025年10月24日<br>
				预见（天津）智能科技有限公司 版权所有
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