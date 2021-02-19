import react from 'react';
import cuid from 'cuid';
import useEventSink from '../hooks/useEventSink.mjs';
import { database } from 'rlx_services';
// Avoid `Can't import the named export '<function name>' from non EcmaScript module`
// by doing the
const { createElement, createContext, useState, useEffect } = react;
const rc = createElement;

export const ActiveRecordContext = createContext();

export default function ActiveRecord({ recordType, children }) {
    const [activeRecord, setActiveRecord] = useState({ recordType });
    const [subscribe] = useEventSink();
    useEffect(() => {
        function onSet(activationVerb, _id) {
            let record,
                isNew = true;
            if (_id) {
                record = database.getCollection(recordType).by('_id', _id);
                if (record == null) {
                    throw new Error(`No record exists with id ${_id}`);
                }
                isNew = false;
            } else {
                record = { _id: cuid() };
            }
            setActiveRecord({
                activationVerb,
                record,
                isNew,
                recordType
            });
        }
        const unsubscribes = [
            subscribe(`view_${recordType}`, _id => onSet('view', _id)),
            subscribe(`new_${recordType}`, () => onSet('new')),
            subscribe(`edit_${recordType}`, _id => onSet('edit', _id)),
            subscribe(`cancel_${recordType}`, () => setActiveRecord({ recordType })),
            subscribe(`submit_${recordType}_success`, () =>
                setActiveRecord({ recordType })
            )
        ];
        return () => unsubscribes.forEach(u => u());
    }, []);
    return rc(ActiveRecordContext.Provider, { value: activeRecord }, children);
}
