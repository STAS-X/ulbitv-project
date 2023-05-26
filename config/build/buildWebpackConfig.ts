import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';

import { BuildOptions } from './types/config';

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
	const { paths, mode, isDev } = options;

	return {
		mode,
		entry: {
			main: paths.entry
		},
		stats: {
			children: true
		},
		output: {
			filename: '[name].[contenthash].js',
			path: paths.build,
			clean: true,
			publicPath: '/'
		},
		/* watchOptions: {
			aggregateTimeout: 600,
			ignored: /node_modules/
		}, */
		plugins: buildPlugins(options),
		module: {
			rules: buildLoaders(options)
		},
		resolve: buildResolvers(options),
		devtool: isDev ? 'inline-source-map' : undefined,
		performance: {
			hints: false
		},
		devServer: isDev ? buildDevServer(options) : undefined
	};
}
