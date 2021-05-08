/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { Form, Fieldset, Button, View, Text, Label, TextInput } from 'rlx_primitives';
import styled from 'styled-components';
import {
    EventBoundary,
    ActiveRecord,
    SummaryDetail,
    Grid,
    ActionButton,
    WidgetForm
} from 'rlx_components-native';
import React from 'react';

const rc = React.createElement;

const Summary = styled(View).attrs({ name: 'Summary' })`
    min-width: 300px;
    flex-direction: column;
    flex-grow: 1;
`;

const recordType0 = 'widget';
const recordType1 = 'foo';

const App = () => {
    //return rc(View, {style:{backgroundColor: 'black', height: '100%', width: '100%'}}, rc(Text, null, 'hello world'));
    //prettier-ignore
    return rc(View, null,
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
        )
    );
};

export default App;
