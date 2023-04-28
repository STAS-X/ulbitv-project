import { getQueryParams } from './addQueryParams';

describe('addQueryParams.test', () => {
	test('test with one param', () => {
		const params = getQueryParams({ test: '123' });
		expect(params).toEqual('?test=123');
	});

	test('test with three params', () => {
		const params = getQueryParams({ test: '321', sort: 'title', order: 'asc' });
		expect(params).toEqual('?test=321&sort=title&order=asc');
	});

	test('test without undefined', () => {
		const params = getQueryParams({ test: '111', q: undefined });
		expect(params).toEqual('?test=111');
	});
});
