import react from 'react';
import styled from 'styled-components';
import reactNative from 'react-native';
import View from './View';
import DropShadow from 'react-native-drop-shadow';

const { FlatList } = reactNative;

const { Fragment, createElement: rc } = react;

const BoundedFlatList = styled(FlatList).attrs({ name: 'BoundedFlatList' })`
    flex-grow: 0;
    flex: 1;
`;

const ItemRenderer = (
    item,
    onClick,
    Row,
    children,
    highlightedIndex,
    selectedItem,
    getItemProps
) => {
    if (Array.isArray(children)) {
        throw new Error(
            "You've passed an array for children, but only one component is allowed for RowDetail (children) of a List.  Maybe enclose your components in a container component."
        );
    }
    let rowProps = {
        name: 'grid-row',
        onPress: () => {
            onClick(item._id);
        }
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

    return rc(Row, rowProps, children(item));
};

export default props => {
    const { data, onClick, Row, children, highlightedIndex, selectedItem, getItemProps } =
        props;
    // prettier-ignore
    return rc(Fragment, null,
        rc(BoundedFlatList, {
            style: {height: '100%', width: '100%'},
            name: 'list',
            data,
            renderItem: ({ item }) => ItemRenderer(item, onClick, Row, children, highlightedIndex, selectedItem, getItemProps),
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
          rc(View, {style:{height: 2, backgroundColor: 'white'}})
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
