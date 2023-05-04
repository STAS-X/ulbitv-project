import axios from 'axios';
import { USER_LS_KEY } from '../const/localstorage';

export const $apiAxios = axios.create({
	baseURL: _BASE_URL_
});

$apiAxios.interceptors.request.use((config) => {
	if (config.headers) config.headers['authorization'] = localStorage.getItem(USER_LS_KEY) ?? ''
	return config;
})