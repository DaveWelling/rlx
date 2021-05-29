import styled from 'styled-components';
import View from './View';

export default styled(View).attrs({ name: 'App', scroll: true })`
    background-color: ${({ theme }) => theme.baseBackgroundColor};
    color: ${({ theme }) => theme.defaultFontColor};
    height: 100%;
    flex-direction: column;
    align-items: ${props => (props.theme.mobile ? 'stretch' : 'flex-start')};
    font-family: Arial;
`;
