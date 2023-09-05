import { JSONSettings } from '@/shared/lib/settings/jsonSettings';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from '@/shared/types/thunk/thunkAction';
import { getUserId } from '../selectors/getUser/getUser';
import { getJSONSettingQuery } from '../../api/userApi';
import { getSettingsByUser } from '../selectors/getSettings/getJSONSettings';

// First, create the thunk
export const getJSONSettingByKey = createAppAsyncThunk<Partial<JSONSettings>, keyof JSONSettings>(
	'user/getJSONSettingByKey',
	async (key, thunkApi) => {
		const { extra, getState, dispatch, rejectWithValue } = thunkApi;

		const userId = getUserId(getState());
		const currentSettings = getSettingsByUser(getState());

		if (!userId) return rejectWithValue('userNotFound');

		try {
			const response = await dispatch(
				getJSONSettingQuery({
					userId
				})
			).unwrap();

			if (!response?.jsonSettings) {
				throw new Error('settingsNotFound');
			}
			//throw new Error('network error occured');

			return { ...currentSettings, [key]: response.jsonSettings[key] } as Partial<JSONSettings>;
		} catch (e: ThunkError) {
			if (e.response?.status === 404) return rejectWithValue('settingNotFound');
			//if (!e.response || !e.message) throw e;
			return rejectWithValue(getErrorMessage(e));
		}
	}
);
