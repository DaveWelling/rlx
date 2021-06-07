import styled from 'styled-components';
import View from './View';
import fromTheme from '../fromTheme';
import { useEffect, createElement, createContext, useRef } from 'react';
const rc = createElement;

export const GestureContext = createContext();

const BaseApp = styled(View).attrs({ name: 'App', scroll: true })`
    background-color: ${({ theme }) => theme.baseBackgroundColor};
    color: ${({ theme }) => theme.defaultFontColor};
    height: 100%;
    flex-direction: column;
    align-items: ${props => (props.theme.mobile ? 'stretch' : 'flex-start')};
    font-family: ${fromTheme('font')};
`;

export default function App(props) {
    const { onSwipeLeft, onSwipeRight, children } = props;
    // prettier-ignore
    return rc(GestureRecognizer, {
            onSwipeLeft,
            onSwipeRight
        },
        rc(BaseApp, null, children)
    );
}

function GestureRecognizer(props) {
    let xDown = null;
    let yDown = null;

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

    // https://stackoverflow.com/a/30192291/1356444
    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    }

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }
        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;
        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            /*most significant*/
            if (xDiff > 0) {
                /* left swipe */
                swipeLefts.current.forEach(callback => callback());
            } else {
                /* right swipe */
                swipeRights.current.forEach(callback => callback());
            }
        } else {
            if (yDiff > 0) {
                /* up swipe */
                swipeUps.current.forEach(callback => callback());
            } else {
                /* down swipe */
                swipeDowns.current.forEach(callback => callback());
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    }
    useEffect(() => {
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);
    return rc(
        GestureContext.Provider,
        { value: { onSwipeDown, onSwipeLeft, onSwipeRight, onSwipeUp } },
        props.children
    );
}
