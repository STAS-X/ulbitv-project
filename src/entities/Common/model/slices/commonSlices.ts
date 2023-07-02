import { CommonSchema } from '../types/commonSchema';
import type { PayloadAction } from '@reduxjs/toolkit';
import { buildSlice } from '@/shared/lib/store';

const initialState: CommonSchema = { value: 0, isLazyModal: false };

const commonSlice = buildSlice({
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

export const { actions: commonActions, reducer: commonReducer, useActions: useCounterActions } = commonSlice;
