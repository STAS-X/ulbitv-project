import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_LS_KEY } from '../const/localstorage';

// Define a service using a base URL and expected endpoints
export const rtkApi = createApi({
	reducerPath: 'rtkApi',
	baseQuery: fetchBaseQuery({
		baseUrl: _BASE_URL_,
		prepareHeaders: (headers) => {
			const token = localStorage.getItem(USER_LS_KEY) || '';
			if (token) headers.set('authorization', token);
			return headers;
		}
	}),
	endpoints: (builder) => ({})
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
/*export const { useGetPokemonByNameQuery } = rtkApi;*/
