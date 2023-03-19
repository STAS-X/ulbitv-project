import axios from 'axios';
import { USER_LS_KEY } from '../const/localstorage';

export const $apiAxios = axios.create({
	baseURL: _BASE_URL_,
	headers: {
		authorization: localStorage.getItem(USER_LS_KEY) ?? ''
	}
});
