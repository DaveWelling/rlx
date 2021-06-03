import react from 'react';
const { useEffect, useMemo } = react;
import { useMachine } from '@xstate/react';
import { formMachine } from 'rlx_services';
import useActiveRecord from '../hooks/useActiveRecord';
import useEventSink from '../hooks/useEventSink';

export default function useFormMachine() {
    const activeRecord = useActiveRecord();
    const { recordType, record, isNew, activationVerb } = activeRecord;
    const [subscribe, publish] = useEventSink();
    // Create one machine per record action
    const machine = useMemo(() => {
        const machineContext = {
            newRecord: { ...record },
            isNew,
            publish,
            recordType
        };
        return formMachine(recordType, activationVerb, machineContext);
    }, [record, recordType, isNew, activationVerb, publish]);
    // eslint-disable-next-line no-undef
    const [state, send] = useMachine(machine, { devTools: __USE_XSTATE_INSPECTOR__ });

    // Send changes and submissions to the machine
    useEffect(() => {
        // prettier-ignore
        const unsubscribes = [
            subscribe(`change_${recordType}`, payload => send({ type: `change_${recordType}`, payload})),
            subscribe(`submit_${recordType}`, () => send(`submit_${recordType}`))
        ];
        // Return a cleanup function for the unmount
        return () => unsubscribes.forEach(u => u());
    }, [recordType, send]);
    const isDirty = state.matches('edit.dirty');
    const disabled = state.matches('view') || state.matches('edit.dirty.submitting');
    const context = {
        isDirty,
        disabled,
        oldRecord: record,
        newRecord: state.context.newRecord
    };
    return context;
}
