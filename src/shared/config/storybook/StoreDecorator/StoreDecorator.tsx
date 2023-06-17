import { DeepPartial } from '@reduxjs/toolkit';
import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entities/Article/testing';
import { loginReducer } from '@/features/AuthByUserName/testing';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addCommentFormReducer } from '@/features/AddCommentForm/testing';
import { articleDetailesPageReducer } from '@/pages/ArticleDetailesPage/testing';
import { editableProfileReducer } from '@/features/EditableProfileCard/testing';

const initialReducers: ReducerList = {
	loginForm: loginReducer,
	articleDetailes: articleDetailsReducer,
	articleDetailesPage: articleDetailesPageReducer,
	addCommentForm: addCommentFormReducer,
	profile: editableProfileReducer
};

export const StoreDecorator =
	(state: DeepPartial<StateSchema>, asyncReducers?: ReducerList) => (StoryComponent: StoryFn) =>
		(
			<StoreProvider initialState={state} asyncReducers={{ ...initialReducers, ...asyncReducers }}>
				<StoryComponent />
			</StoreProvider>
		);
