import { FeatureFlags } from '@/shared/lib/features/featureFlag';
import { getUserData, UserData } from '@/entities/User';
import { createAppAsyncThunk, getErrorMessage, ThunkError } from '@/shared/types/thunk/thunkAction';
import { updateUserFeatures } from '../../api/userFeaturesApi';

interface UpdateFeaturesByUserId {
	id: string,
	features: Partial<FeatureFlags>

}

export const updateFeaturesByUserId = createAppAsyncThunk<UserData | undefined, UpdateFeaturesByUserId>('users/updateFeaturesByUserId', async (props, thunkApi) => {

	const { id, features } = props
	const { rejectWithValue, dispatch, getState } = thunkApi;

	const userData = getUserData(getState());

	console.log(userData, 'start thunk');

	if (!userData) return;

	try {
		const response = await dispatch(updateUserFeatures({ id, features: { ...userData.features, ...features } })).unwrap();
		console.log(response, 'get response');
		if (!response) {
			throw new Error('error occured');
		}

		// dispatch(articlesPageActions.setHasMore(Boolean(response.data.length === limit)));
		// if (response.data.length > 0) {
		// 	dispatch(articlesPageActions.setPage(page));
		// 	if (response.headers['x-total-count']) {
		// 		//const currentArtilces = count + response.data.length;
		// 		const total = Number(response.headers['x-total-count']);
		// 		dispatch(articlesPageActions.setTotal(total));
		// 	}
		// 	//console.log(currentArtilces, total, Boolean(currentArtilces < total), 'data from thunk');
		// }
		//throw new Error('network error occured');
		// const commentsData = response.data.map((commentExt) => {
		// 	const {
		// 		id: commentId,
		// 		text,
		// 		user: { id: userId, username, avatar }
		// 	} = commentExt;
		// 	return { id: commentId, text, user: { id: userId, username, avatar } };
		// });

		return response;
	} catch (e: ThunkError) {
		console.log(e.message, 'Внимание, во время запроса возникла ошибка');
		//if (!e.response || !e.message) throw e;
		return rejectWithValue(getErrorMessage(e));
	}
});
