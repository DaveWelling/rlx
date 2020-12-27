import React from 'react';
import Form from './Form.mjs';
import ShortText from './formElements/ShortText.mjs';
import ActionButton from './ActionButton.mjs';
import ActionButtonMjs from './ActionButton.mjs';

const rc = React.createElement;

export default () => {
    // prettier-ignore
    return rc(Form, {
            title: 'Widget Form',
            actionButtons: [
                rc(ActionButton, { key: 'widget-form-cancel', title: 'Cancel', actionType: 'cancel'})
            ]
        },
        rc(ShortText, {
            title: 'title',
            propertyName: 'title'
        }),
    );
};
