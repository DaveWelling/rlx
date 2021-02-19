import React from 'react';
import styled from 'styled-components';
import useLokiView from '../hooks/useLokiView.mjs';
import useEventSink from '../hooks/useEventSink.mjs';
import { View, h3, List } from './primitives.mjs';
const rc = React.createElement;

const StyledGrid = styled(View).attrs({ name: 'StyledGrid' })`
    background-color: black;
    padding-top: 2px;
    padding-bottom: 2px;
    border-style: solid;
    border-width: thin;
    border-color: rgba(255, 255, 255, 0.1);
    flex-grow: 1;
    flex-direction: column;
`;
const GridTitle = styled(h3)`
    margin: 6px;
    color: rgba(255, 255, 255, 0.8);
`;

const GridBody = styled(View).attrs({ name: 'GridBody' })`
    margin-left: 16px;
    margin-right: 8px;
    margin-bottom: 8px;
    min-height: 100px;
    flex-grow: 1;
`;

function Grid({ recordType, title }) {
    const [data, itemCount] = useLokiView(recordType, `${recordType}_default`);
    const [, publish] = useEventSink();
    function onClick(_id) {
        publish(`edit_${recordType}`, _id);
    }
    // prettier-ignore
    return rc(StyledGrid, null,
        rc(GridTitle, null, title),
        rc(GridBody, null,
            rc(List, { name: 'List', data, itemCount, onClick })
        )
    );
}
Grid.whyDidYouRender = true;

export default Grid;
