import React from 'react';
import { eventSink } from 'rlx_services';
import { EventBoundaryContext } from '../components/contextProviders/EventBoundary';

// Inspired by https://kentcdodds.com/blog/how-to-use-react-context-effectively
// See EventBoundary for the other half of this.

export default function useEventSink() {
    const context = React.useContext(EventBoundaryContext);
    if (context == null) {
        throw new Error(
            'The parent react component hierarchy must contain a EventBoundary component before the useEventSink hook can be used.'
        );
    }
    return eventSink(context);
}
