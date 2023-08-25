// eslint-disable-next-line stas-eslint-plugin/import-public-api
import { ArticleSchema } from '@/entities/Article/model/types/articleSchema';
import { rtkApi } from '@/shared/api/rtkApi';

const recommendationsApi = rtkApi.injectEndpoints({
	endpoints: (builder) => ({
		getRecommendationByArticle: builder.query<ArticleSchema[], number>({
			query: (limit) => ({
				url: '/articles',
				params: {
					_limit: limit,
					_expand: 'user'
				}
			})
		})
	}),
	overrideExisting: true
});

export const { useGetRecommendationByArticleQuery } = recommendationsApi;
