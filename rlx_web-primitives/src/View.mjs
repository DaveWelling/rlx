import styled from 'styled-components';
export default styled.div.attrs({ name: 'view' })`
    display: ${props => (props.block ? 'block' : 'flex')};
`;
