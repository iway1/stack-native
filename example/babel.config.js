module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
          alias: {
            // For development, we want to alias the library to the source
            "stack-native": "../react-native/src/index",
          },
        },
      ],
      "nativewind/babel",
      "react-native-reanimated/plugin",
    ],
  };
};
