/** @type {import('@babel/core').TransformOptions} */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "@babel/plugin-transform-runtime",
        {
          helpers: true,
          regenerator: true,
        },
        "react-native-reanimated/plugin", // must be last
      ],
    ],
  }
}