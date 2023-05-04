//import { fileURLToPath } from 'url';
import path from 'path';
import { BuildEnv, BuildOptions } from './config/build/types/config';

//const __filename = fileURLToPath(import.meta.url);
//export const __dirname = path.dirname(__filename);

export default (env: BuildEnv) => {
	const mode = env.mode || 'development';
	const isDev = mode === 'development';
	const apiURL = env.apiURL || 'http://localhost:8000';
	const PORT = env.port || 3000;
	const PROJECT = 'frontend';

	const options: BuildOptions = {
		mode,
		paths: {
			entry: path.resolve(__dirname, 'src', 'index.tsx'),
			build: path.resolve(__dirname, 'build'),
			html: path.resolve(__dirname, 'public', 'index.html'),
			src: path.resolve(__dirname, 'src'),
			locales: path.resolve(__dirname, 'public', 'locales'),
			buildLocales: path.resolve(__dirname, 'build', 'locales')
		},
		isDev,
		apiURL,
		port: PORT,
		project: PROJECT
	};
	//console.log(env,'init options');

	return options;
};
