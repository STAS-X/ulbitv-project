import { DeepPartial } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducer } from 'entities/Article';
import { profileReducer } from 'entities/Profile';
import { reducerArticleComments } from 'pages/ArticleDetailesPage';
import { loginReducer } from 'features/AuthByUserName/model/slices/loginSlice';
import { ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const initialReducers: ReducerList = {
	loginForm: loginReducer,
	profile: profileReducer,
	articleDetailes: articleDetailsReducer,
	articleDetailesComments: reducerArticleComments
};

export const StoreDecorator =
	(state: DeepPartial<StateSchema>, asyncReducers?: ReducerList) => (StoryComponent: Story) =>
		(
			<StoreProvider initialState={state} asyncReducers={{ ...initialReducers, ...asyncReducers }}>
				<StoryComponent />
			</StoreProvider>
		);
