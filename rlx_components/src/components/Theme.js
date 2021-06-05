import React from 'react';
import { ThemeProvider } from 'styled-components';
const rc = React.createElement;
import useWindowDimensions from '../utilities/useWindowDimensions';
import useDarkMode from '../utilities/useDarkMode';
import { COMMON_COLOR_SCHEME } from 'rlx_primitives';

const scheme = COMMON_COLOR_SCHEME;

const MOBILE_BREAKPOINT = 479;

export default function Theme({ children }) {
    const [darkMode, setDarkMode] = useDarkMode();
    const { height, width } = useWindowDimensions();
    const mobile = height < MOBILE_BREAKPOINT || width < MOBILE_BREAKPOINT;
    let theme = {
        height,
        width,
        mobile,
        darkMode,
        setDarkMode,
        baseBackgroundColor: darkMode ? '#000' : scheme.background,
        // with each layer, progressively lightens/darkens the parent or baseBackgroundColor
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
        boxShadowColor: darkMode ? 'rgb(225, 225, 225)' : 'rgb(30, 30, 30)',
        defaultFontColor: darkMode ? scheme['white-text'] : scheme['black-text'],
        font: 'Arial',
        fontSize: 16,
        disabledFontColor: scheme['disabled-color'],
        disabledBackgroundColor: scheme['disabled-background'],
        disabledColor: scheme['disabled-color'],
        listLineHeight: 35,
        borderRadius: 3,
        viewPadding: 6,
        textMargin: 6,
        textPadding: 6,
        iconFont: 'material-icons',
        iconSize: 24,
        form: {
            entryMaxWidth: 350,
            inputBorderRadius: 3,
            dropdownMinHeight: 200
        },
        menu: {
            borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            backgroundColor: darkMode ? 'rgb(51, 51, 51)' : 'rgb(204, 204, 204)'
        },
        button: {
            roundDiameter: 32,
            fontColor: scheme['white-text'],
            height: 32,
            maxWidth: 200,
            minWidth: 32,
            padding: 8,
            primary: scheme['primary'],
            primaryHover: scheme['primary-hover'],
            primaryHighlight: scheme['primary-highlight'],
            success: scheme['success'],
            successHover: scheme['success-hover'],
            successHighlight: scheme['success-highlight'],
            warn: scheme.warn,
            warnHover: scheme['warn-hover'],
            warnHighlight: scheme['warn-highlight'],
            error: scheme.error,
            errorHover: scheme['error-hover'],
            errorHighlight: scheme['error-highlight'],
            base: darkMode ? '#000' : scheme.background,
            baseHover: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            baseHighlight: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
        }
    };
    if (mobile) {
        theme = {
            ...theme,
            listLineHeight: 70,
            borderRadius: 6,
            iconSize: 32,
            form: {
                ...theme.form,
                dropdownMinHeight: '100%'
            },
            button: {
                ...theme.button,
                roundDiameter: 56,
                roundBorderRadius: 28, // % doesn't work on react native
                height: 64,
                minWidth: 64,
                // Remove hover states for mobile.
                successHover: undefined,
                primaryHover: undefined,
                errorHover: undefined,
                warnHover: undefined
            }
        };
    }
    return rc(ThemeProvider, { theme }, children);
}
