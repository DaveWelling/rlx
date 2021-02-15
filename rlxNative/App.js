import React from 'react';
import { View } from 'react-native';
import { Text } from 'rlx_native-primitives';

import styled from 'styled-components';
const rc = React.createElement;

const TopView = styled.View({
    backgroundColor: 'black',
    color: 'white',
    height: '100%'
});

export default function App() {
    return rc(TopView, null, rc(Text, null, 'hello world'));
}
