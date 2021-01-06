import React from 'react';
import Form from './Form.mjs';
import ShortText from './formElements/ShortText.mjs';
import DropDown from './formElements/DropDown.mjs';

const rc = React.createElement;

export default function FooForm() {
    // prettier-ignore
    return rc(Form, {
            title: 'Foo Form'
        },
        rc(ShortText, {
            title: 'title',
            propertyName: 'title',
            defaultValue: ''
        }),
        rc(ShortText, {
            title: 'Description',
            propertyName: 'description',
            defaultValue: ''
        }),
        rc(DropDown, {
            title: 'Widget',
            propertyName: 'widget',
            defaultValue: {_id: 'none', title: 'Select a widget'},
            otherRecordType: 'widget'
        })
    );
}
