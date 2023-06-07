import { DeepPartial } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entities/Article';
import { loginReducer } from '@/features/AuthByUserName/model/slices/loginSlice';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { addCommentFormReducer } from '@/features/AddCommentForm/model/slices/addCommentFormSlice';
import { articleDetailesPageReducer } from '@/pages/ArticleDetailesPage/model/slice';
import { editableProfileReducer } from '@/features/EditableProfileCard/model/slices/editableProfileSlices';

const initialReducers: ReducerList = {
	loginForm: loginReducer,
	articleDetailes: articleDetailsReducer,
	articleDetailesPage: articleDetailesPageReducer,
	addCommentForm: addCommentFormReducer,
	profile: editableProfileReducer
};

export const StoreDecorator =
	(state: DeepPartial<StateSchema>, asyncReducers?: ReducerList) => (StoryComponent: Story) =>
		(
			<StoreProvider initialState={state} asyncReducers={{ ...initialReducers, ...asyncReducers }}>
				<StoryComponent />
			</StoreProvider>
		);
