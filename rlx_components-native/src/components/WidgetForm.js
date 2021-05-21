import React from 'react';
import Form from './Form';
import ShortText from './formElements/ShortText';

const rc = React.createElement;

export default function WidgetForm() {
    // prettier-ignore
    return rc(Form, {
            title: 'Widget Form'
        },
        rc(ShortText, {
            title: 'title',
            propertyName: 'title',
            defaultValue: ''
        })
    );
}