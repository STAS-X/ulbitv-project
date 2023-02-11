import { BuildOptions } from './types/config';
import { ResolveOptions } from 'webpack';

export function buildResolvers(options: BuildOptions): ResolveOptions {
	const { paths } = options;

	return {
		modules: [paths.src, 'node_modules'],
		extensions: ['.tsx', '.ts', '.js'],
		preferAbsolute: true,
		mainFiles:['index'],
		alias: {}
	};
}
