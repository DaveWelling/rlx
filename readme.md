# React, Loki and XState

Motivation described here:
https://theredcircuit.com/posts/reactLokiXstate/

Component descriptions here:
https://theredcircuit.com/posts/reactLokiXstatePart2/

I intend to write a part 3 to discuss the XState machine used for the form.
https://theredcircuit.com/posts/reactLokiXstatePart3/

### Questions

-   Why do you have `rc()` (short for `react.createElement()`) calls instead of JSX?
    -   At my work we have a VERY large component code base and running JSX babel transforms was taking up the vast majority of the time needed to run our unit tests. This syntax is almost identical to JSX, but without the need to do context switching with curly braces whenever you need code or a variable value. It's all JavaScript.
-   Why do you always declare functions on your react exports?
    -   Because then the component or hook name will appear in stack traces (or the inspector **Component** tree) instead of `__WEBPACK_DEFAULT_EXPORT__`.
        -   For example `export default function useLokiView() { /* hook code */ }` will give the function name in the stack as `useLokiView`, whereas `export default ()=>{ /* hook code */ }` will give it as `__WEBPACK_DEFAULT_EXPORT__`.
-   Why didn't you use react-native-web instead of creating your own primitives?
    -   The react-native code is consumed by react-native-web - which results in a cascade of dependencies, some of which (e.g. flow) require babel to run before tests can run which would slow down tests immensely.
-   Why did you fix the react version to "react": "16.13.1"?
    -   Because react-native does. If I don't follow suit, then NPM will fail because peer-dependencies do not match (unless I use the --legacy-peer-deps flag). I have no idea why react-native locks it. Assuming react follows semver rules, there should be no reason for it that I can think of. Perhaps react-native has dependencies on react internals?
-   Why do you add a name attribute to your styled components (e.g. `const DetailOnly = styled(View).attrs({ name: 'DetailOnly' })`?
    -   Styled components creates dynamic class names, so adding this attribute makes it easier to see where the styles are used in the DOM.
    ```
    <div name="DetailOnly" class="sc-gKsewC sc-iwyYcG dgHSZG kiLTkw"></div>
    ```
-   Why do you sometimes destructure on a separate line?
    ```
    import react from 'react';
    const { createElement, createContext, useState, useEffect } = react;
    ```
    -   When using Haul, the HarmonyImportSpecifierDependency module in webpack thinks react and react-native are not ES6 modules and the module will throw an error like `Can't import the named export '<function name>' from non EcmaScript module`
        -   I think this may have something to do with aliasing the them in the webpack config, but I haven't figure it out.
