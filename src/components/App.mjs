import { createElement, useContext } from 'react';
import { widget } from '../persistence/database.mjs';
import cuid from 'cuid';
import styled from 'styled-components';
import '../index.css';
import SummaryDetail from './SummaryDetail.mjs';
import useLokiView from '../hooks/useLokiView.mjs';
import Grid from './Grid.mjs';
import WidgetForm from './WidgetForm.mjs';
import EventBoundary from '../contexts/EventBoundary.mjs';

const App = styled.div`
    background-color: rgba(0, 0, 0, 0.95);
    color: white;
`;

const rc = createElement;
const recordType = 'widget';

export default () => {
    const [data, upsert] = useLokiView(recordType, `${recordType}_default`, {});

    const addRecord = () => {
        let title = `title ${new Date().toISOString()}`;
        upsert({ _id: cuid(), title });
    };

    const summaryItemClick = (e) => {};

    // prettier-ignore
    return rc(App, null,
        rc('h1', null, 'Hello React Loki XState'),
        rc(SummaryDetail, {recordType},
            rc('div', null,
                rc(Grid, {data, onClick: summaryItemClick}),
                rc('input', {type: 'button', value:'Add one', onClick: addRecord})
            ),
            rc('div', null,
                rc(WidgetForm)
            )
        )
    );
};
