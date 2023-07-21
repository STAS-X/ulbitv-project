import webpack from 'webpack';
import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
	const { isDev, project } = options;
	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack']
	};
	const isTest = project !== 'frontend';

	const cssLoaders = buildCssLoader(isDev);

	const codeBabelLoaders = buildBabelLoader({ ...options, isTSX: false, isTest });
	const tsxBabelLoaders = buildBabelLoader({ ...options, isTSX: true, isTest });

	// const typescriptLoaders = {
	// 	test: /\.tsx?$/,
	// 	use: 'ts-loader',
	// 	exclude: /node_modules/
	// };

	const fileLoader = {
		test: /\.(png|jpe?g|gif|woff|woff2)$/i,
		use: [
			{
				loader: 'file-loader'
			}
		]
	};

	

	return [svgLoader, fileLoader, codeBabelLoaders, tsxBabelLoaders, cssLoaders];
}
