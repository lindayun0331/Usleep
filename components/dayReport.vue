<script>
import DateSwitcher from '../pages/components/DateSwitcher.vue'
import { mapGetters } from 'vuex'
import { request } from '../utils/request';
export default {
  components: {
    DateSwitcher,
  },
  props: {
    initialDate: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isLoading: false,
      hasReport: true,
      sleepReportData: [],
      currentDate: this.initialDate || this.getToday(),
      // 周数据相关
      // 周数据相关
      userName: '',
      sleepScore: 65,
      quality: 0,
      sleepLevel: 'Good',
      sleepTime: '23:34',
      wakeTime: '06:24',
      sleepEfficiency: 93,
      effectiveSleep: '6小时23分钟',
      totalTime: '6小时23分钟',
      circumference: 339.292,
      sleepStages: [
        { name: 'Awake', color: '#FF7F27', time: '4分钟', percent: '1.58%', value: 4, status: 'Normal', statusClass: 'normal' },
        { name: 'Light Sleep', color: '#8B7CFF', time: '3时45分钟', percent: '58.75%', value: 135, status: 'Normal', statusClass: 'normal' },
        { name: 'Deep Sleep', color: '#5D5FEF', time: '1时48分钟', percent: '28.20%', value: 64, status: 'Normal', statusClass: 'normal' }
      ],
      sleepIndicators: [
        { title: 'Total Time', value: '8h', status: 'Normal', statusClass: 'normal', reference: '参考范围：7~9小时' },
        { title: 'Latency', value: '23min', status: 'Normal', statusClass: 'normal', reference: '参考范围：0~30分钟' },
        { title: 'Rise and Fall', value: '2times', status: 'Normal', statusClass: 'normal', reference: '参考范围：0~5次/夜' },
        { title: 'Off-Bed', value: '1times', status: 'Normal', statusClass: 'normal', reference: '参考范围：0~2次/夜' },
        { title: 'Off-Bed Duration', value: '10min', status: 'Normal', statusClass: 'normal', reference: '参考范围：0~10分钟' },
        { title: 'Breathing Pause', value: '7times', status: 'Abnormal', statusClass: 'abnormal', reference: '参考范围：0~5次/夜' },
        { title: 'Exception Report', value: '1times', status: 'Abnormal', statusClass: 'abnormal', reference: '参考范围：0~2次/夜' },
        { title: 'Larger Body Movements', value: '10%', status: 'Normal', statusClass: 'normal', reference: '参考范围：0~10%' },
        { title: 'Small Body Movements', value: '10%', status: 'Normal', statusClass: 'normal', reference: '参考范围：0~10%' },
      ],
      sleepStructureList: [
        { label: 'Incubation', status: 'Normal', statusClass: 'normal' },
        { label: 'Sleep Mid', status: 'Abnormal', statusClass: 'abnormal' },
        { label: 'Sleep Late', status: 'Normal', statusClass: 'normal' },
        { label: 'Sleep Wake', status: 'Normal', statusClass: 'normal' }
      ],
      showSleepStructureDetail: false,
      isAnimating: false,
      sleepStructureDetailList: [
        {
          label: 'Incubation',
          status: 'Normal',
          statusClass: 'normal',
          icon: '/static/nav-stars.svg',
          desc: '昨晚入睡的潜伏期为<span style="color:#333668;font-weight:bold;">12分钟</span>，<span style="font-weight:bold;">入睡更易</span>并且很快进入深睡眠状态。请保持良好的入睡习惯！'
        },
        {
          label: 'Sleep Mid',
          status: 'Abnormal',
          statusClass: 'abnormal',
          icon: '/static/nav-stars.svg',
          desc: '维持较长时间睡眠状态后，您的<span style="color:#E72E2E;font-weight:bold;">睡眠很浅，深睡眠占比相对较少</span>，深睡眠的"黄金阶段"，对缓解疲劳、恢复精力十分大，生长发育、增强记忆、维持重要的生理功能至关重要。'
        },
        {
          label: 'Sleep Late',
          status: 'Normal',
          statusClass: 'normal',
          icon: '/static/nav-stars.svg',
          desc: '夜间后半三分之一，您的睡眠属于<span style="font-weight:bold;">安宁睡眠，睡眠状态保持良好</span>，这段时间主要以REM睡眠为主，和体温变化节律有关。'
        },
        {
          label: 'Sleep Wake',
          status: 'Normal',
          statusClass: 'normal',
          icon: '/static/nav-stars.svg',
          desc: '您在睡眠醒期，处于浅睡眠状态，<span style="font-weight:bold;">自然醒来</span>，属于正常被唤醒。'
        }
      ],
      sleepStageLegend: [
        { name: 'Incubation', color: '#FF914D', type: 'incubation' },
        { name: 'Awake', color: '#FFD600', type: 'wake' },
        { name: 'Light Sleep', color: '#8B7CFF', type: 'light' },
        { name: 'Deep Sleep', color: '#5D5FEF', type: 'deep' }
      ],
      // 睡眠阶段时间轴数据
      sleepStageTimeline: [
        {
          label: 'Incubation',
          start: 20,
          end: 21,
          type: 'incubation',
          color: '#FF914D'
        },
        {
          label: 'Deep Sleep',
          start: 21.5,
          end: 23.5,
          type: 'deep',
          color: '#5D5FEF'
        },
        {
          label: 'Light Sleep',
          start: 21,
          end: 21.5,
          type: 'light',
          color: '#8B7CFF'
        },
        {
          label: 'Awake',
          start: 19,
          end: 20,
          type: 'wake',
          color: '#FFD600'
        }
      ],
      minBreathingRate: 0,
      maxBreathingRate: 0,
      avgBreathingRate: 0,
      minHeartRate: 0,
      maxHeartRate: 0,
      avgHeartRate: 0,
      breathRemind: 'If you have long-term abnormal breathing rate, you should visit the hospital as soon as possible to avoid delaying the disease.',
      heartRemind: 'If you have long-term low heart rate and symptoms such as chest tightness, breathlessness, etc., it may indicate pathological heart disease such as heart valve disease, heart block, etc., and you should treat it as soon as possible.',
      // 呼吸率折线图数据
      breathingRateData: {
        times: ['23:34', '23:50', '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:17', '06:24'],
        values: [19, 20, 23, 24, 19, 20, 17, 19, 22, 20, 21, 19, 20, 19, 25, 21, 22],
        healthyRange: [10, 25] // 健康范围：10-25次/分钟
      },
      // 心率折线图数据
      heartRateData: {
        times: ['23:34', '23:50', '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:17', '06:24'],
        values: [75, 70, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 84, 82, 80, 78, 76],
        healthyRange: [60, 120] // 健康范围：60-120次/分钟
      },
      // 睡眠建议
      sleepAdvice: [],
      activeTab: 'analysis',
      tabs: [
        { label: 'Analysis', value: 'analysis' },
        { label: 'Breathing', value: 'breathing' },
        { label: 'Heart', value: 'heart' },
        { label: 'Advice', value: 'advice' }
      ]
    };
  },
  mounted() {
    // 获取睡眠报告数据（默认当天）
    this.getSleepReportData(this.currentDate);
  },
  computed: {
    ...mapGetters([]),
    scoreOffset() {
      return this.circumference * (1 - this.sleepScore / 100);
    },
    // 根据睡眠评分计算等级和颜色
    sleepLevelType() {
      let sleepLevel = 'Good';
      let colorValue = '#3f80f9';

      if (this.quality === '1') {
        sleepLevel = 'Excellent';
        colorValue = '#21c68e';
      } else if (this.quality === '2') {
        sleepLevel = 'Good';
        colorValue = '#3f80f9';
      } else if (this.quality === '3') {
        sleepLevel = 'Bad';
        colorValue = '#ff726d';
      } else if (this.quality === '0') {
        sleepLevel = 'None';
        colorValue = '#ff7486';
      }

      return { level: sleepLevel, colorValue };
    },
    sleepScoreColor() {
      if (this.sleepScore > 80) {
        return '#3bb18a'; // 绿色
      } else if (this.sleepScore > 40) {
        return '#ff7f27'; // 橙色
      } else {
        return '#ff4757'; // 红色
      }
    },
    // 优化时间轴显示，只显示关键时间点
    optimizedBreathingTimes() {
      const times = this.breathingRateData.times || [];
      if (times.length <= 6) return times;

      // 如果时间点太多，只显示首尾和中间几个关键点
      const result = [];
      result.push(times[0]); // 第一个时间点

      // 添加中间的关键时间点
      const step = Math.floor(times.length / 4);
      for (let i = 1; i < 4; i++) {
        const index = i * step;
        if (index < times.length - 1) {
          result.push(times[index]);
        }
      }

      result.push(times[times.length - 1]); // 最后一个时间点
      return result;
    },
    optimizedHeartTimes() {
      const times = this.heartRateData.times || [];
      if (times.length <= 6) return times;

      // 如果时间点太多，只显示首尾和中间几个关键点
      const result = [];
      result.push(times[0]); // 第一个时间点

      // 添加中间的关键时间点
      const step = Math.floor(times.length / 4);
      for (let i = 1; i < 4; i++) {
        const index = i * step;
        if (index < times.length - 1) {
          result.push(times[index]);
        }
      }

      result.push(times[times.length - 1]); // 最后一个时间点
      return result;
    },
    // 睡眠阶段时间轴计算属性
    sleepStageTimelineData() {
      if (!this.sleepStageTimeline || this.sleepStageTimeline.length === 0) {
        return [];
      }

      // 直接返回已计算好位置和宽度的数据
      return this.sleepStageTimeline;
    },
    // 时间轴标签
    timelineLabels() {
      if (!this.sleepStageTimeline || this.sleepStageTimeline.length === 0) {
        return [];
      }
      // 以阶段最小开始与最大结束为显示范围，保证与红条一致
      const minStart = Math.min(...this.sleepStageTimeline.map(s => s.start));
      const maxEnd = Math.max(...this.sleepStageTimeline.map(s => s.end));
      const totalRange = Math.max(0.0001, maxEnd - minStart);

      const labels = [];
      this.sleepStageTimeline.forEach((stage, index) => {
        const startPosition = ((stage.start - minStart) / totalRange) * 100;
        const endPosition = ((stage.end - minStart) / totalRange) * 100;

        if (index === 0) {
          labels.push({
            time: this.convertToISOTime(stage.start),
            position: startPosition
          });
        }

        labels.push({
          time: this.convertToISOTime(stage.end),
          position: endPosition
        });
      });

      // 去重并排序
      const uniqueLabels = labels.filter((label, index, self) =>
        index === self.findIndex(l => l.time === label.time)
      ).sort((a, b) => a.position - b.position);

      // 处理标签重叠问题
      return this.adjustLabelPositions(uniqueLabels);
    },
  },
  watch: {
    sleepScore() {
      // 当睡眠评分变化时重新绘制进度条
      this.$nextTick(() => {
        this.drawScoreProgressWithAnimation();
      });
    },
    sleepStages: {
      handler() {
        // 当睡眠阶段数据变化时重新绘制饼图
        this.$nextTick(() => {
          this.drawSleepPieChart();
        });
      },
      deep: true
    },
    showHeartRateDetail(newVal) {
      if (newVal) {
        // 当展开心率详情时绘制折线图
        this.$nextTick(() => {
          setTimeout(() => {
            this.drawHeartRateChart();
          }, 100);
        });
      }
    },
  },
  methods: {
    // 获取睡眠报告数据
    async getSleepReportData(dateStr) {
      this.isLoading = true;
      try {
        const apiDate = this.toApiDate(dateStr || this.currentDate);
        const res = await request({
          url: '/web/develop/home/Admin/getReport',
          method: 'GET',
          data: {
            date: apiDate,
            device_id: "ul-28bbed43208d"
          }
        });
        console.log("原始数据:", res);
        if (res && res.code === 200 && res.data && res.data.length) {

          this.hasReport = true;
          this.sleepReportData = res.data[0];
          console.log("日报告数据:", this.sleepReportData)
          this.userName = this.sleepReportData.personName;
          this.quality = this.sleepReportData.quality;
          this.sleepScore = this.sleepReportData.score;
          this.sleepTime = this.sleepReportData.sleep_time;
          this.wakeTime = this.sleepReportData.wakeTime;
          this.sleepEfficiency = this.sleepReportData.efficiency;
          this.totalTime = this.sleepReportData.full_sleep_time;
          this.sleepAdvice = this.sleepReportData.sleep_advice;
          this.sleepStages = [
            {
              name: "清醒",
              color: "#FFD600",
              time: this.sleepReportData.wake_time,
              percent: this.sleepReportData.full_awake_ratio + '%',
              value: this.sleepReportData.full_awake_time,
              status: "正常",
              statusClass: "normal"
            },

            {
              name: "浅睡",
              color: "#8B7CFF",
              time: this.sleepReportData.light_sleep_time,
              percent: this.sleepReportData.full_light_sleep_ratio + '%',
              value: this.sleepReportData.full_light_sleep_time,
              status: "正常",
              statusClass: "normal"
            },
            {
              name: "深睡",
              color: "#5D5FEF",
              time: this.sleepReportData.deep_sleep_time,
              percent: this.sleepReportData.full_deep_sleep_ratio + '%',
              value: this.sleepReportData.full_deep_sleep_time,
              status: "正常",
              statusClass: "normal"
            }
          ]
          this.sleepIndicators = [
            { title: '睡眠总时长', value: this.sleepReportData.full_sleep_time, status: '正常', statusClass: 'normal', reference: '参考范围：7~9小时' },
            { title: '睡眠潜伏期', value: this.sleepReportData.incubation, status: '正常', statusClass: 'normal', reference: '参考范围：0~30分钟' },
            { title: '翻身次数', value: this.sleepReportData.full_turn_times + '次', status: '正常', statusClass: 'normal', reference: '参考范围：0~5次/夜' },
            { title: '离床次数', value: this.sleepReportData.full_leave_bed_count + '次', status: '正常', statusClass: 'normal', reference: '参考范围：0~2次/夜' },
            { title: '离床时长', value: this.sleepReportData.full_leave_bed_times, status: '正常', statusClass: 'normal', reference: '参考范围：0~10分钟' },
            { title: '呼吸暂停次数', value: this.sleepReportData.apnea_times + '次', status: '异常', statusClass: 'abnormal', reference: '参考范围：0~5次/夜' },
            { title: '异常上报次数', value: this.sleepReportData.sleep_abnormal_flg + '次', status: '正常', statusClass: 'normal', reference: '参考范围：0~2次/夜' },
            { title: '大幅度体动占比', value: this.sleepReportData.larger_Movemont + '%', status: '正常', statusClass: 'normal', reference: '参考范围：0~10%' },
            { title: '小幅度体动占比', value: this.sleepReportData.small_Movemont + '%', status: '正常', statusClass: 'normal', reference: '参考范围：0~10%' }
          ]
          this.breathingRateData.values = this.sleepReportData.breath_data || [];
          this.breathingRateData.times = this.sleepReportData.data_times || [];
          this.heartRateData.values = this.sleepReportData.heart_data || [];
          this.heartRateData.times = this.sleepReportData.data_times || [];
          this.minBreathingRate = this.sleepReportData.min_breath_rate;
          this.maxBreathingRate = this.sleepReportData.max_breath_rate;
          this.avgBreathingRate = this.sleepReportData.avg_breath_rate;
          this.minHeartRate = this.sleepReportData.min_heart_rate;
          this.maxHeartRate = this.sleepReportData.max_heart_rate;
          this.avgHeartRate = this.sleepReportData.avg_heart_rate;
          this.breathRemind = this.sleepReportData.breath_read;
          this.heartRemind = this.sleepReportData.heart_read;
          this.sleepStageTimeline = this.sleepReportData.stages;

          if (this.sleepReportData.sleepStages) {
            this.sleepReportData.stages = this.sleepReportData.sleepStages.map(stage => ({
              label: stage.label,
              start: stage.start,
              end: stage.end,
              type: stage.type
            }));
          } else {
            this.sleepReportData.stages = [
              { label: '潜伏期', start: 8, end: 10.5, type: 'incubation' },
              { label: '深睡', start: 10.5, end: 11.5, type: 'deep' },
              { label: '浅睡', start: 11.5, end: 13.5, type: 'light' },
              { label: '清醒', start: 13.5, end: 14.7, type: 'wake' }
            ];
          }

          // 更新睡眠阶段时间轴数据
          this.updateSleepStageTimeline();
          // 数据更新完成后重新绘制图表
          this.$nextTick(() => {
            setTimeout(() => {
              if (this.hasReport) {
                // 确保睡眠评分数据已更新后再绘制进度条
                if (this.sleepScore > 0) {
                  this.drawScoreProgressWithAnimation();
                }
                this.drawSleepPieChart();
                this.drawBreathingRateChart();
                this.drawHeartRateChart();
              }
            }, 100);
          });
        } else if (res && res.code === 400) {
          // 静默处理400状态码，不打印错误信息
          // this.hasReport = false;
          this.drawScoreProgressWithAnimation();
          this.drawSleepPieChart();
          this.drawBreathingRateChart();
          this.drawHeartRateChart();
        } else {
          this.hasReport = false;
        }
      } catch (e) {
        // 静默处理错误，不打印到控制台
        this.hasReport = false;
      } finally {
        this.isLoading = false;
      }
    },
    changeTab(tabValue) {
      this.activeTab = tabValue;
      // 切换 tab 后重绘图表
      this.$nextTick(() => {
        setTimeout(() => {
          if (tabValue === 'analysis') {
            this.drawSleepPieChart();
          } else if (tabValue === 'breathing') {
            this.drawBreathingRateChart();
          } else if (tabValue === 'heart') {
            this.drawHeartRateChart();
          }
        }, 100);
      });
    },
    goBack() {
      uni.navigateBack();
    },
    goHome() {
      uni.switchTab({
        url: '/pages/index/index'
      });
    },
    toApiDate(dateStr) {
      try {
        const date = dateStr && typeof dateStr === 'string' ? dateStr : this.getToday();
        // 创建日期对象并减去一天
        const dateObj = new Date(date);
        dateObj.setDate(dateObj.getDate() - 1);

        // 格式化为 YYYY-MM-DD
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        // 拼接为 UTC 字符串，示例：2025-08-05T16:00:00.000Z
        return `${formattedDate}T16:00:00.000Z`;
      } catch (e) {
        const today = this.getToday();
        const todayObj = new Date(today);
        todayObj.setDate(todayObj.getDate() - 1);

        const year = todayObj.getFullYear();
        const month = String(todayObj.getMonth() + 1).padStart(2, '0');
        const day = String(todayObj.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        return `${formattedDate}T16:00:00.000Z`;
      }
    },
    // 接收日期组件变更
    onDateChange(dateStr) {
      this.currentDate = dateStr;
      // this.getSleepReportData(dateStr);
    },
    // 调整标签位置避免重叠
    adjustLabelPositions(labels) {
      if (labels.length <= 1) return labels;

      const minDistance = 10; // 最小间距（百分比）- 缩小间距
      const adjustedLabels = [...labels];

      for (let i = 1; i < adjustedLabels.length; i++) {
        const prevLabel = adjustedLabels[i - 1];
        const currentLabel = adjustedLabels[i];

        const distance = currentLabel.position - prevLabel.position;

        if (distance < minDistance) {
          // 如果距离太近，调整当前标签位置
          currentLabel.position = prevLabel.position + minDistance;
        }
      }
      return adjustedLabels;
    },
    // 获取指定阶段的时间段数据
    getStageSegments(stageName) {
      if (!this.sleepStageTimeline || this.sleepStageTimeline.length === 0) {
        return [];
      }

      // 找到对应阶段的数据
      const stageData = this.sleepStageTimeline.find(stage => stage.label === stageName);
      if (!stageData) {
        return [];
      }

      // 以阶段最小开始与最大结束为显示范围，保证与红条一致
      const minStart = Math.min(...this.sleepStageTimeline.map(s => s.start));
      const maxEnd = Math.max(...this.sleepStageTimeline.map(s => s.end));
      const totalRange = Math.max(0.0001, maxEnd - minStart);
      const left = ((stageData.start - minStart) / totalRange) * 100;
      const width = ((stageData.end - stageData.start) / totalRange) * 100;

      // 返回该阶段的时间段数据
      return [{
        left: left,
        width: width,
        color: stageData.color,
        startTime: this.convertToISOTime(stageData.start),
        endTime: this.convertToISOTime(stageData.end)
      }];
    },
    // 返回上一页
    goBack() {
      uni.navigateBack();
    },
    // 返回首页
    goHome() {
      uni.switchTab({
        url: '/pages/index/index'
      });
    },
    // 生成浅色版本的颜色
    getLightColor(color) {
      // 简单的颜色变浅逻辑
      const colors = {
        '#FF914D': '#FFB366',
        '#FFD600': '#FFE066',
        '#8B7CFF': '#A899FF',
        '#5D5FEF': '#7A7BFF'
      };
      return colors[color] || color;
    },
    // 生成边框颜色
    getBorderColor(color) {
      // 边框颜色映射
      const borderColors = {
        '#FF914D': '#FF6B35',
        '#FFD600': '#FFB800',
        '#8B7CFF': '#6B5BFF',
        '#5D5FEF': '#4A4BDF'
      };
      return borderColors[color] || '#333';
    },
    // 根据阶段类型获取颜色
    getStageColor(type) {
      const colorMap = {
        'incubation': '#FF914D', // 潜伏期
        'deep': '#5D5FEF',       // 深睡
        'light': '#8B7CFF',      // 浅睡
        'wake': '#FFD600'        // 清醒
      };
      return colorMap[type] || '#8B7CFF';
    },
    // 更新睡眠阶段时间轴数据
    updateSleepStageTimeline() {
      // 如果API返回了睡眠阶段数据，使用API数据
      if (this.sleepReportData && this.sleepReportData.stages && this.sleepReportData.stages.length > 0) {
        this.sleepStageTimeline = this.sleepReportData.stages.map(stage => ({
          label: stage.label || stage.name,
          start: stage.start,
          end: stage.end,
          type: stage.type,
          color: this.getStageColor(stage.type)
        }));
      } else {
        // 使用测试数据 - 模拟真实的睡眠阶段数据
        this.sleepStageTimeline = [
          {
            label: '潜伏期',
            start: 23.5,
            end: 24.0,
            type: 'incubation',
            color: '#FF914D'
          },
          {
            label: '深睡',
            start: 0.0,
            end: 2.5,
            type: 'deep',
            color: '#5D5FEF'
          },
          {
            label: '浅睡',
            start: 2.5,
            end: 5.0,
            type: 'light',
            color: '#8B7CFF'
          },
          {
            label: '清醒',
            start: 5.0,
            end: 6.0,
            type: 'wake',
            color: '#FFD600'
          }
        ];
      }
    },
    // 计算时间差（分钟）
    calculateTimeDifference(startTime, endTime) {
      // 使用 iOS 兼容的日期格式：yyyy/MM/dd HH:mm:ss
      const start = new Date(`2000/01/01 ${startTime}:00`);
      const end = new Date(`2000/01/01 ${endTime}:00`);

      // 如果结束时间小于开始时间，说明跨天了
      if (end < start) {
        end.setDate(end.getDate() + 1);
      }

      return Math.round((end - start) / (1000 * 60));
    },
    // 格式化时间
    formatTime(date) {
      return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    },
    // 将小时数转换为ISO时间格式
    convertToISOTime(hour) {
      const hours = Math.floor(hour);
      const minutes = Math.round((hour - hours) * 60);
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    },
    getToday() {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    },
    // 周数据相关方法已移至DateSwitcher组件
    drawScoreProgress() {
      try {
        const ctx = uni.createCanvasContext('scoreProgress', this);
        if (!ctx) {
          console.error('Canvas context creation failed');
          return;
        }

        // 获取设备像素比，确保在不同设备上显示清晰
        const dpr = uni.getWindowInfo().pixelRatio || 1;
        const canvasSize = 200;
        const centerX = canvasSize / 2;
        const centerY = canvasSize / 2;
        const radius = 80;
        const lineWidth = 18;

        // 清空画布
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        // 绘制背景圆环
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.setStrokeStyle('#361A5E');
        ctx.setLineWidth(lineWidth);
        ctx.stroke();

        // 绘制进度圆环
        const progress = this.sleepScore / 100;
        const startAngle = -Math.PI / 2; // 从12点钟方向开始
        const endAngle = startAngle + (2 * Math.PI * progress);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.setStrokeStyle(this.sleepScoreColor);
        ctx.setLineWidth(lineWidth);
        ctx.setLineCap('round');
        ctx.stroke();

        ctx.draw();
      } catch (error) {
        console.error('Canvas drawing error:', error);
      }
    },
    // 带动画的进度条绘制
    drawScoreProgressWithAnimation() {
      if (this.isAnimating) return;
      this.isAnimating = true;
      const targetProgress = this.sleepScore / 100;
      let currentProgress = 0;
      const animationDuration = 1000; // 1秒动画
      const animationStep = 16; // 约60fps
      const progressIncrement = targetProgress / (animationDuration / animationStep);

      const animate = () => {
        if (currentProgress < targetProgress) {
          currentProgress = Math.min(currentProgress + progressIncrement, targetProgress);
          this.drawProgressAt(currentProgress);
          setTimeout(animate, animationStep);
        } else {
          this.isAnimating = false;
          // 动画完成后确保绘制最终状态
          this.drawProgressAt(targetProgress);
        }
      };

      animate();
    },
    // 绘制指定进度的圆环
    drawProgressAt(progress) {
      try {
        const ctx = uni.createCanvasContext('scoreProgress', this);
        if (!ctx) {
          console.error('Canvas context creation failed');
          return;
        }

        // 获取设备像素比，确保在不同设备上显示清晰
        const dpr = uni.getWindowInfo().pixelRatio || 1;
        const canvasSize = 200;
        const centerX = canvasSize / 2;
        const centerY = canvasSize / 2;
        const radius = 80;
        const lineWidth = 18;

        // 清空画布
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        // 绘制背景圆环
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.setStrokeStyle('#E5E5E5');
        ctx.setLineWidth(lineWidth);
        ctx.stroke();

        // 绘制进度圆环
        const startAngle = -Math.PI / 2; // 从12点钟方向开始
        const endAngle = startAngle + (2 * Math.PI * progress);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.setStrokeStyle(this.sleepScoreColor);
        ctx.setLineWidth(lineWidth);
        ctx.setLineCap('round');
        ctx.stroke();

        ctx.draw();
      } catch (error) {
        console.error('Canvas drawing error:', error);
      }
    },
    // 绘制睡眠分析环形饼图
    drawSleepPieChart() {
      try {
        const ctx = uni.createCanvasContext('pieChart', this);
        if (!ctx) {
          return;
        }

        // 直接绘制真正的环形饼图，移除测试代码
        this.drawRealPieChart();

      } catch (error) {
        console.error('Sleep pie chart drawing error:', error);
      }
    },
    // 绘制真正的环形饼图
    /**
     * 绘制真实的睡眠阶段饼图
     * 
     * 根据睡眠阶段数据绘制一个环形饼图，每个阶段用不同颜色表示，
     * 如果总百分比小于100%，则用灰色填充剩余部分
     */
    drawRealPieChart() {
      try {
        const ctx = uni.createCanvasContext('pieChart', this);
        if (!ctx) {
          return;
        }

        const centerX = 60;
        const centerY = 60;
        const outerRadius = 50;
        const innerRadius = 25;
        const startAngle = -Math.PI / 2;

        // 清空画布
        ctx.clearRect(0, 0, 100, 100);

        // 计算总百分比
        let totalPercent = 0;
        if (this.sleepStages && this.sleepStages.length > 0) {
          this.sleepStages.forEach(stage => {
            totalPercent += parseFloat(stage.percent.replace('%', '')) / 100;
          });
        }

        let currentAngle = startAngle;

        // 绘制睡眠阶段扇形
        if (this.sleepStages && this.sleepStages.length > 0) {
          this.sleepStages.forEach((stage, index) => {
            const percent = parseFloat(stage.percent.replace('%', '')) / 100;
            const angle = 2 * Math.PI * percent;

            // 绘制外圆扇形
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + angle);
            ctx.closePath();
            ctx.setFillStyle(stage.color);
            ctx.fill();

            // 绘制内圆（挖空）
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, innerRadius, currentAngle, currentAngle + angle);
            ctx.closePath();
            ctx.setFillStyle('#ffffff');
            ctx.fill();

            currentAngle += angle;
          });
        }

        // 如果总百分比小于100%，用灰色填补剩余部分
        if (totalPercent < 1) {
          const remainingAngle = 2 * Math.PI * (1 - totalPercent);

          // 绘制外圆扇形（灰色填补）
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + remainingAngle);
          ctx.closePath();
          ctx.setFillStyle('#E4E6F5'); // 浅灰色填补
          ctx.fill();

          // 绘制内圆（挖空）
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, innerRadius, currentAngle, currentAngle + remainingAngle);
          ctx.closePath();
          ctx.setFillStyle('#ffffff');
          ctx.fill();
        }

        ctx.draw();
      } catch (error) {
        console.error('Real pie chart drawing error:', error);
      }
    },
    // 带动画效果的环形饼图绘制
    drawSleepPieChartWithAnimation() {
      if (this.isAnimating) return;

      this.isAnimating = true;
      const animationDuration = 1500; // 1.5秒动画
      const animationStep = 16; // 约60fps
      const totalSteps = animationDuration / animationStep;
      let currentStep = 0;

      const animate = () => {
        if (currentStep < totalSteps) {
          const progress = currentStep / totalSteps;
          this.drawSleepPieChartAtProgress(progress);
          currentStep++;
          setTimeout(animate, animationStep);
        } else {
          this.isAnimating = false;
          this.drawSleepPieChart(); // 绘制完整版本
        }
      };

      animate();
    },
    // 绘制指定进度的环形饼图
    drawSleepPieChartAtProgress(progress) {
      try {
        const ctx = uni.createCanvasContext('pieChart', this);
        if (!ctx) {
          console.error('Sleep pie chart canvas context creation failed');
          return;
        }

        const centerX = 70;
        const centerY = 70;
        const outerRadius = 60;
        const innerRadius = 30;
        const startAngle = -Math.PI / 2;

        // 清空画布
        ctx.clearRect(0, 0, 100, 100);

        // 计算总百分比
        let totalPercent = 0;
        if (this.sleepStages && this.sleepStages.length > 0) {
          this.sleepStages.forEach(stage => {
            totalPercent += parseFloat(stage.percent.replace('%', '')) / 100;
          });
        }

        let currentAngle = startAngle;

        // 绘制睡眠阶段扇形
        if (this.sleepStages && this.sleepStages.length > 0) {
          this.sleepStages.forEach((stage, index) => {
            const percent = parseFloat(stage.percent.replace('%', '')) / 100;
            const angle = 2 * Math.PI * percent * progress;

            // 绘制外圆扇形
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + angle);
            ctx.closePath();
            ctx.setFillStyle(stage.color);
            ctx.fill();

            // 绘制内圆（挖空）
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, innerRadius, currentAngle, currentAngle + angle);
            ctx.closePath();
            ctx.setFillStyle('#ffffff');
            ctx.fill();

            currentAngle += angle;
          });
        }

        // 如果总百分比小于100%，用灰色填补剩余部分
        if (totalPercent < 1) {
          const remainingAngle = 2 * Math.PI * (1 - totalPercent) * progress;

          // 绘制外圆扇形（灰色填补）
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, outerRadius, currentAngle, currentAngle + remainingAngle);
          ctx.closePath();
          ctx.setFillStyle('#E4E6F5'); // 浅灰色填补
          ctx.fill();

          // 绘制内圆（挖空）
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, innerRadius, currentAngle, currentAngle + remainingAngle);
          ctx.closePath();
          ctx.setFillStyle('#ffffff');
          ctx.fill();
        }

        ctx.draw();
      } catch (error) {
        console.error('Sleep pie chart drawing error:', error);
      }
    },
    // 绘制呼吸率折线图
    drawBreathingRateChart() {
      try {
        const ctx = uni.createCanvasContext('breathingRateChart', this);
        if (!ctx) {
          console.error('Breathing rate chart canvas context creation failed');
          return;
        }

        uni.createSelectorQuery()
          .in(this)
          .select('.chart-canvas')
          .boundingClientRect(rect => {
            if (!rect) return;

            const canvasWidth = rect.width;
            const canvasHeight = 200;
            const padding = 25;
            const chartWidth = canvasWidth - 2 * padding;
            const chartHeight = canvasHeight - 2 * padding;

            // 清空画布
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // 设置背景
            ctx.setFillStyle('#FFF');
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // 计算数据范围 - 呼吸率固定范围0-30
            const data = this.breathingRateData.values || [];
            if (!data || data.length === 0) {
              return;
            }
            const minValue = 9;
            const maxValue = 26;
            const valueRange = maxValue - minValue;

            // 绘制网格线
            ctx.setStrokeStyle('#2E0F51');
            ctx.setLineWidth(1);
            for (let i = 0; i <= 6; i++) {
              const y = padding + (chartHeight / 6) * i;
              ctx.beginPath();
              ctx.moveTo(padding, y);
              ctx.lineTo(padding + chartWidth, y);
              ctx.stroke();
            }

            // 绘制Y轴标签
            ctx.setFillStyle('#888');
            ctx.setFontSize(10);
            for (let i = 0; i <= 6; i++) {
              const value = maxValue - (valueRange / 6) * i;
              const y = padding + (chartHeight / 6) * i;
              ctx.fillText(Math.round(value).toString(), 5, y + 3);
            }

            // 绘制健康范围区域
            const healthyMin = this.breathingRateData.healthyRange[0];
            const healthyMax = this.breathingRateData.healthyRange[1];
            const healthyMinY = padding + chartHeight - ((healthyMin - minValue) / valueRange) * chartHeight;
            const healthyMaxY = padding + chartHeight - ((healthyMax - minValue) / valueRange) * chartHeight;

            ctx.setFillStyle('rgba(59, 177, 138, 0.1)');
            ctx.fillRect(padding, healthyMaxY, chartWidth, healthyMinY - healthyMaxY);

            // 绘制健康范围边界线
            ctx.setStrokeStyle('#3bb18a');
            ctx.setLineWidth(1);
            ctx.setLineDash([3, 3]);

            // 上限线
            ctx.beginPath();
            ctx.moveTo(padding, healthyMaxY);
            ctx.lineTo(padding + chartWidth, healthyMaxY);
            ctx.stroke();

            // 下限线
            ctx.beginPath();
            ctx.moveTo(padding, healthyMinY);
            ctx.lineTo(padding + chartWidth, healthyMinY);
            ctx.stroke();

            // 重置线条样式
            ctx.setLineDash([]);

            // 添加范围标签
            ctx.setFillStyle('#3BB18A');
            ctx.setFontSize(10);
            ctx.fillText(`${healthyMax}`, padding + chartWidth + 5, healthyMaxY + 3);
            ctx.fillText(`${healthyMin}`, padding + chartWidth + 5, healthyMinY + 3);

            // 绘制数据折线
            ctx.setStrokeStyle('#55CCFA');
            ctx.setLineWidth(2);
            ctx.beginPath();

            data.forEach((value, index) => {
              const x = padding + (index / (data.length - 1)) * chartWidth;
              const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;

              if (index === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            });

            ctx.stroke();

            ctx.draw();
          })
          .exec();
      } catch (error) {
        console.error('Breathing rate chart drawing error:', error);
      }
    },
    // 绘制心率折线图
    drawHeartRateChart() {
      try {
        const ctx = uni.createCanvasContext('heartRateChart', this);
        if (!ctx) {
          console.error('Heart rate chart canvas context creation failed');
          return;
        }
        uni.createSelectorQuery()
          .in(this)
          .select('.chart-canvas')
          .boundingClientRect(rect => {
            if (!rect) return;
            const canvasWidth = rect.width;
            const canvasHeight = 220;
            const padding = 25;
            const chartWidth = canvasWidth - 2 * padding;
            const chartHeight = canvasHeight - 2 * padding;

            // 清空画布
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // 设置背景
            ctx.setFillStyle('#FFF');
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // 计算数据范围 - 心率固定范围50-130
            const data = this.heartRateData.values || [];
            if (!data || data.length === 0) {
              return;
            }
            const minValue = 55;
            const maxValue = 120;
            const valueRange = maxValue - minValue;

            // 绘制网格线
            ctx.setStrokeStyle('#2E0F51');
            ctx.setLineWidth(1);
            for (let i = 0; i <= 4; i++) {
              const y = padding + (chartHeight / 4) * i;
              ctx.beginPath();
              ctx.moveTo(padding, y);
              ctx.lineTo(padding + chartWidth, y);
              ctx.stroke();
            }

            // 绘制Y轴标签
            ctx.setFillStyle('#888');
            ctx.setFontSize(10);
            for (let i = 0; i <= 4; i++) {
              const value = maxValue - (valueRange / 4) * i;
              const y = padding + (chartHeight / 4) * i;
              ctx.fillText(Math.round(value).toString(), 5, y + 3);
            }

            // 绘制健康范围区域
            const healthyMin = this.heartRateData.healthyRange[0];
            const healthyMax = this.heartRateData.healthyRange[1];
            const healthyMinY = padding + chartHeight - ((healthyMin - minValue) / valueRange) * chartHeight;
            const healthyMaxY = padding + chartHeight - ((healthyMax - minValue) / valueRange) * chartHeight;

            ctx.setFillStyle('rgba(59, 177, 138, 0.1)');
            ctx.fillRect(padding, healthyMaxY, chartWidth, healthyMinY - healthyMaxY);

            // 绘制健康范围边界线
            ctx.setStrokeStyle('#3bb18a');
            ctx.setLineWidth(1);
            ctx.setLineDash([3, 3]);

            // 上限线
            ctx.beginPath();
            ctx.moveTo(padding, healthyMaxY);
            ctx.lineTo(padding + chartWidth, healthyMaxY);
            ctx.stroke();

            // 下限线
            ctx.beginPath();
            ctx.moveTo(padding, healthyMinY);
            ctx.lineTo(padding + chartWidth, healthyMinY);
            ctx.stroke();

            // 重置线条样式
            ctx.setLineDash([]);

            // 添加范围标签
            ctx.setFillStyle('#3BB18A');
            ctx.setFontSize(10);
            ctx.fillText(`${healthyMax}`, padding + chartWidth + 5, healthyMaxY + 3);
            ctx.fillText(`${healthyMin}`, padding + chartWidth + 5, healthyMinY + 3);

            // 绘制数据折线
            ctx.setStrokeStyle('#7E70D0');
            ctx.setLineWidth(2);
            ctx.beginPath();

            data.forEach((value, index) => {
              const x = padding + (index / (data.length - 1)) * chartWidth;
              const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;

              if (index === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            });

            ctx.stroke();

            ctx.draw();
          })
          .exec();
      } catch (error) {
        console.error('Heart rate chart drawing error:', error);
      }
    },
  },
  beforeDestroy() {
    // 组件销毁前清除定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<template>
  <!-- 滚动内容区 -->
  <scroll-view class="scroll-content" scroll-y="true">
    <!-- 固定顶部：日期日历区块 -->
    <view class="fixed-top">
      <view class="date-switcher">
        <DateSwitcher :initialDate="currentDate" @change="onDateChange" />
      </view>
    </view>
    <!-- 无报告占位 -->
    <view v-if="!hasReport" class="empty-report">
      <image src="/static/Report/report-warning.svg" class="empty-icon" />
      <view class="empty-title">No report</view>
      <view class="empty-sub">Please choose another date to view</view>
    </view>
    <view v-else>
      <!-- 睡眠评分模块 -->
      <view class="sleep-score-section">
        <view class="score-circle">
          <view class="score-inner">
            <view class="score-value">{{ sleepScore }}</view>
            <view class="score-title">Sleep Score</view>
            <view class="score-level" :style="{ color: sleepScoreColor }">{{ sleepLevelType.level }}</view>
          </view>
          <!-- 环形进度条 -->
          <canvas canvas-id="scoreProgress" class="score-progress-canvas"
            :style="{ width: '200px', height: '200px' }"></canvas>
          <!-- 评分星级图标 -->
          <image src="/static/Report/report-scoreStar.png" class="score-star-icon" mode="aspectFit"></image>
        </view>
        <view class="score-efficiency-row">
          <view class="score-eff-row">
            <view class="score-label score-eff-label">Efficiency</view>
            <view class="score-efficiency"><text style="color:#3bb18a">{{ sleepEfficiency }}%</text></view>
          </view>
        </view>
        <view class="score-row">
          <view class="score-col">
            <view class="score-icon-label">
              <image src="/static/Report/report-sleep.png" class="score-icon" />
            </view>
            <view class="score-time-row">
              <view class="score-label">Bedtime</view>
              <view class="score-time">{{ sleepTime }}</view>
            </view>
          </view>
          <view class="score-col">
            <view class="score-icon-label">
              <image src="/static/Report/report-getup.png" class="score-icon" />
            </view>
            <view class="score-time-row">
              <view class="score-label">Wakeup Time</view>
              <view class="score-time">{{ wakeTime }}</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 自定义 Tabs 标签页 -->
      <view class="custom-tabs">
        <scroll-view scroll-x="true" class="tabs-scroll" :show-scrollbar="false">
          <view class="tabs-container">
            <view class="tab-item" v-for="tab in tabs" :key="tab.value" :class="{ active: activeTab === tab.value }"
              @click="changeTab(tab.value)">
              <text class="tab-label">{{ tab.label }}</text>
              <view class="active-bar" v-if="activeTab === tab.value"></view>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- Tab 内容区域 -->
      <view class="tab-content">
        <!-- 睡眠分析模块 -->
        <view class="sleep-analysis-section" v-if="activeTab === 'analysis'">
          <view class="sleep-analysis-title analysis-title-top">
            <image src="/static/Home/home-LifeSign.png" class="sleep-analysis-title-icon" />
            <view class="sleep-analysis-title-text">Sleep Analysis</view>
          </view>
          <view class="sleep-analysis-top">
            <view class="sleep-analysis-left">
              <!-- 环形饼图 -->
              <view class="pie-chart-container">
                <canvas canvas-id="pieChart" class="pie-chart-canvas"
                  :style="{ width: '240rpx', height: '240rpx' }"></canvas>
              </view>
            </view>
            <view class="sleep-analysis-right">
              <view class="sleep-stage-row" v-for="(item, idx) in sleepStages" :key="idx">
                <view class="sleep-stage-row-flex">
                  <!-- 左侧：标题、时间、进度条 -->
                  <view class="sleep-stage-left">
                    <view class="sleep-stage-header">
                      <text :style="{ color: item.color }" class="sleep-stage-name">{{ item.name }}</text>
                      <text class="sleep-stage-time">{{ item.time }}</text>
                    </view>
                    <view class="sleep-stage-bar-bg">
                      <view class="sleep-stage-bar-fg" :style="{ width: item.percent, background: item.color }"></view>
                    </view>
                  </view>
                  <!-- 右侧：百分比和状态 -->
                  <view class="sleep-stage-right">
                    <text class="sleep-stage-percent">{{ item.percent }}</text>
                    <text class="sleep-stage-status" :class="item.statusClass">{{ item.status }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <!-- 下半部分预留 -->
          <view class="sleep-analysis-bottom">
            <view class="indicator-grid">
              <view class="indicator-card" v-for="(item, idx) in sleepIndicators" :key="idx">
                <view class="indicator-title">{{ item.title }}</view>
                <view class="indicator-middle">
                  <view class="indicator-value">{{ item.value }}</view>
                  <!-- <view class="indicator-status" :class="item.statusClass">{{ item.status }}</view> -->
                </view>
                <!-- <view class="indicator-reference">{{ item.reference }}</view> -->
              </view>
            </view>
          </view>
        </view>
        <!-- 睡眠阶段模块 -->
        <view class="sleep-stage-section" v-if="activeTab === 'stages'">
          <view class="sleep-structure-header">
            <image src="/static/Report/report-stages.png" class="sleep-structure-icon" />
            <text class="sleep-structure-title">Sleep Stages</text>
          </view>
          <!-- 图例 -->
          <view class="sleep-stage-legend">
            <view class="legend-item" v-for="item in sleepStageLegend" :key="item.name">
              <view class="legend-dot" :style="{ background: item.color }"></view>
              <text style="color: #000;">{{ item.name }}</text>
            </view>
          </view>
          <!-- 睡眠阶段时间轴统计图 -->
          <view class="sleep-stage-chart">
            <!-- 每个睡眠阶段占一行 -->
            <view class="stage-row" v-for="(stage, index) in sleepStageLegend" :key="index">
              <!-- 该阶段的时间轴 -->
              <view class="stage-timeline">
                <view class="stage-segment" v-for="(segment, segIndex) in getStageSegments(stage.name)" :key="segIndex"
                  :style="{
                    left: segment.left + '%',
                    width: segment.width + '%',
                    backgroundColor: segment.color,
                    border: '2rpx solid ' + getBorderColor(segment.color)
                  }" :title="`${stage.name}: ${segment.startTime} - ${segment.endTime}`"></view>
              </view>
            </view>

            <!-- X轴时间标签 -->
            <view class="x-axis-labels">
              <view class="x-axis-label" v-for="(label, index) in timelineLabels" :key="index"
                :style="{ left: label.position + '%' }">
                <text class="timeline-time">{{ label.time }}</text>
              </view>
            </view>
          </view>
        </view>
        <!-- 呼吸率统计区块 -->
        <view class="hr-section" v-if="activeTab === 'breathing'">
          <view class="hr-header">
            <view class="hr-icon">
              <image src="/static/Report/report-breath.png" mode="widthFix" style="width: 48rpx;height: 48rpx;"></image>
            </view>
            <view class="hr-title">Breathing Rate Statistics</view>
          </view>
          <view class="hr-stats">
            <view class="hr-stat">
              <view class="hr-value min">{{ minBreathingRate }}</view>
              <view class="hr-label">Minimum</view>
            </view>
            <view class="hr-divider"></view>
            <view class="hr-stat">
              <view class="hr-value avg">{{ avgBreathingRate }}</view>
              <view class="hr-label">Average</view>
            </view>
            <view class="hr-divider"></view>
            <view class="hr-stat">
              <view class="hr-value max">{{ maxBreathingRate }}</view>
              <view class="hr-label">Maximum</view>
            </view>
          </view>
          <view class="hr-detail-expand">
            <!-- 折线图上方自定义图例 -->
            <!-- 呼吸率折线图 -->
            <view class="chart-container">
              <canvas canvas-id="breathingRateChart" class="chart-canvas"
                :style="{ width: '100%', height: '200px' }"></canvas>
              <view class="chart-timeline">
                <view class="timeline-item" v-for="(time, idx) in optimizedBreathingTimes" :key="idx">
                  <text class="timeline-time">{{ time }}</text>
                </view>
              </view>
            </view>
            <!-- 心率解读 -->
            <view class="hr-interpret">
              <image src="/static/Report/nav-expert.svg" class="hr-expert-icon" />
              <view>
                <view class="hr-interpret-title">Interpretation</view>
                <view class="hr-interpret-text">
                  <text class="indent">Generally, when you are not moving, your breathing rate is lower than when you
                    are
                    moving. A normal breathing rate for a sedentary person is between <text
                      style="font-weight:bold;">10~25 breaths per minute.</text></text><br />
                  <text class="indent">{{ breathRemind }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <!-- 心率统计区块 -->
        <view class="hr-section" v-if="activeTab === 'heart'">
          <view class="hr-header">
            <view class="hr-icon">
              <image src="/static/Report/report-heart.png" mode="widthFix" style="width: 48rpx;height: 48rpx;"></image>
            </view>
            <view class="hr-title">Heart Rate Statistics</view>
          </view>
          <view class="hr-stats">
            <view class="hr-stat">
              <view class="hr-value min">{{ minHeartRate }}</view>
              <view class="hr-label">Minimum</view>
            </view>
            <view class="hr-divider"></view>
            <view class="hr-stat">
              <view class="hr-value avg">{{ avgHeartRate }}</view>
              <view class="hr-label">Average</view>
            </view>
            <view class="hr-divider"></view>
            <view class="hr-stat">
              <view class="hr-value max">{{ maxHeartRate }}</view>
              <view class="hr-label">Maximum</view>
            </view>
          </view>
          <view class="hr-detail-expand">
            <!-- 折线图上方自定义图例 -->
            <!-- 心率折线图 -->
            <view class="chart-container">
              <canvas canvas-id="heartRateChart" class="chart-canvas"
                :style="{ width: '100%', height: '220px' }"></canvas>
            </view>
            <!-- 时间轴 -->
            <view class="chart-timeline">
              <view class="timeline-item" v-for="(time, idx) in optimizedHeartTimes" :key="idx">
                <text class="timeline-time">{{ time }}</text>
              </view>
            </view>
            <!-- 心率解读 -->
            <view class="hr-interpret">
              <image src="/static/Report/nav-expert.svg" class="hr-expert-icon" />
              <view>
                <view class="hr-interpret-title">Interpretation</view>
                <view class="hr-interpret-text">
                  <text class="indent">Normal adult heart rate is between <text style="font-weight:bold;">50~120 times
                      per minute</text> when sleeping. It is lower than when
                    active or moving.</text><br />
                  <text class="indent">{{ heartRemind }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <!-- 睡眠建议模块 -->
        <view class="hr-section" v-if="activeTab === 'advice'">
          <block v-if="sleepAdvice && sleepAdvice.length > 0">
            <view class="hr-header">
              <view class="hr-icon">
                <image src="/static/Home/home-LifeSign.png" mode="widthFix" style="width: 48rpx;height: 48rpx;"></image>
              </view>
              <view class="hr-title">Sleep Advice</view>
            </view>
            <view class="sleep-advice-list">
              <view class="sleep-advice-item" v-for="(advice, index) in sleepAdvice" :key="index">
                <view class="advice-header">
                  <view class="advice-number">{{ index + 1 }}</view>
                  <view class="advice-content">{{ advice }}</view>
                </view>
              </view>
            </view>
          </block>
          <view v-else class="no-data" style="padding: 40rpx; text-align: center; color: #999;">
            <text>No sleep advice available</text>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss" scoped>
/* Custom Tabs Styles */
.custom-tabs {
  margin: 20rpx 32rpx;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.tabs-scroll {
  width: 100%;
  white-space: nowrap;
}

.tabs-container {
  display: flex;
  padding: 0 10rpx;
}

.tab-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24rpx 32rpx;
  position: relative;
  transition: all 0.3s;
}

.tab-label {
  font-size: 28rpx;
  color: #666;
  transition: color 0.3s;
}

.tab-item.active .tab-label {
  color: #3bb18a;
  font-weight: bold;
  font-size: 30rpx;
}

.active-bar {
  position: absolute;
  bottom: 0;
  width: 40rpx;
  height: 6rpx;
  background-color: #3bb18a;
  border-radius: 3rpx;
}

.sleep-advice-list {
  margin-top: 16rpx;
}

.sleep-advice-item {
  border-radius: 16rpx;
  padding: 20rpx 16rpx;
  margin-bottom: 16rpx;
}

.sleep-advice-item:last-child {
  margin-bottom: 0;
}

.advice-header {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
}

.advice-number {
  width: 40rpx;
  height: 40rpx;
  background: #3bb18a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  font-size: 20rpx;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 4rpx;
}

.advice-content {
  flex: 1;
  color: #000000;
  font-size: 24rpx;
  line-height: 1.6;
  text-align: justify;
}

.life-top {
  width: 100%;
  height: 100rpx;
  display: flex;
  margin-top: 60rpx;
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
  // background-color: rgba(255,255,255,0.1);
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

.background-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fixed-top {
  z-index: 10;
  background: transparent;
  box-sizing: border-box;
  position: relative;
}

.scroll-content {
  flex: 1;
  overflow-y: auto;
  height: 90%;
  min-height: 0;
  padding-bottom: 20px;
  position: relative;
  z-index: 1;
}

.empty-report {
  background: #ffffff;
  border-radius: 20rpx;
  margin: 20rpx 16rpx;
  padding: 60rpx 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000000;
  box-shadow: 0 2rpx 8rpx #000000;
}

.empty-icon {
  width: 72rpx;
  height: 72rpx;
  margin-bottom: 16rpx;
  filter: brightness(0) saturate(100%) invert(59%) sepia(65%) saturate(432%) hue-rotate(329deg) brightness(96%) contrast(95%);
}

.empty-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #000000;
  margin-bottom: 6rpx;
}

.empty-sub {
  font-size: 22rpx;
  color: #000000;
}

.arrow {
  font-size: 50rpx;
  padding: 0 150rpx;
  color: #2a8cff;
  cursor: pointer;
}

.date {
  font-size: 30rpx;
  min-width: 240rpx;
  text-align: center;
}

.more-info {
  color: #2a8cff;
  text-align: center;
  margin-bottom: 16rpx;
  font-size: 28rpx;
  cursor: pointer;
}

.hr-section {
  background: #FFF;
  border-radius: 20rpx;
  padding: 32rpx 30rpx 30rpx 24rpx;
  margin: 20rpx 16rpx;
}

.hr-header {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.hr-icon {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #2a8cff;
  margin-right: 16rpx;
}

.hr-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #000;
}

.hr-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.hr-stat {
  flex: 1;
  text-align: center;
}

.hr-divider {
  width: 2rpx;
  height: 70rpx;
  background: #e4e6f5;
  margin: 0 8rpx;
}

.hr-value {
  font-size: 38rpx;
  font-weight: bold;
  margin-bottom: 6rpx;
}

.hr-value.min {
  color: #3bb18a;
}

.hr-value.avg {
  color: #3bb18a;
}

.hr-value.max {
  color: #3bb18a;
}

.hr-label {
  font-size: 22rpx;
  color: #888;
}

.hr-more {
  color: #2a8cff;
  text-align: center;
  font-size: 28rpx;
  cursor: pointer;
  margin-top: 20rpx;
}

.hr-arrow {
  font-size: 22rpx;
}

.sleep-section {
  background: #fff;
  border-radius: 20rpx;
  padding: 32rpx 24rpx 24rpx 24rpx;
  box-shadow: 0 4rpx 16rpx #e4e6f5;
  margin: 10rpx 16rpx;
}

.sleep-header {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.sleep-icon {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #2a8cff;
  margin-right: 16rpx;
}

.sleep-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #222;
}

.sleep-desc {
  font-size: 24rpx;
  color: #000;
  margin-bottom: 12rpx;
}

.sleep-list {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  background: #f5f6fa;
  border-radius: 16rpx;
}

.sleep-item {
  font-size: 22rpx;
  border-radius: 12rpx;
  padding: 12rpx 16rpx;
}

.sleep-item-label {
  color: #ff7f27; // 橙色
  font-weight: bold;
}

.sleep-item-content {
  color: #3bb18a; // 绿色
}

.sleep-warn {
  font-size: 22rpx;
  text-align: center;
  margin: 16rpx 0 16rpx 0;
}

.sleep-warn-text {
  color: #A0A0A0;
}

.hr-detail-expand {
  margin-top: 24rpx;
  background: #FFF;
  border-radius: 20rpx;
  padding: 24rpx 12rpx;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

.hr-timeline {
  display: flex;
  justify-content: space-between;
  margin: 24rpx 0 12rpx 0;
}

.hr-timeline-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hr-timeline-time {
  color: #222;
  font-size: 24rpx;
  font-weight: bold;
  margin-bottom: 4rpx;
}

.hr-timeline-label {
  color: #888;
  font-size: 22rpx;
}

.hr-interpret {
  margin-top: 16rpx;
  display: flex;
  align-items: flex-start;
}

.hr-expert-icon {
  width: 48rpx;
  height: 48rpx;
  margin-right: 12rpx;
  filter: brightness(0) saturate(100%) invert(96%) sepia(10%) saturate(1000%) hue-rotate(280deg) brightness(100%) contrast(90%);
}

.hr-interpret-title {
  font-weight: bold;
  font-size: 26rpx;
  margin-bottom: 8rpx;
  color: #000;
}

.hr-interpret-text {
  font-size: 22rpx;
  color: #333;
  line-height: 1.7;
}

.indent {
  color: #000;
  display: inline-block;
  text-indent: 2em;
}

.hr-collapse-btn {
  color: #2a8cff;
  text-align: center;
  font-size: 28rpx;
  cursor: pointer;
  margin-top: 20rpx;
}

.chart-legend {
  display: flex;
  gap: 32rpx;
  margin-bottom: 12rpx;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.legend-dot {
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  display: inline-block;
}

.legend-dot.healthy {
  background: #3bb18a;
}

.legend-dot.abnormal {
  background: #ff7f27;
}

.sleep-score-section {
  background: #FFF;
  border-radius: 20rpx;
  margin: 0 16rpx 0 16rpx;
  padding: 32rpx 24rpx 24rpx 24rpx;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-circle {
  width: 200px;
  height: 200px;
  margin-bottom: 16rpx;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.score-background-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 240px;
  height: 240px;
  z-index: 1;
  border-radius: 50%;
  opacity: 0.8;
}

.score-progress-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 200px !important;
  height: 200px !important;
}

.score-star-icon {
  position: absolute;
  top: 24rpx;
  left: 51%;
  transform: translateX(-50%);
  width: 28rpx;
  height: 28rpx;
  z-index: 4;
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
}

.score-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20rpx;
  z-index: 3;
}

.score-title {
  font-size: 26rpx;
  color: #000;
}

.score-value {
  font-size: 60rpx;
  font-weight: bold;
  color: #000;
  line-height: 1;
}

.score-level {
  font-size: 26rpx;
  color: #3bb18a;
  margin-top: 2rpx;
}

.score-ring {
  width: 240px;
  height: 240px;
  display: block;
  margin: 0 auto;
  transform: rotate(-90deg);
}

.score-bg {
  fill: none;
  stroke: #e4e6f5;
  stroke-width: 12;
}

.score-fg {
  fill: none;
  stroke: #3bb18a;
  stroke-width: 12;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.6s;
}

.score-row {
  margin-top: 20rpx;
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.score-col {
  flex: none !important;
  width: 260rpx;
  height: 80rpx;
  padding: 20rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 20rpx;
  background-color: #f1f1f1;
}

.score-icon {
  width: 90rpx;
  height: 90rpx;
}

.score-label {
  font-size: 22rpx;
  color: #000;
  margin-bottom: 10rpx;
}

.score-time {
  font-size: 30rpx;
  color: #000;
  font-weight: bold;
  margin-top: 2rpx;
}

.score-eff-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rpx;
}

.score-efficiency {
  font-size: 28rpx;
  color: #3bb18a;
  font-weight: bold;
  margin-left: 2rpx;
}

.score-eff-unit {
  font-size: 18rpx;
  color: #3bb18a;
}

.score-effective-sleep {
  font-size: 22rpx;
  color: #222;
  margin: 8rpx 0 0 0;
  text-align: center;
}

.score-effective-time {
  font-weight: bold;
  margin-left: 4rpx;
  display: flex;
  align-items: flex-end;
}

.score-effective-num {
  font-size: 28rpx;
  font-weight: bold;
  color: #000;
}

.score-row-small {
  width: 100%;
}

.score-icon-small {
  width: 28rpx;
  height: 28rpx;
  margin-bottom: 2rpx;
  filter: brightness(0) saturate(100%) invert(61%) sepia(19%) saturate(1012%) hue-rotate(98deg) brightness(93%) contrast(92%);
}

.score-label-small {
  font-size: 20rpx;
  color: #000;
}

.score-time-small {
  font-size: 22rpx;
  color: #222;
  font-weight: bold;
  margin-top: 2rpx;
}

.score-icon-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
  margin-right: 30rpx;
}

.score-eff-label {
  font-size: 30rpx;
  color: #000;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rpx;
}

.score-eff-icon {
  font-size: 18rpx;
  color: #888;
  margin-left: 4rpx;
}

.score-effective-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rpx;
  margin: 8rpx 0 0 0;
}

.score-effective-label {
  font-size: 30rpx;
  color: #fff;
  font-weight: bold;
}

.score-row-center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48rpx;
  width: 100%;
}

.sleep-analysis-section {
  background: #FFF;
  border-radius: 20rpx;
  margin: 20rpx 16rpx 0 16rpx;
  padding: 12rpx 30rpx 20rpx 30rpx;
}

.sleep-analysis-top {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.sleep-analysis-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320rpx;
  margin-right: 16rpx;
}

.pie-chart-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280rpx;
  height: 280rpx;
  position: relative;
  border-radius: 8px;
  margin: 40rpx 0 0 0rpx;
}

.pie-chart-canvas {
  width: 280rpx !important;
  height: 280rpx !important;
  scale: 1.2;
}

.sleep-analysis-title {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  font-weight: bold;
  color: #222;
  margin-bottom: 12rpx;
}

.analysis-title-top {
  margin-top: 0;
  margin-bottom: 18rpx;
  justify-content: flex-start;
}

.sleep-analysis-title-icon {
  width: 48rpx;
  height: 48rpx;
  margin-right: 20rpx;
}

.sleep-analysis-title-text {
  font-size: 28rpx;
  font-weight: bold;
  color: #000;
}

.sleep-analysis-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.sleep-stage-row {
  margin-bottom: 30rpx;
}

.sleep-stage-row-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.sleep-stage-left {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sleep-stage-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.sleep-stage-name {
  font-size: 26rpx;
  font-weight: bold;
}

.sleep-stage-time {
  color: #fff;
  font-size: 18rpx;
  margin-left: 4rpx;
}

.sleep-stage-bar-bg {
  width: 100%;
  height: 12rpx;
  background: #f0f0f0;
  border-radius: 8rpx;
  position: relative;
  overflow: hidden;
  margin-top: 6rpx;
}

.sleep-stage-bar-fg {
  height: 100%;
  border-radius: 8rpx;
  transition: width 0.5s;
}

.sleep-stage-right {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  min-width: 60rpx;
  margin-left: 20rpx;
}

.sleep-stage-percent {
  font-size: 24rpx;
  font-weight: bold;
  color: #000;
  margin-bottom: 4rpx;
}

.sleep-stage-status {
  font-size: 22rpx;
  font-weight: bold;
  color: #fff;
  padding: 2rpx 6rpx;
  border-radius: 8rpx;

}

.sleep-stage-status.normal {
  background-color: #3bb18a;
}

.sleep-stage-status.abnormal {
  background-color: #ff7f27;
}

.indicator-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 18rpx;
  margin-top: 12rpx;
}

.indicator-card {
  background: #f0f0f0;
  border-radius: 16rpx;
  padding: 18rpx 8rpx 10rpx 12rpx;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 110rpx;
  gap: 10rpx;
  margin-left: 10rpx;
}

.indicator-title {
  font-size: 24rpx;
  color: #000;
  font-weight: bold;
  margin: 0 0 8rpx 10rpx;
}

.indicator-middle {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8rpx; // 可根据实际效果调整
  margin: 0 0 8rpx 10rpx;

}

.indicator-value {
  font-size: 26rpx;
  color: #378d82;
  font-weight: bold;
}

.indicator-status {
  font-size: 18rpx;
  font-weight: bold;
  color: #fff;
  padding: 2rpx 8rpx;
  border-radius: 8rpx;
  margin-left: 8rpx;
}

.indicator-status.normal {
  background-color: #3bb18a;
}

.indicator-status.abnormal {
  background-color: #ff7f27;
}

.indicator-reference {
  font-size: 20rpx;
  color: #000;
  margin: 0 0 8rpx 10rpx;
  text-align: left;
  width: 100%;
}

.indicator-big-card {
  background: #f8f9fa;
  border-radius: 16rpx;
  padding: 18rpx 12rpx 10rpx 12rpx;
  box-shadow: 0 2rpx 8rpx #e4e6f5;
  margin-top: 12rpx;
  display: flex;
  flex-direction: column;
}

.indicator-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10rpx 0;
}

