import { CommonSchema } from 'entities/Common';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = { value: 0, isLazyModal: false } as CommonSchema;

const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		increment(state) {
			state.value++;
		},
		decrement(state) {
			state.value--;
		},
		incrementByAmount(state, action: PayloadAction<number>) {
			state.value += action.payload;
		},
		setByAmount(state, action: PayloadAction<number>) {
			state.value = action.payload;
		},
		setLazyModal(state, action: PayloadAction<boolean>) {
			state.isLazyModal = action.payload;
		}
	}
});

export const { actions: commonActions, reducer: commonReducer } = commonSlice;
