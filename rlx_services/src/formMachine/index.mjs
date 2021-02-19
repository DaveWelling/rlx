import { Machine } from 'xstate/es/index.js';
import * as services from '../index.mjs';
import * as actions from './actions.mjs';

export default function getFormFsm(recordType, activationVerb, machineContext) {
    return Machine(getConfig(recordType, activationVerb, machineContext), {
        services,
        actions
    });
}

export function getConfig(recordType, activationVerb, context) {
    return {
        id: `${recordType}Form`,
        initial: activationVerb === 'view' ? 'view' : 'edit',
        context,
        states: {
            view: {},
            edit: {
                initial: 'ready',
                on: {
                    [`change_${recordType}`]: {
                        target: '.dirty',
                        actions: 'mergeChanges'
                    }
                },
                states: {
                    ready: {},
                    dirty: {
                        initial: 'valid',
                        on: {
                            [`submit_${recordType}`]: '.submitting'
                        },
                        states: {
                            valid: {},
                            invalid: {},
                            submitting: {
                                initial: 'validating',
                                states: {
                                    validating: {
                                        invoke: {
                                            id: 'validate',
                                            src: 'validation',
                                            onDone: 'saving',
                                            onError: `#${recordType}Form.edit.dirty.invalid`
                                        }
                                    },
                                    saving: {
                                        invoke: {
                                            id: 'save',
                                            src: 'persistence',
                                            onDone: `#${recordType}Form.submitted`,
                                            onError: `#${recordType}Form.edit.dirty.invalid`
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            submitted: {
                entry: 'raiseSuccess',
                type: 'final'
            }
        }
    };
}
