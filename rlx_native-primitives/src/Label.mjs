import styled from 'styled-components';
import Text from './Text.mjs';
import react from 'react';
const rc = react.createElement;

const Container = styled.View.attrs({ name: 'label' })`
    flex-direction: row;
    align-items: center;
`;

export default props => {
    const [title, ...children] = props.children;
    // prettier-ignore
    return rc(Container, null,
        rc(Text, null, title),
        children
    );
};
