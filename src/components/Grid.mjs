import React from 'react';
import styled from 'styled-components';
import useLokiView from '../hooks/useLokiView.mjs';
import useEventSink from '../hooks/useEventSink.mjs';

const rc = React.createElement;

const StyledGrid = styled.div`
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
const GridTitle = styled.h3`
    margin: 6px;
    color: rgba(255, 255, 255, 0.8);
`;

const GridBody = styled.div`
    margin-left: 16px;
`;

function Grid({ recordType, title }) {
    const [data] = useLokiView(recordType, `${recordType}_default`, {});
    const [, publish] = useEventSink();
    function onClick(e) {
        publish(`edit_${recordType}`, e.target.dataset.id);
    }
    // prettier-ignore
    return rc(StyledGrid, null,
        rc(GridTitle, null, title),
        rc(GridBody, null,
            data.map((w) =>rc(Row, { id: w._id, key: w._id, 'data-id': w._id, onClick }, w.title))
        )
    );
}
Grid.whyDidYouRender = true;

export default Grid;
