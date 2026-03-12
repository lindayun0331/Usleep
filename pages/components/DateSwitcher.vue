<template>
  <view class="week-data-switcher">
    <!-- 周数据展示 -->
    <view class="week-data-container">
      <!-- 星期标题行 -->
      <view class="week-header">
        <view class="week-day" v-for="day in weekDays" :key="day.label">
          {{ day.label }}
        </view>
      </view>
      <!-- 睡眠得分进度条行 -->
      <view class="week-progress">
        <view 
          class="progress-item" 
          v-for="(day, index) in weekData" 
          :key="index"
          :class="{ active: day.isCurrent, 'no-data': !day.hasData }"
          @click="selectDate(day.date)"
        >
          <!-- 有数据时显示进度条 -->
          <view v-if="day.hasData" class="progress-circle">
            <view class="progress-ring">
              <view 
                class="progress-fill" 
                :style="{ 
                  '--progress-color': day.color,
                  '--percentage': day.percentage 
                }"
              ></view>
            </view>
          </view>
          <!-- 无数据时根据日期类型显示不同样式 -->
          <view v-else class="no-data-indicator" :class="{ 'future-date': day.isFutureDate }">
            <!-- 过去的日期和当天显示× -->
            <view v-if="!day.isFutureDate" class="no-data-mark">×</view>
            <!-- 未来的日期显示空心圆 -->
            <view v-else class="future-date-circle"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { request } from '../../utils/request';

function formatDate(date) {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getWeekRange(date) {
  const current = new Date(date);
  const day = current.getDay();
  const diff = current.getDate() - day;
  
  const weekStart = new Date(current.setDate(diff));
  const weekEnd = new Date(current.setDate(diff + 6));
  
  return {
    start: formatDate(weekStart),
    end: formatDate(weekEnd)
  };
}

export default {
  props: {
    initialDate: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentDate: this.initialDate || formatDate(new Date()),
      weekDays: [
        { label: 'Sun', value: 0 },
        { label: 'Mon', value: 1 },
        { label: 'Tue', value: 2 },
        { label: 'Wed', value: 3 },
        { label: 'Thu', value: 4 },
        { label: 'Fri', value: 5 },
        { label: 'Sat', value: 6 }
      ],
             weekData: []
    }
  },
  computed: {
    weekRangeText() {
      const range = getWeekRange(this.currentDate);
      const startDate = new Date(range.start);
      const endDate = new Date(range.end);
      
      const startMonth = startDate.getMonth() + 1;
      const endMonth = endDate.getMonth() + 1;
      const startDay = startDate.getDate();
      const endDay = endDate.getDate();
      
      if (startMonth === endMonth) {
        return `${startMonth}月${startDay}日-${endDay}日`;
      } else {
        return `${startMonth}月${startDay}日-${endMonth}月${endDay}日`;
      }
    }
  },
  created() {
    this.generateWeekData();
  },
  watch: {
    currentDate() {
      this.generateWeekData();
    }
  },
  methods: {
    emitChange() {
      this.$emit('change', this.currentDate);
    },
    
    // 生成一周的数据
    async generateWeekData() {
      const range = getWeekRange(this.currentDate);
      const startDate = new Date(range.start);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 重置时间部分，只比较日期
      
      this.weekData = [];
       
       try {
        // 为每一天获取睡眠数据
        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          const dateStr = formatDate(date);
          const isCurrent = dateStr === this.currentDate;
          
          // 今天为过去的日期
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          const targetDate = new Date(date);
          targetDate.setHours(0, 0, 0, 0);
          
          // 明天及以后的日期是未来日期
          const isFutureDate = targetDate > currentDate;
          
          // 获取该日期的睡眠数据
          const sleepData = await this.getSleepDataForDate(dateStr);
          this.weekData.push({
            date: dateStr,
            score: sleepData.score || 0,
            hasData: sleepData.hasData || false,
            isCurrent: isCurrent,
            isFutureDate: isFutureDate, // 添加未来日期标识
            percentage: sleepData.hasData ? ((sleepData.score || 0) / 100) * 360 : 0,
            color: this.getScoreColor(sleepData.score || 0)
          });
        }
      } catch (error) {
        // 静默处理错误，不打印到控制台
         this.generateMockWeekData(startDate);
      }
    },
    
    // 获取指定日期的睡眠数据
    async getSleepDataForDate(dateStr) {
      try {
        const apiDate = this.toApiDate(dateStr);
        const res = await request({
          url: '/web/develop/home/Admin/getReport',
          method: 'GET',
          data: {
            date: apiDate,
            device_id: "ul-28bbed43208d"
          }
        });
        
        if (res && res.code === 200 && res.data && res.data.length > 0) {
          return {
            hasData: true,
            score: res.data[0].score || 0
          };
        } else {
          return {
            hasData: false,
            score: 0
          };
        }
      } catch (error) {
        // 静默处理错误，不打印到控制台
        return {
          hasData: false,
          score: 0
        };
      }
    },
    
    // 转换为API日期格式
    toApiDate(dateStr) {
      try {
        const date = dateStr && typeof dateStr === 'string' ? dateStr : this.currentDate;
        // 创建日期对象并减去一天
        const dateObj = new Date(date);
        dateObj.setDate(dateObj.getDate() - 1);
        
        // 格式化为 YYYY-MM-DD
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        // 拼接为 UTC 字符串
        return `${formattedDate}T16:00:00.000Z`;
      } catch (e) {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        return `${formattedDate}T16:00:00.000Z`;
      }
    },
    
    // 生成模拟数据
    generateMockWeekData(startDate) {
      this.weekData = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 重置时间部分，只比较日期
      
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const dateStr = formatDate(date);
        const isCurrent = dateStr === this.currentDate;
        
        // 修改逻辑：今天被视为过去的日期，只有明天及以后才是未来日期
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);
        
        // 只有明天及以后的日期才被认为是未来日期
        const isFutureDate = targetDate > currentDate;
        const hasData = Math.random() > 0.3;
        const score = hasData ? Math.floor(Math.random() * 40) + 60 : 0; // 60-100分
        
        this.weekData.push({
          date: dateStr,
          score: score,
          hasData: hasData,
          isCurrent: isCurrent,
          isFutureDate: isFutureDate, // 添加未来日期标识
          percentage: hasData ? (score / 100) * 360 : 0,
          color: this.getScoreColor(score)
        });
      }
    },
    
    // 根据分数获取颜色
    getScoreColor(score) {
      if (score > 80) {
        return '#3bb18a'; // 绿色
      } else if (score > 40) {
        return '#ff7f27'; // 橙色
      } else {
        return '#ff4757'; // 红色
      }
    },
    
    // 选择日期
    selectDate(date) {
      this.currentDate = date;
      // 更新当前选中状态
      this.weekData.forEach(day => {
        day.isCurrent = day.date === date;
      });
      this.emitChange();
    },
    
    toggleWeekView() {
      // 可以在这里添加周视图的切换逻辑
      console.log('Toggle week view');
    }
  }
}
</script>

