import babelRemoveTestPropsPlugin, { removeProps } from '../../babel/babelRemoveTestPropsPlugin';
import { BuildOptions } from './../types/config';

interface BuildBabalLoaderProps extends BuildOptions {
	isTSX?: boolean;
}

export function buildBabelLoader(options: BuildBabalLoaderProps) {
	const { isDev, isTSX } = options;

	return {
		test: isTSX ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				cacheDirectory: true,
				presets: ['@babel/preset-env'],
				plugins: [
					[
						'i18next-extract',
						{
							locales: ['ru', 'en'],
							nsSeparator: '~',
							keyAsDefaultValue: 'true'
						}
					],
					['@babel/plugin-transform-typescript', { isTSX }],
					'@babel/plugin-transform-runtime',
					isTSX && [babelRemoveTestPropsPlugin, { props: removeProps }],
					isDev && require.resolve('react-refresh/babel')
				].filter(Boolean)
			}
		}
	};
}
