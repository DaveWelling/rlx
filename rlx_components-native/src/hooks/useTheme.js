import useWindowDimensions from '../utilities/useWindowDimensions';
const MOBILE_BREAKPOINT = 479;

export default function useTheme() {
    const { height, width } = useWindowDimensions();
    const mobile = height < MOBILE_BREAKPOINT || width < MOBILE_BREAKPOINT;
    let theme = {
        mobile,
        baseBackgroundColor: 'black',
        // with each layer, progressively lightens the parent or baseBackgroundColor
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        defaultFontColor: 'white',
        defaultFont: 'Arial',
        listLineHeight: '32px',
        borderRadius: '3px',
        defaultMargin: '6px',
        button: {
            height: '32px',
            maxWidth: '200px',
            minWidth: '32px',
            padding: '8px',
            main: 'blue'
        }
    };
    if (mobile) {
        theme = {
            ...theme,
            listLineHeight: '67px',
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
