import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { commonReducer } from 'entities/Common';
import { userReducer } from 'entities/User';

const initialReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
	common: commonReducer,
	user: userReducer
	//loginForm: loginReducer,
	//profile: profileReducer
};

export const StoreDecorator =
	(state: DeepPartial<StateSchema>, asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>) =>
	(StoryComponent: Story) =>
		(
			<StoreProvider initialState={state} asyncReducers={{ ...initialReducers, ...asyncReducers }}>
				<StoryComponent />
			</StoreProvider>
		);
