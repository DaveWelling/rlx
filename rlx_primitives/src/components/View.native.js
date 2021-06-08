import styled from 'styled-components';
export default styled.View.attrs(props => ({ name: props.name || 'view' }))`
    flex: 1;
    display: flex;
`;
