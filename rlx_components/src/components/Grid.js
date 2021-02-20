import React from 'react';
import styled from 'styled-components';
import useLokiView from '../hooks/useLokiView';
import useEventSink from '../hooks/useEventSink';
import { View, h3, List, Text } from './primitives';
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

const Row = styled(Text)`
    border: none;
    border-bottom: gray thin solid;
    background-color: rgba(255, 255, 255, 0.1);
    text-align: center;
    cursor: pointer;
    line-height: 33px;
    height: 35px;
`;

const ItemRenderer = ({ data, index, style }) => {
    const { items, onClick } = data;
    return rc(
        Row,
        {
            name: 'grid-row',
            id: items[index]._id,
            key: items[index]._id,
            'data-id': items[index]._id,
            onClick: e => onClick(e.target.dataset.id),
            style
        },
        items[index].title
    );
};

function Grid({ recordType, title }) {
    const [items, itemCount] = useLokiView(recordType, `${recordType}_default`);
    const [, publish] = useEventSink();
    function onClick(_id) {
        publish(`edit_${recordType}`, _id);
    }
    // prettier-ignore
    return rc(StyledGrid, null,
        rc(GridTitle, null, title),
        rc(GridBody, null,
            rc(List, { itemData: {items, onClick}, itemCount, ItemRenderer })
        )
    );
}
Grid.whyDidYouRender = true;

export default Grid;
