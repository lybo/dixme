webpackHotUpdate(0,{

/***/ "./src/guide/content-script/Search.js":
/*!********************************************!*\
  !*** ./src/guide/content-script/Search.js ***!
  \********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_scripts_webextension__ = __webpack_require__(/*! react-scripts-webextension */ "./node_modules/react-scripts-webextension/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_scripts_webextension___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_scripts_webextension__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Search_css__ = __webpack_require__(/*! ./Search.css */ "./src/guide/content-script/Search.css");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Search_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Search_css__);
var _jsxFileName = '/Users/georgioslymperis/Documents/projects/dixme/addons/src/guide/content-script/Search.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Search = function (_Component) {
  _inherits(Search, _Component);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _this.handleChange = function (event) {
      _this.setState({
        query: event.currentTarget.value
      });
    };

    _this.state = {
      query: ''
    };
    return _this;
  }

  _createClass(Search, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'Search', __source: {
            fileName: _jsxFileName,
            lineNumber: 22
          },
          __self: this
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'bar', __source: {
              fileName: _jsxFileName,
              lineNumber: 23
            },
            __self: this
          },
          '33333:',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
            type: 'search',
            placeholder: 'Search the User Guide',
            value: this.state.query,
            onChange: this.handleChange,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            },
            __self: this
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_scripts_webextension__["ReadmeSearch"], { query: this.state.query, __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          },
          __self: this
        })
      );
    }
  }]);

  return Search;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Search);

/***/ })

})
//# sourceMappingURL=0.dedc0e17bb2584d17035.hot-update.js.map