// 接口地址配置文件

let env = 'develop'


// 小程序
// #ifdef MP-MP-WEIXIN
if (wx && wx.getAccountInfoSync) {
	const info = wx.getAccountInfoSync()
	env = info.miniProgram.envVersion
}
// #endif

// APP
// #ifdef APP-PLUS
env = 'release'
// #endif


const baseApi = {
	develop: {
		baseUrl: 'https://usleep.will-tec.com'
	},
	release: {
		baseUrl: 'https://usleep.will-tec.com'
	},
	trial: {
		baseUrl: 'https://usleep.will-tec.com'
	}
}

export const apiBaseUrl = baseApi[env] || baseApi.develop

// 图片资源配置
export const IMAGE_CONFIG = {
  // 背景图片使用CDN
  BACKGROUND: {
    HOME: 'https://your-cdn.com/images/home-background.png',
    CIRCLE: 'https://your-cdn.com/images/home-circle.png',
    TOP: 'https://your-cdn.com/images/life-topBG.png',
    REPORT: 'https://your-cdn.com/images/report-backgroundImg.png'
  },
  // 本地图片（小文件）
  LOCAL: {
    EQUIP_EARNING: '/static/Equip-Earning.png',
    HOME_RIGHT: '/static/Home/home-right.png'
  }
}