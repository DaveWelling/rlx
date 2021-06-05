import React, { useEffect, useRef, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

const rc = React.createElement;

function MenuDrawer(props) {
    const { drawerPercentage, animationTime, position = 'left', open, children } = props;
    const theme = useContext(ThemeContext);
    const SCREEN_WIDTH = theme.width;
    const SCREEN_HEIGHT = theme.height;
    const isLeftPosition = position === 'left';
    const DRAWER_WIDTH = SCREEN_WIDTH * (drawerPercentage / 100);

    const leftOffset = useRef(
        new Animated.Value(isLeftPosition ? 0 : SCREEN_WIDTH + DRAWER_WIDTH)
    ).current;

    const openDrawer = () => {
        Animated.parallel([
            Animated.timing(leftOffset, {
                toValue: isLeftPosition ? DRAWER_WIDTH : SCREEN_WIDTH,
                duration: animationTime,
                useNativeDriver: true
            })
        ]).start();
    };

    const closeDrawer = () => {
        Animated.parallel([
            Animated.timing(leftOffset, {
                toValue: isLeftPosition ? 0 : SCREEN_WIDTH + DRAWER_WIDTH,
                duration: animationTime,
                useNativeDriver: true
            })
        ]).start();
    };

    useEffect(() => {
        open ? openDrawer() : closeDrawer();
    }, [open]);

    const style = {
        transform: [{ translateX: leftOffset }],
        position: 'absolute',
        height: SCREEN_HEIGHT,
        zIndex: 1,
        width: DRAWER_WIDTH,
        left: -DRAWER_WIDTH,
        backgroundColor: theme.baseBackgroundColor,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10
    };

    // prettier-ignore
    return rc(Animated.View, { style },
        children
    );
}

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
