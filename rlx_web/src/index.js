import './whyDidYouRender';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as components from 'rlx_components-native';
import dialogPolyfill from 'dialog-polyfill';
const { App } = components;
const rc = React.createElement;

async function startup() {
    // eslint-disable-next-line no-undef

    // eslint-disable-next-line no-undef
    if (__USE_XSTATE_INSPECTOR__) {
        //Create XState inspector in dev mode.
        const inspector = await import('@xstate/inspect');
        inspector.inspect({ iframe: false });
    }
    const dialog = document.querySelector('dialog');
    dialogPolyfill.registerDialog(dialog);

    ReactDOM.render(rc(App, null), document.getElementById('root'));
}

startup();
