import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { EditableProfileCard } from './EditableProfileCard';
import componentRender from 'shared/lib/tests/componentRender/componentRender';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { editableProfileReducer } from '../../';
import { $apiAxios } from 'shared/api/api';
//import { act } from 'react-dom/test-utils';

describe('features/EditableProfileCard', () => {
	const formData = {
		id: '1',
		username: 'admin',
		avatar: 'https://fake-server.com/avatar.jpg',
		age: 26,
		lastname: 'SUB',
		first: 'FIRST',
		city: 'Moskow',
		profileId: '1',
		country: Country.Russia,
		currency: Currency.USD
	};

	const initialState = {
		profile: {
			data: formData,
			formData: formData,
			isLoading: false,
			readonly: true,
			error: '',
			validationError: ''
		},
		user: {
			authData: {
				id: '1',
				username: 'admin',
				profileId: '1'
			},
			_loaded: true
		}
	};

	const asyncReducers = {
		profile: editableProfileReducer
	};

	beforeEach(async () => {
		await waitFor(() => componentRender(<EditableProfileCard id={'1'} />, { asyncReducers, initialState }));
	});

	test('EditableProfileCard render test', () => {
		expect(screen.getByTestId('ProfileCard')).toBeInTheDocument();
	});

	test('EditableProfileCard set editable and cancel to input values test', () => {
		const inputStub = 'QWERTY';

		const editableProfileCard = screen.getByTestId('ProfileCard');
		expect(editableProfileCard).toBeInTheDocument();
		const editBtn = screen.getByTestId('ProfileCard.EditBtn');
		expect(editBtn).toBeInTheDocument();

		fireEvent.click(editBtn);

		const cancelBtn = screen.getByTestId('ProfileCard.CancelBtn');
		expect(cancelBtn).toBeInTheDocument();
		const inputFirst = screen.getByTestId('ProfileCard.FirstName.Value');

		fireEvent.change(inputFirst, {
			target: {
				value: inputStub
			}
		});

		expect(inputFirst).toHaveValue(inputStub);

		fireEvent.click(cancelBtn);

		expect(inputFirst).toHaveValue(formData.first);
		expect(cancelBtn).not.toBeInTheDocument();
	});

	test('EditableProfileCard set error age value', () => {
		const inputStub = '-XXX-';

		const editableProfileCard = screen.getByTestId('ProfileCard');
		expect(editableProfileCard).toBeInTheDocument();
		const editBtn = screen.getByTestId('ProfileCard.EditBtn');
		expect(editBtn).toBeInTheDocument();

		fireEvent.click(editBtn);

		const cancelBtn = screen.getByTestId('ProfileCard.CancelBtn');
		expect(cancelBtn).toBeInTheDocument();
		const inputAge = screen.getByTestId('ProfileCard.Age.Value');
		expect(inputAge).toBeInTheDocument();

		fireEvent.change(inputAge, {
			target: {
				value: inputStub
			}
		});

		const inputAgeErrorMessage = screen.getByTestId('ProfileCard.Age.Validation.Message');
		expect(inputAgeErrorMessage).toBeInTheDocument();
		expect(inputAgeErrorMessage.textContent).not.toBeNull();

		fireEvent.click(cancelBtn);

		expect(screen.getByTestId('ProfileCard.EditBtn')).toBeInTheDocument();
		expect(cancelBtn).not.toBeInTheDocument();
	});

	test('EditableProfileCard set new value to firstname and lastname', () => {
		const mockApi = jest.spyOn($apiAxios, 'put');
		const inputStub = '-XXX-';

		const editableProfileCard = screen.getByTestId('ProfileCard');
		expect(editableProfileCard).toBeInTheDocument();
		const editBtn = screen.getByTestId('ProfileCard.EditBtn');
		expect(editBtn).toBeInTheDocument();

		fireEvent.click(editBtn);

		const cancelBtn = screen.getByTestId('ProfileCard.CancelBtn');
		expect(cancelBtn).toBeInTheDocument();
		const saveBtn = screen.getByTestId('ProfileCard.SaveBtn');
		expect(saveBtn).toBeInTheDocument();
		const inputFirst = screen.getByTestId('ProfileCard.FirstName.Value');
		const inputLast = screen.getByTestId('ProfileCard.LastName.Value');
		expect(inputFirst).toBeInTheDocument();
		expect(inputLast).toBeInTheDocument();
		expect(saveBtn).toBeDisabled();

		fireEvent.change(inputFirst, {
			target: {
				value: inputStub
			}
		});
		fireEvent.change(inputLast, {
			target: {
				value: inputStub
			}
		});

		expect(inputFirst).toHaveValue(inputStub);
		expect(inputLast).toHaveValue(inputStub);
		expect(saveBtn).not.toBeDisabled();

		//const stubData = { data: { ...formData, lastname: inputStub, firstname: inputStub } };
		//const newData = mockApi.mockReturnValue(Promise.resolve({ data: stubData }));
		fireEvent.click(saveBtn);

		expect(cancelBtn).not.toBeInTheDocument();
		expect(cancelBtn).not.toBeInTheDocument();
		expect(screen.getByTestId('ProfileCard.EditBtn')).toBeInTheDocument();
		expect(mockApi).toHaveBeenCalled();
		expect(mockApi).toHaveBeenCalledWith(`/profiles/${formData.id}`, {
			...formData,
			first: inputStub,
			lastname: inputStub
		});
		//console.log(await mockApi.mock.results[0].value, 'get mock results');

		mockApi.mockReset();
		mockApi.mockRestore();
	});
});
