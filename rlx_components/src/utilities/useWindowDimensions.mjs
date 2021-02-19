/**
 * https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/useWindowDimensions/index.js
 */
import Dimensions from './dimensions.mjs';
import { useEffect, useState } from 'react';

export default function useWindowDimensions() {
    const [dims, setDims] = useState(() => Dimensions.get('window'));
    useEffect(() => {
        function handleChange({ window }) {
            setDims(window);
        }
        Dimensions.addEventListener('change', handleChange);
        // We might have missed an update between calling `get` in render and
        // `addEventListener` in this handler, so we set it here. If there was
        // no change, React will filter out this update as a no-op.
        setDims(Dimensions.get('window'));
        return () => {
            Dimensions.removeEventListener('change', handleChange);
        };
    }, []);
    return dims;
}