.indicator-divider {
  width: 100%;
  height: 1rpx;
  background: #e4e6f5;
  margin-top: 10rpx;
}

.sleep-structure-section {
  background: #fff;
  border-radius: 20rpx;
  padding: 32rpx 24rpx 24rpx 24rpx;
  box-shadow: 0 4rpx 16rpx #e4e6f5;
  margin: 10rpx 16rpx 0 16rpx;
}

.sleep-structure-header {
  display: flex;
  align-items: center;
  margin-bottom: 18rpx;
}

.sleep-structure-icon {
  width: 48rpx;
  height: 48rpx;
  margin-right: 20rpx;
}

.sleep-structure-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #000;
}

.sleep-structure-flow {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 12rpx;
}

.sleep-structure-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 32rpx;
}

.arrow-box {
  display: flex;
  align-items: center;
}

.arrow-label {
  background: #20c997;
  color: #fff;
  font-size: 18rpx;
  font-weight: bold;
  border-radius: 6rpx 0 0 6rpx;
  padding: 0 18rpx;
  height: 36rpx;
  display: flex;
  align-items: center;
}

.arrow-shape {
  width: 18rpx;
  height: 36rpx;
  background: #20c997;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
}

.arrow-down {
  width: 0;
  height: 0;
  border-left: 8rpx solid transparent;
  border-right: 8rpx solid transparent;
  border-top: 12rpx solid #20c997;
  margin: 0 auto 2rpx auto;
}

