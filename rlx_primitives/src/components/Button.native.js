import styled, { ThemeContext } from 'styled-components';
import react from 'react';
import reactNative from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import fromTheme from '../fromTheme';

const { Pressable } = reactNative;
const { createElement: rc, useContext, forwardRef } = react;

const ButtonText = styled.Text`
    font-size: ${fromTheme('fontSize')};
    text-align: center;
    padding: ${fromTheme('button', 'padding')};
    color: ${props =>
        props.disabled ? props.theme.disabledFontColor : props.theme.button.fontColor};
`;

const StyledButton = styled(Pressable).attrs({ name: 'button' })`
    max-width: ${fromTheme('button', 'maxWidth')};
    margin: ${fromTheme('textMargin')};
    border-radius: ${fromTheme('borderRadius')};
    background-color: ${({ theme, color }) => theme.button[color]};
    display: flex;
    flex-grow: 0;
    flex-direction: row;
    flex-basis: auto;
    align-items: center;
    justify-content: center;
`;

const RoundButton = styled(StyledButton).attrs({ name: 'round-button' })`
    width: ${fromTheme('button', 'roundDiameter')};
    max-width: ${fromTheme('button', 'roundDiameter')};
    height: ${fromTheme('button', 'roundDiameter')};
    border-radius: ${fromTheme('button', 'roundBorderRadius')};
    flex-grow: 0;
`;

const StyledIcon = styled(Icon)`
    font-size: ${fromTheme('iconSize')};
    color: ${({ theme }) => theme.button.fontColor};
`;

export default forwardRef(function Button(props, ref) {
    const {
        value,
        disabled,
        icon,
        buttonStyle,
        onClick,
        onPress: tempOnPress,
        color = 'primary',
        children = []
    } = props;
    const theme = useContext(ThemeContext);
    const onPress = e => {
        onClick && onClick(e);
        tempOnPress && tempOnPress(e);
    };
    let adjustedChildren = [];
    if (icon) {
        // prettier-ignore
        adjustedChildren = [rc(StyledIcon, { key: 'icon', name: icon })];
        if (value && value.length) {
            adjustedChildren.push(rc(ButtonText, { key: 'buttonText', disabled }, value));
        }
    } else {
        adjustedChildren = [rc(ButtonText, { key: 'buttonText', disabled }, value)];
    }
    if (children) {
        Array.isArray(children)
            ? (adjustedChildren = [...adjustedChildren, ...children])
            : (adjustedChildren = [...adjustedChildren, children]);
    }
    if (buttonStyle === 'round') {
        // prettier-ignore
        return rc(RoundButton, {
                ref,
                color,
                onPress,
                disabled,
                android_ripple: { color: theme.button.primaryHighlight }
            },
            adjustedChildren
        );
    }
    // prettier-ignore
    return rc(StyledButton, {
            ref,
            color,
            onPress,
            disabled,
            android_ripple: { color: theme.button.primaryHighlight }
        },
        adjustedChildren
    );
});
