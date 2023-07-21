//import { fileURLToPath } from 'url';
import path from 'path';
import { BuildEnv, BuildMode, BuildOptions } from './config/build/types/config';

//const __filename = fileURLToPath(import.meta.url);
//export const __dirname = path.dirname(__filename);
const getApiURL = (mode: BuildMode, apiURL?: string): string => {
	if (apiURL) return apiURL;
	switch (mode) {
		case 'production':
			return '/api';
		default:
			return 'http://localhost:8000';
	}
}

export default (env: BuildEnv) => {
	const mode = env?.mode || 'development';
	const isDev = mode === 'development';
	const isTest = env?.isTest || Boolean(process.env?.isTest);
	const apiURL = getApiURL(mode, env?.apiURL);
	const PORT = env?.port || 3000;
	const PROJECT = isTest ? 'cypress' : 'frontend';

	//console.log(env, process.env, 'get envariable data');

	const options: BuildOptions = {
		mode,
		paths: {
			entry: path.resolve(__dirname, 'src', 'index.tsx'),
			build: path.resolve(__dirname, 'build'),
			html: path.resolve(__dirname, 'public', 'index.html'),
			src: path.resolve(__dirname, 'src'),
			locales: path.resolve(__dirname, 'public', 'locales'),
			buildLocales: path.resolve(__dirname, 'build', 'locales'),
			assets: path.resolve(__dirname, 'src', 'shared', 'assets'),
			buildAssets: path.resolve(__dirname, 'build', 'assets')
		},
		isDev,
		isTest,
		apiURL,
		port: PORT,
		project: PROJECT
	};
	//console.log(env,'init options');

	return options;
};
