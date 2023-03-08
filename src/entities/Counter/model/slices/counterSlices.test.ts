import { CounterSchema } from '../types/counterSchema';
import { counterReducer, counterActions } from 'entities/Counter';

const state: CounterSchema = {
	value: 20,
	isLazyModal: true
};

describe('counterSlices.test', () => {
	test('should increment counter', () => {
		expect(counterReducer(state, counterActions.increment())).toEqual({ value: 21, isLazyModal: true });
	});

	test('should decrement counter', () => {
		expect(counterReducer(state, counterActions.decrement())).toEqual({ value: 19, isLazyModal: true });
	});

	test('should amount counter', () => {
		expect(counterReducer(state, counterActions.incrementByAmount(5))).toEqual({ value: 25, isLazyModal: true });
	});

	test('if state is undefined', () => {
		expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1, isLazyModal: false });
	});
});
