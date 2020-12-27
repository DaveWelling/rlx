import { assign } from 'xstate';
export const mergeChanges = assign((context, event) => {
    return {
        newRecord: {
            ...context.newRecord,
            ...event.payload,
        },
    };
});
