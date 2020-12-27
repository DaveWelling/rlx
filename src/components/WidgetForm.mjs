import React from 'react';
import Form from './Form.mjs';
import ShortText from './formElements/ShortText.mjs';
import ActionButton from './ActionButton.mjs';

const rc = React.createElement;

export default () => {
    // prettier-ignore
    return rc(Form, {
            title: 'Widget Form',
            actionButtons: [
                rc(ActionButton, { key: 'widget-form-cancel', title: 'Cancel', actionType: 'cancel'}),
                rc(ActionButton, { key: 'widget-form-submit', title: 'Save', actionType: 'submit'})
            ]
        },
        rc(ShortText, {
            title: 'title',
            propertyName: 'title'
        }),
    );
};
