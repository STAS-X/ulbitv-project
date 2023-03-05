import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { counterReducer } from 'entities/Counter/model/slices/counterSlices';
import { userReducer } from 'entities/User';

const rootReducers: ReducersMapObject<StateSchema> = {
	counter: counterReducer,
	user: userReducer
};

export function createReduxStore(initialState?: StateSchema) {
	return configureStore({
		reducer: rootReducers,
		devTools: _DEV_MODE_,
		preloadedState: initialState
	});
}
