import { ArticleDetailesCommentsSchema } from './ArticleDetailesCommentsSchema';
import { ArticleDetailesRecommendedSchema } from './ArticleDetailesRecommendedSchema';

export interface ArticleDetailesPageSchema {
	comments: ArticleDetailesCommentsSchema;
	recommendations: ArticleDetailesRecommendedSchema;
}
