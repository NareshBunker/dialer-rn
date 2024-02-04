const config = require('./tsconfig.json')

const { baseUrl, paths } = config.compilerOptions

const getAliases = () => {
  return Object.entries(paths).reduce((aliases, alias) => {
    const key = alias[0].replace('/*', '')
    const value = baseUrl + alias[1][0].replace('*', '')
    return {
      ...aliases,
      [key]: value,
    }
  }, {})
}
console.log(getAliases());

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: getAliases(),
      }
    ],
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": ".env",
      "blacklist": null,
      "whitelist": null,
      "safe": false,
      "allowUndefined": true,
    }]
  ]
};
