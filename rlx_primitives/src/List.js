import react from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled, { ThemeContext } from 'styled-components';
import View from './View';

const { createElement: rc, useContext } = react;

const BottomScrollHint = styled(View)`
    overflow: hidden;
    position: absolute;
    bottom: 0;
    margin-bottom: -19px;
    z-index: 1;
    width: 100%;
    height: 18px;
    box-shadow: 0px -8px 18px 3px rgba(255, 255, 255, 0.08);
`;
const TopScrollHint = styled(View)`
    overflow: hidden;
    position: absolute;
    top: 0;
    margin-top: -19px;
    z-index: 1;
    width: 100%;
    height: 18px;
    box-shadow: 0px 8px 18px 3px rgba(255, 255, 255, 0.08);
`;

const ItemRenderer = ({ data, index, style }) => {
    const {
        items,
        onClick,
        Row,
        RowDetail,
        highlightedIndex,
        selectedItem,
        getItemProps,
        theme
    } = data;
    // Most of these properties are used by the FixedSizedList to control what is rendered
    // in the list's visible area.
    const item = items[index];
    let rowProps = {
        name: 'list-row',
        id: item._id,
        key: item._id,
        'data-id': item._id,
        onClick: e => onClick(item),
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
    return rc(Row, rowProps, rc(RowDetail, { item: items[index], theme, onClick }));
};

export default function List(props) {
    const {
        itemCount,
        data: items,
        Row,
        RowDetail,
        onClick,
        highlightedIndex,
        selectedItem,
        getItemProps,
        style: listStyle,
        itemHeightPixels
    } = props;
    const theme = useContext(ThemeContext);
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
                    itemSize: itemHeightPixels ?? theme.listLineHeightPixels,
                    // Fixed Size List expects 'itemData' to include any data needed by the item renderer
                    itemData: {items, onClick, Row, RowDetail, theme, selectedItem, highlightedIndex, getItemProps}
                },
                ItemRenderer
            )
        ),
        rc(BottomScrollHint)
    );
}
