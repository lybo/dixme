webpackHotUpdate(2,{

/***/ "./src/guide/background-script/index.js":
/*!**********************************************!*\
  !*** ./src/guide/background-script/index.js ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var brow = /Chrome/.test(navigator.userAgent) ? window.chrome : window.browser;

brow.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'update') {
    return;
  }

  brow.tabs.create({
    active: true,
    url: 'https://github.com/constfun/create-react-WebExtension/blob/master/packages/react-scripts/template/README.md'
  });
});

/***/ })

})
//# sourceMappingURL=2.a07a867f2fb468dbb503.hot-update.js.map