import react from 'react';
import styled from 'styled-components';
const rc = react.createElement;

const Input = styled.input.attrs({ name: 'text-input', type: 'textbox' })`
    font-size: 16px;
    margin: 6px;
    padding: 6px;
    border-radius: 3px;
    border: none;
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
`;

// downshift dropdowns require a ref
export default react.forwardRef(function TextInput(props, ref) {
    return rc(Input, {
        ...props,
        ref,
        onChange: e => props.onChange(e.target.value)
    });
});
