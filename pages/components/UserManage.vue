<script>
export default {
  data() {
    return {
      // 用户列表数据
      userList: [
        {
          id: 1,
          name: '张三',
          phone: '138****8888',
          deviceId: 'ul-28bbed43208d',
          status: 'active',
          lastLogin: '2025-01-15 08:30',
          sleepScore: 85,
          deviceStatus: 'online'
        },
        {
          id: 2,
          name: '李四',
          phone: '139****9999',
          deviceId: 'ul-28bbed43209e',
          status: 'inactive',
          lastLogin: '2025-01-14 22:15',
          sleepScore: 72,
          deviceStatus: 'offline'
        },
        {
          id: 3,
          name: '王五',
          phone: '137****7777',
          deviceId: 'ul-28bbed4320af',
          status: 'active',
          lastLogin: '2025-01-15 07:45',
          sleepScore: 91,
          deviceStatus: 'online'
        },
        {
          id: 4,
          name: '赵六',
          phone: '136****6666',
          deviceId: 'ul-28bbed4320bg',
          status: 'active',
          lastLogin: '2025-01-15 06:20',
          sleepScore: 78,
          deviceStatus: 'online'
        },
        {
          id: 5,
          name: '钱七',
          phone: '135****5555',
          deviceId: 'ul-28bbed4320ch',
          status: 'inactive',
          lastLogin: '2025-01-13 21:30',
          sleepScore: 65,
          deviceStatus: 'offline'
        }
      ],
      // 搜索关键词
      searchKeyword: '',
      // 筛选状态
      filterStatus: 'all',
      // 滚动位置
      scrollTop: 0
    }
  },
  computed: {
    // 过滤后的用户列表
    filteredUserList() {
      let list = this.userList;
      
      // 按状态筛选
      if (this.filterStatus !== 'all') {
        list = list.filter(user => user.status === this.filterStatus);
      }
      
      // 按关键词搜索
      if (this.searchKeyword) {
        list = list.filter(user => 
          user.name.includes(this.searchKeyword) || 
          user.phone.includes(this.searchKeyword) ||
          user.deviceId.includes(this.searchKeyword)
        );
      }
      
      return list;
    },
    // 统计信息
    statistics() {
      const total = this.userList.length;
      const active = this.userList.filter(u => u.status === 'active').length;
      const online = this.userList.filter(u => u.deviceStatus === 'online').length;
      const avgScore = Math.round(
        this.userList.reduce((sum, u) => sum + u.sleepScore, 0) / total
      );
      
      return { total, active, online, avgScore };
    }
  },
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
    // 切换用户状态
    toggleUserStatus(user) {
      user.status = user.status === 'active' ? 'inactive' : 'active';
    },
    // 查看用户详情
    viewUserDetail(user) {
      uni.showToast({
        title: `查看${user.name}的详情`,
        icon: 'none'
      });
    },
    // 编辑用户信息
    editUser(user) {
      uni.showToast({
        title: `编辑${user.name}的信息`,
        icon: 'none'
      });
    },
    // 删除用户
    deleteUser(user) {
      uni.showModal({
        title: '确认删除',
        content: `确定要删除用户 ${user.name} 吗？`,
        success: (res) => {
          if (res.confirm) {
            const index = this.userList.findIndex(u => u.id === user.id);
            if (index > -1) {
              this.userList.splice(index, 1);
              uni.showToast({
                title: '删除成功',
                icon: 'success'
              });
            }
          }
        }
      });
    },
    // 滚动事件
    onScroll(e) {
      this.scrollTop = e.detail.scrollTop;
    }
  }
}
</script>

<template>
  <view class="user-manage-container">
    <!-- 背景图片 -->
    <image 
      src="https://usleep.will-tec.com/develop/User/img/home-background.png"
      class="bg-image" 
      mode="aspectFill"
    ></image>
    
    <!-- 顶部导航栏 -->
    <view class="life-top">
      <view class="life-top-left">
        <image src="/static/Report/life-leftArrow.png" class="life-top-icon" @click="goBack"></image>
        <image src="/static/Home/back-home.png" class="life-top-icon" @click="goHome"></image>
      </view>
      <view class="life-Title">用户管理</view>
    </view>

    <!-- 主要内容区 -->
    <view class="main-content">
      <!-- 统计卡片 -->
      <view class="stats-section">
        <view class="stat-card">
          <view class="stat-number">{{ statistics.total }}</view>
          <view class="stat-label">总用户数</view>
        </view>
        <view class="stat-card">
          <view class="stat-number">{{ statistics.active }}</view>
          <view class="stat-label">活跃用户</view>
        </view>
        <view class="stat-card">
          <view class="stat-number">{{ statistics.online }}</view>
          <view class="stat-label">在线设备</view>
        </view>
        <view class="stat-card">
          <view class="stat-number">{{ statistics.avgScore }}</view>
          <view class="stat-label">平均评分</view>
        </view>
      </view>

      <!-- 搜索和筛选 -->
      <view class="search-filter-section">
        <view class="search-box">
          <image src="/static/Home/home-search.svg" class="search-icon" />
          <input 
            v-model="searchKeyword"
            placeholder="搜索用户名、手机号或设备ID"
            class="search-input"
          />
        </view>
        <view class="filter-tabs">
          <view 
            class="filter-tab" 
            :class="{ active: filterStatus === 'all' }"
            @click="filterStatus = 'all'"
          >
            全部
          </view>
          <view 
            class="filter-tab" 
            :class="{ active: filterStatus === 'active' }"
            @click="filterStatus = 'active'"
          >
            活跃
          </view>
          <view 
            class="filter-tab" 
            :class="{ active: filterStatus === 'inactive' }"
            @click="filterStatus = 'inactive'"
          >
            非活跃
          </view>
        </view>
      </view>

      <!-- 用户列表 -->
      <view class="user-list-section">
        <view class="section-title">
          <image src="/static/Home/home-UserManagement.png" class="title-icon" />
          <text class="title-text">用户列表</text>
        </view>
        
        <scroll-view 
          class="user-list-scroll" 
          scroll-y="true"
          :scroll-top="scrollTop"
          @scroll="onScroll"
        >
          <view class="user-list">
            <view 
              class="user-item" 
              v-for="user in filteredUserList" 
              :key="user.id"
            >
              <view class="user-avatar">
                <text class="avatar-text">{{ user.name.charAt(0) }}</text>
              </view>
              
              <view class="user-info">
                <view class="user-name">{{ user.name }}</view>
                <view class="user-details">
                  <text class="user-phone">{{ user.phone }}</text>
                  <text class="user-device">{{ user.deviceId }}</text>
                </view>
                <view class="user-meta">
                  <text class="last-login">最后登录: {{ user.lastLogin }}</text>
                  <text class="sleep-score">睡眠评分: {{ user.sleepScore }}</text>
                </view>
              </view>
              
              <view class="user-status">
                <view 
                  class="status-badge" 
                  :class="user.status"
                  @click="toggleUserStatus(user)"
                >
                  {{ user.status === 'active' ? '活跃' : '非活跃' }}
                </view>
                <view 
                  class="device-status" 
                  :class="user.deviceStatus"
                >
                  {{ user.deviceStatus === 'online' ? '在线' : '离线' }}
                </view>
              </view>
              
              <view class="user-actions">
                <view class="action-btn view" @click="viewUserDetail(user)">
                  <image src="/static/Home/home-NormalHome.png" class="action-icon" />
                </view>
                <view class="action-btn edit" @click="editUser(user)">
                  <image src="/static/Home/home-NormalAdd.png" class="action-icon" />
                </view>
                <view class="action-btn delete" @click="deleteUser(user)">
                  <image src="/static/Home/home-NormalMine.png" class="action-icon" />
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
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
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}

