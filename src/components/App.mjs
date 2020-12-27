import { createElement } from 'react';

import styled from 'styled-components';
import '../index.css';
import SummaryDetail from './SummaryDetail.mjs';
import Grid from './Grid.mjs';
import WidgetForm from './WidgetForm.mjs';
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
const recordType = 'widget';

export default () => {
    // prettier-ignore
    return rc(App, null,
        rc(AppTitle, null, 'Hello React Loki XState'),
        rc(EventBoundary, {logEvents: true},
            rc(ActiveRecord, {recordType},
                rc(SummaryDetail, null,
                    rc('div', null,
                        rc(Grid, {recordType}),
                        rc(ActionButton, {actionType: 'new', title: 'Add Widget'})
                    ),
                    rc(WidgetForm)
                )
            )
        )
    );
};
