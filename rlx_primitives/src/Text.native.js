import styled from 'styled-components';
import { Text } from 'react-native';
import react from 'react';
const { createElement: rc } = react;
// export default props => {
//     return ce(Text, { style: { color: 'white' } }, props.children);
// };

const TextStyle = styled.Text.attrs({
    name: 'text'
})`
    color: ${({ theme }) => theme.defaultFontColor};
    font-size: 16px;
`;

export default props => {
    const { children, ...otherProps } = props;
    return rc(TextStyle, otherProps, children);
};
