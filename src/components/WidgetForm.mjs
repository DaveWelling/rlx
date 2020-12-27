import React from 'react';
import Form from './Form.mjs';
import ShortText from './formElements/ShortText.mjs';

const rc = React.createElement;

export default () => {
    // prettier-ignore
    return rc(Form, {
            title: 'Widget Form'
        },
        rc(ShortText, {
            title: 'title',
            propertyName: 'title'
        }),
    );
};
