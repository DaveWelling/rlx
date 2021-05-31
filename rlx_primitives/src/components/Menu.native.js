import { createElement } from 'react';
import reactMenu from 'react-native-material-menu';
const rc = createElement;

export default function Menu(props) {
    const { children, menuButton, otherProps } = props;
    if (menuButton == null) {
        // TODO: replace with react-props
        throw new Error(
            'A menuButton prop containing a component must be passed into the Menu primitive.'
        );
    }
    return rc(reactMenu.Menu, { button: menuButton, ...otherProps }, children);
}
