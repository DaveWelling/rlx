import useWindowDimensions from '../utilities/useWindowDimensions';
import prefersDarkMode from '../utilities/prefersDarkMode';
import { COLORS, BRAND_THEMES, COMMON_COLOR_SCHEME } from './colorScheme';
const darkMode = prefersDarkMode();
const MOBILE_BREAKPOINT = 479;
const scheme = COMMON_COLOR_SCHEME;

export default function useTheme() {
    const { height, width } = useWindowDimensions();
    const mobile = height < MOBILE_BREAKPOINT || width < MOBILE_BREAKPOINT;
    let theme = {
        mobile,
        baseBackgroundColor: darkMode ? scheme['background-dark'] : scheme.background,
        // with each layer, progressively lightens/darkens the parent or baseBackgroundColor
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.1)',
        defaultFontColor: darkMode ? scheme['white-text'] : scheme['black-text'],
        defaultFont: 'Arial',
        disabledFontColor: scheme['disabled-color'],
        listLineHeight: '32px',
        listLineHeightPixels: 32, // react-window FixedSizeList requires numeric value.
        borderRadius: '3px',
        defaultMargin: '6px',
        button: {
            height: '32px',
            maxWidth: '200px',
            minWidth: '32px',
            padding: '8px',
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
            errorHighlight: scheme['error-highlight']
        }
    };
    if (mobile) {
        theme = {
            ...theme,
            listLineHeight: '67px',
            listLineHeightPixels: 67, // react-window FixedSizeList requires numeric value.
            borderRadius: '6px',
            button: {
                ...theme.button,
                height: '67px',
                minWidth: '67px'
            }
        };
    }
    return theme;
}
