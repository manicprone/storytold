module.exports = {
  'extends': 'airbnb-base',
  'plugins': [
    'import',
  ],
  'env': {
    'browser': true,
    'node': true,
  },
  'globals': {
    '__CLIENT__': true,
    '__SERVER__': true,
  },
  'rules': {
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'no-use-before-define': ['error', { 'functions': false, 'classes': false }],
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'max-len': 'off',
    'arrow-body-style': 'off',
    'no-console': 'off',
    'default-case': 'off',
    'dot-notation': 'off',
    'padded-blocks': 'off',
    'no-param-reassign': 'off',
  },
};
