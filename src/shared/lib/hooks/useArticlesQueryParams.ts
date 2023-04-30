import { useSelector } from 'react-redux';
import { OptionalRecord } from './../url/queryParams/addQueryParams';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArticlesPageInited } from 'pages/ArticlesPage';

export const useArticlesParams = () => {
	const [searchParams] = useSearchParams();
	const [queryParams, setQueryParams] = useState<OptionalRecord | null>(null);

	const inited = useSelector(getArticlesPageInited);

	// const currentParams = useMemo(() => {
	// 	return { field, order, filter, category: Array.isArray(category) ? category.join(',') : '' };
	// }, [field, order, filter, category]);

	useEffect(() => {
		if (!inited) {
			const allParams: OptionalRecord = {};
			searchParams.forEach((value, key) => {
				//console.log(key, value, 'get params query data');
				allParams[key] = value;
			});

			//addQueryParams(allParams);
			setQueryParams(allParams);
		}
	}, [setQueryParams, searchParams, inited]);

	return { queryParams };
};
