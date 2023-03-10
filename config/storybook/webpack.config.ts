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
	config.resolve.modules.push(paths.src);
	config.resolve.extensions.push('.ts', '.tsx');

	config.plugins.push(
		new webpack.DefinePlugin({
			_DEV_MODE_: JSON.stringify(true)
			// 		MODE: JSON.stringify(true),
		})
	);

	// eslint-disable-next-line no-param-reassign
	config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
		if (/svg/.test(rule.test as string)) {
			return { ...rule, exclude: /\.svg$/i };
		}

		return rule;
	});

	config.module.rules.push({
		test: /\.svg$/,
		use: ['@svgr/webpack']
	});
	config.module.rules.push(buildCssLoader(true));
	config.performance = { ...config.performance, hints: false };

	return config;
};
