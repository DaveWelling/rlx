import reactNative from 'react-native';
import react from 'react';
import styled from 'styled-components';

const rc = react.createElement;
const { TextInput } = reactNative;

const Input = styled(TextInput).attrs(({ theme }) => ({
    name: 'text-input',
    color: theme.defaultFontColor,
    placeholderTextColor: theme.disabledFontColor
}))`
    font-size: 16px;
    margin: 6px;
    padding: 6px;
    border-radius: 3px;
    border: none;
    background-color: rgba(255, 255, 255, 0.1);
`;

export default react.forwardRef(function TextInput(props, ref) {
    // onChange is actually a property of a react native TextInput, but we want
    // onChangeText.  If you just pass in props.onChange with the rest of
    // the props, bad things will happen (it will get called twice:
    // once by onChangeText and once with a synthetic event from the
    // react-native onChange).
    const { onChange, ...otherProps } = props;
    return rc(Input, {
        ...otherProps,
        ref,
        onChangeText: onChange
    });
});
