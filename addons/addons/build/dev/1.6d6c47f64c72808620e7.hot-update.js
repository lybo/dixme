webpackHotUpdate(1,{

/***/ "./src/guide/popup/index.js":
/*!**********************************!*\
  !*** ./src/guide/popup/index.js ***!
  \**********************************/
/*! exports provided:  */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(/*! ./index.css */ "./src/guide/popup/index.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__index_css__);
var _jsxFileName = '/Users/georgioslymperis/Documents/projects/dixme/addons/src/guide/popup/index.js',
    _this = this;





var Popup = function Popup() {
  var openTheUserGuide = function openTheUserGuide() {
    var brow = /Chrome/.test(navigator.userAgent) ? chrome : browser;
    brow.tabs.create({
      active: true,
      url: 'https://github.com/constfun/create-react-WebExtension/blob/master/packages/react-scripts/template/README.md'
    });
  };

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'Popup', onClick: openTheUserGuide, __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: _this
    },
    'This popup is just an example.',
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: _this
    }),
    'Click it to open the user guide.'
  );
};

__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Popup, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 22
  },
  __self: this
}), document.querySelector('main'));

/***/ })

})
//# sourceMappingURL=1.6d6c47f64c72808620e7.hot-update.js.map