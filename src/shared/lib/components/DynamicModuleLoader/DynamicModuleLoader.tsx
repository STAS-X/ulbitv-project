import { Reducer } from '@reduxjs/toolkit';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { FC, ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';
import { AppStoreWithReducerManager, useAppDispatch } from 'app/providers/StoreProvider';

interface DynamicModuleLoaderProps {
	reducers: ReducerList;
	children?: ReactNode;
	removeAfterUnmount?: boolean;
}

export type ReduceListEntire = [StateSchemaKey, Reducer];

export type ReducerList = {
	[name in StateSchemaKey]?: Reducer;
};

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
	const { children, reducers, removeAfterUnmount } = props;

	const dispatch = useAppDispatch();
	const store = useStore() as AppStoreWithReducerManager;

	useEffect(() => {
		Object.entries(reducers).forEach(([name, reducer]) => {
			store.reducerManager.add(name as StateSchemaKey, reducer);
			dispatch({ type: `@@INIT ${name}` });
		});
		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([name]) => {
					store.reducerManager.remove(name as StateSchemaKey);
					dispatch({ type: `@@DESTROY ${name}` });
				});
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{children}</>;
};
