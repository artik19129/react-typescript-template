const path = require('path');
const { optimize } = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const WITH_BUNDLE_ANALYZER = false;

const htmlPluginMinifyOptions = {
  removeComments: false,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
};

module.exports = {
  mode: 'production',
  bail: true,
  stats: 'minimal',
  entry: {
    main: './src/index.tsx',
  },

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[chunkhash:9].js',
    publicPath: '/',
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        parser: {
          requireEnsure: false,
        },
      },

      {
        test: /\.(gif|png|jpe?g|webp|svg)$/i,
        enforce: 'pre',
        loader: 'image-webpack-loader',
        options: {
          // the webp option will enable WEBP
          // WARNING!! !! Webp compression is buggy dont use it
          // webp: {
          //   quality: 85,
          // },

          svgo: {
            cleanupAttrs: true,
            inlineStyles: true,
            removeDoctype: true,
            removeTitle: true,
            removeDesc: true,
          },
        },
      },

      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        sideEffects: true,
      },

      {
        test: /\.tsx?/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },

      {
        test: /\.(jsx?)$/,
        include: [path.resolve(__dirname, 'src')],
        use: [
          'thread-loader',
          'jsx-compress-loader',
          {
            loader: 'babel-loader',
            options: {
              compact: true,
              highlightCode: true,
            },
          },
        ],
      },

      {
        test: /\.(gif|png|jpe?g|webp|svg)$/i,
        oneOf: [
          {
            test: /\.(jpe?g|png)$/i,
            resourceQuery: /webp/,
            loaders: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'static/static/',
                  name: '[name].webp',
                },
              },
              'webp-loader',
            ],
          },

          {
            test: /\.(jpe?g|png)$/i,
            resourceQuery: /landing/,
            use: [
              {
                loader: 'lqip-loader',
                options: {
                  path: 'static/static/prv/', // (if big file, otherwise it's in base64) your image going to be in media folder in the output dir
                  name: '[name].[ext]', // you can use [hash].[ext] too if you wish,
                },
              },

              {
                loader: 'responsive-loader',
                options: {
                  outputPath: 'static/static/',
                  adapter: require('responsive-loader/sharp'),
                },
              },
            ],
          },

          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              fallback: {
                loader: 'file-loader',
                options: {
                  outputPath: 'static/images/',
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new optimize.OccurrenceOrderPlugin(),

    new IgnorePlugin(/^\.\/locale$/, /moment$/),

    new CleanPlugin(['./dist/*|!.dist/static/*'], {
      beforeEmit: true,
    }),

    new CopyPlugin([
      {
        from: './src/data/public',
        to: './',
      },
    ]),

    new MiniCssExtractPlugin({
      publicPath: '/',
      filename: 'static/css/[name].[contenthash:9].css',
      chunkFilename: 'static/css/[id].[contenthash:9].css',
    }),

    new HtmlPlugin({
      inject: true,
      template: './index.html',
      chunks: ['main'],
      filename: 'main/index.html',

      minify: {
        ...htmlPluginMinifyOptions,
      },
    }),

    new CompressionPlugin({
      test: /\.(js|css|html|svg|png|jpe?g|woff|woff2|jsx|json|webp|s[ca]ss)$/,
      threshold: 1000,
    }),

    ...(WITH_BUNDLE_ANALYZER ? [new BundleAnalyzerPlugin()] : []),
  ],
  // optimization: {
  //   // runtimeChunk: 'multiple',
  //   // nodeEnv: 'production',
  //
  //   splitChunks: {
  //     name: false,
  //     cacheGroups: {
  //       main: {
  //         minChunks: 2,
  //         reuseExistingChunk: true,
  //         priority: -100,
  //       },
  //
  //       vendors: {
  //         test: /[\\/]node_modules[\\/](react|react-dom|redux|react-redux|i18next|react-i18next|react-toastify|react-router)[\\/]/,
  //         name: 'vendor',
  //         chunks: 'all',
  //
  //         reuseExistingChunk: true,
  //
  //         priority: -10,
  //       },
  //     },
  //   },
  // },
};
