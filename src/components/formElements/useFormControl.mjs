import { useContext, useState } from 'react';
import { FormContext } from '../Form.mjs';
import useEventSink from '../../hooks/useEventSink.mjs';

export default (props) => {
    const {
        disabled,
        activeRecord: { record, recordType },
    } = useContext(FormContext);
    const [, publish] = useEventSink();
    const { title, propertyName } = props;

    const [value, setValue] = useState(record[propertyName]);
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
