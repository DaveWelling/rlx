export const COLORS = Object.freeze({
    black: '#2A2B30',
    blue: '#0064A8',
    darkBlue: '#00416A',
    darkGray: '#5C5C60',
    darkRed: '#930B07',
    green: '#009F53',
    highlightBlue: '#D0EDF8',
    highlightGreen: '#D5FCD5',
    highlightPurple: '#EADBFD',
    highlightRed: '#EFBAB3',
    highlightYellow: '#FCF7D2',
    lightBlue: '#06A7E2',
    lightGray: '#E0E2E4',
    lightGreen: '#13C762',
    lightPurple: '#A15DFD',
    lightRed: '#FB3740',
    lightYellow: '#F9E873',
    mediumGray: '#C7C8CA',
    paleBlue: '#EDF9FD',
    paleRed: '#FDEFEE',
    purple: '#6423BC',
    red: '#C6110B',
    redbeamRed: '#F9150D',
    sstBlue: '#007DBD',
    trueBlack: '#000000',
    trueWhite: '#FFFFFF',
    white: '#F2F2F2',
    yellow: '#FDC72F'
});

/**
 * These are common among all themes
 * For each color class (alt, error, primary, success, warn, accent-1, and accent-2) We have a normal state (notated
 * with no suffix), a hover state, and a highlight variation.  For primary, we also have a darker variation.
 */
//prettier-ignore
export const COMMON_COLOR_SCHEME = Object.freeze({
    'accent-1-highlight': COLORS.highlightBlue,
    'accent-1-hover': COLORS.lightBlue,
    'accent-1': COLORS.blue,
    'accent-2-highlight': COLORS.lightBlue,
    'accent-2-hover': COLORS.blue,
    'accent-2': COLORS.darkBlue,
    'alt-highlight': COLORS.highlightPurple,
    'alt-hover': COLORS.lightPurple,
    'alt': COLORS.purple,
    'background-dark': COLORS.black,
    'background-emphasis': COLORS.mediumGray,
    'background-medium': COLORS.darkGray,
    'background-secondary': COLORS.white,
    'background': COLORS.trueWhite,
    'black-text': COLORS.black,
    'border-neutral': COLORS.white,
    'border': COLORS.black,
    'disabled-background': COLORS.mediumGray,
    'disabled-color': COLORS.darkGray,
    'divider': COLORS.lightGray,
    'emphasis-text': COLORS.trueBlack,
    'error-highlight': COLORS.highlightRed,
    'error-hover': COLORS.lightRed,
    'error': COLORS.red,
    'line': COLORS.lightGray,
    'primary-dark': COLORS.darkBlue,
    'primary-emphasis': COLORS.paleBlue,
    'primary-highlight': COLORS.highlightBlue,
    'primary-hover': COLORS.lightBlue,
    'primary': COLORS.blue,
    'success-highlight': COLORS.highlightGreen,
    'success-hover': COLORS.lightGreen,
    'success': COLORS.green,
    'table-row': COLORS.lightGray,
    'warn-highlight': COLORS.highlightYellow,
    'warn-hover': COLORS.lightYellow,
    'warn': COLORS.yellow,
    'white-text': COLORS.trueWhite,
});

/**
 * These are specific to each theme
 */
export const BRAND_THEMES = Object.freeze({
    sst: {
        brand: COLORS.sstBlue
    },
    redbeam: {
        brand: COLORS.redbeamRed
    }
});

export const CHART_COLORS = [
    COLORS.black,
    COLORS.red,
    COLORS.blue,
    COLORS.highlightBlue,
    COLORS.highlightRed,
    COLORS.lightGray
];