.arrow-status {
  color: #9F9F9F;
  font-size: 16rpx;
  margin-top: 4rpx;
}

.sleep-structure-more {
  color: #2a8cff;
  text-align: center;
  font-size: 28rpx;
  margin-top: 20rpx;
  cursor: pointer;
}

.sleep-structure-detail {
  background: #fff;
  border-radius: 16rpx;
  margin: 18rpx 0 0 0;
  padding: 18rpx 12rpx 8rpx 12rpx;
  box-shadow: 0 2rpx 8rpx #e4e6f5;
}

.structure-detail-item {
  margin-bottom: 18rpx;
}

.detail-title-row {
  display: flex;
  align-items: center;
  margin-bottom: 4rpx;
}

.detail-icon {
  width: 22rpx;
  height: 22rpx;
  margin-right: 6rpx;
}

.detail-title {
  font-size: 18rpx;
  font-weight: bold;
  color: #222;
}

.detail-desc {
  font-size: 16rpx;
  color: #333;
  line-height: 1.7;
  margin-left: 28rpx;
}

.sleep-structure-collapse {
  color: #2a8cff;
  text-align: center;
  font-size: 28rpx;
  margin-top: 20rpx;
  cursor: pointer;
}

.sleep-stage-section {
  background: #FFF;
  border-radius: 20rpx;
  margin: 20rpx 16rpx 0 16rpx;
  padding: 32rpx 30rpx 30rpx 24rpx;
}

