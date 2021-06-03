import react from 'react';
import cuid from 'cuid';
import useEventSink from '../hooks/useEventSink';
import { database } from 'rlx_services';
// Avoid `Can't import the named export '<function name>' from non EcmaScript module`
// by doing the
const { createContext, useState, useEffect } = react;
const rc = react.createElement;

export const ActiveRecordContext = createContext();

export default function ActiveRecord({ recordType, children }) {
    const [activeRecord, setActiveRecord] = useState({ recordType });
    const [subscribe, publish] = useEventSink();
    useEffect(() => {
        function onSet(activationVerb, _id) {
            // If it exists, clear out the existing active record first.
            if (
                activeRecord != null &&
                activeRecord.record != null &&
                activeRecord.record._id !== _id
            ) {
                // If you don't do this, xstate won't see the Form component unmount
                // and it will not start a new form state machine.
                // There is probably a better way, but I couldn't think of it
                // in a reasonable amount of time.
                publish(`cancel_${activeRecord.recordType}`);
                // Wait until the Form component unmounts.
                setTimeout(
                    // Republish the original event
                    () => publish(`${activationVerb}_${activeRecord.recordType}`, _id),
                    1
                );
                return;
            }
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
    }, [activeRecord]);
    return rc(ActiveRecordContext.Provider, { value: activeRecord }, children);
}
