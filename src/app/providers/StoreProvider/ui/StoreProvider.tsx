import { ReducersMapObject } from '@reduxjs/toolkit';
import { useNavigate } from 'app/providers/RouterUtilsProvider/RouterUtilsProvider';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { $apiAxios } from 'shared/api/api';
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

export interface StoreProviderProps {
	children?: ReactNode;
	initialState?: DeepPartial<StateSchema>;
	asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider: FC<StoreProviderProps> = (props: StoreProviderProps) => {
	const { children, initialState, asyncReducers } = props;
	// useRef retains object reference between re-renders
	const navigate = useNavigate();
	const api = $apiAxios;

	const store = createReduxStore(initialState as StateSchema, asyncReducers as ReducersMapObject<StateSchema>, {
		api,
		navigate
	});

	return <Provider store={store}>{children}</Provider>;
};
