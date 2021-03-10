import { createElement, createContext, useState, useEffect } from 'react';
import cuid from 'cuid';
import useEventSink from '../hooks/useEventSink.mjs';
import db from '../services/persistence/database.mjs';

const rc = createElement;

export const ActiveRecordContext = createContext();

/**
 * @param {Object} props
 * @param {string} props.recordType
 * @param {import('react').ReactNode} props.children
 * @returns {import('react').ReactNode[] } ReactNode
 */
export default function ActiveRecordProvider({ recordType, children }) {
    const [activeRecord, setActiveRecord] = useState({ recordType });
    const [subscribe] = useEventSink();
    useEffect(() => {
        function onSet(activationVerb, _id) {
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
            subscribe(`cancel_${recordType}`, () => setActiveRecord({ recordType }))
        ];
        return () => unsubscribes.forEach(u => u());
    }, []);
    return rc(ActiveRecordContext.Provider, { value: activeRecord }, children);
}
