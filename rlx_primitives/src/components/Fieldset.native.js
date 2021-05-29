import react from 'react';
import styled from 'styled-components';
import View from './View';
import { ScrollView } from 'react-native';
import fromTheme from '../fromTheme';

const { createElement: rc } = react;

const FieldSetStyle = styled(View).attrs({ name: 'fieldset' })`
    padding: ${fromTheme('viewPadding')};
    margin: 4px 8px 4px 8px;
    border: none;
    background-color: ${fromTheme('backgroundColor')};
    flex-grow: 1;
    flex-shrink: 1;
`;

export default function FieldSet(props) {
    const { children, ...otherProps } = props;
    return rc(FieldSetStyle, otherProps, rc(ScrollView, null, children));
}
