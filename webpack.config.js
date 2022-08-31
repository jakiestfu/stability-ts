const path = require('path')
const nodeExternals = require('webpack-node-externals')
const ShebangPlugin = require('webpack-shebang-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.ts',
    bin: './src/bin.ts',
  },
  externalsPresets: { node: true },
  externals: [
    nodeExternals({
      allowlist: [
        'stability-sdk/src/js/generation_pb_service',
        'stability-sdk/src/js/generation_pb',
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [new ShebangPlugin()],
  node: {
    __dirname: false,
  },
}
