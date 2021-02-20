import styled from 'styled-components';
import react from 'react';
import reactNative from 'react-native';
const { Pressable } = reactNative;
const rc = react.createElement;

const ButtonText = styled.Text`
    font-size: 16px;
    text-align: center;
    color: white;
    padding: 8px;
`;

export default props => {
    const { value, onClick: onPress, children = [] } = props;

    return rc(
        Pressable,
        {
            onPress,
            style: () => {
                return {
                    margin: 6,
                    maxWidth: 200,
                    borderRadius: 6,
                    backgroundColor: 'blue'
                };
            },
            android_ripple: { color: 'lightblue' }
        },
        [rc(ButtonText, { key: 'buttonText' }, value), ...children]
    );
};
