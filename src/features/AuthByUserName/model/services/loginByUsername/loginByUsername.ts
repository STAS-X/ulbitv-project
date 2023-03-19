import { userActions, UserData } from 'entities/User';
import { USER_LS_KEY } from 'shared/const/localstorage';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from 'shared/types/thunk/thunkAction';

export interface LoginByUsernameProps {
	username: string;
	password: string;
}

// First, create the thunk
export const loginByUsername = createAppAsyncThunk<UserData, LoginByUsernameProps>(
	'login/fetchByUsername',
	async (authData, thunkApi) => {
		console.log(authData, thunkApi, 'auth data completed thunk data');
		const { extra, dispatch, rejectWithValue } = thunkApi;

		try {
			const response = await extra.api.post<UserData>('/login', authData);

			if (!response.data) {
				throw new Error('error');
			}
			localStorage.setItem(USER_LS_KEY, JSON.stringify(response.data));
			dispatch(userActions.setAuthData(response.data));
			extra.navigate('/about');
			return response.data;
		} catch (e: ThunkError) {
			console.log(e.message, 'Внимание, во время запроса возникла ошибка');
			if (!e.response || !e.message) throw e;
			return rejectWithValue(getErrorMessage(e));
		}
	}
);
