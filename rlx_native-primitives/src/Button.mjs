import styled from 'styled-components';
import react from 'react';
const rc = react.createElement;

const buttonContainer = styled.TouchableHighlight`
    margin: 6px;
    max-width: 200px;
`;
const button = styled.Text`
    font-size: 16px;
    text-align: center;
    color: white;
    background-color: blue;
    border-radius: 3px;
    padding: 8px;
`;

export default props => {
    const { children, ...buttonProps } = props;
    // prettier-ignore
    return rc(buttonContainer, null,
        rc(button, buttonProps, buttonProps.title)
    );
};
