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
			files: ['*.scss', '**/*.scss'],
			customSyntax: 'postcss-scss'
		}
	]
};
