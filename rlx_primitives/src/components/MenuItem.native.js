import { createElement } from 'react';
import * as reactMenu from 'react-native-material-menu';
const rc = createElement;

export default function MenuItem(props) {
    const { children, onClick, ...otherProps } = props;
    return rc(reactMenu.MenuItem, { onPress: onClick, ...otherProps }, children);
}
