import { validateProfileData } from './../validateProfile/validateProfile';
import { ProfileData } from '../../types/profileSchema';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from 'shared/types/thunk/thunkAction';
import { getProfileFormData } from '../../selectors/getProfile/getProfileData';

// export interface ProfileDataProps {
// 	username: string;
// 	password: string;
// }

// First, create the thunk
export const updateProfileData = createAppAsyncThunk<ProfileData>('profile/updateProfileData', async (_, thunkApi) => {
	const { extra, rejectWithValue, getState } = thunkApi;

	try {
		console.log('start update profile...');
		const formData = getProfileFormData(getState());
		//console.log(formData, extra.api, 'get formData');

		const validateError = validateProfileData(formData ?? {});
		if (validateError) throw new Error(JSON.stringify(validateError));

		const response = await extra.api.put<ProfileData>('/profile', formData);

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
});
