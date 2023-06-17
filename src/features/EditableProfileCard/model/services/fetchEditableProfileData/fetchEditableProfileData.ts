import { ProfileData } from '@/entities/Profile';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from '@/shared/types/thunk/thunkAction';

// export interface ProfileDataProps {
// 	username: string;
// 	password: string;
// }

export interface ProfileByIdProps {
	profileId?: string;
}

// First, create the thunk
export const fetchEditableProfileData = createAppAsyncThunk<ProfileData, ProfileByIdProps>(
	'profile/fetchEditableProfileData',
	async (props, thunkApi) => {
		const { profileId } = props;
		const { extra, rejectWithValue } = thunkApi;

		if (!profileId) return rejectWithValue('profileNotFound');

		try {
			console.log('start fetchibg profile...');
			const response = await extra.api.get<ProfileData>(`/profiles/${profileId}`);

			console.log(response.data, 'get data from profiles');
			if (!response.data) {
				throw new Error('profileNotFound');
			}
			//throw new Error('network error occured');

			return response.data;
		} catch (e: ThunkError) {
			//console.log(e.message, 'Внимание, во время запроса возникла ошибка');
			if (e.response?.status === 404) return rejectWithValue('profileNotFound');
			//if (!e.response || !e.message) throw e;
			return rejectWithValue(getErrorMessage(e));
		}
	}
);
