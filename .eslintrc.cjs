/* eslint-disable no-undef */
module.exports = {
	env: {
		browser: true,
		es2022: true,
	},
	plugins: ['react', '@typescript-eslint'],
	extends: [
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:react-hooks/recommended',
		'eslint:recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
		sourceType: 'module',
		ecmaVersion: 'latest',
	},
	root: true,
	rules: {
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'@typescript-eslint/dot-notation': 'warn',
		'react/jsx-filename-extension': [
			'error',
			{ extensions: ['.js', '.jsx', '.tsx'] },
		],
		quotes: ['error', 'single'],
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'no-unused-vars': 'warn',
		'react/require-default-props': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-props-no-spreading': 'warn',
		'react/function-component-definition': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-floating-promises': 'warn',
    'no-shadow': 'off',
	},
	globals: {
		_DEV_MODE_: true,
	},
};
