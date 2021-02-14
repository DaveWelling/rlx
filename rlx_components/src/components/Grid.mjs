import React from 'react';
import styled from 'styled-components';
import useLokiView from '../hooks/useLokiView.mjs';
import useEventSink from '../hooks/useEventSink.mjs';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

const rc = React.createElement;

const StyledGrid = styled.div`
    background-color: black;
    padding-top: 2px;
    padding-bottom: 2px;
    border: solid thin rgba(255, 255, 255, 0.1);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;
const Row = styled.p`
    border: none;
    border-bottom: gray thin solid;
    background-color: rgba(255, 255, 255, 0.1);
    text-align: center;
    cursor: pointer;
    line-height: 33px;
    height: 35px;
`;
const GridTitle = styled.h3`
    margin: 6px;
    color: rgba(255, 255, 255, 0.8);
`;

const GridBody = styled.div`
    margin-left: 16px;
    margin-right: 8px;
    margin-bottom: 8px;
    min-height: 100px;
    flex-grow: 1;
`;

function Grid({ recordType, title }) {
    const [data, itemCount] = useLokiView(recordType, `${recordType}_default`);
    const [, publish] = useEventSink();
    function onClick(e) {
        publish(`edit_${recordType}`, e.target.dataset.id);
    }
    // prettier-ignore
    return rc(StyledGrid, {name: 'grid'},
        rc(GridTitle, {name: 'grid-title'}, title),
        rc(GridBody, {name: 'grid-body'},
            rc(AutoSizer, {name: 'auto-sizer'}, ({height, width})=>
                rc(List, {
                    name: 'list',
                    style: {overflowX: 'hidden'},
                    height,
                    width,
                    itemCount,
                    itemSize: 35
                },
                    ({index, style}) =>{
                        return rc(Row, { name: 'grid-row', id: data[index]._id, key: data[index]._id, 'data-id': data[index]._id, onClick, style }, data[index].title);
                    }
                )
            )

        )
    );
}
Grid.whyDidYouRender = true;

export default Grid;
