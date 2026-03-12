import {
	apiBaseUrl
} from "./config";


let BASE_URL = '/api'
// #ifndef WEB
BASE_URL = apiBaseUrl.baseUrl
// #endif


// 创建请求实例
export const request = ({
	url = '',
	method = 'GET',
	data = {},
	header = {},
	showLoading = true,
	timeout = 10000
}) => {
	return new Promise((resolve, reject) => {

		// 显示加载提示
		if (showLoading !== false) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
		}

		// 发起请求
		uni.request({
			url: BASE_URL + url,
			method,
			data,
			header: {
				...setHeader(),
				...header
			},
			timeout,
			success: (res) => {
				// 隐藏加载提示
				if (showLoading !== false) {
					uni.hideLoading()
				}
				
				if (res.statusCode === 200 && res.data.code === 200) {

					if (url === '/login') {
						if (res.data.data.accessToken) {
							console.log('存储');
							uni.setStorageSync('userdata',res.data.data)
							uni.setStorageSync('avatar',res.data.data.avatar)
							uni.setStorageSync('token',res.data.data.accessToken)
						}
					}
					resolve(res.data)
				} else if (res.statusCode === 401) {
					// 清除无效的token
					uni.removeStorage('userdata')
					uni.removeStorage('avatar')
					uni.removeStorage('token')
					// 跳转到登录页
					uni.navigateTo({
						url: '/pages/components/LoginPage'
					})
					uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' });
					reject(res.data)
				} else if (res.statusCode === 200 && res.data.code === 400) {
					// 静默处理400状态码，不显示错误提示
					resolve(res.data)
				} else {
					reject(res.data)
				}
			},
			fail: (err) => {
				// 隐藏加载提示
				if (showLoading !== false) {
					uni.hideLoading()
				}
				
				// 检查是否是服务器端错误
				if (err.errMsg && err.errMsg.includes('request:fail')) {
					uni.showToast({
						title: '服务器连接失败，请稍后重试',
						icon: 'none',
						duration: 3000
					})
				} else {
					uni.showToast({
						title: '网络连接失败',
						icon: 'none'
					})
				}
				reject(err)
			}
		})
	})
}


// 设置请求头 
function setHeader() {
	const head = {}
	const token = uni.getStorageSync('token')
	if (token) {
		head['Authorization'] = `Bearer ${token}`
	}
	return head
}