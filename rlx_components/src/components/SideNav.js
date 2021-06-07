import styled from 'styled-components';
import { createElement, useContext, useEffect, useState } from 'react';
import { Drawer, View, Button, GestureContext } from 'rlx_primitives';

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
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { onSwipeLeft, onSwipeRight } = useContext(GestureContext);
    useEffect(() => {
        let unsubscribes = [
            onSwipeLeft(() => setDrawerOpen(false)),
            onSwipeRight(() => setDrawerOpen(true))
        ];
        return () => unsubscribes.forEach(u => u());
    });
    const toggleDrawer = () => setDrawerOpen(isOpen => !isOpen);
    const onCloseSideNav = () => setDrawerOpen(false);

    const { children = [] } = props;

    if (!drawerOpen) {
        return rc(Button, { onClick: toggleDrawer, icon: 'menu', color: 'base' });
    }

    return rc(Drawer, { open: drawerOpen }, [
        rc(
            Header,
            { key: 'header' },
            rc(Button, { color: 'base', icon: 'clear', onClick: onCloseSideNav })
        ),
        ...children
    ]);
}

export default SideNav;
