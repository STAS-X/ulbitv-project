export type BuildMode = 'production' | 'development';
export type ProjectMode = 'storybook' | 'frontend' | 'jest';

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
}

export interface BuildOptions extends BuildEnv {
	paths: BuildPaths;
	isDev: boolean;
	project: ProjectMode;
}
