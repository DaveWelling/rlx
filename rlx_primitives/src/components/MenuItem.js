import { createElement } from 'react';
import reactMenu from 'react-menu';
const rc = createElement;

export default function MenuItem(props) {
    const { children, otherProps } = props;
    return rc(reactMenu.MenuItem, otherProps, children);
}
