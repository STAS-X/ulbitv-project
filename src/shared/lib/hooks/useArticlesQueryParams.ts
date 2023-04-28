import { useSelector } from 'react-redux';
import { addQueryParams } from 'shared/lib/url/queryParams/addQueryParams';
import { OptionalRecord } from './../url/queryParams/addQueryParams';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import {
	getArticlesPageFilter,
	getArticlesPageSortOrder,
	getArticlesPageSortField,
	getArticlesPageCategory
} from 'pages/ArticlesPage';

export const useArticlesParams = (inited: boolean) => {
	const [searchParams] = useSearchParams();
	const [queryParams, setQueryParams] = useState<OptionalRecord | null>(null);

	const filter = useSelector(getArticlesPageFilter);
	const field = useSelector(getArticlesPageSortField);
	const order = useSelector(getArticlesPageSortOrder);
	const category = useSelector(getArticlesPageCategory);
	console.log(category, 'new category');
	const currentParams = useMemo(() => {
		return { field, order, filter, category: category.join(',') };
	}, [field, order, filter, category]);

	useEffect(() => {
		if (!inited) {
			const allParams: OptionalRecord = {};
			searchParams.forEach((value, key) => {
				//console.log(key, value, 'get params query data');
				allParams[key] = value;
			});

			addQueryParams(allParams);
			setQueryParams({ ...currentParams, ...allParams });
		}
	}, [setQueryParams, currentParams, searchParams, inited]);

	return { queryParams };
};
