import react from 'react';
import useEventSink from '../hooks/useEventSink';
import useActiveRecord from '../hooks/useActiveRecord';
import { Button } from 'rlx_primitives';

const rc = react.createElement;

export default function ActionButton(props) {
    const { actionType, title, disabled, ...otherProps } = props;
    const [, publish] = useEventSink();
    const { recordType } = useActiveRecord();
    function onClick() {
        publish(`${actionType}_${recordType}`);
    }
    return rc(Button, { value: title, onClick, disabled, ...otherProps });
}
