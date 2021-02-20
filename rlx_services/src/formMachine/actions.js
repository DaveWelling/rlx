import { assign } from 'xstate/es/index.js';
export const mergeChanges = assign((context, event) => {
    return {
        newRecord: {
            ...context.newRecord,
            ...event.payload
        }
    };
});
export const raiseSuccess = context => {
    const { publish, recordType } = context;
    publish(`submit_${recordType}_success`);
};
