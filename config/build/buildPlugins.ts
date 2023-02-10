import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { BuildOptions } from './types/config';

export function buildPlugins(
	options: BuildOptions
): webpack.WebpackPluginInstance[] {

	const { paths } = options;

	return [
		new HTMLWebpackPlugin({
			template: paths.html,
		}),
		new webpack.ProgressPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_MODE: JSON.stringify(options.mode),
				NODE_PORT: JSON.stringify(options.port),
			},
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[chunkhash:8].css',
		}),
	];
}
