import { useEffect, useMemo } from 'react';
import xstate from 'xstate';

import formMachine from '../stateMachines/formMachine.mjs';
import useActiveRecord from '../hooks/useActiveRecord.mjs';
import useEventSink from '../hooks/useEventSink.mjs';
import get from 'lodash.get';
const { useMachine } = xstate;

export default function useFormMachine() {
    const activeRecord = useActiveRecord();
    const [subscribe] = useEventSink();
    const { recordType, record, isNew } = activeRecord;
    const machine = useMemo(() => formMachine(record, recordType, isNew));
    const [state, send] = useMachine(machine);
    useEffect(() => {
        const unsubscribes = [subscribe(`change_${recordType}`, send), subscribe(`submit_${recordType}`, send)];
        return () => unsubscribes.forEach((u) => u());
    }, [recordType, send]);
    const disabled = state === 'view' || get(state, 'edit.dirty') === 'submitting';
    const context = {
        disabled,
        oldRecord: record,
        newRecord: state.context.newRecord,
    };
    return context;
}
