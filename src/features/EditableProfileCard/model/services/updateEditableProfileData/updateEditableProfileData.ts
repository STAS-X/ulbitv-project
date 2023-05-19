import { validateEditableProfileData } from '../validateEditableProfile/validateEditableProfile';
import { ProfileData } from 'features/EditableProfileCard';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from 'shared/types/thunk/thunkAction';
import { getEditableProfileFormData } from '../../selectors/getEditableProfile/getEditableProfileData';

// export interface ProfileDataProps {
// 	username: string;
// 	password: string;
// }

// First, create the thunk
export const updateEditableProfileData = createAppAsyncThunk<ProfileData>(
	'profile/updateEditableProfileData',
	async (_, thunkApi) => {
		const { extra, rejectWithValue, getState } = thunkApi;

		try {
			console.log('start update profile...');
			const formData = getEditableProfileFormData(getState()) as ProfileData;
			//console.log(formData, extra.api, 'get formData');

			const validateError = validateEditableProfileData(formData);
			if (validateError) throw new Error(JSON.stringify(validateError));

			if (!formData?.id) {
				throw new Error('error occured with profileId');
			}

			const response = await extra.api.put<ProfileData>(`/profiles/${formData.id}`, formData);

			if (!response.data) {
				throw new Error('error occured');
			}
			//throw new Error('network error occured');

			return response.data;
		} catch (e: ThunkError) {
			console.log(e.message, 'Внимание, во время запроса возникла ошибка');
			//if (!e.response || !e.message) throw e;
			return rejectWithValue(getErrorMessage(e));
		}
	}
);
