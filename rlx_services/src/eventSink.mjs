let shouldLogEvents = false;
export function logEvents(enable) {
    shouldLogEvents = enable;
}
/**
 * Create a super simple event sink
 * @param subscriptions container for the event subscriptions in the current context
 */
export default function eventSink({ subscriptions, logEvents = false }) {
    shouldLogEvents = logEvents;
    function subscribe(eventName, callback) {
        subscriptions[eventName] = subscriptions[eventName] || [];
        const eventSubscriptions = subscriptions[eventName];
        eventSubscriptions.push(callback);
        // return an unsubscribe function
        return () => eventSubscriptions.splice(eventSubscriptions.indexOf(callback));
    }

    function publish(eventName, payload) {
        if (shouldLogEvents) {
            console.info(
                `type: ${eventName}, payload: ${
                    typeof payload === 'object' ? JSON.stringify(payload, null, 3) : payload
                }`
            );
        }
        const eventSubscriptions = subscriptions[eventName] || [];
        eventSubscriptions.forEach((callback) => callback(payload));
    }

    return [subscribe, publish];
}
