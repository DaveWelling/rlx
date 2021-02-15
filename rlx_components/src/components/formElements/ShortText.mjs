import { createElement } from 'react';
import useFormControl from '../../hooks/useFormControl.mjs';
import { TextInput, Label } from '../primitives.mjs';

const rc = createElement;

export default function ShortText(props) {
    const { title, value, setValue, disabled } = useFormControl(props);

    function onChange(e) {
        setValue(e.target.value);
    }

    // prettier-ignore
    return rc(Label, null,
        title,
        rc(TextInput, { disabled, type: 'textbox', value, onChange })
    );
}
