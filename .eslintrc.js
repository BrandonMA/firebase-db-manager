module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    env: {
        es6: true,
        webextensions: true,
        browser: true
    },
    rules: {
        'no-warning-comments': 'warn',
        'prefer-const': 'warn',
        prefixWithI: 'never'
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'prettier']
};
