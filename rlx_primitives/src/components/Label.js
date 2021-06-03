import styled from 'styled-components';
import Text from './Text';
import View from './View';
import react from 'react';
import fromTheme from '../fromTheme';
const rc = react.createElement;

// TODO:  link label to input with `for`, `forHtml` or whatever.
const Container = styled(View).attrs({ name: 'label' })`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: baseline;
    max-width: ${fromTheme('form', 'entryMaxWidth')};
    margin-top: ${fromTheme('textMargin')};
    margin-bottom: ${fromTheme('textMargin')};
`;

export default props => {
    const [title, ...children] = props.children;
    // prettier-ignore
    return rc(Container, null,
        rc('label', null, title),
        children
    );
};
