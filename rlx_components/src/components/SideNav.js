import styled from 'styled-components';
import { createElement } from 'react';
import { Drawer, View, Button } from 'rlx_primitives';
const rc = createElement;

const Header = styled(View)`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-basis: auto;
    align-items: flex-end;
    justify-content: space-between;
    width: 100%;
`;

function SideNav(props) {
    const { open, children = [], onClose } = props;
    return rc(Drawer, { open }, [
        rc(
            Header,
            { key: 'header' },
            rc(Button, { color: 'base', icon: 'clear', onClick: onClose })
        ),
        ...children
    ]);
}

export default SideNav;
