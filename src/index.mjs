import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.mjs';
const rc = React.createElement;

// eslint-disable-next-line no-undef
if (__USE_XSTATE_INSPECTOR__) {
    //Create XState inspector in dev mode.
    import('@xstate/inspect').then((inspector) => {
        inspector.inspect({ iframe: false });
        ReactDOM.render(rc(App, null), document.getElementById('root'));
    });
} else {
    ReactDOM.render(rc(App, null), document.getElementById('root'));
}
