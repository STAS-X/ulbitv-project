import { ArticleSchema } from '@/entities/Article';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticleDetailesRecommendedSchema extends EntityState<ArticleSchema> {
	isLoading?: boolean;
	error?: string;
}
