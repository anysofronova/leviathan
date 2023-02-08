// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  devtool: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@features': path.resolve(__dirname, '../src/app/features'),
      '@shared': path.resolve(__dirname, '../src/app/shared'),
      '@store': path.resolve(__dirname, '../src/app/store'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
