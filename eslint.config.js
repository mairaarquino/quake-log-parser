module.exports = {
  languageOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    globals: {
      node: true,
      browser: true
    }
  },
  rules: {
    'no-debugger': 'warn',
    'no-unused-vars': 'warn',
    'eqeqeq': 'error',
    'indent': ['error', 2],
    'max-len': ['error', { 'code': 100 }]
  }
}
