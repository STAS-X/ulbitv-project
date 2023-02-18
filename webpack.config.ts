import webpack from 'webpack';
import { BuildEnv } from './config/build/types/config';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import options from './options';

export default (env: BuildEnv) => {
	const config: webpack.Configuration = buildWebpackConfig(options(env));

	return config;
};
