module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true
	},
	plugins: ['react', '@typescript-eslint', 'prettier', 'i18next', 'stas-eslint-plugin'],
	extends: [
		'plugin:react/recommended',
		'plugin:import/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:react-hooks/recommended',
		'plugin:prettier/recommended'
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
		'prettier/prettier': [
			'error', // Means error
			{
				indent: [
					2,
					'tab',
					{
						SwitchCase: 1,
						VariableDeclarator: 1
					}
				],
				singleQuote: true
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
		quotes: ['error', 'single', { allowTemplateLiterals: true }],
		'stas-eslint-plugin/path-relative': ['error', { alias: '@' }],
		'stas-eslint-plugin/import-public-api': [
			'error',
			{ alias: '@', testFilePattern: ['*.test.[ts|tsx]', '.*store.[ts]', '*StoreDecorator.[ts|tsx]'] }
		],
		'stas-eslint-plugin/layer-imports': [
			'error',
			{
				alias: '@',
				ignoreImportPatterns: ['.*\\/.*\\.test\\.tsx?', '.*\\/StoreProvider', '.*\\/testing']
			}
		],
		'no-tabs': 0,
		'linebreak-style': 0,
		'import/no-unresolved': 'off',
		'import/extensions': 'off',
		'import/named': 'off',
		'no-underscore-dangle': 'off',
		'import/default': 'warn',
		'import/prefer-default-export': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-unused-vars': ['warn', { vars: 'local', vars: 'local', args: 'none' }],
		'react/require-default-props': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/display-name': 'off',
		'react/prop-types': 'warn',
		'react/jsx-props-no-spreading': 'off',
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
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-floating-promises': 'warn',
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'ngeslint(i18next/no-literal-string': 'off',
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
				markupOnly: true,
				ignoreAttribute: ['as', 'role', 'data-testid', 'dataTestId', 'to', 'target', 'justify', 'align', 'direction']
			}
		]
	},
	globals: {
		_DEV_MODE_: true,
		_BASE_URL_: true,
		_PROJECT_: true
	},
	overrides: [
		{
			files: ['**/src/**/*.{test, stories.{ts,tsx}'],
			rules: { 'i18next/no-literal-string': 'off', indent: 'off', 'max-len': 'off' }
		},
		{
			files: ['**/src/**/*.{ts,tsx}'],
			rules: { indent: 'off' }
		},
		{
			files: ['./scripts/*', './json-server/*'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/unbound-method': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-floating-promises': 'off'
			}
		}
	]
};
