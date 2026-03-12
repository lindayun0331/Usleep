import { request } from '../utils/request'

export const getOpenid = (data) => {
	return request({
		url: `/web/develop/wxApi/Admin/getOpenid`,
		method: "GET",
		data: data,
	})
}

export const getUserPhoneNumber = (data) => {
	return request({
		url: `/web/develop/wxApi/Admin/getPhone`,
		method: "GET",
		data: data,
	})
}