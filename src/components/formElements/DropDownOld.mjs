import { createElement } from 'react';
import useFormControl from '../../hooks/useFormControl.mjs';
import styled from 'styled-components';
import useLokiView from '../../hooks/useLokiView.mjs';

const rc = createElement;

const Select = styled.select`
    margin: 6px;
    padding: 3px;
`;

export default function DropDown(props) {
    const { title, value, setValue, disabled } = useFormControl(props);
    const { otherRecordType } = props;
    const [data] = useLokiView(otherRecordType, `${otherRecordType}_default`, {});

    function onChange(e) {
        setValue(e.target.value);
    }

    // prettier-ignore
    return rc('label', null,
        title,
        rc(Select, { disabled, onChange },
            data.map(r=>rc('option', {selected: r._id === value._id, value: r._id}, r.title))
        )
    );
}
