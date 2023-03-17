import { LoginSchema } from 'features/AuthByUserName';
import { UserSchema } from 'entities/User';
import { CommonSchema } from 'entities/Common';
import { ProfileSchema } from 'entities/Profile';
import { AnyAction, CombinedState, Reducer, ReducersMapObject } from '@reduxjs/toolkit';

export interface StateSchema {
	common: CommonSchema;
	user: UserSchema;
	// Асинхронный редюссер
	loginForm?: LoginSchema;
	profile?: ProfileSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}
