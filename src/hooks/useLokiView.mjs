import { useEffect, useState } from 'react';
import db from '../persistence/database.mjs';
import throttle from 'lodash.throttle';
export default (collectionName, viewName, viewCriteria) => {
    let collection = db.getCollection(collectionName);
    let view = collection.getDynamicView(viewName);
    if (!view) {
        view = collection.addDynamicView(viewName);
        view.applyFind(viewCriteria);
    }
    let [viewData, setViewData] = useState(view.data());
    useEffect(() => {
        const onRebuild = throttle((view) => setViewData(view.data()), 100);
        view.addListener('rebuild', onRebuild);
    }, []);
    return viewData;
};