.sleep-stage-legend {
  display: flex;
  gap: 24rpx;
  margin-bottom: 12rpx;
  margin-top: 8rpx;
}

.sleep-stage-legend .legend-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
  font-size: 26rpx;
}

.sleep-stage-legend .legend-dot {
  width: 18rpx;
  height: 18rpx;
  border-radius: 4rpx;
  display: inline-block;
}

.sleep-stage-timeline {
  display: flex;
  justify-content: space-between;
  margin-top: 8rpx;
}

.sleep-stage-timeline .timeline-item {
  font-size: 18rpx;
  color: #888;
}

.sleep-stage-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 2rpx;
}

.sleep-stage-labels .label-item {
  font-size: 18rpx;
  color: #888;
}

.sleep-stage-chart {
  margin-top: 20rpx;
  background: #FFF;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  width: 100%;
  box-sizing: border-box;
}

/* 睡眠阶段图表占满父容器宽度 */
.sleep-stage-chart {
  width: 100%;
  box-sizing: border-box;
}

/* 每个阶段行 */
.stage-row {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
  height: 50rpx;
  position: relative;
  width: 100%;
}

.stage-row:last-child {
  margin-bottom: 8rpx;
}

/* Y轴标签 */
.stage-label {
  width: 80rpx;
  flex-shrink: 0;
  margin-right: 16rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.stage-name {
  font-size: 16rpx;
  color: #555;
  font-weight: 500;
  text-align: right;
}

/* 阶段时间轴 */
.stage-timeline {
  flex: 1;
  position: relative;
  height: 40rpx;
  background: #FFF;
  border-radius: 10rpx;
  overflow: hidden;
  width: 100%;
}

/* 时间段 */
.stage-segment {
  position: absolute;
  height: 100%;
  border-radius: 20rpx;
  transition: all 0.3s ease;
}

/* X轴时间标签 */
.x-axis-labels {
  position: relative;
  height: 30rpx;
  margin-top: 8rpx;
  width: 98%;
  margin-left: 1%;

}

.x-axis-label {
  position: absolute;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.chart-container {
  display: flex;
  flex-direction: column;
  margin: 20rpx 0 0 0;
  background: #FFF;
  border-radius: 12rpx 12rpx 0 0;
  padding: 16rpx;
  margin-left: 0;
  margin-right: 0;
  width: 100%;
  box-sizing: border-box;
}

.chart-canvas {
  border-radius: 8rpx;
  background: #FFF;
  width: 100%;
  box-sizing: border-box;
}

.chart-timeline {
  display: flex;
  justify-content: center;
  align-items: start;
  border-radius: 0 0 12rpx 12rpx;
  min-height: 50rpx;
  width: 100%;
  padding: 0 20rpx;
  box-sizing: border-box;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 0;
  position: relative;
}

.timeline-time {
  font-size: 20rpx;
  color: #000000;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  padding: 4rpx 8rpx;
  border-radius: 6rpx;
  backdrop-filter: blur(4rpx);
}

/* #ifdef MP-WEIXIN */
.qcharts-middle-text,
.u-charts-middle-text {
  display: none !important;
}

/* #endif */
</style>