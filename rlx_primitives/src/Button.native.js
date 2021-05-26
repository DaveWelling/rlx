import styled from 'styled-components';
import react from 'react';
import reactNative from 'react-native';
const { Pressable } = reactNative;
const rc = react.createElement;
const ButtonText = styled.Text`
    font-size: 16px;
    text-align: center;
    color: white;
    padding: ${({ theme }) => theme.button.padding};
`;
const Button = styled(Pressable).attrs({ name: 'button' })`
    max-width: ${({ theme }) => theme.button.maxWidth};
    min-width: ${({ theme }) => theme.button.minWidth};
    margin: ${({ theme }) => theme.defaultMargin};
    border-radius: ${({ theme }) => theme.borderRadius};
    background-color: ${({ theme }) => theme.button.main};
    flex: 0;
    justify-content: center;
`;
export default props => {
    const { value, onClick: onPress, children = [] } = props;

    // prettier-ignore
    return rc(Button, { onPress, android_ripple: { color: 'lightblue' } },
        [rc(ButtonText, { key: 'buttonText' }, value), ...children]
    );
};
