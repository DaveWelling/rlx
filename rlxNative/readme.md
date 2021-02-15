# rlxnative

To get your machine set up, use the `React Native CLI Quickstart` tab here: https://reactnative.dev/docs/0.62/environment-setup. Make sure you're not on the `Expo CLI QuickStart` tab but the `React Native CLI Quickstart`. It is for version `0.62.0` and we are using version `0.60.0` but it doesn't look like there much discrepancy between two versions concerning the setup.

This app uses Haul to do the bundling so that we can have Webpack. Webpack/Haul are needed because Metro does not support Dynamic Imports. Every time I end up using Metro, I feel a little like it would be nice to meet the react-native people would decided to use Metro ... and then punch them in the face. If it were just platform specific code, there is this: https://facebook.github.io/react-native/docs/platform-specific-code, but we need to dynamically load based on use case as well.

Recently on haul there is a problem where something is calling the response event, but
but not sending a response - which makes rlxNative\node_modules\@haul-bundler\core\build\server\Server.js crash on line 175.
You can add a check which will fix it (or at least prevent the whole thing from crashing).

```
server.events.on('response', request => {
      if (request.response == null) return;
      if ('statusCode' in request.response) {
```

Also - Be aware that several important things are stored in packages\siloUiReactNative\android\gradle.properties - such as the maximum size of the AsyncStorage database (which, in Android, is actually Sqllite) used by LokiJs for persistent storage.

### Installing via NPM

React native does not like going to the root of the workspace to do things, so this is actually a separate npm workspace. To install dependencies, go to the ./packages/siloUiReactNative subdirectory and do `npm i`. It doesn't seem to have a problem with peer dependencies like the web ui. I don't know why.

### Visor

It is recommended to use [Vysor](https://www.vysor.io/) for android development. Vysor gives you a computer interface to control your device with your keyboard and mouse. It's a real life saver. They have applications for Windows, Mac, and Linux.

### Running the RN app:

1. If you are running against localhost docker containers, ensure your device can access TCP port 8888 for the docker executable. Here's how on windows: ![Windows Firewall Rule](./.READMEPICS/WindowsFirewallRule.PNG) and here's how on MacOS: ![MacOS Firewall Rule](./.READMEPICS/MacFirewallRule.PNG) although, it may work without any firewall rules.
1. Make sure your device is attached to your machine and USB debugging is turned on (google it if you don't know how).
1. Ensure ./package/siloUiReactNative/src/config.js `host` value is your 'http://\<local IP>:8888'. If you need to change the hosts file on the device: https://www.howtogeek.com/140576/how-to-edit-the-hosts-file-on-android-and-block-web-sites/ You may not need to do this.

1. Open two terminals in the ./packages/siloUiReactNative directory
1. In the first one, enter `npm run haul`
1. In the second one, enter `npm start`.

This can be slow to repeat, so there are some shortcuts once you get it going.

-   To just reload some JavaScript changes:
    -   `adb shell input text "RR"`
    -   If you are on a screen with an active text box, this might just type "RR" into the box. In that case:
        -   `adb shell input keyevent KEYCODE_MENU`
        -   Then click the 'Reload' option.
-   To stop the app:
    -   `adb shell am force-stop com.rlxnative`
-   To start the app (without doing a full build):
    -   `adb shell am start -n com.rlxnative/com.rlxnative.MainActivity`
-   To stop the app and clear all data (without uninstalling):
    -   `adb shell pm clear com.rlxnative`

### To Debug the RN app:

1. Make sure the haul server is running (`npm run haul`), and the application is running on the device (`npm start`). On your development machine, open Chrome to http://localhost:8081/debugger-ui and open the debugging tools (F12).
2. In a terminal window: `adb shell input keyevent KEYCODE_MENU` will display the debugger menu on the device.
3. Select the debug option.

### If RN flakes out.

If you get an error talking about `package com.android.annotations does not exist`, you need to run your code through jetifier (which is an npm package that should be in the devDependencies):

```
npx jetify
```

Otherwise some variation of these steps might fix it:

1. Stop the haul server.
2. Go to the /android subdirectory, and run `./gradlew clean` (for Windows `./gradlew.bat clean`).
3. Uninstall the app on the device.
4. Start the haul server (`npm run haul`) again.
5. Run `react-native run-android` again.

### Logging

Logcat can be very useful in debugging problems with React Native:

-   To clear log (reducing clutter before you try something that needs logging):

```bash
adb logcat -c
```

-   Capture all errors minus a bunch of junk:

```console
adb logcat *:E  Finsky:S msm8916_platform:S GLSActivity:S ACDB-LOADER:S dd_service:S WifiStateMachine:S CompatibilityInfo:S ChromeSync:S Auth:S  BatteryService:S PowerManagerService:S HeadsetStateMachine:S KeyguardUpdateMonitor:S QtiImsExtUtils:S cnss-daemon:S wpa_supplicant:S BrcmNfcNfa:S Atfwd_Daemon:S QC-time-services:S DrmWidevineDash:S QSEECOMAPI:S bt_hci:S vendor.qti.bluetooth@1.0-bluetooth_hci:S vendor.qti.bluetooth@1.0-ibs_handler:S MessageQueue:S SecureProfileListener:S audio_hw_primary:S GoogleAuthUtil:S Tycho.VoiceLibrary:S msgr.msys:S
```

-   Capture all app specific logging and few other things that might help:

```bash
adb logcat -s rlxnative:* SQLiteCastStore:* bt_btm:* BtGatt:* NotificationService:*
```

### Potential "Gotchas"

---

If you're on MacOS and you get an error that looks something like this:

```console
Error: spawnSync ./gradlew EACCES
    at Object.spawnSync (internal/child_process.js:998:20)
    at spawnSync (child_process.js:622:24)
    at Object.execFileSync (child_process.js:650:13)
    at runOnAllDevices (/home/user/react/front-end/project/node_modules    /react-native/local-cli/runAndroid/runAndroid.js:299:19)
    at buildAndRun (/home/user/react/front-end/project/node_modules/react-native/local-cli/runAndroid/runAndroid.js:135:12)
    at isPackagerRunning.then.result (/home/user/react/front-end/project/node_modules/react-native/local-cli/runAndroid/runAndroid.js:65:12)
    at processTicksAndRejections (internal/process/next_tick.js:81:5)
```

This is a permissions issue. We need to give executable permissions to `gradlew`. You can achieve this by running:

```bash
chmod 755 android/gradlew
```

---

When using debug mode the app actually runs inside of chrome, so if you use any web specific code, it will work in debug mode, but will break in production see the following post: https://stackoverflow.com/a/52397706

### Network Debugging

There are other tools you can install that are specific to react-native, but I haven't had good luck with any of them. To me it's easier just to install wireshark and set your filter like so:
`(http) && ((ip.src == 192.168.12.117) || (ip.dst == 192.168.12.117))`

This example has a device with an IP of 192.168.12.117. To get your Android device IP: `adb shell ip addr show wlan0`.
