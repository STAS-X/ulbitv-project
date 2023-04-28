export type OptionalRecord = Partial<Record<string, string>>;

export function getQueryParams(params: OptionalRecord) {
	const searchParams = new URLSearchParams(window.location.search);
	Object.entries(params).forEach(([name, value]) => {
		if (value !== undefined) searchParams.set(name, value.toString());
	});
	console.log(searchParams.toString(), 'new query params adding');
	return searchParams.getAll.length > 0 ? `?${searchParams.toString()}` : '';
}

/**
 * Функция добавления параметров строки
 * @param params
 */
export function addQueryParams(params: OptionalRecord) {
	window.history.pushState(null, '', getQueryParams(params));
}
