<template>
    <view class="content">
        <!--背景图-->
          <image
              class="bg-image"
              src="https://usleep.will-tec.com/develop/User/img/home-background.png"
              mode="aspectFill"
          ></image>
          <view class="logo-container">
           <!--中间logo大图-->
            <view class="header">
              <view class="logo-box">
                <image class="usleep-logo" src="/static/Home/login-Logo.png" mode="widthFix"></image>
              </view>
              <text class="usleep-title">Usleep</text>
           </view>
           <!--登录按钮-->
           <view class="login-btn-group">
            <button 
            class="login-btn main-btn" 
            :class="{ 'loading': isLoading, 'disabled': !checked }"
            :disabled="!checked"
            open-type="agreePrivacyAuthorization|getPhoneNumber" 
            @getphonenumber="GetPhoneNumber"
            @agreePrivacyAuthorization="AgreePrivacyAuthorization"
            @click="handleGetPhoneNumber"
            >
              <text v-if="!isLoading" class="login-btn-phone">手机快捷登录</text>
              <text v-else class="login-btn-phone">登录中...</text>
            </button>
           </view>
           <!-- 协议勾选区 -->
           <view class="protocol-container-box">
             <view class="protocol-container" @click="checked = !checked">
            <view class="checkbox">
              <view v-if="checked" class="checkbox-inner"></view>
            </view>
            <text class="protocol-text">
              我已阅读并同意
              <text class="protocol-link">《用户协议》</text>
              和
              <text class="protocol-link">《隐私政策》</text>
            </text>
           </view>
          </view>
          <!-- 分割线 -->
          <view class="divider"></view>
          <!-- 底部导航栏 -->
          <TabBar />
          </view>
    </view>
</template>
  
<script>
import { getUserPhoneNumber } from '../../api/api'
import TabBar from '../../components/TabBar.vue'
import userManager from '../../utils/userManager'
  export default {
    components: {
      TabBar
    },
    data() {
      return {
        checked: false,
        isLoading: false,
        code: '',
      }
    },
    methods: {
      async GetPhoneNumber(e){
        if (e.detail.code) {
          this.code = e.detail.code
          // 获取到code后直接执行登录流程
          this.executeLogin()
        } else {
          console.log("获取code失败:", e.detail)
          uni.showToast({
            title: '获取手机号授权失败',
            icon: 'none'
          })
        }
      },
      // 处理登录按钮点击事件
      async handleGetPhoneNumber() {
        // 按钮已通过 disabled 属性控制，这里不需要额外检查
        // 如果按钮被禁用，这个方法不会被调用
      },
      
      // 执行实际的登录流程
      async executeLogin() {
        if (this.isLoading) return
        this.isLoading = true

        uni.showLoading({
          title: '正在登录',
          mask: true
        })
        
        try {
          if (!this.code) {
            console.log("没有获取到code，无法登录")
            uni.hideLoading()
            this.isLoading = false
            uni.showToast({
              title: '获取授权失败，请重试',
              icon: 'none'
            })
            return
          }
          
          console.log("开始调用登录接口，code:", this.code)
          
          // 调用getUserPhoneNumber接口
          const response = await getUserPhoneNumber({
            code: this.code
          });
          
          console.log("登录接口响应:", response)
          
          // 保存用户信息到本地存储
          if (response && response.code === 200 && response.data) {
            console.log("登录成功，保存用户信息:", response.data)
            const userData = response.data
            const success = userManager.saveUserInfo(userData, userData.token || '')
            if (success) {
              console.log("用户信息保存成功")
              // 注意：这里移除了对 Pinia store 的依赖，因为它在 uni-app 中可能不兼容
              // 用户状态通过 userManager 管理，首页会通过 userManager.getUserInfo() 获取状态
            }
            
            // 显示登录成功提示
            uni.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1000
            })
          
            // 跳转首页
            setTimeout(() => {
              console.log("准备跳转到首页")
              uni.reLaunch({
                url: '/pages/index/index'
              })
            }, 1000)
          } else {
            console.log("登录失败，响应数据异常:", response)
            uni.showToast({
              title: '登录失败，请重试',
              icon: 'none'
            })
          }
        } catch (err) {
          console.log("登录过程发生错误:", err)
          uni.showToast({
            title: '登录失败，请重试',
            icon: 'none'
          })
        } finally {
          uni.hideLoading()
          this.isLoading = false
        }
      },
    }
  }
</script>
  
<style lang="scss" scoped>
  .content {
      width: 100vw;
      // height: 100vh;
      position: relative;
      // overflow: hidden;
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
  .header {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
    position: relative;
  }
  .logo-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; 
    z-index: 1;
    padding-top: 80rpx; 
  }
  .logo-image {
    width: 100vw;
    height: 100vh;
    z-index: 1;
  }
  .logo-box {
    width: 200rpx; 
    height: 200rpx;
    margin: 160rpx auto 24rpx auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .usleep-logo {
    width: 220rpx; 
    height: 220rpx;
    display: block;
    z-index: 2;
  }
  .usleep-title {
    font-size: 48rpx; 
    color: #fff;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 1.2;
    margin-top: 20rpx;
    font-family: AlibabaPuHuiTiVF;
    text-align: center;
  }
  .login-btn-group {
    width: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    gap: 25rpx;
    margin-top: 110rpx;
  }
  .login-btn {
    width: 80vw;
    height: 100rpx;
    background-color: #fff;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
    font-weight: Medium;
    font-family: PingFangSC-Medium;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border: none;
    outline: none;
    padding: 0;
    
    &::after {
      border: none;
    }
    
    &.loading {
      opacity: 0.7;
      pointer-events: none;
    }
    
    &.disabled {
      opacity: 0.5;
      pointer-events: none;
      background: rgba(255, 255, 255, 0.3) !important;
    }
  }
  .main-btn {
    background: linear-gradient(90deg, #EAE7EE 0%, #D291F4 100%);
    color: #fff;
    border: none;
    
    &:active {
      transform: scale(0.98);
    }
  }
  .secondary-btn {
    background: rgba(255,255,255,0.2);
    background-color: rgba(255,255,255,0.2);
    color: #fff;
  }
  .login-btn-phone {
    color: #000;
    font-weight: bolder;
    font-family: PingFangSC-Medium;
  }
  .login-btn-code {
    font-size: 32rpx;
    font-weight: Medium;
    font-family: PingFangSC-Medium;
  }
  .protocol-container-box {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
  .protocol-container {
    margin-top: 60rpx;
    min-height: 40rpx;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    color: #fff;
  }
  .checkbox {
    width: 32rpx;
    height: 32rpx;
    border: 2rpx solid #fff;
    border-radius: 50%;
    margin-right: 18rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
  }
  .checkbox-inner {
    width: 20rpx;
    height: 20rpx;
    background: #fff;
    border-radius: 50%;
  }
  .protocol-text {
    color: rgba(255,255,255,0.5);
  }
  .protocol-link {
    color: #D291F4;
    margin: 0 4rpx;
    text-decoration: underline;
    cursor: pointer;
  }
  .divider {
    width: 100vw;
    height: 1px;
    background-color: #572B83;
    margin: 86vw auto 0 auto;
    z-index: 1;
  }
</style>