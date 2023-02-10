import { BuildEnv, BuildOptions } from './config/build/types/config';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export default (env: BuildEnv) => {
    const mode = env.mode ||'development';
    const isDev = mode == 'development';
    const PORT = env.port || 3000;

	const options: BuildOptions = {
		mode,
		paths: {
			entry: path.resolve(__dirname, 'src', 'index.tsx'),
			build: path.resolve(__dirname, 'build'),
			html: path.resolve(__dirname, 'public', 'index.html'),
		},
		isDev,
		port: PORT,
	};

    return options;
};
