import { useEffect, useState } from 'react';
import db from '../persistence/database.mjs';
import throttle from 'lodash.throttle';
const upsert = {};
export default (collectionName, viewName, viewCriteria) => {
    const collection = db.getCollection(collectionName);
    let view = collection.getDynamicView(viewName);
    if (!view) {
        upsert[collectionName] = (record) => {
            const dbEntry = collection.by('_id', record._id);
            if (!dbEntry) {
                collection.insert(record);
            } else {
                collection.update({
                    ...dbEntry,
                    ...record,
                });
            }
        };
        view = collection.addDynamicView(viewName);
        view.applyFind(viewCriteria);
    }
    let [viewData, setViewData] = useState(view.data());
    useEffect(() => {
        const onRebuild = throttle((view) => setViewData(view.data()), 100);
        view.addListener('rebuild', onRebuild);
    }, []);
    return [viewData, upsert[collectionName]];
};
