import { createElement } from 'react';
import styled from 'styled-components';

import SummaryDetail from './components/SummaryDetail.mjs';
import Grid from './components/Grid.mjs';
import WidgetForm from './components/WidgetForm.mjs';
import FooForm from './components/FooForm.mjs';
import EventBoundary from './components/EventBoundary.mjs';
import ActiveRecord from './components/ActiveRecord.mjs';
import ActionButton from './components/ActionButton.mjs';

const App = styled.div`
    background-color: rgba(0, 0, 0, 0.95);
    color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: Arial, Helvetica, sans-serif;
`;

const AppTitle = styled.h1`
    margin: 6px;
`;

const Summary = styled.div.attrs({ name: 'summary' })`
    min-width: 300px;
    display: flex;
    flex-direction: column;
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
                        rc(Grid, {title: `Select a ${recordType0}`, recordType: recordType0}),
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
