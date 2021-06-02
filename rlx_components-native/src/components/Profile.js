import { useContext, useCallback, useState, createElement } from 'react';
import styled, { ThemeContext } from 'styled-components';
import {
    Menu,
    MenuItem,
    Switch,
    View,
    Text,
    Button,
    fromTheme,
    webOnlyStyles,
    nativeOnlyStyles
} from 'rlx_primitives';
import ActionSwitch from './ActionSwitch';
const rc = createElement;

let MenuStyle = styled(Menu)`
    background-color: ${fromTheme('menu', 'backgroundColor')};
    padding: ${fromTheme('viewPadding')};
    margin-right: ${fromTheme('textMargin')};
    border-radius: ${fromTheme('borderRadius')};
    border-style: solid;
    border-width: 1px;
    border-color: ${fromTheme('menu', 'borderColor')};
`;

MenuStyle = webOnlyStyles(MenuStyle)`
    list-style-type: none;
`;

MenuStyle = nativeOnlyStyles(MenuStyle)`
    margin-top: 52px;
`;

const ProfileStyle = styled(View)`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

export default function Profile(props) {
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const onClick = checked => {
        setDarkMode(checked);
    };
    // prettier-ignore
    return rc(ProfileStyle, null,
        rc(MenuStyle, {
                direction: 'bottom',
                menuButton: rc(Button, { icon: 'person', buttonStyle: 'round' })
            },
            rc(MenuItem, null,
                rc(ActionSwitch, {onClick, value: darkMode, falseLabel: 'Dark Mode', trueLabel: ''})
            )
        )
    );
}
