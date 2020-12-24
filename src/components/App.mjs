import React from 'react';
import { widget } from '../persistence/database.mjs';
import useLokiView from '../hooks/useLokiView.mjs';
import Split from 'react-split';
import cuid from 'cuid';
import styled from 'styled-components';
import '../index.css';

const App = styled.div`
    background-color: rgba(0, 0, 0, 0.95);
    color: white;
`;
const SummaryDetail = styled(Split)`
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: row;
`;

const Form = styled.form`
    background-color: rgba(0, 0, 0, 0.1);
    padding: 4px;
    border-radius: 2px;
    height: 100%;
`;
const rc = React.createElement;

export default () => {
    const widgetsData = useLokiView('widget', 'default', {});
    const addWidget = () => {
        let title = `title ${new Date().toISOString()}`;
        widget.insert({ _id: cuid(), title });
    };
    // prettier-ignore
    return rc(App, null,
        rc('h1', null, 'Hello React Loki xstate'),
        rc(SummaryDetail, {sizes: [50, 50]},
            rc('div', null,
                widgetsData.map(w=>rc('p', {id: w._id}, w.title)),
                rc('input', {type: 'button', value:'Add one', onClick: addWidget})
            ),
            rc('div', null,
                rc(Form, null,
                    rc('div', null, 'Widget Form'),
                    rc('label', null,
                        rc('input', {type: 'textbox'})
                    )
                )
            )
        )
    );
};
