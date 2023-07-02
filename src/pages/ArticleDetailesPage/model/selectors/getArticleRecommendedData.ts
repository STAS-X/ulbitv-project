import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleRecommendedIsLoading = (state: StateSchema) =>
	state.articleDetailesPage?.recommendations?.isLoading;
export const getArticleRecommendedError = (state: StateSchema) => state.articleDetailesPage?.recommendations.error;
