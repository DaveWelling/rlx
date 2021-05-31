import { createElement } from 'react';
import { Svg, Path, webOnlyProperties, nativeOnlyProperties } from 'rlx_primitives';

const rc = createElement;

export default function ArrowIcon({ isOpen }) {
    return rc(
        Svg,
        {
            name: 'arrow-icon',
            viewBox: '0 0 20 20',
            preserveAspectRatio: 'none',
            width: 16,
            height: 16,
            fill: 'transparent',
            stroke: '#979797',
            strokeWidth: '1.1',
            ...webOnlyProperties({
                transform: isOpen ? 'rotate(90)' : undefined
            }),
            ...nativeOnlyProperties({
                transform: isOpen ? [{ rotate: '90deg' }] : undefined
            })
        },
        rc(Path, { d: 'M1,6 L10,15 L19,6' })
    );
}
