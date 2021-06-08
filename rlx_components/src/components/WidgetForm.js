import React from 'react';
import Form from './form/Form';
import ShortText from './formElement/ShortText';

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
