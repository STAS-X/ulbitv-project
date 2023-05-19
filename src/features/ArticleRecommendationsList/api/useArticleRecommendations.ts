import { ArticleSchema } from 'entities/Article';
import { rtkApi } from 'shared/api/rtkApi';

const recommendationsApi = rtkApi.injectEndpoints({
	endpoints: (builder) => ({
		getRecommendationByArticle: builder.query<ArticleSchema[], number>({
			query: (limit) => ({
				url: '/articles',
				params: {
					_limit: limit
				}
			})
		})
	}),
	overrideExisting: true
});

export const { useGetRecommendationByArticleQuery } = recommendationsApi;
