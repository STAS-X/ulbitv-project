import { ArticleSchema } from './articleSchema';
export interface ArticleDetailesSchema {
	isLoading: boolean;
	error?: string;
	data?: ArticleSchema;
}
