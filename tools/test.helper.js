const babelRegister = require('@babel/register'); //eslint-disable-line

babelRegister({

  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
  ],

});
