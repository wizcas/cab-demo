const path = require('path');
const { ProvidePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function d(relPath) {
  return path.resolve(__dirname, relPath);
}

module.exports = {
  d,
  config: {
    entry: d('./src/index.tsx'),
    output: {
      path: d('./dist'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@': d('./src'),
        vendor: d('./vendor'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
    plugins: [
      new ProvidePlugin({ React: 'react' }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'public' }],
      }),
    ],
  },
};
