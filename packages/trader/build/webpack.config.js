const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ALIASES, IS_RELEASE, MINIMIZERS, plugins, rules } = require('./constants');

module.exports = function (env) {
    const base = env && env.base && env.base !== true ? `/${env.base}/` : '/';

    return {
        context: path.resolve(__dirname, '../'),
        devtool: IS_RELEASE ? 'source-map' : 'eval-cheap-module-source-map',
        entry: {
            trader: path.resolve(__dirname, '../src', 'index.tsx'),
        },
        mode: IS_RELEASE ? 'production' : 'development',
        module: {
            rules: rules(),
        },
        resolve: {
            alias: ALIASES,
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        optimization: {
            chunkIds: 'named',
            moduleIds: 'named',
            minimize: IS_RELEASE,
            minimizer: MINIMIZERS,
            splitChunks: {
                chunks: 'all',
                minSize: 75000,
                minSizeReduction: 75000,
                maxSize: 1000000,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                cacheGroups: {
                    default: {
                        minChunks: 2,
                        minSize: 75000,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                    defaultVendors: {
                        idHint: 'vendors',
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                },
            },
        },
        output: {
            filename: 'js/[name].js',
            publicPath: '/',
            path: path.resolve(__dirname, '../dist'),
            chunkFilename: 'js/[name].[contenthash].js',
        },
        // Removed externals so React and other dependencies are bundled into the app
        target: 'web',
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src', 'index.html'),
                filename: 'index.html',
            }),
            ...plugins(base, false),
        ],
    };
};
