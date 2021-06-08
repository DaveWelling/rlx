import react from 'react';
import styled from 'styled-components';
import fromTheme from '../fromTheme';
const rc = react.createElement;

const Input = styled.input.attrs(props => ({
    name: props.name || 'text',
    type: 'textbox'
}))`
    font-size: ${fromTheme('fontSize')};
    margin-left: ${fromTheme('textMargin')};
    padding: ${fromTheme('textPadding')};
    border-radius: ${fromTheme('form', 'inputBorderRadius')};
    border: none;
    color: ${fromTheme('defaultFontColor')};
    background-color: ${fromTheme('backgroundColor')};
`;

// downshift dropdowns require a ref
export default react.forwardRef(function TextInput(props, ref) {
    return rc(Input, {
        ...props,
        ref,
        onChange: e => props.onChange(e.target.value)
    });
});
