import { createElement } from 'react';
import reactMenu from 'react-native-material-menu';
const rc = createElement;

export default function MenuItem(props) {
    const { children, otherProps } = props;
    return rc(reactMenu.MenuItem, otherProps, children);
}
