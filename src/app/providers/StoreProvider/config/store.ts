import { useDispatch } from 'react-redux';
import { configureStore, DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { commonReducer } from 'entities/Common/model/slices/commonSlices';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUserName/model/slices/loginSlice';

const rootReducers: ReducersMapObject<StateSchema> = {
	common: commonReducer,
	user: userReducer,
	loginForm: loginReducer
};

export function createReduxStore(initialState?: StateSchema) {
	return configureStore({
		reducer: rootReducers,
		devTools: _DEV_MODE_,
		preloadedState: initialState
	});
}

const store = configureStore({ reducer: rootReducers });

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
