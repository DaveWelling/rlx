import { createElement } from 'react';
import * as reactMenu from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
const rc = createElement;

export default function Menu(props) {
    const { children, ...otherProps } = props;
    if (otherProps.menuButton == null) {
        // TODO: replace with react-props
        throw new Error(
            'A menuButton prop containing a component must be passed into the Menu primitive.'
        );
    }
    return rc(reactMenu.Menu, { portal: true, ...otherProps }, children);
}