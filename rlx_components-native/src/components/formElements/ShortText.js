import react from 'react';
import useFormControl from '../../hooks/useFormControl';
import { TextInput, Label } from '../primitives';

const rc = react.createElement;

export default function ShortText(props) {
    const { title, value, setValue, disabled } = useFormControl(props);

    function onChange(text) {
        setValue(text);
    }

    // prettier-ignore
    return rc(Label, null,
        title,
        rc(TextInput, { disabled, type: 'textbox', value, onChange })
    );
}
