import { JSONSettings } from '@/shared/lib/settings/jsonSettings';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from '@/shared/types/thunk/thunkAction';
import { getUserData } from '../selectors/getUser/getUser';
import { getJSONSettingQuery } from '../../api/userApi';

// First, create the thunk
export const getJSONSettingByKey = createAppAsyncThunk<Partial<JSONSettings>, keyof JSONSettings>(
	'user/getJSONSettingByKey',
	async (key, thunkApi) => {
		const { extra, getState, dispatch, rejectWithValue } = thunkApi;

		const userData = getUserData(getState());

		if (!userData) return rejectWithValue('userNotFound');

		try {
			const response = await dispatch(
				getJSONSettingQuery({
					userId: userData.id
				})
			).unwrap();

			if (!response?.jsonSettings) {
				throw new Error('settingsNotFound');
			}
			//throw new Error('network error occured');

			return { [key]: response.jsonSettings[key] } as Partial<JSONSettings>;
		} catch (e: ThunkError) {
			if (e.response?.status === 404) return rejectWithValue('articleNotFound');
			//if (!e.response || !e.message) throw e;
			return rejectWithValue(getErrorMessage(e));
		}
	}
);
