module.exports = {
	stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-contexts/register'
		//'storycap',
		//'zisui/register',
	],
	staticDirs: ['../../src/shared/assets/images'],
	framework: '@storybook/react',
	core: {
		builder: 'webpack5'
	}
};
