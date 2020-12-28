import React from 'react';
import Form from './Form.mjs';
import ShortText from './formElements/ShortText.mjs';

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
    );
}
