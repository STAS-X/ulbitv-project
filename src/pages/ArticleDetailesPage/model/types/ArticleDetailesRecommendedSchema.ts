import { ArticleSchema } from '@/entities/Article/model/types/articleSchema';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticleDetailesRecommendedSchema extends EntityState<ArticleSchema> {
	isLoading?: boolean;
	error?: string;
}
