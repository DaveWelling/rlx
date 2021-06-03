import set from 'lodash.set';
import { assign } from 'xstate/es/index.js';
export const mergeChanges = assign((context, event) => {
    const newRecord = { ...context.newRecord };
    const { propertyPath = '', propertyName, newValue } = event.payload;
    set(newRecord, propertyPath + propertyName, newValue);
    return { newRecord };
});
export const raiseSuccess = context => {
    const { publish, recordType } = context;
    publish(`submit_${recordType}_success`);
};
