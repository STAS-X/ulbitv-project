import webpack, { RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
	const paths: BuildPaths = {
		build: '',
		html: '',
		entry: '',
		src: path.resolve(__dirname, '..', '..', 'src')
	};
	config.resolve!.modules!.push(paths.src);
	config.resolve!.extensions!.push('.ts', '.tsx');

	config.plugins!.push(
		new webpack.DefinePlugin({
			_DEV_MODE_: JSON.stringify(true),
			_BASE_URL_: JSON.stringify(''),
			_PROJECT_: JSON.stringify('storybook')
			// 		MODE: JSON.stringify(true),
		})
	);

	// eslint-disable-next-line no-param-reassign
	if (config.module!.rules)
		config.module!.rules = config.module!.rules.map((rule) => {
			if (/svg/.test((rule as RuleSetRule).test as string)) {
				return { ...(rule as RuleSetRule), exclude: /\.svg$/i };
			}

			return rule;
		});

	config.module!.rules!.push({
		test: /\.svg$/,
		use: ['@svgr/webpack']
	});

	config.module!.rules!.push({
		test: /\.(png|jpe?g|gif|woff|woff2)$/i,
		use: [{ loader: 'file-loader' }]
	});

	config.module!.rules!.push(buildCssLoader(true));
	config.performance = { ...config.performance, hints: false };

	return config;
};
