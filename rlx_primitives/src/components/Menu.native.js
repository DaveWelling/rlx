import { createElement, useRef, cloneElement } from 'react';
import * as reactMenu from 'react-native-material-menu';
const rc = createElement;

export default function Menu(props) {
    const { children, menuButton, ...otherProps } = props;
    const menuRef = useRef();
    if (menuButton == null) {
        // TODO: replace with react-props
        throw new Error(
            'A menuButton prop containing a component must be passed into the Menu primitive.'
        );
    }

    const onPress = e => {
        const menu = menuRef.current;
        if (menu) {
            if (menu.state.menuState === 'HIDDEN') {
                menu.show();
            } else {
                menu.hide();
            }
        }
    };

    // Because the button is already rendered by this time, we need to clone the original in
    // order to get our onPress (above) into it.
    const { children: buttonChildren, ...otherButtonProps } = menuButton.props;
    const button = cloneElement(
        menuButton,
        { onPress, otherButtonProps },
        buttonChildren
    );

    return rc(reactMenu.default, { ref: menuRef, button, ...otherProps }, children);
}
