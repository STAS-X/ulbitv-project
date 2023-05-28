import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtraThunkArgs, StateSchema } from 'app/providers/StoreProvider';
import { AppThunkDispatch } from 'app/providers/StoreProvider/config/store';

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
	return (
		(error?.message ||
			error?.response?.data?.message ||
			error?.response?.data?.error ||
			error?.response?.data ||
			error?.data ||
			error?.error ||
			error?.toString()) ??
		undefined
	);
}
