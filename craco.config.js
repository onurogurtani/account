const CracoLessPlugin = require('craco-less');
const Dotenv = require('dotenv-webpack');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = {
  webpack: {
    plugins: [
      new Dotenv(),
      new AntdDayjsWebpackPlugin({
        replaceMoment: true,
      }),
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};