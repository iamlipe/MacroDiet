module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
          alias: {
            '@context': './src/context',
            '@screens': './src/screens',
            '@config': './src/config',
            '@stores': './src/stores',
            '@styles': './src/styles',
            '@hooks': './src/hooks',
            '@components': './src/components',
            '@routes': './src/routes',
            '@assets': './assets',
            '@i18n': './src/i18n',
            '@services': './src/services',
            '@utils': './src/utils',
            '@validations': './src/validations',
            '@__mocks__': './__mocks__',
            '@__tests__': './__tests__',
          },
        },
      ],
    ],
  };
};
