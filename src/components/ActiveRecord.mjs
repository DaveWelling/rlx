import { createElement, createContext, useState, useEffect } from 'react';
import cuid from 'cuid';
import useEventSink from '../hooks/useEventSink.mjs';
import db from '../persistence/database.mjs';

const rc = createElement;

export const ActiveRecordContext = createContext();

export default function ActiveRecord({ recordType, children }) {
    const [activeRecord, setActiveRecord] = useState();
    const [subscribe] = useEventSink();
    useEffect(() => {
        function onSet(_id) {
            let record,
                isNew = true;
            if (_id) {
                record = db.getCollection(recordType).by('_id', _id);
                if (record == null) {
                    throw new Error(`No record exists with id ${_id}`);
                }
                isNew = false;
            } else {
                record = { _id: cuid() };
            }
            setActiveRecord({
                initialRecord: record,
                changedRecord: { ...record },
                isNew,
                recordType,
            });
        }
        const unsubscribes = [
            subscribe(`new_${recordType}`, onSet),
            subscribe(`edit_${recordType}`, onSet),
            subscribe(`cancel_${recordType}`, () => setActiveRecord(undefined)),
        ];
        return () => unsubscribes.forEach((u) => u());
    }, []);
    return rc(ActiveRecordContext.Provider, { value: activeRecord }, children);
}
