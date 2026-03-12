import {
	defineStore
} from 'pinia';

export const useStore = defineStore('pinia', {
	state: () => {
		return {
			baseUrl: "https://usleep.will-tec.com",
			loginUserInfo: {}, //用户信息
			loginStatus: false, //登录状态
			QRScanOpen: false,
		};
	},
});