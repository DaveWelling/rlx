const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

// FYI - To use the xstate inspector (https://github.com/davidkpiano/xstate/tree/master/packages/xstate-inspect)
// You will need to enable pop-ups in your browser and set `devTools:true`
// in your `useMachine` or `interpret` method options object (2nd param).
const __USE_XSTATE_INSPECTOR__ = true;

module.exports = {
    devtool: isProduction ? false : 'eval-source-map',
    mode: isProduction ? 'production' : 'development',
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
        new webpack.DefinePlugin({
            __USE_XSTATE_INSPECTOR__,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
        }),
        // Make browser version avoid using Node specific stuff
        new webpack.NormalModuleReplacementPlugin(/^fs$/, path.resolve(__dirname, 'fakeFs.cjs')),
    ],
};
