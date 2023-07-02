export const ordersForSort = ['asc', 'desc'] as const;
export type SortOrder = (typeof ordersForSort)[number];
export const fieldsForSort = ['views', 'title', 'createdAt'] as const;
export type SortFields = (typeof fieldsForSort)[number];

export type ArticlesSort = { field: SortFields; order: SortOrder };
export type ArticlesSearch = string;
export enum ArticleView {
	LIST = 'LIST',
	TILE = 'TILE'
}
