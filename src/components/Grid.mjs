import React from 'react';
import styled from 'styled-components';
import useLokiView from '../hooks/useLokiView.mjs';
import useEventSink from '../hooks/useEventSink.mjs';

const rc = React.createElement;

const Grid = styled.div`
    background-color: black;
    padding-top: 2px;
    padding-bottom: 2px;
    border: solid thin rgba(255, 255, 255, 0.1);
`;
const Row = styled.p`
    margin: 2px;
    border: solid thin black;
    padding: 2px;
    background-color: rgba(255, 255, 255, 0.1);
    text-align: center;
    cursor: pointer;
`;

export default ({ recordType }) => {
    const [data] = useLokiView(recordType, `${recordType}_default`, {});
    const [, publish] = useEventSink();
    function onClick(e) {
        publish(`edit_${recordType}`, e.target.dataset.id);
    }
    // prettier-ignore
    return rc(Grid, null,
        data.map((w) =>rc(Row, { id: w._id, 'data-id': w._id, onClick }, w.title))
    );
};
