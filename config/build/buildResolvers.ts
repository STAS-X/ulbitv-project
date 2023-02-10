import { ResolveOptions } from "webpack";

export function buildResolvers(): ResolveOptions {
    return {
			modules: ['.', 'node_modules'],
			extensions: ['.tsx', '.ts', '.js'],
		};
}