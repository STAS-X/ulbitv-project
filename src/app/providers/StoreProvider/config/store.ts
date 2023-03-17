import { useDispatch } from 'react-redux';
import {
	configureStore,
	ReducersMapObject,
	AnyAction,
	EnhancedStore,
	ThunkDispatch,
	getDefaultMiddleware,
	ThunkMiddleware,
	MiddlewareArray
} from '@reduxjs/toolkit';
import { ExtraThunkArgs, ReducerManager, StateSchema } from './StateSchema';
import { commonReducer } from 'entities/Common/model/slices/commonSlices';
import { userReducer } from 'entities/User';
import { createReducerManager } from './reducerManager';
import { $apiAxios } from 'shared/api/api';

export const rootReducer: ReducersMapObject<StateSchema> = {
	common: commonReducer,
	user: userReducer
	//loginForm: loginReducer
};

export function createReduxStore(
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>,
	extra?: ExtraThunkArgs
) {
	const reducerManager = createReducerManager({ ...asyncReducers, ...rootReducer });

	const store = configureStore<
		StateSchema,
		AnyAction,
		MiddlewareArray<[ThunkMiddleware<StateSchema, AnyAction, ExtraThunkArgs>]>
	>({
		reducer: reducerManager.reduce,
		devTools: _DEV_MODE_,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: {
						api: extra.api ?? $apiAxios,
						navigate: extra.navigate
					}
				}
			})
	}) as AppStoreWithReducerManager;

	// Optional: Put the reducer manager on the store so it is easily accessible
	store.reducerManager = reducerManager;

	return store;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof createReduxStore>;
// 2. Create a type for thunk dispatch
export type AppThunkDispatch = ThunkDispatch<StateSchema, any, AnyAction>;
// 3. Create a type for store using RootState and Thunk enabled dispatch
export type AppStoreWithReducerManager = Omit<EnhancedStore<StateSchema>, 'reducerManager'> & {
	dispatch: AppThunkDispatch;
	reducerManager: ReducerManager;
};

export const useAppDispatch = () => useDispatch<AppThunkDispatch>(); // Export a hook that can be reused to resolve types
