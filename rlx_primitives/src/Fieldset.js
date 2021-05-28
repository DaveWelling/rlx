import styled from 'styled-components';
export default styled.fieldset.attrs({ name: 'fieldset' })`
    padding: 6px;
    margin: 4px 8px 4px 8px;
    border-radius: 2px;
    border: none;
    background-color: ${({ theme }) => theme.backgroundColor};
    flex-grow: 1;
    overflow-y: auto;
`;
