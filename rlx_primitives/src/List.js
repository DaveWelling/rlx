import react from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled from 'styled-components';
import View from './View';

const { createElement: rc, useCallback } = react;

const BottomScrollHint = styled(View)`
    overflow: hidden;
    position: absolute;
    bottom: 0;
    margin-bottom: -18px;
    z-index: 1;
    width: 100%;
    height: 18px;
    box-shadow: 0px -8px 18px 3px rgba(0, 0, 0, 0.75);
`;
const TopScrollHint = styled(View)`
    overflow: hidden;
    position: absolute;
    top: 0;
    margin-top: -18px;
    z-index: 1;
    width: 100%;
    height: 18px;
    box-shadow: 0px 8px 18px 3px rgba(0, 0, 0, 0.75);
`;

const ItemRenderer = (
    data,
    index,
    style,
    Row,
    children,
    highlightedIndex,
    selectedItem,
    getItemProps
) => {
    const { items, onClick } = data;
    if (Array.isArray(children)) {
        throw new Error(
            "You've passed an array for children, but only one component is allowed for RowDetail (children) of a List.  Maybe enclose your components in a container component."
        );
    }
    // Most of these properties are used by the FixedSizedList to control what is rendered
    // in the list's visible area.
    const item = items[index];
    let rowProps = {
        name: 'grid-row',
        id: item._id,
        key: item._id,
        'data-id': item._id,
        onClick: e => onClick(e.target.dataset.id),
        style
    };
    // if getItemProps is passed, it means this is a dropdown list created using downshift.
    // Downshift wants to add additional properties.
    if (getItemProps != null) {
        rowProps = {
            ...rowProps,
            ...getItemProps({
                style,
                item: items[index],
                index,
                isActive: highlightedIndex === index,
                isSelected: selectedItem === item
            })
        };
    }
    return rc(Row, rowProps, children(items[index]));
};

export default function List(props) {
    const {
        itemCount,
        data: items,
        Row,
        children,
        onClick,
        highlightedIndex,
        selectedItem,
        getItemProps,
        style: listStyle
    } = props;

    const wrappedItemRenderer = useCallback(
        ({ data, index, style }) =>
            ItemRenderer(
                data,
                index,
                style,
                Row,
                children,
                highlightedIndex,
                selectedItem,
                getItemProps
            ),
        [Row, children]
    );
    // prettier-ignore
    return rc(View, {style: {width: '100%', overflow: 'hidden', ...listStyle}},
        rc(TopScrollHint),
        rc(AutoSizer, { name: 'auto-sizer' }, ({ height, width }) =>
            rc(
                FixedSizeList,
                {
                    name: 'List',
                    style: { overflowX: 'hidden' },
                    height,
                    width,
                    itemCount,
                    itemSize: 35,
                    // Fixed Size List expects 'itemData' to include any data neeed by the item renderer
                    // In our case, the item renderer is wrapped below
                    itemData: {items, onClick}
                },
                wrappedItemRenderer
            )
        ),
        rc(BottomScrollHint)
    );
}
