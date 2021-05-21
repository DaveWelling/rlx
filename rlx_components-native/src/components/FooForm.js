import React from 'react';
import Form from './Form';
import ShortText from './formElements/ShortText';
import DropDown from './formElements/DropDown';

const rc = React.createElement;

export default function FooForm() {
    // prettier-ignore
    return rc(Form, {
            title: 'Foo Form'
        },
        rc(ShortText, {
            title: 'Title',
            propertyName: 'title',
            defaultValue: ''
        }),
        rc(DropDown, {
            title: 'Widget',
            propertyName: 'widget',
            defaultValue: {_id: 'none', title: 'Select a widget'},
            otherRecordType: 'widget'
        }),
        rc(ShortText, {
            title: 'Description',
            propertyName: 'description',
            defaultValue: ''
        })
    );
}
