import react from 'react';
import styled from 'styled-components';
import Text from './Text';
import reactNative from 'react-native';
const FlatList = reactNative.FlatList;

const rc = react.createElement;

const Row = styled(Text)`
    background-color: rgba(255, 255, 255, 0.1);
    text-align: center;
    height: 36px;
    line-height: 36px;
    border-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: gray;
`;

const BoundedFlatList = styled(FlatList).attrs({ name: 'BoundedFlatList' })`
    flex-grow: 0;
    flex: 1;
`;

export default props => {
    const { data, onClick } = props;
    return rc(BoundedFlatList, {
        name: 'list',
        data,
        renderItem: ({ item }) => {
            return rc(
                Row,
                {
                    name: 'grid-row',
                    onPress: () => {
                        onClick(item._id);
                    }
                },
                item.title
            );
        },
        keyExtractor: item => item._id
    });
};
