import React, { useState, createElement, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import reactNative from 'react-native';
const { View, Switch: nativeSwitch } = reactNative;
const rc = createElement;

export default function Switch(props) {
    const theme = useContext(ThemeContext);
    const { disabled, onClick, value } = props;
    return rc(reactNative.Switch, {
        trackColor: disabled
            ? { false: theme.disabledBackgroundColor, true: disabledBackgroundColor }
            : {
                  false: theme.button.primaryHighlight,
                  true: theme.button.primaryHighlight
              },
        thumbColor: disabled ? theme.disabledColor : theme.button.primary,
        ios_backgroundColor: theme.button.primaryHighlight,
        onValueChange: onClick,
        value
    });
}
