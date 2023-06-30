import { useMemo } from 'react';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/store';
import {
	ActionCreatorsMapObject,
	bindActionCreators,
	createSlice,
	CreateSliceOptions,
	SliceCaseReducers
} from '@reduxjs/toolkit';

export function buildSlice<State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>(
	options: CreateSliceOptions<State, CaseReducers, Name>
) {
	const slice = createSlice(options);

	const useActions = () => {
		const dispatch = useAppDispatch();
		return useMemo(
			() => bindActionCreators(slice.actions as unknown as ActionCreatorsMapObject<any>, dispatch),
			[dispatch]
		);
	};

	return {
		...slice,
		useActions
	};
}
