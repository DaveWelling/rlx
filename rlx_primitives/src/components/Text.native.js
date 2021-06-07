import styled from 'styled-components';
import { Text } from 'react-native';
import react from 'react';
import fromTheme from '../fromTheme';

const { createElement: rc } = react;

// Text can be rendered before the Theme has finished loading, so provide defaults for this primitive.
const TextStyle = styled.Text.attrs({
    name: 'text'
})`
    color: ${({ theme }) => theme?.defaultFontColor ?? '#000'};
    font-size: ${({ theme }) => (theme?.fontSize ?? '16') + 'px'};
`;

export default props => {
    const { children, ...otherProps } = props;
    return rc(TextStyle, otherProps, children);
};
