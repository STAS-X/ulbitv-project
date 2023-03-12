import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { FC, ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';

interface DynamicModuleLoaderProps {
	name: StateSchemaKey;
	reducer: Reducer;
	children?: ReactNode;
	removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
	const { children, name, reducer, removeAfterUnmount } = props;

	const store = useStore() as ReduxStoreWithManager;

	useEffect(() => {
		store.reducerManager.add(name, reducer);
		return () => {
			if (removeAfterUnmount) store.reducerManager.remove(name);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{children}</>;
};
