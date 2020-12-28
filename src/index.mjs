import './whyDidYouRender.mjs';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.mjs';
const rc = React.createElement;

async function startup() {
    // eslint-disable-next-line no-undef

    // eslint-disable-next-line no-undef
    if (__USE_XSTATE_INSPECTOR__) {
        //Create XState inspector in dev mode.
        const inspector = await import('@xstate/inspect');
        inspector.inspect({ iframe: false });
    }
    ReactDOM.render(rc(App, null), document.getElementById('root'));
}

startup();