<style lang="scss" scoped>
.week-data-switcher {
  width: 90%;
  background-color: transparent;
  padding: 10px;
  margin-left: 8px;
  border-radius: 10px;
}

.date-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16rpx;
  padding: 16rpx 0;
  font-size: 36rpx;
  font-weight: bold;
}

.arrow {
  width: 40rpx;
  height: 40rpx;
  margin: 0 40rpx;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  filter: brightness(0) invert(1);
}

.date {
  min-width: 200rpx;
  text-align: center;
  color: #000000;
  cursor: pointer;
}

.week-data-container {
  background: transparent;
  border-radius: 20rpx;
  margin-top: 16rpx;
  width: 100%;
}

.week-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.week-day {
  flex: 1;
  text-align: center;
  color: #000000;
  font-size: 28rpx;
  font-weight: bold;
}

.week-progress {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 12rpx 8rpx;
  border-radius: 16rpx;
  position: relative;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background: rgba(59, 177, 138, 0.2);
    border: 2rpx solid #3bb18a;
  }
  
  &.no-data {
    opacity: 0.6;
  }
}

.progress-circle {
  position: relative;
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-fill {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  background: conic-gradient(from 0deg, var(--progress-color) 0deg, var(--progress-color) calc(var(--percentage) * 1deg), transparent calc(var(--percentage) * 1deg));
  mask: radial-gradient(circle at center, transparent 22rpx, black 23rpx);
  -webkit-mask: radial-gradient(circle at center, transparent 22rpx, black 23rpx);
  filter: drop-shadow(0 0 6rpx var(--progress-color));
}

.no-data-mark {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  background: #8B5CF6; /* 使用更亮的紫色 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  font-size: 28rpx;
  font-weight: bold;
  opacity: 0.9; /* 调整透明度 */
  filter: drop-shadow(0 0 4rpx rgba(139, 92, 246, 0.3)); /* 添加发光效果 */
}

.future-date-circle {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  border: 4rpx solid #3bb18a; /* 使用teal/cyan颜色 */
  background: transparent; /* 透明背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 4rpx rgba(116, 250, 205, 0.3)); /* 添加发光效果 */
}

.no-data-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  background: #451F80;
  opacity: 0.7;
}

</style>
