import react, { useLayoutEffect } from 'react';
import styled from 'styled-components';
import View from './View';
import ReactDOM from 'react-dom';

const { createElement: rc, useEffect, forwardRef } = react;

const ModalContent = styled(View).attrs({
    name: 'modal'
})`
    top: 0;
    background-color: ${({ theme }) => theme.baseBackgroundColor};
    color: white;
    height: 100%;
    flex-direction: column;
    align-items: ${props => (props.mobile ? 'stretch' : 'flex-start')};
    font-family: Arial;
`;

export default forwardRef((props, ref) => {
    const dialog = document.querySelector('dialog');
    const { visible } = props;
    useEffect(() => {
        if (visible && !dialog.open) {
            dialog.showModal();
            dialog.scrollTop = 0;
        } else if (!visible && dialog.open) {
            dialog.close();
        }

        return () => {
            if (dialog.open) {
                dialog.close();
            }
        };
    }, [visible, dialog]);
    useLayoutEffect(() => {
        dialog.style.top = 0;
        dialog.style.height = '100%';
        dialog.style.width = '100%';
        dialog.style.maxHeight = '100%';
        dialog.style.maxWidth = '100%';
        dialog.style.border = 'none';
    }, [dialog]);
    return ReactDOM.createPortal(rc(ModalContent, { ref }, props.children), dialog);
});
