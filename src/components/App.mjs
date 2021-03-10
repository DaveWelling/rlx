import { createElement } from 'react';
import styled from 'styled-components';
import '../index.css';
import ActiveRecordProvider from '../contexts/ActiveRecord.mjs';
import SummaryDetail from './SummaryDetail.mjs';
import Grid from './Grid.mjs';
import WidgetForm from './WidgetForm.mjs';
import FooForm from './FooForm.mjs';
import EventBoundaryProvider from '../contexts/EventBoundary.mjs';
import ActionButton from './ActionButton.mjs';

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
        rc(EventBoundaryProvider, {logEvents: true},
            rc(ActiveRecordProvider, {recordType: recordType0},
                rc(SummaryDetail, null,
                    rc(Summary, null,
                        rc(Grid, {title: `Select a ${recordType0}`, recordType: recordType0}),
                        rc(ActionButton, {actionType: 'new', title: 'Add Widget'})
                    ),
                    rc(WidgetForm)
                )
            )
        ),
        rc(EventBoundaryProvider, {logEvents: true},
            rc(ActiveRecordProvider, {recordType: recordType1},
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
