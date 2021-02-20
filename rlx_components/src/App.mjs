import { createElement } from 'react';
import styled from 'styled-components';

import SummaryDetail from './components/SummaryDetail/index.mjs';
import Grid from './components/Grid.mjs';
import WidgetForm from './components/WidgetForm.mjs';
import FooForm from './components/FooForm.mjs';
import EventBoundary from './components/EventBoundary.mjs';
import ActiveRecord from './components/ActiveRecord.mjs';
import ActionButton from './components/ActionButton.mjs';
import { View, h1 } from './components/primitives';
import useWindowDimensions from './utilities/useWindowDimensions.mjs';

// TODO: Extract this as part of theming.
const MOBILE_BREAKPOINT = 479;

const App = styled(View).attrs(() => {
    const { height, width } = useWindowDimensions();
    const mobile = height < MOBILE_BREAKPOINT || width < MOBILE_BREAKPOINT;
    return {
        name: 'App',
        mobile
    };
})`
    background-color: rgba(0, 0, 0, 0.95);
    color: white;
    height: 100%;
    flex-direction: column;
    align-items: ${props => (props.mobile ? 'stretch' : 'flex-start')};
    font-family: Arial, Helvetica, sans-serif;
`;

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

export default function Application() {
    // prettier-ignore
    return rc(App, {name: 'app'},
        rc(AppTitle, {name: 'app-title'}, 'Hello React Loki XState'),
        rc(EventBoundary, {logEvents: true},
            rc(ActiveRecord, {recordType: recordType0},
                rc(SummaryDetail, null,
                    rc(Summary, null,
                        rc(Grid, {name: 'Grid', title: `Select a ${recordType0}`, recordType: recordType0}),
                        rc(ActionButton, {actionType: 'new', title: 'Add Widget'})
                    ),
                    rc(WidgetForm)
                )
            )
        ),
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
    );
}
