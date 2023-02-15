import { BuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	};

	const cssLoaders = {
		test: /\.(s[ac]|c)ss$/i,
		use: [
			// Creates `style` nodes from JS strings
			options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			// Translates CSS into CommonJS
			{
				loader: 'css-loader',
				options: {
					modules: {
						auto: (resPath: string) => {
							return Boolean(resPath.includes('.module.'));
						},
						localIdentName: options.isDev
							? '[path].[name]__[local]'
							: '[hash:base64:8]',
					},
				},
			},
			// Compiles Sass to CSS
			'sass-loader',
		],
	};

	const babelLoaders = {
		test: /\.(js|jsx|tsx)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env'],
				plugins: [
					[
						'i18next-extract',
						{
							locales: ['ru', 'en'],
							nsSeparator: '~',
							keyAsDefaultValue: 'true',
						},
					],
				],
			},
		},
	};

	const typescriptLoaders = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	};

	const fileLoader = {
		test: /\.(png|jpe?g|gif|woff|woff2)$/i,
		use: [{ loader: 'file-loader' }],
	};

	return [svgLoader, fileLoader, babelLoaders, typescriptLoaders, cssLoaders];
}
