import { FeatureFlags } from '@/shared/lib/features/featureFlag';
import { UserData, userActions } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';


interface UserFeaturesArgs {
	id: string,
	features: Partial<FeatureFlags>

}

const userFeaturesApi = rtkApi.injectEndpoints({
	endpoints: (builder) => ({
		updateUserFeatures: builder.mutation<UserData, UserFeaturesArgs>({
			query: ({ id, ...features }) => ({
				url: `/users/${id}`,
				method: 'PATCH',
				body: features
			}),
			async onQueryStarted(id, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					if (data?.features) dispatch(userActions.setFeaturesData(data.features));
				} catch (error) {
					console.log(error, 'error occured');
				}
			}
		})
	}),
	overrideExisting: true
});

export const updateUserFeatures = userFeaturesApi.endpoints.updateUserFeatures.initiate;
export const { useUpdateUserFeaturesMutation } =
	userFeaturesApi;