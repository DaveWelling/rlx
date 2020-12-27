export default function getFormFsm(record, recordType, isNew) {
    return {
        id: `${recordType}Form`,
        initial: 'view',
        context: { oldRecord: record, newRecord: record, recordType, isNew },
        states: {
            empty: {},
            view: {},
            edit: {
                initial: 'ready',
                on: {
                    [`change_${recordType}`]: 'dirty',
                },
                states: {
                    ready: {},
                    dirty: {
                        on: {
                            [`submit_${recordType}`]: 'submitting',
                        },
                        valid: {},
                        invalid: {},
                        submitting: {
                            states: {
                                validating: {
                                    invoke: {
                                        id: 'validation',
                                        src: 'svc_validation',
                                        onDone: 'saving',
                                        onError: `${recordType}Form.edit.dirty.invalid`,
                                    },
                                },
                                saving: {
                                    invoke: {
                                        id: 'save',
                                        src: 'svc_save',
                                        onDone: `${recordType}Form.empty`,
                                        onError: `${recordType}Form.edit.dirty.invalid`,
                                    },
                                },
                            },
                        },
                    },
                    submitted: {},
                },
            },
        },
    };
}
