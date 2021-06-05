import { createElement, useState } from 'react';
import styled from 'styled-components';

import SummaryDetail from './components/SummaryDetail/index';
import Grid from './components/Grid';
import WidgetForm from './components/WidgetForm';
import FooForm from './components/FooForm';
import EventBoundary from './components/EventBoundary';
import ActiveRecord from './components/ActiveRecord';
import ActionButton from './components/ActionButton';
import Profile from './components/Profile';
import SideNav from './components/SideNav';
import { View, h2, App, Button } from 'rlx_primitives';
import Theme from './components/Theme';

const AppTitle = styled(h2)`
    margin: 6px;
`;

const Summary = styled(View).attrs({ name: 'Summary' })`
    min-width: 300px;
    flex-direction: column;
    flex-grow: 1;
`;
const ButtonBar = styled(View)`
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;
    flex-direction: row;
    justify-content: flex-end;
    ${({ theme }) => theme.backgroundColor};
`;
const Header = styled(View)`
    display: flex;
    flex-basis: auto;
    flex-grow: 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const rc = createElement;
const recordType0 = 'widget';
const recordType1 = 'foo';

export default function Application() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const onSwipeLeft = () => setDrawerOpen(false);
    const onSwipeRight = () => setDrawerOpen(true);
    const toggleDrawer = () => setDrawerOpen(isOpen => !isOpen);
    const onCloseSideNav = () => setDrawerOpen(false);

    // prettier-ignore
    return rc(Theme, null,
        rc(App, {name: 'app', onSwipeLeft, onSwipeRight},
            rc(SideNav, {open:drawerOpen, onClose: onCloseSideNav}),
            rc(Header, null,
                rc(Button, {onClick: toggleDrawer, icon: 'menu', color: 'base'}),
                rc(AppTitle, {name: 'app-title'}, 'Hello React Loki XState'),
                rc(Profile)
            ),
            // rc(EventBoundary, {logEvents: true},
            //     rc(ActiveRecord, {recordType: recordType0},
            //         rc(SummaryDetail, null,
            //             rc(Summary, null,
            //                 rc(Grid, {name: 'Grid', title: `Select a ${recordType0}`, recordType: recordType0}),
            //                 rc(ActionButton, {actionType: 'new', title: 'Add Widget'})
            //             ),
            //             rc(WidgetForm)
            //         )
            //     )
            // ),
            rc(EventBoundary, {logEvents: true},
                rc(ActiveRecord, {recordType: recordType1},
                    rc(SummaryDetail, null,
                        rc(Summary, null,
                            rc(Grid, {title: `Select a ${recordType1}`, recordType: recordType1}),
                            rc(ButtonBar, null,
                                rc(ActionButton, {actionType: 'new', title: 'Add Foo'})
                            )
                        ),
                        rc(FooForm)
                    )
                )
            )
        )
    );
}
