<script>
import { request } from '../utils/request';
export default {
    data() {
        return {
            currentMonthStart: new Date(),
            currentMonthEnd: new Date(),
            
            //深睡百分占比
            deepSleepRatio: 0,
            //浅睡百分占比
            lightSleepRatio: 0,
            //深睡情况：1正常、2异常
            deepSleepStatus: 1,
            //浅睡情况：1正常、2异常
            lightSleepStatus: 1,
            //深睡时长
            deepSleepDuration: 0,
            //浅睡时长
            lightSleepDuration: 0,
            //清醒时长
            awakeDuration: 0,
            //周期X轴数据
            timeList: [],
            //周期睡眠数据
            monthSleepData: {
                deepSleep: [],
                lightSleep: [],
                awake: [],
                total: []
            },
            //获取到的数据
            monthReportData: [],
            //是否在加载中
            isLoading: false
        }
    },
    computed: {
        monthDateRange() {
            const start = this.currentMonthStart;
            const end = this.currentMonthEnd;
            const startYear = start.getFullYear();
            const startMonth = start.getMonth() + 1;
            const startDay = start.getDate();
            const endYear = end.getFullYear();
            const endMonth = end.getMonth() + 1;
            const endDay = end.getDate();
            
            if (startYear === endYear) {
                if (startMonth === endMonth) {
                    return `${startYear}年${startMonth}月${startDay}日--${endMonth}月${endDay}日`;
                } else {
                    return `${startYear}年${startMonth}月${startDay}日--${endMonth}月${endDay}日`;
                }
            } else {
                return `${startYear}年${startMonth}月${startDay}日--${endYear}年${endMonth}月${endDay}日`;
            }
        },
        // 计算月均睡眠时长
        averageSleepTime() {
            if (this.monthSleepData.deepSleep && this.monthSleepData.deepSleep.length > 0) {
                // 计算深睡平均时长
                const deepSleepTotal = this.monthSleepData.deepSleep.reduce((sum, hours) => sum + hours, 0);
                const deepSleepAverage = deepSleepTotal / this.monthSleepData.deepSleep.length;
                
                // 计算浅睡平均时长
                const lightSleepTotal = this.monthSleepData.lightSleep.reduce((sum, hours) => sum + hours, 0);
                const lightSleepAverage = lightSleepTotal / this.monthSleepData.lightSleep.length;
                
                // 计算总睡眠平均时长（深睡 + 浅睡）
                const totalAverage = deepSleepAverage + lightSleepAverage;
                
                const hours = Math.floor(totalAverage);
                const minutes = Math.round((totalAverage - hours) * 60);
                return `${hours}h ${minutes}m`;
            }
            return "0m";
        },
        
        // 深睡状态显示
        deepSleepStatusText() {
            return this.deepSleepStatus === 1 ? 'normal' : 'abnormal';
        },
        
        // 浅睡状态显示
        lightSleepStatusText() {
            return this.lightSleepStatus === 1 ? 'normal' : 'abnormal';
        }
    },
    mounted() {
        this.initCurrentMonth();
        this.getMonthReportData();
    },
    methods: {
        // 通用时长格式化函数：将小时数转换为"X小时Y分钟"或"Y分钟"
        formatDuration(duration) {
            if (duration && duration > 0) {
                const hours = Math.floor(duration);
                const minutes = Math.round((duration - hours) * 60);
                
                // 当不满一小时时，只显示分钟
                if (hours === 0) {
                    return `${minutes}m`;
                }
                
                // 当有小时时，显示"X小时Y分钟"
                return `${hours}h ${minutes}m`;
            }
            return "0m";
        },
        
        //获取月报告数据
        async getMonthReportData() {
            this.isLoading = true;
            try {
                const requestData = {
                    url: '/web/develop/home/Admin/getCycleReport',
                    method: 'GET',
                    data: {
                        type: 'month',
                        device_id: "ul-28bbed43208d"
                    }
                };
                const res = await request(requestData);
                this.monthReportData = res.data;
                console.log("月报告数据获取成功:", this.monthReportData);
                
                //统计图：时间轴
                this.timeList = this.monthReportData.timeList;
                
                // 统计图数据：将数据转换为小时并赋值给数组
                const data = this.monthReportData;
                if (data.deep_value && Array.isArray(data.deep_value)) {
                    this.monthSleepData.deepSleep = data.deep_value.map(minutes => minutes / 60);
                }
                if (data.light_value && Array.isArray(data.light_value)) {
                    this.monthSleepData.lightSleep = data.light_value.map(minutes => minutes / 60);
                }
                if (data.wake_value && Array.isArray(data.wake_value)) {
                    this.monthSleepData.awake = data.wake_value.map(minutes => minutes / 60);
                }  
                this.deepSleepDuration = data.deep_time / 60;
                this.lightSleepDuration = data.light_time / 60;
                this.awakeDuration = data.wake_time / 60;
                this.deepSleepRatio = data.deep_ratio;
                this.lightSleepRatio = data.light_ratio;
                this.deepSleepStatus = data.deep_status;
                this.lightSleepStatus = data.light_status;
            } catch (e) {
                console.log('获取月报告数据失败:', e);
            } finally {
                this.isLoading = false;
            }
        },
        
        initCurrentMonth() {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();
            
            // 本月开始（1号）
            const monthStart = new Date(year, month, 1);
            
            // 本月结束（月末）
            const monthEnd = new Date(year, month + 1, 0);
            
            this.currentMonthStart = monthStart;
            this.currentMonthEnd = monthEnd;
        },
        
        goToPreviousMonth() {
            const newStart = new Date(this.currentMonthStart);
            const newEnd = new Date(this.currentMonthEnd);
            
            newStart.setMonth(newStart.getMonth() - 1);
            newEnd.setMonth(newEnd.getMonth() - 1);
            newEnd.setDate(new Date(newEnd.getFullYear(), newEnd.getMonth() + 1, 0).getDate());
            
            this.currentMonthStart = newStart;
            this.currentMonthEnd = newEnd;
            this.getMonthReportData();
        },
        
        goToNextMonth() {
            const newStart = new Date(this.currentMonthStart);
            const newEnd = new Date(this.currentMonthEnd);
            
            newStart.setMonth(newStart.getMonth() + 1);
            newEnd.setMonth(newEnd.getMonth() + 1);
            newEnd.setDate(new Date(newEnd.getFullYear(), newEnd.getMonth() + 1, 0).getDate());
            
            this.currentMonthStart = newStart;
            this.currentMonthEnd = newEnd;
            this.getMonthReportData();
        },
        isVisibleLabel(index) {
            if (this.timeList && this.timeList.length > 0) {
                const day = parseInt(this.timeList[index]);
                const totalDays = this.timeList.length;
                
                // 总是显示1号
                if (day === 1) return true;
                
                // 显示最后一天，但不显示31号
                if (day === totalDays && day !== 31) return true;
                
                // 显示4的倍数
                if (day % 5 === 0) return true;
                
                // 对于较短的月份，增加一些中间标签
                if (totalDays <= 30) {
                    if (day === 3 || day === 7 || day === 12 || day === 17 || day === 21 || day === 27) return true;
                }
            }
            return false;
        }
    }
}
</script>

