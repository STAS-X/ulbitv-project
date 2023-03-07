import { CounterSchema } from '../types/counterSchema';
import { counterReducer, counterActions } from 'entities/Counter';
describe('counterSlices.test', () => {
	test('should increment counter', () => {
		const state: CounterSchema = {
			value: 20,
			isLazyModal: true
		};
		expect(counterReducer(state, counterActions.increment())).toEqual({ value: 21 });
	});

	test('should decrement counter', () => {
		const state: CounterSchema = {
			value: 20,
			isLazyModal: true
		};
		expect(counterReducer(state, counterActions.decrement())).toEqual({ value: 19 });
	});

	test('should amount counter', () => {
		const state: CounterSchema = {
			value: 20,
			isLazyModal: true
		};
		expect(counterReducer(state, counterActions.incrementByAmount(5))).toEqual({ value: 25 });
	});

	test('if state is undefined', () => {
		expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 });
	});
});
