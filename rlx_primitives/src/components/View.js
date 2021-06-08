import styled from 'styled-components';
export default styled.div.attrs(props => ({ name: props.name || 'view' }))`
    display: ${props => (props.block ? 'block' : 'flex')};
`;
