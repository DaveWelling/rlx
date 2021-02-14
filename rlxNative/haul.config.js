import { withPolyfills, makeConfig } from '@haul-bundler/preset-0.60';
import path from 'path';

const transform = ({ bundleName, env, runtime, config }) => {
    config.resolve.alias = {
        'styled-components': path.resolve(
            './node_modules/styled-components/native/dist/styled-components.native.cjs.js'
        )
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
