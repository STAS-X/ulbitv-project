import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

export const getArticleRecommendedIsLoading = (state: StateSchema) =>
	state.articleDetailesPage?.recommendations?.isLoading;
export const getArticleRecommendedError = (state: StateSchema) => state.articleDetailesPage?.recommendations.error;
