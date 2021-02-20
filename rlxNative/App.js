import React from 'react';
import {
    Text,
    View,
    Button,
    Form,
    Fieldset,
    h1,
    TextInput,
    Label,
    List
} from 'rlx_native-primitives';
//import { database } from 'rlx_services';
import {
    useLokiView,
    EventBoundary,
    Grid,
    ActionButton,
    ActiveRecord,
    SummaryDetail,
    WidgetForm
} from 'rlx_components-native';
import styled from 'styled-components';
const rc = React.createElement;
const recordType0 = 'widget';
const recordType1 = 'foo';

const TopView = styled(View)({
    height: '100%',
    display: 'flex'
});

// const data = [
//     { _id: 'a1', title: 'a1' },
//     { _id: 'a2', title: 'a2' },
//     { _id: 'a3', title: 'a3' },
//     { _id: 'a4', title: 'a4' }
// ];
//const data = database.getCollection('widget').data;

const onClick = _id => console.log('Clicked ', _id);

const Summary = styled(View).attrs({ name: 'Summary' })`
    min-width: 300px;
    flex-direction: column;
    flex-grow: 1;
`;

export default function App() {
    // prettier-ignore
    return rc(TopView, null,
        rc(h1, null, 'Demo App'),
        rc(EventBoundary, {logEvents: true},
            rc(ActiveRecord, {recordType: recordType0},
                rc(SummaryDetail, null,
                    rc(Summary, null,
                        rc(Grid, {name: 'Grid', title: `Select a ${recordType0}`, recordType: recordType0}),
                        rc(ActionButton, {actionType: 'new', title: 'Add Widget'})
                    ),
                    rc(WidgetForm)
                )
                // rc(Form, null,
                //     rc(Fieldset, null,
                //         rc(Text, null, 'hello world'),
                //         rc(ActionButton, {actionType: 'new', title: 'New Button'}),
                //         rc(Label, null,
                //             'a label title',
                //             rc(TextInput, {value: 'some value'})
                //         )
                //     )
                // ),
                // rc(Grid, {title: `Select a Foo`, recordType: 'foo'})
            )
        )
    );
}
