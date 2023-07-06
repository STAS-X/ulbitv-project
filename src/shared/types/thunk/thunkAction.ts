import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtraThunkArgs, AppThunkDispatch, StateSchema } from '@/app/providers/StoreProvider';

interface SerializedError {
	name?: string;
	message?: string;
	code?: string;
	stack?: string;
}
export type ThunkError = SerializedError | any;

//Defining a Pre - Typed createAsyncThunk
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: StateSchema;
	dispatch: AppThunkDispatch;
	extra: ExtraThunkArgs;
	error: ThunkError;
	rejectValue: string;
}>();

export function getErrorMessage(error: ThunkError) {
	//console.log(error, 'get error data');
	return (
		error?.message ||
		error?.response?.data?.message ||
		error?.response?.data?.error ||
		error?.data?.message ||
		error?.data?.error ||
		'server internal error'
	);
}
