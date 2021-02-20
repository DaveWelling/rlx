import react from 'react';
const { useContext, useState, useRef } = react;
import { FormContext } from '../components/Form';
import useEventSink from './useEventSink';
import useActiveRecord from './useActiveRecord';
import cuid from 'cuid';

export default function useFormControl(props) {
    const { title, propertyName, defaultValue } = props;
    const _id = useRef(props._id || cuid());
    const { recordType } = useActiveRecord();
    const { disabled, newRecord } = useContext(FormContext);
    const [, publish] = useEventSink();

    const [value, setValue] = useState(
        newRecord.hasOwnProperty(propertyName) ? newRecord[propertyName] : defaultValue
    );
    return {
        title,
        disabled,
        value,
        setValue: newValue => {
            setValue(newValue);
            publish(`change_${recordType}`, { [propertyName]: newValue });
        },
        _id: _id.current
    };
}
