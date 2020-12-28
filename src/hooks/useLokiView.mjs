import { useLayoutEffect, useReducer } from 'react';
import db from '../services/persistence/database.mjs';
import throttle from 'lodash.throttle';

/**
 * Similar to useSelector from react-redux but with a loki backing store
 * https://github.com/reduxjs/react-redux/blob/96bf941751a8460c5cf64027348f05d332e19a20/src/hooks/useSelector.js
 * @param collectionName The loki collection
 * @param viewName The name of the dynamic view in loki
 * @param viewCriteria MongoDB find syntax
 */
export default function useLokiView(collectionName, viewName, viewCriteria) {
    // Trick to force a new render when loki reports a change to the view
    const [, forceRender] = useReducer((s) => s + 1, 0);
    const collection = db.getCollection(collectionName);
    let view = collection.getDynamicView(viewName);
    // Lazy creation of dynamic view.
    if (!view) {
        view = collection.addDynamicView(viewName);
        view.applyFind(viewCriteria);
    }
    useLayoutEffect(() => {
        // Throttle renders - may need to revisit for something like an
        // import of a file which could create many dynamic view rebuilds
        const onRebuild = throttle(() => forceRender(), 250);
        view.addListener('rebuild', onRebuild);
        return () => view.removeListener('rebuild', onRebuild);
    }, []);
    return [view.data()];
}
