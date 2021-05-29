import styled from 'styled-components';
import fromTheme from '../fromTheme';
export default styled.fieldset.attrs({ name: 'fieldset' })`
    padding: ${fromTheme('viewPadding')};
    margin: 4px 8px 4px 8px;
    border: none;
    background-color: ${({ theme }) => theme.backgroundColor};
    flex-grow: 1;
    overflow-y: auto;
`;
