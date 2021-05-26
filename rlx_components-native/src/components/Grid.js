import React from 'react';
import styled from 'styled-components';
import useLokiView from '../hooks/useLokiView';
import useEventSink from '../hooks/useEventSink';
import { View, h3, List, Text } from 'rlx_primitives';
const rc = React.createElement;

const StyledGrid = styled(View).attrs({ name: 'StyledGrid' })`
    background-color: black;
    padding-top: 2px;
    padding-bottom: 2px;
    border-style: solid;
    border-width: 1px;
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

const Row = styled(Text)`
    background-color: rgba(255, 255, 255, 0.1);
    text-align: center;
    height: 36px;
    line-height: 36px;
    border-color: transparent;
    border-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: gray;
`;

const RowDetail = ({ item }) => rc(Text, null, item.title);

function Grid({ recordType, title }) {
    const [data, itemCount] = useLokiView(recordType, `${recordType}_default`);
    const [, publish] = useEventSink();
    function onClick(item) {
        publish(`edit_${recordType}`, item._id);
    }
    // prettier-ignore
    return rc(StyledGrid, {name: 'grid'},
        rc(GridTitle, {name: 'grid-title'}, title),
        rc(GridBody, {name: 'grid-body'},
            rc(List, { data, itemCount, onClick, Row, RowDetail })
        )
    );
}
Grid.whyDidYouRender = true;

export default Grid;
