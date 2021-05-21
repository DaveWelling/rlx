import { createElement } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import SummaryDetail from './components/SummaryDetail/index';
import Grid from './components/Grid';
import WidgetForm from './components/WidgetForm';
import FooForm from './components/FooForm';
import EventBoundary from './components/EventBoundary';
import ActiveRecord from './components/ActiveRecord';
import ActionButton from './components/ActionButton';
import { View, h1, App } from 'rlx_primitives';
import useWindowDimensions from './utilities/useWindowDimensions';
// TODO: Extract this as part of theming.
const MOBILE_BREAKPOINT = 479;

const AppTitle = styled(h1)`
    margin: 6px;
`;

const Summary = styled(View).attrs({ name: 'Summary' })`
    min-width: 300px;
    flex-direction: column;
    flex-grow: 1;
`;

const rc = createElement;
const recordType0 = 'widget';
const recordType1 = 'foo';
const theme = {};

export default function Application() {
    const { height, width } = useWindowDimensions();
    theme.mobile = height < MOBILE_BREAKPOINT || width < MOBILE_BREAKPOINT;
    // prettier-ignore
    return rc(ThemeProvider, {theme},
        rc(App, {name: 'app'},
            rc(AppTitle, {name: 'app-title'}, 'Hello React Loki XState'),
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
                            rc(ActionButton, {actionType: 'new', title: 'Add Foo'})
                        ),
                        rc(FooForm)
                    )
                )
            )
        )
    );
}
