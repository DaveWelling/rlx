import React from 'react';

const subscriptions = {};

function subscribe(eventName, callback) {
    const eventSubscriptions = subscriptions[eventName] || [];
    eventSubscriptions.push(callback);
    return () => eventSubscriptions.splice(eventSubscriptions.indexOf(callback));
}

function publish(eventName, payload) {
    const eventSubscriptions = subscriptions[eventName] || [];
    eventSubscriptions.forEach((callback) => callback(payload));
}

const EventBoundary = React.createContext({
    subscribe,
    publish,
});

export default EventBoundary;
