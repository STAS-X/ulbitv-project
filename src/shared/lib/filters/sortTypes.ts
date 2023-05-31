export const ordersForSort = ['asc', 'desc'] as const;
export type SortOrder = (typeof ordersForSort)[number];
export const fieldsForSort = ['views', 'title', 'createdAt'] as const;
export type SortFields = (typeof fieldsForSort)[number];
