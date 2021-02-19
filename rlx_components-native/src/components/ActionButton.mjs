import react from 'react';
import useEventSink from '../hooks/useEventSink.mjs';
import useActiveRecord from '../hooks/useActiveRecord.mjs';
import { Button } from './primitives';

const rc = react.createElement;

export default function ActionButton(props) {
    const { actionType, title, disabled } = props;
    const [, publish] = useEventSink();
    const { recordType } = useActiveRecord();
    function onClick() {
        publish(`${actionType}_${recordType}`);
    }
    return rc(Button, { value: title, onClick, disabled });
}
