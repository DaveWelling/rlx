const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: isProduction ? false : 'eval-source-map',
    entry: {
        main: ['./src/index.mjs'],
    },
    output: {
        filename: '[fullhash].js',
        globalObject: 'this',
        chunkFilename: '[chunkhash].js',
    },
    devServer: {
        contentBase: './src',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        // Make browser version avoid using Node specific stuff
        new webpack.NormalModuleReplacementPlugin(/^fs$/, path.resolve(__dirname, 'fakeFs.cjs')),
    ],
};
