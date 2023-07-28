import { JSONSettings } from '@/shared/lib/settings/jsonSettings';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from '@/shared/types/thunk/thunkAction';
import { getUserId } from '../selectors/getUser/getUser';
import { getSettingsByUser } from '../selectors/getSettings/getJSONSettings';
import { setJSONSettingsMutation } from '../../api/userApi';

// export interface ProfileDataProps {
// 	username: string;
// 	password: string;
// }

// First, create the thunk
export const saveJSONSettingsByUser = createAppAsyncThunk<JSONSettings, JSONSettings>(
	'user/saveSettingsByUserId',
	async (jsonSettings, thunkApi) => {
		const { extra, getState, dispatch, rejectWithValue } = thunkApi;

		const userId = getUserId(getState());
		const currentSettings = getSettingsByUser(getState());

		if (!jsonSettings) return rejectWithValue('settingsNotFound');
		if (!userId) return rejectWithValue('userNotFound');

		try {
			const response = await dispatch(
				setJSONSettingsMutation({
					userId,
					jsonSettings: {
						...currentSettings,
						...jsonSettings
					}
				})
			).unwrap();

			if (!response.jsonSettings) {
				throw new Error('settingsNotPatched');
			}
			//throw new Error('network error occured');

			return response.jsonSettings;
		} catch (e: ThunkError) {
			if (e.response?.status === 404) return rejectWithValue('settingsNotFound');
			//if (!e.response || !e.message) throw e;
			return rejectWithValue(getErrorMessage(e));
		}
	}
);
