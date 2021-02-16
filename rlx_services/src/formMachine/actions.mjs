import * as xstate from 'xstate';
const { assign } = xstate.default || xstate;
export const mergeChanges = assign((context, event) => {
    return {
        newRecord: {
            ...context.newRecord,
            ...event.payload
        }
    };
});
