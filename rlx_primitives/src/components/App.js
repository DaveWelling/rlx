import styled from 'styled-components';
import View from './View';
import fromTheme from '../fromTheme';
import GestureRecognizer from './GestureRecognizer';
import { createElement } from 'react';
const rc = createElement;

const BaseApp = styled(View).attrs({ name: 'App', scroll: true })`
    background-color: ${({ theme }) => theme.baseBackgroundColor};
    color: ${({ theme }) => theme.defaultFontColor};
    height: 100%;
    flex-direction: column;
    align-items: ${props => (props.theme.mobile ? 'stretch' : 'flex-start')};
    font-family: ${fromTheme('font')};
`;

export default function App(props) {
    // prettier-ignore
    return rc(GestureRecognizer, null ,
        rc(BaseApp, null, props.children)
    );
}
