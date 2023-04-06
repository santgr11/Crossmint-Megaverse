module.exports = {
  env: {
    node: true,
    es2021: true
  },
  extends: ['standard', 'prettier', 'plugin:security/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    semi: ['error', 'always'],
    'react/prop-types': 'off',
    'space-before-function-paren': 'off',
    'no-unused-vars': ['error', { destructuredArrayIgnorePattern: '^_' }],
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ]
  }
};
