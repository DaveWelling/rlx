import react from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
const rc = react.createElement;

export default function List(props) {
    const { itemCount, itemData, ItemRenderer } = props;
    return rc(AutoSizer, { name: 'auto-sizer' }, ({ height, width }) =>
        rc(
            FixedSizeList,
            {
                name: 'List',
                style: { overflowX: 'hidden' },
                height,
                width,
                itemCount,
                itemSize: 35,
                itemData
            },
            ItemRenderer
        )
    );
}