// 顶部导航栏样式
.life-top{
  width: 100%;
  height: 100rpx;
  display: flex;
  margin-top: 20rpx;
  position: relative;
  z-index: 10;
}

.life-top-left{
  width: 150rpx;
  height: 60rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 30rpx;
  margin:20rpx 0 0 40rpx;
  background-color: rgba(255,255,255,0.1);
}

.life-top-icon{
  width: 50rpx;
  height: 50rpx;
}

.life-Title{
  font-size: 34rpx;
  color: #fff;
  font-weight: bold;
  margin-left: 120rpx;
  margin-top: 26rpx;
}

// 主内容区样式
.main-content {
  position: relative;
  z-index: 1;
  padding: 32rpx;
  padding-top: 40rpx;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
  margin-bottom: 40rpx;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20rpx;
  padding: 32rpx 24rpx;
  text-align: center;
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
}

.stat-number {
  font-size: 48rpx;
  font-weight: bold;
  color: #3bb18a;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: 24rpx;
  color: #ffffff;
  opacity: 0.8;
}

.search-filter-section {
  margin-bottom: 40rpx;
}

.search-box {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
}

.search-icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 16rpx;
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
}

.search-input {
  flex: 1;
  color: #ffffff;
  font-size: 28rpx;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.filter-tabs {
  display: flex;
  gap: 16rpx;
}

.filter-tab {
  flex: 1;
  text-align: center;
  padding: 20rpx 16rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12rpx;
  color: rgba(255, 255, 255, 0.8);
  font-size: 26rpx;
  transition: all 0.3s ease;
}

.filter-tab.active {
  background: #3bb18a;
  color: #ffffff;
  font-weight: bold;
}

.user-list-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20rpx;
  padding: 32rpx;
  backdrop-filter: blur(10rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  height: 60vh;
  display: flex;
  flex-direction: column;
}

.section-title {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
  flex-shrink: 0;
}

.title-icon {
  width: 48rpx;
  height: 48rpx;
  margin-right: 16rpx;
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
}

.title-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #ffffff;
}

.user-list-scroll {
  flex: 1;
  height: 100%;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  padding-bottom: 20rpx;
}

.user-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16rpx;
  padding: 24rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #3bb18a, #2a8cff);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.avatar-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #ffffff;
}

.user-info {
  flex: 1;
  margin-right: 24rpx;
}

.user-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 8rpx;
}

.user-details {
  display: flex;
  gap: 16rpx;
  margin-bottom: 8rpx;
}

.user-phone, .user-device {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.7);
}

.user-meta {
  display: flex;
  gap: 16rpx;
}

.last-login, .sleep-score {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.6);
}

.user-status {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  margin-right: 24rpx;
  align-items: center;
}

.status-badge {
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  font-size: 22rpx;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.status-badge.active {
  background: #3bb18a;
}

.status-badge.inactive {
  background: #ff7f27;
}

.device-status {
  padding: 6rpx 12rpx;
  border-radius: 16rpx;
  font-size: 20rpx;
  color: #ffffff;
}

.device-status.online {
  background: #3bb18a;
}

.device-status.offline {
  background: #888888;
}

.user-actions {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.action-btn {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.view {
  background: rgba(59, 177, 138, 0.2);
  border: 1rpx solid #3bb18a;
}

.action-btn.edit {
  background: rgba(42, 140, 255, 0.2);
  border: 1rpx solid #2a8cff;
}

.action-btn.delete {
  background: rgba(255, 127, 39, 0.2);
  border: 1rpx solid #ff7f27;
}

.action-icon {
  width: 24rpx;
  height: 24rpx;
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
}

.action-btn:hover {
  transform: scale(1.1);
}
</style>