<template>
    <view class="week-report">
        
        <!-- 睡眠时长统计模块 -->
        <view class="sleep-stats">
            <!-- 月均睡眠时长 -->
            <view class="stats-header">
                <image src="/static/Report/report-sleep.png" class="stats-icon"></image>
                <text class="stats-title">Sleep duration</text>
            </view>
            <view class="stats-value">
                <text class="time-value">{{ averageSleepTime }}</text>
            </view>
            <!-- 一月睡眠时长图表 -->
            <view class="chart-container">
                <!-- Y轴标签 -->
                <view class="y-axis">
                    <text class="y-label">20H</text>
                    <text class="y-label">15H</text>
                    <text class="y-label">10H</text>
                    <text class="y-label">5H</text>
                    <text class="y-label">0H</text>
                </view>
                <!-- 图表主体 -->
                <view class="chart-main">
                    <!-- 水平网格线 -->
                    <view class="grid-lines">
                        <view class="grid-line"></view>
                        <view class="grid-line"></view>
                        <view class="grid-line"></view>
                        <view class="grid-line"></view>
                        <view class="grid-line"></view>
                    </view>
                    
                    <!-- 柱状图 -->
                    <view class="chart-bars">
                        <view 
                            v-for="(deep, index) in monthSleepData.deepSleep" 
                            :key="index" 
                            class="chart-bar"
                        >
                            <!-- 清醒 -->
                            <view 
                                class="bar-segment awake"
                                :style="{ height: (monthSleepData.awake[index] * 100 / 20) + '%' }"
                            ></view>
                            <!-- 浅睡 -->
                            <view 
                                class="bar-segment light-sleep"
                                :style="{ height: (monthSleepData.lightSleep[index] * 100 / 20) + '%' }"
                            ></view>
                            <!-- 深睡 -->
                            <view 
                                class="bar-segment deep-sleep"
                                :style="{ height: (deep * 100 / 20) + '%' }"
                            ></view>
                        </view>
                    </view>
                    <!-- X轴标签 -->
                    <view class="x-axis">
                        <text 
                            v-for="(day, index) in timeList" 
                            :key="index" 
                            class="x-label"
                            :class="{ 'x-label-visible': isVisibleLabel(index) }"
                        >{{ day }}</text>
                    </view>
                </view>
            </view>
            <!-- 图例 -->
            <view class="chart-legend">
                <view class="legend-item">
                    <view class="legend-color deep-sleep"></view>
                    <text class="legend-text">Deep Sleep</text>
                </view>
                <view class="legend-item">
                    <view class="legend-color light-sleep"></view>
                    <text class="legend-text">Light Sleep</text>
                </view>
                <view class="legend-item">
                    <view class="legend-color awake"></view>
                    <text class="legend-text">Awake</text>
                </view>
            </view>
        </view>

        <!-- 睡眠质量模块 -->
        <view class="sleep-stats">
            <view class="stats-header">
                <image src="/static/Report/report-sleep.png" class="stats-icon"></image>
                <text class="stats-title">Sleep Quality</text>
            </view>
            
            <!-- 睡眠质量指标列表 -->
            <view class="sleep-quality-list">
                <!-- 月均浅睡时长 -->
                <view class="quality-item">
                    <view class="quality-color-bar light-sleep-color"></view>
                    <view class="quality-info">
                        <text class="quality-title">Light Sleep</text>
                        <view class="quality-details">
                            <text class="quality-duration">{{ formatDuration(lightSleepDuration) }}</text>
                            <text class="quality-percentage">{{ lightSleepRatio }}%</text>
                        </view>
                    </view>
                    <view class="quality-status">
                        <view class="status-badge" :class="lightSleepStatus === 1 ? 'normal' : 'warning'">
                            {{ lightSleepStatusText }}
                        </view>
                    </view>
                </view>
                
                <!-- 月均深睡时长 -->
                <view class="quality-item">
                    <view class="quality-color-bar deep-sleep-color"></view>
                    <view class="quality-info">
                        <text class="quality-title">Deep Sleep</text>
                        <view class="quality-details">
                            <text class="quality-duration">{{ formatDuration(deepSleepDuration) }}</text>
                            <text class="quality-percentage">{{ deepSleepRatio }}%</text>
                        </view>
                    </view>
                    <view class="quality-status">
                        <view class="status-badge" :class="deepSleepStatus === 1 ? 'normal' : 'warning'">
                            {{ deepSleepStatusText }}
                        </view>
                    </view>
                </view>
                
                <!-- 月均清醒时长 -->
                <view class="quality-item">
                    <view class="quality-color-bar awake-color"></view>
                    <view class="quality-info">
                        <text class="quality-title">Awake</text>
                        <view class="quality-details">
                            <text class="quality-duration">{{ formatDuration(awakeDuration) }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style scoped>
.week-report {
    padding: 20rpx;
}

/* 导航按钮样式 */
.nav-button {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
}

.nav-button:hover {
    background: #e8e8e8;
    transform: scale(1.02);
}

.nav-button:active {
    transform: scale(0.98);
}

/* 周报告内容样式 */
.week-content {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20rpx;
    padding: 40rpx;
    text-align: center;
    backdrop-filter: blur(10rpx);
}

/* 睡眠时长统计模块样式 */
.sleep-stats {
    margin-top: 30rpx;
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 40rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.2);
}

