import { UserSchema } from 'entities/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginByUsernameProps {
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

// First, create the thunk
export const loginByUsername = createAsyncThunk<UserSchema, LoginByUsernameProps, { rejectValue: string }>(
	'login/fetchByUsername',
	async (authData, thunkAPI) => {
		try {
			const response = await axios.post<UserSchema>('http://localhost:8000/login', authData);
			if (!response.data) {
				throw new Error('error');
			}
			return response.data;
		} catch (e) {
			console.log(e.message, 'Внимание, во время запроса возникла ошибка');
			if (!e.response || !e.message) throw e;
			return thunkAPI.rejectWithValue(getErrorMessage(e));
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
