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
            "@core": "./src/core",
            "@config": "./src/config",
            "@utils": "./src/utils",
            "@assets": './assets',
            "@__mocks__/": "./__mocks__/",
            "@__tests__/": "./__tests__/",
          },
        },
      ],
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      }]
    ],
  };
};
