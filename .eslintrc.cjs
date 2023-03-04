module.exports = {
	env: {
		browser: true,
		es2022: true,
		jest: true
	},
	plugins: ['react', '@typescript-eslint', 'prettier', 'i18next'],
	extends: [
		'plugin:react/recommended',
		'plugin:import/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:react-hooks/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['tsconfig.json'],
		requireConfigFile: false,
		tsconfigRootDir: __dirname,
		sourceType: 'module',
		ecmaVersion: 'latest'
	},
	root: true,
	rules: {
		'prettier/prettier': 2, // Means error
		indent: [
			2,
			'tab',
			{
				SwitchCase: 1,
				VariableDeclarator: 1
			}
		],
		'react/jsx-indent': [
			2,
			'tab',
			{
				checkAttributes: false,
				indentLogicalExpressions: true
			}
		],
		'react/jsx-indent-props': [2, 'tab'],
		'@typescript-eslint/dot-notation': 'warn',
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: ['.js', '.jsx', '.tsx']
			}
		],
		quotes: ['error', 'single'],
		'no-tabs': 0,
		'linebreak-style': 0,
		'prettier/prettier': [
			'error',
			{
				usePrettierrc: true
			}
		],
		'import/no-unresolved': 'off',
		'import/extensions': 'off',
		'import/named': 'off',
		'no-underscore-dangle': 'off',
		'import/prefer-default-export': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-unused-vars': 'warn',
		'react/require-default-props': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/display-name': 'off',
		'react/jsx-props-no-spreading': 'warn',
		'react/no-array-index-key': 'off',
		'react/function-component-definition': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/require-await': 'warn',
		'@typescript-eslint/no-unsafe-call': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'warn',
		'@typescript-eslint/no-unsafe-argument': 'warn',
		'@typescript-eslint/no-floating-promises': 'warn',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'comma-dangle': ['error', 'only-multiline'],
		'no-shadow': 'off',
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true
			}
		],
		'i18next/no-literal-string': [
			'warn',
			{
				markupOnly: true
			}
		]
	},
	globals: {
		_DEV_MODE_: true
	},
	overrides: [
		{
			files: ['**/src/**/*.{test, stories.{ts,tsx}'],
			rules: { 'i18next/no-literal-string': 'off', indent: 'off', 'max-len': 'off' }
		},
		{
			files: ['**/src/**/*.{ts,tsx}'],
			rules: { indent: 'off' }
		}
	]
};
