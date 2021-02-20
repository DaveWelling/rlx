import { withPolyfills, makeConfig } from '@haul-bundler/preset-0.60';
import path from 'path';
import webpack from 'webpack';
const __USE_XSTATE_INSPECTOR__ = false;
const transform = ({ bundleName, env, runtime, config }) => {
    config.resolve.alias = {
        'styled-components': path.resolve(
            './node_modules/styled-components/native/dist/styled-components.native.esm.js'
        ),
        react: path.resolve('./node_modules/react'),
        // Prevent using multiple version of react (because react hooks freak out) and allow resolution
        // of RN specific stuff to happen in this project rather than in dependencies (that don't care about RN).
        'react-native': path.resolve('./node_modules/react-native')
    };
    config.plugins = [
        ...config.plugins,
        new webpack.DefinePlugin({ __USE_XSTATE_INSPECTOR__ })
    ];
    // Remove babel-loader, as it handles both .ts(x) and .js(x) files
    // removeRuleByTest(config.module.rules, /\.[jt]sx?$/);
    // config.module.rules = [
    //     ...config.module.rules,

    //     // Re-add the babel-loader, now only for .js(x)
    //     {
    //         test: /\.jsx?$/,
    //         loader: require.resolve('babel-loader'),
    //         options: {
    //             plugins: [
    //                 require.resolve('@haul-bundler/core/build/utils/fixRequireIssues'),
    //                 require.resolve('@babel/plugin-proposal-export-namespace-from')
    //             ]
    //         }
    //     }
    // ];
};
export default makeConfig({
    bundles: {
        index: {
            entry: withPolyfills('./index.js'),
            transform
        }
    }
});

// const removeRuleByTest = (moduleConfig, test) => {
//     const index = moduleConfig.findIndex(rule => {
//         if (rule.test) {
//             return rule.test.toString() === test.toString();
//         }
//         return false;
//     });
//     moduleConfig.splice(index, 1);
// };
