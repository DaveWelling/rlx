import { useLayoutEffect, useReducer, useRef } from 'react';
import db from '../services/persistence/database.mjs';
import throttle from 'lodash.throttle';
import cuid from 'cuid';
import isEqual from 'lodash.isequal';

/**
 * Similar to useSelector from react-redux but with a loki backing store
 * https://github.com/reduxjs/react-redux/blob/96bf941751a8460c5cf64027348f05d332e19a20/src/hooks/useSelector.js
 * @param collectionName The loki collection
 * @param viewName The name of the dynamic view in loki
 * @param viewCriteria MongoDB find syntax
 */
export default function useLokiView(collectionName, viewName, viewCriteria) {
    // Default sort to _id so that (in the absence of another sort)
    // paging is still consistent and fast
    const { find, sort = '_id', pageSize, page } = viewCriteria || {};
    // Trick to force a new render when loki reports a change to the view
    const [, forceRender] = useReducer(s => s + 1, 0);
    const collection = db.getCollection(collectionName);
    let view = collection.getDynamicView(viewName);
    // Lazy creation of dynamic view.
    if (!view) {
        view = collection.addDynamicView(viewName);
    }
    ensureIndexIfPaging(view, viewCriteria);
    applySort(view, sort);
    applyFind(view, find);
    useLayoutEffect(() => {
        // Throttle renders - may need to revisit for something like an
        // import of a file which could create many dynamic view rebuilds
        const onRebuild = throttle(() => forceRender(), 250);
        view.addListener('rebuild', onRebuild);
        return () => {
            view.removeListener('rebuild', onRebuild);
            onRebuild.cancel();
        };
    }, []);
    return getPage(view, viewCriteria);
}

function getPage(view, viewCriteria) {
    const { find, sort, pageSize, page = 0 } = viewCriteria || {};
    if (pageSize == null) return [view.data(), view.count(), view];

    if (view.sortDirty || view.resultsdirty) {
        view.performSortPhase({
            suppressRebuildEvent: true
        });
    }
    const resultSet = view.branchResultset('pagingTransform', {
        pageSize,
        pageStart: pageSize * page
    });
    const rsdata = resultSet.data();
    return [rsdata, view.count(), view];
}

function ensureIndexIfPaging(view, viewCriteria) {
    const { sort = '_id', pageSize } = viewCriteria || {};
    if (pageSize == null) return;
    if (view.collection.transforms.pagingTransform == null) {
        view.collection.addTransform('pagingTransform', [
            { type: 'offset', value: '[%lktxp]pageStart' },
            { type: 'limit', value: '[%lktxp]pageSize' }
        ]);
    }
    if (view.collection.binaryIndices[sort] == null) {
        view.collection.ensureIndex(sort);
    }
}

function applySort(view, sort) {
    if (sort == null) return;
    if (view.sortCriteriaSimple == null || view.sortCriteriaSimple.propname !== sort) {
        view.applySimpleSort(sort);
    }
}

function applyFind(view, find) {
    let existingFind = view.filterPipeline.filter(f => f.type === 'find');
    if (existingFind.length) {
        // Same criteria, leave without changing anything
        if (isEqual(existingFind[0].val, find)) return;
        // Different criteria, remove the old one.
        view.removeFilter(existingFind[0].uid);
    }
    // If an undefined, null or empty criteria is given then we are done.
    if (find == null || isEmptyObject(find)) return;
    // ensure mutation of criteria outside this function does not
    // break the logic above on rerenders, etc.
    let newCriteria = { ...find };
    // filter the view
    view.applyFind(newCriteria, cuid());
}

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
