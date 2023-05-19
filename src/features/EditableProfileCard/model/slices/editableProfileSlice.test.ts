import { fetchEditableProfileData } from '../services/fetchEditableProfileData/fetchEditableProfileData';
import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency/model/types/currency';
import { editableProfileActions, editableProfileReducer } from './editableProfileSlices';
import { ProfileSchema } from 'features/EditableProfileCard';
describe('loginSlice.test', () => {
	const initialState: DeepPartial<ProfileSchema> = {
		data: {
			first: 'Станислав',
			lastname: '-XXX-',
			age: 32,
			currency: Currency.RUB,
			country: Country.Russia,
			city: 'Moscow',
			username: 'admin',
			avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg'
		},
		readonly: true,
		error: '',
		isLoading: false,
		validateError: undefined
	};
	test('test set readonly', () => {
		expect(
			editableProfileReducer(initialState as ProfileSchema, editableProfileActions.setProfileReadOnly(false)).readonly
		).toBe(false);
	});
	test('test save profile', () => {
		expect(
			editableProfileReducer(
				initialState as ProfileSchema,
				editableProfileActions.saveProfile({ ...initialState.data, first: '-XYZ-' })
			).data?.first
		).toBe('-XYZ-');
	});
	test('test update profile', () => {
		expect(
			editableProfileReducer(
				initialState as ProfileSchema,
				editableProfileActions.updateProfile({ ...initialState.data })
			).formData
		).toEqual(initialState.data);
	});

	test('test for extrareducers pending', () => {
		const pendingAction = { type: fetchEditableProfileData.pending.type };
		const state = editableProfileReducer(initialState as ProfileSchema, pendingAction);
		expect({ readonly: state.readonly, error: state.error, isLoading: state.isLoading }).toEqual({
			error: undefined,
			isLoading: true,
			readonly: true
		});
	});

	test('test for extrareducers fulfilled', () => {
		const fulfilledAction = { type: fetchEditableProfileData.fulfilled.type, payload: initialState.data };
		const state = editableProfileReducer(initialState as ProfileSchema, fulfilledAction);
		expect({ data: state.data, isLoading: state.isLoading, error: state.error }).toEqual({
			data: initialState.data,
			isLoading: false,
			error: undefined
		});
	});

	test('test for extrareducers rejected', () => {
		const rejectAction = { type: fetchEditableProfileData.rejected.type, payload: 'error reject' };
		const state = editableProfileReducer(initialState as ProfileSchema, rejectAction);
		console.log(state, 'rejected');
		expect(state.error).toEqual('error reject');
	});
});
