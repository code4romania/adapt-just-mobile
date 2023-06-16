module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'babel-preset-expo'],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: {
        "~": "./src",
      },
    }],
    "@babel/plugin-proposal-export-namespace-from",
    ["babel-plugin-inline-import", {
      "extensions": [".svg"]
    }]
  ],
  env: {
    production: {
      plugins: [
        [
          "dotenv-import", {
            "moduleName": "@env",
            "path": ".env.production",
            "blacklist": null,
            "whitelist": null,
            "safe": false,
            "allowUndefined": false
          }
        ]
      ]
    },
    development: {
      plugins: [
        ["dotenv-import", {
          "moduleName": "@env",
          "path": ".env",
          "blacklist": null,
          "whitelist": null,
          "safe": false,
          "allowUndefined": false
        }]
      ]
    }
  }
};
