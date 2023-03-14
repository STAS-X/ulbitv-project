import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { FC, ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';
import { useAppDispatch } from 'app/providers/StoreProvider/config/store';

interface DynamicModuleLoaderProps {
	reducers: ReducerList;
	children?: ReactNode;
	removeAfterUnmount?: boolean;
}

type ReduceListEntire = [StateSchemaKey, Reducer];

export type ReducerList = {
	[name in StateSchemaKey]?: Reducer;
};

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
	const { children, reducers, removeAfterUnmount } = props;

	const dispatch = useAppDispatch();
	const store = useStore() as ReduxStoreWithManager;

	useEffect(() => {
		Object.entries(reducers).forEach(([name, reducer]: ReduceListEntire) => {
			store.reducerManager.add(name, reducer);
			dispatch({ type: `@@INIT ${name}` });
		});
		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([name, reducer]: ReduceListEntire) => {
					store.reducerManager.remove(name);
					dispatch({ type: `@@DESTROY ${name}` });
				});
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{children}</>;
};
