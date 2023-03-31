module.exports = {
	extends: ['stylelint-config-standard-scss'],
	plugins: ['stylelint-scss'],
	rules: {
		indentation: ['tab'],
		'string-quotes': 'single',
		'selector-class-pattern': null
	},
	overrides: [
		{
			files: ['*.scss', 'src/*.scss'],
			customSyntax: 'postcss-scss'
		}
	]
};
