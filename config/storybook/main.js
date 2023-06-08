export const stories = ['../../src/**/*.stories.@(js|jsx|ts|tsx)'];
export const addons = [
	'@storybook/addon-links',
	'@storybook/addon-essentials',
	'@storybook/addon-interactions',
	'storybook-addon-mock'
	//'@storybook/addon-contexts'
	//'storycap',
	//'zisui/register',
];
export const staticDirs = ['../../src/shared/assets/images'];
export const framework = {
	name: '@storybook/react-webpack5',
	options: { lazyCompilation: true }
};
export const features = { storyStoreV7: true, argTypeTargetsV7: false, legacyDecoratorFileOrder: true };
export const core = {
	builder: 'webpack5'
};
// export async function webpackFinal(config) {
// 	config.resolve.alias['@'] = resolve(__dirname, '../src');
// 	return config;
// }
