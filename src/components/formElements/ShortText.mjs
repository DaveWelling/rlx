import { createElement } from 'react';
import useFormControl from '../../hooks/useFormControl.mjs';
import styled from 'styled-components';

const rc = createElement;

const Input = styled.input`
    margin: 6px;
    padding: 3px;
    border-radius: 3px;
    border: none;
`;

const Label = styled.label`
    display: inline-block;
`;

export default function ShortText(props) {
    const { title, value, setValue, disabled } = useFormControl(props);

    function onChange(e) {
        setValue(e.target.value);
    }

    // prettier-ignore
    return rc(Label, null,
        title,
        rc(Input, { disabled, type: 'textbox', value, onChange })
    );
}
