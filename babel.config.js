const loadEnv = (path) => ['dotenv-import', {
  moduleName: '@env',
  path,
  safe: true,
  allowUndefined: false,
}];

module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'babel-preset-expo'],
  plugins: [
    ['module-resolver', { root: ['./src'], alias: { '~': './src' } }],
    '@babel/plugin-proposal-export-namespace-from',
    ['babel-plugin-inline-import', { extensions: ['.svg'] }],
  ],
  env: {
    production: { plugins: [loadEnv('.env.production')] },
    development: { plugins: [loadEnv('.env')] },
    staging: { plugins: [loadEnv('.env.staging')] },
  },
};
