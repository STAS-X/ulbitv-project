import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { BuildOptions } from './types/config';

export function buildPlugins(
	options: BuildOptions
): webpack.WebpackPluginInstance[] {
	const { paths, isDev } = options;

	return [
		new HTMLWebpackPlugin({
			template: paths.html,
		}),
		new webpack.ProgressPlugin(),
		new webpack.DefinePlugin({
			_DEV_MODE_: JSON.stringify(options.isDev),
			'process.env': {
				NODE_PORT: JSON.stringify(options.port),
			},
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[chunkhash:8].css',
		}),
		new BundleAnalyzerPlugin({ openAnalyzer: false }),
		isDev
			? new ReactRefreshWebpackPlugin({ overlay: false })
			: new webpack.HotModuleReplacementPlugin(),
	];
}
