import { createElement } from 'react';
import styled from 'styled-components';
import { Platform, KeyboardAvoidingView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

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

const swipeConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 50
};

export default function App(props) {
    const { onSwipeLeft, onSwipeRight, children } = props;
    // prettier-ignore
    return rc(GestureRecognizer, {
            style:{height: '100%', width: '100%'},
            onSwipeLeft,
            onSwipeRight,
            config: swipeConfig
        },
        rc(BaseApp, null, children)
    );
}
