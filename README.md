# Usleep Sleep Quality Monitoring App

> A cross-platform sleep health monitoring system built with uni-app, helping users track sleep health in real-time, analyze sleep patterns, and improve sleep quality.

## 📱 About The Project

Usleep is a professional sleep health monitoring application designed for everyone. It collects vital signs such as heart rate and respiratory rate during sleep through smart devices, automatically analyzes sleep structure and quality, and generates professional health reports. It provides scientific data support for sleep health management and helps users develop good sleep habits.

## ✨ Key Features

### 👁️ Real-time Vital Signs Monitoring
- Real-time display of heart rate and respiratory rate data
- Dynamic line chart visualization of vital sign changes
- Automatic abnormal data alert
- Smart health range indication

### 📊 Sleep Quality Analysis
- Sleep duration and sleep efficiency statistics
- Deep sleep and light sleep analysis
- Sleep apnea risk identification
- Personalized sleep score assessment

### 📄 Health Report Generation
- Daily/weekly/monthly sleep reports
- Vital sign trend analysis
- Chart visualization display
- Report export and sharing functionality

### 🎨 Interface Features
- Clean and modern design with intuitive operation
- Responsive layout adapting to all screen sizes
- Smooth animation interaction effects
- Clear and easy-to-understand data visualization

## 🛠️ Tech Stack

```
| Technology/Framework | Version | Purpose |
| --- | --- | --- |
| uni-app | 2.x | Cross-platform development framework |
| Vue | 2.7.x | Frontend framework |
| uCharts | 2.5.x | Chart visualization library |
| Canvas API | - | Custom chart rendering |
| Node.js | 14+ | Development environment dependency |
| HBuilderX | 3.0+ | Official recommended IDE |
```

## 📱 Supported Platforms

- ✅ Android APP
- ✅ iOS APP
- ✅ WeChat Mini Program
- ✅ H5 Web Version
- ✅ Alipay Mini Program

## 🚀 Getting Started

### Prerequisites
- HBuilderX 3.0+
- Node.js 14 or higher

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/usleep.git
```

2. Open the project with HBuilderX

3. Install dependencies
```bash
npm install
```

4. Configure API endpoint
Open `utils/config.js` and modify the backend API address:
```javascript
const baseApi = {
  develop: {
    baseUrl: 'YOUR_BACKEND_API_URL'
  },
  release: {
    baseUrl: 'YOUR_BACKEND_API_URL'
  }
}
```

5. Select your target platform and click the run button in HBuilderX

## 📂 Project Structure

```
┌─ components/          # Common components
│  ├─ dayReport.vue     # Daily report component (respiratory/heart rate charts)
│  └─ ...
├─ pages/               # Page files
│  ├─ index/            # Home page
│  ├─ report/           # Report page
│  └─ components/       # Page-level components
│     ├─ RealtimeTab.vue   # Real-time vital signs monitoring component
│     └─ ReportTab.vue     # Report display component
├─ utils/               # Utility functions
│  ├─ request.js        # Network request encapsulation
│  └─ config.js         # Configuration file
├─ static/              # Static resources
├─ pages.json           # Page configuration
├─ manifest.json        # Application configuration
└─ App.vue              # Application entry point
```

## 📊 Core Implementations

### Vital Signs Chart Visualization
- Dynamic line charts for respiratory rate and heart rate
- Custom Canvas rendering with excellent performance
- Responsive design adapting to all screen sizes
- Health range highlighting

### Sleep Score Ring Chart
- Ring progress bar implemented with uCharts
- Smooth animation effects
- Support 0-100 sleep score display
- User-friendly touch interaction

### Data Communication
- Unified network request encapsulation
- Support request interception and response interception
- Automatic exception handling
- Automatic environment recognition and switching

## 📝 Development Guidelines

1. Follow uni-app official development specifications
2. Use PascalCase naming convention for components
3. Prioritize rpx for style units
4. Use `utils/request.js` for all API requests
5. Place constant configurations in `utils/config.js`

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

## 👥 Contact

If you have any questions or suggestions, please feel free to open an issue or contact the development team.

---

**Disclaimer**: This project is for health monitoring reference only and cannot replace professional medical diagnosis.