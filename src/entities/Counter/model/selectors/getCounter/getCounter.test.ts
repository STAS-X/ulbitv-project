import { getCounter, getCounterValue } from './getCounter';
import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

describe('getCounter', () => {
	test('should return counter state', () => {
		const state: DeepPartial<StateSchema> = {
			counter: { value: 10 }
		};
		expect(getCounter(state as StateSchema)).toEqual({ value: 10 });
	});

	test('should return counter value', () => {
		const state: DeepPartial<StateSchema> = {
			counter: { value: 15 }
		};
		expect(getCounterValue(state as StateSchema)).toEqual(15);
	});
});