/* 日均睡眠时长样式 */
.stats-header {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
}

.stats-icon {
    width: 54rpx;
    height: 54rpx;
    margin-right: 20rpx;
}

.stats-title {
    font-size: 36rpx;
    color: #000000;
    font-weight: 700;
    margin: 20rpx 0 20rpx 0;
}

.stats-value {
    margin-bottom: 40rpx;
}

.time-value {
    font-size: 48rpx;
    color: #000000;
    font-weight: bold;
}

/* 睡眠图表样式 */
.chart-container {
    position: relative;
    height: 700rpx;
    margin-bottom: 40rpx;
}

/* Y轴样式 */
.y-axis {
    position: absolute;
    left: 0;
    top: 0;
    height: 65%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80rpx;
}

.y-label {
    font-size: 24rpx;
    color: #000000;
    text-align: right;
    padding-right: 20rpx;
}

/* 图表主体样式 */
.chart-main {
    position: relative;
    height: 65%;
    margin-left: 80rpx;
    margin-right: 40rpx;
}

/* 网格线样式 */
.grid-lines {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.grid-line {
    height: 1rpx;
    background: rgba(176, 176, 176, 0.3);
    width: 100%;
}

/* 柱状图样式 */
.chart-bars {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
}

.chart-bar {
    width: 16rpx;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    align-items: center;
}

.bar-segment {
    width: 100%;
    border-radius: 2rpx 2rpx 0 0;
    transition: all 0.3s ease;
    min-height: 2rpx;
}

.bar-segment.deep-sleep {
    background: #5D5FEF;
}

.bar-segment.light-sleep {
    background: #8B7CFF;
}

.bar-segment.awake {
    background: #FFD600;
}

/* X轴样式 */
.x-axis {
    position: absolute;
    bottom: -50rpx;
    left: 0;
    right: 40rpx;
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.x-label {
    font-size: 18rpx;
    text-align: center;
    width: 16rpx;
    transform-origin: center;
    white-space: nowrap;
    opacity: 0.3;
    transition: opacity 0.3s ease;
    color: #FFF;
}

.x-label-visible {
    opacity: 1;
    color: #000000;
    font-weight: 500;
}

/* 图例样式 */
.chart-legend {
    display: flex;
    justify-content: center;
    gap: 60rpx;
    margin-top: -180rpx;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 16rpx;
}

.legend-color {
    width: 24rpx;
    height: 24rpx;
    border-radius: 50%;
}

.legend-color.deep-sleep {
    background: #5D5FEF;
}

.legend-color.light-sleep {
    background: #8B7CFF;
}

.legend-color.awake {
    background: #FFD600;
}

.legend-text {
    font-size: 28rpx;
    color: #000000;
}

/* 睡眠质量模块样式 */
.sleep-quality-list {
    margin-top: 30rpx;
}

.quality-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 0;
    border-bottom: 1rpx solid rgba(176, 176, 176, 0.2);
    position: relative;
}

.quality-item:last-child {
    border-bottom: none;
}

.quality-color-bar {
    width: 8rpx;
    height: 100rpx;
    border-radius: 4rpx;
    margin-right: 20rpx;
    flex-shrink: 0;
}

.light-sleep-color {
    background: #8B7CFF;
}

.deep-sleep-color {
    background: #5D5FEF;
}

.awake-color {
    background: #FFD600;
}

.quality-info {
    flex: 1;
}

.quality-title {
    font-size: 32rpx;
    color: #000000;
    font-weight: 500;
    display: block;
    margin-bottom: 16rpx;
}

.quality-details {
    display: flex;
    align-items: center;
    gap: 20rpx;
}

.quality-duration {
    font-size: 28rpx;
    color: #000000;
    font-weight: 400;
}

.quality-percentage {
    font-size: 28rpx;
    color: #000000;
    font-weight: 400;
}

.quality-status {
    display: flex;
    align-items: center;
    gap: 20rpx;
}

.status-badge {
    padding: 8rpx 20rpx;
    border-radius: 20rpx;
    font-size: 24rpx;
    font-weight: 500;
    min-width: 80rpx;
    text-align: center;
}

.status-badge.normal {
    background: #10B981;
    color: #FFFFFF;
}

.status-badge.warning {
    background: #F59E0B;
    color: #FFFFFF;
}

.arrow-icon {
    font-size: 32rpx;
    color: #B0B0B0;
    font-weight: bold;
}
</style>