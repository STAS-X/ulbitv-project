import { BuildEnv } from './config/build/types/config';
import webpack from 'webpack';
import options from './options';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';

export default (env:BuildEnv)=>{
	const config: webpack.Configuration = buildWebpackConfig(options(env));

	return config;
};