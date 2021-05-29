import get from 'lodash.get';
export default function fromTheme(...themePath) {
    return props => {
        let value = get(props.theme, themePath);
        if (typeof value === 'number') {
            return `${value}px`;
        }
        return value;
    };
}
