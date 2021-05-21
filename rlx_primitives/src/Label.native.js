import styled from 'styled-components';
import Text from './Text';
import react from 'react';
const rc = react.createElement;

const Container = styled.View.attrs({ name: 'label' })`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
`;
const Label = styled(Text)({
    paddingBottom: 3,
    lineHeight: '40px',
    textAlignVertical: 'center'
});
export default props => {
    const [title, ...children] = props.children;
    // prettier-ignore
    return rc(Container, null,
        rc(Label, null, title),
        children
    );
};
