import { getCommon, getCommonValue } from './getCommon';
import { StateSchema } from 'app/providers/StoreProvider';

describe('getCounter', () => {
	test('should return counter state', () => {
		const state: DeepPartial<StateSchema> = {
			common: { value: 10 }
		};
		expect(getCommon(state as StateSchema)).toEqual({ value: 10 });
	});

	test('should return counter value', () => {
		const state: DeepPartial<StateSchema> = {
			common: { value: 15 }
		};
		expect(getCommonValue(state as StateSchema)).toEqual(15);
	});
});
