import {
	getArticlesPageSortOrder,
	getArticlesPageSortField
} from './../../../pages/ArticlesPage/model/selectors/getArticlesPageData';
import { useSelector } from 'react-redux';
import { addQueryParams } from 'shared/lib/url/queryParams/addQueryParams';
import { OptionalRecord } from './../url/queryParams/addQueryParams';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { getArticlesPageFilter } from 'pages/ArticlesPage';

export const useArticlesParams = (inited: boolean) => {
	const [searchParams] = useSearchParams();
	const [queryParams, setQueryParams] = useState<OptionalRecord | null>(null);

	const filter = useSelector(getArticlesPageFilter);
	const field = useSelector(getArticlesPageSortField);
	const order = useSelector(getArticlesPageSortOrder);
	const currentParams = useMemo(() => {
		return { field, order, filter };
	}, [field, order, filter]);

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
