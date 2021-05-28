import styled, { ThemeContext } from 'styled-components';
import react from 'react';
import reactNative from 'react-native';
const { Pressable } = reactNative;
const { createElement: rc, useContext } = react;
const ButtonText = styled.Text`
    font-size: 16px;
    text-align: center;
    padding: ${({ theme }) => theme.button.padding};
    color: ${props =>
        props.disabled ? props.theme.disabledFontColor : props.theme.defaultFontColor};
`;
const Button = styled(Pressable).attrs({ name: 'button' })`
    max-width: ${({ theme }) => theme.button.maxWidth};
    min-width: ${({ theme }) => theme.button.minWidth};
    margin: ${({ theme }) => theme.defaultMargin};
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.button.primary};
    &:hover {
        background-color: ${({ theme }) => theme.button.primaryHover};
    }
    flex: 0;
    justify-content: center;
`;
export default props => {
    const { value, disabled, onClick: onPress, children = [] } = props;
    const theme = useContext(ThemeContext);
    // prettier-ignore
    return rc(Button, { onPress, disabled, android_ripple: { color: theme.button.primaryHighlight } },
        [rc(ButtonText, { key: 'buttonText', disabled }, value), ...children]
    );
};
