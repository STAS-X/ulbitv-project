import { FeedbackSchema } from '../model/types/articleFeedBackSchema';
import { rtkApi } from '@/shared/api/rtkApi';

interface ArticleFeedbackArgs {
	id: string;
	userId: string;
	articleId: string;
	feedback: string;
	rating: number;
}

const articleFeedBackApi = rtkApi.injectEndpoints({
	endpoints: (builder) => ({
		getArticleFeedBack: builder.query<FeedbackSchema[], Partial<ArticleFeedbackArgs>>({
			query: ({ userId, articleId }) => ({
				url: '/article-ratings',
				params: {
					userId,
					articleId
				}
			})
		}),
		addArticleFeedBack: builder.mutation<FeedbackSchema[], Partial<ArticleFeedbackArgs>>({
			query: ({ ...data }) => ({
				url: '/article-ratings',
				method: 'POST',
				body: data
			})
		}),
		updateArticleFeedBack: builder.mutation<FeedbackSchema[], Partial<ArticleFeedbackArgs>>({
			query: ({ id, ...data }) => ({
				url: `/article-ratings/${id ?? ''}`,
				method: 'PUT',
				body: data
			})
		})
	}),
	overrideExisting: true
});

export const { useGetArticleFeedBackQuery, useAddArticleFeedBackMutation, useUpdateArticleFeedBackMutation } =
	articleFeedBackApi;
