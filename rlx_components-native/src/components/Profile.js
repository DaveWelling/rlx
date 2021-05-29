import {
    useRef,
    useCallback,
    useState,
    createElement,
    useEffect,
    useContext
} from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Modal, View, Text, Button, fromTheme, webOnlyStyles } from 'rlx_primitives';
const rc = createElement;

let Menu = styled(View)`
    background-color: ${({ theme }) => theme.baseBackgroundColor};
    color: ${({ theme }) => theme.defaultFontColor};
    border-radius: ${fromTheme('borderRadius')};
    position: absolute;
    width: auto;
    height: auto;
    padding: 16px;
`;
Menu = webOnlyStyles(Menu)`
    box-shadow: 4px 4px 4px 0px darkgray;
`;
export default function Profile(props) {
    const buttonRef = useRef();
    const theme = useContext(ThemeContext);
    const [menuPosition, setMenuPosition] = useState({ right: 0, top: 0 });
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const toggleDisplayMenu = useCallback(e => {
        e.stopPropagation();
        setIsMenuVisible(value => !value);
    });
    useEffect(() => {
        if (buttonRef.current) {
            const b = buttonRef.current;
            setMenuPosition({
                right: theme.width - b.offsetLeft,
                top: b.offsetTop + b.offsetHeight
            });
        }
    }, [buttonRef.current]);

    // prettier-ignore
    return rc(Button, { ref: buttonRef, icon: 'person', buttonStyle: 'round', onClick: toggleDisplayMenu},
        // If you don't include the isMenuVisible, this modal will always render, it just won't be visible
        // until you try to render some other modal and wonder why this is showing.
        isMenuVisible && rc(Modal, {visible: isMenuVisible, fullScreen: false, onClick: toggleDisplayMenu },
            rc(Menu, {style: {right: menuPosition.right, top: menuPosition.top}},
                rc(Text, null, 'Dark Mode')
            )
        )
    )
}
