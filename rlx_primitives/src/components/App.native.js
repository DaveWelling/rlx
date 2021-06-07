import { createElement } from 'react';
import styled from 'styled-components';
import { Platform, KeyboardAvoidingView } from 'react-native';
import GestureRecognizer from './GestureRecognizer';
const rc = createElement;

const BaseApp = styled(KeyboardAvoidingView).attrs({
    name: 'App',
    behavior: Platform.OS === 'ios' ? 'padding' : 'height'
})`
    flex: 1;
    background-color: ${({ theme }) => theme.baseBackgroundColor};
    color: white;
    height: 100%;
    flex-direction: column;
    align-items: ${props => (props.theme.mobile ? 'stretch' : 'flex-start')};
    font-family: Arial;
`;

export default function App(props) {
    // prettier-ignore
    return rc(GestureRecognizer, null,
        rc(BaseApp, null, props.children)
    );
}
