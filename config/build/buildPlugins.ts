/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins(options: BuildOptions): webpack.WebpackPluginInstance[] {
	const { paths, isDev, port, project, apiURL } = options;

	const plugins = [
		new HTMLWebpackPlugin({
			template: paths.html
		}),
		new webpack.ProgressPlugin(),
		new webpack.DefinePlugin({
			_DEV_MODE_: JSON.stringify(isDev),
			_BASE_URL_: JSON.stringify(apiURL),
			_PROJECT_: JSON.stringify(project),
			'process.env': {
				NODE_PORT: JSON.stringify(port)
			}
		}),

		new CircularDependencyPlugin({
			exclude: /node-modules/,
			failOnError: true
		}),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				diagnosticOptions: {
					semantic: true,
					syntactic: true
				},
				mode: 'write-references'
			}
		}),

		new webpack.HotModuleReplacementPlugin()
	];
	if (isDev)
		plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }), new ReactRefreshWebpackPlugin({ overlay: false }));
	else
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[chunkhash:8].css'
			}),
			new CopyPlugin({
				patterns: [
					{ from: paths.locales, to: paths.buildLocales },
					{ from: paths.assets, to: paths.buildAssets }
				]
			})
		);

	return plugins;
}
