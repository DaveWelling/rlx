# React Loki and XState

Description here:
https://theredcircuit.com/posts/reactLokiXstate/

### Questions

-   Why do you always declare functions on your react exports?
    -   Because then the component or hook name will appear in stack traces (or the inspector **Component** tree) instead of `__WEBPACK_DEFAULT_EXPORT__`.
        -   For example `export default function useLokiView() { /* hook code */ }` will give the function name in the stack as `useLokiView`, whereas `export default ()=>{ /* hook code */ }` will give it as `__WEBPACK_DEFAULT_EXPORT__`.
