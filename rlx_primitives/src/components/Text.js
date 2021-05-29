import styled from 'styled-components';
import fromTheme from '../fromTheme';
export default styled.span.attrs({ name: 'text' })`
    font-size: ${fromTheme('fontSize')};
    color: ${({ theme }) => theme.defaultFontColor};
`;
