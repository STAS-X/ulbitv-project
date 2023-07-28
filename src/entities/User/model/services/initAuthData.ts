import { USER_LS_KEY } from './../../../../shared/const/localstorage';
import { UserData } from '../types/userSchema';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from '@/shared/types/thunk/thunkAction';
import { getUserDataById } from '../../api/userApi';

// First, create the thunk
export const initAuthData = createAppAsyncThunk<UserData, void>(
	'user/initAuthData',
	async (_, thunkApi) => {
		const { dispatch, rejectWithValue } = thunkApi;

		const userId = JSON.parse(localStorage.getItem(USER_LS_KEY) ?? '{}')?.id ?? '';

		if (!userId) return rejectWithValue('userNotFound');

		try {
			const response = await dispatch(
				getUserDataById({
					userId
				})
			).unwrap();

			if (!response) {
				throw new Error('userNotFound');
			}
			//throw new Error('network error occured');
			console.log(response, 'user from backend');

			return response;
		} catch (e: ThunkError) {
			if (e.response?.status === 404) return rejectWithValue('userNotFound');
			//if (!e.response || !e.message) throw e;
			return rejectWithValue(getErrorMessage(e));
		}
	}
);
