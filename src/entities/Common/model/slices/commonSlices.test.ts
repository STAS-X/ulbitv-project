import { CommonSchema } from '../types/commonSchema';
import { commonReducer, commonActions } from '../../';

const state: CommonSchema = {
	value: 20,
	isLazyModal: true
};

describe('commonSlices.test', () => {
	test('should increment common', () => {
		expect(commonReducer(state, commonActions.increment())).toEqual({ value: 21, isLazyModal: true });
	});

	test('should decrement common', () => {
		expect(commonReducer(state, commonActions.decrement())).toEqual({ value: 19, isLazyModal: true });
	});

	test('should amount common', () => {
		expect(commonReducer(state, commonActions.incrementByAmount(5))).toEqual({ value: 25, isLazyModal: true });
	});

	test('if state is undefined', () => {
		expect(commonReducer(undefined, commonActions.increment())).toEqual({ value: 1, isLazyModal: false });
	});
});
