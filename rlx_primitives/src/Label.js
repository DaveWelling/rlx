import styled from 'styled-components';
import Text from './Text';
import View from './View';
import react from 'react';
const rc = react.createElement;

// TODO:  link label to input with `for`, `forHtml` or whatever.
const Container = styled(View).attrs({ name: 'label' })`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
`;
const Label = styled.label`
    padding-bottom: 5px;
    line-height: 35px;
`;
export default props => {
    const [title, ...children] = props.children;
    // prettier-ignore
    return rc(Container, null,
        rc(Label, null, title),
        children
    );
};
