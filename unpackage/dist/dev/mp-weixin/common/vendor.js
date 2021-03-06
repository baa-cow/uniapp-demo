(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context????????????
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// ??????????????????
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime ??????????????? uni ???????????????????????????????????? uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // ?????????????????????????????????????????????????????????__id__???????????????????????????mp-weixin??????navigateTo???AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// ?????? api ???????????????
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue ??? false ???????????????????????????????????????????????????????????????????????????
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// ??????????????????
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// ???????????? key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}????????????????????? key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// ???????????? returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// ??????????????? api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// ?????? api ??????????????????
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// ?????? api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // ?????? Vue.prototype ???????????????
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"????????????","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('?????? Vue ??? data ???????????????????????? data ???????????????????????? data ?????????????????? vm ??????????????????????????????????????????????????????', data);
      }
    }
  } else {
    try {
      // ??? data ?????????
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // ????????????????????? render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // ?????????????????????????????????????????????
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // ??????????????????????????? $slots ??? props??????????????? vueSlots ????????? $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO ???????????? mpvue ??? mp ??????
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for ???????????????????????????', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent ????????????????????? event ??????
  if (isCustom) {// ???????????????
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// ???????????????????????? event ??? detail ??????
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent ?????????????????????
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // ???????????? scoped slots ??????????????????????????????????????????
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('?????????????????????');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // ????????? web-view ?????? dataset ?????????
  if (!eventOpts) {
    return console.warn('?????????????????????');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao ?????????????????? scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // ??????????????????????????????????????????????????????????????????????????????
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // ???????????????????????????getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// ?????????????????????????????????????????????????????? onShow ??? onLaunch ??????
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// ?????? ???2.2.3 ????????????????????? 2.3.0 ??? nextTick ??????
          console.error('?????????????????????????????????????????? ?????????????????????-??????-????????????-????????????????????? ?????????`2.3.0`??????');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm ???????????? globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // ??????????????? globalData
  appOptions.globalData = vm.$options.globalData || {};
  // ??? methods ?????????????????? getApp() ???
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // ??????????????????(????????????:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // ??????????????????
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO ???????????? for ?????? scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail ?????????,value ?????????(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // ?????? multipleSlots ??????????????? bug??????????????????????????? ??? u-list?????????????????????
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // ??????????????????
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // ????????? vue ??????
        this.$vm = new VueComponent(options);

        // ??????$slots,$scopedSlots???????????????????????????$slots???
        initSlots(this.$vm, properties.vueSlots);

        // ???????????? setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // ????????? props ???????????? true????????????????????? false ????????? created,ready ??????, ??? attached ?????????
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // ?????? mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!*****************************************************************!*\
  !*** C:/Users/MAIBENBEN/Desktop/??????/uni-app/my_shop/util/api.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.myRequest = myRequest;var _mockMp = _interopRequireDefault(__webpack_require__(/*! ./better-mock/dist/mock.mp.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var cart = [];
//?????????api
_mockMp.default.mock("/index/swiper", {
  'data|4': [{
    "id|+1": 1,
    "image": "@image(200x100, #eee, @color, png, swiper)" }] });


//????????????
_mockMp.default.mock("/index/hot", {
  'data|10': [{
    "id|+1": 1,
    "image": "@image(200x100, #eee, @color, png, goods)",
    "title": "@ctitle(9,23)",
    "add_time": "@datetime()",
    "sell_price|10-2000": 1,
    "market_price|10-2000": 1,
    "num|": "21478973758923",
    "stock": 200,
    "buy": 0,
    "detail": "<div>\n        <p><span><span style=\"color: #999999;\"><strong>\u540D\u79F0\uFF1A\u7AF9\u7F16\u6258\u76D8</strong></span></span>\n        </p>\n        <p><span><span style=\"color: #999999;\"><strong>\u89C4\u683C\uFF1A<strong style=\"color: #999999;\">\u7279\u5C0F\u53F7 &nbsp;<strong>15x15cm</strong>&nbsp; &nbsp;\u5185\u90E8\u51C0\u542B\u5C3A\u5BF811x11cm</strong></strong></span></span>\n        </p>\n        <p><span><span style=\"color: #999999;\"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; \u5C0F\u53F7 &nbsp;<strong style=\"color: #999999;\">23x18cm</strong>&nbsp; &nbsp; &nbsp; &nbsp;\u5185\u90E8\u51C0\u542B\u5C3A\u5BF819x13cm</strong></span></span>\n        </p>\n        <p><span><span style=\"color: #999999;\"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; \u4E2D\u53F7 &nbsp;29cmx24cm &nbsp;\u5185\u90E8\u51C0\u542B\u5C3A\u5BF825.5x18.5cm</strong></span></span>\n        </p>\n        <p><span><span style=\"color: #999999;\"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; \u5927\u53F7 &nbsp;34cmx28cm &nbsp;\u5185\u90E8\u51C0\u542B\u5C3A\u5BF8&nbsp;30cmx22cm</strong></span></span>\n        </p>\n        <p>\n\t\t\t<span style=\"width: 750.0rpx;height: 421.0rpx;margin: 0;display: block;\">\n\t\t\t\t<img  src=\"https://img.alicdn.com/imgextra/i2/489752881/TB2kUOvaVXXXXanXXXXXXXXXXXX_!!489752881.jpg\" class=\"img\">\n\t\t\t</span>\n            <span style=\"width: 750.0rpx;height: 421.0rpx;margin: 0;display: block;\">\n\t\t\t\t<img  src=\"https://img.alicdn.com/imgextra/i1/489752881/TB2veivaVXXXXaNXXXXXXXXXXXX_!!489752881.jpg\" class=\"img\">\n             </span>\n\t\t\t <span style=\"width: 750.0rpx;height: 421.r0px;margin: 0;display: block;\">\n\t\t\t\t<img  src=\"https://img.alicdn.com/imgextra/i1/489752881/TB2s5isaVXXXXcnXXXXXXXXXXXX_!!489752881.jpg\" class=\"img\">\n\t\t\t</span>\n            <span style=\"width: 750.0rpx;height: 421.0rpx;margin: 0;display: block;\">\n                <img  src=\"https://img.alicdn.com/imgextra/i3/489752881/TB2iIqtaVXXXXccXXXXXXXXXXXX_!!489752881.jpg\" class=\"img\" >\n            </span>\n            <span style=\"width: 750.0px;height: 421.0px;margin: 0;display: block;\">\n                <img  src=\"https://img.alicdn.com/imgextra/i3/489752881/TB2JzOsaVXXXXcsXXXXXXXXXXXX_!!489752881.jpg\" class=\"img\" >\n            </span>\n            <span style=\"width: 750.0rpx;height: 421.0rpx;margin: 0;display: block;\">\n                    <img  src=\"https://img.alicdn.com/imgextra/i4/489752881/TB27sOxaVXXXXXBXXXXXXXXXXXX_!!489752881.jpg\" class=\"img\" >\n            </span>\n            <span style=\"width: 750.0rpx;height: 421.0rpx;margin: 0;display: block;\">\n                <img  src=\"https://img.alicdn.com/imgextra/i1/489752881/TB2iWqsaVXXXXciXXXXXXXXXXXX_!!489752881.jpg\" class=\"img\">\n            </span>\n            <span style=\"width: 750.0rpx;height: 421.0rpx;margin: 0;display: block;\">\n                <img  src=\"https://img.alicdn.com/imgextra/i1/489752881/TB2GrusaVXXXXcWXXXXXXXXXXXX_!!489752881.jpg\" class=\"img\" >\n            </span>\n        </p>\n    </div>" }] });







































//????????????
_mockMp.default.mock("/pics/nav", function (option) {

  return _mockMp.default.mock({
    'data|14': [{
      "id|+1": 1,
      "title": "@ctitle(4)",
      'img|3': [{ "pic": "@image(200x100, #eee,@color, png, pic)",
        "p": "@ctitle(3,17)" }] }] });



});
//??????
_mockMp.default.mock("/news/new", {
  'data|14': [{
    "id|+1": 1,
    "title": "@ctitle(9,23)",
    "image": "@image(200x150, #eee, @color, png, swiper)",
    "time": "@datetime()",
    "watch|0-9999": 1,
    "content": "<div>\n        <div>\n            <p class=\"first\"><span>\u3010\u73AF\u7403\u65F6\u62A5\u7279\u7EA6\u8BB0\u8005 \u5415\u514B\u3011\u88AB\u79F0\u4E3A\u201C\u53F2\u4E0A\u6700\u62E5\u6324\u7AEF\u5348\u6863\u201D\u5E76\u6CA1\u6709\u8FCE\u6765\u9884\u671F\u4E2D\u7684\u7968\u623F\u4F73\u7EE9\uFF0C\u4E0E\u6E05\u660E\u6863\u3001\u4E94\u4E00\u6863\u7684\u706B\u7206\u76F8\u6BD4\uFF0C\u4ECA\u5E74\u7AEF\u5348\u8282\u4E09\u5929\u5C0F\u957F\u5047\u91CC\u7684\u56FD\u5185\u7535\u5F71\u5E02\u573A\u663E\u5F97\u6CE2\u6F9C\u4E0D\u60CA\u3002\u622A\u81F314\u65E522\u65F6\uFF0C\u4ECA\u5E74\u7AEF\u5348\u6863\u603B\u7968\u623F\u4EC54.6\u4EBF\u5143\u4EBA\u6C11\u5E01\uFF0C\u8FDC\u4E0D\u59822019\u5E74\u76847.85\u4EBF\u3002\u7A76\u5176\u539F\u56E0\uFF0C\u8FD8\u662F\u56E0\u4E3A\u7F3A\u4E4F\u201C\u5934\u90E8\u5927\u7247\u201D\u548C\u201C\u53E3\u7891\u7206\u6B3E\u201D\u5E26\u52A8\u5927\u76D8\uFF0C\u6B64\u5916\u7535\u5F71\u5BA3\u4F20\u4E0D\u591F\u79EF\u6781\uFF0C\u5BF9\u89C2\u4F17\u7F3A\u4E4F\u660E\u786E\u5438\u5F15\u529B\uFF0C\u964D\u4F4E\u5047\u671F\u89C2\u5F71\u610F\u613F\u3002</span></p>\n        </div>\n        <div>\n            <p><span>\u636E\u7EDF\u8BA1\uFF0C\u76EE\u524D\u7AEF\u5348\u6863\u65B0\u7247\u7968\u623F\u6682\u65F6\u9886\u5148\u7684\u662F\u4F53\u80B2\u9898\u6750\u5F71\u7247\u300A\u8D85\u8D8A\u300B\uFF088742\u4E07\u5143\uFF09\uFF0C\u8BB2\u8FF0\u90D1\u607A\u9970\u6F14\u7684\u524D\u201C\u767E\u7C73\u98DE\u4EBA\u201D\u90DD\u8D85\u8D8A\u7ECF\u5386\u4EBA\u751F\u8F6C\u6298\u540E\u9677\u5165\u4F4E\u8C37\uFF0C\u4E0E\u6614\u65E5\u631A\u53CB\u518D\u805A\u5524\u9192\u4E86\u4ED6\u7684\u70ED\u8840\u56DE\u5FC6\uFF0C\u6700\u7EC8\u5B9E\u73B0\u81EA\u6211\u8D85\u8D8A\u7684\u6545\u4E8B\u3002\u4E0E\u5317\u7F8E\u540C\u6B65\u4E0A\u6620\u7684\u597D\u83B1\u575E\u65B0\u7247\u300A\u5F7C\u5F97\u51542\uFF1A\u9003\u8DD1\u8BA1\u5212\u300B\u7D27\u968F\u5176\u540E\uFF0C7645\u4E07\u5143\u7684\u9996\u5468\u672B\u7968\u623F\u4E5F\u9884\u793A\u7740\u5176\u6700\u7EC8\u6536\u5165\u548C\u4E09\u5E74\u524D\u7684\u7B2C\u4E00\u90E8\u5E73\u9F50\u3002</span></p>\n        </div>\n        <div>\n            <p><span >\u6B64\u5916\uFF0C\u300A\u4F60\u597D\u4E16\u754C\u300B\u300A\u9633\u5149\u59D0\u59B9\u6DD8\u300B\u300A\u5F53\u7537\u4EBA\u604B\u7231\u65F6\u300B\u548C\u300A\u70ED\u5E26\u5F80\u4E8B\u300B\u7684\u7968\u623F\u90FD\u57285000\u4E07\u5143\u5DE6\u53F3\uFF0C\u6392\u7247\u7387\u4E0D\u5206\u4F2F\u4EF2\uFF0C\u6CA1\u4E00\u90E8\u80FD\u50CF\u4E4B\u524D\u300A\u60AC\u5D16\u4E4B\u4E0A\u300B\u7B49\u7247\u90A3\u6837\u8131\u9896\u800C\u51FA\uFF0C\u5BFC\u81F4\u6574\u4F53\u5E02\u573A\u88AB\u5747\u5206\u3002\u800C\u524D\u51E0\u5E74\u7AEF\u5348\u6863\u6070\u9022\u597D\u83B1\u575E\u6691\u671F\u6863\u5F00\u5E02\uFF0C\u300AX\u6218\u8B66\uFF1A\u5929\u542F\u300B\u300A\u4F8F\u7F57\u7EAA\u4E16\u754C2\u300B\u300A\u54E5\u65AF\u62C92\uFF1A\u602A\u7269\u4E4B\u738B\u300B\u7B49\u8FDB\u53E3\u7247\u5BF9\u89C2\u4F17\u7684\u5F3A\u52BF\u5438\u5F15\uFF0C\u8DB3\u4EE5\u628A\u6574\u4F53\u5927\u76D8\u63A8\u9AD8\u5230\u4E03\u516B\u4EBF\u7684\u9AD8\u5EA6\u3002</span></p>\n        </div>\n        <div >\n            <p><span>\u4ECA\u5E74\u7AEF\u5348\u6863\u9677\u5165\u4F4E\u8FF7\u7684\u53E6\u4E00\u4E2A\u539F\u56E0\uFF0C\u662F\u5404\u90E8\u5F71\u7247\u7684\u53E3\u7891\u5DEE\u8DDD\u6CA1\u6709\u5B8C\u5168\u62C9\u5F00\uFF0C\u5931\u53BB\u5BF9\u89C2\u4F17\u7684\u5F15\u9886\u4F5C\u7528\u3002\u8C46\u74E3\u8BC4\u5206\u6700\u9AD8\u7684\u300A\u5F7C\u5F97\u51542\uFF1A\u9003\u8DD1\u8BA1\u5212\u300B\u4E3A7.3\u5206\uFF0C\u6700\u4F4E\u7684\u300A\u9633\u5149\u59D0\u59B9\u6DD8\u300B\u4E3A5.0\u5206\uFF0C\u90FD\u6CA1\u80FD\u5F15\u53D1\u793E\u4F1A\u8BDD\u9898\u6548\u5E94\uFF0C\u6210\u4E3A\u300A\u6211\u7684\u59D0\u59D0\u300B\u300A\u4F60\u597D\uFF0C\u674E\u7115\u82F1\u300B\u90A3\u6837\u5438\u5F15\u66F4\u591A\u89C2\u4F17\u7684\u7206\u6B3E\u3002</span></p>\n        </div>\n        <div >\n            <p><span >\u9274\u4E8E\u6574\u4E2A\u7535\u5F71\u5E02\u573A\u4E94\u516D\u6708\u4E00\u76F4\u5904\u4E8E\u6DE1\u5B63\uFF0C\u5728\u597D\u83B1\u575E\u5927\u7247\u532E\u4E4F\u3001\u56FD\u4EA7\u65B0\u7247\u5B9A\u6863\u72B9\u8C6B\u7684\u5FC3\u6001\u4E0B\uFF0C\u6691\u671F\u80FD\u5426\u8FCE\u6765\u590D\u82CF\u8FD8\u5F88\u96BE\u9884\u6D4B\u3002</span></p>\n        </div>\n        <div>\n            <span >\u672C\u6587\u6765\u6E90\uFF1A\u73AF\u7403\u65F6\u62A5</span>\n        </div>\n        <div><span>\u4E3E\u62A5/\u53CD\u9988</span></div>\n    </div>" }] });






















//???????????????
_mockMp.default.mock("/addcart", function (option) {
  var currentGood = "";
  if (cart.length > 0) {
    cart.forEach(function (item, i) {
      if (item.id == option.body.id) {
        if (option.body.c) {
          item.buy = option.body.c;
        }
        // cart[i] = option.body
        currentGood = item;
      }
    });
    if (currentGood == '') {
      cart.push(option.body);
      currentGood = option.body;
    }
  } else {
    cart.push(option.body);
    currentGood = option.body;
  }
  return {
    data: currentGood };

});
//???????????????	
_mockMp.default.mock("/cart", function (o) {
  return {
    data: cart };

});
function myRequest(option) {
  return new Promise(function (resolve, reject) {
    uni.request({
      url: option.url,
      method: option.method || "GET",
      data: option.data || {},
      success: function success(res) {
        if (res.statusCode == 200) {
          resolve(res.data.data);
        }
      },
      fail: function fail(err) {
        reject(err);
      } });

  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 112:
/*!*********************************************************************************************************!*\
  !*** C:/Users/MAIBENBEN/Desktop/??????/uni-app/my_shop/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 12:
/*!**************************************************************************************!*\
  !*** C:/Users/MAIBENBEN/Desktop/??????/uni-app/my_shop/util/better-mock/dist/mock.mp.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
  * better-mock v0.3.1 (mock.mp.js)
  * (c) 2019-2021 lavyun@163.com
  * Released under the MIT License.
  */

(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
})(this, function () {'use strict';

  var constant = {
    GUID: 1,
    RE_KEY: /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/,
    RE_TRANSFER_TYPE: /#(.*)$/,
    RE_RANGE: /([\+\-]?\d+)-?([\+\-]?\d+)?/,
    RE_PLACEHOLDER: /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g };


  /* type-coverage:ignore-next-line */
  var _type = function type(value) {
    return isDef(value) ?
    Object.prototype.toString.call(value).match(/\[object (\w+)\]/)[1].toLowerCase() :
    String(value);
  };
  var isDef = function isDef(value) {
    return value !== undefined && value !== null;
  };
  var isString = function isString(value) {
    return _type(value) === 'string';
  };
  var isNumber = function isNumber(value) {
    return _type(value) === 'number';
  };
  var isObject = function isObject(value) {
    return _type(value) === 'object';
  };
  var isArray = function isArray(value) {
    return _type(value) === 'array';
  };
  var isRegExp = function isRegExp(value) {
    return _type(value) === 'regexp';
  };
  var isFunction = function isFunction(value) {
    return _type(value) === 'function';
  };
  var keys = function keys(obj) {
    var keys = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  var values = function values(obj) {
    var values = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        values.push(obj[key]);
      }
    }
    return values;
  };
  /**
      * Mock.heredoc(fn)
      * ?????????????????????????????????????????????HTML ?????????
      * http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript
      */
  var heredoc = function heredoc(fn) {
    // 1. ??????????????? function(){ /*!
    // 2. ??????????????? */ }
    // 3. ??????????????????????????????
    return fn.
    toString().
    replace(/^[^\/]+\/\*!?/, '').
    replace(/\*\/[^\/]+$/, '').
    replace(/^[\s\xA0]+/, '').
    replace(/[\s\xA0]+$/, ''); // .trim()
  };
  var noop = function noop() {};
  var assert = function assert(condition, error) {
    if (!condition) {
      throw new Error('[better-mock] ' + error);
    }
  };
  /**
      * ???????????????????????????????????? IE
      * @param type ???????????????????????????????????????
      * @param bubbles ????????????????????????????????????????????????
      * @param cancelable ??????????????????????????????????????????????????????
      * @param detail ?????????????????????????????????????????????????????????
      */
  var createCustomEvent = function createCustomEvent(type, bubbles, cancelable, detail) {
    if (bubbles === void 0) {bubbles = false;}
    if (cancelable === void 0) {cancelable = false;}
    try {
      return new CustomEvent(type, { bubbles: bubbles, cancelable: cancelable, detail: detail });
    }
    catch (e) {
      var event_1 = document.createEvent('CustomEvent');
      event_1.initCustomEvent(type, bubbles, cancelable, detail);
      return event_1;
    }
  };

  var Util = /*#__PURE__*/Object.freeze({
    type: _type,
    isDef: isDef,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isArray: isArray,
    isRegExp: isRegExp,
    isFunction: isFunction,
    keys: keys,
    values: values,
    heredoc: heredoc,
    noop: noop,
    assert: assert,
    createCustomEvent: createCustomEvent });


  /*! *****************************************************************************
                                             Copyright (c) Microsoft Corporation. All rights reserved.
                                             Licensed under the Apache License, Version 2.0 (the "License"); you may not use
                                             this file except in compliance with the License. You may obtain a copy of the
                                             License at http://www.apache.org/licenses/LICENSE-2.0
                                               THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
                                             KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
                                             WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
                                             MERCHANTABLITY OR NON-INFRINGEMENT.
                                               See the Apache Version 2.0 License for specific language governing permissions
                                             and limitations under the License.
                                             ***************************************************************************** */



  var _assign = function __assign() {
    _assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];}
      }
      return t;
    };
    return _assign.apply(this, arguments);
  };

  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) {s += arguments[i].length;}
    for (var r = Array(s), k = 0, i = 0; i < il; i++) {
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
        r[k] = a[j];}}
    return r;
  }

  var MAX_NATURE_NUMBER = 9007199254740992;
  var MIN_NATURE_NUMBER = -9007199254740992;
  // ?????????????????????????????????
  var _boolean = function _boolean(min, max, current) {
    if (min === void 0) {min = 1;}
    if (max === void 0) {max = 1;}
    if (isDef(current)) {
      if (isDef(min)) {
        min = !isNaN(min) ? parseInt(min.toString(), 10) : 1;
      }
      if (isDef(max)) {
        max = !isNaN(max) ? parseInt(max.toString(), 10) : 1;
      }
      return Math.random() > 1.0 / (min + max) * min ? !current : current;
    }
    return Math.random() >= 0.5;
  };
  var bool = _boolean;
  // ????????????????????????????????????????????? 0 ???????????????
  var natural = function natural(min, max) {
    if (min === void 0) {min = 0;}
    if (max === void 0) {max = MAX_NATURE_NUMBER;}
    min = parseInt(min.toString(), 10);
    max = parseInt(max.toString(), 10);
    return Math.round(Math.random() * (max - min)) + min;
  };
  // ??????????????????????????????
  var integer = function integer(min, max) {
    if (min === void 0) {min = MIN_NATURE_NUMBER;}
    if (max === void 0) {max = MAX_NATURE_NUMBER;}
    min = parseInt(min.toString(), 10);
    max = parseInt(max.toString(), 10);
    return Math.round(Math.random() * (max - min)) + min;
  };
  var _int = integer;
  // ?????????????????????????????????
  var _float = function _float(min, max, dmin, dmax) {
    dmin = isDef(dmin) ? dmin : 0;
    dmin = Math.max(Math.min(dmin, 17), 0);
    dmax = isDef(dmax) ? dmax : 17;
    dmax = Math.max(Math.min(dmax, 17), 0);
    var ret = integer(min, max) + '.';
    for (var i = 0, dcount = natural(dmin, dmax); i < dcount; i++) {
      // ????????????????????? 0???????????????????????? 0????????? JS ??????????????????
      var num = i < dcount - 1 ? character('number') : character('123456789');
      ret += num;
    }
    return parseFloat(ret);
  };
  // ???????????????????????????
  var character = function character(pool) {
    if (pool === void 0) {pool = '';}
    var lower = 'abcdefghijklmnopqrstuvwxyz';
    var upper = lower.toUpperCase();
    var number = '0123456789';
    var symbol = '!@#$%^&*()[]';
    var pools = {
      lower: lower,
      upper: upper,
      number: number,
      symbol: symbol,
      alpha: lower + upper };

    if (!pool) {
      pool = lower + upper + number + symbol;
    } else
    {
      pool = pools[pool.toLowerCase()] || pool;
    }
    return pool.charAt(natural(0, pool.length - 1));
  };
  var _char = character;
  // ??????????????????????????????
  var string = function string(pool, min, max) {
    var len;
    switch (arguments.length) {
      case 0: // ()
        len = natural(3, 7);
        break;
      case 1: // ( length )
        len = pool;
        pool = undefined;
        break;
      case 2:
        // ( pool, length )
        if (typeof arguments[0] === 'string') {
          len = min;
        } else
        {
          // ( min, max )
          len = natural(pool, min);
          pool = undefined;
        }
        break;
      case 3:
        len = natural(min, max);
        break;}

    var text = '';
    for (var i = 0; i < len; i++) {
      text += character(pool);
    }
    return text;
  };
  var str = string;
  // ???????????????????????????
  var range = function range(start, stop, step) {
    if (step === void 0) {step = 1;}
    // range( stop )
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    start = +start;
    stop = +stop;
    step = +step;
    var idx = 0;
    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var range = new Array(len);
    while (idx < len) {
      range[idx++] = start;
      start += step;
    }
    return range;
  };

  var basic = /*#__PURE__*/Object.freeze({
    boolean: _boolean,
    bool: bool,
    natural: natural,
    integer: integer,
    int: _int,
    float: _float,
    character: character,
    char: _char,
    string: string,
    str: str,
    range: range });


  // Date
  var _padZero = function _padZero(value) {
    return value < 10 ? '0' + value : value.toString();
  };
  var patternLetters = {
    yyyy: 'getFullYear',
    yy: function yy(date) {
      return date.getFullYear().toString().slice(2);
    },
    y: 'yy',
    MM: function MM(date) {
      return _padZero(date.getMonth() + 1);
    },
    M: function M(date) {
      return (date.getMonth() + 1).toString();
    },
    dd: function dd(date) {
      return _padZero(date.getDate());
    },
    d: 'getDate',
    HH: function HH(date) {
      return _padZero(date.getHours());
    },
    H: 'getHours',
    hh: function hh(date) {
      return _padZero(date.getHours() % 12);
    },
    h: function h(date) {
      return (date.getHours() % 12).toString();
    },
    mm: function mm(date) {
      return _padZero(date.getMinutes());
    },
    m: 'getMinutes',
    ss: function ss(date) {
      return _padZero(date.getSeconds());
    },
    s: 'getSeconds',
    SS: function SS(date) {
      var ms = date.getMilliseconds();
      return ms < 10 && '00' + ms || ms < 100 && '0' + ms || ms.toString();
    },
    S: 'getMilliseconds',
    A: function A(date) {
      return date.getHours() < 12 ? 'AM' : 'PM';
    },
    a: function a(date) {
      return date.getHours() < 12 ? 'am' : 'pm';
    },
    T: 'getTime' };

  var _createFormatRE = function _createFormatRE() {
    var re = keys(patternLetters);
    return '(' + re.join('|') + ')';
  };
  var _formatDate = function _formatDate(date, format) {
    var formatRE = new RegExp(_createFormatRE(), 'g');
    return format.replace(formatRE, function createNewSubString($0, flag) {
      return typeof patternLetters[flag] === 'function' ?
      patternLetters[flag](date) :
      patternLetters[flag] in patternLetters ?
      createNewSubString($0, patternLetters[flag]) :
      date[patternLetters[flag]]();
    });
  };
  // ????????????????????? Date ?????????
  var _randomDate = function _randomDate(min, max) {
    if (min === void 0) {min = new Date(0);}
    if (max === void 0) {max = new Date();}
    var randomTS = Math.random() * (max.getTime() - min.getTime());
    return new Date(randomTS);
  };
  // ???????????????????????????????????????
  var date = function date(format) {
    if (format === void 0) {format = 'yyyy-MM-dd';}
    return _formatDate(_randomDate(), format);
  };
  // ???????????????????????????????????????
  var time = function time(format) {
    if (format === void 0) {format = 'HH:mm:ss';}
    return _formatDate(_randomDate(), format);
  };
  // ????????????????????????????????????????????????
  var datetime = function datetime(format) {
    if (format === void 0) {format = 'yyyy-MM-dd HH:mm:ss';}
    return _formatDate(_randomDate(), format);
  };
  // ??????????????????????????????
  var timestamp = function timestamp() {
    return Number(_formatDate(_randomDate(), 'T'));
  };
  // ??????????????????????????????????????????
  var now = function now(unit, format) {
    // now(unit) now(format)
    if (arguments.length === 1) {
      // now(format)
      if (!/year|month|day|hour|minute|second|week/.test(unit)) {
        format = unit;
        unit = '';
      }
    }
    unit = (unit || '').toLowerCase();
    format = format || 'yyyy-MM-dd HH:mm:ss';
    var date = new Date();
    // ????????? http://momentjs.cn/docs/#/manipulating/start-of/
    switch (unit) {
      case 'year':
        date.setMonth(0);
        break;
      case 'month':
        date.setDate(1);
        break;
      case 'week':
        date.setDate(date.getDate() - date.getDay());
        break;
      case 'day':
        date.setHours(0);
        break;
      case 'hour':
        date.setMinutes(0);
        break;
      case 'minute':
        date.setSeconds(0);
        break;
      case 'second':
        date.setMilliseconds(0);}

    return _formatDate(date, format);
  };

  var date$1 = /*#__PURE__*/Object.freeze({
    date: date,
    time: time,
    datetime: datetime,
    timestamp: timestamp,
    now: now });


  // ????????????????????????????????????????????????
  var capitalize = function capitalize(word) {
    word = word + '';
    return word.charAt(0).toUpperCase() + word.substr(1);
  };
  // ??????????????????????????????
  var upper = function upper(str) {
    return (str + '').toUpperCase();
  };
  // ??????????????????????????????
  var lower = function lower(str) {
    return (str + '').toLowerCase();
  };
  // ??????????????????????????????
  var pickOne = function pickOne(arr) {
    return arr[natural(0, arr.length - 1)];
  };
  function pick(arr, min, max) {
    if (min === void 0) {min = 1;}
    // pick( item1, item2 ... )
    if (!isArray(arr)) {
      return pickOne(Array.from(arguments));
    }
    // pick( [ item1, item2 ... ], count )
    if (!isDef(max)) {
      max = min;
    }
    if (min === 1 && max === 1) {
      return pickOne(arr);
    }
    // pick( [ item1, item2 ... ], min, max )
    return shuffle(arr, min, max);
  }
  // ???map?????????????????????
  var pickMap = function pickMap(map) {
    return pick(values(map));
  };
  // ?????????????????????????????????????????? min - max ?????????
  var shuffle = function shuffle(arr, min, max) {
    if (!Array.isArray(arr)) {
      return [];
    }
    var copy = arr.slice();
    var length = arr.length;
    for (var i = 0; i < length; i++) {
      var swapIndex = natural(0, length - 1);
      var swapValue = copy[swapIndex];
      copy[swapIndex] = copy[i];
      copy[i] = swapValue;
    }
    if (min && max) {
      return copy.slice(0, natural(min, max));
    }
    if (min) {
      return copy.slice(0, min);
    }
    return copy;
  };

  var helper = /*#__PURE__*/Object.freeze({
    capitalize: capitalize,
    upper: upper,
    lower: lower,
    pickOne: pickOne,
    pick: pick,
    pickMap: pickMap,
    shuffle: shuffle });


  // image
  // ??????????????????
  var imageSize = [
  '150x100', '300x200', '400x300', '600x450', '800x600',
  '100x150', '200x300', '300x400', '450x600', '600x800',
  '100x100', '200x200', '300x300', '450x450', '600x600'];

  /**
                                                           * ????????????????????????????????????http://iph.href.lu????????????
                                                           * https://iph.href.lu/600x400?fg=cc00cc&bg=470047&text=hello
                                                           * @param size ????????????
                                                           * @param background ?????????
                                                           * @param foreground ????????????
                                                           * @param format ????????????
                                                           * @param text ??????
                                                           */
  var image = function image(size, background, foreground, format, text) {
    if (size === void 0) {size = '';}
    if (background === void 0) {background = '';}
    if (foreground === void 0) {foreground = '';}
    if (format === void 0) {format = '';}
    if (text === void 0) {text = '';}
    // Random.image( size, background, foreground, text )
    if (arguments.length === 4) {
      text = format;
      format = '';
    }
    // Random.image( size, background, text )
    if (arguments.length === 3) {
      text = foreground;
      foreground = '';
    }
    // Random.image( size, text )
    if (arguments.length === 2) {
      text = background;
      background = '';
    }
    // Random.image()
    size = size || pick(imageSize);
    if (background && ~background.indexOf('#')) {
      background = background.slice(1);
    }
    if (foreground && ~foreground.indexOf('#')) {
      foreground = foreground.slice(1);
    }
    return format ?
    'https://dummyimage.com/' +
    size + (
    background ? '/' + background : '') + (
    foreground ? '/' + foreground : '') + (
    format ? '.' + format : '') + (
    text ? '?text=' + encodeURIComponent(text) : '') :
    "https://iph.href.lu/" + size + "?bg=" + background + "&fg=" + foreground + "&text=" + text;
  };
  var img = image;
  /**
                    * ?????????????????????base64??????
                    * @param size ????????????
                    * @param text ??????????????????
                    */
  var dataImage = function dataImage(size, text) {
    size = size || pick(imageSize);
    var background = pick([
    '#171515', '#e47911', '#183693', '#720e9e', '#c4302b', '#dd4814',
    '#00acee', '#0071c5', '#3d9ae8', '#ec6231', '#003580', '#e51937']);

    var sizes = size.split('x');
    var width = parseInt(sizes[0], 10);
    var height = parseInt(sizes[1], 10);
    assert(isNumber(width) && isNumber(height), 'Invalid size, expected INTxINT, e.g. 300x400');
    {
      // ??????????????????????????? base64 ???????????????????????????
      return '';
    }
  };

  var image$1 = /*#__PURE__*/Object.freeze({
    image: image,
    img: img,
    dataImage: dataImage });


  // ????????????RGB???HSV(HSL)?????????
  var hsv2rgb = function hsv2rgb(hsv) {
    var h = hsv[0] / 60;
    var s = hsv[1] / 100;
    var v = hsv[2] / 100;
    var hi = Math.floor(h) % 6;
    var f = h - Math.floor(h);
    var p = 255 * v * (1 - s);
    var q = 255 * v * (1 - s * f);
    var t = 255 * v * (1 - s * (1 - f));
    v = 255 * v;
    switch (hi) {
      case 0:
        return [v, t, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t];
      case 3:
        return [p, q, v];
      case 4:
        return [t, p, v];
      case 5:
        return [v, p, q];}

  };
  var hsv2hsl = function hsv2hsl(hsv) {
    var h = hsv[0],s = hsv[1] / 100,v = hsv[2] / 100,sl,l;
    l = (2 - s) * v;
    sl = s * v;
    sl /= l <= 1 ? l : 2 - l;
    l /= 2;
    return [h, sl * 100, l * 100];
  };
  // http://www.140byt.es/keywords/color
  var rgb2hex = function rgb2hex(a, // red, as a number from 0 to 255
  b, // green, as a number from 0 to 255
  c // blue, as a number from 0 to 255
  ) {
    return "#" + ((256 + a << 8 | b) << 8 | c).toString(16).slice(1);
  };

  // ????????????
  var colorMap = {
    navy: '#001F3F',
    blue: '#0074D9',
    aqua: '#7FDBFF',
    teal: '#39CCCC',
    olive: '#3D9970',
    green: '#2ECC40',
    lime: '#01FF70',
    yellow: '#FFDC00',
    orange: '#FF851B',
    red: '#FF4136',
    maroon: '#85144B',
    fuchsia: '#F012BE',
    purple: '#B10DC9',
    silver: '#DDDDDD',
    gray: '#AAAAAA',
    black: '#111111',
    white: '#FFFFFF' };

  // ??????????????????????????????????????????????????? '#RRGGBB'???
  var color = function color(name) {
    if (name === void 0) {name = '';}
    if (name && colorMap[name]) {
      return colorMap[name];
    }
    return hex();
  };
  // #DAC0DE
  var hex = function hex() {
    var hsv = _goldenRatioColor();
    var rgb = hsv2rgb(hsv);
    return rgb2hex(rgb[0], rgb[1], rgb[2]);
  };
  // rgb(128,255,255)
  var rgb = function rgb() {
    var hsv = _goldenRatioColor();
    var rgb = hsv2rgb(hsv);
    return 'rgb(' +
    parseInt(rgb[0].toString(), 10) + ', ' +
    parseInt(rgb[1].toString(), 10) + ', ' +
    parseInt(rgb[2].toString(), 10) + ')';
  };
  // rgba(128,255,255,0.3)
  var rgba = function rgba() {
    var hsv = _goldenRatioColor();
    var rgb = hsv2rgb(hsv);
    return 'rgba(' +
    parseInt(rgb[0].toString(), 10) + ', ' +
    parseInt(rgb[1].toString(), 10) + ', ' +
    parseInt(rgb[2].toString(), 10) + ', ' +
    Math.random().toFixed(2) + ')';
  };
  // hsl(300,80%,90%)
  var hsl = function hsl() {
    var hsv = _goldenRatioColor();
    var hsl = hsv2hsl(hsv);
    return 'hsl(' +
    parseInt(hsl[0], 10) + ', ' +
    parseInt(hsl[1], 10) + ', ' +
    parseInt(hsl[2], 10) + ')';
  };
  // http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
  // https://github.com/devongovett/color-generator/blob/master/index.js
  // ??????????????????????????????????????????
  var _hue = 0;
  var _goldenRatioColor = function _goldenRatioColor(saturation, value) {
    var _goldenRatio = 0.618033988749895;
    _hue = _hue || Math.random();
    _hue += _goldenRatio;
    _hue %= 1;
    if (typeof saturation !== "number")
    saturation = 0.5;
    if (typeof value !== "number")
    value = 0.95;
    return [
    _hue * 360,
    saturation * 100,
    value * 100];

  };

  var color$1 = /*#__PURE__*/Object.freeze({
    color: color,
    hex: hex,
    rgb: rgb,
    rgba: rgba,
    hsl: hsl });


  /** Used to compose unicode character classes. */
  var rsAstralRange = "\\ud800-\\udfff";
  var rsComboMarksRange = "\\u0300-\\u036f";
  var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
  var rsComboSymbolsRange = "\\u20d0-\\u20ff";
  var rsComboMarksExtendedRange = "\\u1ab0-\\u1aff";
  var rsComboMarksSupplementRange = "\\u1dc0-\\u1dff";
  var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange;
  var rsVarRange = "\\ufe0e\\ufe0f";
  /** Used to compose unicode capture groups. */
  var rsZWJ = "\\u200d";
  var rsAstral = "[" + rsAstralRange + "]";
  var rsCombo = "[" + rsComboRange + "]";
  var rsFitz = "\\ud83c[\\udffb-\\udfff]";
  var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
  var rsNonAstral = "[^" + rsAstralRange + "]";
  var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
  var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
  /** Used to compose unicode regexes. */
  var reOptMod = rsModifier + "?";
  var rsOptVar = "[" + rsVarRange + "]?";
  var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ")" + (rsOptVar + reOptMod) + ")*";
  var rsSeq = rsOptVar + reOptMod + rsOptJoin;
  var rsNonAstralCombo = "" + rsNonAstral + rsCombo + "?";
  var rsSymbol = "(?:" + [rsNonAstralCombo, rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ")";
  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + (rsSymbol + rsSeq), 'g');
  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp("[" + (rsZWJ + rsAstralRange + rsComboRange + rsVarRange) + "]");
  /**
                                                                                               * Checks if `string` contains Unicode symbols.
                                                                                               *
                                                                                               * @private
                                                                                               * @param {string} string The string to inspect.
                                                                                               * @returns {boolean} Returns `true` if a symbol is found, else `false`.
                                                                                               */
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }
  /**
     * Converts an ASCII `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
  function asciiToArray(string) {
    return string.split('');
  }
  /**
    * Converts a Unicode `string` to an array.
    *
    * @private
    * @param {string} string The string to convert.
    * @returns {Array} Returns the converted array.
    */
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }
  /**
     * Converts `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
  /* istanbul ignore next */
  function stringToArray(string) {
    return hasUnicode(string) ?
    unicodeToArray(string) :
    asciiToArray(string);
  }

  var _range = function _range(defaultMin, defaultMax, min, max) {
    return !isDef(min) ?
    natural(defaultMin, defaultMax) :
    !isDef(max) ?
    min :
    natural(parseInt(min.toString(), 10), parseInt(max.toString(), 10)); // ( min, max )
  };
  // ???????????????????????????
  var paragraph = function paragraph(min, max) {
    var len = _range(3, 7, min, max);
    var result = [];
    for (var i = 0; i < len; i++) {
      result.push(sentence());
    }
    return result.join(' ');
  };
  var cparagraph = function cparagraph(min, max) {
    var len = _range(3, 7, min, max);
    var result = [];
    for (var i = 0; i < len; i++) {
      result.push(csentence());
    }
    return result.join('');
  };
  // ???????????????????????????????????????????????????????????????
  var sentence = function sentence(min, max) {
    var len = _range(12, 18, min, max);
    var result = [];
    for (var i = 0; i < len; i++) {
      result.push(word());
    }
    return capitalize(result.join(' ')) + '.';
  };
  // ?????????????????????????????????
  var csentence = function csentence(min, max) {
    var len = _range(12, 18, min, max);
    var result = [];
    for (var i = 0; i < len; i++) {
      result.push(cword());
    }
    return result.join('') + '???';
  };
  // ???????????????????????????
  var word = function word(min, max) {
    var len = _range(3, 10, min, max);
    var result = '';
    for (var i = 0; i < len; i++) {
      result += character('lower');
    }
    return result;
  };
  // ????????????????????????????????????
  var cword = function cword(pool, min, max) {
    if (pool === void 0) {pool = '';}
    // ???????????? 500 ????????? http://baike.baidu.com/view/568436.htm
    var cnWords = '????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????';
    var len;
    switch (arguments.length) {
      case 0: // ()
        pool = cnWords;
        len = 1;
        break;
      case 1: // ( pool )
        if (typeof arguments[0] === 'string') {
          len = 1;
        } else
        {
          // ( length )
          len = pool;
          pool = cnWords;
        }
        break;
      case 2:
        // ( pool, length )
        if (typeof arguments[0] === 'string') {
          len = min;
        } else
        {
          // ( min, max )
          len = natural(parseInt(pool, 10), min);
          pool = cnWords;
        }
        break;
      case 3:
        len = natural(min, max);
        break;}

    var result = '';
    for (var i = 0; i < len; i++) {
      result += pool.charAt(natural(0, pool.length - 1));
    }
    return result;
  };
  // ??????????????????????????? emoji ??????
  var emoji = function emoji(pool, min, max) {
    if (!['string', 'number', 'undefined'].includes(typeof pool)) {
      return '';
    }
    // ????????? 338 ???emoji?????? http://www.fhdq.net/emoji.html
    var emojis = '??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????';
    var array = stringToArray(emojis);
    if (typeof pool === 'string') {// emoji("????????????"), emoji("????????", 2), emoji("????????", 2, 3)
      array = stringToArray(pool);
    } else
    if (typeof pool === 'number') {// emoji(2), emoji(2, 3)
      max = min;
      min = pool;
    }
    if (min === undefined || min < 2) {// emoji("????????????"), emoji()
      return pick(array); // pick(['1', '2']) => "2", pick(['1', '2'], 1) => "2"
    }
    return pick(array, min, max).join('');
  };
  // ??????????????????????????????????????????????????????????????????
  var title = function title(min, max) {
    var len = _range(3, 7, min, max);
    var result = [];
    for (var i = 0; i < len; i++) {
      result.push(capitalize(word()));
    }
    return result.join(' ');
  };
  // ?????????????????????????????????
  var ctitle = function ctitle(min, max) {
    var len = _range(3, 7, min, max);
    var result = [];
    for (var i = 0; i < len; i++) {
      result.push(cword());
    }
    return result.join('');
  };

  var text = /*#__PURE__*/Object.freeze({
    paragraph: paragraph,
    cparagraph: cparagraph,
    sentence: sentence,
    csentence: csentence,
    word: word,
    cword: cword,
    emoji: emoji,
    title: title,
    ctitle: ctitle });


  // ???????????????????????????????????????
  var first = function first() {
    var male = [
    "James", "John", "Robert", "Michael", "William",
    "David", "Richard", "Charles", "Joseph", "Thomas",
    "Christopher", "Daniel", "Paul", "Mark", "Donald",
    "George", "Kenneth", "Steven", "Edward", "Brian",
    "Ronald", "Anthony", "Kevin", "Jason", "Matthew",
    "Gary", "Timothy", "Jose", "Larry", "Jeffrey",
    "Frank", "Scott", "Eric"];

    var female = [
    "Mary", "Patricia", "Linda", "Barbara", "Elizabeth",
    "Jennifer", "Maria", "Susan", "Margaret", "Dorothy",
    "Lisa", "Nancy", "Karen", "Betty", "Helen",
    "Sandra", "Donna", "Carol", "Ruth", "Sharon",
    "Michelle", "Laura", "Sarah", "Kimberly", "Deborah",
    "Jessica", "Shirley", "Cynthia", "Angela", "Melissa",
    "Brenda", "Amy", "Anna"];

    return pick(__spreadArrays(male, female));
  };
  // ???????????????????????????????????????
  var last = function last() {
    var names = [
    "Smith", "Johnson", "Williams", "Brown", "Jones",
    "Miller", "Davis", "Garcia", "Rodriguez", "Wilson",
    "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez",
    "Moore", "Martin", "Jackson", "Thompson", "White",
    "Lopez", "Lee", "Gonzalez", "Harris", "Clark",
    "Lewis", "Robinson", "Walker", "Perez", "Hall",
    "Young", "Allen"];

    return pick(names);
  };
  // ??????????????????????????????????????????
  var name = function name(middle) {
    if (middle === void 0) {middle = false;}
    return first() + ' ' + (middle ? first() + ' ' : '') + last();
  };
  // ???????????????????????????????????????
  // [????????????????????????](http://baike.baidu.com/view/1719115.htm)
  // [????????? - ??????????????????????????????](http://xuanpai.sinaapp.com/)
  var cfirst = function cfirst() {
    var names = [
    "???", "???", "???", "???", "???", "???", "???", "???",
    "???", "???", "???", "???", "???", "???", "???", "???",
    "???", "???", "???", "???", "???", "???", "???", "???",
    "???", "???", "???", "???", "???", "???", "???", "???",
    "???", "???", "???", "???", "???", "???", "???", "???",
    "???", "???", "???", "???", "???", "???", "???", "???",
    "???", "???", "???", "???", "???", "???", "???", "???",
    "???", "???", "???", "???", "???", "???", "???", "???",
    "???", "???", "???", "???", "???", "???", "???", "???",
    "???", "???", "???", "???", "???", "???", "???", "???",
    "???", "???", "???", "???", "???", "???", "???", "???",
    "???", "???", "???", "???", "???", "???", "???", "???",
    "???", "???", "???", "???"];

    return pick(names);
  };
  // ???????????????????????????????????????
  // [????????????????????????50???_???????????????](http://www.name999.net/xingming/xingshi/20131004/48.html)
  var clast = function clast() {
    var names = [
    "???", "???", "???", "??????", "???", "???", "???", "???",
    "???", "???", "???", "???", "???", "???", "???", "???",
    "???", "???", "??????", "???", "???", "???", "??????"];

    return pick(names);
  };
  // ??????????????????????????????????????????
  var cname = function cname() {
    return cfirst() + clast();
  };

  var name$1 = /*#__PURE__*/Object.freeze({
    first: first,
    last: last,
    name: name,
    cfirst: cfirst,
    clast: clast,
    cname: cname });


  // ?????????????????? URL???
  var url = function url(_protocol, host) {
    if (_protocol === void 0) {_protocol = protocol();}
    if (host === void 0) {host = domain();}
    return _protocol + "://" + host + "/" + word();
  };
  // ?????????????????? URL ?????????
  var protocol = function protocol() {
    // ?????????
    var protocols = [
    'http', 'ftp', 'gopher', 'mailto', 'mid', 'cid', 'news', 'nntp',
    'prospero', 'telnet', 'rlogin', 'tn3270', 'wais'];

    return pick(protocols);
  };
  // ???????????????????????????
  var domain = function domain(_tld) {
    if (_tld === void 0) {_tld = tld();}
    return word() + '.' + _tld;
  };
  // ?????????????????????????????????
  // [??????????????????](http://www.163ns.com/zixun/post/4417.html)
  var tld = function tld() {
    var tlds = (
    // ????????????
    'com net org edu gov int mil cn ' +
    // ????????????
    'com.cn net.cn gov.cn org.cn ' +
    // ??????????????????
    '?????? ????????????.?????? ????????????.?????? ' +
    // ???????????????
    'tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ' +
    // ????????????????????????
    'ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw').split(' ');
    return pick(tlds);
  };
  // ?????????????????????????????????
  var email = function email(_domain) {
    if (_domain === void 0) {_domain = domain();}
    return character('lower') + '.' + word() + '@' + _domain;
  };
  // ?????????????????? IP ?????????
  var ip = function ip() {
    return natural(0, 255) + '.' +
    natural(0, 255) + '.' +
    natural(0, 255) + '.' +
    natural(0, 255);
  };

  var web = /*#__PURE__*/Object.freeze({
    url: url,
    protocol: protocol,
    domain: domain,
    tld: tld,
    email: email,
    ip: ip });


  var location = {
    "110000": {
      code: "110000",
      name: "?????????",
      cities: {
        "110000": {
          code: "110000",
          name: "?????????",
          districts: {
            "110101": "?????????",
            "110102": "?????????",
            "110105": "?????????",
            "110106": "?????????",
            "110107": "????????????",
            "110108": "?????????",
            "110109": "????????????",
            "110111": "?????????",
            "110112": "?????????",
            "110113": "?????????",
            "110114": "?????????",
            "110115": "?????????",
            "110116": "?????????",
            "110117": "?????????",
            "110118": "?????????",
            "110119": "?????????" } } } },




    "120000": {
      code: "120000",
      name: "?????????",
      cities: {
        "120000": {
          code: "120000",
          name: "?????????",
          districts: {
            "120101": "?????????",
            "120102": "?????????",
            "120103": "?????????",
            "120104": "?????????",
            "120105": "?????????",
            "120106": "?????????",
            "120110": "?????????",
            "120111": "?????????",
            "120112": "?????????",
            "120113": "?????????",
            "120114": "?????????",
            "120115": "?????????",
            "120116": "????????????",
            "120117": "?????????",
            "120118": "?????????",
            "120119": "?????????" } } } },




    "130000": {
      code: "130000",
      name: "?????????",
      cities: {
        "130100": {
          code: "130100",
          name: "????????????",
          districts: {
            "130102": "?????????",
            "130104": "?????????",
            "130105": "?????????",
            "130107": "????????????",
            "130108": "?????????",
            "130109": "?????????",
            "130110": "?????????",
            "130111": "?????????",
            "130121": "?????????",
            "130123": "?????????",
            "130125": "?????????",
            "130126": "?????????",
            "130127": "?????????",
            "130128": "?????????",
            "130129": "?????????",
            "130130": "?????????",
            "130131": "?????????",
            "130132": "?????????",
            "130133": "??????",
            "130181": "?????????",
            "130183": "?????????",
            "130184": "?????????" } },


        "130200": {
          code: "130200",
          name: "?????????",
          districts: {
            "130202": "?????????",
            "130203": "?????????",
            "130204": "?????????",
            "130205": "?????????",
            "130207": "?????????",
            "130208": "?????????",
            "130209": "????????????",
            "130224": "?????????",
            "130225": "?????????",
            "130227": "?????????",
            "130229": "?????????",
            "130281": "?????????",
            "130283": "?????????",
            "130284": "?????????" } },


        "130300": {
          code: "130300",
          name: "????????????",
          districts: {
            "130302": "?????????",
            "130303": "????????????",
            "130304": "????????????",
            "130306": "?????????",
            "130321": "?????????????????????",
            "130322": "?????????",
            "130324": "?????????" } },


        "130400": {
          code: "130400",
          name: "?????????",
          districts: {
            "130402": "?????????",
            "130403": "?????????",
            "130404": "?????????",
            "130406": "????????????",
            "130407": "?????????",
            "130408": "?????????",
            "130423": "?????????",
            "130424": "?????????",
            "130425": "?????????",
            "130426": "??????",
            "130427": "??????",
            "130430": "??????",
            "130431": "?????????",
            "130432": "?????????",
            "130433": "?????????",
            "130434": "??????",
            "130435": "?????????",
            "130481": "?????????" } },


        "130500": {
          code: "130500",
          name: "?????????",
          districts: {
            "130502": "?????????",
            "130503": "?????????",
            "130521": "?????????",
            "130522": "?????????",
            "130523": "?????????",
            "130524": "?????????",
            "130525": "?????????",
            "130526": "??????",
            "130527": "?????????",
            "130528": "?????????",
            "130529": "?????????",
            "130530": "?????????",
            "130531": "?????????",
            "130532": "?????????",
            "130533": "??????",
            "130534": "?????????",
            "130535": "?????????",
            "130581": "?????????",
            "130582": "?????????" } },


        "130600": {
          code: "130600",
          name: "?????????",
          districts: {
            "130602": "?????????",
            "130606": "?????????",
            "130607": "?????????",
            "130608": "?????????",
            "130609": "?????????",
            "130623": "?????????",
            "130624": "?????????",
            "130626": "?????????",
            "130627": "??????",
            "130628": "?????????",
            "130629": "?????????",
            "130630": "?????????",
            "130631": "?????????",
            "130632": "?????????",
            "130633": "??????",
            "130634": "?????????",
            "130635": "??????",
            "130636": "?????????",
            "130637": "?????????",
            "130638": "??????",
            "130681": "?????????",
            "130682": "?????????",
            "130683": "?????????",
            "130684": "????????????" } },


        "130700": {
          code: "130700",
          name: "????????????",
          districts: {
            "130702": "?????????",
            "130703": "?????????",
            "130705": "?????????",
            "130706": "????????????",
            "130708": "?????????",
            "130709": "?????????",
            "130722": "?????????",
            "130723": "?????????",
            "130724": "?????????",
            "130725": "?????????",
            "130726": "??????",
            "130727": "?????????",
            "130728": "?????????",
            "130730": "?????????",
            "130731": "?????????",
            "130732": "?????????" } },


        "130800": {
          code: "130800",
          name: "?????????",
          districts: {
            "130802": "?????????",
            "130803": "?????????",
            "130804": "??????????????????",
            "130821": "?????????",
            "130822": "?????????",
            "130824": "?????????",
            "130825": "?????????",
            "130826": "?????????????????????",
            "130827": "?????????????????????",
            "130828": "??????????????????????????????",
            "130881": "?????????" } },


        "130900": {
          code: "130900",
          name: "?????????",
          districts: {
            "130902": "?????????",
            "130903": "?????????",
            "130921": "??????",
            "130922": "??????",
            "130923": "?????????",
            "130924": "?????????",
            "130925": "?????????",
            "130926": "?????????",
            "130927": "?????????",
            "130928": "?????????",
            "130929": "??????",
            "130930": "?????????????????????",
            "130981": "?????????",
            "130982": "?????????",
            "130983": "?????????",
            "130984": "?????????" } },


        "131000": {
          code: "131000",
          name: "?????????",
          districts: {
            "131002": "?????????",
            "131003": "?????????",
            "131022": "?????????",
            "131023": "?????????",
            "131024": "?????????",
            "131025": "?????????",
            "131026": "?????????",
            "131028": "?????????????????????",
            "131081": "?????????",
            "131082": "?????????" } },


        "131100": {
          code: "131100",
          name: "?????????",
          districts: {
            "131102": "?????????",
            "131103": "?????????",
            "131121": "?????????",
            "131122": "?????????",
            "131123": "?????????",
            "131124": "?????????",
            "131125": "?????????",
            "131126": "?????????",
            "131127": "??????",
            "131128": "?????????",
            "131182": "?????????" } } } },




    "140000": {
      code: "140000",
      name: "?????????",
      cities: {
        "140100": {
          code: "140100",
          name: "?????????",
          districts: {
            "140105": "?????????",
            "140106": "?????????",
            "140107": "????????????",
            "140108": "????????????",
            "140109": "????????????",
            "140110": "?????????",
            "140121": "?????????",
            "140122": "?????????",
            "140123": "?????????",
            "140181": "?????????" } },


        "140200": {
          code: "140200",
          name: "?????????",
          districts: {
            "140212": "?????????",
            "140213": "?????????",
            "140214": "?????????",
            "140215": "?????????",
            "140221": "?????????",
            "140222": "?????????",
            "140223": "?????????",
            "140224": "?????????",
            "140225": "?????????",
            "140226": "?????????" } },


        "140300": {
          code: "140300",
          name: "?????????",
          districts: {
            "140302": "??????",
            "140303": "??????",
            "140311": "??????",
            "140321": "?????????",
            "140322": "??????" } },


        "140400": {
          code: "140400",
          name: "?????????",
          districts: {
            "140403": "?????????",
            "140404": "?????????",
            "140405": "?????????",
            "140406": "?????????",
            "140423": "?????????",
            "140425": "?????????",
            "140426": "?????????",
            "140427": "?????????",
            "140428": "?????????",
            "140429": "?????????",
            "140430": "??????",
            "140431": "?????????" } },


        "140500": {
          code: "140500",
          name: "?????????",
          districts: {
            "140502": "??????",
            "140521": "?????????",
            "140522": "?????????",
            "140524": "?????????",
            "140525": "?????????",
            "140581": "?????????" } },


        "140600": {
          code: "140600",
          name: "?????????",
          districts: {
            "140602": "?????????",
            "140603": "?????????",
            "140621": "?????????",
            "140622": "??????",
            "140623": "?????????",
            "140681": "?????????" } },


        "140700": {
          code: "140700",
          name: "?????????",
          districts: {
            "140702": "?????????",
            "140721": "?????????",
            "140722": "?????????",
            "140723": "?????????",
            "140724": "?????????",
            "140725": "?????????",
            "140726": "?????????",
            "140727": "??????",
            "140728": "?????????",
            "140729": "?????????",
            "140781": "?????????" } },


        "140800": {
          code: "140800",
          name: "?????????",
          districts: {
            "140802": "?????????",
            "140821": "?????????",
            "140822": "?????????",
            "140823": "?????????",
            "140824": "?????????",
            "140825": "?????????",
            "140826": "??????",
            "140827": "?????????",
            "140828": "??????",
            "140829": "?????????",
            "140830": "?????????",
            "140881": "?????????",
            "140882": "?????????" } },


        "140900": {
          code: "140900",
          name: "?????????",
          districts: {
            "140902": "?????????",
            "140921": "?????????",
            "140922": "?????????",
            "140923": "??????",
            "140924": "?????????",
            "140925": "?????????",
            "140926": "?????????",
            "140927": "?????????",
            "140928": "?????????",
            "140929": "?????????",
            "140930": "?????????",
            "140931": "?????????",
            "140932": "?????????",
            "140981": "?????????" } },


        "141000": {
          code: "141000",
          name: "?????????",
          districts: {
            "141002": "?????????",
            "141021": "?????????",
            "141022": "?????????",
            "141023": "?????????",
            "141024": "?????????",
            "141025": "??????",
            "141026": "?????????",
            "141027": "?????????",
            "141028": "??????",
            "141029": "?????????",
            "141030": "?????????",
            "141031": "??????",
            "141032": "?????????",
            "141033": "??????",
            "141034": "?????????",
            "141081": "?????????",
            "141082": "?????????" } },


        "141100": {
          code: "141100",
          name: "?????????",
          districts: {
            "141102": "?????????",
            "141121": "?????????",
            "141122": "?????????",
            "141123": "??????",
            "141124": "??????",
            "141125": "?????????",
            "141126": "?????????",
            "141127": "??????",
            "141128": "?????????",
            "141129": "?????????",
            "141130": "?????????",
            "141181": "?????????",
            "141182": "?????????" } } } },




    "150000": {
      code: "150000",
      name: "??????????????????",
      cities: {
        "150100": {
          code: "150100",
          name: "???????????????",
          districts: {
            "150102": "?????????",
            "150103": "?????????",
            "150104": "?????????",
            "150105": "?????????",
            "150121": "???????????????",
            "150122": "????????????",
            "150123": "???????????????",
            "150124": "????????????",
            "150125": "?????????" } },


        "150200": {
          code: "150200",
          name: "?????????",
          districts: {
            "150202": "?????????",
            "150203": "????????????",
            "150204": "?????????",
            "150205": "?????????",
            "150206": "??????????????????",
            "150207": "?????????",
            "150221": "???????????????",
            "150222": "?????????",
            "150223": "???????????????????????????" } },


        "150300": {
          code: "150300",
          name: "?????????",
          districts: {
            "150302": "????????????",
            "150303": "?????????",
            "150304": "?????????" } },


        "150400": {
          code: "150400",
          name: "?????????",
          districts: {
            "150402": "?????????",
            "150403": "????????????",
            "150404": "?????????",
            "150421": "??????????????????",
            "150422": "????????????",
            "150423": "????????????",
            "150424": "?????????",
            "150425": "???????????????",
            "150426": "????????????",
            "150428": "????????????",
            "150429": "?????????",
            "150430": "?????????" } },


        "150500": {
          code: "150500",
          name: "?????????",
          districts: {
            "150502": "????????????",
            "150521": "?????????????????????",
            "150522": "?????????????????????",
            "150523": "?????????",
            "150524": "?????????",
            "150525": "?????????",
            "150526": "????????????",
            "150581": "???????????????" } },


        "150600": {
          code: "150600",
          name: "???????????????",
          districts: {
            "150602": "?????????",
            "150603": "????????????",
            "150621": "????????????",
            "150622": "????????????",
            "150623": "???????????????",
            "150624": "????????????",
            "150625": "?????????",
            "150626": "?????????",
            "150627": "???????????????" } },


        "150700": {
          code: "150700",
          name: "???????????????",
          districts: {
            "150702": "????????????",
            "150703": "???????????????",
            "150721": "?????????",
            "150722": "?????????????????????????????????",
            "150723": "??????????????????",
            "150724": "?????????????????????",
            "150725": "???????????????",
            "150726": "??????????????????",
            "150727": "??????????????????",
            "150781": "????????????",
            "150782": "????????????",
            "150783": "????????????",
            "150784": "???????????????",
            "150785": "?????????" } },


        "150800": {
          code: "150800",
          name: "???????????????",
          districts: {
            "150802": "?????????",
            "150821": "?????????",
            "150822": "?????????",
            "150823": "???????????????",
            "150824": "???????????????",
            "150825": "???????????????",
            "150826": "????????????" } },


        "150900": {
          code: "150900",
          name: "???????????????",
          districts: {
            "150902": "?????????",
            "150921": "?????????",
            "150922": "?????????",
            "150923": "?????????",
            "150924": "?????????",
            "150925": "?????????",
            "150926": "?????????????????????",
            "150927": "?????????????????????",
            "150928": "?????????????????????",
            "150929": "????????????",
            "150981": "?????????" } },


        "152200": {
          code: "152200",
          name: "?????????",
          districts: {
            "152201": "???????????????",
            "152202": "????????????",
            "152221": "?????????????????????",
            "152222": "?????????????????????",
            "152223": "????????????",
            "152224": "?????????" } },


        "152500": {
          code: "152500",
          name: "???????????????",
          districts: {
            "152501": "???????????????",
            "152502": "???????????????",
            "152522": "????????????",
            "152523": "???????????????",
            "152524": "???????????????",
            "152525": "??????????????????",
            "152526": "??????????????????",
            "152527": "????????????",
            "152528": "?????????",
            "152529": "????????????",
            "152530": "?????????",
            "152531": "?????????" } },


        "152900": {
          code: "152900",
          name: "????????????",
          districts: {
            "152921": "???????????????",
            "152922": "???????????????",
            "152923": "????????????" } } } },




    "210000": {
      code: "210000",
      name: "?????????",
      cities: {
        "210100": {
          code: "210100",
          name: "?????????",
          districts: {
            "210102": "?????????",
            "210103": "?????????",
            "210104": "?????????",
            "210105": "?????????",
            "210106": "?????????",
            "210111": "????????????",
            "210112": "?????????",
            "210113": "????????????",
            "210114": "?????????",
            "210115": "?????????",
            "210123": "?????????",
            "210124": "?????????",
            "210181": "?????????" } },


        "210200": {
          code: "210200",
          name: "?????????",
          districts: {
            "210202": "?????????",
            "210203": "?????????",
            "210204": "????????????",
            "210211": "????????????",
            "210212": "????????????",
            "210213": "?????????",
            "210214": "????????????",
            "210224": "?????????",
            "210281": "????????????",
            "210283": "?????????" } },


        "210300": {
          code: "210300",
          name: "?????????",
          districts: {
            "210302": "?????????",
            "210303": "?????????",
            "210304": "?????????",
            "210311": "?????????",
            "210321": "?????????",
            "210323": "?????????????????????",
            "210381": "?????????" } },


        "210400": {
          code: "210400",
          name: "?????????",
          districts: {
            "210402": "?????????",
            "210403": "?????????",
            "210404": "?????????",
            "210411": "?????????",
            "210421": "?????????",
            "210422": "?????????????????????",
            "210423": "?????????????????????" } },


        "210500": {
          code: "210500",
          name: "?????????",
          districts: {
            "210502": "?????????",
            "210503": "?????????",
            "210504": "?????????",
            "210505": "?????????",
            "210521": "?????????????????????",
            "210522": "?????????????????????" } },


        "210600": {
          code: "210600",
          name: "?????????",
          districts: {
            "210602": "?????????",
            "210603": "?????????",
            "210604": "?????????",
            "210624": "?????????????????????",
            "210681": "?????????",
            "210682": "?????????" } },


        "210700": {
          code: "210700",
          name: "?????????",
          districts: {
            "210702": "?????????",
            "210703": "?????????",
            "210711": "?????????",
            "210726": "?????????",
            "210727": "??????",
            "210781": "?????????",
            "210782": "?????????" } },


        "210800": {
          code: "210800",
          name: "?????????",
          districts: {
            "210802": "?????????",
            "210803": "?????????",
            "210804": "????????????",
            "210811": "?????????",
            "210881": "?????????",
            "210882": "????????????" } },


        "210900": {
          code: "210900",
          name: "?????????",
          districts: {
            "210902": "?????????",
            "210903": "?????????",
            "210904": "?????????",
            "210905": "????????????",
            "210911": "?????????",
            "210921": "????????????????????????",
            "210922": "?????????" } },


        "211000": {
          code: "211000",
          name: "?????????",
          districts: {
            "211002": "?????????",
            "211003": "?????????",
            "211004": "?????????",
            "211005": "????????????",
            "211011": "????????????",
            "211021": "?????????",
            "211081": "?????????" } },


        "211100": {
          code: "211100",
          name: "?????????",
          districts: {
            "211102": "????????????",
            "211103": "????????????",
            "211104": "?????????",
            "211122": "?????????" } },


        "211200": {
          code: "211200",
          name: "?????????",
          districts: {
            "211202": "?????????",
            "211204": "?????????",
            "211221": "?????????",
            "211223": "?????????",
            "211224": "?????????",
            "211281": "????????????",
            "211282": "?????????" } },


        "211300": {
          code: "211300",
          name: "?????????",
          districts: {
            "211302": "?????????",
            "211303": "?????????",
            "211321": "?????????",
            "211322": "?????????",
            "211324": "?????????????????????????????????",
            "211381": "?????????",
            "211382": "?????????" } },


        "211400": {
          code: "211400",
          name: "????????????",
          districts: {
            "211402": "?????????",
            "211403": "?????????",
            "211404": "?????????",
            "211421": "?????????",
            "211422": "?????????",
            "211481": "?????????" } } } },




    "220000": {
      code: "220000",
      name: "?????????",
      cities: {
        "220100": {
          code: "220100",
          name: "?????????",
          districts: {
            "220102": "?????????",
            "220103": "?????????",
            "220104": "?????????",
            "220105": "?????????",
            "220106": "?????????",
            "220112": "?????????",
            "220113": "?????????",
            "220122": "?????????",
            "220182": "?????????",
            "220183": "?????????" } },


        "220200": {
          code: "220200",
          name: "?????????",
          districts: {
            "220202": "?????????",
            "220203": "?????????",
            "220204": "?????????",
            "220211": "?????????",
            "220221": "?????????",
            "220281": "?????????",
            "220282": "?????????",
            "220283": "?????????",
            "220284": "?????????" } },


        "220300": {
          code: "220300",
          name: "?????????",
          districts: {
            "220302": "?????????",
            "220303": "?????????",
            "220322": "?????????",
            "220323": "?????????????????????",
            "220381": "????????????",
            "220382": "?????????" } },


        "220400": {
          code: "220400",
          name: "?????????",
          districts: {
            "220402": "?????????",
            "220403": "?????????",
            "220421": "?????????",
            "220422": "?????????" } },


        "220500": {
          code: "220500",
          name: "?????????",
          districts: {
            "220502": "?????????",
            "220503": "????????????",
            "220521": "?????????",
            "220523": "?????????",
            "220524": "?????????",
            "220581": "????????????",
            "220582": "?????????" } },


        "220600": {
          code: "220600",
          name: "?????????",
          districts: {
            "220602": "?????????",
            "220605": "?????????",
            "220621": "?????????",
            "220622": "?????????",
            "220623": "????????????????????????",
            "220681": "?????????" } },


        "220700": {
          code: "220700",
          name: "?????????",
          districts: {
            "220702": "?????????",
            "220721": "?????????????????????????????????",
            "220722": "?????????",
            "220723": "?????????",
            "220781": "?????????" } },


        "220800": {
          code: "220800",
          name: "?????????",
          districts: {
            "220802": "?????????",
            "220821": "?????????",
            "220822": "?????????",
            "220881": "?????????",
            "220882": "?????????" } },


        "222400": {
          code: "222400",
          name: "????????????????????????",
          districts: {
            "222401": "?????????",
            "222402": "?????????",
            "222403": "?????????",
            "222404": "?????????",
            "222405": "?????????",
            "222406": "?????????",
            "222424": "?????????",
            "222426": "?????????" } } } },




    "230000": {
      code: "230000",
      name: "????????????",
      cities: {
        "230100": {
          code: "230100",
          name: "????????????",
          districts: {
            "230102": "?????????",
            "230103": "?????????",
            "230104": "?????????",
            "230108": "?????????",
            "230109": "?????????",
            "230110": "?????????",
            "230111": "?????????",
            "230112": "?????????",
            "230113": "?????????",
            "230123": "?????????",
            "230124": "?????????",
            "230125": "??????",
            "230126": "?????????",
            "230127": "?????????",
            "230128": "?????????",
            "230129": "?????????",
            "230183": "?????????",
            "230184": "?????????" } },


        "230200": {
          code: "230200",
          name: "???????????????",
          districts: {
            "230202": "?????????",
            "230203": "?????????",
            "230204": "?????????",
            "230205": "????????????",
            "230206": "???????????????",
            "230207": "????????????",
            "230208": "????????????????????????",
            "230221": "?????????",
            "230223": "?????????",
            "230224": "?????????",
            "230225": "?????????",
            "230227": "?????????",
            "230229": "?????????",
            "230230": "?????????",
            "230231": "?????????",
            "230281": "?????????" } },


        "230300": {
          code: "230300",
          name: "?????????",
          districts: {
            "230302": "?????????",
            "230303": "?????????",
            "230304": "?????????",
            "230305": "?????????",
            "230306": "????????????",
            "230307": "?????????",
            "230321": "?????????",
            "230381": "?????????",
            "230382": "?????????" } },


        "230400": {
          code: "230400",
          name: "?????????",
          districts: {
            "230402": "?????????",
            "230403": "?????????",
            "230404": "?????????",
            "230405": "?????????",
            "230406": "?????????",
            "230407": "?????????",
            "230421": "?????????",
            "230422": "?????????" } },


        "230500": {
          code: "230500",
          name: "????????????",
          districts: {
            "230502": "?????????",
            "230503": "?????????",
            "230505": "????????????",
            "230506": "?????????",
            "230521": "?????????",
            "230522": "?????????",
            "230523": "?????????",
            "230524": "?????????" } },


        "230600": {
          code: "230600",
          name: "?????????",
          districts: {
            "230602": "????????????",
            "230603": "?????????",
            "230604": "????????????",
            "230605": "?????????",
            "230606": "?????????",
            "230621": "?????????",
            "230622": "?????????",
            "230623": "?????????",
            "230624": "??????????????????????????????" } },


        "230700": {
          code: "230700",
          name: "?????????",
          districts: {
            "230702": "?????????",
            "230703": "?????????",
            "230704": "?????????",
            "230705": "?????????",
            "230706": "?????????",
            "230707": "?????????",
            "230708": "?????????",
            "230709": "????????????",
            "230710": "?????????",
            "230711": "????????????",
            "230712": "????????????",
            "230713": "?????????",
            "230714": "????????????",
            "230715": "?????????",
            "230716": "????????????",
            "230722": "?????????",
            "230781": "?????????" } },


        "230800": {
          code: "230800",
          name: "????????????",
          districts: {
            "230803": "?????????",
            "230804": "?????????",
            "230805": "?????????",
            "230811": "??????",
            "230822": "?????????",
            "230826": "?????????",
            "230828": "?????????",
            "230881": "?????????",
            "230882": "?????????",
            "230883": "?????????" } },


        "230900": {
          code: "230900",
          name: "????????????",
          districts: {
            "230902": "?????????",
            "230903": "?????????",
            "230904": "????????????",
            "230921": "?????????" } },


        "231000": {
          code: "231000",
          name: "????????????",
          districts: {
            "231002": "?????????",
            "231003": "?????????",
            "231004": "?????????",
            "231005": "?????????",
            "231025": "?????????",
            "231081": "????????????",
            "231083": "?????????",
            "231084": "?????????",
            "231085": "?????????",
            "231086": "?????????" } },


        "231100": {
          code: "231100",
          name: "?????????",
          districts: {
            "231102": "?????????",
            "231121": "?????????",
            "231123": "?????????",
            "231124": "?????????",
            "231181": "?????????",
            "231182": "???????????????" } },


        "231200": {
          code: "231200",
          name: "?????????",
          districts: {
            "231202": "?????????",
            "231221": "?????????",
            "231222": "?????????",
            "231223": "?????????",
            "231224": "?????????",
            "231225": "?????????",
            "231226": "?????????",
            "231281": "?????????",
            "231282": "?????????",
            "231283": "?????????" } },


        "232700": {
          code: "232700",
          name: "??????????????????",
          districts: {
            "232701": "?????????",
            "232721": "?????????",
            "232722": "?????????" } } } },




    "310000": {
      code: "310000",
      name: "?????????",
      cities: {
        "310000": {
          code: "310000",
          name: "?????????",
          districts: {
            "310101": "?????????",
            "310104": "?????????",
            "310105": "?????????",
            "310106": "?????????",
            "310107": "?????????",
            "310109": "?????????",
            "310110": "?????????",
            "310112": "?????????",
            "310113": "?????????",
            "310114": "?????????",
            "310115": "????????????",
            "310116": "?????????",
            "310117": "?????????",
            "310118": "?????????",
            "310120": "?????????",
            "310151": "?????????" } } } },




    "320000": {
      code: "320000",
      name: "?????????",
      cities: {
        "320100": {
          code: "320100",
          name: "?????????",
          districts: {
            "320102": "?????????",
            "320104": "?????????",
            "320105": "?????????",
            "320106": "?????????",
            "320111": "?????????",
            "320113": "?????????",
            "320114": "????????????",
            "320115": "?????????",
            "320116": "?????????",
            "320117": "?????????",
            "320118": "?????????" } },


        "320200": {
          code: "320200",
          name: "?????????",
          districts: {
            "320205": "?????????",
            "320206": "?????????",
            "320211": "?????????",
            "320213": "?????????",
            "320214": "?????????",
            "320281": "?????????",
            "320282": "?????????" } },


        "320300": {
          code: "320300",
          name: "?????????",
          districts: {
            "320302": "?????????",
            "320303": "?????????",
            "320305": "?????????",
            "320311": "?????????",
            "320312": "?????????",
            "320321": "??????",
            "320322": "??????",
            "320324": "?????????",
            "320381": "?????????",
            "320382": "?????????" } },


        "320400": {
          code: "320400",
          name: "?????????",
          districts: {
            "320402": "?????????",
            "320404": "?????????",
            "320411": "?????????",
            "320412": "?????????",
            "320413": "?????????",
            "320481": "?????????" } },


        "320500": {
          code: "320500",
          name: "?????????",
          districts: {
            "320505": "?????????",
            "320506": "?????????",
            "320507": "?????????",
            "320508": "?????????",
            "320509": "?????????",
            "320581": "?????????",
            "320582": "????????????",
            "320583": "?????????",
            "320585": "?????????" } },


        "320600": {
          code: "320600",
          name: "?????????",
          districts: {
            "320602": "?????????",
            "320611": "?????????",
            "320612": "?????????",
            "320623": "?????????",
            "320681": "?????????",
            "320682": "?????????",
            "320684": "?????????",
            "320685": "?????????" } },


        "320700": {
          code: "320700",
          name: "????????????",
          districts: {
            "320703": "?????????",
            "320706": "?????????",
            "320707": "?????????",
            "320722": "?????????",
            "320723": "?????????",
            "320724": "?????????" } },


        "320800": {
          code: "320800",
          name: "?????????",
          districts: {
            "320803": "?????????",
            "320804": "?????????",
            "320812": "????????????",
            "320813": "?????????",
            "320826": "?????????",
            "320830": "?????????",
            "320831": "?????????" } },


        "320900": {
          code: "320900",
          name: "?????????",
          districts: {
            "320902": "?????????",
            "320903": "?????????",
            "320904": "?????????",
            "320921": "?????????",
            "320922": "?????????",
            "320923": "?????????",
            "320924": "?????????",
            "320925": "?????????",
            "320981": "?????????" } },


        "321000": {
          code: "321000",
          name: "?????????",
          districts: {
            "321002": "?????????",
            "321003": "?????????",
            "321012": "?????????",
            "321023": "?????????",
            "321081": "?????????",
            "321084": "?????????" } },


        "321100": {
          code: "321100",
          name: "?????????",
          districts: {
            "321102": "?????????",
            "321111": "?????????",
            "321112": "?????????",
            "321181": "?????????",
            "321182": "?????????",
            "321183": "?????????" } },


        "321200": {
          code: "321200",
          name: "?????????",
          districts: {
            "321202": "?????????",
            "321203": "?????????",
            "321204": "?????????",
            "321281": "?????????",
            "321282": "?????????",
            "321283": "?????????" } },


        "321300": {
          code: "321300",
          name: "?????????",
          districts: {
            "321302": "?????????",
            "321311": "?????????",
            "321322": "?????????",
            "321323": "?????????",
            "321324": "?????????" } } } },




    "330000": {
      code: "330000",
      name: "?????????",
      cities: {
        "330100": {
          code: "330100",
          name: "?????????",
          districts: {
            "330102": "?????????",
            "330103": "?????????",
            "330104": "?????????",
            "330105": "?????????",
            "330106": "?????????",
            "330108": "?????????",
            "330109": "?????????",
            "330110": "?????????",
            "330111": "?????????",
            "330112": "?????????",
            "330122": "?????????",
            "330127": "?????????",
            "330182": "?????????" } },


        "330200": {
          code: "330200",
          name: "?????????",
          districts: {
            "330203": "?????????",
            "330205": "?????????",
            "330206": "?????????",
            "330211": "?????????",
            "330212": "?????????",
            "330213": "?????????",
            "330225": "?????????",
            "330226": "?????????",
            "330281": "?????????",
            "330282": "?????????" } },


        "330300": {
          code: "330300",
          name: "?????????",
          districts: {
            "330302": "?????????",
            "330303": "?????????",
            "330304": "?????????",
            "330305": "?????????",
            "330324": "?????????",
            "330326": "?????????",
            "330327": "?????????",
            "330328": "?????????",
            "330329": "?????????",
            "330381": "?????????",
            "330382": "?????????" } },


        "330400": {
          code: "330400",
          name: "?????????",
          districts: {
            "330402": "?????????",
            "330411": "?????????",
            "330421": "?????????",
            "330424": "?????????",
            "330481": "?????????",
            "330482": "?????????",
            "330483": "?????????" } },


        "330500": {
          code: "330500",
          name: "?????????",
          districts: {
            "330502": "?????????",
            "330503": "?????????",
            "330521": "?????????",
            "330522": "?????????",
            "330523": "?????????" } },


        "330600": {
          code: "330600",
          name: "?????????",
          districts: {
            "330602": "?????????",
            "330603": "?????????",
            "330604": "?????????",
            "330624": "?????????",
            "330681": "?????????",
            "330683": "?????????" } },


        "330700": {
          code: "330700",
          name: "?????????",
          districts: {
            "330702": "?????????",
            "330703": "?????????",
            "330723": "?????????",
            "330726": "?????????",
            "330727": "?????????",
            "330781": "?????????",
            "330782": "?????????",
            "330783": "?????????",
            "330784": "?????????" } },


        "330800": {
          code: "330800",
          name: "?????????",
          districts: {
            "330802": "?????????",
            "330803": "?????????",
            "330822": "?????????",
            "330824": "?????????",
            "330825": "?????????",
            "330881": "?????????" } },


        "330900": {
          code: "330900",
          name: "?????????",
          districts: {
            "330902": "?????????",
            "330903": "?????????",
            "330921": "?????????",
            "330922": "?????????" } },


        "331000": {
          code: "331000",
          name: "?????????",
          districts: {
            "331002": "?????????",
            "331003": "?????????",
            "331004": "?????????",
            "331022": "?????????",
            "331023": "?????????",
            "331024": "?????????",
            "331081": "?????????",
            "331082": "?????????",
            "331083": "?????????" } },


        "331100": {
          code: "331100",
          name: "?????????",
          districts: {
            "331102": "?????????",
            "331121": "?????????",
            "331122": "?????????",
            "331123": "?????????",
            "331124": "?????????",
            "331125": "?????????",
            "331126": "?????????",
            "331127": "?????????????????????",
            "331181": "?????????" } } } },




    "340000": {
      code: "340000",
      name: "?????????",
      cities: {
        "340100": {
          code: "340100",
          name: "?????????",
          districts: {
            "340102": "?????????",
            "340103": "?????????",
            "340104": "?????????",
            "340111": "?????????",
            "340121": "?????????",
            "340122": "?????????",
            "340123": "?????????",
            "340124": "?????????",
            "340181": "?????????" } },


        "340200": {
          code: "340200",
          name: "?????????",
          districts: {
            "340202": "?????????",
            "340203": "?????????",
            "340207": "?????????",
            "340208": "?????????",
            "340221": "?????????",
            "340222": "?????????",
            "340223": "?????????",
            "340225": "?????????" } },


        "340300": {
          code: "340300",
          name: "?????????",
          districts: {
            "340302": "????????????",
            "340303": "?????????",
            "340304": "?????????",
            "340311": "?????????",
            "340321": "?????????",
            "340322": "?????????",
            "340323": "?????????" } },


        "340400": {
          code: "340400",
          name: "?????????",
          districts: {
            "340402": "?????????",
            "340403": "????????????",
            "340404": "????????????",
            "340405": "????????????",
            "340406": "?????????",
            "340421": "?????????",
            "340422": "??????" } },


        "340500": {
          code: "340500",
          name: "????????????",
          districts: {
            "340503": "?????????",
            "340504": "?????????",
            "340506": "?????????",
            "340521": "?????????",
            "340522": "?????????",
            "340523": "??????" } },


        "340600": {
          code: "340600",
          name: "?????????",
          districts: {
            "340602": "?????????",
            "340603": "?????????",
            "340604": "?????????",
            "340621": "?????????" } },


        "340700": {
          code: "340700",
          name: "?????????",
          districts: {
            "340705": "?????????",
            "340706": "?????????",
            "340711": "??????",
            "340722": "?????????" } },


        "340800": {
          code: "340800",
          name: "?????????",
          districts: {
            "340802": "?????????",
            "340803": "?????????",
            "340811": "?????????",
            "340822": "?????????",
            "340825": "?????????",
            "340826": "?????????",
            "340827": "?????????",
            "340828": "?????????",
            "340881": "?????????",
            "340882": "?????????" } },


        "341000": {
          code: "341000",
          name: "?????????",
          districts: {
            "341002": "?????????",
            "341003": "?????????",
            "341004": "?????????",
            "341021": "??????",
            "341022": "?????????",
            "341023": "??????",
            "341024": "?????????" } },


        "341100": {
          code: "341100",
          name: "?????????",
          districts: {
            "341102": "?????????",
            "341103": "?????????",
            "341122": "?????????",
            "341124": "?????????",
            "341125": "?????????",
            "341126": "?????????",
            "341181": "?????????",
            "341182": "?????????" } },


        "341200": {
          code: "341200",
          name: "?????????",
          districts: {
            "341202": "?????????",
            "341203": "?????????",
            "341204": "?????????",
            "341221": "?????????",
            "341222": "?????????",
            "341225": "?????????",
            "341226": "?????????",
            "341282": "?????????" } },


        "341300": {
          code: "341300",
          name: "?????????",
          districts: {
            "341302": "?????????",
            "341321": "?????????",
            "341322": "??????",
            "341323": "?????????",
            "341324": "??????" } },


        "341500": {
          code: "341500",
          name: "?????????",
          districts: {
            "341502": "?????????",
            "341503": "?????????",
            "341504": "?????????",
            "341522": "?????????",
            "341523": "?????????",
            "341524": "?????????",
            "341525": "?????????" } },


        "341600": {
          code: "341600",
          name: "?????????",
          districts: {
            "341602": "?????????",
            "341621": "?????????",
            "341622": "?????????",
            "341623": "?????????" } },


        "341700": {
          code: "341700",
          name: "?????????",
          districts: {
            "341702": "?????????",
            "341721": "?????????",
            "341722": "?????????",
            "341723": "?????????" } },


        "341800": {
          code: "341800",
          name: "?????????",
          districts: {
            "341802": "?????????",
            "341821": "?????????",
            "341822": "?????????",
            "341823": "??????",
            "341824": "?????????",
            "341825": "?????????",
            "341881": "?????????" } } } },




    "350000": {
      code: "350000",
      name: "?????????",
      cities: {
        "350100": {
          code: "350100",
          name: "?????????",
          districts: {
            "350102": "?????????",
            "350103": "?????????",
            "350104": "?????????",
            "350105": "?????????",
            "350111": "?????????",
            "350112": "?????????",
            "350121": "?????????",
            "350122": "?????????",
            "350123": "?????????",
            "350124": "?????????",
            "350125": "?????????",
            "350128": "?????????",
            "350181": "?????????" } },


        "350200": {
          code: "350200",
          name: "?????????",
          districts: {
            "350203": "?????????",
            "350205": "?????????",
            "350206": "?????????",
            "350211": "?????????",
            "350212": "?????????",
            "350213": "?????????" } },


        "350300": {
          code: "350300",
          name: "?????????",
          districts: {
            "350302": "?????????",
            "350303": "?????????",
            "350304": "?????????",
            "350305": "?????????",
            "350322": "?????????" } },


        "350400": {
          code: "350400",
          name: "?????????",
          districts: {
            "350402": "?????????",
            "350403": "?????????",
            "350421": "?????????",
            "350423": "?????????",
            "350424": "?????????",
            "350425": "?????????",
            "350426": "?????????",
            "350427": "??????",
            "350428": "?????????",
            "350429": "?????????",
            "350430": "?????????",
            "350481": "?????????" } },


        "350500": {
          code: "350500",
          name: "?????????",
          districts: {
            "350502": "?????????",
            "350503": "?????????",
            "350504": "?????????",
            "350505": "?????????",
            "350521": "?????????",
            "350524": "?????????",
            "350525": "?????????",
            "350526": "?????????",
            "350527": "?????????",
            "350581": "?????????",
            "350582": "?????????",
            "350583": "?????????" } },


        "350600": {
          code: "350600",
          name: "?????????",
          districts: {
            "350602": "?????????",
            "350603": "?????????",
            "350622": "?????????",
            "350623": "?????????",
            "350624": "?????????",
            "350625": "?????????",
            "350626": "?????????",
            "350627": "?????????",
            "350628": "?????????",
            "350629": "?????????",
            "350681": "?????????" } },


        "350700": {
          code: "350700",
          name: "?????????",
          districts: {
            "350702": "?????????",
            "350703": "?????????",
            "350721": "?????????",
            "350722": "?????????",
            "350723": "?????????",
            "350724": "?????????",
            "350725": "?????????",
            "350781": "?????????",
            "350782": "????????????",
            "350783": "?????????" } },


        "350800": {
          code: "350800",
          name: "?????????",
          districts: {
            "350802": "?????????",
            "350803": "?????????",
            "350821": "?????????",
            "350823": "?????????",
            "350824": "?????????",
            "350825": "?????????",
            "350881": "?????????" } },


        "350900": {
          code: "350900",
          name: "?????????",
          districts: {
            "350902": "?????????",
            "350921": "?????????",
            "350922": "?????????",
            "350923": "?????????",
            "350924": "?????????",
            "350925": "?????????",
            "350926": "?????????",
            "350981": "?????????",
            "350982": "?????????" } } } },




    "360000": {
      code: "360000",
      name: "?????????",
      cities: {
        "360100": {
          code: "360100",
          name: "?????????",
          districts: {
            "360102": "?????????",
            "360103": "?????????",
            "360104": "????????????",
            "360105": "?????????",
            "360111": "????????????",
            "360112": "?????????",
            "360121": "?????????",
            "360123": "?????????",
            "360124": "?????????" } },


        "360200": {
          code: "360200",
          name: "????????????",
          districts: {
            "360202": "?????????",
            "360203": "?????????",
            "360222": "?????????",
            "360281": "?????????" } },


        "360300": {
          code: "360300",
          name: "?????????",
          districts: {
            "360302": "?????????",
            "360313": "?????????",
            "360321": "?????????",
            "360322": "?????????",
            "360323": "?????????" } },


        "360400": {
          code: "360400",
          name: "?????????",
          districts: {
            "360402": "?????????",
            "360403": "?????????",
            "360404": "?????????",
            "360423": "?????????",
            "360424": "?????????",
            "360425": "?????????",
            "360426": "?????????",
            "360428": "?????????",
            "360429": "?????????",
            "360430": "?????????",
            "360481": "?????????",
            "360482": "????????????",
            "360483": "?????????" } },


        "360500": {
          code: "360500",
          name: "?????????",
          districts: {
            "360502": "?????????",
            "360521": "?????????" } },


        "360600": {
          code: "360600",
          name: "?????????",
          districts: {
            "360602": "?????????",
            "360603": "?????????",
            "360681": "?????????" } },


        "360700": {
          code: "360700",
          name: "?????????",
          districts: {
            "360702": "?????????",
            "360703": "?????????",
            "360704": "?????????",
            "360722": "?????????",
            "360723": "?????????",
            "360724": "?????????",
            "360725": "?????????",
            "360726": "?????????",
            "360727": "?????????",
            "360728": "?????????",
            "360729": "?????????",
            "360730": "?????????",
            "360731": "?????????",
            "360732": "?????????",
            "360733": "?????????",
            "360734": "?????????",
            "360735": "?????????",
            "360781": "?????????" } },


        "360800": {
          code: "360800",
          name: "?????????",
          districts: {
            "360802": "?????????",
            "360803": "?????????",
            "360821": "?????????",
            "360822": "?????????",
            "360823": "?????????",
            "360824": "?????????",
            "360825": "?????????",
            "360826": "?????????",
            "360827": "?????????",
            "360828": "?????????",
            "360829": "?????????",
            "360830": "?????????",
            "360881": "????????????" } },


        "360900": {
          code: "360900",
          name: "?????????",
          districts: {
            "360902": "?????????",
            "360921": "?????????",
            "360922": "?????????",
            "360923": "?????????",
            "360924": "?????????",
            "360925": "?????????",
            "360926": "?????????",
            "360981": "?????????",
            "360982": "?????????",
            "360983": "?????????" } },


        "361000": {
          code: "361000",
          name: "?????????",
          districts: {
            "361002": "?????????",
            "361003": "?????????",
            "361021": "?????????",
            "361022": "?????????",
            "361023": "?????????",
            "361024": "?????????",
            "361025": "?????????",
            "361026": "?????????",
            "361027": "?????????",
            "361028": "?????????",
            "361030": "?????????" } },


        "361100": {
          code: "361100",
          name: "?????????",
          districts: {
            "361102": "?????????",
            "361103": "?????????",
            "361121": "?????????",
            "361123": "?????????",
            "361124": "?????????",
            "361125": "?????????",
            "361126": "?????????",
            "361127": "?????????",
            "361128": "?????????",
            "361129": "?????????",
            "361130": "?????????",
            "361181": "?????????" } } } },




    "370000": {
      code: "370000",
      name: "?????????",
      cities: {
        "370100": {
          code: "370100",
          name: "?????????",
          districts: {
            "370102": "?????????",
            "370103": "?????????",
            "370104": "?????????",
            "370105": "?????????",
            "370112": "?????????",
            "370113": "?????????",
            "370114": "?????????",
            "370115": "?????????",
            "370116": "?????????",
            "370117": "?????????",
            "370124": "?????????",
            "370126": "?????????" } },


        "370200": {
          code: "370200",
          name: "?????????",
          districts: {
            "370202": "?????????",
            "370203": "?????????",
            "370211": "?????????",
            "370212": "?????????",
            "370213": "?????????",
            "370214": "?????????",
            "370215": "?????????",
            "370281": "?????????",
            "370283": "?????????",
            "370285": "?????????" } },


        "370300": {
          code: "370300",
          name: "?????????",
          districts: {
            "370302": "?????????",
            "370303": "?????????",
            "370304": "?????????",
            "370305": "?????????",
            "370306": "?????????",
            "370321": "?????????",
            "370322": "?????????",
            "370323": "?????????" } },


        "370400": {
          code: "370400",
          name: "?????????",
          districts: {
            "370402": "?????????",
            "370403": "?????????",
            "370404": "?????????",
            "370405": "????????????",
            "370406": "?????????",
            "370481": "?????????" } },


        "370500": {
          code: "370500",
          name: "?????????",
          districts: {
            "370502": "?????????",
            "370503": "?????????",
            "370505": "?????????",
            "370522": "?????????",
            "370523": "?????????" } },


        "370600": {
          code: "370600",
          name: "?????????",
          districts: {
            "370602": "?????????",
            "370611": "?????????",
            "370612": "?????????",
            "370613": "?????????",
            "370614": "?????????",
            "370681": "?????????",
            "370682": "?????????",
            "370683": "?????????",
            "370684": "?????????",
            "370685": "?????????",
            "370686": "?????????",
            "370687": "?????????" } },


        "370700": {
          code: "370700",
          name: "?????????",
          districts: {
            "370702": "?????????",
            "370703": "?????????",
            "370704": "?????????",
            "370705": "?????????",
            "370724": "?????????",
            "370725": "?????????",
            "370781": "?????????",
            "370782": "?????????",
            "370783": "?????????",
            "370784": "?????????",
            "370785": "?????????",
            "370786": "?????????" } },


        "370800": {
          code: "370800",
          name: "?????????",
          districts: {
            "370811": "?????????",
            "370812": "?????????",
            "370826": "?????????",
            "370827": "?????????",
            "370828": "?????????",
            "370829": "?????????",
            "370830": "?????????",
            "370831": "?????????",
            "370832": "?????????",
            "370881": "?????????",
            "370883": "?????????" } },


        "370900": {
          code: "370900",
          name: "?????????",
          districts: {
            "370902": "?????????",
            "370911": "?????????",
            "370921": "?????????",
            "370923": "?????????",
            "370982": "?????????",
            "370983": "?????????" } },


        "371000": {
          code: "371000",
          name: "?????????",
          districts: {
            "371002": "?????????",
            "371003": "?????????",
            "371082": "?????????",
            "371083": "?????????" } },


        "371100": {
          code: "371100",
          name: "?????????",
          districts: {
            "371102": "?????????",
            "371103": "?????????",
            "371121": "?????????",
            "371122": "??????" } },


        "371300": {
          code: "371300",
          name: "?????????",
          districts: {
            "371302": "?????????",
            "371311": "?????????",
            "371312": "?????????",
            "371321": "?????????",
            "371322": "?????????",
            "371323": "?????????",
            "371324": "?????????",
            "371325": "??????",
            "371326": "?????????",
            "371327": "?????????",
            "371328": "?????????",
            "371329": "?????????" } },


        "371400": {
          code: "371400",
          name: "?????????",
          districts: {
            "371402": "?????????",
            "371403": "?????????",
            "371422": "?????????",
            "371423": "?????????",
            "371424": "?????????",
            "371425": "?????????",
            "371426": "?????????",
            "371427": "?????????",
            "371428": "?????????",
            "371481": "?????????",
            "371482": "?????????" } },


        "371500": {
          code: "371500",
          name: "?????????",
          districts: {
            "371502": "????????????",
            "371521": "?????????",
            "371522": "??????",
            "371523": "?????????",
            "371524": "?????????",
            "371525": "??????",
            "371526": "?????????",
            "371581": "?????????" } },


        "371600": {
          code: "371600",
          name: "?????????",
          districts: {
            "371602": "?????????",
            "371603": "?????????",
            "371621": "?????????",
            "371622": "?????????",
            "371623": "?????????",
            "371625": "?????????",
            "371681": "?????????" } },


        "371700": {
          code: "371700",
          name: "?????????",
          districts: {
            "371702": "?????????",
            "371703": "?????????",
            "371721": "??????",
            "371722": "??????",
            "371723": "?????????",
            "371724": "?????????",
            "371725": "?????????",
            "371726": "?????????",
            "371728": "?????????" } } } },




    "410000": {
      code: "410000",
      name: "?????????",
      cities: {
        "410100": {
          code: "410100",
          name: "?????????",
          districts: {
            "410102": "?????????",
            "410103": "?????????",
            "410104": "???????????????",
            "410105": "?????????",
            "410106": "?????????",
            "410108": "?????????",
            "410122": "?????????",
            "410181": "?????????",
            "410182": "?????????",
            "410183": "?????????",
            "410184": "?????????",
            "410185": "?????????" } },


        "410200": {
          code: "410200",
          name: "?????????",
          districts: {
            "410202": "?????????",
            "410203": "???????????????",
            "410204": "?????????",
            "410205": "????????????",
            "410212": "?????????",
            "410221": "??????",
            "410222": "?????????",
            "410223": "?????????",
            "410225": "?????????" } },


        "410300": {
          code: "410300",
          name: "?????????",
          districts: {
            "410302": "?????????",
            "410303": "?????????",
            "410304": "???????????????",
            "410305": "?????????",
            "410306": "?????????",
            "410311": "?????????",
            "410322": "?????????",
            "410323": "?????????",
            "410324": "?????????",
            "410325": "??????",
            "410326": "?????????",
            "410327": "?????????",
            "410328": "?????????",
            "410329": "?????????",
            "410381": "?????????" } },


        "410400": {
          code: "410400",
          name: "????????????",
          districts: {
            "410402": "?????????",
            "410403": "?????????",
            "410404": "?????????",
            "410411": "?????????",
            "410421": "?????????",
            "410422": "??????",
            "410423": "?????????",
            "410425": "??????",
            "410481": "?????????",
            "410482": "?????????" } },


        "410500": {
          code: "410500",
          name: "?????????",
          districts: {
            "410502": "?????????",
            "410503": "?????????",
            "410505": "?????????",
            "410506": "?????????",
            "410522": "?????????",
            "410523": "?????????",
            "410526": "??????",
            "410527": "?????????",
            "410581": "?????????" } },


        "410600": {
          code: "410600",
          name: "?????????",
          districts: {
            "410602": "?????????",
            "410603": "?????????",
            "410611": "?????????",
            "410621": "??????",
            "410622": "??????" } },


        "410700": {
          code: "410700",
          name: "?????????",
          districts: {
            "410702": "?????????",
            "410703": "?????????",
            "410704": "?????????",
            "410711": "?????????",
            "410721": "?????????",
            "410724": "?????????",
            "410725": "?????????",
            "410726": "?????????",
            "410727": "?????????",
            "410728": "?????????",
            "410781": "?????????",
            "410782": "?????????" } },


        "410800": {
          code: "410800",
          name: "?????????",
          districts: {
            "410802": "?????????",
            "410803": "?????????",
            "410804": "?????????",
            "410811": "?????????",
            "410821": "?????????",
            "410822": "?????????",
            "410823": "?????????",
            "410825": "??????",
            "410882": "?????????",
            "410883": "?????????" } },


        "410900": {
          code: "410900",
          name: "?????????",
          districts: {
            "410902": "?????????",
            "410922": "?????????",
            "410923": "?????????",
            "410926": "??????",
            "410927": "?????????",
            "410928": "?????????" } },


        "411000": {
          code: "411000",
          name: "?????????",
          districts: {
            "411002": "?????????",
            "411003": "?????????",
            "411024": "?????????",
            "411025": "?????????",
            "411081": "?????????",
            "411082": "?????????" } },


        "411100": {
          code: "411100",
          name: "?????????",
          districts: {
            "411102": "?????????",
            "411103": "?????????",
            "411104": "?????????",
            "411121": "?????????",
            "411122": "?????????" } },


        "411200": {
          code: "411200",
          name: "????????????",
          districts: {
            "411202": "?????????",
            "411203": "?????????",
            "411221": "?????????",
            "411224": "?????????",
            "411281": "?????????",
            "411282": "?????????" } },


        "411300": {
          code: "411300",
          name: "?????????",
          districts: {
            "411302": "?????????",
            "411303": "?????????",
            "411321": "?????????",
            "411322": "?????????",
            "411323": "?????????",
            "411324": "?????????",
            "411325": "?????????",
            "411326": "?????????",
            "411327": "?????????",
            "411328": "?????????",
            "411329": "?????????",
            "411330": "?????????",
            "411381": "?????????" } },


        "411400": {
          code: "411400",
          name: "?????????",
          districts: {
            "411402": "?????????",
            "411403": "?????????",
            "411421": "?????????",
            "411422": "??????",
            "411423": "?????????",
            "411424": "?????????",
            "411425": "?????????",
            "411426": "?????????",
            "411481": "?????????" } },


        "411500": {
          code: "411500",
          name: "?????????",
          districts: {
            "411502": "?????????",
            "411503": "?????????",
            "411521": "?????????",
            "411522": "?????????",
            "411523": "??????",
            "411524": "?????????",
            "411525": "?????????",
            "411526": "?????????",
            "411527": "?????????",
            "411528": "??????" } },


        "411600": {
          code: "411600",
          name: "?????????",
          districts: {
            "411602": "?????????",
            "411621": "?????????",
            "411622": "?????????",
            "411623": "?????????",
            "411624": "?????????",
            "411625": "?????????",
            "411626": "?????????",
            "411627": "?????????",
            "411628": "?????????",
            "411681": "?????????" } },


        "411700": {
          code: "411700",
          name: "????????????",
          districts: {
            "411702": "?????????",
            "411721": "?????????",
            "411722": "?????????",
            "411723": "?????????",
            "411724": "?????????",
            "411725": "?????????",
            "411726": "?????????",
            "411727": "?????????",
            "411728": "?????????",
            "411729": "?????????" } } } },




    "420000": {
      code: "420000",
      name: "?????????",
      cities: {
        "420100": {
          code: "420100",
          name: "?????????",
          districts: {
            "420102": "?????????",
            "420103": "?????????",
            "420104": "?????????",
            "420105": "?????????",
            "420106": "?????????",
            "420107": "?????????",
            "420111": "?????????",
            "420112": "????????????",
            "420113": "?????????",
            "420114": "?????????",
            "420115": "?????????",
            "420116": "?????????",
            "420117": "?????????" } },


        "420200": {
          code: "420200",
          name: "?????????",
          districts: {
            "420202": "????????????",
            "420203": "????????????",
            "420204": "?????????",
            "420205": "?????????",
            "420222": "?????????",
            "420281": "?????????" } },


        "420300": {
          code: "420300",
          name: "?????????",
          districts: {
            "420302": "?????????",
            "420303": "?????????",
            "420304": "?????????",
            "420322": "?????????",
            "420323": "?????????",
            "420324": "?????????",
            "420325": "??????",
            "420381": "????????????" } },


        "420500": {
          code: "420500",
          name: "?????????",
          districts: {
            "420502": "?????????",
            "420503": "????????????",
            "420504": "?????????",
            "420505": "?????????",
            "420506": "?????????",
            "420525": "?????????",
            "420526": "?????????",
            "420527": "?????????",
            "420528": "????????????????????????",
            "420529": "????????????????????????",
            "420581": "?????????",
            "420582": "?????????",
            "420583": "?????????" } },


        "420600": {
          code: "420600",
          name: "?????????",
          districts: {
            "420602": "?????????",
            "420606": "?????????",
            "420607": "?????????",
            "420624": "?????????",
            "420625": "?????????",
            "420626": "?????????",
            "420682": "????????????",
            "420683": "?????????",
            "420684": "?????????" } },


        "420700": {
          code: "420700",
          name: "?????????",
          districts: {
            "420702": "????????????",
            "420703": "?????????",
            "420704": "?????????" } },


        "420800": {
          code: "420800",
          name: "?????????",
          districts: {
            "420802": "?????????",
            "420804": "?????????",
            "420822": "?????????",
            "420881": "?????????",
            "420882": "?????????" } },


        "420900": {
          code: "420900",
          name: "?????????",
          districts: {
            "420902": "?????????",
            "420921": "?????????",
            "420922": "?????????",
            "420923": "?????????",
            "420981": "?????????",
            "420982": "?????????",
            "420984": "?????????" } },


        "421000": {
          code: "421000",
          name: "?????????",
          districts: {
            "421002": "?????????",
            "421003": "?????????",
            "421022": "?????????",
            "421023": "?????????",
            "421024": "?????????",
            "421081": "?????????",
            "421083": "?????????",
            "421087": "?????????" } },


        "421100": {
          code: "421100",
          name: "?????????",
          districts: {
            "421102": "?????????",
            "421121": "?????????",
            "421122": "?????????",
            "421123": "?????????",
            "421124": "?????????",
            "421125": "?????????",
            "421126": "?????????",
            "421127": "?????????",
            "421181": "?????????",
            "421182": "?????????" } },


        "421200": {
          code: "421200",
          name: "?????????",
          districts: {
            "421202": "?????????",
            "421221": "?????????",
            "421222": "?????????",
            "421223": "?????????",
            "421224": "?????????",
            "421281": "?????????" } },


        "421300": {
          code: "421300",
          name: "?????????",
          districts: {
            "421303": "?????????",
            "421321": "??????",
            "421381": "?????????" } },


        "422800": {
          code: "422800",
          name: "??????????????????????????????",
          districts: {
            "422801": "?????????",
            "422802": "?????????",
            "422822": "?????????",
            "422823": "?????????",
            "422825": "?????????",
            "422826": "?????????",
            "422827": "?????????",
            "422828": "?????????" } } } },




    "430000": {
      code: "430000",
      name: "?????????",
      cities: {
        "430100": {
          code: "430100",
          name: "?????????",
          districts: {
            "430102": "?????????",
            "430103": "?????????",
            "430104": "?????????",
            "430105": "?????????",
            "430111": "?????????",
            "430112": "?????????",
            "430121": "?????????",
            "430181": "?????????",
            "430182": "?????????" } },


        "430200": {
          code: "430200",
          name: "?????????",
          districts: {
            "430202": "?????????",
            "430203": "?????????",
            "430204": "?????????",
            "430211": "?????????",
            "430212": "?????????",
            "430223": "??????",
            "430224": "?????????",
            "430225": "?????????",
            "430281": "?????????" } },


        "430300": {
          code: "430300",
          name: "?????????",
          districts: {
            "430302": "?????????",
            "430304": "?????????",
            "430321": "?????????",
            "430381": "?????????",
            "430382": "?????????" } },


        "430400": {
          code: "430400",
          name: "?????????",
          districts: {
            "430405": "?????????",
            "430406": "?????????",
            "430407": "?????????",
            "430408": "?????????",
            "430412": "?????????",
            "430421": "?????????",
            "430422": "?????????",
            "430423": "?????????",
            "430424": "?????????",
            "430426": "?????????",
            "430481": "?????????",
            "430482": "?????????" } },


        "430500": {
          code: "430500",
          name: "?????????",
          districts: {
            "430502": "?????????",
            "430503": "?????????",
            "430511": "?????????",
            "430521": "?????????",
            "430522": "?????????",
            "430523": "?????????",
            "430524": "?????????",
            "430525": "?????????",
            "430527": "?????????",
            "430528": "?????????",
            "430529": "?????????????????????",
            "430581": "?????????" } },


        "430600": {
          code: "430600",
          name: "?????????",
          districts: {
            "430602": "????????????",
            "430603": "?????????",
            "430611": "?????????",
            "430621": "?????????",
            "430623": "?????????",
            "430624": "?????????",
            "430626": "?????????",
            "430681": "?????????",
            "430682": "?????????" } },


        "430700": {
          code: "430700",
          name: "?????????",
          districts: {
            "430702": "?????????",
            "430703": "?????????",
            "430721": "?????????",
            "430722": "?????????",
            "430723": "??????",
            "430724": "?????????",
            "430725": "?????????",
            "430726": "?????????",
            "430781": "?????????" } },


        "430800": {
          code: "430800",
          name: "????????????",
          districts: {
            "430802": "?????????",
            "430811": "????????????",
            "430821": "?????????",
            "430822": "?????????" } },


        "430900": {
          code: "430900",
          name: "?????????",
          districts: {
            "430902": "?????????",
            "430903": "?????????",
            "430921": "??????",
            "430922": "?????????",
            "430923": "?????????",
            "430981": "?????????" } },


        "431000": {
          code: "431000",
          name: "?????????",
          districts: {
            "431002": "?????????",
            "431003": "?????????",
            "431021": "?????????",
            "431022": "?????????",
            "431023": "?????????",
            "431024": "?????????",
            "431025": "?????????",
            "431026": "?????????",
            "431027": "?????????",
            "431028": "?????????",
            "431081": "?????????" } },


        "431100": {
          code: "431100",
          name: "?????????",
          districts: {
            "431102": "?????????",
            "431103": "????????????",
            "431121": "?????????",
            "431122": "?????????",
            "431123": "?????????",
            "431124": "??????",
            "431125": "?????????",
            "431126": "?????????",
            "431127": "?????????",
            "431128": "?????????",
            "431129": "?????????????????????" } },


        "431200": {
          code: "431200",
          name: "?????????",
          districts: {
            "431202": "?????????",
            "431221": "?????????",
            "431222": "?????????",
            "431223": "?????????",
            "431224": "?????????",
            "431225": "?????????",
            "431226": "?????????????????????",
            "431227": "?????????????????????",
            "431228": "?????????????????????",
            "431229": "???????????????????????????",
            "431230": "?????????????????????",
            "431281": "?????????" } },


        "431300": {
          code: "431300",
          name: "?????????",
          districts: {
            "431302": "?????????",
            "431321": "?????????",
            "431322": "?????????",
            "431381": "????????????",
            "431382": "?????????" } },


        "433100": {
          code: "433100",
          name: "??????????????????????????????",
          districts: {
            "433101": "?????????",
            "433122": "?????????",
            "433123": "?????????",
            "433124": "?????????",
            "433125": "?????????",
            "433126": "?????????",
            "433127": "?????????",
            "433130": "?????????" } } } },




    "440000": {
      code: "440000",
      name: "?????????",
      cities: {
        "440100": {
          code: "440100",
          name: "?????????",
          districts: {
            "440103": "?????????",
            "440104": "?????????",
            "440105": "?????????",
            "440106": "?????????",
            "440111": "?????????",
            "440112": "?????????",
            "440113": "?????????",
            "440114": "?????????",
            "440115": "?????????",
            "440117": "?????????",
            "440118": "?????????" } },


        "440200": {
          code: "440200",
          name: "?????????",
          districts: {
            "440203": "?????????",
            "440204": "?????????",
            "440205": "?????????",
            "440222": "?????????",
            "440224": "?????????",
            "440229": "?????????",
            "440232": "?????????????????????",
            "440233": "?????????",
            "440281": "?????????",
            "440282": "?????????" } },


        "440300": {
          code: "440300",
          name: "?????????",
          districts: {
            "440303": "?????????",
            "440304": "?????????",
            "440305": "?????????",
            "440306": "?????????",
            "440307": "?????????",
            "440308": "?????????",
            "440309": "?????????",
            "440310": "?????????",
            "440311": "?????????" } },


        "440400": {
          code: "440400",
          name: "?????????",
          districts: {
            "440402": "?????????",
            "440403": "?????????",
            "440404": "?????????" } },


        "440500": {
          code: "440500",
          name: "?????????",
          districts: {
            "440507": "?????????",
            "440511": "?????????",
            "440512": "?????????",
            "440513": "?????????",
            "440514": "?????????",
            "440515": "?????????",
            "440523": "?????????" } },


        "440600": {
          code: "440600",
          name: "?????????",
          districts: {
            "440604": "?????????",
            "440605": "?????????",
            "440606": "?????????",
            "440607": "?????????",
            "440608": "?????????" } },


        "440700": {
          code: "440700",
          name: "?????????",
          districts: {
            "440703": "?????????",
            "440704": "?????????",
            "440705": "?????????",
            "440781": "?????????",
            "440783": "?????????",
            "440784": "?????????",
            "440785": "?????????" } },


        "440800": {
          code: "440800",
          name: "?????????",
          districts: {
            "440802": "?????????",
            "440803": "?????????",
            "440804": "?????????",
            "440811": "?????????",
            "440823": "?????????",
            "440825": "?????????",
            "440881": "?????????",
            "440882": "?????????",
            "440883": "?????????" } },


        "440900": {
          code: "440900",
          name: "?????????",
          districts: {
            "440902": "?????????",
            "440904": "?????????",
            "440981": "?????????",
            "440982": "?????????",
            "440983": "?????????" } },


        "441200": {
          code: "441200",
          name: "?????????",
          districts: {
            "441202": "?????????",
            "441203": "?????????",
            "441204": "?????????",
            "441223": "?????????",
            "441224": "?????????",
            "441225": "?????????",
            "441226": "?????????",
            "441284": "?????????" } },


        "441300": {
          code: "441300",
          name: "?????????",
          districts: {
            "441302": "?????????",
            "441303": "?????????",
            "441322": "?????????",
            "441323": "?????????",
            "441324": "?????????" } },


        "441400": {
          code: "441400",
          name: "?????????",
          districts: {
            "441402": "?????????",
            "441403": "?????????",
            "441422": "?????????",
            "441423": "?????????",
            "441424": "?????????",
            "441426": "?????????",
            "441427": "?????????",
            "441481": "?????????" } },


        "441500": {
          code: "441500",
          name: "?????????",
          districts: {
            "441502": "??????",
            "441521": "?????????",
            "441523": "?????????",
            "441581": "?????????" } },


        "441600": {
          code: "441600",
          name: "?????????",
          districts: {
            "441602": "?????????",
            "441621": "?????????",
            "441622": "?????????",
            "441623": "?????????",
            "441624": "?????????",
            "441625": "?????????" } },


        "441700": {
          code: "441700",
          name: "?????????",
          districts: {
            "441702": "?????????",
            "441704": "?????????",
            "441721": "?????????",
            "441781": "?????????" } },


        "441800": {
          code: "441800",
          name: "?????????",
          districts: {
            "441802": "?????????",
            "441803": "?????????",
            "441821": "?????????",
            "441823": "?????????",
            "441825": "???????????????????????????",
            "441826": "?????????????????????",
            "441881": "?????????",
            "441882": "?????????" } },


        "441900": {
          code: "441900",
          name: "?????????",
          districts: {} },


        "442000": {
          code: "442000",
          name: "?????????",
          districts: {} },


        "445100": {
          code: "445100",
          name: "?????????",
          districts: {
            "445102": "?????????",
            "445103": "?????????",
            "445122": "?????????" } },


        "445200": {
          code: "445200",
          name: "?????????",
          districts: {
            "445202": "?????????",
            "445203": "?????????",
            "445222": "?????????",
            "445224": "?????????",
            "445281": "?????????" } },


        "445300": {
          code: "445300",
          name: "?????????",
          districts: {
            "445302": "?????????",
            "445303": "?????????",
            "445321": "?????????",
            "445322": "?????????",
            "445381": "?????????" } } } },




    "450000": {
      code: "450000",
      name: "?????????????????????",
      cities: {
        "450100": {
          code: "450100",
          name: "?????????",
          districts: {
            "450102": "?????????",
            "450103": "?????????",
            "450105": "?????????",
            "450107": "????????????",
            "450108": "?????????",
            "450109": "?????????",
            "450110": "?????????",
            "450123": "?????????",
            "450124": "?????????",
            "450125": "?????????",
            "450126": "?????????",
            "450127": "??????" } },


        "450200": {
          code: "450200",
          name: "?????????",
          districts: {
            "450202": "?????????",
            "450203": "?????????",
            "450204": "?????????",
            "450205": "?????????",
            "450206": "?????????",
            "450222": "?????????",
            "450223": "?????????",
            "450224": "?????????",
            "450225": "?????????????????????",
            "450226": "?????????????????????" } },


        "450300": {
          code: "450300",
          name: "?????????",
          districts: {
            "450302": "?????????",
            "450303": "?????????",
            "450304": "?????????",
            "450305": "?????????",
            "450311": "?????????",
            "450312": "?????????",
            "450321": "?????????",
            "450323": "?????????",
            "450324": "?????????",
            "450325": "?????????",
            "450326": "?????????",
            "450327": "?????????",
            "450328": "?????????????????????",
            "450329": "?????????",
            "450330": "?????????",
            "450332": "?????????????????????",
            "450381": "?????????" } },


        "450400": {
          code: "450400",
          name: "?????????",
          districts: {
            "450403": "?????????",
            "450405": "?????????",
            "450406": "?????????",
            "450421": "?????????",
            "450422": "??????",
            "450423": "?????????",
            "450481": "?????????" } },


        "450500": {
          code: "450500",
          name: "?????????",
          districts: {
            "450502": "?????????",
            "450503": "?????????",
            "450512": "????????????",
            "450521": "?????????" } },


        "450600": {
          code: "450600",
          name: "????????????",
          districts: {
            "450602": "?????????",
            "450603": "?????????",
            "450621": "?????????",
            "450681": "?????????" } },


        "450700": {
          code: "450700",
          name: "?????????",
          districts: {
            "450702": "?????????",
            "450703": "?????????",
            "450721": "?????????",
            "450722": "?????????" } },


        "450800": {
          code: "450800",
          name: "?????????",
          districts: {
            "450802": "?????????",
            "450803": "?????????",
            "450804": "?????????",
            "450821": "?????????",
            "450881": "?????????" } },


        "450900": {
          code: "450900",
          name: "?????????",
          districts: {
            "450902": "?????????",
            "450903": "?????????",
            "450921": "??????",
            "450922": "?????????",
            "450923": "?????????",
            "450924": "?????????",
            "450981": "?????????" } },


        "451000": {
          code: "451000",
          name: "?????????",
          districts: {
            "451002": "?????????",
            "451021": "?????????",
            "451022": "?????????",
            "451023": "?????????",
            "451024": "?????????",
            "451026": "?????????",
            "451027": "?????????",
            "451028": "?????????",
            "451029": "?????????",
            "451030": "?????????",
            "451031": "?????????????????????",
            "451081": "?????????" } },


        "451100": {
          code: "451100",
          name: "?????????",
          districts: {
            "451102": "?????????",
            "451103": "?????????",
            "451121": "?????????",
            "451122": "?????????",
            "451123": "?????????????????????" } },


        "451200": {
          code: "451200",
          name: "?????????",
          districts: {
            "451202": "????????????",
            "451203": "?????????",
            "451221": "?????????",
            "451222": "?????????",
            "451223": "?????????",
            "451224": "?????????",
            "451225": "????????????????????????",
            "451226": "????????????????????????",
            "451227": "?????????????????????",
            "451228": "?????????????????????",
            "451229": "?????????????????????" } },


        "451300": {
          code: "451300",
          name: "?????????",
          districts: {
            "451302": "?????????",
            "451321": "?????????",
            "451322": "?????????",
            "451323": "?????????",
            "451324": "?????????????????????",
            "451381": "?????????" } },


        "451400": {
          code: "451400",
          name: "?????????",
          districts: {
            "451402": "?????????",
            "451421": "?????????",
            "451422": "?????????",
            "451423": "?????????",
            "451424": "?????????",
            "451425": "?????????",
            "451481": "?????????" } } } },




    "460000": {
      code: "460000",
      name: "?????????",
      cities: {
        "460100": {
          code: "460100",
          name: "?????????",
          districts: {
            "460105": "?????????",
            "460106": "?????????",
            "460107": "?????????",
            "460108": "?????????" } },


        "460200": {
          code: "460200",
          name: "?????????",
          districts: {
            "460202": "?????????",
            "460203": "?????????",
            "460204": "?????????",
            "460205": "?????????" } },


        "460300": {
          code: "460300",
          name: "?????????",
          districts: {
            "460321": "????????????",
            "460322": "????????????",
            "460323": "?????????????????????????????????",
            "460324": "????????????" } },


        "460400": {
          code: "460400",
          name: "?????????",
          districts: {} } } },




    "500000": {
      code: "500000",
      name: "?????????",
      cities: {
        "500000": {
          code: "500000",
          name: "?????????",
          districts: {
            "500101": "?????????",
            "500102": "?????????",
            "500103": "?????????",
            "500104": "????????????",
            "500105": "?????????",
            "500106": "????????????",
            "500107": "????????????",
            "500108": "?????????",
            "500109": "?????????",
            "500110": "?????????",
            "500111": "?????????",
            "500112": "?????????",
            "500113": "?????????",
            "500114": "?????????",
            "500115": "?????????",
            "500116": "?????????",
            "500117": "?????????",
            "500118": "?????????",
            "500119": "?????????",
            "500120": "?????????",
            "500151": "?????????",
            "500152": "?????????",
            "500153": "?????????",
            "500154": "?????????",
            "500155": "?????????",
            "500156": "?????????",
            "500229": "?????????",
            "500230": "?????????",
            "500231": "?????????",
            "500233": "??????",
            "500235": "?????????",
            "500236": "?????????",
            "500237": "?????????",
            "500238": "?????????",
            "500240": "????????????????????????",
            "500241": "??????????????????????????????",
            "500242": "??????????????????????????????",
            "500243": "??????????????????????????????" } } } },




    "510000": {
      code: "510000",
      name: "?????????",
      cities: {
        "510100": {
          code: "510100",
          name: "?????????",
          districts: {
            "510104": "?????????",
            "510105": "?????????",
            "510106": "?????????",
            "510107": "?????????",
            "510108": "?????????",
            "510112": "????????????",
            "510113": "????????????",
            "510114": "?????????",
            "510115": "?????????",
            "510116": "?????????",
            "510117": "?????????",
            "510121": "?????????",
            "510129": "?????????",
            "510131": "?????????",
            "510132": "?????????",
            "510181": "????????????",
            "510182": "?????????",
            "510183": "?????????",
            "510184": "?????????",
            "510185": "?????????" } },


        "510300": {
          code: "510300",
          name: "?????????",
          districts: {
            "510302": "????????????",
            "510303": "?????????",
            "510304": "?????????",
            "510311": "?????????",
            "510321": "??????",
            "510322": "?????????" } },


        "510400": {
          code: "510400",
          name: "????????????",
          districts: {
            "510402": "??????",
            "510403": "??????",
            "510411": "?????????",
            "510421": "?????????",
            "510422": "?????????" } },


        "510500": {
          code: "510500",
          name: "?????????",
          districts: {
            "510502": "?????????",
            "510503": "?????????",
            "510504": "????????????",
            "510521": "??????",
            "510522": "?????????",
            "510524": "?????????",
            "510525": "?????????" } },


        "510600": {
          code: "510600",
          name: "?????????",
          districts: {
            "510603": "?????????",
            "510604": "?????????",
            "510623": "?????????",
            "510681": "?????????",
            "510682": "?????????",
            "510683": "?????????" } },


        "510700": {
          code: "510700",
          name: "?????????",
          districts: {
            "510703": "?????????",
            "510704": "?????????",
            "510705": "?????????",
            "510722": "?????????",
            "510723": "?????????",
            "510725": "?????????",
            "510726": "?????????????????????",
            "510727": "?????????",
            "510781": "?????????" } },


        "510800": {
          code: "510800",
          name: "?????????",
          districts: {
            "510802": "?????????",
            "510811": "?????????",
            "510812": "?????????",
            "510821": "?????????",
            "510822": "?????????",
            "510823": "?????????",
            "510824": "?????????" } },


        "510900": {
          code: "510900",
          name: "?????????",
          districts: {
            "510903": "?????????",
            "510904": "?????????",
            "510921": "?????????",
            "510922": "?????????",
            "510923": "?????????" } },


        "511000": {
          code: "511000",
          name: "?????????",
          districts: {
            "511002": "?????????",
            "511011": "?????????",
            "511024": "?????????",
            "511025": "?????????",
            "511083": "?????????" } },


        "511100": {
          code: "511100",
          name: "?????????",
          districts: {
            "511102": "?????????",
            "511111": "?????????",
            "511112": "????????????",
            "511113": "????????????",
            "511123": "?????????",
            "511124": "?????????",
            "511126": "?????????",
            "511129": "?????????",
            "511132": "?????????????????????",
            "511133": "?????????????????????",
            "511181": "????????????" } },


        "511300": {
          code: "511300",
          name: "?????????",
          districts: {
            "511302": "?????????",
            "511303": "?????????",
            "511304": "?????????",
            "511321": "?????????",
            "511322": "?????????",
            "511323": "?????????",
            "511324": "?????????",
            "511325": "?????????",
            "511381": "?????????" } },


        "511400": {
          code: "511400",
          name: "?????????",
          districts: {
            "511402": "?????????",
            "511403": "?????????",
            "511421": "?????????",
            "511423": "?????????",
            "511424": "?????????",
            "511425": "?????????" } },


        "511500": {
          code: "511500",
          name: "?????????",
          districts: {
            "511502": "?????????",
            "511503": "?????????",
            "511504": "?????????",
            "511523": "?????????",
            "511524": "?????????",
            "511525": "??????",
            "511526": "??????",
            "511527": "?????????",
            "511528": "?????????",
            "511529": "?????????" } },


        "511600": {
          code: "511600",
          name: "?????????",
          districts: {
            "511602": "?????????",
            "511603": "?????????",
            "511621": "?????????",
            "511622": "?????????",
            "511623": "?????????",
            "511681": "?????????" } },


        "511700": {
          code: "511700",
          name: "?????????",
          districts: {
            "511702": "?????????",
            "511703": "?????????",
            "511722": "?????????",
            "511723": "?????????",
            "511724": "?????????",
            "511725": "??????",
            "511781": "?????????" } },


        "511800": {
          code: "511800",
          name: "?????????",
          districts: {
            "511802": "?????????",
            "511803": "?????????",
            "511822": "?????????",
            "511823": "?????????",
            "511824": "?????????",
            "511825": "?????????",
            "511826": "?????????",
            "511827": "?????????" } },


        "511900": {
          code: "511900",
          name: "?????????",
          districts: {
            "511902": "?????????",
            "511903": "?????????",
            "511921": "?????????",
            "511922": "?????????",
            "511923": "?????????" } },


        "512000": {
          code: "512000",
          name: "?????????",
          districts: {
            "512002": "?????????",
            "512021": "?????????",
            "512022": "?????????" } },


        "513200": {
          code: "513200",
          name: "???????????????????????????",
          districts: {
            "513201": "????????????",
            "513221": "?????????",
            "513222": "??????",
            "513223": "??????",
            "513224": "?????????",
            "513225": "????????????",
            "513226": "?????????",
            "513227": "?????????",
            "513228": "?????????",
            "513230": "?????????",
            "513231": "?????????",
            "513232": "????????????",
            "513233": "?????????" } },


        "513300": {
          code: "513300",
          name: "?????????????????????",
          districts: {
            "513301": "?????????",
            "513322": "?????????",
            "513323": "?????????",
            "513324": "?????????",
            "513325": "?????????",
            "513326": "?????????",
            "513327": "?????????",
            "513328": "?????????",
            "513329": "?????????",
            "513330": "?????????",
            "513331": "?????????",
            "513332": "?????????",
            "513333": "?????????",
            "513334": "?????????",
            "513335": "?????????",
            "513336": "?????????",
            "513337": "?????????",
            "513338": "?????????" } },


        "513400": {
          code: "513400",
          name: "?????????????????????",
          districts: {
            "513401": "?????????",
            "513422": "?????????????????????",
            "513423": "?????????",
            "513424": "?????????",
            "513425": "?????????",
            "513426": "?????????",
            "513427": "?????????",
            "513428": "?????????",
            "513429": "?????????",
            "513430": "?????????",
            "513431": "?????????",
            "513432": "?????????",
            "513433": "?????????",
            "513434": "?????????",
            "513435": "?????????",
            "513436": "?????????",
            "513437": "?????????" } } } },




    "520000": {
      code: "520000",
      name: "?????????",
      cities: {
        "520100": {
          code: "520100",
          name: "?????????",
          districts: {
            "520102": "?????????",
            "520103": "?????????",
            "520111": "?????????",
            "520112": "?????????",
            "520113": "?????????",
            "520115": "????????????",
            "520121": "?????????",
            "520122": "?????????",
            "520123": "?????????",
            "520181": "?????????" } },


        "520200": {
          code: "520200",
          name: "????????????",
          districts: {
            "520201": "?????????",
            "520203": "????????????",
            "520221": "?????????",
            "520281": "?????????" } },


        "520300": {
          code: "520300",
          name: "?????????",
          districts: {
            "520302": "????????????",
            "520303": "?????????",
            "520304": "?????????",
            "520322": "?????????",
            "520323": "?????????",
            "520324": "?????????",
            "520325": "??????????????????????????????",
            "520326": "??????????????????????????????",
            "520327": "?????????",
            "520328": "?????????",
            "520329": "?????????",
            "520330": "?????????",
            "520381": "?????????",
            "520382": "?????????" } },


        "520400": {
          code: "520400",
          name: "?????????",
          districts: {
            "520402": "?????????",
            "520403": "?????????",
            "520422": "?????????",
            "520423": "??????????????????????????????",
            "520424": "??????????????????????????????",
            "520425": "??????????????????????????????" } },


        "520500": {
          code: "520500",
          name: "?????????",
          districts: {
            "520502": "????????????",
            "520521": "?????????",
            "520522": "?????????",
            "520523": "?????????",
            "520524": "?????????",
            "520525": "?????????",
            "520526": "?????????????????????????????????",
            "520527": "?????????" } },


        "520600": {
          code: "520600",
          name: "?????????",
          districts: {
            "520602": "?????????",
            "520603": "?????????",
            "520621": "?????????",
            "520622": "?????????????????????",
            "520623": "?????????",
            "520624": "?????????",
            "520625": "??????????????????????????????",
            "520626": "?????????",
            "520627": "????????????????????????",
            "520628": "?????????????????????" } },


        "522300": {
          code: "522300",
          name: "?????????????????????????????????",
          districts: {
            "522301": "?????????",
            "522302": "?????????",
            "522323": "?????????",
            "522324": "?????????",
            "522325": "?????????",
            "522326": "?????????",
            "522327": "?????????",
            "522328": "?????????" } },


        "522600": {
          code: "522600",
          name: "??????????????????????????????",
          districts: {
            "522601": "?????????",
            "522622": "?????????",
            "522623": "?????????",
            "522624": "?????????",
            "522625": "?????????",
            "522626": "?????????",
            "522627": "?????????",
            "522628": "?????????",
            "522629": "?????????",
            "522630": "?????????",
            "522631": "?????????",
            "522632": "?????????",
            "522633": "?????????",
            "522634": "?????????",
            "522635": "?????????",
            "522636": "?????????" } },


        "522700": {
          code: "522700",
          name: "??????????????????????????????",
          districts: {
            "522701": "?????????",
            "522702": "?????????",
            "522722": "?????????",
            "522723": "?????????",
            "522725": "?????????",
            "522726": "?????????",
            "522727": "?????????",
            "522728": "?????????",
            "522729": "?????????",
            "522730": "?????????",
            "522731": "?????????",
            "522732": "?????????????????????" } } } },




    "530000": {
      code: "530000",
      name: "?????????",
      cities: {
        "530100": {
          code: "530100",
          name: "?????????",
          districts: {
            "530102": "?????????",
            "530103": "?????????",
            "530111": "?????????",
            "530112": "?????????",
            "530113": "?????????",
            "530114": "?????????",
            "530115": "?????????",
            "530124": "?????????",
            "530125": "?????????",
            "530126": "?????????????????????",
            "530127": "?????????",
            "530128": "???????????????????????????",
            "530129": "???????????????????????????",
            "530181": "?????????" } },


        "530300": {
          code: "530300",
          name: "?????????",
          districts: {
            "530302": "?????????",
            "530303": "?????????",
            "530304": "?????????",
            "530322": "?????????",
            "530323": "?????????",
            "530324": "?????????",
            "530325": "?????????",
            "530326": "?????????",
            "530381": "?????????" } },


        "530400": {
          code: "530400",
          name: "?????????",
          districts: {
            "530402": "?????????",
            "530403": "?????????",
            "530422": "?????????",
            "530423": "?????????",
            "530424": "?????????",
            "530425": "?????????",
            "530426": "?????????????????????",
            "530427": "???????????????????????????",
            "530428": "????????????????????????????????????" } },


        "530500": {
          code: "530500",
          name: "?????????",
          districts: {
            "530502": "?????????",
            "530521": "?????????",
            "530523": "?????????",
            "530524": "?????????",
            "530581": "?????????" } },


        "530600": {
          code: "530600",
          name: "?????????",
          districts: {
            "530602": "?????????",
            "530621": "?????????",
            "530622": "?????????",
            "530623": "?????????",
            "530624": "?????????",
            "530625": "?????????",
            "530626": "?????????",
            "530627": "?????????",
            "530628": "?????????",
            "530629": "?????????",
            "530681": "?????????" } },


        "530700": {
          code: "530700",
          name: "?????????",
          districts: {
            "530702": "?????????",
            "530721": "????????????????????????",
            "530722": "?????????",
            "530723": "?????????",
            "530724": "?????????????????????" } },


        "530800": {
          code: "530800",
          name: "?????????",
          districts: {
            "530802": "?????????",
            "530821": "??????????????????????????????",
            "530822": "????????????????????????",
            "530823": "?????????????????????",
            "530824": "???????????????????????????",
            "530825": "???????????????????????????????????????",
            "530826": "??????????????????????????????",
            "530827": "????????????????????????????????????",
            "530828": "????????????????????????",
            "530829": "?????????????????????" } },


        "530900": {
          code: "530900",
          name: "?????????",
          districts: {
            "530902": "?????????",
            "530921": "?????????",
            "530922": "??????",
            "530923": "?????????",
            "530924": "?????????",
            "530925": "?????????????????????????????????????????????",
            "530926": "???????????????????????????",
            "530927": "?????????????????????" } },


        "532300": {
          code: "532300",
          name: "?????????????????????",
          districts: {
            "532301": "?????????",
            "532322": "?????????",
            "532323": "?????????",
            "532324": "?????????",
            "532325": "?????????",
            "532326": "?????????",
            "532327": "?????????",
            "532328": "?????????",
            "532329": "?????????",
            "532331": "?????????" } },


        "532500": {
          code: "532500",
          name: "??????????????????????????????",
          districts: {
            "532501": "?????????",
            "532502": "?????????",
            "532503": "?????????",
            "532504": "?????????",
            "532523": "?????????????????????",
            "532524": "?????????",
            "532525": "?????????",
            "532527": "?????????",
            "532528": "?????????",
            "532529": "?????????",
            "532530": "?????????????????????????????????",
            "532531": "?????????",
            "532532": "?????????????????????" } },


        "532600": {
          code: "532600",
          name: "???????????????????????????",
          districts: {
            "532601": "?????????",
            "532622": "?????????",
            "532623": "?????????",
            "532624": "????????????",
            "532625": "?????????",
            "532626": "?????????",
            "532627": "?????????",
            "532628": "?????????" } },


        "532800": {
          code: "532800",
          name: "???????????????????????????",
          districts: {
            "532801": "?????????",
            "532822": "?????????",
            "532823": "?????????" } },


        "532900": {
          code: "532900",
          name: "?????????????????????",
          districts: {
            "532901": "?????????",
            "532922": "?????????????????????",
            "532923": "?????????",
            "532924": "?????????",
            "532925": "?????????",
            "532926": "?????????????????????",
            "532927": "???????????????????????????",
            "532928": "?????????",
            "532929": "?????????",
            "532930": "?????????",
            "532931": "?????????",
            "532932": "?????????" } },


        "533100": {
          code: "533100",
          name: "??????????????????????????????",
          districts: {
            "533102": "?????????",
            "533103": "??????",
            "533122": "?????????",
            "533123": "?????????",
            "533124": "?????????" } },


        "533300": {
          code: "533300",
          name: "????????????????????????",
          districts: {
            "533301": "?????????",
            "533323": "?????????",
            "533324": "??????????????????????????????",
            "533325": "??????????????????????????????" } },


        "533400": {
          code: "533400",
          name: "?????????????????????",
          districts: {
            "533401": "???????????????",
            "533422": "?????????",
            "533423": "????????????????????????" } } } },




    "540000": {
      code: "540000",
      name: "???????????????",
      cities: {
        "540100": {
          code: "540100",
          name: "?????????",
          districts: {
            "540102": "?????????",
            "540103": "???????????????",
            "540104": "?????????",
            "540121": "?????????",
            "540122": "?????????",
            "540123": "?????????",
            "540124": "?????????",
            "540127": "???????????????" } },


        "540200": {
          code: "540200",
          name: "????????????",
          districts: {
            "540202": "????????????",
            "540221": "????????????",
            "540222": "?????????",
            "540223": "?????????",
            "540224": "?????????",
            "540225": "?????????",
            "540226": "?????????",
            "540227": "????????????",
            "540228": "?????????",
            "540229": "?????????",
            "540230": "?????????",
            "540231": "?????????",
            "540232": "?????????",
            "540233": "?????????",
            "540234": "?????????",
            "540235": "????????????",
            "540236": "?????????",
            "540237": "?????????" } },


        "540300": {
          code: "540300",
          name: "?????????",
          districts: {
            "540302": "?????????",
            "540321": "?????????",
            "540322": "?????????",
            "540323": "????????????",
            "540324": "?????????",
            "540325": "?????????",
            "540326": "?????????",
            "540327": "?????????",
            "540328": "?????????",
            "540329": "?????????",
            "540330": "?????????" } },


        "540400": {
          code: "540400",
          name: "?????????",
          districts: {
            "540402": "?????????",
            "540421": "???????????????",
            "540422": "?????????",
            "540423": "?????????",
            "540424": "?????????",
            "540425": "?????????",
            "540426": "??????" } },


        "540500": {
          code: "540500",
          name: "?????????",
          districts: {
            "540502": "?????????",
            "540521": "?????????",
            "540522": "?????????",
            "540523": "?????????",
            "540524": "?????????",
            "540525": "?????????",
            "540526": "?????????",
            "540527": "?????????",
            "540528": "?????????",
            "540529": "?????????",
            "540530": "?????????",
            "540531": "????????????" } },


        "540600": {
          code: "540600",
          name: "?????????",
          districts: {
            "540602": "?????????",
            "540621": "?????????",
            "540622": "?????????",
            "540623": "?????????",
            "540624": "?????????",
            "540625": "?????????",
            "540626": "??????",
            "540627": "?????????",
            "540628": "?????????",
            "540629": "?????????",
            "540630": "?????????" } },


        "542500": {
          code: "542500",
          name: "????????????",
          districts: {
            "542521": "?????????",
            "542522": "?????????",
            "542523": "?????????",
            "542524": "?????????",
            "542525": "?????????",
            "542526": "?????????",
            "542527": "?????????" } } } },




    "610000": {
      code: "610000",
      name: "?????????",
      cities: {
        "610100": {
          code: "610100",
          name: "?????????",
          districts: {
            "610102": "?????????",
            "610103": "?????????",
            "610104": "?????????",
            "610111": "?????????",
            "610112": "?????????",
            "610113": "?????????",
            "610114": "?????????",
            "610115": "?????????",
            "610116": "?????????",
            "610117": "?????????",
            "610118": "?????????",
            "610122": "?????????",
            "610124": "?????????" } },


        "610200": {
          code: "610200",
          name: "?????????",
          districts: {
            "610202": "?????????",
            "610203": "?????????",
            "610204": "?????????",
            "610222": "?????????" } },


        "610300": {
          code: "610300",
          name: "?????????",
          districts: {
            "610302": "?????????",
            "610303": "?????????",
            "610304": "?????????",
            "610322": "?????????",
            "610323": "?????????",
            "610324": "?????????",
            "610326": "??????",
            "610327": "??????",
            "610328": "?????????",
            "610329": "?????????",
            "610330": "??????",
            "610331": "?????????" } },


        "610400": {
          code: "610400",
          name: "?????????",
          districts: {
            "610402": "?????????",
            "610403": "?????????",
            "610404": "?????????",
            "610422": "?????????",
            "610423": "?????????",
            "610424": "??????",
            "610425": "?????????",
            "610426": "?????????",
            "610428": "?????????",
            "610429": "?????????",
            "610430": "?????????",
            "610431": "?????????",
            "610481": "?????????",
            "610482": "?????????" } },


        "610500": {
          code: "610500",
          name: "?????????",
          districts: {
            "610502": "?????????",
            "610503": "?????????",
            "610522": "?????????",
            "610523": "?????????",
            "610524": "?????????",
            "610525": "?????????",
            "610526": "?????????",
            "610527": "?????????",
            "610528": "?????????",
            "610581": "?????????",
            "610582": "?????????" } },


        "610600": {
          code: "610600",
          name: "?????????",
          districts: {
            "610602": "?????????",
            "610603": "?????????",
            "610621": "?????????",
            "610622": "?????????",
            "610623": "?????????",
            "610625": "?????????",
            "610626": "?????????",
            "610627": "?????????",
            "610628": "??????",
            "610629": "?????????",
            "610630": "?????????",
            "610631": "?????????",
            "610632": "?????????" } },


        "610700": {
          code: "610700",
          name: "?????????",
          districts: {
            "610702": "?????????",
            "610703": "?????????",
            "610722": "?????????",
            "610723": "??????",
            "610724": "?????????",
            "610725": "??????",
            "610726": "?????????",
            "610727": "?????????",
            "610728": "?????????",
            "610729": "?????????",
            "610730": "?????????" } },


        "610800": {
          code: "610800",
          name: "?????????",
          districts: {
            "610802": "?????????",
            "610803": "?????????",
            "610822": "?????????",
            "610824": "?????????",
            "610825": "?????????",
            "610826": "?????????",
            "610827": "?????????",
            "610828": "??????",
            "610829": "?????????",
            "610830": "?????????",
            "610831": "?????????",
            "610881": "?????????" } },


        "610900": {
          code: "610900",
          name: "?????????",
          districts: {
            "610902": "?????????",
            "610921": "?????????",
            "610922": "?????????",
            "610923": "?????????",
            "610924": "?????????",
            "610925": "?????????",
            "610926": "?????????",
            "610927": "?????????",
            "610928": "?????????",
            "610929": "?????????" } },


        "611000": {
          code: "611000",
          name: "?????????",
          districts: {
            "611002": "?????????",
            "611021": "?????????",
            "611022": "?????????",
            "611023": "?????????",
            "611024": "?????????",
            "611025": "?????????",
            "611026": "?????????" } } } },




    "620000": {
      code: "620000",
      name: "?????????",
      cities: {
        "620100": {
          code: "620100",
          name: "?????????",
          districts: {
            "620102": "?????????",
            "620103": "????????????",
            "620104": "?????????",
            "620105": "?????????",
            "620111": "?????????",
            "620121": "?????????",
            "620122": "?????????",
            "620123": "?????????" } },


        "620200": {
          code: "620200",
          name: "????????????",
          districts: {} },


        "620300": {
          code: "620300",
          name: "?????????",
          districts: {
            "620302": "?????????",
            "620321": "?????????" } },


        "620400": {
          code: "620400",
          name: "?????????",
          districts: {
            "620402": "?????????",
            "620403": "?????????",
            "620421": "?????????",
            "620422": "?????????",
            "620423": "?????????" } },


        "620500": {
          code: "620500",
          name: "?????????",
          districts: {
            "620502": "?????????",
            "620503": "?????????",
            "620521": "?????????",
            "620522": "?????????",
            "620523": "?????????",
            "620524": "?????????",
            "620525": "????????????????????????" } },


        "620600": {
          code: "620600",
          name: "?????????",
          districts: {
            "620602": "?????????",
            "620621": "?????????",
            "620622": "?????????",
            "620623": "?????????????????????" } },


        "620700": {
          code: "620700",
          name: "?????????",
          districts: {
            "620702": "?????????",
            "620721": "????????????????????????",
            "620722": "?????????",
            "620723": "?????????",
            "620724": "?????????",
            "620725": "?????????" } },


        "620800": {
          code: "620800",
          name: "?????????",
          districts: {
            "620802": "?????????",
            "620821": "?????????",
            "620822": "?????????",
            "620823": "?????????",
            "620825": "?????????",
            "620826": "?????????",
            "620881": "?????????" } },


        "620900": {
          code: "620900",
          name: "?????????",
          districts: {
            "620902": "?????????",
            "620921": "?????????",
            "620922": "?????????",
            "620923": "????????????????????????",
            "620924": "??????????????????????????????",
            "620981": "?????????",
            "620982": "?????????" } },


        "621000": {
          code: "621000",
          name: "?????????",
          districts: {
            "621002": "?????????",
            "621021": "?????????",
            "621022": "??????",
            "621023": "?????????",
            "621024": "?????????",
            "621025": "?????????",
            "621026": "??????",
            "621027": "?????????" } },


        "621100": {
          code: "621100",
          name: "?????????",
          districts: {
            "621102": "?????????",
            "621121": "?????????",
            "621122": "?????????",
            "621123": "?????????",
            "621124": "?????????",
            "621125": "??????",
            "621126": "??????" } },


        "621200": {
          code: "621200",
          name: "?????????",
          districts: {
            "621202": "?????????",
            "621221": "??????",
            "621222": "??????",
            "621223": "?????????",
            "621224": "??????",
            "621225": "?????????",
            "621226": "??????",
            "621227": "??????",
            "621228": "?????????" } },


        "622900": {
          code: "622900",
          name: "?????????????????????",
          districts: {
            "622901": "?????????",
            "622921": "?????????",
            "622922": "?????????",
            "622923": "?????????",
            "622924": "?????????",
            "622925": "?????????",
            "622926": "??????????????????",
            "622927": "?????????????????????????????????????????????" } },


        "623000": {
          code: "623000",
          name: "?????????????????????",
          districts: {
            "623001": "?????????",
            "623021": "?????????",
            "623022": "?????????",
            "623023": "?????????",
            "623024": "?????????",
            "623025": "?????????",
            "623026": "?????????",
            "623027": "?????????" } } } },




    "630000": {
      code: "630000",
      name: "?????????",
      cities: {
        "630100": {
          code: "630100",
          name: "?????????",
          districts: {
            "630102": "?????????",
            "630103": "?????????",
            "630104": "?????????",
            "630105": "?????????",
            "630121": "???????????????????????????",
            "630122": "?????????",
            "630123": "?????????" } },


        "630200": {
          code: "630200",
          name: "?????????",
          districts: {
            "630202": "?????????",
            "630203": "?????????",
            "630222": "???????????????????????????",
            "630223": "?????????????????????",
            "630224": "?????????????????????",
            "630225": "????????????????????????" } },


        "632200": {
          code: "632200",
          name: "?????????????????????",
          districts: {
            "632221": "?????????????????????",
            "632222": "?????????",
            "632223": "?????????",
            "632224": "?????????" } },


        "632300": {
          code: "632300",
          name: "?????????????????????",
          districts: {
            "632321": "?????????",
            "632322": "?????????",
            "632323": "?????????",
            "632324": "????????????????????????" } },


        "632500": {
          code: "632500",
          name: "?????????????????????",
          districts: {
            "632521": "?????????",
            "632522": "?????????",
            "632523": "?????????",
            "632524": "?????????",
            "632525": "?????????" } },


        "632600": {
          code: "632600",
          name: "?????????????????????",
          districts: {
            "632621": "?????????",
            "632622": "?????????",
            "632623": "?????????",
            "632624": "?????????",
            "632625": "?????????",
            "632626": "?????????" } },


        "632700": {
          code: "632700",
          name: "?????????????????????",
          districts: {
            "632701": "?????????",
            "632722": "?????????",
            "632723": "?????????",
            "632724": "?????????",
            "632725": "?????????",
            "632726": "????????????" } },


        "632800": {
          code: "632800",
          name: "??????????????????????????????",
          districts: {
            "632801": "????????????",
            "632802": "????????????",
            "632803": "?????????",
            "632821": "?????????",
            "632822": "?????????",
            "632823": "?????????" } } } },




    "640000": {
      code: "640000",
      name: "?????????????????????",
      cities: {
        "640100": {
          code: "640100",
          name: "?????????",
          districts: {
            "640104": "?????????",
            "640105": "?????????",
            "640106": "?????????",
            "640121": "?????????",
            "640122": "?????????",
            "640181": "?????????" } },


        "640200": {
          code: "640200",
          name: "????????????",
          districts: {
            "640202": "????????????",
            "640205": "?????????",
            "640221": "?????????" } },


        "640300": {
          code: "640300",
          name: "?????????",
          districts: {
            "640302": "?????????",
            "640303": "????????????",
            "640323": "?????????",
            "640324": "?????????",
            "640381": "????????????" } },


        "640400": {
          code: "640400",
          name: "?????????",
          districts: {
            "640402": "?????????",
            "640422": "?????????",
            "640423": "?????????",
            "640424": "?????????",
            "640425": "?????????" } },


        "640500": {
          code: "640500",
          name: "?????????",
          districts: {
            "640502": "????????????",
            "640521": "?????????",
            "640522": "?????????" } } } },




    "650000": {
      code: "650000",
      name: "????????????????????????",
      cities: {
        "650100": {
          code: "650100",
          name: "???????????????",
          districts: {
            "650102": "?????????",
            "650103": "???????????????",
            "650104": "?????????",
            "650105": "????????????",
            "650106": "????????????",
            "650107": "????????????",
            "650109": "?????????",
            "650121": "???????????????" } },


        "650200": {
          code: "650200",
          name: "???????????????",
          districts: {
            "650202": "????????????",
            "650203": "???????????????",
            "650204": "????????????",
            "650205": "????????????" } },


        "650400": {
          code: "650400",
          name: "????????????",
          districts: {
            "650402": "?????????",
            "650421": "?????????",
            "650422": "????????????" } },


        "650500": {
          code: "650500",
          name: "?????????",
          districts: {
            "650502": "?????????",
            "650521": "???????????????????????????",
            "650522": "?????????" } },


        "652300": {
          code: "652300",
          name: "?????????????????????",
          districts: {
            "652301": "?????????",
            "652302": "?????????",
            "652323": "????????????",
            "652324": "????????????",
            "652325": "?????????",
            "652327": "???????????????",
            "652328": "????????????????????????" } },


        "652700": {
          code: "652700",
          name: "???????????????????????????",
          districts: {
            "652701": "?????????",
            "652702": "???????????????",
            "652722": "?????????",
            "652723": "?????????" } },


        "652800": {
          code: "652800",
          name: "???????????????????????????",
          districts: {
            "652801": "????????????",
            "652822": "?????????",
            "652823": "?????????",
            "652824": "?????????",
            "652825": "?????????",
            "652826": "?????????????????????",
            "652827": "?????????",
            "652828": "?????????",
            "652829": "?????????" } },


        "652900": {
          code: "652900",
          name: "???????????????",
          districts: {
            "652901": "????????????",
            "652922": "?????????",
            "652923": "?????????",
            "652924": "?????????",
            "652925": "?????????",
            "652926": "?????????",
            "652927": "?????????",
            "652928": "????????????",
            "652929": "?????????" } },


        "653000": {
          code: "653000",
          name: "?????????????????????????????????",
          districts: {
            "653001": "????????????",
            "653022": "????????????",
            "653023": "????????????",
            "653024": "?????????" } },


        "653100": {
          code: "653100",
          name: "????????????",
          districts: {
            "653101": "?????????",
            "653121": "?????????",
            "653122": "?????????",
            "653123": "????????????",
            "653124": "?????????",
            "653125": "?????????",
            "653126": "?????????",
            "653127": "????????????",
            "653128": "????????????",
            "653129": "?????????",
            "653130": "?????????",
            "653131": "?????????????????????????????????" } },


        "653200": {
          code: "653200",
          name: "????????????",
          districts: {
            "653201": "?????????",
            "653221": "?????????",
            "653222": "?????????",
            "653223": "?????????",
            "653224": "?????????",
            "653225": "?????????",
            "653226": "?????????",
            "653227": "?????????" } },


        "654000": {
          code: "654000",
          name: "????????????????????????",
          districts: {
            "654002": "?????????",
            "654003": "?????????",
            "654004": "???????????????",
            "654021": "?????????",
            "654022": "???????????????????????????",
            "654023": "?????????",
            "654024": "?????????",
            "654025": "?????????",
            "654026": "?????????",
            "654027": "????????????",
            "654028": "????????????" } },


        "654200": {
          code: "654200",
          name: "????????????",
          districts: {
            "654201": "?????????",
            "654202": "?????????",
            "654221": "?????????",
            "654223": "?????????",
            "654224": "?????????",
            "654225": "?????????",
            "654226": "??????????????????????????????" } },


        "654300": {
          code: "654300",
          name: "???????????????",
          districts: {
            "654301": "????????????",
            "654321": "????????????",
            "654322": "?????????",
            "654323": "?????????",
            "654324": "????????????",
            "654325": "?????????",
            "654326": "????????????" } } } },




    "810000": {
      code: "810000",
      name: "?????????????????????",
      cities: {
        "810000": {
          code: "810000",
          name: "?????????????????????",
          districts: {
            "810101": "?????????",
            "810102": "?????????",
            "810103": "??????",
            "810104": "??????",
            "810105": "????????????",
            "810106": "????????????",
            "810107": "????????????",
            "810108": "????????????",
            "810109": "?????????",
            "810110": "??????",
            "810111": "?????????",
            "810112": "?????????",
            "810113": "?????????",
            "810114": "?????????",
            "810115": "?????????",
            "810116": "?????????",
            "810117": "?????????",
            "810118": "?????????" } } } },




    "820000": {
      code: "820000",
      name: "?????????????????????",
      cities: {
        "820000": {
          code: "820000",
          name: "?????????????????????",
          districts: {
            "820101": "???????????????",
            "820102": "??????????????????",
            "820103": "?????????",
            "820104": "????????????",
            "820105": "????????????",
            "820106": "????????????",
            "820107": "??????????????????",
            "820108": "?????????",
            "820109": "????????????" } } } },




    "830000": {
      code: "830000",
      name: "?????????",
      cities: {
        "830100": {
          code: "830100",
          name: "?????????",
          districts: {
            "830101": "?????????",
            "830102": "?????????",
            "830103": "?????????",
            "830104": "?????????",
            "830105": "?????????",
            "830106": "?????????",
            "830107": "?????????",
            "830108": "?????????",
            "830109": "?????????",
            "830110": "?????????",
            "830111": "?????????",
            "830112": "?????????" } },


        "830200": {
          code: "830200",
          name: "?????????",
          districts: {
            "830201": "?????????",
            "830202": "?????????",
            "830203": "?????????",
            "830204": "?????????",
            "830205": "?????????",
            "830206": "?????????",
            "830207": "?????????",
            "830208": "?????????",
            "830209": "?????????",
            "830210": "?????????",
            "830211": "?????????",
            "830212": "?????????",
            "830213": "?????????",
            "830214": "?????????",
            "830215": "?????????",
            "830216": "?????????",
            "830217": "?????????",
            "830218": "?????????",
            "830219": "?????????",
            "830220": "?????????",
            "830221": "?????????",
            "830222": "?????????",
            "830223": "?????????",
            "830224": "?????????",
            "830225": "?????????",
            "830226": "?????????",
            "830227": "?????????",
            "830228": "?????????",
            "830229": "?????????" } },


        "830300": {
          code: "830300",
          name: "?????????",
          districts: {
            "830301": "?????????",
            "830302": "?????????",
            "830303": "?????????",
            "830304": "?????????",
            "830305": "?????????",
            "830306": "?????????",
            "830307": "?????????",
            "830308": "?????????",
            "830309": "?????????",
            "830310": "?????????",
            "830311": "?????????",
            "830312": "?????????",
            "830313": "?????????" } },


        "830400": {
          code: "830400",
          name: "?????????",
          districts: {
            "830401": "??????",
            "830402": "??????",
            "830403": "??????",
            "830404": "??????",
            "830405": "??????",
            "830406": "?????????",
            "830407": "?????????",
            "830408": "?????????",
            "830409": "?????????",
            "830410": "?????????",
            "830411": "?????????",
            "830412": "?????????",
            "830413": "?????????",
            "830414": "?????????",
            "830415": "?????????",
            "830416": "?????????",
            "830417": "?????????",
            "830418": "?????????",
            "830419": "?????????",
            "830420": "?????????",
            "830421": "?????????",
            "830422": "?????????",
            "830423": "?????????",
            "830424": "?????????",
            "830425": "?????????",
            "830426": "?????????",
            "830427": "?????????",
            "830428": "?????????",
            "830429": "?????????" } },


        "830500": {
          code: "830500",
          name: "?????????",
          districts: {
            "830501": "?????????",
            "830502": "??????",
            "830503": "??????",
            "830504": "??????",
            "830505": "?????????",
            "830506": "?????????",
            "830507": "?????????",
            "830508": "?????????",
            "830509": "?????????",
            "830510": "?????????",
            "830511": "?????????",
            "830512": "?????????",
            "830513": "?????????",
            "830514": "?????????",
            "830515": "?????????",
            "830516": "?????????",
            "830517": "?????????",
            "830518": "?????????",
            "830519": "?????????",
            "830520": "?????????",
            "830521": "?????????",
            "830522": "?????????",
            "830523": "?????????",
            "830524": "?????????",
            "830525": "?????????",
            "830526": "?????????",
            "830527": "?????????",
            "830528": "?????????",
            "830529": "?????????",
            "830530": "?????????",
            "830531": "?????????",
            "830532": "?????????",
            "830533": "?????????",
            "830534": "?????????",
            "830535": "?????????",
            "830536": "?????????",
            "830537": "?????????" } },


        "830600": {
          code: "830600",
          name: "?????????",
          districts: {
            "830601": "?????????",
            "830602": "?????????",
            "830603": "?????????",
            "830604": "?????????",
            "830605": "?????????",
            "830606": "?????????",
            "830607": "?????????",
            "830608": "?????????",
            "830609": "?????????",
            "830610": "?????????",
            "830611": "?????????",
            "830612": "?????????",
            "830613": "?????????",
            "830614": "?????????",
            "830615": "?????????",
            "830616": "?????????",
            "830617": "?????????",
            "830618": "?????????",
            "830619": "?????????",
            "830620": "?????????",
            "830621": "?????????",
            "830622": "?????????",
            "830623": "?????????",
            "830624": "?????????",
            "830625": "?????????",
            "830626": "?????????",
            "830627": "?????????",
            "830628": "?????????",
            "830629": "?????????",
            "830630": "?????????",
            "830631": "?????????",
            "830632": "?????????",
            "830633": "?????????",
            "830634": "?????????",
            "830635": "?????????",
            "830636": "?????????",
            "830637": "????????????" } },


        "830700": {
          code: "830700",
          name: "?????????",
          districts: {
            "830701": "?????????",
            "830702": "?????????",
            "830703": "?????????",
            "830704": "?????????",
            "830705": "?????????",
            "830706": "?????????",
            "830707": "?????????" } },


        "830800": {
          code: "830800",
          name: "?????????",
          districts: {
            "830801": "??????",
            "830802": "??????",
            "830803": "?????????" } },


        "830900": {
          code: "830900",
          name: "?????????",
          districts: {
            "830901": "??????",
            "830902": "??????" } } } } };






  var REGION = ['??????', '??????', '??????', '??????', '??????', '??????', '??????'];
  var areas = location;
  // ???????????????????????????
  var region = function region() {
    return pick(REGION);
  };
  // ????????????????????????????????????????????????????????????????????????????????????
  var province = function province() {
    return pickMap(areas).name;
  };
  /**
      * ????????????????????????????????????
      * @param prefix ??????????????????
      */
  var city = function city(prefix) {
    if (prefix === void 0) {prefix = false;}
    var province = pickMap(areas);
    var city = pickMap(province.cities);
    return prefix ? [province.name, city.name].join(' ') : city.name;
  };
  /**
      * ????????????????????????????????????
      * @param prefix ????????????/?????????
      */
  var county = function county(prefix) {
    if (prefix === void 0) {prefix = false;}
    // ????????????????????????
    // https://baike.baidu.com/item/%E7%9B%B4%E7%AD%92%E5%AD%90%E5%B8%82
    var specialCity = ['460400', '441900', '442000', '620200'];
    var province = pickMap(areas);
    var city = pickMap(province.cities);
    /* istanbul ignore next */
    if (specialCity.indexOf(city.code) !== -1) {
      return county(prefix);
    }
    var district = pickMap(city.districts) || '-';
    return prefix ? [province.name, city.name, district].join(' ') : district;
  };
  /**
      * ???????????????????????????????????????6???????????????
      * @param len
      */
  var zip = function zip(len) {
    if (len === void 0) {len = 6;}
    var zip = '';
    for (var i = 0; i < len; i++) {
      zip += natural(0, 9);
    }
    return zip;
  };

  var address = /*#__PURE__*/Object.freeze({
    region: region,
    province: province,
    city: city,
    county: county,
    zip: zip });


  // Miscellaneous
  var areas$1 = location;
  // ?????????????????? guid
  // http://www.broofa.com/2008/09/javascript-uuid-function/
  var guid = function guid() {
    var pool = 'abcdefABCDEF1234567890';
    return string(pool, 8) + '-' + string(pool, 4) + '-' + string(pool, 4) + '-' + string(pool, 4) + '-' + string(pool, 12);
  };
  var uuid = guid;
  // ?????????????????? 18 ???????????????
  // http://baike.baidu.com/view/1697.htm#4
  // [?????????](http://baike.baidu.com/view/1697.htm#4)
  // ????????? 6 + ??????????????? 8 + ????????? 3 + ????????? 1
  // [?????????????????????????????????????????????????????????(GB/T2260)](http://zhidao.baidu.com/question/1954561.html)
  var id = function id() {
    var _id;
    var _sum = 0;
    var rank = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'];
    var last = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    // ????????????????????????
    // https://baike.baidu.com/item/%E7%9B%B4%E7%AD%92%E5%AD%90%E5%B8%82
    var specialCity = ['460400', '441900', '442000', '620200'];
    var province = pickMap(areas$1);
    var city = pickMap(province.cities);
    /* istanbul ignore next */
    if (specialCity.indexOf(city.code) !== -1) {
      return id();
    }
    var districts = city.districts;
    var district = pick(keys(districts));
    _id = district + date('yyyyMMdd') + string('number', 3);
    for (var i = 0; i < _id.length; i++) {
      _sum += _id[i] * Number(rank[i]);
    }
    _id += last[_sum % 11];
    return _id;
  };
  // ????????????????????????????????????
  // ?????????????????????auto increment primary key??????
  var key = 0;
  var increment = function increment(step) {
    return key += Number(step) || 1; // step?
  };
  var inc = increment;
  /**
                        * ???????????????????????????
                        * @param depth ??????????????????????????????3
                        */
  var version = function version(depth) {
    if (depth === void 0) {depth = 3;}
    var numbers = [];
    for (var i = 0; i < depth; i++) {
      numbers.push(natural(0, 10));
    }
    return numbers.join('.');
  };
  // ?????????????????????????????????
  var phone = function phone() {
    var segments = [
    // ????????????
    '134', '135', '136', '137', '138', '139', '147', '150', '151', '152', '157', '158', '159', '165', '172', '178', '182', '183', '184', '187', '188',
    // ????????????
    '130', '131', '132', '145', '155', '156', '171', '175', '176', '185', '186',
    // ????????????
    '133', '149', '153', '173', '174', '177', '180', '181', '189', '191'];

    return pick(segments) + string('number', 8);
  };

  var misc = /*#__PURE__*/Object.freeze({
    guid: guid,
    uuid: uuid,
    id: id,
    increment: increment,
    inc: inc,
    version: version,
    phone: phone });


  var random = _assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign(_assign({ extend: extendFunc }, basic), date$1), image$1), color$1), text), name$1), web), address), helper), misc);
  function extendFunc(source) {
    if (isObject(source)) {
      for (var key in source) {
        random[key] = source[key];
      }
    }
  }

  // ??????????????????????????????????????????
  var parse = function parse(name) {
    name = name === undefined ? '' : name + '';
    var parameters = name.match(constant.RE_KEY);
    // name|min-max, name|count
    var range = parameters && parameters[3] && parameters[3].match(constant.RE_RANGE);
    var min = range && range[1] && parseInt(range[1], 10);
    var max = range && range[2] && parseInt(range[2], 10);
    // ????????? min-max, ?????? min-max ??????????????????
    // ????????? count, ?????? count
    var count = range ?
    range[2] ?
    random.integer(Number(min), Number(max)) :
    parseInt(range[1], 10) :
    undefined;
    var decimal = parameters && parameters[4] && parameters[4].match(constant.RE_RANGE);
    var dmin = decimal && decimal[1] && parseInt(decimal[1], 10);
    var dmax = decimal && decimal[2] && parseInt(decimal[2], 10);
    // int || dmin-dmax
    var dcount = decimal ?
    decimal[2] ?
    random.integer(Number(dmin), Number(dmax)) :
    parseInt(decimal[1], 10) :
    undefined;
    var result = {
      // 1 name, 2 inc, 3 range, 4 decimal
      parameters: parameters,
      // 1 min, 2 max
      range: range,
      min: min,
      max: max,
      count: count,
      decimal: decimal,
      dmin: dmin,
      dmax: dmax,
      dcount: dcount };

    for (var r in result) {
      if (result[r] != undefined) {
        return result;
      }
    }
    return {};
  };

  var number = Number;
  var boolean$1 = Boolean;
  var string$1 = String;
  var transfer = {
    number: number,
    boolean: boolean$1,
    string: string$1,
    extend: extend };

  function extend(source) {
    if (isObject(source)) {
      for (var key in source) {
        transfer[key] = source[key];
      }
    }
  }

  // ## RegExp Handler
  // ASCII printable code chart
  var LOWER = ascii(97, 122);
  var UPPER = ascii(65, 90);
  var NUMBER = ascii(48, 57);
  var OTHER = ascii(32, 47) + ascii(58, 64) + ascii(91, 96) + ascii(123, 126); // ?????? 95 _ ascii(91, 94) + ascii(96, 96)
  var PRINTABLE = ascii(32, 126);
  var SPACE = " \f\n\r\t\x0B\xA0\u2028\u2029";
  var CHARACTER_CLASSES = {
    '\\w': LOWER + UPPER + NUMBER + '_',
    '\\W': OTHER.replace('_', ''), '\\s': SPACE, '\\S': function () {
      var result = PRINTABLE;
      for (var i = 0; i < SPACE.length; i++) {
        result = result.replace(SPACE[i], '');
      }
      return result;
    }(), '\\d': NUMBER, '\\D': LOWER + UPPER + OTHER };

  function ascii(from, to) {
    var result = '';
    for (var i = from; i <= to; i++) {
      result += String.fromCharCode(i);
    }
    return result;
  }
  var handler = {
    // var ast = RegExpParser.parse(regexp.source)
    gen: function gen(node, result, cache) {
      cache = cache || {
        guid: 1 };

      return handler[node.type] ? handler[node.type](node, result, cache) : handler.token(node);
    },
    token: /* istanbul ignore next */function token(node) {
      switch (node.type) {
        case 'start':
        case 'end':
          return '';
        case 'any-character':
          return random.character();
        case 'backspace':
          return '';
        case 'word-boundary': // TODO
          return '';
        case 'non-word-boundary': // TODO
          break;
        case 'digit':
          return random.pick(NUMBER.split(''));
        case 'non-digit':
          return random.pick((LOWER + UPPER + OTHER).split(''));
        case 'form-feed':
          break;
        case 'line-feed':
          return node.body || node.text;
        case 'carriage-return':
          break;
        case 'white-space':
          return random.pick(SPACE.split(''));
        case 'non-white-space':
          return random.pick((LOWER + UPPER + NUMBER).split(''));
        case 'tab':
          break;
        case 'vertical-tab':
          break;
        case 'word': // \w [a-zA-Z0-9]
          return random.pick((LOWER + UPPER + NUMBER).split(''));
        case 'non-word': // \W [^a-zA-Z0-9]
          return random.pick(OTHER.replace('_', '').split(''));
        case 'null-character':
          break;}

      return node.body || node.text;
    },
    // {
    //   type: 'alternate',
    //   offset: 0,
    //   text: '',
    //   left: {
    //     boyd: []
    //   },
    //   right: {
    //     boyd: []
    //   }
    // }
    alternate: function alternate(node, result, cache) {
      // node.left/right {}
      return handler.gen(random.boolean() ? node.left : node.right, result, cache);
    },
    // {
    //   type: 'match',
    //   offset: 0,
    //   text: '',
    //   body: []
    // }
    match: function match(node, result, cache) {
      result = '';
      // node.body []
      for (var i = 0; i < node.body.length; i++) {
        result += handler.gen(node.body[i], result, cache);
      }
      return result;
    },
    // ()
    'capture-group': function captureGroup(node, result, cache) {
      // node.body {}
      result = handler.gen(node.body, result, cache);
      cache[cache.guid++] = result;
      return result;
    },
    // (?:...)
    'non-capture-group': function nonCaptureGroup(node, result, cache) {
      // node.body {}
      return handler.gen(node.body, result, cache);
    },
    // (?=p)
    'positive-lookahead': function positiveLookahead(node, result, cache) {
      // node.body
      return handler.gen(node.body, result, cache);
    },
    // (?!p)
    'negative-lookahead': function negativeLookahead() {
      // node.body
      return '';
    },
    // {
    //   type: 'quantified',
    //   offset: 3,
    //   text: 'c*',
    //   body: {
    //     type: 'literal',
    //     offset: 3,
    //     text: 'c',
    //     body: 'c',
    //     escaped: false
    //   },
    //   quantifier: {
    //     type: 'quantifier',
    //     offset: 4,
    //     text: '*',
    //     min: 0,
    //     max: Infinity,
    //     greedy: true
    //   }
    // }
    quantified: function quantified(node, result, cache) {
      result = '';
      // node.quantifier {}
      var count = handler.quantifier(node.quantifier);
      // node.body {}
      for (var i = 0; i < count; i++) {
        result += handler.gen(node.body, result, cache);
      }
      return result;
    },
    // quantifier: {
    //   type: 'quantifier',
    //   offset: 4,
    //   text: '*',
    //   min: 0,
    //   max: Infinity,
    //   greedy: true
    // }
    quantifier: function quantifier(node) {
      var min = Math.max(node.min, 0);
      var max = isFinite(node.max) ? node.max : min + random.integer(3, 7);
      return random.integer(min, max);
    },
    charset: function charset(node, result, cache) {
      // node.invert
      if (node.invert) {
        return handler['invert-charset'](node, result, cache);
      }
      // node.body []
      var literal = random.pick(node.body);
      return handler.gen(literal, result, cache);
    },
    'invert-charset': function invertCharset(node, result, cache) {
      var pool = PRINTABLE;
      var item;
      for (var i = 0; i < node.body.length; i++) {
        item = node.body[i];
        switch (item.type) {
          case 'literal':
            pool = pool.replace(item.body, '');
            break;
          case 'range':
            var min = handler.gen(item.start, result, cache).charCodeAt();
            var max = handler.gen(item.end, result, cache).charCodeAt();
            for (var ii = min; ii <= max; ii++) {
              pool = pool.replace(String.fromCharCode(ii), '');
            }
          /* falls through */
          default:
            var characters = CHARACTER_CLASSES[item.text];
            if (characters) {
              for (var iii = 0; iii <= characters.length; iii++) {
                pool = pool.replace(characters[iii], '');
              }
            }}

      }
      return random.pick(pool.split(''));
    },
    range: function range(node, result, cache) {
      // node.start, node.end
      var min = handler.gen(node.start, result, cache).charCodeAt();
      var max = handler.gen(node.end, result, cache).charCodeAt();
      return String.fromCharCode(random.integer(min, max));
    },
    literal: function literal(node) {
      return node.escaped ? node.body : node.text;
    },
    // Unicode \u
    unicode: function unicode(node) {
      return String.fromCharCode(parseInt(node.code, 16));
    },
    // ???????????? \xFF
    hex: function hex(node) {
      return String.fromCharCode(parseInt(node.code, 16));
    },
    octal: function octal(node) {
      return String.fromCharCode(parseInt(node.code, 8));
    },
    // ????????????
    'back-reference': function backReference(node, result, cache) {
      return cache[node.code] || '';
    },
    // http://en.wikipedia.org/wiki/C0_and_C1_control_codes
    CONTROL_CHARACTER_MAP: function () {
      var CONTROL_CHARACTER = '@ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _'.split(' ');
      var CONTROL_CHARACTER_UNICODE = "\0 \x01 \x02 \x03 \x04 \x05 \x06 \x07 \b \t \n \x0B \f \r \x0E \x0F \x10 \x11 \x12 \x13 \x14 \x15 \x16 \x17 \x18 \x19 \x1A \x1B \x1C \x1D \x1E \x1F".split(' ');
      var map = {};
      for (var i = 0; i < CONTROL_CHARACTER.length; i++) {
        map[CONTROL_CHARACTER[i]] = CONTROL_CHARACTER_UNICODE[i];
      }
      return map;
    }(),
    'control-character': function controlCharacter(node) {
      return this.CONTROL_CHARACTER_MAP[node.code];
    } };


  // https://github.com/nuysoft/regexp
  // forked from https://github.com/ForbesLindesay/regexp
  function Token(n) {
    this.type = n, this.offset = Token.offset(), this.text = Token.text();
  }

  function Alternate(n, l) {
    Token.call(this, 'alternate'), this.left = n, this.right = l;
  }

  function Match(n) {
    Token.call(this, 'match'), this.body = n.filter(Boolean);
  }

  function Group(n, l) {
    Token.call(this, n), this.body = l;
  }

  function CaptureGroup(n) {
    Group.call(this, 'capture-group'), this.index = cgs[this.offset] || (cgs[this.offset] = index++),
    this.body = n;
  }

  function Quantified(n, l) {
    Token.call(this, 'quantified'), this.body = n, this.quantifier = l;
  }

  function Quantifier(n, l) {
    Token.call(this, 'quantifier'), this.min = n, this.max = l, this.greedy = !0;
  }

  function CharSet(n, l) {
    Token.call(this, 'charset'), this.invert = n, this.body = l;
  }

  function CharacterRange(n, l) {
    Token.call(this, 'range'), this.start = n, this.end = l;
  }

  function Literal(n) {
    Token.call(this, 'literal'), this.body = n, this.escaped = this.body != this.text;
  }

  function Unicode(n) {
    Token.call(this, 'unicode'), this.code = n.toUpperCase();
  }

  function Hex(n) {
    Token.call(this, 'hex'), this.code = n.toUpperCase();
  }

  function Octal(n) {
    Token.call(this, 'octal'), this.code = n.toUpperCase();
  }

  function BackReference(n) {
    Token.call(this, 'back-reference'), this.code = n.toUpperCase();
  }

  function ControlCharacter(n) {
    Token.call(this, 'control-character'), this.code = n.toUpperCase();
  }

  /* istanbul ignore next */
  var parser = function () {
    function n(n, l) {
      function u() {
        this.constructor = n;
      }

      u.prototype = l.prototype, n.prototype = new u();
    }

    function l(n, l, u, t, r) {
      function e(n, l) {
        function u(n) {
          function l(n) {
            return n.charCodeAt(0).toString(16).toUpperCase();
          }

          return n.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (n) {
            return '\\x0' + l(n);
          }).replace(/[\x10-\x1F\x80-\xFF]/g, function (n) {
            return '\\x' + l(n);
          }).replace(/[\u0180-\u0FFF]/g, function (n) {
            return "\\u0" + l(n);
          }).replace(/[\u1080-\uFFFF]/g, function (n) {
            return "\\u" + l(n);
          });
        }

        var t, r;
        switch (n.length) {
          case 0:
            t = 'end of input';
            break;

          case 1:
            t = n[0];
            break;

          default:
            t = n.slice(0, -1).join(', ') + ' or ' + n[n.length - 1];}

        return r = l ? '"' + u(l) + '"' : 'end of input', 'Expected ' + t + ' but ' + r + ' found.';
      }

      this.expected = n, this.found = l, this.offset = u, this.line = t, this.column = r,
      this.name = 'SyntaxError', this.message = e(n, l);
    }

    function u(n) {
      function u() {
        return n.substring(Lt, qt);
      }

      function t() {
        return Lt;
      }

      function r(l) {
        function u(l, u, t) {
          var r, e;
          for (r = u; t > r; r++) {e = n.charAt(r), '\n' === e ? (l.seenCR || l.line++, l.column = 1,
            l.seenCR = !1) : '\r' === e || "\u2028" === e || "\u2029" === e ? (l.line++, l.column = 1,
            l.seenCR = !0) : (l.column++, l.seenCR = !1);}
        }

        return Mt !== l && (Mt > l && (Mt = 0, Dt = {
          line: 1,
          column: 1,
          seenCR: !1 }),
        u(Dt, Mt, l), Mt = l), Dt;
      }

      function e(n) {
        Ht > qt || (qt > Ht && (Ht = qt, Ot = []), Ot.push(n));
      }

      function o(n) {
        var l = 0;
        for (n.sort(); l < n.length;) {n[l - 1] === n[l] ? n.splice(l, 1) : l++;}
      }

      function c() {
        var l, u, t, r, o;
        return l = qt, u = i(), null !== u ? (t = qt, 124 === n.charCodeAt(qt) ? (r = fl,
        qt++) : (r = null, 0 === Wt && e(sl)), null !== r ? (o = c(), null !== o ? (r = [r, o],
        t = r) : (qt = t, t = il)) : (qt = t, t = il), null === t && (t = al), null !== t ? (Lt = l,
        u = hl(u, t), null === u ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l,
        l = il), l;
      }

      function i() {
        var n, l, u, t, r;
        if (n = qt, l = f(), null === l && (l = al), null !== l) {if (u = qt, Wt++, t = d(),
          Wt--, null === t ? u = al : (qt = u, u = il), null !== u) {
            for (t = [], r = h(), null === r && (r = a()); null !== r;) {t.push(r), r = h(),
              null === r && (r = a());}
            null !== t ? (r = s(), null === r && (r = al), null !== r ? (Lt = n, l = dl(l, t, r),
            null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il);
          } else qt = n, n = il;} else qt = n, n = il;
        return n;
      }

      function a() {
        var n;
        return n = x(), null === n && (n = Q(), null === n && (n = B())), n;
      }

      function f() {
        var l, u;
        return l = qt, 94 === n.charCodeAt(qt) ? (u = pl, qt++) : (u = null, 0 === Wt && e(vl)),
        null !== u && (Lt = l, u = wl()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function s() {
        var l, u;
        return l = qt, 36 === n.charCodeAt(qt) ? (u = Al, qt++) : (u = null, 0 === Wt && e(Cl)),
        null !== u && (Lt = l, u = gl()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function h() {
        var n, l, u;
        return n = qt, l = a(), null !== l ? (u = d(), null !== u ? (Lt = n, l = bl(l, u),
        null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il), n;
      }

      function d() {
        var n, l, u;
        return Wt++, n = qt, l = p(), null !== l ? (u = k(), null === u && (u = al), null !== u ? (Lt = n,
        l = Tl(l, u), null === l ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n,
        n = il), Wt--, null === n && (l = null, 0 === Wt && e(kl)), n;
      }

      function p() {
        var n;
        return n = v(), null === n && (n = w(), null === n && (n = A(), null === n && (n = C(),
        null === n && (n = g(), null === n && (n = b()))))), n;
      }

      function v() {
        var l, u, t, r, o, c;
        return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)),
        null !== u ? (t = T(), null !== t ? (44 === n.charCodeAt(qt) ? (r = ml, qt++) : (r = null,
        0 === Wt && e(Rl)), null !== r ? (o = T(), null !== o ? (125 === n.charCodeAt(qt) ? (c = Fl,
        qt++) : (c = null, 0 === Wt && e(Ql)), null !== c ? (Lt = l, u = Sl(t, o), null === u ? (qt = l,
        l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l,
        l = il)) : (qt = l, l = il), l;
      }

      function w() {
        var l, u, t, r;
        return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)),
        null !== u ? (t = T(), null !== t ? (n.substr(qt, 2) === Ul ? (r = Ul, qt += 2) : (r = null,
        0 === Wt && e(El)), null !== r ? (Lt = l, u = Gl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
      }

      function A() {
        var l, u, t, r;
        return l = qt, 123 === n.charCodeAt(qt) ? (u = xl, qt++) : (u = null, 0 === Wt && e(yl)),
        null !== u ? (t = T(), null !== t ? (125 === n.charCodeAt(qt) ? (r = Fl, qt++) : (r = null,
        0 === Wt && e(Ql)), null !== r ? (Lt = l, u = Bl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
      }

      function C() {
        var l, u;
        return l = qt, 43 === n.charCodeAt(qt) ? (u = jl, qt++) : (u = null, 0 === Wt && e($l)),
        null !== u && (Lt = l, u = ql()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function g() {
        var l, u;
        return l = qt, 42 === n.charCodeAt(qt) ? (u = Ll, qt++) : (u = null, 0 === Wt && e(Ml)),
        null !== u && (Lt = l, u = Dl()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function b() {
        var l, u;
        return l = qt, 63 === n.charCodeAt(qt) ? (u = Hl, qt++) : (u = null, 0 === Wt && e(Ol)),
        null !== u && (Lt = l, u = Wl()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function k() {
        var l;
        return 63 === n.charCodeAt(qt) ? (l = Hl, qt++) : (l = null, 0 === Wt && e(Ol)),
        l;
      }

      function T() {
        var l, u, t;
        if (l = qt, u = [], zl.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null,
        0 === Wt && e(Il)), null !== t) for (; null !== t;) {u.push(t), zl.test(n.charAt(qt)) ? (t = n.charAt(qt),
          qt++) : (t = null, 0 === Wt && e(Il));} else u = il;
        return null !== u && (Lt = l, u = Jl(u)), null === u ? (qt = l, l = u) : l = u,
        l;
      }

      function x() {
        var l, u, t, r;
        return l = qt, 40 === n.charCodeAt(qt) ? (u = Kl, qt++) : (u = null, 0 === Wt && e(Nl)),
        null !== u ? (t = R(), null === t && (t = F(), null === t && (t = m(), null === t && (t = y()))),
        null !== t ? (41 === n.charCodeAt(qt) ? (r = Pl, qt++) : (r = null, 0 === Wt && e(Vl)),
        null !== r ? (Lt = l, u = Xl(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il)) : (qt = l, l = il), l;
      }

      function y() {
        var n, l;
        return n = qt, l = c(), null !== l && (Lt = n, l = Yl(l)), null === l ? (qt = n,
        n = l) : n = l, n;
      }

      function m() {
        var l, u, t;
        return l = qt, n.substr(qt, 2) === Zl ? (u = Zl, qt += 2) : (u = null, 0 === Wt && e(_l)),
        null !== u ? (t = c(), null !== t ? (Lt = l, u = nu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il), l;
      }

      function R() {
        var l, u, t;
        return l = qt, n.substr(qt, 2) === lu ? (u = lu, qt += 2) : (u = null, 0 === Wt && e(uu)),
        null !== u ? (t = c(), null !== t ? (Lt = l, u = tu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il), l;
      }

      function F() {
        var l, u, t;
        return l = qt, n.substr(qt, 2) === ru ? (u = ru, qt += 2) : (u = null, 0 === Wt && e(eu)),
        null !== u ? (t = c(), null !== t ? (Lt = l, u = ou(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il), l;
      }

      function Q() {
        var l, u, t, r, o;
        if (Wt++, l = qt, 91 === n.charCodeAt(qt) ? (u = iu, qt++) : (u = null, 0 === Wt && e(au)),
        null !== u) {if (94 === n.charCodeAt(qt) ? (t = pl, qt++) : (t = null, 0 === Wt && e(vl)),
          null === t && (t = al), null !== t) {
            for (r = [], o = S(), null === o && (o = U()); null !== o;) {r.push(o), o = S(),
              null === o && (o = U());}
            null !== r ? (93 === n.charCodeAt(qt) ? (o = fu, qt++) : (o = null, 0 === Wt && e(su)),
            null !== o ? (Lt = l, u = hu(t, r), null === u ? (qt = l, l = u) : l = u) : (qt = l,
            l = il)) : (qt = l, l = il);
          } else qt = l, l = il;} else qt = l, l = il;
        return Wt--, null === l && (u = null, 0 === Wt && e(cu)), l;
      }

      function S() {
        var l, u, t, r;
        return Wt++, l = qt, u = U(), null !== u ? (45 === n.charCodeAt(qt) ? (t = pu, qt++) : (t = null,
        0 === Wt && e(vu)), null !== t ? (r = U(), null !== r ? (Lt = l, u = wu(u, r), null === u ? (qt = l,
        l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il), Wt--,
        null === l && (u = null, 0 === Wt && e(du)), l;
      }

      function U() {
        var n;
        return Wt++, n = G(), null === n && (n = E()), Wt--, null === n && 0 === Wt && e(Au),
        n;
      }

      function E() {
        var l, u;
        return l = qt, Cu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null, 0 === Wt && e(gu)),
        null !== u && (Lt = l, u = bu(u)), null === u ? (qt = l, l = u) : l = u, l;
      }

      function G() {
        var n;
        return n = L(), null === n && (n = Y(), null === n && (n = H(), null === n && (n = O(),
        null === n && (n = W(), null === n && (n = z(), null === n && (n = I(), null === n && (n = J(),
        null === n && (n = K(), null === n && (n = N(), null === n && (n = P(), null === n && (n = V(),
        null === n && (n = X(), null === n && (n = _(), null === n && (n = nl(), null === n && (n = ll(),
        null === n && (n = ul(), null === n && (n = tl()))))))))))))))))), n;
      }

      function B() {
        var n;
        return n = j(), null === n && (n = q(), null === n && (n = $())), n;
      }

      function j() {
        var l, u;
        return l = qt, 46 === n.charCodeAt(qt) ? (u = ku, qt++) : (u = null, 0 === Wt && e(Tu)),
        null !== u && (Lt = l, u = xu()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function $() {
        var l, u;
        return Wt++, l = qt, mu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null,
        0 === Wt && e(Ru)), null !== u && (Lt = l, u = bu(u)), null === u ? (qt = l, l = u) : l = u,
        Wt--, null === l && (u = null, 0 === Wt && e(yu)), l;
      }

      function q() {
        var n;
        return n = M(), null === n && (n = D(), null === n && (n = Y(), null === n && (n = H(),
        null === n && (n = O(), null === n && (n = W(), null === n && (n = z(), null === n && (n = I(),
        null === n && (n = J(), null === n && (n = K(), null === n && (n = N(), null === n && (n = P(),
        null === n && (n = V(), null === n && (n = X(), null === n && (n = Z(), null === n && (n = _(),
        null === n && (n = nl(), null === n && (n = ll(), null === n && (n = ul(), null === n && (n = tl()))))))))))))))))))),
        n;
      }

      function L() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, 0 === Wt && e(Qu)),
        null !== u && (Lt = l, u = Su()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function M() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, 0 === Wt && e(Qu)),
        null !== u && (Lt = l, u = Uu()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function D() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Eu ? (u = Eu, qt += 2) : (u = null, 0 === Wt && e(Gu)),
        null !== u && (Lt = l, u = Bu()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function H() {
        var l, u;
        return l = qt, n.substr(qt, 2) === ju ? (u = ju, qt += 2) : (u = null, 0 === Wt && e($u)),
        null !== u && (Lt = l, u = qu()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function O() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Lu ? (u = Lu, qt += 2) : (u = null, 0 === Wt && e(Mu)),
        null !== u && (Lt = l, u = Du()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function W() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Hu ? (u = Hu, qt += 2) : (u = null, 0 === Wt && e(Ou)),
        null !== u && (Lt = l, u = Wu()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function z() {
        var l, u;
        return l = qt, n.substr(qt, 2) === zu ? (u = zu, qt += 2) : (u = null, 0 === Wt && e(Iu)),
        null !== u && (Lt = l, u = Ju()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function I() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Ku ? (u = Ku, qt += 2) : (u = null, 0 === Wt && e(Nu)),
        null !== u && (Lt = l, u = Pu()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function J() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Vu ? (u = Vu, qt += 2) : (u = null, 0 === Wt && e(Xu)),
        null !== u && (Lt = l, u = Yu()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function K() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Zu ? (u = Zu, qt += 2) : (u = null, 0 === Wt && e(_u)),
        null !== u && (Lt = l, u = nt()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function N() {
        var l, u;
        return l = qt, n.substr(qt, 2) === lt ? (u = lt, qt += 2) : (u = null, 0 === Wt && e(ut)),
        null !== u && (Lt = l, u = tt()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function P() {
        var l, u;
        return l = qt, n.substr(qt, 2) === rt ? (u = rt, qt += 2) : (u = null, 0 === Wt && e(et)),
        null !== u && (Lt = l, u = ot()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function V() {
        var l, u;
        return l = qt, n.substr(qt, 2) === ct ? (u = ct, qt += 2) : (u = null, 0 === Wt && e(it)),
        null !== u && (Lt = l, u = at()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function X() {
        var l, u;
        return l = qt, n.substr(qt, 2) === ft ? (u = ft, qt += 2) : (u = null, 0 === Wt && e(st)),
        null !== u && (Lt = l, u = ht()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function Y() {
        var l, u, t;
        return l = qt, n.substr(qt, 2) === dt ? (u = dt, qt += 2) : (u = null, 0 === Wt && e(pt)),
        null !== u ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(vt)),
        null !== t ? (Lt = l, u = wt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il), l;
      }

      function Z() {
        var l, u, t;
        return l = qt, 92 === n.charCodeAt(qt) ? (u = At, qt++) : (u = null, 0 === Wt && e(Ct)),
        null !== u ? (gt.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(bt)),
        null !== t ? (Lt = l, u = kt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il), l;
      }

      function _() {
        var l, u, t, r;
        if (l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, 0 === Wt && e(xt)),
        null !== u) {
          if (t = [], yt.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(mt)),
          null !== r) for (; null !== r;) {t.push(r), yt.test(n.charAt(qt)) ? (r = n.charAt(qt),
            qt++) : (r = null, 0 === Wt && e(mt));} else t = il;
          null !== t ? (Lt = l, u = Rt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
          l = il);
        } else qt = l, l = il;
        return l;
      }

      function nl() {
        var l, u, t, r;
        if (l = qt, n.substr(qt, 2) === Ft ? (u = Ft, qt += 2) : (u = null, 0 === Wt && e(Qt)),
        null !== u) {
          if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(Ut)),
          null !== r) for (; null !== r;) {t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt),
            qt++) : (r = null, 0 === Wt && e(Ut));} else t = il;
          null !== t ? (Lt = l, u = Et(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
          l = il);
        } else qt = l, l = il;
        return l;
      }

      function ll() {
        var l, u, t, r;
        if (l = qt, n.substr(qt, 2) === Gt ? (u = Gt, qt += 2) : (u = null, 0 === Wt && e(Bt)),
        null !== u) {
          if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, 0 === Wt && e(Ut)),
          null !== r) for (; null !== r;) {t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt),
            qt++) : (r = null, 0 === Wt && e(Ut));} else t = il;
          null !== t ? (Lt = l, u = jt(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
          l = il);
        } else qt = l, l = il;
        return l;
      }

      function ul() {
        var l, u;
        return l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, 0 === Wt && e(xt)),
        null !== u && (Lt = l, u = $t()), null === u ? (qt = l, l = u) : l = u, l;
      }

      function tl() {
        var l, u, t;
        return l = qt, 92 === n.charCodeAt(qt) ? (u = At, qt++) : (u = null, 0 === Wt && e(Ct)),
        null !== u ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, 0 === Wt && e(vt)),
        null !== t ? (Lt = l, u = bu(t), null === u ? (qt = l, l = u) : l = u) : (qt = l,
        l = il)) : (qt = l, l = il), l;
      }
      var rl,el = arguments.length > 1 ? arguments[1] : {},ol = {
        regexp: c },
      cl = c,il = null,al = '',fl = '|',sl = '"|"',hl = function hl(n, l) {
        return l ? new Alternate(n, l[1]) : n;
      },dl = function dl(n, l, u) {
        return new Match([n].concat(l).concat([u]));
      },pl = '^',vl = '"^"',wl = function wl() {
        return new Token('start');
      },Al = '$',Cl = '"$"',gl = function gl() {
        return new Token('end');
      },bl = function bl(n, l) {
        return new Quantified(n, l);
      },kl = 'Quantifier',Tl = function Tl(n, l) {
        return l && (n.greedy = !1), n;
      },xl = '{',yl = '"{"',ml = ',',Rl = '","',Fl = '}',Ql = '"}"',Sl = function Sl(n, l) {
        return new Quantifier(n, l);
      },Ul = ',}',El = '",}"',Gl = function Gl(n) {
        return new Quantifier(n, 1 / 0);
      },Bl = function Bl(n) {
        return new Quantifier(n, n);
      },jl = '+',$l = '"+"',ql = function ql() {
        return new Quantifier(1, 1 / 0);
      },Ll = '*',Ml = '"*"',Dl = function Dl() {
        return new Quantifier(0, 1 / 0);
      },Hl = '?',Ol = '"?"',Wl = function Wl() {
        return new Quantifier(0, 1);
      },zl = /^[0-9]/,Il = '[0-9]',Jl = function Jl(n) {
        return +n.join('');
      },Kl = '(',Nl = '"("',Pl = ')',Vl = '")"',Xl = function Xl(n) {
        return n;
      },Yl = function Yl(n) {
        return new CaptureGroup(n);
      },Zl = '?:',_l = '"?:"',nu = function nu(n) {
        return new Group('non-capture-group', n);
      },lu = '?=',uu = '"?="',tu = function tu(n) {
        return new Group('positive-lookahead', n);
      },ru = '?!',eu = '"?!"',ou = function ou(n) {
        return new Group('negative-lookahead', n);
      },cu = 'CharacterSet',iu = '[',au = '"["',fu = ']',su = '"]"',hu = function hu(n, l) {
        return new CharSet(!!n, l);
      },du = 'CharacterRange',pu = '-',vu = '"-"',wu = function wu(n, l) {
        return new CharacterRange(n, l);
      },Au = 'Character',Cu = /^[^\\\]]/,gu = '[^\\\\\\]]',bu = function bu(n) {
        return new Literal(n);
      },ku = '.',Tu = '"."',xu = function xu() {
        return new Token('any-character');
      },yu = 'Literal',mu = /^[^|\\\/.[()?+*$\^]/,Ru = '[^|\\\\\\/.[()?+*$\\^]',Fu = '\\b',Qu = '"\\\\b"',
      Su = function Su() {
        return new Token('backspace');
      },Uu = function Uu() {
        return new Token('word-boundary');
      },Eu = '\\B',Gu = '"\\\\B"',Bu = function Bu() {
        return new Token('non-word-boundary');
      },ju = '\\d',$u = '"\\\\d"',qu = function qu() {
        return new Token('digit');
      },Lu = '\\D',Mu = '"\\\\D"',Du = function Du() {
        return new Token('non-digit');
      },Hu = '\\f',Ou = '"\\\\f"',Wu = function Wu() {
        return new Token('form-feed');
      },zu = '\\n',Iu = '"\\\\n"',Ju = function Ju() {
        return new Token('line-feed');
      },Ku = '\\r',Nu = '"\\\\r"',Pu = function Pu() {
        return new Token('carriage-return');
      },Vu = '\\s',Xu = '"\\\\s"',Yu = function Yu() {
        return new Token('white-space');
      },Zu = '\\S',_u = '"\\\\S"',nt = function nt() {
        return new Token('non-white-space');
      },lt = '\\t',ut = '"\\\\t"',tt = function tt() {
        return new Token('tab');
      },rt = '\\v',et = '"\\\\v"',ot = function ot() {
        return new Token('vertical-tab');
      },ct = '\\w',it = '"\\\\w"',at = function at() {
        return new Token('word');
      },ft = '\\W',st = '"\\\\W"',ht = function ht() {
        return new Token('non-word');
      },dt = '\\c',pt = '"\\\\c"',vt = 'any character',wt = function wt(n) {
        return new ControlCharacter(n);
      },At = '\\',Ct = '"\\\\"',gt = /^[1-9]/,bt = '[1-9]',kt = function kt(n) {
        return new BackReference(n);
      },Tt = '\\0',xt = '"\\\\0"',yt = /^[0-7]/,mt = '[0-7]',Rt = function Rt(n) {
        return new Octal(n.join(''));
      },Ft = '\\x',Qt = '"\\\\x"',St = /^[0-9a-fA-F]/,Ut = '[0-9a-fA-F]',Et = function Et(n) {
        return new Hex(n.join(''));
      },Gt = "\\u",Bt = "\"\\\\u\"",jt = function jt(n) {
        return new Unicode(n.join(''));
      },$t = function $t() {
        return new Token('null-character');
      },qt = 0,Lt = 0,Mt = 0,Dt = {
        line: 1,
        column: 1,
        seenCR: !1 },
      Ht = 0,Ot = [],Wt = 0;
      if ('startRule' in el) {
        if (!(el.startRule in ol)) throw new Error('Can\'t start parsing from rule "' + el.startRule + '".');
        cl = ol[el.startRule];
      }
      if (Token.offset = t, Token.text = u, rl = cl(), null !== rl && qt === n.length) return rl;
      throw o(Ot), Lt = Math.max(qt, Ht), new l(Ot, Lt < n.length ? n.charAt(Lt) : null, Lt, r(Lt).line, r(Lt).column);
    }

    return n(l, Error), {
      SyntaxError: l,
      parse: u };

  }(),index = 1,cgs = {};

  var RE = {
    Parser: parser,
    Handler: handler };


  // ?????????????????????
  var handler$1 = {
    // template        ??????????????????????????????
    // name            ?????????
    // context         ????????????????????????????????????
    // templateContext ??????????????????
    //
    // Handle.gen(template, name, options)
    // context
    //     currentContext, templateCurrentContext,
    //     path, templatePath
    //     root, templateRoot
    gen: function gen(template, name, context) {
      name = name === undefined ? '' : name.toString();
      context = context || {};
      context = {
        // ????????????????????????????????????????????????????????????
        path: context.path || [constant.GUID],
        templatePath: context.templatePath || [constant.GUID++],
        currentContext: context.currentContext,
        templateCurrentContext: context.templateCurrentContext || template,
        root: context.root || context.currentContext,
        templateRoot: context.templateRoot || context.templateCurrentContext || template };

      var rule = parse(name);
      var type$1 = _type(template);
      var data;
      if (handler$1[type$1]) {
        data = handler$1[type$1]({
          type: type$1,
          template: template,
          name: name,
          rule: rule,
          context: context,
          parsedName: name ? name.replace(constant.RE_KEY, '$1') : name });

        if (!context.root) {
          context.root = data;
        }
        return data;
      }
      return template;
    },
    array: function array(options) {
      var result = [];
      // 'name|1': []
      // 'name|count': []
      // 'name|min-max': []
      if (options.template.length === 0)
      return result;
      // 'arr': [{ 'email': '@EMAIL' }, { 'email': '@EMAIL' }]
      if (!options.rule.parameters) {
        for (var i = 0; i < options.template.length; i++) {
          options.context.path.push(i);
          options.context.templatePath.push(i);
          result.push(handler$1.gen(options.template[i], i, {
            path: options.context.path,
            templatePath: options.context.templatePath,
            currentContext: result,
            templateCurrentContext: options.template,
            root: options.context.root || result,
            templateRoot: options.context.templateRoot || options.template }));

          options.context.path.pop();
          options.context.templatePath.pop();
        }
      } else
      {
        // 'method|1': ['GET', 'POST', 'HEAD', 'DELETE']
        if (options.rule.min === 1 && options.rule.max === undefined) {
          // fix Mock.js#17
          options.context.path.push(options.name);
          options.context.templatePath.push(options.name);
          result = random.pick(handler$1.gen(options.template, undefined, {
            path: options.context.path,
            templatePath: options.context.templatePath,
            currentContext: result,
            templateCurrentContext: options.template,
            root: options.context.root || result,
            templateRoot: options.context.templateRoot || options.template }));

          options.context.path.pop();
          options.context.templatePath.pop();
        } else
        {
          // 'data|+1': [{}, {}]
          if (options.rule.parameters[2]) {
            options.template.__order_index = options.template.__order_index || 0;
            options.context.path.push(options.name);
            options.context.templatePath.push(options.name);
            result = handler$1.gen(options.template, undefined, {
              path: options.context.path,
              templatePath: options.context.templatePath,
              currentContext: result,
              templateCurrentContext: options.template,
              root: options.context.root || result,
              templateRoot: options.context.templateRoot || options.template })[
            options.template.__order_index % options.template.length];
            options.template.__order_index += +options.rule.parameters[2];
            options.context.path.pop();
            options.context.templatePath.pop();
          } else
          if (options.rule.count) {
            // 'data|1-10': [{}]
            for (var i = 0; i < options.rule.count; i++) {
              // 'data|1-10': [{}, {}]
              for (var ii = 0; ii < options.template.length; ii++) {
                options.context.path.push(result.length);
                options.context.templatePath.push(ii);
                result.push(handler$1.gen(options.template[ii], result.length, {
                  path: options.context.path,
                  templatePath: options.context.templatePath,
                  currentContext: result,
                  templateCurrentContext: options.template,
                  root: options.context.root || result,
                  templateRoot: options.context.templateRoot || options.template }));

                options.context.path.pop();
                options.context.templatePath.pop();
              }
            }
          }
        }
      }
      return result;
    },
    object: function object(options) {
      var result = {};
      // 'obj|min-max': {}
      if (options.rule.min != undefined) {
        var keys$1 = keys(options.template);
        keys$1 = random.shuffle(keys$1);
        keys$1 = keys$1.slice(0, options.rule.count);
        for (var i = 0; i < keys$1.length; i++) {
          var key = keys$1[i];
          var parsedKey = key.replace(constant.RE_KEY, '$1');
          var transferTypeCtor = handler$1.getTransferTypeCtor(key);
          if (transferTypeCtor) {
            parsedKey = parsedKey.replace(constant.RE_TRANSFER_TYPE, '');
          }
          options.context.path.push(parsedKey);
          options.context.templatePath.push(key);
          var generatedValue = handler$1.gen(options.template[key], key, {
            path: options.context.path,
            templatePath: options.context.templatePath,
            currentContext: result,
            templateCurrentContext: options.template,
            root: options.context.root || result,
            templateRoot: options.context.templateRoot || options.template });

          result[parsedKey] = transferTypeCtor(generatedValue);
          options.context.path.pop();
          options.context.templatePath.pop();
        }
      } else
      {
        // 'obj': {}
        var keys$1 = [];
        var fnKeys = []; // Mock.js#25 ?????????????????????????????????????????????????????????
        for (var key in options.template) {
          var target = typeof options.template[key] === 'function' ? fnKeys : keys$1;
          target.push(key);
        }
        keys$1 = keys$1.concat(fnKeys);
        for (var i = 0; i < keys$1.length; i++) {
          var key = keys$1[i];
          var parsedKey = key.replace(constant.RE_KEY, '$1');
          var transferTypeCtor = handler$1.getTransferTypeCtor(key);
          if (transferTypeCtor) {
            parsedKey = parsedKey.replace(constant.RE_TRANSFER_TYPE, '');
          }
          options.context.path.push(parsedKey);
          options.context.templatePath.push(key);
          var generatedValue = handler$1.gen(options.template[key], key, {
            path: options.context.path,
            templatePath: options.context.templatePath,
            currentContext: result,
            templateCurrentContext: options.template,
            root: options.context.root || result,
            templateRoot: options.context.templateRoot || options.template });

          result[parsedKey] = transferTypeCtor(generatedValue);
          options.context.path.pop();
          options.context.templatePath.pop();
          // 'id|+1': 1
          var inc = key.match(constant.RE_KEY);
          if (inc && inc[2] && _type(options.template[key]) === 'number') {
            options.template[key] += parseInt(inc[2], 10);
          }
        }
      }
      return result;
    },
    number: function number(options) {
      var result;
      var parts;
      if (options.rule.decimal) {
        // float
        options.template += '';
        parts = options.template.split('.');
        // 'float1|.1-10': 10,
        // 'float2|1-100.1-10': 1,
        // 'float3|999.1-10': 1,
        // 'float4|.3-10': 123.123,
        parts[0] = options.rule.range ? options.rule.count : parts[0];
        parts[1] = (parts[1] || '').slice(0, options.rule.dcount);
        while (parts[1].length < options.rule.dcount) {
          // ????????????????????? 0???????????????????????? 0????????? JS ??????????????????
          parts[1] += parts[1].length < options.rule.dcount - 1 ?
          random.character('number') :
          random.character('123456789');
        }
        result = parseFloat(parts.join('.'));
      } else
      {
        // integer
        // 'grade1|1-100': 1,
        result = options.rule.range && !options.rule.parameters[2] ? options.rule.count : options.template;
      }
      return result;
    },
    boolean: function boolean(options) {
      // 'prop|multiple': false, ????????????????????????????????????
      // 'prop|probability-probability': false, ??????????????????????????????
      var result = options.rule.parameters ?
      random.bool(Number(options.rule.min), Number(options.rule.max), options.template) :
      options.template;
      return result;
    },
    string: function string(options) {
      var source = '';
      var result = '';
      var match;
      var lastIndex = 0;
      if (options.template.length) {
        // 'foo': '???',
        if (options.rule.count === undefined) {
          source += options.template;
        } else
        {
          // 'star|1-5': '???',
          for (var i = 0; i < options.rule.count; i++) {
            source += options.template;
          }
        }
        // 'email|1-10': '@EMAIL, ',
        constant.RE_PLACEHOLDER.exec('');
        while (match = constant.RE_PLACEHOLDER.exec(source)) {
          var index = match.index;
          var input = match[0];
          if (index >= lastIndex) {
            // ?????????????????????????????????????????????
            if (/^\\/.test(input)) {
              result += source.slice(lastIndex, index) + input.slice(1);
              lastIndex = index + input.length;
              continue;
            }
            // console.log(input, options.context.currentContext, options.context.templateCurrentContext, options)
            var replaced = handler$1.placeholder(input, options.context.currentContext, options.context.templateCurrentContext, options);
            // ????????????????????????????????????????????????????????????'name': '@EMAIL'
            if (index === 0 && input.length === source.length) {
              result = replaced;
            } else
            {
              result += source.slice(lastIndex, index) + replaced;
            }
            lastIndex = index + input.length;
          }
        }
        if (lastIndex < source.length) {
          result += source.slice(lastIndex);
        }
      } else
      {
        // 'ASCII|1-10': '',
        // 'ASCII': '',
        result = options.rule.range ? random.string(options.rule.count) : options.template;
      }
      return result;
    },
    function: function _function(options) {
      // ( context, options )
      return options.template.call(options.context.currentContext, options);
    },
    regexp: function regexp(options) {
      var source = '';
      // 'name': /regexp/,
      if (options.rule.count === undefined) {
        source += options.template.source; // regexp.source
      } else
      {
        // 'name|1-5': /regexp/,
        for (var i = 0; i < options.rule.count; i++) {
          source += options.template.source;
        }
      }
      return RE.Handler.gen(RE.Parser.parse(source));
    },
    _all: function _all() {
      var re = {};
      for (var key in random) {
        re[key.toLowerCase()] = key;
      }
      return re;
    },
    // ????????????????????????????????????
    placeholder: function placeholder(_placeholder, obj, templateContext, options) {
      // 1 key, 2 params
      // regexp init
      constant.RE_PLACEHOLDER.exec('');
      var parts = constant.RE_PLACEHOLDER.exec(_placeholder);
      var key = parts && parts[1];
      var lkey = key && key.toLowerCase();
      var okey = handler$1._all()[lkey];
      var paramsInput = parts && parts[2] || '';
      var pathParts = handler$1.splitPathToArray(key);
      var params = [];
      // ????????????????????????
      try {
        // 1. ???????????????????????????
        // #24 [Window Firefox 30.0 ?????? ????????? ??????](https://github.com/nuysoft/Mock/issues/24)
        // [BX9056: ??????????????? window.eval ????????????????????????????????????](http://www.w3help.org/zh-cn/causes/BX9056)
        // ???????????? Window Firefox 30.0 ??? BUG
        params = eval('(function(){ return [].splice.call(arguments, 0 ) })(' + paramsInput + ')');
      }
      catch (error) {
        // 2. ???????????????????????? `[]` ???????????? JSON.parse ????????????
        try {
          var paramsString = paramsInput.replace(/'/g, '"');
          params = JSON.parse("[" + paramsString + "]");
        }
        catch (e) {
          // 3. ?????? split ????????????
          params = paramsInput.split(/,\s*/);
        }
      }
      // ?????????????????????????????????????????????
      // { first: '@EMAIL', full: '@first' } =>  { first: 'dsa@163.com', full: 'dsa@163.com' }
      if (obj && key in obj) {
        return obj[key];
      }
      // ???????????? or ????????????
      if (key.charAt(0) === '/' || pathParts.length > 1) {
        return handler$1.getValueByKeyPath(key, options);
      }
      // ????????????????????????????????????
      // fix Mock.js#15 ????????????????????????)
      if (templateContext && typeof templateContext === 'object' && key in templateContext && _placeholder !== templateContext[key]) {
        // ??????????????????????????????
        templateContext[key] = handler$1.gen(templateContext[key], key, {
          currentContext: obj, templateCurrentContext: templateContext });

        return templateContext[key];
      }
      // ?????????????????????????????????
      if (!(key in random) && !(lkey in random) && !(okey in random)) {
        return _placeholder;
      }
      // ?????????????????????????????????
      for (var i = 0; i < params.length; i++) {
        constant.RE_PLACEHOLDER.exec('');
        if (constant.RE_PLACEHOLDER.test(params[i])) {
          params[i] = handler$1.placeholder(params[i], obj, templateContext, options);
        }
      }
      var handle = random[key] || random[lkey] || random[okey];
      if (isFunction(handle)) {
        // ??????????????????????????????????????????
        handle.options = options;
        var ret = handle.apply(random, params);
        // ?????????????????????????????????????????????????????????
        if (ret === undefined) {
          ret = '';
        }
        delete handle.options;
        return ret;
      }
      return '';
    },
    getValueByKeyPath: function getValueByKeyPath(key, options) {
      var originalKey = key;
      var keyPathParts = handler$1.splitPathToArray(key);
      var absolutePathParts = [];
      // ????????????
      if (key.charAt(0) === '/') {
        absolutePathParts = [options.context.path[0]].concat(handler$1.normalizePath(keyPathParts));
      } else
      {
        // ????????????
        if (keyPathParts.length > 1) {
          absolutePathParts = options.context.path.slice(0);
          absolutePathParts.pop();
          absolutePathParts = handler$1.normalizePath(absolutePathParts.concat(keyPathParts));
        }
      }
      try {
        key = keyPathParts[keyPathParts.length - 1];
        var currentContext = options.context.root;
        var templateCurrentContext = options.context.templateRoot;
        for (var i = 1; i < absolutePathParts.length - 1; i++) {
          currentContext = currentContext[absolutePathParts[i]];
          templateCurrentContext = templateCurrentContext[absolutePathParts[i]];
        }
        // ???????????????????????????
        if (currentContext && key in currentContext) {
          return currentContext[key];
        }
        // ???????????????????????????????????????????????????
        // fix #15 ????????????????????????
        if (templateCurrentContext &&
        typeof templateCurrentContext === 'object' &&
        key in templateCurrentContext &&
        originalKey !== templateCurrentContext[key]) {
          // ??????????????????????????????
          templateCurrentContext[key] = handler$1.gen(templateCurrentContext[key], key, {
            currentContext: currentContext,
            templateCurrentContext: templateCurrentContext });

          return templateCurrentContext[key];
        }
      }
      catch (e) {}
      return '@' + keyPathParts.join('/');
    },
    // https://github.com/kissyteam/kissy/blob/master/src/path/src/path.js
    normalizePath: function normalizePath(pathParts) {
      var newPathParts = [];
      for (var i = 0; i < pathParts.length; i++) {
        switch (pathParts[i]) {
          case '..':
            newPathParts.pop();
            break;
          case '.':
            break;
          default:
            newPathParts.push(pathParts[i]);}

      }
      return newPathParts;
    },
    splitPathToArray: function splitPathToArray(path) {
      return path.split(/\/+/).filter(function (_) {return _;});
    },
    getTransferTypeCtor: function getTransferTypeCtor(key) {
      var matched = key.match(constant.RE_TRANSFER_TYPE);
      var type = matched && matched[1];
      if (type && transfer.hasOwnProperty(type) && type !== 'extend') {
        return transfer[type];
      }
      return function (value) {return value;};
    } };


  // ??? Mock.js ?????????????????????????????? JSON Schema???
  function toJSONSchema(template, name, path) {
    path = path || [];
    var result = {
      name: typeof name === 'string' ? name.replace(constant.RE_KEY, '$1') : name,
      template: template,
      type: _type(template),
      rule: parse(name),
      path: path.slice(0) };

    result.path.push(name === undefined ? 'ROOT' : result.name);
    if (isArray(template)) {
      result.items = [];
      template.forEach(function (item, index) {
        result.items.push(toJSONSchema(item, index, result.path));
      });
    } else
    if (isObject(template)) {
      result.properties = [];
      for (var key in template) {
        result.properties.push(toJSONSchema(template[key], key, result.path));
      }
    }
    return result;
  }

  // ## valid(template, data)
  var Diff = {
    diff: function diff(schema, data, name) {
      var result = [];
      // ??????????????? name ????????? type??????????????????????????????????????????
      if (Diff.name(schema, data, name, result) && Diff.type(schema, data, name, result)) {
        Diff.value(schema, data, name, result);
        Diff.properties(schema, data, name, result);
        Diff.items(schema, data, name, result);
      }
      return result;
    },
    /* jshint unused:false */
    name: function name(schema, _data, _name2, result) {
      var length = result.length;
      Assert.equal('name', schema.path, _name2 + '', schema.name + '', result);
      return result.length === length;
    },
    type: function type(schema, data, _name, result) {
      var length = result.length;
      if (isString(schema.template)) {
        // ?????????????????????
        if (schema.template.match(constant.RE_PLACEHOLDER)) {
          var actualValue = handler$1.gen(schema.template);
          Assert.equal('type', schema.path, _type(data), _type(actualValue), result);
          return result.length === length;
        }
      } else
      if (isArray(schema.template)) {
        if (schema.rule.parameters) {
          // name|count: array
          if (schema.rule.min !== undefined && schema.rule.max === undefined) {
            // ?????? name|1: array???????????????????????????????????????????????????????????????????????? `array` ??????????????????
            if (schema.rule.count === 1) {
              return true;
            }
          }
          // ?????? name|+inc: array
          if (schema.rule.parameters[2]) {
            return true;
          }
        }
      } else
      if (isFunction(schema.template)) {
        // ?????? `'name': function`????????????????????????????????????????????????
        return true;
      }
      Assert.equal('type', schema.path, _type(data), schema.type, result);
      return result.length === length;
    },
    value: function value(schema, data, name, result) {
      var length = result.length;
      var rule = schema.rule;
      var templateType = schema.type;
      if (templateType === 'object' || templateType === 'array' || templateType === 'function') {
        return true;
      }
      // ???????????????
      if (!rule.parameters) {
        if (isRegExp(schema.template)) {
          Assert.match('value', schema.path, data, schema.template, result);
          return result.length === length;
        }
        if (isString(schema.template)) {
          // ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
          if (schema.template.match(constant.RE_PLACEHOLDER)) {
            return result.length === length;
          }
        }
        Assert.equal('value', schema.path, data, schema.template, result);
        return result.length === length;
      }
      // ???????????????
      var actualRepeatCount;
      if (isNumber(schema.template)) {
        var parts = (data + '').split('.');
        var intPart = Number(parts[0]);
        var floatPart = parts[1];
        // ????????????
        // |min-max
        if (rule.min !== undefined && rule.max !== undefined) {
          Assert.greaterThanOrEqualTo('value', schema.path, intPart, Math.min(Number(rule.min), Number(rule.max)), result);
          // , 'numeric instance is lower than the required minimum (minimum: {expected}, found: {actual})')
          Assert.lessThanOrEqualTo('value', schema.path, intPart, Math.max(Number(rule.min), Number(rule.max)), result);
        }
        // |count
        if (rule.min !== undefined && rule.max === undefined) {
          Assert.equal('value', schema.path, intPart, Number(rule.min), result, '[value] ' + name);
        }
        // ????????????
        if (rule.decimal) {
          // |dmin-dmax
          if (rule.dmin !== undefined && rule.dmax !== undefined) {
            Assert.greaterThanOrEqualTo('value', schema.path, floatPart.length, Number(rule.dmin), result);
            Assert.lessThanOrEqualTo('value', schema.path, floatPart.length, Number(rule.dmax), result);
          }
          // |dcount
          if (rule.dmin !== undefined && rule.dmax === undefined) {
            Assert.equal('value', schema.path, floatPart.length, Number(rule.dmin), result);
          }
        }
      } else
      if (isString(schema.template)) {
        // 'aaa'.match(/a/g)
        actualRepeatCount = data.match(new RegExp(schema.template, 'g'));
        actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;
        // |min-max
        if (rule.min !== undefined && rule.max !== undefined) {
          Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, Number(rule.min), result);
          Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, Number(rule.max), result);
        }
        // |count
        if (rule.min !== undefined && rule.max === undefined) {
          Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result);
        }
      } else
      if (isRegExp(schema.template)) {
        actualRepeatCount = data.match(new RegExp(schema.template.source.replace(/^\^|\$$/g, ''), 'g'));
        actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;
        // |min-max
        if (rule.min !== undefined && rule.max !== undefined) {
          Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, Number(rule.min), result);
          Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, Number(rule.max), result);
        }
        // |count
        if (rule.min !== undefined && rule.max === undefined) {
          Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result);
        }
      }
      return result.length === length;
    },
    properties: function properties(schema, data, _name, result) {
      var length = result.length;
      var rule = schema.rule;
      var keys$1 = keys(data);
      if (!schema.properties) {
        return;
      }
      // ???????????????
      if (!schema.rule.parameters) {
        Assert.equal('properties length', schema.path, keys$1.length, schema.properties.length, result);
      } else
      {
        // ???????????????
        // |min-max
        if (rule.min !== undefined && rule.max !== undefined) {
          Assert.greaterThanOrEqualTo('properties length', schema.path, keys$1.length, Math.min(Number(rule.min), Number(rule.max)), result);
          Assert.lessThanOrEqualTo('properties length', schema.path, keys$1.length, Math.max(Number(rule.min), Number(rule.max)), result);
        }
        // |count
        if (rule.min !== undefined && rule.max === undefined) {
          // |1, |>1
          if (rule.count !== 1) {
            Assert.equal('properties length', schema.path, keys$1.length, Number(rule.min), result);
          }
        }
      }
      if (result.length !== length) {
        return false;
      }
      var _loop_1 = function _loop_1(i) {
        var property;
        schema.properties.forEach(function (item) {
          if (item.name === keys$1[i]) {
            property = item;
          }
        });
        property = property || schema.properties[i];
        result.push.apply(result, Diff.diff(property, data[keys$1[i]], keys$1[i]));
      };
      for (var i = 0; i < keys$1.length; i++) {
        _loop_1(i);
      }
      return result.length === length;
    },
    items: function items(schema, data, _name, result) {
      var length = result.length;
      if (!schema.items) {
        return;
      }
      var rule = schema.rule;
      // ???????????????
      if (!schema.rule.parameters) {
        Assert.equal('items length', schema.path, data.length, schema.items.length, result);
      } else
      {
        // ???????????????
        // |min-max
        if (rule.min !== undefined && rule.max !== undefined) {
          Assert.greaterThanOrEqualTo('items', schema.path, data.length, Math.min(Number(rule.min), Number(rule.max)) * schema.items.length, result, '[{utype}] array is too short: {path} must have at least {expected} elements but instance has {actual} elements');
          Assert.lessThanOrEqualTo('items', schema.path, data.length, Math.max(Number(rule.min), Number(rule.max)) * schema.items.length, result, '[{utype}] array is too long: {path} must have at most {expected} elements but instance has {actual} elements');
        }
        // |count
        if (rule.min !== undefined && rule.max === undefined) {
          // |1, |>1
          if (rule.count === 1) {
            return result.length === length;
          } else
          {
            Assert.equal('items length', schema.path, data.length, Number(rule.min) * schema.items.length, result);
          }
        }
        // |+inc
        if (rule.parameters && rule.parameters[2]) {
          return result.length === length;
        }
      }
      if (result.length !== length) {
        return false;
      }
      for (var i = 0; i < data.length; i++) {
        result.push.apply(result, Diff.diff(schema.items[i % schema.items.length], data[i], i % schema.items.length));
      }
      return result.length === length;
    } };

  // ??????????????????????????????
  //
  // Equal, not equal to, greater than, less than, greater than or equal to, less than or equal to
  // ?????? ???????????? ??????
  //
  // Expect path.name is less than or equal to expected, but path.name is actual.
  //
  //   Expect path.name is less than or equal to expected, but path.name is actual.
  //   Expect path.name is greater than or equal to expected, but path.name is actual.
  var Assert = {
    message: function message(item) {
      if (item.message) {
        return item.message;
      }
      var upperType = item.type.toUpperCase();
      var lowerType = item.type.toLowerCase();
      var path = isArray(item.path) && item.path.join('.') || item.path;
      var action = item.action;
      var expected = item.expected;
      var actual = item.actual;
      return "[" + upperType + "] Expect " + path + "'" + lowerType + " " + action + " " + expected + ", but is " + actual;
    },
    equal: function equal(type, path, actual, expected, result, message) {
      if (actual === expected) {
        return true;
      }
      // ???????????? === ??????????????????
      if (type === 'type' && expected === 'regexp' && actual === 'string') {
        return true;
      }
      result.push(Assert.createDiffResult(type, path, actual, expected, message, 'is equal to'));
      return false;
    },
    // actual matches expected
    match: function match(type, path, actual, expected, result, message) {
      if (expected.test(actual)) {
        return true;
      }
      result.push(Assert.createDiffResult(type, path, actual, expected, message, 'matches'));
      return false;
    },
    greaterThanOrEqualTo: function greaterThanOrEqualTo(type, path, actual, expected, result, message) {
      if (actual >= expected) {
        return true;
      }
      result.push(Assert.createDiffResult(type, path, actual, expected, message, 'is greater than or equal to'));
      return false;
    },
    lessThanOrEqualTo: function lessThanOrEqualTo(type, path, actual, expected, result, message) {
      if (actual <= expected) {
        return true;
      }
      result.push(Assert.createDiffResult(type, path, actual, expected, message, 'is less than or equal to'));
      return false;
    },
    createDiffResult: function createDiffResult(type, path, actual, expected, message, action) {
      var item = {
        path: path,
        type: type,
        actual: actual,
        expected: expected,
        action: action,
        message: message };

      item.message = Assert.message(item);
      return item;
    } };

  var valid = function valid(template, data) {
    var schema = toJSONSchema(template);
    return Diff.diff(schema, data);
  };
  valid.Diff = Diff;
  valid.Assert = Assert;

  function rgx(str, loose) {
    if (str instanceof RegExp) return { keys: false, pattern: str };
    var c,o,tmp,ext,keys = [],pattern = '',arr = str.split('/');
    arr[0] || arr.shift();

    while (tmp = arr.shift()) {
      c = tmp[0];
      if (c === '*') {
        keys.push('wild');
        pattern += '/(.*)';
      } else if (c === ':') {
        o = tmp.indexOf('?', 1);
        ext = tmp.indexOf('.', 1);
        keys.push(tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length));
        pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
        if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
      } else {
        pattern += '/' + tmp;
      }
    }

    return {
      keys: keys,
      pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i') };

  }

  var IMocked = /** @class */function () {
    function IMocked() {
      this._mocked = {};
    }
    IMocked.prototype.set = function (key, value) {
      this._mocked[key] = value;
    };
    IMocked.prototype.getMocked = function () {
      return this._mocked;
    };
    // ?????????????????????????????????????????????URL???Type
    IMocked.prototype.find = function (url, type) {
      var mockedItems = Object.values(this._mocked);
      for (var i = 0; i < mockedItems.length; i++) {
        var item = mockedItems[i];
        var urlMatched = this._matchUrl(item.rurl, url);
        var typeMatched = this._matchType(item.rtype, type);
        if (!item.rtype && urlMatched) {
          return item;
        }
        if (urlMatched && typeMatched) {
          return item;
        }
      }
    };
    /**
        * ????????????????????? mock ??????
        * @param item ???????????????????????? mock ?????????
        * @param options ?????????????????????????????????????????????
        */
    IMocked.prototype.convert = function (item, options) {
      return isFunction(item.template) ? item.template(options) : handler$1.gen(item.template);
    };
    IMocked.prototype._matchUrl = function (expected, actual) {
      if (isString(expected)) {
        if (expected === actual) {
          return true;
        }
        // expected: /hello/world
        // actual: /hello/world?type=1
        if (actual.indexOf(expected) === 0 && actual[expected.length] === '?') {
          return true;
        }
        if (expected.indexOf('/') === 0) {
          return rgx(expected).pattern.test(actual);
        }
      }
      if (isRegExp(expected)) {
        return expected.test(actual);
      }
      return false;
    };
    IMocked.prototype._matchType = function (expected, actual) {
      if (isString(expected) || isRegExp(expected)) {
        return new RegExp(expected, 'i').test(actual);
      }
      return false;
    };
    return IMocked;
  }();
  var mocked = new IMocked();

  var Setting = /** @class */function () {
    function Setting() {
      this._setting = {
        timeout: '10-100' };

    }
    Setting.prototype.setup = function (setting) {
      Object.assign(this._setting, setting);
    };
    Setting.prototype.parseTimeout = function (timeout) {
      if (timeout === void 0) {timeout = this._setting.timeout;}
      if (typeof timeout === 'number') {
        return timeout;
      }
      if (typeof timeout === 'string' && timeout.indexOf('-') === -1) {
        return parseInt(timeout, 10);
      }
      if (typeof timeout === 'string' && timeout.indexOf('-') !== -1) {
        var tmp = timeout.split('-');
        var min = parseInt(tmp[0], 10);
        var max = parseInt(tmp[1], 10);
        return Math.round(Math.random() * (max - min)) + min;
      }
      return 0;
    };
    return Setting;
  }();
  var setting = new Setting();

  // ???????????????????????????
  function getMpPlatform() {
    var global;
    var name;
    if (typeof wx !== 'undefined') {
      global = wx;
      name = 'wx';
    } else
    if (typeof my !== 'undefined') {
      global = my;
      name = 'my';
    } else
    if (typeof tt !== 'undefined') {
      global = tt;
      name = 'tt';
    } else
    if (typeof swan !== 'undefined') {
      global = swan;
      name = 'swan';
    }
    assert(global && name, 'Invalid mini-program platform, just work in "wx", "my", "tt" or "swan"!');
    return { global: global, name: name };
  }
  var platform = getMpPlatform();
  var platformName = platform.name;
  var platformRequest = platform.global.request;
  function MockRequest(opts) {
    var options = {
      url: opts.url,
      type: opts.method || 'GET',
      body: opts.data || null,
      headers: opts.header || opts.headers || {} };

    // ??????????????????????????????????????????
    var item = mocked.find(options.url, options.type);
    // ?????????????????????????????????????????????????????? request ???????????????
    if (!item) {
      return platformRequest(opts);
    }
    // ??????????????????????????????????????? fetch ??????
    var responseData = mocked.convert(item, options);
    var successOptions;
    if (platformName === 'my') {
      successOptions = {
        status: 200,
        data: responseData,
        headers: {} };

    } else
    {
      successOptions = {
        statusCode: 200,
        data: responseData,
        header: {} };

    }
    if (isFunction(opts.success) || isFunction(opts.complete)) {
      setTimeout(function () {
        isFunction(opts.success) && opts.success(successOptions);
        isFunction(opts.complete) && opts.complete(successOptions);
      }, setting.parseTimeout());
    }
  }
  // ??????????????? request ??????
  function overrideRequest() {
    if (!platform.global.request.__MOCK__) {
      // ????????? API ?????? setter ???????????????????????????
      Object.defineProperty(platform.global, 'request', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: MockRequest });

      platform.global.request.__MOCK__ = true;
    }
  }

  // For mini-program
  var Mock = {
    Handler: handler$1,
    Random: random,
    Transfer: transfer,
    Util: Util,
    RE: RE,
    toJSONSchema: toJSONSchema,
    valid: valid,
    mock: mock,
    setup: setting.setup.bind(setting),
    _mocked: mocked.getMocked(),
    version: '0.3.1' };

  // ???????????????????????????????????????
  function mock(rurl, rtype, template) {
    assert(arguments.length, 'The mock function needs to pass at least one parameter!');
    // Mock.mock(template)
    if (arguments.length === 1) {
      return handler$1.gen(rurl);
    }
    // Mock.mock(url, template)
    if (arguments.length === 2) {
      template = rtype;
      rtype = undefined;
    }
    overrideRequest();
    var key = String(rurl) + String(rtype);
    mocked.set(key, { rurl: rurl, rtype: rtype, template: template });
    return Mock;
  }

  return Mock;

});

/***/ }),

/***/ 19:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 20);

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx ????????????????????? plugins ???????????????????????????????????????????????????????????????????????? copyAugment ??????
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // ?????? externalClass ????????????(????????? externalClass ????????????????????????)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx ?????? hack ??? uni-app ???????????? name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//?????? observer ??? setData callback ?????????????????????????????? warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field ????????????
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"????????????","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick ?????? ??? setData ??? setData ??????????????????
    //2.nextTick ???????????? render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"????????????","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"????????????","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // ???????????? vm ?????????????????????
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO ??????????????????????????????????????? list=>l0 ??? list ??????????????????????????????????????????
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //????????? data ???????????????
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"????????????","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']????????????',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js ?????? new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay ???????????? selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO ???????????? string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // ??????????????????????????????????????????
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // ???????????????????????????????????????
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 21);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 21:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!****************************************************************!*\
  !*** C:/Users/MAIBENBEN/Desktop/??????/uni-app/my_shop/pages.json ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map