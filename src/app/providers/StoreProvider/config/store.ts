import { useDispatch } from 'react-redux';
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchema } from './StateSchema';
import { commonReducer } from 'entities/Common/model/slices/commonSlices';
import { userReducer } from 'entities/User';
import { createReducerManager } from './reducerManager';

const rootReducers: ReducersMapObject<StateSchema> = {
	common: commonReducer,
	user: userReducer
	//loginForm: loginReducer
};

export function createReduxStore(
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>
): ReduxStoreWithManager {
	const reducerManager = createReducerManager({ ...asyncReducers, ...rootReducers });

	const store = configureStore<StateSchema>({
		reducer: reducerManager.reduce,
		devTools: _DEV_MODE_,
		preloadedState: initialState
	});

	// Optional: Put the reducer manager on the store so it is easily accessible
	(store as ReduxStoreWithManager).reducerManager = reducerManager;

	return store as ReduxStoreWithManager;
}

const store = configureStore<StateSchema>({ reducer: rootReducers });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
