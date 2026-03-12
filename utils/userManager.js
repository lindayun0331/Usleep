// 用户信息管理工具类
class UserManager {
  constructor() {
    this.USER_INFO_KEY = 'userInfo'
    this.LOGIN_TIME_KEY = 'loginTime'
    this.TOKEN_KEY = 'token'
    this.TOKEN_EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000 // 7天过期时间（毫秒）
  }

  /**
   * 保存用户信息到本地存储
   * @param {Object} userInfo - 用户信息对象
   * @param {string} token - 访问令牌
   */
  saveUserInfo(userInfo, token) {
    try {
      const loginTime = Date.now()
      
      // 保存用户信息
      uni.setStorageSync(this.USER_INFO_KEY, userInfo)
      
      // 保存登录时间
      uni.setStorageSync(this.LOGIN_TIME_KEY, loginTime)
      
      // 保存token
      if (token) {
        uni.setStorageSync(this.TOKEN_KEY, token)
      }
      
      console.log('用户信息已保存到本地')
      return true
    } catch (error) {
      console.error('保存用户信息失败:', error)
      return false
    }
  }

  /**
   * 获取本地存储的用户信息
   * @returns {Object|null} 用户信息对象或null
   */
  getUserInfo() {
    try {
      return uni.getStorageSync(this.USER_INFO_KEY) || null
    } catch (error) {
      console.error('获取用户信息失败:', error)
      return null
    }
  }

  /**
   * 获取访问令牌
   * @returns {string|null} 访问令牌或null
   */
  getToken() {
    try {
      return uni.getStorageSync(this.TOKEN_KEY) || null
    } catch (error) {
      console.error('获取token失败:', error)
      return null
    }
  }

  /**
   * 检查登录状态是否有效
   * @returns {boolean} 登录状态是否有效
   */
  isLoginValid() {
    try {
      const userInfo = this.getUserInfo()
      const token = this.getToken()
      const loginTime = uni.getStorageSync(this.LOGIN_TIME_KEY)
      
      // 检查是否有用户信息和token
      if (!userInfo || !token) {
        return false
      }
      
      // 检查是否过期
      if (loginTime && (Date.now() - loginTime) > this.TOKEN_EXPIRE_TIME) {
        console.log('登录已过期')
        this.clearUserInfo()
        return false
      }
      
      return true
    } catch (error) {
      console.error('检查登录状态失败:', error)
      return false
    }
  }

  /**
   * 清除本地用户信息
   */
  clearUserInfo() {
    try {
      uni.removeStorageSync(this.USER_INFO_KEY)
      uni.removeStorageSync(this.LOGIN_TIME_KEY)
      uni.removeStorageSync(this.TOKEN_KEY)
      console.log('用户信息已清除')
    } catch (error) {
      console.error('清除用户信息失败:', error)
    }
  }

  /**
   * 更新用户信息
   * @param {Object} newUserInfo - 新的用户信息
   */
  updateUserInfo(newUserInfo) {
    try {
      const currentUserInfo = this.getUserInfo()
      if (currentUserInfo) {
        const updatedUserInfo = { ...currentUserInfo, ...newUserInfo }
        uni.setStorageSync(this.USER_INFO_KEY, updatedUserInfo)
        console.log('用户信息已更新')
        return true
      }
      return false
    } catch (error) {
      console.error('更新用户信息失败:', error)
      return false
    }
  }

  /**
   * 获取登录剩余时间（毫秒）
   * @returns {number} 剩余时间，如果已过期返回0
   */
  getRemainingTime() {
    try {
      const loginTime = uni.getStorageSync(this.LOGIN_TIME_KEY)
      if (!loginTime) return 0
      
      const remaining = this.TOKEN_EXPIRE_TIME - (Date.now() - loginTime)
      return remaining > 0 ? remaining : 0
    } catch (error) {
      console.error('获取剩余时间失败:', error)
      return 0
    }
  }
}

// 创建单例实例
const userManager = new UserManager()

export default userManager
