export type BuildMode = 'production' | 'development';
export type ProjectMode = 'storybook' | 'frontend' | 'jest' | 'cypress';

export interface BuildPaths {
	entry: string;
	build: string;
	html: string;
	src: string;
	locales: string;
	buildLocales: string;
	assets: string;
	buildAssets: string;
}

export interface BuildEnv {
	mode: BuildMode;
	port: number;
	apiURL: string;
	isTest: boolean;
}

export interface BuildOptions extends BuildEnv {
	paths: BuildPaths;
	isDev: boolean;
	project: ProjectMode;
}
