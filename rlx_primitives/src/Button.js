import styled from 'styled-components';
export default styled.input.attrs({ name: 'button', type: 'button' })`
    max-width: ${({ theme }) => theme.button.maxWidth};
    /* min-width: ${({ theme }) => theme.button.minWidth}; */
    height: ${({ theme }) => theme.button.height};
    margin: ${({ theme }) => theme.defaultMargin};
    border-radius: ${({ theme }) => theme.borderRadius};
    border: thin solid black;
    padding: ${({ theme }) => theme.button.padding};
    flex-grow: 0;
    flex: 0;
    justify-content: center;
    background-color: ${({ theme }) => theme.button.main};
`;
