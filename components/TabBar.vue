<template>
<view class="bottom-nav">
  <view class="nav-item" @click="goHome()">
    <image 
      class="nav-icon" 
      :src="currentPagePath === 'pages/index/index' ? '/static/Home/home-SelectedHome.png' : '/static/Home/home-NormalHome.png'"></image>
  </view>
  <view class="nav-item" @click="redirectTo('pages/Login/LoginPage')">
    <image 
      class="nav-icon" 
      :src="currentPagePath === 'pages/Login/LoginPage' ? '/static/Home/home-SelectedAdd.png' : '/static/Home/home-NormalAdd.png'"></image>
  </view>
  <view class="nav-item" @click="redirectTo('pages/user/index')">
    <image 
      class="nav-icon" 
      :src="currentPagePath === 'pages/user/index' ? '/static/Home/home-SelectedMine.png' : '/static/Home/home-NormalMine.png'"></image>
  </view>
</view>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      currentPage: 'pages/index/index'
    }
  },
  computed: {
    currentPagePath() {
      // 实时获取当前页面路径
      const pages = getCurrentPages()
      if (pages.length > 0) {
        const currentPage = pages[pages.length - 1]
        const route = currentPage.route
        return route
      }
      return this.currentPage
    }
  },
  mounted() {
    // 获取当前页面路径
    this.updateCurrentPage()
  },
  onShow() {
    // 页面显示时更新当前页面状态
    this.updateCurrentPage()
  },
  methods: {
    updateCurrentPage() {
      const pages = getCurrentPages()
      if (pages.length > 0) {
        const currentPage = pages[pages.length - 1]
        this.currentPage = currentPage.route
      }
    },
         goHome() {
       // 使用reLaunch返回首页，清除所有页面栈
       uni.reLaunch({
         url: '/pages/index/index'
       })
     },
     redirectTo(url) {
       // 如果点击的是当前页面，不进行跳转
       if (this.currentPagePath === url) {
         return
       }
       
       // 更新当前页面状态
       this.currentPage = url
       
       // 使用reLaunch进行页面跳转，确保页面状态正确
       if (url === 'pages/index/index') {
         uni.switchTab({
           url: '/' + url
         })
       } else {
         // 对于其他页面，使用navigateTo
         uni.navigateTo({
           url: '/' + url
         })
       }
     }
  }
}
</script>

<style lang="scss" scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 100rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid #503b70;
  // background-color: #55ff69;
  // position: relative;
  // margin: 20rpx auto 0 auto;
  // box-sizing: border-box;
}
.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.nav-icon {
  width: 56rpx;
  height: 56rpx;
  display: block;
}
</style> 