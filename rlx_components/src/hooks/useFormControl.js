import react from 'react';
const { useContext, useState } = react;
import { FormContext } from '../components/Form';
import useEventSink from './useEventSink';
import useActiveRecord from './useActiveRecord';
import get from 'lodash.get';

export default function useFormControl(props) {
    const { recordType } = useActiveRecord();
    const { disabled, newRecord } = useContext(FormContext);
    const [, publish] = useEventSink();
    const { title, propertyName, defaultValue, propertyPath = '' } = props;

    const value = get(newRecord, propertyPath + propertyName, defaultValue);

    return {
        title,
        disabled,
        value,
        setValue: changeValue => {
            let newValue = changeValue;
            if (typeof changeValue === 'function') {
                newValue = changeValue(value);
            }
            publish(`change_${recordType}`, {
                propertyName,
                newValue,
                propertyPath
            });
        }
    };
}
