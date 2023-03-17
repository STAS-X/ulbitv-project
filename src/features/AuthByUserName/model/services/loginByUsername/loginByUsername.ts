import { ExtraThunkArgs } from 'app/providers/StoreProvider';
import { userActions, UserData } from 'entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_LS_KEY } from 'shared/const/localstorage';
import { AppThunkDispatch } from 'app/providers/StoreProvider/config/store';
import { StateSchema } from '../../../../../app/providers/StoreProvider';

export interface LoginByUsernameProps {
	username: string;
	password: string;
}

interface SerializedError {
	name?: string;
	message?: string;
	code?: string;
	stack?: string;
}
type ThunkError = SerializedError | any;

//Defining a Pre - Typed createAsyncThunk
const createAppAsyncThunk =
	createAsyncThunk.withTypes<{
		state: StateSchema;
		dispatch: AppThunkDispatch;
		extra: ExtraThunkArgs;
		rejectValue: string;
	}>();

// First, create the thunk
export const loginByUsername = createAppAsyncThunk<UserData, LoginByUsernameProps>(
	'login/fetchByUsername',
	async (authData, { extra, dispatch, rejectWithValue }) => {
		try {
			const response = await extra.api.post<UserData>('http://localhost:8000/login', authData);

			if (!response.data) {
				throw new Error('error');
			}
			localStorage.setItem(USER_LS_KEY, JSON.stringify(response.data));
			dispatch(userActions.setAuthData(response.data));
			extra.navigate('/about');
			return response.data;
		} catch (e) {
			console.log(e.message, 'Внимание, во время запроса возникла ошибка');
			if (!e.response || !e.message) throw e;
			return rejectWithValue(getErrorMessage(e));
		}
	}
);

export function getErrorMessage(error: ThunkError) {
	return (
		error?.message ||
		error?.response?.data?.message ||
		error?.response?.data.error ||
		error?.response?.data ||
		error.toString()
	);
}
