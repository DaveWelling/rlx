import React from 'react';
const rc = React.createElement;

// Inspired by https://kentcdodds.com/blog/how-to-use-react-context-effectively
// See useEventSink.mjs for the other half of this.

export const EventBoundaryContext = React.createContext();

export default function EventBoundaryProvider({ children, logEvents }) {
    const context = {
        subscriptions: {},
        logEvents
    };

    return rc(EventBoundaryContext.Provider, { value: context }, children);
}
