import axios from 'axios';
import { USER_LS_KEY } from '../const/localstorage';

export const $apiAxios = axios.create({
	baseURL: 'http://locallhost:8000',
	headers: {
		autorization: localStorage.getItem(USER_LS_KEY)
	}
});
