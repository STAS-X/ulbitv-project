import { ArticleDetailesPageSchema } from '@/pages/ArticleDetailesPage';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';
import { AddCommentFormSchema } from '@/features/AddCommentForm';
import { LoginSchema } from '@/features/AuthByUserName';
import { UserSchema } from '@/entities/User';
import { CommonSchema } from '@/entities/Common';
import { ProfileSchema } from '@/entities/Profile';
import { AnyAction, CombinedState, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { ArticleDetailesSchema } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
	common: CommonSchema;
	user: UserSchema;
	[rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
	// Асинхронный редюссер
	loginForm?: LoginSchema;
	profile?: ProfileSchema;
	articleDetailes?: ArticleDetailesSchema;
	articleDetailesPage?: ArticleDetailesPageSchema;
	addCommentForm?: AddCommentFormSchema;
	articlesPage?: ArticlesPageSchema;
}

export type StateSchemaKey = keyof StateSchema;

// Extra Thunk Action Arguments
export interface ExtraThunkArgs {
	api: AxiosInstance;
	navigate: NavigateFunction;
}

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer?: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}
