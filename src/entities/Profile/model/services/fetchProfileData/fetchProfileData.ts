import { ProfileData } from './../../types/profileSchema';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from 'shared/types/thunk/thunkAction';

// export interface ProfileDataProps {
// 	username: string;
// 	password: string;
// }

// First, create the thunk
export const fetchProfileData = createAppAsyncThunk<ProfileData>('profile/fetchProfileData', async (_, thunkApi) => {
	const { extra, rejectWithValue } = thunkApi;

	try {
		console.log('start fetchibg profile...');
		const response = await extra.api.get<ProfileData>('/profile');

		if (!response.data) {
			throw new Error('error');
		}
		//throw new Error('network error occured');

		return response.data;
	} catch (e: ThunkError) {
		console.log(e.message, 'Внимание, во время запроса возникла ошибка');
		//if (!e.response || !e.message) throw e;
		return rejectWithValue(getErrorMessage(e));
	}
});
