const HtmlPlugin = require('html-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const CopyPlugin = require('copy-webpack-plugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const path = require('path');
const HappyPackPlugin = require('happypack');
const FriendlyErrors = require('friendly-errors-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  entry: './src/index.tsx',

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },

  output: {
    path: path.resolve(__dirname, 'dist/js/'),
    filename: '[name].js',
    publicPath: '/',
  },

  module: {
    strictExportPresence: true,
    rules: [
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
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        use: ['happypack/loader'],
      },

      {
        test: /\.(c|sa|sc)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
                  path: 'static/static/', // your image going to be in media folder in the output dir
                  name: '[name].[ext]', // you can use [hash].[ext] too if you wish,
                },
              },

              {
                loader: 'responsive-loader',
                options: {
                  outputPath: 'static/static/',
                  // adapter: require('responsive-loader/sharp'),
                },
              },
            ],
          },

          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              encoding: 'base64',
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
    new HappyPackPlugin({
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      ],
    }),
    new IgnorePlugin(/^\.\/locale$/, /moment$/),
    new NamedModulesPlugin(),

    new HtmlPlugin({
      inject: true,
      template: './index.html',
    }),

    new FriendlyErrors(),
    new CopyPlugin([
      {
        from: './src/data/public',
        to: './',
      },
    ]),
  ],
  performance: {
    hints: false,
  },
  devServer: {
    inline: true,
    compress: true,
    hot: true,
    overlay: true,
    clientLogLevel: 'info',

    historyApiFallback: {
      disableDotRule: true,
    },

    host: 'localhost',
    port: 8081,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'https://api.elm-woodstudio.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/socket.io/': {
        target: 'https://api.elm-woodstudio.com',
        changeOrigin: true,
        ws: true,
      },
    },
  },
};
