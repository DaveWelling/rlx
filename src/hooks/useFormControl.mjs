import { useContext, useState } from 'react';
import { FormContext } from '../components/Form.mjs';
import useEventSink from './useEventSink.mjs';
import useActiveRecord from './useActiveRecord.mjs';
export default (props) => {
    const { recordType } = useActiveRecord();
    const { disabled, newRecord } = useContext(FormContext);
    const [, publish] = useEventSink();
    const { title, propertyName } = props;

    const [value, setValue] = useState(newRecord[propertyName]);
    return {
        title,
        disabled,
        value,
        setValue: (newValue) => {
            setValue(newValue);
            publish(`change_${recordType}`, { [propertyName]: newValue });
        },
    };
};
