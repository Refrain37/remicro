// __MICRO_APP_ENVIRONMENT__和__MICRO_APP_PUBLIC_PATH__是由micro-app注入的全局变量
if (window.__RM_APP_ENV__) {
    // eslint-disable-next-line
    __webpack_public_path__ = window.__RM_APP_PUBLIC_PATH__
}