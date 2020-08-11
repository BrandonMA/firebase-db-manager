module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'promise'],
    extends: [
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:promise/recommended',
        'prettier/standard'
    ],
    env: {
        es6: true,
        webextensions: true,
        browser: true
    },
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            legacyDecorators: true
        }
    }
};
