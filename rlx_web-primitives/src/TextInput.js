import react from 'react';
import styled from 'styled-components';
const rc = react.createElement;

const Input = styled.input.attrs({ name: 'text', type: 'textbox' })`
    font-size: 16px;
    margin: 6px;
    padding: 3px;
    border-radius: 3px;
    border: none;
`;

// downshift dropdowns require a ref
export default react.forwardRef(function TextInput(props, ref) {
    return rc(Input, {
        ...props,
        ref,
        onChange: e => props.onChange(e.target.value)
    });
});
