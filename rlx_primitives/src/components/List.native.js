import react from 'react';
import styled, { ThemeContext } from 'styled-components';
import reactNative from 'react-native';
import View from './View';
import DropShadow from 'react-native-drop-shadow';

const { FlatList } = reactNative;

const { Fragment, createElement: rc, useContext } = react;

const BoundedFlatList = styled(FlatList).attrs({
    name: 'BoundedFlatList',
    initialNumToRender: 12
})`
    flex-grow: 0;
    flex: 1;
`;

const ItemRenderer = props => {
    const {
        item,
        onClick,
        Row,
        highlightedIndex,
        selectedItem,
        getItemProps,
        index,
        theme,
        RowDetail
    } = props;
    let rowProps = {
        name: 'list-row',
        onPress: () => {
            onClick(item);
        }
    };

    // if getItemProps is passed, it means this is a dropdown list created using downshift.
    // Downshift wants to add additional properties.
    if (getItemProps != null) {
        rowProps = {
            ...rowProps,
            ...getItemProps({
                item,
                index,
                isActive: highlightedIndex === index,
                isSelected: selectedItem === item
            })
        };
    }

    return rc(
        Row,
        rowProps,
        rc(RowDetail, {
            item,
            theme
        })
    );
};

export default props => {
    const {
        data,
        onClick,
        Row,
        RowDetail,
        highlightedIndex,
        selectedItem,
        getItemProps
    } = props;
    const theme = useContext(ThemeContext);
    // prettier-ignore
    return rc(Fragment, null,
        rc(BoundedFlatList, {
            style: {height: '100%', width: '100%'},
            name: 'list',
            data,
            renderItem: ({ item, index }) => rc(ItemRenderer, {item, onClick, Row, highlightedIndex, selectedItem, getItemProps, index, theme, RowDetail}),
            keyExtractor: item => item._id
        }),
        // Shadow = Scroll Hint for top
        // Box Shadows don't work very well on react-native, so using
        // react-native-drop-shadow component here.
        rc(DropShadow, {style: {
            width: '100%',
            position: 'absolute',
            top: 0,
            shadowColor: 'white',
            shadowOpacity: .3,
            shadowOffset: { width: 0, height: 3},
            shadowRadius: 3
          }},
          rc(View, {style:{height: 2, backgroundColor: 'gray'}})
        ),
        // Shadow = Scroll hint for bottom
        rc(DropShadow, {style: {
            width: '100%',
            position: 'absolute',
            bottom: 0,
            shadowColor: 'white',
            shadowOpacity: .3,
            shadowOffset: { width: 0, height: -3},
            shadowRadius: 3
          }},
          rc(View, {style:{height: 2, backgroundColor: 'white'}})
        )
    );
};
