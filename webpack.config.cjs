const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/index'],
    },
    output: {
        filename: '[name].[hash].js',
        globalObject: 'this',
        chunkFilename: '[name].[hash].js',
    },
    devServer: {
        contentBase: './src',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
    ],
};
