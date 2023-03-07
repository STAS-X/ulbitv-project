import { CounterSchema } from 'entities/Counter';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = { value: 0, isLazyModal: false } as CounterSchema;

const counterSlice = createSlice({
	name: 'counter',
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

export const { actions: counterActions, reducer: counterReducer } = counterSlice;
