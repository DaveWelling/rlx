/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text } from 'react-native';

import styled from 'styled-components';
const rc = React.createElement;

const TopView = styled.View({
    backgroundColor: 'black',
    color: 'white',
    height: '100%'
});
const DefaultText = styled.Text`
    color: white;
`;
export default function App() {
    return rc(TopView, null, rc(DefaultText, null, 'hello world'));
}
