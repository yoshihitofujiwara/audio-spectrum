const ConcatPlugin = require('webpack-concat-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')
const webpack = require('webpack')
const path = require('path')

const env = process.env.NODE_ENV
const isDebug = env === 'dev'
const isServe = process.argv[2] === 'serve'
const src = path.join(__dirname, '../src')
const dist = path.join(__dirname, '../htdocs')
const publicPath = '/assets/'

// # Environment variable
// const envVar = require(`./env.${env}.js`)

module.exports = {
  mode: isDebug ? 'development' : 'production',

  entry: {
    'js/scripts': `${src}/js/index.js`,
    'css/styles.css': `${src}/scss/index.scss`,
  },

  output: {
    publicPath: publicPath,
    path: `${dist}${publicPath}`,
    filename: `[name].js`,
  },

  module: {
    rules: [
      {
        // js
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
								[
									'@babel/preset-env',
									{"targets": { "node": "current"}}
								]
							],
            },
          },
        ],
      },
      {
        // css
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 2,
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer', { grid: true }]],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  target: isServe ? 'web' : ['web', 'es5'],
  devtool: isDebug ? 'inline-source-map' : false,
  optimization: {
    minimize: !isDebug,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, `${src}/js/`),
    },
  },

  plugins: [
    // js
    // new webpack.DefinePlugin({
    // 	CONFIG: JSON.stringify(envVar)
    // }),
    // new ConcatPlugin({
    // 	uglify: false,
    // 	sourceMap: false,
    // 	name: "libs",
    // 	outputPath: "./",
    // 	fileName: "[name].js",
    // 	filesToConcat: [
    // 		"./node_modules/jquery/dist/jquery.min.js",
    // 		`${src}/js/libs/**/*.js`,
    // 	],
    // 	attributes: {
    // 		async: false
    // 	}
    // }),

    // css
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: `..${publicPath}[name]`,
    }),
  ],

  devServer: {
    contentBase: dist,
    open: true,
    watchContentBase: true,
    publicPath: publicPath,
  },
}
