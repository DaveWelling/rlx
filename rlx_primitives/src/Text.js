import styled from 'styled-components';
export default styled.span.attrs({ name: 'text' })`
    font-size: 16px;
    color: ${({ theme }) => theme.defaultFontColor};
`;
