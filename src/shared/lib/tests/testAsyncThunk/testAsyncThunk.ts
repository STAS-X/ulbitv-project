import { $apiAxios } from 'shared/api/api';
import { ExtraThunkArgs } from 'app/providers/StoreProvider/config/StateSchema';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { NavigateFunction } from 'react-router-dom';

type ActionCreatorType<Return, Arg, ExtraThunkArgs, RejectedValue> = (
	arg: Arg
) => AsyncThunkAction<Return, Arg, { extra: ExtraThunkArgs; rejectValue: RejectedValue }>;

export class TestAsyncThunk<Return, Arg, ExtraThunkArgs, RejectedValue> {
	dispatch: jest.Mocked<any>;
	getState: () => StateSchema;
	navigate: NavigateFunction;
	actionCreator: ActionCreatorType<Return, Arg, ExtraThunkArgs, RejectedValue>;

	constructor(actionCreator: ActionCreatorType<Return, Arg, ExtraThunkArgs, RejectedValue>) {
		this.actionCreator = actionCreator;
		this.dispatch = jest.fn();
		this.getState = jest.fn();
		this.navigate = jest.fn();
	}

	async callThunk(arg: Arg) {
		const action = this.actionCreator(arg);
		const result = await action(this.dispatch, this.getState, { api: $apiAxios, navigate: this.navigate }, undefined);
		return result;
	}
}
