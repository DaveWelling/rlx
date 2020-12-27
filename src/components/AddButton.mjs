import { createElement } from 'react';
// import useLokiView from '../hooks/useLokiView.mjs';
// import cuid from 'cuid';
import useEventSink from '../hooks/useEventSink.mjs';

const rc = createElement;

export default ({ recordType }) => {
    //const [, upsert] = useLokiView(recordType, `${recordType}_default`, {});
    const [, publish] = useEventSink();

    const addRecord = () => {
        // const title = `title ${new Date().toISOString()}`;
        // const newRecord = { _id: cuid(), title };
        // upsert(newRecord);
        publish(`new_${recordType}`);
    };

    return rc('input', { type: 'button', value: 'Add one', onClick: addRecord });
};
