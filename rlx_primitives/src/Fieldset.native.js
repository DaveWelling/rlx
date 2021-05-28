import react from 'react';
import styled from 'styled-components';
import View from './View';
import { ScrollView } from 'react-native';

const { createElement: rc } = react;

const FieldSetStyle = styled(View).attrs({ name: 'fieldset' })`
    padding: 6px;
    margin: 4px 8px 4px 8px;
    border-radius: 2px;
    border: none;
    background-color: ${({ theme }) => theme.backgroundColor};
    flex-grow: 1;
    flex-shrink: 1;
`;

export default function FieldSet(props) {
    const { children, ...otherProps } = props;
    return rc(FieldSetStyle, otherProps, rc(ScrollView, null, children));
}
