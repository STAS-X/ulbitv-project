import { DeepPartial, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUserName/model/slices/loginSlice';

const initialReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
	loginForm: loginReducer
};

export const StoreDecorator =
	(state: DeepPartial<StateSchema>, asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>) =>
	(StoryComponent: Story) =>
		(
			<StoreProvider initialState={state} asyncReducers={{ ...initialReducers, ...asyncReducers }}>
				<StoryComponent />
			</StoreProvider>
		);
