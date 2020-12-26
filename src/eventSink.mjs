/**
 * Create a super simple event sink
 * @param subscriptions container for the event subscriptions in the current context
 */
export default function eventSink(subscriptions) {
    function subscribe(eventName, callback) {
        subscriptions[eventName] = subscriptions[eventName] || [];
        const eventSubscriptions = subscriptions[eventName];
        eventSubscriptions.push(callback);
        // return an unsubscribe function
        return () => eventSubscriptions.splice(eventSubscriptions.indexOf(callback));
    }

    function publish(eventName, payload) {
        const eventSubscriptions = subscriptions[eventName] || [];
        eventSubscriptions.forEach((callback) => callback(payload));
    }

    return [subscribe, publish];
}
