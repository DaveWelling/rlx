import { createElement } from 'react';
import styled from 'styled-components';
import '../index.css';
import SummaryDetail from './SummaryDetail.mjs';
import Grid from './Grid.mjs';
import WidgetForm from './WidgetForm.mjs';
import FooForm from './FooForm.mjs';
import EventBoundary from './EventBoundary.mjs';
import ActiveRecord from './ActiveRecord.mjs';
import ActionButton from './ActionButton.mjs';

const App = styled.div`
    background-color: rgba(0, 0, 0, 0.95);
    color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: Arial, Helvetica, sans-serif;
`;

const AppTitle = styled.h1`
    margin: 6px;
`;

const rc = createElement;
const recordType0 = 'widget';
const recordType1 = 'foo';

export default function Application() {
    // prettier-ignore
    return rc(App, null,
        rc(AppTitle, null, 'Hello React Loki XState'),
        rc(EventBoundary, {logEvents: true},
            rc(ActiveRecord, {recordType: recordType0},
                rc(SummaryDetail, null,
                    rc('div', null,
                        rc(Grid, {recordType: recordType0}),
                        rc(ActionButton, {actionType: 'new', title: 'Add Widget'})
                    ),
                    rc(WidgetForm)
                )
            )
        ),
        rc(EventBoundary, {logEvents: true},
            rc(ActiveRecord, {recordType: recordType1},
                rc(SummaryDetail, null,
                    rc('div', null,
                        rc(Grid, {recordType: recordType1}),
                        rc(ActionButton, {actionType: 'new', title: 'Add Foo'})
                    ),
                    rc(FooForm)
                )
            )
        )
    );
}
