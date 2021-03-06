import { createElement } from 'react';
import useEventSink from '../hooks/useEventSink.mjs';
import styled from 'styled-components';
import useActiveRecord from '../hooks/useActiveRecord.mjs';

const rc = createElement;

const Input = styled.input`
    margin: 6px;
    border-radius: 3px;
    border: thin solid black;
    padding: 8px;
    max-width: 200px;
`;

export default function ActionButton(props) {
    const { actionType, title, disabled } = props;
    const [, publish] = useEventSink();
    const { recordType } = useActiveRecord();
    function onClick() {
        publish(`${actionType}_${recordType}`);
    }
    return rc(Input, { type: 'button', value: title, onClick, disabled });
}
