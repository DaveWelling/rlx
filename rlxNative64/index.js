/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { App } from 'rlx_components';
import { name as appName } from './app.json';

import { setNativeExceptionHandler } from 'react-native-exception-handler';

setNativeExceptionHandler(exceptionString => {
    // This is your custom global error handler
    // You do stuff likehit google analytics to track crashes.
    // or hit a custom api to inform the dev team.
    //NOTE: alert or showing any UI change via JS
    //WILL NOT WORK in case of NATIVE ERRORS.
    debugger;
    console.error(exceptionString);
});

AppRegistry.registerComponent(appName, () => App);
