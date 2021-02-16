import react from 'react';
import styled from 'styled-components';
import Text from './Text.mjs';
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

export default props => {
    const { data, onClick } = props;
    return rc(FlatList, {
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