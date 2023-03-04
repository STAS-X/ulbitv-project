import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './stateSchema';
import { counterReducer } from 'entities/Counter/model/slices/counterSlices';

export function createReduxStore(initialState?: StateSchema) {
	return configureStore({
		reducer: { counter: counterReducer },
		devTools: _DEV_MODE_,
		preloadedState: initialState
	});
}
