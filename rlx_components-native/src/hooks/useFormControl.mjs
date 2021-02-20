import react from 'react';
const { useContext, useState } = react;
import { FormContext } from '../components/Form.mjs';
import useEventSink from './useEventSink.mjs';
import useActiveRecord from './useActiveRecord.mjs';
export default function useFormControl(props) {
    const { recordType } = useActiveRecord();
    const { disabled, newRecord } = useContext(FormContext);
    const [, publish] = useEventSink();
    const { title, propertyName, defaultValue } = props;

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
        }
    };
}
