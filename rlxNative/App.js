import React from 'react';
//import { View } from 'react-native';
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
import { useLokiView, EventBoundary, Grid } from 'rlx_components-native';
import styled from 'styled-components';
const rc = React.createElement;

const TopView = styled(View)({
    height: '100%'
});

// const data = [
//     { _id: 'a1', title: 'a1' },
//     { _id: 'a2', title: 'a2' },
//     { _id: 'a3', title: 'a3' },
//     { _id: 'a4', title: 'a4' }
// ];
//const data = database.getCollection('widget').data;
const onClick = _id => console.log('Clicked ', _id);

export default function App() {
    const [data] = useLokiView('widget', `widget_default`);
    // prettier-ignore
    return rc(EventBoundary, {logEvents: true},
        rc(TopView, null,
            rc(h1, null, 'Demo App'),
            rc(Form, null,
                rc(Fieldset, null,
                    rc(Text, null, 'hello world'),
                    rc(Button, {title: 'hello button'}),
                    rc(Label, null,
                        'a label title',
                        rc(TextInput, {value: 'some value'})
                    )
                )
            ),
            //rc(List, {data, onClick}),
            rc(Grid, {title: `Select a Foo`, recordType: 'foo'}),
        )
    );
}
