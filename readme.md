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
