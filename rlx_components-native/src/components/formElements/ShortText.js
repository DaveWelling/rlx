import react from 'react';
import styled from 'styled-components';
import useFormControl from '../../hooks/useFormControl';
import { TextInput, Label } from 'rlx_primitives';

const rc = react.createElement;

const StyledTextInput = styled(TextInput)`
    flex-grow: 1;
`;

export default function ShortText(props) {
    const { title, value, setValue, disabled } = useFormControl(props);

    function onChange(text) {
        setValue(text);
    }

    // prettier-ignore
    return rc(Label, null,
        title,
        rc(StyledTextInput, { disabled, type: 'textbox', value, onChange })
    );
}
