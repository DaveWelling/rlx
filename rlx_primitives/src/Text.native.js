import styled from 'styled-components';
import { Text } from 'react-native';
import react from 'react';
const { createElement: ce } = react;
// export default props => {
//     return ce(Text, { style: { color: 'white' } }, props.children);
// };

export default styled.Text.attrs({ name: 'text' })`
    color: white;
    font-size: 16px;
`;
