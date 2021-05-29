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
        height,
        width,
        mobile,
        baseBackgroundColor: darkMode ? '#000' : scheme.background,
        // with each layer, progressively lightens/darkens the parent or baseBackgroundColor
        backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
        defaultFontColor: darkMode ? scheme['white-text'] : scheme['black-text'],
        defaultFont: 'Arial',
        fontSize: 16,
        disabledFontColor: scheme['disabled-color'],
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
            errorHighlight: scheme['error-highlight']
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
    return theme;
}
