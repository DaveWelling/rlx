import react from 'react';
import styled from 'styled-components';
import Text from './Text.mjs';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
const rc = react.createElement;

const Row = styled(Text)`
    border: none;
    border-bottom: gray thin solid;
    background-color: rgba(255, 255, 255, 0.1);
    text-align: center;
    cursor: pointer;
    line-height: 33px;
    height: 35px;
`;

export default props => {
    const { itemCount, data, onClick } = props;
    return rc(AutoSizer, { name: 'auto-sizer' }, ({ height, width }) =>
        rc(
            List,
            {
                name: 'list',
                style: { overflowX: 'hidden' },
                height,
                width,
                itemCount,
                itemSize: 35
            },
            ({ index, style }) => {
                return rc(
                    Row,
                    {
                        name: 'grid-row',
                        id: data[index]._id,
                        key: data[index]._id,
                        'data-id': data[index]._id,
                        onClick: e => onClick(e.target.dataset.id),
                        style
                    },
                    data[index].title
                );
            }
        )
    );
};
