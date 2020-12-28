import React from 'react';
import Form from './Form.mjs';
import ShortText from './formElements/ShortText.mjs';

const rc = React.createElement;

export default () => {
    // prettier-ignore
    return rc(Form, {
            title: 'Foo Form'
        },
        rc(ShortText, {
            title: 'title',
            propertyName: 'title'
        }),
        rc(ShortText, {
            title: 'Description',
            propertyName: 'description'
        }),
    );
};
