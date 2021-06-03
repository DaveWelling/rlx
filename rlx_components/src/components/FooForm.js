import React from 'react';
import Form from './Form';
import ShortText from './formElements/ShortText';
import DropDown from './formElements/DropDown';
import EditableList from './EditableList';

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
            placeholder: 'Select a widget',
            otherRecordType: 'widget'
        }),
        rc(ShortText, {
            title: 'Description',
            propertyName: 'description',
            defaultValue: ''
        }),
        rc(EditableList, {
            title: 'imma editable list',
            propertyName: 'someStuff',
            defaultValue: [],
            childrenHNodes: [
                {
                    title: 'some subthing',
                    propertyName: 'title',
                    type: ShortText,
                    defaultValue: ''
                }, {
                    title: 'Widget',
                    propertyName: 'widget',
                    placeholder: 'Select a widget',
                    otherRecordType: 'widget',
                    type: DropDown
                }
            ]
        })
    );
}
