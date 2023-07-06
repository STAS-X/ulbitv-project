import { Reducer } from '@reduxjs/toolkit';
import { AppStoreWithReducerManager, useAppDispatch, StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider';
import { FC, ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';

interface DynamicModuleLoaderProps {
	reducers: ReducerList;
	children?: ReactNode;
	removeAfterUnmount?: boolean;
}

export type ReduceListEntire = [StateSchemaKey, Reducer];

export type ReducerList = {
	[name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
	const { children, reducers, removeAfterUnmount = false } = props;

	const dispatch = useAppDispatch();
	const store = useStore() as AppStoreWithReducerManager;

	useEffect(() => {
		console.log('mound dynamic module');
		Object.entries(reducers).forEach(([name, reducer]) => {
			//console.log(Object.keys(store.reducerManager.getReducerMap()).length, 'reducers count before add');
			store.reducerManager.add(name as StateSchemaKey, reducer);
			//console.log(Object.keys(store.reducerManager.getReducerMap()).length, 'reducers count after add');
			dispatch({ type: `@@INIT ${name}` });
		});
		return () => {
			console.log('unmound dynamic module');
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
