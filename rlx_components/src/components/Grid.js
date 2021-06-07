import React, { useCallback } from 'react';
import styled from 'styled-components';
import useLokiView from '../hooks/useLokiView';
import useEventSink from '../hooks/useEventSink';
import { View, h3, List, Text, fromTheme } from 'rlx_primitives';
const rc = React.createElement;

const StyledGrid = styled(View).attrs({ name: 'StyledGrid' })`
    padding-top: 2px;
    padding-bottom: 2px;
    border: none;
    flex-grow: 1;
    flex-direction: column;
`;
const GridTitle = styled(h3)`
    margin: 6px;
    color: ${({ theme }) => theme.defaultFontColor};
`;

const GridBody = styled(View).attrs({ name: 'GridBody' })`
    margin-left: 16px;
    margin-right: 8px;
    margin-bottom: 8px;
    min-height: 100px;
    flex-grow: 1;
`;

const Row = styled(Text)`
    background-color: ${({ theme }) => theme.backgroundColor};
    text-align: center;
    height: ${fromTheme('listLineHeight')};
    line-height: ${fromTheme('listLineHeight')};
    border-color: transparent;
    border-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: gray;
`;

const RowDetail = ({ item }) => rc(Text, null, item.title);

function Grid({ recordType, title }) {
    const [data, itemCount] = useLokiView(recordType, `${recordType}_default`);
    const [, publish] = useEventSink();

    // useCallback avoids rerenders of List
    const onClick = useCallback(
        item => {
            publish(`edit_${recordType}`, item._id);
        },
        [recordType]
    );

    // prettier-ignore
    return rc(StyledGrid, {name: 'grid'},
        title && title.length && rc(GridTitle, {name: 'grid-title'}, title),
        rc(GridBody, {name: 'grid-body'},
            rc(List, { data, itemCount, onClick, Row, RowDetail })
        )
    );
}
Grid.whyDidYouRender = true;

export default Grid;
