import react from 'react';
import { View, Modal } from 'react-native';
import styled from 'styled-components';

const { createElement: rc, forwardRef } = react;
const ModalContent = styled(View).attrs({ name: 'modal' })`
    flex: 1;
    height: 100%;
    width: 100%;
    background-color: ${props => props.theme.baseBackgroundColor};
    color: ${props => props.theme.defaultFontColor};
    font-family: ${props => props.theme.font};
`;

export default forwardRef((props, ref) => {
    const { visible, children } = props;
    return rc(Modal, { visible }, rc(ModalContent, { ref }, children));
});
