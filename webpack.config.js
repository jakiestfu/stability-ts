const path = require('path')
const nodeExternals = require('webpack-node-externals')
const ShebangPlugin = require('webpack-shebang-plugin')

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.ts',
    bin: './src/bin.ts',
  },
  externalsPresets: { node: true },
  externals: [
    nodeExternals({
      allowlist: [
        'stability-sdk/gooseai/generation/generation_pb_service',
        'stability-sdk/gooseai/generation/generation_pb',
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    library: {
      type: 'commonjs',
    },
  },
  plugins: [new ShebangPlugin()],
  node: {
    __dirname: false,
  },
}
