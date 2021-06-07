import React, { useLayoutEffect, useState, useContext, useRef } from 'react';
import styled, { ThemeContext, keyframes } from 'styled-components';
import fromTheme from '../fromTheme';
import View from './View';
import PropTypes from 'prop-types';

const rc = React.createElement;
const open = props => keyframes`
    0% {
        transform: translateX(${props.closedPosition + 'px'});
        box-shadow: none;
    }
    100% {
        transform: translateX(${props.openPosition + 'px'});
    }
`;
const closed = props => keyframes`
    0% {
        transform: translateX(${props.openPosition + 'px'});
    }
    100% {
        transform: translateX(${props.closedPosition + 'px'});
        box-shadow: none;
    }
`;

const SideNavStyled = styled.div`
    top: 0;
    position: absolute;
    height: ${({ theme }) => theme.height + 'px'};
    z-index: 2;
    width: ${({ theme }) => theme.width + 'px'};
    left: ${({ theme }) => theme.width * -1 + 'px'};
    background-color: ${fromTheme('baseBackgroundColor')};
    box-shadow: 10px 0px 24px 0px ${fromTheme('boxShadowColor')};
    animation: ${props => (props.open ? open(props) : closed(props))}
        ${({ animationTime }) => animationTime + 'ms'} linear forwards;
`;

function MenuDrawer(props) {
    const { drawerPercentage, animationTime, position = 'left', open, children } = props;
    const theme = useContext(ThemeContext);
    const SCREEN_WIDTH = theme.width;
    const isLeftPosition = position === 'left';
    const DRAWER_WIDTH = SCREEN_WIDTH * (drawerPercentage / 100);

    const openPosition = isLeftPosition ? DRAWER_WIDTH : SCREEN_WIDTH;
    const closedPosition = isLeftPosition ? 0 : SCREEN_WIDTH + DRAWER_WIDTH;

    // prettier-ignore
    return rc(SideNavStyled, { openPosition, closedPosition, open, animationTime },
        children
    );
}
MenuDrawer.whyDidYouRender = true;
MenuDrawer.defaultProps = {
    open: false,
    drawerPercentage: 75,
    animationTime: 150,
    position: 'left'
};

MenuDrawer.propTypes = {
    open: PropTypes.bool,
    drawerPercentage: PropTypes.number,
    animationTime: PropTypes.number,
    position: PropTypes.oneOf(['left', 'right'])
};

export default MenuDrawer;
