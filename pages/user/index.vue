<script>
import TabBar from '../../components/TabBar.vue'
import userManager from '../../utils/userManager'

export default {
  name: 'UserPage',
  components: {
    TabBar
  },
  data() {
    return {
      userName: '',
      userPhone: '',
      userAvatar: ''
    }
  },
  onLoad() {
    this.loadUserInfo()
  },
  onShow() {
    this.loadUserInfo()
  },
  methods: {
    loadUserInfo() {
      // 使用userManager获取用户信息
      const userData = userManager.getUserInfo()
      if (userData) {
        this.userName = userData.name || '木子先森'
        this.userPhone = userData.phone_number || '18826266626'
        this.userAvatar = userData.avatar || ''
      } else {
        // 如果没有用户信息
        this.userName = '未登录'
        this.userPhone = '**********'
        this.userAvatar = ''
      }
    },
    goToPrivacy() {
      uni.showToast({
        title: '隐私政策功能开发中',
        icon: 'none'
      })
    },
    goToAgreement() {
      uni.showToast({
        title: '用户使用协议功能开发中',
        icon: 'none'
      })
    },
    goToAbout() {
      uni.showToast({
        title: '关于我们功能开发中',
        icon: 'none'
      })
    },
    goToHelp() {
      uni.showToast({
        title: '帮助与反馈功能开发中',
        icon: 'none'
      })
    },
    goToInstructions() {
      uni.showToast({
        title: '使用说明功能开发中',
        icon: 'none'
      })
    },
    logout() {
      uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // 使用userManager清除用户信息
            userManager.clearUserInfo()
            
            // 显示退出成功提示
            uni.showToast({
              title: '已退出登录',
              icon: 'success',
              duration: 1000
            })
            
            // 延迟跳转到登录页面
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/Login/LoginPage'
              })
            }, 1000)
          }
        }
      })
    }
  }
}
</script>

<template>
  <view class="user-page">
    <!-- 背景图片 -->
    <image 
      src="https://usleep.will-tec.com/develop/User/img/home-background.png" 
      class="page-background"
      mode="aspectFill"
    ></image>

    <!-- 用户信息卡片 -->
    <view class="user-card">
      <view class="user-avatar">
        <image :src="userAvatar || '/static/Home/login-Logo.png'" class="avatar-img"></image>
      </view>
      <view class="user-info">
        <text class="user-name">{{ userName || '木子先森' }}</text>
        <text class="user-phone">手机号: {{ userPhone || '18826266626' }}</text>
      </view>
    </view>

    <!-- 菜单列表 -->
    <view class="menu-list">
      <view class="menu-item" @click="goToPrivacy">
        <view class="menu-left">
          <text class="menu-icon">🔒</text>
          <text class="menu-text">隐私政策</text>
        </view>
        <text class="menu-arrow">></text>
      </view>
      <view class="menu-item" @click="goToAgreement">
        <view class="menu-left">
          <text class="menu-icon">📄</text>
          <text class="menu-text">用户使用协议</text>
        </view>
        <text class="menu-arrow">></text>
      </view>
      <view class="menu-item" @click="goToAbout">
        <view class="menu-left">
          <text class="menu-icon">ℹ️</text>
          <text class="menu-text">关于我们</text>
        </view>
        <text class="menu-arrow">></text>
      </view>
      <view class="menu-item" @click="goToHelp">
        <view class="menu-left">
          <text class="menu-icon">❓</text>
          <text class="menu-text">帮助与反馈</text>
        </view>
        <text class="menu-arrow">></text>
      </view>
      <view class="menu-item" @click="goToInstructions">
        <view class="menu-left">
          <text class="menu-icon">❓</text>
          <text class="menu-text">使用说明</text>
        </view>
        <text class="menu-arrow">></text>
      </view>
    </view>

    <!-- 退出登录按钮 -->
    <view class="logout-card" @click="logout">
      <view class="logout-left">
        <text class="logout-icon">⬜</text>
        <text class="logout-text">退出登录</text>
      </view>
      <text class="logout-arrow">></text>
    </view> 
    <!-- 分割线 -->
    <view class="divider"></view>
    <TabBar />
  </view>
</template>

<style lang="scss" scoped>
.user-page {
  width: 100%;
  min-height: 100vh;
  padding: 20rpx;
  box-sizing: border-box;
  position: relative;
  padding-bottom: 120rpx; /* 为底部TabBar留出空间 */
}

.page-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  pointer-events: none;
  border-radius: 0;
}

/* 用户信息卡片 */
.user-card {
  display: flex;
  align-items: center;
  padding: 30rpx 30rpx;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
  backdrop-filter: blur(10rpx);
  position: relative;
  z-index: 5;
  margin-top: 100rpx;
}

.user-avatar {
  margin-right: 30rpx;
}

.avatar-img {
  width: 130rpx;
  height: 130rpx;
  border-radius: 60rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
}

.user-info {
  flex: 1;
}

.user-name {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 30rpx;
}

.user-phone {
  display: block;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.4);
}

/* 菜单列表 */
.menu-list {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  backdrop-filter: blur(10rpx);
  position: relative;
  z-index: 5;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 45rpx 30rpx;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);
  background-color: #260D43;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:active {
    background: rgba(255, 255, 255, 0.1);
  }
}

.menu-left {
  display: flex;
  align-items: center;
}

.menu-icon {
  font-size: 36rpx;
  margin-right: 25rpx;
}

.menu-text {
  font-size: 32rpx;
  color: #ffffff;
}

.menu-arrow {
  font-size: 32rpx;
  color: white;
  font-weight: bold;
}

/* 退出登录按钮 */
.logout-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 35rpx 30rpx;
  background: #260D43;
  border-radius: 20rpx;
  backdrop-filter: blur(10rpx);
  position: relative;
  z-index: 5;
  margin-top: 10rpx;
  
  &:active {
    background: rgba(255, 255, 255, 0.2);
  }
}

.logout-left {
  display: flex;
  align-items: center;
}

.logout-icon {
  font-size: 36rpx;
  margin-right: 25rpx;
}

.logout-text {
  font-size: 32rpx;
  color: #ffffff;
}

.logout-arrow {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.6);
  font-weight: bold;
}

.divider {
  width: 110vw;
  height: 1rpx;
  background-color: #572B83;
  margin: 320rpx auto 0 auto;
}
</style>