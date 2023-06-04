module.exports = {
	stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'storybook-addon-mock'
		//'@storybook/addon-contexts'
		//'storycap',
		//'zisui/register',
	],
	staticDirs: ['../../src/shared/assets/images'],
	framework: {
		name: '@storybook/react-webpack5',
		options: { lazyCompilation: true }
	},
	features: { storyStoreV7: true, argTypeTargetsV7: false, legacyDecoratorFileOrder: true },
	core: {
		builder: 'webpack5'
	}
};
