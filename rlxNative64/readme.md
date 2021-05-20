## Before you begin

-   Get your [react native environment setup](https://reactnative.dev/docs/environment-setup)
    -   Make sure you are running npm 7 (node 15) or higher.
    -   Make sure you have [android studio](https://developer.android.com/studio) installed.
    -   Set your `ANDROID_HOME`
    -   Add platform-tools to your `Path`
    -   you might need to set `JAVA_HOME`

## To begin debugging

-   Be sure your device is attached and usb debugging is enabled
-   Be sure you are in the _`/rlxNative64`_ directory of a console
-   `npm run serve` - this will start your javascript bundling server
-   open a new console in the _`/rlxNative64`_ directory and run `npm run android` - this will build the native app and deploy it to your device
    -   When this finishes, the app will start on the device and request the javascript build from the bundling server
    -   When you make Javascript only changes, you do not need to rerun this (see below). However, if you install a new package that has native elements, you will need to rerun this.
    -   Also, if your adb connection somehow is messed up `npm run android` will usually fix it.
-   In a browser, open http://localhost:8081/debugger-ui - hit f12 to view the debugging tools. Do not use the reload button in this UI. It sucks and will often lock your app somehow.
-   In your console: `adb shell input keyevent KEYCODE_MENU`
    -   this will open the debugging menu on the device.
    -   Select the debug option. This will allow you to put breakpoints in the code using the browser ui above. Alternatively, you can put `debugger;` in your code and it will stop there.

### To just reload some JavaScript changes:

-   `adb shell input text "RR"`
-   If you are on a screen with an active text box, this might just type "RR" into the box. In that case:
    -   `adb shell input keyevent KEYCODE_MENU`
    -   Then click the 'Reload' option.

### To stop the app:

-   `adb shell am force-stop com.rlxnative64`

### To start the app (without doing a full build):

-   `adb shell am start -n com.rlxnative64/com.rlxnative64.MainActivity`

### To stop the app and clear all data (without uninstalling):

-   `adb shell pm clear com.silouireactnative`
