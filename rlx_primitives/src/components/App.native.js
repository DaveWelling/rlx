import { createElement, createContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { Platform, KeyboardAvoidingView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
const rc = createElement;

export const GestureContext = createContext();

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
    // prettier-ignore
    return rc(ContextProvidingGestureRecognizer, null,
        rc(BaseApp, null, props.children)
    );
}

function ContextProvidingGestureRecognizer(props) {
    const swipeLefts = useRef([]);
    const swipeRights = useRef([]);
    const swipeUps = useRef([]);
    const swipeDowns = useRef([]);

    function onSwipeLeft(callback) {
        swipeLefts.current.push(callback);
        return () => swipeLefts.current.splice(swipeLefts.current.indexOf(callback));
    }
    function onSwipeRight(callback) {
        swipeRights.current.push(callback);
        return () => swipeRights.current.splice(swipeRights.current.indexOf(callback));
    }
    function onSwipeUp(callback) {
        swipeUps.current.push(callback);
        return () => swipeUps.current.splice(swipeUps.current.indexOf(callback));
    }
    function onSwipeDown(callback) {
        swipeDowns.current.push(callback);
        return () => swipeDowns.current.splice(swipeDowns.current.indexOf(callback));
    }

    function swipeLeft() {
        swipeLefts.current.forEach(callback => callback());
    }

    function swipeRight() {
        swipeRights.current.forEach(callback => callback());
    }

    function swipeUp() {
        swipeUps.current.forEach(callback => callback());
    }

    function swipeDown() {
        swipeDowns.current.forEach(callback => callback());
    }

    // prettier-ignore
    return rc(GestureContext.Provider,{
            value: { onSwipeDown, onSwipeLeft, onSwipeRight, onSwipeUp }
        },
        rc(GestureRecognizer, {
                style: { height: '100%', width: '100%' },
                onSwipeLeft: swipeLeft,
                onSwipeRight: swipeRight,
                onSwipeUp: swipeUp,
                onSwipeDown: swipeDown,
                config: swipeConfig
            },
            props.children
        )
    );
}
