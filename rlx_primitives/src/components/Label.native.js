import styled from 'styled-components';
import Text from './Text';
import react from 'react';
import fromTheme from '../fromTheme';
const rc = react.createElement;

const Container = styled.View.attrs({ name: 'label' })`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    max-width: ${fromTheme('form', 'entryMaxWidth')};
`;

export default props => {
    const [title, ...children] = props.children;
    // prettier-ignore
    return rc(Container, null,
        rc(Text, null, title),
        children
    );
};
