import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	plugins: [svgr({ exportAsDefault: true }), react()],
	resolve: {
		alias: [
			{
				find: '@',
				replacement: '/src'
			}
		]
	},
	define: {
		_DEV_MODE_: JSON.stringify(true),
		_BASE_URL_: JSON.stringify('http://localhost:8000'),
		_PROJECT_: JSON.stringify('frontend')
	}
});
