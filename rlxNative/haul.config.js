import { withPolyfills, makeConfig } from '@haul-bundler/preset-0.60';
import path from 'path';

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
};
export default makeConfig({
    bundles: {
        index: {
            entry: withPolyfills('./index.js'),
            transform
        }
    }
});
