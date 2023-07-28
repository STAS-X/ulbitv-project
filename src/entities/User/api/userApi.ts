import { UserData } from '../model/types/userSchema';
import { JSONSettings } from '@/shared/lib/settings/jsonSettings';
import { rtkApi } from '@/shared/api/rtkApi';

interface SetJSONSettingArgs {
	userId: string;
	jsonSettings: JSONSettings;
}

const jsonSettingsApi = rtkApi.injectEndpoints({
	endpoints: (builder) => ({
		setJSONSettings: builder.mutation<UserData, SetJSONSettingArgs>({
			query: ({ userId, jsonSettings }) => ({
				url: `/users/${userId}`,
				method: 'PATCH',
				body: { jsonSettings }
			})
		}),
		getUserDataById: builder.query<UserData, { userId: string }>({
			query: ({ userId }) => ({
				url: `/users/${userId}`,
				method: 'GET'
			})
		}),		
		getJSONSettingByKey: builder.query<UserData, { userId: string }>({
			query: ({ userId }) => ({
				url: `/users/${userId}`,
				method: 'GET'
			})
		})
	}),
	overrideExisting: true
});

export const setJSONSettingsMutation = jsonSettingsApi.endpoints.setJSONSettings.initiate;
export const getJSONSettingQuery = jsonSettingsApi.endpoints.getJSONSettingByKey.initiate;
export const getUserDataById = jsonSettingsApi.endpoints.getUserDataById.initiate;
