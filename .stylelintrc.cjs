module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-styled-components',
  ],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    indentation: [4],
    'selector-class-pattern': null,
  },
};
