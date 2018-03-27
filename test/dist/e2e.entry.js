/*!
 * 
 * Version: undefined
 * Release date: undefined (built at undefined)
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 129);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(21);
var hide = __webpack_require__(12);
var redefine = __webpack_require__(13);
var ctx = __webpack_require__(18);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(49)('wks');
var uid = __webpack_require__(32);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(91);
var toPrimitive = __webpack_require__(22);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(24);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(23);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(31);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var has = __webpack_require__(11);
var SRC = __webpack_require__(32)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(21).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(23);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(46);
var defined = __webpack_require__(23);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(47);
var createDesc = __webpack_require__(31);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(22);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(91);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(9);
var IE_PROTO = __webpack_require__(66)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(10);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(21);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(18);
var IObject = __webpack_require__(46);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var asc = __webpack_require__(83);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(6)) {
  var LIBRARY = __webpack_require__(33);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(59);
  var $buffer = __webpack_require__(89);
  var ctx = __webpack_require__(18);
  var anInstance = __webpack_require__(39);
  var propertyDesc = __webpack_require__(31);
  var hide = __webpack_require__(12);
  var redefineAll = __webpack_require__(41);
  var toInteger = __webpack_require__(24);
  var toLength = __webpack_require__(8);
  var toIndex = __webpack_require__(117);
  var toAbsoluteIndex = __webpack_require__(35);
  var toPrimitive = __webpack_require__(22);
  var has = __webpack_require__(11);
  var classof = __webpack_require__(48);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(9);
  var isArrayIter = __webpack_require__(80);
  var create = __webpack_require__(36);
  var getPrototypeOf = __webpack_require__(17);
  var gOPN = __webpack_require__(37).f;
  var getIterFn = __webpack_require__(82);
  var uid = __webpack_require__(32);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(26);
  var createArrayIncludes = __webpack_require__(50);
  var speciesConstructor = __webpack_require__(57);
  var ArrayIterators = __webpack_require__(85);
  var Iterators = __webpack_require__(44);
  var $iterDetect = __webpack_require__(54);
  var setSpecies = __webpack_require__(38);
  var arrayFill = __webpack_require__(84);
  var arrayCopyWithin = __webpack_require__(107);
  var $DP = __webpack_require__(7);
  var $GOPD = __webpack_require__(16);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(112);
var $export = __webpack_require__(0);
var shared = __webpack_require__(49)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(115))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(32)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(12)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(93);
var enumBugKeys = __webpack_require__(67);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(94);
var enumBugKeys = __webpack_require__(67);
var IE_PROTO = __webpack_require__(66)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(64)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(68).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(93);
var hiddenKeys = __webpack_require__(67).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var call = __webpack_require__(105);
var isArrayIter = __webpack_require__(80);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(8);
var getIterFn = __webpack_require__(82);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(13);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(23);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(70);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(19);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(19);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(8);
var toAbsoluteIndex = __webpack_require__(35);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(19);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(19);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(12);
var redefine = __webpack_require__(13);
var fails = __webpack_require__(3);
var defined = __webpack_require__(23);
var wks = __webpack_require__(5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var redefineAll = __webpack_require__(41);
var meta = __webpack_require__(29);
var forOf = __webpack_require__(40);
var anInstance = __webpack_require__(39);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(54);
var setToStringTag = __webpack_require__(42);
var inheritIfRequired = __webpack_require__(71);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var uid = __webpack_require__(32);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(33) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var ctx = __webpack_require__(18);
var forOf = __webpack_require__(40);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 63 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(21);
var LIBRARY = __webpack_require__(33);
var wksExt = __webpack_require__(92);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(49)('keys');
var uid = __webpack_require__(32);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 67 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(18)(Function.call, __webpack_require__(16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(69).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(24);
var defined = __webpack_require__(23);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 74 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var defined = __webpack_require__(23);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(33);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var hide = __webpack_require__(12);
var has = __webpack_require__(11);
var Iterators = __webpack_require__(44);
var $iterCreate = __webpack_require__(77);
var setToStringTag = __webpack_require__(42);
var getPrototypeOf = __webpack_require__(17);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(36);
var descriptor = __webpack_require__(31);
var setToStringTag = __webpack_require__(42);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(12)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(53);
var defined = __webpack_require__(23);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(44);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(31);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(48);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(44);
module.exports = __webpack_require__(21).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(222);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(30);
var step = __webpack_require__(108);
var Iterators = __webpack_require__(44);
var toIObject = __webpack_require__(15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(76)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var invoke = __webpack_require__(98);
var html = __webpack_require__(68);
var cel = __webpack_require__(64);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(19)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(86).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(19)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(10);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(6);
var LIBRARY = __webpack_require__(33);
var $typed = __webpack_require__(59);
var hide = __webpack_require__(12);
var redefineAll = __webpack_require__(41);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(39);
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
var toIndex = __webpack_require__(117);
var gOPN = __webpack_require__(37).f;
var dP = __webpack_require__(7).f;
var arrayFill = __webpack_require__(84);
var setToStringTag = __webpack_require__(42);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(64)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(15);
var arrayIndexOf = __webpack_require__(50)(false);
var IE_PROTO = __webpack_require__(66)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(34);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(15);
var gOPN = __webpack_require__(37).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(51);
var pIE = __webpack_require__(47);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(46);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(10);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(98);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 98 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(43).trim;
var ws = __webpack_require__(70);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(43).trim;

module.exports = 1 / $parseFloat(__webpack_require__(70) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(19);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 103 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(73);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(46);
var toLength = __webpack_require__(8);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(6) && /./g.flags != 'g') __webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(55)
});


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(88);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(113);
var validate = __webpack_require__(45);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(58)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(7).f;
var create = __webpack_require__(36);
var redefineAll = __webpack_require__(41);
var ctx = __webpack_require__(18);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var $iterDefine = __webpack_require__(76);
var step = __webpack_require__(108);
var setSpecies = __webpack_require__(38);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(29).fastKey;
var validate = __webpack_require__(45);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(113);
var validate = __webpack_require__(45);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(58)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(26)(0);
var redefine = __webpack_require__(13);
var meta = __webpack_require__(29);
var assign = __webpack_require__(96);
var weak = __webpack_require__(116);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var validate = __webpack_require__(45);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(58)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(41);
var getWeak = __webpack_require__(29).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var createArrayMethod = __webpack_require__(26);
var $has = __webpack_require__(11);
var validate = __webpack_require__(45);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(37);
var gOPS = __webpack_require__(51);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(52);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(8);
var ctx = __webpack_require__(18);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(8);
var repeat = __webpack_require__(72);
var defined = __webpack_require__(23);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(34);
var toIObject = __webpack_require__(15);
var isEnum = __webpack_require__(47).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(48);
var from = __webpack_require__(123);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(40);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 124 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(130);
__webpack_require__(332).install();

let testPathRegExp = null;

if (typeof {"testPathPattern":""} === 'object' && {"testPathPattern":""}.testPathPattern) {
  // Remove string between % signs. On Windows' machines an empty env variable was visible as '%{variable_name}%' so it must be stripped.
  // See https://github.com/handsontable/handsontable/issues/4378).
  const pattern = {"testPathPattern":""}.testPathPattern.replace(/^%(.*)%$/, '');

  if (pattern) {
    testPathRegExp = new RegExp(pattern, 'i');
  }
}

const ignoredE2ETestsPath = './mobile';

[__webpack_require__(335), __webpack_require__(337)].forEach(req => {
  req.keys().forEach(filePath => {
    if (filePath.includes(ignoredE2ETestsPath) === false) {
      if (testPathRegExp === null || testPathRegExp instanceof RegExp && testPathRegExp.test(filePath)) {
        req(filePath);
      }
    }
  });
});

__webpack_require__(362);

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(131);

__webpack_require__(328);

__webpack_require__(329);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)))

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(132);
__webpack_require__(134);
__webpack_require__(135);
__webpack_require__(136);
__webpack_require__(137);
__webpack_require__(138);
__webpack_require__(139);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(142);
__webpack_require__(143);
__webpack_require__(144);
__webpack_require__(145);
__webpack_require__(146);
__webpack_require__(147);
__webpack_require__(148);
__webpack_require__(150);
__webpack_require__(151);
__webpack_require__(152);
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(85);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(109);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(112);
__webpack_require__(114);
__webpack_require__(115);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
module.exports = __webpack_require__(21);


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var META = __webpack_require__(29).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(49);
var setToStringTag = __webpack_require__(42);
var uid = __webpack_require__(32);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(92);
var wksDefine = __webpack_require__(65);
var enumKeys = __webpack_require__(133);
var isArray = __webpack_require__(52);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(22);
var createDesc = __webpack_require__(31);
var _create = __webpack_require__(36);
var gOPNExt = __webpack_require__(95);
var $GOPD = __webpack_require__(16);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(34);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(37).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(47).f = $propertyIsEnumerable;
  __webpack_require__(51).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(33)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(51);
var pIE = __webpack_require__(47);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(36) });


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperties: __webpack_require__(94) });


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(15);
var $getOwnPropertyDescriptor = __webpack_require__(16).f;

__webpack_require__(25)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(9);
var $getPrototypeOf = __webpack_require__(17);

__webpack_require__(25)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9);
var $keys = __webpack_require__(34);

__webpack_require__(25)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(25)('getOwnPropertyNames', function () {
  return __webpack_require__(95).f;
});


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(96) });


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(149) });


/***/ }),
/* 149 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(69).set });


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(48);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(13)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(97) });


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(17);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(7).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(99);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(100);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(11);
var cof = __webpack_require__(19);
var inheritIfRequired = __webpack_require__(71);
var toPrimitive = __webpack_require__(22);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(37).f;
var gOPD = __webpack_require__(16).f;
var dP = __webpack_require__(7).f;
var $trim = __webpack_require__(43).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(36)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(13)(global, NUMBER, $Number);
}


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(24);
var aNumberValue = __webpack_require__(101);
var repeat = __webpack_require__(72);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(101);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(102) });


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(102);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(100);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(99);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(103);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(73);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(74);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(104) });


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(103) });


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(73) });


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(74);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(74);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(35);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(43)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(75)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(76)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(75)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(78);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(79)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(78);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(79)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(72)
});


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(78);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(79)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(14)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(14)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(14)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(14)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(14)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(14)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(14)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(14)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(14)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(14)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(14)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(14)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(14)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(211);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(13)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(12)(proto, TO_PRIMITIVE, __webpack_require__(214));


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(22);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(52) });


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(18);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var call = __webpack_require__(105);
var isArrayIter = __webpack_require__(80);
var toLength = __webpack_require__(8);
var createProperty = __webpack_require__(81);
var getIterFn = __webpack_require__(82);

$export($export.S + $export.F * !__webpack_require__(54)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(81);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(46) != Object || !__webpack_require__(20)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(68);
var cof = __webpack_require__(19);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(20)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(26)(0);
var STRICT = __webpack_require__(20)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(52);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(26)(1);

$export($export.P + $export.F * !__webpack_require__(20)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(26)(2);

$export($export.P + $export.F * !__webpack_require__(20)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(26)(3);

$export($export.P + $export.F * !__webpack_require__(20)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(26)(4);

$export($export.P + $export.F * !__webpack_require__(20)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(106);

$export($export.P + $export.F * !__webpack_require__(20)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(106);

$export($export.P + $export.F * !__webpack_require__(20)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(50)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(107) });

__webpack_require__(30)('copyWithin');


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(84) });

__webpack_require__(30)('fill');


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(30)(KEY);


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(30)(KEY);


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('Array');


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(71);
var dP = __webpack_require__(7).f;
var gOPN = __webpack_require__(37).f;
var isRegExp = __webpack_require__(53);
var $flags = __webpack_require__(55);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(13)(global, 'RegExp', $RegExp);
}

__webpack_require__(38)('RegExp');


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(109);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(55);
var DESCRIPTORS = __webpack_require__(6);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(13)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(56)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(56)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(56)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(56)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(53);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(33);
var global = __webpack_require__(2);
var ctx = __webpack_require__(18);
var classof = __webpack_require__(48);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(10);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var speciesConstructor = __webpack_require__(57);
var task = __webpack_require__(86).set;
var microtask = __webpack_require__(87)();
var newPromiseCapabilityModule = __webpack_require__(88);
var perform = __webpack_require__(110);
var promiseResolve = __webpack_require__(111);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(41)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(42)($Promise, PROMISE);
__webpack_require__(38)(PROMISE);
Wrapper = __webpack_require__(21)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(54)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(116);
var validate = __webpack_require__(45);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(58)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(59);
var buffer = __webpack_require__(89);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(57);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(38)(ARRAY_BUFFER);


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(59).ABV, {
  DataView: __webpack_require__(89).DataView
});


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(36);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(97);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(7);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(22);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(16).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(77)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(11);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(16);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(17);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(118) });


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(7);
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(11);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(31);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(69);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(50)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(30)('includes');


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(119);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var aFunction = __webpack_require__(10);
var arraySpeciesCreate = __webpack_require__(83);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(30)('flatMap');


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(119);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var toInteger = __webpack_require__(24);
var arraySpeciesCreate = __webpack_require__(83);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(30)('flatten');


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(75)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(120);
var userAgent = __webpack_require__(90);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(120);
var userAgent = __webpack_require__(90);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(43)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(43)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(23);
var toLength = __webpack_require__(8);
var isRegExp = __webpack_require__(53);
var getFlags = __webpack_require__(55);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(77)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65)('asyncIterator');


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(65)('observable');


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(118);
var toIObject = __webpack_require__(15);
var gOPD = __webpack_require__(16);
var createProperty = __webpack_require__(81);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(121)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(121)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(60), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(60), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(60), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(60), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(122)('Map') });


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(122)('Set') });


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(61)('Map');


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(61)('Set');


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(61)('WeakMap');


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(61)('WeakSet');


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(62)('Map');


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(62)('Set');


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(62)('WeakMap');


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(62)('WeakSet');


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(19);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(124);
var fround = __webpack_require__(104);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(124) });


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(21);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(57);
var promiseResolve = __webpack_require__(111);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(88);
var perform = __webpack_require__(110);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(114);
var from = __webpack_require__(123);
var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(87)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(19)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(21);
var microtask = __webpack_require__(87)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(39);
var redefineAll = __webpack_require__(41);
var hide = __webpack_require__(12);
var forOf = __webpack_require__(40);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(38)('Observable');


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(90);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(86);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(85);
var getKeys = __webpack_require__(34);
var redefine = __webpack_require__(13);
var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var Iterators = __webpack_require__(44);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
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
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
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
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)))

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(330);
module.exports = __webpack_require__(21).RegExp.escape;


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(331)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 331 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var co = __webpack_require__(333),
    isGeneratorFn = __webpack_require__(334).fn;

var DEFAULT_METHODS = [
    'afterAll',
    'afterEach',
    'beforeAll',
    'beforeEach',
    'it', 'fit', //'xit',
];
var EXPECTS_NAME = ['it', 'fit', 'xit'];

var originalMethods = {},
    overrideMethods, installed;

module.exports = function jasmineCo(userFn) {
    return wrapFn(userFn);
};
module.exports.install = function install() {
    (overrideMethods || DEFAULT_METHODS).forEach(function(fname) {
        coifyJasmineFn(fname);
    });
    installed = true;
};
module.exports.uninstall = function uninstall() {
    Object.keys(originalMethods).forEach(function(key) {
        global[key] = originalMethods[key];
    });
    originalMethods = {};
    installed = false;
};
module.exports.isInstalled = function isInstalled() {
    return installed;
};
module.exports.setOverrideMethods = function setOverrideMethods(methods) {
    overrideMethods = Array.isArray(methods) ? methods : DEFAULT_METHODS;
};

function coifyJasmineFn(fname) {
    // don't process methods that don't exist globally or have already been overridden
    if (!global[fname] || originalMethods[fname]) { return; }

    var origFn = originalMethods[fname] = global[fname];
    global[fname] = wrapFn(origFn, EXPECTS_NAME.indexOf(fname) !== -1);
}

function wrapFn(origFn, expectsName) {
    return function() {
        var userFn = expectsName ? arguments[1] : arguments[0];
        var restParams = [].slice.call(arguments, expectsName ? 2 : 1);
        var args;
        if (isGeneratorFn(userFn)) {
            // if the user method is a generator:
            //   1. call it with the correct `this` context object
            //   2. wrap it in a co function which fails the spec if an exception is
            //      encountered and notifies jasmine that the spec is done when the co
            //      promise settles
            args = [function(done) {
                return co(userFn.bind(this)).then(done, done.fail);
            }];
            if (expectsName) { args.unshift(arguments[0]); }
            if (restParams.length) { args.push.apply(args, restParams); }
            return origFn.apply(null, args);
        } else if (userFn && !userFn.length) {
            // if the user method is a standard function that doesn't expect to be asynchronous
            // (i.e. it doesn't take `done` as a parameter), wrap it with a function that *is*
            // asynchronous and retrofit it to support returning a promise from the function
            args = [function(done) {
                var result = userFn.call(this);
                if (!(result && typeof result.then === 'function')) {
                    done();
                    return result;
                } else {
                    result.then(done, done.fail);
                }
            }];
            if (expectsName) { args.unshift(arguments[0]); }
            if (restParams.length) { args.push.apply(args, restParams); }
            return origFn.apply(null, args);
        } else {
            // if the user method is already asynchronous, just call the standard jasmine method
            // and let the user method take care of itself
            return origFn.apply(null, arguments);
        }
    };
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)))

/***/ }),
/* 333 */
/***/ (function(module, exports) {


/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose `co`.
 */

module.exports = co['default'] = co.co = co;

/**
 * Wrap the given generator `fn` into a
 * function that returns a promise.
 * This is a separate function so that
 * every `co()` call doesn't create a new,
 * unnecessary closure.
 *
 * @param {GeneratorFunction} fn
 * @return {Function}
 * @api public
 */

co.wrap = function (fn) {
  createPromise.__generatorFunction__ = fn;
  return createPromise;
  function createPromise() {
    return co.call(this, fn.apply(this, arguments));
  }
};

/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */

function co(gen) {
  var ctx = this;
  var args = slice.call(arguments, 1)

  // we wrap everything in a promise to avoid promise chaining,
  // which leads to memory leak errors.
  // see https://github.com/tj/co/issues/180
  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();

    /**
     * @param {Mixed} res
     * @return {Promise}
     * @api private
     */

    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * @param {Error} err
     * @return {Promise}
     * @api private
     */

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * Get the next value in the generator,
     * return a promise.
     *
     * @param {Object} ret
     * @return {Promise}
     * @api private
     */

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      var value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}

/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */

function toPromise(obj) {
  if (!obj) return obj;
  if (isPromise(obj)) return obj;
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
  if ('function' == typeof obj) return thunkToPromise.call(this, obj);
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  if (isObject(obj)) return objectToPromise.call(this, obj);
  return obj;
}

/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */

function thunkToPromise(fn) {
  var ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */

function objectToPromise(obj){
  var results = new obj.constructor();
  var keys = Object.keys(obj);
  var promises = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var promise = toPromise.call(this, obj[key]);
    if (promise && isPromise(promise)) defer(promise, key);
    else results[key] = obj[key];
  }
  return Promise.all(promises).then(function () {
    return results;
  });

  function defer(promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(promise.then(function (res) {
      results[key] = res;
    }));
  }
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isPromise(obj) {
  return 'function' == typeof obj.then;
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  return isGenerator(constructor.prototype);
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
  return Object == val.constructor;
}


/***/ }),
/* 334 */
/***/ (function(module, exports) {

/**
 * Export generator function checks.
 */
module.exports = isGenerator
module.exports.fn = isGeneratorFunction

/**
 * Check whether an object is a generator.
 *
 * @param  {Object}  obj
 * @return {Boolean}
 */
function isGenerator (obj) {
  return obj &&
    typeof obj.next === 'function' &&
    typeof obj.throw === 'function'
}

/**
 * Check whether a function is generator.
 *
 * @param  {Function} fn
 * @return {Boolean}
 */
function isGeneratorFunction (fn) {
  return typeof fn === 'function' &&
    fn.constructor &&
    fn.constructor.name === 'GeneratorFunction'
}


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Core_datachange.spec.js": 336
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 335;

/***/ }),
/* 336 */
/***/ (function(module, exports) {

describe('Core_datachange', () => {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  it('should call onChange callback', () => {
    var output = null;

    handsontable({
      afterChange(changes) {
        output = changes;
      }
    });
    setDataAtCell(1, 2, 'test');

    expect(output[0][0]).toEqual(1);
    expect(output[0][1]).toEqual(2);
    expect(output[0][2]).toEqual(null);
    expect(output[0][3]).toEqual('test');
  });

  it('should use custom source for datachange', () => {
    var output = null,
        src = null;

    handsontable({
      afterChange(changes, source) {
        output = changes;
        src = source;
      }
    });
    setDataAtCell(1, 2, 'abc', 'test');

    expect(output[0][3]).toEqual('abc');
    expect(src).toEqual('test');
  });

  it('should use custom source for datachange with array', () => {
    var output = null,
        src = null;

    handsontable({
      afterChange(changes, source) {
        output = changes;
        src = source;
      }
    });
    setDataAtCell([[1, 2, 'abc']], 'test');

    expect(output[0][3]).toEqual('abc');
    expect(src).toEqual('test');
  });

  it('should trigger datachange event', () => {
    var output = null;

    handsontable();
    Handsontable.hooks.add('afterChange', changes => {
      output = changes;
    });
    setDataAtCell(1, 2, 'test');

    expect(output[0][0]).toEqual(1);
    expect(output[0][1]).toEqual(2);
    expect(output[0][2]).toEqual(null);
    expect(output[0][3]).toEqual('test');
  });

  it('this.rootElement should point to handsontable rootElement', function () {
    var output = null;
    var $container = this.$container;

    handsontable({
      afterChange() {
        output = this.rootElement;
      }
    });
    setDataAtCell(0, 0, 'test');

    expect(output).toEqual($container[0]);
  });

  it('onChange should be triggered after data is rendered to DOM (init)', function () {
    var output = null;
    var $container = this.$container;

    handsontable({
      data: [['Joe Red']],
      afterChange(changes, source) {
        if (source === 'loadData') {
          output = $container.find('table.htCore tbody td:first').html();
        }
      }
    });

    expect(output).toEqual('Joe Red');
  });

  it('onChange should be triggered after data is rendered to DOM (setDataAtCell)', function () {
    var output = null;
    var $container = this.$container;

    handsontable({
      data: [['Joe Red']],
      afterChange(changes, source) {
        if (source === 'edit') {
          output = $container.find('table.htCore tbody td:first').html();
        }
      }
    });
    setDataAtCell(0, 0, 'Alice Red');

    expect(output).toEqual('Alice Red');
  });

  it('onChange event object should contain documented keys and values when triggered by edit', () => {
    var sampleData = [{
      col1: 'a',
      col2: 'b',
      col3: 'c'
    }];
    var event = null;

    handsontable({
      data: sampleData,
      afterChange(changes, source) {
        if (source === 'edit') {
          event = changes.shift();
        }
      }
    });
    setDataAtCell(0, 0, 'test');

    expect(event[0]).toEqual(0);
    expect(event[1]).toEqual('col1');
    expect(event[2]).toEqual('a');
    expect(event[3]).toEqual('test');
  });

  it('source parameter should be `edit` when cell value is changed through editor', () => {
    var sources = [];

    handsontable({
      data: [['Joe Red']],
      afterChange(changes, source) {
        sources.push(source);
      }
    });
    selectCell(0, 0);

    keyDown('enter');
    document.activeElement.value = 'Ted';
    keyDown('enter');

    expect(sources).toEqual(['loadData', 'edit']); // loadData is always the first source
  });
});

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./autoColumnSize/test/autoColumnSize.e2e.js": 338,
	"./autoRowSize/test/autoRowSize.e2e.js": 339,
	"./columnSorting/test/columnSorting.e2e.js": 340,
	"./comments/test/comments.e2e.js": 341,
	"./contextMenu/test/contextMenu.e2e.js": 342,
	"./contextMenu/test/predefinedItems/alignment.e2e.js": 343,
	"./contextMenu/test/predefinedItems/readOnly.e2e.js": 344,
	"./contextMenu/test/predefinedItems/removeColumn.e2e.js": 345,
	"./contextMenu/test/predefinedItems/removeRow.e2e.js": 346,
	"./copyPaste/test/copyPaste.e2e.js": 347,
	"./customBorders/test/customBorders.e2e.js": 348,
	"./dragToScroll/test/dragToScroll.e2e.js": 349,
	"./manualColumnFreeze/test/manualColumnFreeze.e2e.js": 350,
	"./manualColumnMove/test/manualColumnMove.e2e.js": 351,
	"./manualColumnMove/test/manualColumnMoveUI.e2e.js": 352,
	"./manualColumnResize/test/manualColumnResize.e2e.js": 353,
	"./manualRowMove/test/manualRowMove.e2e.js": 354,
	"./manualRowMove/test/manualRowMoveUI.e2e.js": 355,
	"./manualRowResize/test/manualRowResize.e2e.js": 356,
	"./mergeCells/test/mergeCells.e2e.js": 357,
	"./observeChanges/test/observeChanges.e2e.js": 358,
	"./persistentState/test/persistentState.e2e.js": 359,
	"./search/test/search.e2e.js": 360,
	"./undoRedo/test/UndoRedo.e2e.js": 361
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 337;

/***/ }),
/* 338 */
/***/ (function(module, exports) {

describe('AutoColumnSize', () => {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  var arrayOfObjects = function () {
    return [{ id: 'Short', name: 'Somewhat long', lastName: 'The very very very longest one', nestedData: [{ id: 1000 }] }];
  };

  it('should apply auto size by default', function () {
    handsontable({
      data: arrayOfObjects()
    });

    var width0 = colWidth(this.$container, 0);
    var width1 = colWidth(this.$container, 1);
    var width2 = colWidth(this.$container, 2);

    expect(width0).toBeLessThan(width1);
    expect(width1).toBeLessThan(width2);
  });

  it('should update column width after update value in cell (array of objects)', function () {
    handsontable({
      data: arrayOfObjects(),
      autoColumnSize: true,
      columns: [{ data: 'id' }, { data: 'name' }, { data: 'lastName' }]
    });

    expect(colWidth(this.$container, 0)).toBeAroundValue(50, 3);
    expect([117, 120, 121, 129, 135]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 1)]));
    expect([216, 229, 247, 260]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 2)]));

    setDataAtRowProp(0, 'id', 'foo bar foo bar foo bar');
    setDataAtRowProp(0, 'name', 'foo');

    expect([165, 168, 169, 189, 191]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 0)]));
    expect(colWidth(this.$container, 1)).toBeAroundValue(50, 3);
    expect([216, 229, 247, 260]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 2)]));
  });

  it('should correctly detect column widths with colHeaders', function () {
    handsontable({
      data: arrayOfObjects(),
      autoColumnSize: true,
      colHeaders: ['Identifier Longer text'],
      columns: [{ data: 'id' }, { data: 'name' }]
    });

    expect([149, 155, 174, 178]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 0)]));
  });

  it('should correctly detect column widths after update colHeaders when headers were passed as an array', function () {
    handsontable({
      data: arrayOfObjects(),
      autoColumnSize: true,
      colHeaders: true,
      columns: [{ data: 'id' }, { data: 'name' }]
    });

    expect([50, 51, 53]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 0)]));

    updateSettings({ colHeaders: ['Identifier Longer text', 'Identifier Longer and longer text'] });

    expect([149, 155, 174, 178]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 0)]));
    expect([226, 235, 263, 270]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 1)]));
  });

  it('should correctly detect column widths after update colHeaders when headers were passed as a string', function () {
    handsontable({
      data: arrayOfObjects(),
      autoColumnSize: true,
      colHeaders: true,
      columns: [{ data: 'id' }, { data: 'name' }]
    });

    expect([50, 51, 53]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 0)]));

    updateSettings({ colHeaders: 'Identifier Longer text' });

    expect([149, 155, 174, 178]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 0)]));
    expect([149, 155, 174, 178]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 1)]));
  });

  it('should correctly detect column widths after update colHeaders when headers were passed as a function', function () {
    handsontable({
      data: arrayOfObjects(),
      autoColumnSize: true,
      colHeaders: true,
      columns: [{ data: 'id' }, { data: 'name' }]
    });

    expect([50, 51, 53]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 0)]));

    updateSettings({
      colHeaders(index) {
        return index === 0 ? 'Identifier Longer text' : 'Identifier Longer and longer text';
      }
    });

    expect([149, 155, 174, 178]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 0)]));
    expect([226, 235, 263, 270]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 1)]));
  });

  it('should correctly detect column width with colHeaders and the useHeaders option set to false (not taking the header widths into calculation)', function () {
    handsontable({
      data: [{ id: 'ab' }],
      autoColumnSize: {
        useHeaders: false
      },
      colHeaders: ['Identifier'],
      columns: [{ data: 'id' }]
    });

    expect(colWidth(this.$container, 0)).toBe(50);
  });

  it('should correctly detect column width with columns.title', function () {
    handsontable({
      data: arrayOfObjects(),
      autoColumnSize: true,
      columns: [{ data: 'id', title: 'Identifier' }]
    });

    expect([68, 70, 71, 80, 82]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 0)]));
  });

  it('should correctly detect column widths after update columns.title', function () {
    handsontable({
      data: arrayOfObjects(),
      autoColumnSize: true,
      columns: [{ data: 'id', title: 'Identifier' }]
    });

    updateSettings({
      columns: [{ data: 'id', title: 'Identifier with longer text' }]
    });

    expect([174, 182, 183, 208, 213]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 0)]));
  });

  // https://github.com/handsontable/handsontable/issues/2684
  it('should correctly detect column width when table is hidden on init (display: none)', async () => {
    spec().$container.css('display', 'none');
    var hot = handsontable({
      data: arrayOfObjects(),
      autoColumnSize: true,
      colHeaders: ['Identifier', 'First Name']
    });

    await sleep(200);

    spec().$container.css('display', 'block');
    hot.render();

    expect([68, 70, 71, 80, 82]).toEqual(jasmine.arrayContaining([colWidth(spec().$container, 0)]));
  });

  it('should keep last columns width unchanged if all rows was removed', function () {
    var hot = handsontable({
      data: arrayOfObjects(),
      autoColumnSize: true,
      columns: [{ data: 'id', title: 'Identifier' }, { data: 'name', title: 'Name' }, { data: 'lastName', title: 'Last Name' }]
    });

    expect([68, 70, 71, 80, 82]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 0)]));
    expect([117, 120, 121, 129, 135]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 1)]));
    expect([216, 229, 247, 260]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 2)]));

    hot.alter('remove_row', 0);

    expect([68, 70, 71, 80, 82]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 0)]));
    expect([117, 120, 121, 129, 135]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 1)]));
    expect([216, 229, 247, 260]).toEqual(jasmine.arrayContaining([colWidth(this.$container, 2)]));
  });

  it('should be possible to disable plugin using updateSettings', function () {
    handsontable({
      data: arrayOfObjects()
    });

    var width0 = colWidth(this.$container, 0);
    var width1 = colWidth(this.$container, 1);
    var width2 = colWidth(this.$container, 2);

    expect(width0).toBeLessThan(width1);
    expect(width1).toBeLessThan(width2);

    updateSettings({
      autoColumnSize: false
    });

    width0 = colWidth(this.$container, 0);
    width1 = colWidth(this.$container, 1);
    width2 = colWidth(this.$container, 2);

    expect(width0).toEqual(width1);
    expect(width0).toEqual(width2);
    expect(width1).toEqual(width2);
  });

  it('should apply disabling/enabling plugin using updateSettings, only to a particular HOT instance', function () {
    this.$container2 = $(`<div id="${id}-2"></div>`).appendTo('body');

    handsontable({
      data: arrayOfObjects()
    });

    this.$container2.handsontable({
      data: arrayOfObjects()
    });

    var widths = {
      1: [],
      2: []
    };

    widths[1][0] = colWidth(this.$container, 0);
    widths[1][1] = colWidth(this.$container, 1);
    widths[1][2] = colWidth(this.$container, 2);

    widths[2][0] = colWidth(this.$container2, 0);
    widths[2][1] = colWidth(this.$container2, 1);
    widths[2][2] = colWidth(this.$container2, 2);

    expect(widths[1][0]).toBeLessThan(widths[1][1]);
    expect(widths[1][1]).toBeLessThan(widths[1][2]);

    expect(widths[2][0]).toBeLessThan(widths[2][1]);
    expect(widths[2][1]).toBeLessThan(widths[2][2]);

    updateSettings({
      autoColumnSize: false
    });

    widths[1][0] = colWidth(this.$container, 0);
    widths[1][1] = colWidth(this.$container, 1);
    widths[1][2] = colWidth(this.$container, 2);

    widths[2][0] = colWidth(this.$container2, 0);
    widths[2][1] = colWidth(this.$container2, 1);
    widths[2][2] = colWidth(this.$container2, 2);

    expect(widths[1][0]).toEqual(widths[1][1]);
    expect(widths[1][0]).toEqual(widths[1][2]);
    expect(widths[1][1]).toEqual(widths[1][2]);

    expect(widths[2][0]).toBeLessThan(widths[2][1]);
    expect(widths[2][1]).toBeLessThan(widths[2][2]);

    this.$container2.handsontable('destroy');
    this.$container2.remove();
  });

  it('should be possible to enable plugin using updateSettings', function () {
    handsontable({
      data: arrayOfObjects(),
      autoColumnSize: false
    });

    var width0 = colWidth(this.$container, 0);
    var width1 = colWidth(this.$container, 1);
    var width2 = colWidth(this.$container, 2);

    expect(width0).toEqual(width1);
    expect(width0).toEqual(width2);
    expect(width1).toEqual(width2);

    updateSettings({
      autoColumnSize: true
    });

    width0 = colWidth(this.$container, 0);
    width1 = colWidth(this.$container, 1);
    width2 = colWidth(this.$container, 2);

    expect(width0).toBeLessThan(width1);
    expect(width1).toBeLessThan(width2);
  });

  it('should consider CSS style of each instance separately', () => {
    var $style = $('<style>.big .htCore td {font-size: 40px; line-height: 1.1;}</style>').appendTo('head');
    var $container1 = $('<div id="hot1"></div>').appendTo('body').handsontable({
      data: arrayOfObjects()
    });
    var $container2 = $('<div id="hot2"></div>').appendTo('body').handsontable({
      data: arrayOfObjects()
    });
    var hot1 = $container1.handsontable('getInstance');
    var hot2 = $container2.handsontable('getInstance');

    expect(colWidth($container1, 0)).toEqual(colWidth($container2, 0));

    $container1.addClass('big');
    hot1.render();
    hot2.render();
    expect(colWidth($container1, 0)).toBeGreaterThan(colWidth($container2, 0));

    $container1.removeClass('big').handsontable('render');
    $container2.addClass('big').handsontable('render');
    expect(colWidth($container1, 0)).toBeLessThan(colWidth($container2, 0));

    $style.remove();
    $container1.handsontable('destroy');
    $container1.remove();
    $container2.handsontable('destroy');
    $container2.remove();
  });

  it('should consider CSS class of the <table> element (e.g. when used with Bootstrap)', function () {
    var $style = $('<style>.htCore.big-table td {font-size: 32px}</style>').appendTo('head');

    handsontable({
      data: arrayOfObjects(),
      autoColumnSize: true
    });

    var width = colWidth(this.$container, 0);

    this.$container.find('table').addClass('big-table');
    render();
    expect(colWidth(this.$container, 0)).toBeGreaterThan(width);

    $style.remove();
  });

  it('should destroy temporary element', () => {
    handsontable({
      autoColumnSize: true
    });

    expect(document.querySelector('.htAutoSize')).toBe(null);
  });

  it('should not trigger autoColumnSize when column width is defined (through colWidths)', function () {
    handsontable({
      data: arrayOfObjects(),
      autoColumnSize: true,
      colWidths: [70, 70, 70],
      width: 500,
      height: 100,
      rowHeaders: true
    });

    setDataAtCell(0, 0, 'LongLongLongLong');

    expect(colWidth(this.$container, 0)).toBe(70);
  });

  it('should not trigger autoColumnSize when column width is defined (through columns.width)', function () {
    handsontable({
      data: arrayOfObjects(),
      autoColumnSize: true,
      colWidth: 77,
      columns: [{ width: 70 }, { width: 70 }, { width: 70 }],
      width: 500,
      height: 100,
      rowHeaders: true
    });

    setDataAtCell(0, 0, 'LongLongLongLong');

    expect(colWidth(this.$container, 0)).toBe(70);
  });

  it('should consider renderer that uses conditional formatting for specific row & column index', function () {
    var data = arrayOfObjects();
    data.push({ id: '2', name: 'Rocket Man', lastName: 'In a tin can' });
    handsontable({
      data,
      columns: [{ data: 'id' }, { data: 'name' }],
      autoColumnSize: true,
      renderer(instance, td, row, col, prop, value, cellProperties) {
        // taken from demo/renderers.html
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        if (row === 1 && col === 0) {
          td.style.padding = '100px';
        }
      }
    });

    expect(colWidth(this.$container, 0)).toBeGreaterThan(colWidth(this.$container, 1));
  });

  it('should\'t serialize value if it is array (nested data sources)', () => {
    var spy = jasmine.createSpy('renderer');

    handsontable({
      data: arrayOfObjects(),
      autoColumnSize: true,
      columns: [{ data: 'nestedData' }],
      renderer: spy
    });

    expect(spy.calls.mostRecent().args[5]).toEqual([{ id: 1000 }]);
  });
});

/***/ }),
/* 339 */
/***/ (function(module, exports) {

describe('AutoRowSize', () => {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  function arrayOfObjects() {
    return [{ id: 'Short' }, { id: 'Somewhat\nlong' }, { id: 'The\nvery\nvery\nvery\nlongest one' }];
  }
  function arrayOfObjects2() {
    return [{ id: 'Short', name: 'Somewhat long' }, { id: 'Somewhat long', name: 'The very very longest one' }, { id: 'The very very very longest one', name: 'Short' }];
  }

  it('should apply auto size by default', function () {
    handsontable({
      data: arrayOfObjects()
    });

    var height0 = rowHeight(this.$container, 0);
    var height1 = rowHeight(this.$container, 1);
    var height2 = rowHeight(this.$container, 2);

    expect(height0).toBeLessThan(height1);
    expect(height1).toBeLessThan(height2);
  });

  it('should draw scrollbar correctly (proper height) after calculation when autoRowSize option is set (long text in row) #4000', done => {
    var row = ['This is very long text which will break this cell text into two lines'];
    var data = [];
    var nrOfRows = 200;
    var columnWidth = 100;

    for (var i = 0; i < nrOfRows; i += 1) {
      data.push(row);
    }

    handsontable({
      data,
      colWidths() {
        return columnWidth;
      },
      autoRowSize: true
    });

    var oldHeight = spec().$container[0].scrollHeight;

    setTimeout(() => {
      var newHeight = spec().$container[0].scrollHeight;
      expect(oldHeight).toBeLessThan(newHeight);
      done();
    }, 200);
  });

  describe('should draw scrollbar correctly (proper height) after calculation when autoRowSize option is set (`table td` element height set by CSS) #4000', () => {
    var cellHeightInPx = 100;
    var nrOfRows = null;
    var nrOfColumns = 200,
        style;

    var SYNC_CALCULATION_LIMIT = Handsontable.plugins.AutoRowSize.SYNC_CALCULATION_LIMIT;
    var CALCULATION_STEP = Handsontable.plugins.AutoRowSize.CALCULATION_STEP;

    beforeEach(function () {
      if (!this.$container) {
        this.$container = $(`<div id="${id}"></div>`).appendTo('body');
      }

      var css = `.handsontable table td { height: ${cellHeightInPx}px !important }`,
          head = document.head;

      style = document.createElement('style');
      style.type = 'text/css';

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }

      $(head).append(style);
    });

    afterEach(function () {
      if (this.$container) {
        destroy();
        this.$container.remove();
      }

      if (style) {
        $(style).remove();
      }
    });

    it('(SYNC_CALCULATION_LIMIT - 1 rows)', done => {
      nrOfRows = SYNC_CALCULATION_LIMIT - 1;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(nrOfRows, nrOfColumns),
        autoRowSize: true
      });

      setTimeout(() => {
        var newHeight = spec().$container[0].scrollHeight;

        expect(newHeight).toEqual((cellHeightInPx + 1) * nrOfRows + 1);
        done();
      }, 200);
    });

    it('(SYNC_CALCULATION_LIMIT + 1 rows)', done => {
      nrOfRows = SYNC_CALCULATION_LIMIT + 1;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(nrOfRows, nrOfColumns),
        autoRowSize: true
      });

      setTimeout(() => {
        var newHeight = spec().$container[0].scrollHeight;

        expect(newHeight).toEqual((cellHeightInPx + 1) * nrOfRows + 1);
        done();
      }, 200);
    });

    it('(SYNC_CALCULATION_LIMIT + CALCULATION_STEP - 1 rows)', done => {

      nrOfRows = SYNC_CALCULATION_LIMIT + CALCULATION_STEP - 1;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(nrOfRows, nrOfColumns),
        autoRowSize: true
      });

      setTimeout(() => {
        var newHeight = spec().$container[0].scrollHeight;

        expect(newHeight).toEqual((cellHeightInPx + 1) * nrOfRows + 1);
        done();
      }, 200);
    });

    it('(SYNC_CALCULATION_LIMIT + CALCULATION_STEP + 1 rows)', done => {

      nrOfRows = SYNC_CALCULATION_LIMIT + CALCULATION_STEP + 1;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(nrOfRows, nrOfColumns),
        autoRowSize: true
      });

      setTimeout(() => {
        var newHeight = spec().$container[0].scrollHeight;

        expect(newHeight).toEqual((cellHeightInPx + 1) * nrOfRows + 1);
        done();
      }, 200);
    });
  });

  it('should correctly detect row height when table is hidden on init (display: none)', function (done) {
    this.$container.css('display', 'none');
    var hot = handsontable({
      data: arrayOfObjects(),
      rowHeaders: true,
      autoRowSize: true
    });

    setTimeout(() => {
      spec().$container.css('display', 'block');
      hot.render();

      expect(rowHeight(spec().$container, 0)).toBe(24);
      expect(rowHeight(spec().$container, 1)).toBe(43);
      expect([106, 127]).toEqual(jasmine.arrayContaining([rowHeight(spec().$container, 2)]));
      done();
    }, 200);
  });

  it('should be possible to disable plugin using updateSettings', function () {
    var hot = handsontable({
      data: arrayOfObjects()
    });

    var height0 = rowHeight(this.$container, 0);
    var height1 = rowHeight(this.$container, 1);
    var height2 = rowHeight(this.$container, 2);

    expect(height0).toBeLessThan(height1);
    expect(height1).toBeLessThan(height2);

    updateSettings({
      autoRowSize: false
    });
    hot.setDataAtCell(0, 0, 'A\nB\nC');

    var height4 = rowHeight(this.$container, 0);

    expect(height4).toBeGreaterThan(height0);
  });

  it('should be possible to enable plugin using updateSettings', () => {
    handsontable({
      data: arrayOfObjects(),
      autoRowSize: false
    });

    var height0 = parseInt(getCell(0, 0).style.height, 10);
    var height1 = parseInt(getCell(1, 0).style.height, 10);
    var height2 = parseInt(getCell(2, 0).style.height, 10);

    expect(height0).toEqual(height1);
    expect(height0).toEqual(height2);
    expect(height1).toEqual(height2);

    updateSettings({
      autoRowSize: true
    });

    height0 = parseInt(getCell(0, 0).style.height, 10);
    height1 = parseInt(getCell(1, 0).style.height, 10);
    height2 = parseInt(getCell(2, 0).style.height, 10);

    expect(height0).toBeLessThan(height1);
    expect(height1).toBeLessThan(height2);
  });

  it('should consider CSS style of each instance separately', () => {
    var $style = $('<style>.big .htCore td {font-size: 40px;line-height: 1.1}</style>').appendTo('head');
    var $container1 = $('<div id="hot1"></div>').appendTo('body').handsontable({
      data: arrayOfObjects(),
      autoRowSize: true
    });
    var $container2 = $('<div id="hot2"></div>').appendTo('body').handsontable({
      data: arrayOfObjects(),
      autoRowSize: true
    });
    var hot1 = $container1.handsontable('getInstance');
    var hot2 = $container2.handsontable('getInstance');

    expect(parseInt(hot1.getCell(0, 0).style.height, 10)).toEqual(parseInt(hot2.getCell(0, 0).style.height, 10));

    $container1.addClass('big');
    hot1.render();
    hot2.render();

    expect(parseInt(hot1.getCell(2, 0).style.height, 10)).toBeGreaterThan(parseInt(hot2.getCell(2, 0).style.height, 10));

    $container1.removeClass('big');
    hot1.render();
    $container2.addClass('big');
    hot2.render();

    expect(parseInt(hot1.getCell(2, 0).style.height, 10)).toBeLessThan(parseInt(hot2.getCell(2, 0).style.height, 10));

    $style.remove();
    $container1.handsontable('destroy');
    $container1.remove();
    $container2.handsontable('destroy');
    $container2.remove();
  });

  it('should consider CSS class of the <table> element (e.g. when used with Bootstrap)', function () {
    var $style = $('<style>.htCore.big-table td {font-size: 32px;line-height: 1.1}</style>').appendTo('head');

    var hot = handsontable({
      data: arrayOfObjects(),
      autoRowSize: true
    });
    var height = parseInt(hot.getCell(2, 0).style.height, 10);

    this.$container.find('table').addClass('big-table');
    hot.getPlugin('autoRowSize').clearCache();
    render();
    expect(parseInt(hot.getCell(2, 0).style.height, 10)).toBeGreaterThan(height);

    $style.remove();
  });

  it('should not trigger autoColumnSize when column width is defined (through colWidths)', () => {
    var hot = handsontable({
      data: arrayOfObjects(),
      autoRowSize: true,
      rowHeights: [70, 70, 70],
      width: 500,
      height: 100,
      rowHeaders: true
    });

    setDataAtCell(0, 0, 'LongLongLongLong');

    expect(parseInt(hot.getCell(0, -1).style.height, 10)).toBe(69); // -1px of cell border
  });

  // Currently columns.height is not supported
  xit('should not trigger autoRowSize when column height is defined (through columns.height)', () => {
    var hot = handsontable({
      data: arrayOfObjects(),
      autoRowSize: true,
      rowHeights: 77,
      columns: [{ height: 70 }, { height: 70 }, { height: 70 }],
      width: 500,
      height: 100,
      rowHeaders: true
    });

    setDataAtCell(0, 0, 'LongLongLongLong');

    expect(parseInt(hot.getCell(0, -1).style.height, 10)).toBe(69); // -1px of cell border
  });

  it('should consider renderer that uses conditional formatting for specific row & column index', () => {
    var data = arrayOfObjects();
    data.push({ id: '2', name: 'Rocket Man', lastName: 'In a tin can' });

    var hot = handsontable({
      data,
      columns: [{ data: 'id' }, { data: 'name' }],
      autoRowSize: true,
      renderer(instance, td, row, col, prop, value, cellProperties) {
        // taken from demo/renderers.html
        Handsontable.renderers.TextRenderer.apply(this, arguments);

        if (row === 1 && col === 0) {
          td.style.padding = '100px';
        }
      }
    });

    expect(parseInt(hot.getCell(1, 0).style.height || 0, 10)).toBe(242);
  });

  it('should destroy temporary element', () => {
    handsontable({
      autoRowSize: true
    });

    expect(document.querySelector('.htAutoSize')).toBe(null);
  });

  it('should recalculate heights after column resize', function () {
    var hot = handsontable({
      data: arrayOfObjects2(),
      colWidths: 250,
      manualColumnResize: true,
      autoRowSize: true,
      rowHeaders: true,
      colHeaders: true
    });

    expect(parseInt(hot.getCell(0, -1).style.height, 10)).toBe(22); // -1px of cell border
    expect(parseInt(hot.getCell(1, -1).style.height, 10)).toBe(22); // -1px of cell border
    expect(parseInt(hot.getCell(2, -1).style.height, 10)).toBeInArray([22, 42]); // -1px of cell border

    resizeColumn.call(this, 1, 100);

    expect(parseInt(hot.getCell(0, -1).style.height, 10)).toBe(22);
    expect(parseInt(hot.getCell(1, -1).style.height, 10)).toBe(42);
    expect([63, 84]).toEqual(jasmine.arrayContaining([parseInt(hot.getCell(2, -1).style.height, 10)]));

    resizeColumn.call(this, 1, 50);

    expect(parseInt(hot.getCell(0, -1).style.height, 10)).toBe(22);
    expect(parseInt(hot.getCell(1, -1).style.height, 10)).toBe(42);
    expect(parseInt(hot.getCell(2, -1).style.height, 10)).toBe(126);

    resizeColumn.call(this, 1, 200);

    expect(parseInt(hot.getCell(0, -1).style.height, 10)).toBe(22);
    expect(parseInt(hot.getCell(1, -1).style.height, 10)).toBe(22);
    expect(parseInt(hot.getCell(2, -1).style.height, 10)).toBe(42);
  });

  it('should recalculate heights after column moved', () => {
    var hot = handsontable({
      data: arrayOfObjects2(),
      colWidths: [250, 50],
      manualColumnMove: true,
      autoRowSize: true,
      rowHeaders: true,
      colHeaders: true
    });

    var plugin = hot.getPlugin('manualColumnMove');

    expect(parseInt(hot.getCell(0, -1).style.height, 10)).toBe(42); // -1px of cell border
    expect(parseInt(hot.getCell(1, -1).style.height, 10)).toBe(105); // -1px of cell border
    expect(parseInt(hot.getCell(2, -1).style.height, 10)).toBeInArray([22, 42]); // -1px of cell border

    plugin.moveColumn(0, 2);
    hot.render();

    expect(parseInt(hot.getCell(0, -1).style.height, 10)).toBe(22);
    expect(parseInt(hot.getCell(1, -1).style.height, 10)).toBe(42);
    expect(parseInt(hot.getCell(2, -1).style.height, 10)).toBe(126);
  });

  it('should recalculate heights with manualRowResize when changing text to multiline', () => {
    var hot = handsontable({
      data: arrayOfObjects2(),
      colWidths: 250,
      manualRowResize: [23, 50],
      autoRowSize: true,
      rowHeaders: true,
      colHeaders: true
    });

    expect(parseInt(hot.getCell(0, -1).style.height, 10)).toBe(22); // -1px of cell border
    expect(parseInt(hot.getCell(1, -1).style.height, 10)).toBe(49); // -1px of cell border
    expect(parseInt(hot.getCell(2, -1).style.height, 10)).toBeInArray([22, 42]); // -1px of cell border

    hot.setDataAtCell(1, 0, 'A\nB\nC\nD\nE');

    expect(parseInt(hot.getCell(0, -1).style.height, 10)).toBe(22);
    expect(parseInt(hot.getCell(1, -1).style.height, 10)).toBe(105);
    expect(parseInt(hot.getCell(2, -1).style.height, 10)).toBeInArray([22, 42]);
  });

  it('should recalculate heights after moved row', () => {
    var hot = handsontable({
      data: arrayOfObjects2(),
      colWidths: 250,
      manualRowResize: [23, 50],
      manualRowMove: true,
      autoRowSize: true,
      rowHeaders: true,
      colHeaders: true
    });

    expect(parseInt(hot.getCell(0, -1).style.height, 10)).toBe(22); // -1px of cell border
    expect(parseInt(hot.getCell(1, -1).style.height, 10)).toBe(49); // -1px of cell border
    expect(parseInt(hot.getCell(2, -1).style.height, 10)).toBeInArray([22, 42]); // -1px of cell border

    var plugin = hot.getPlugin('manualRowMove');
    plugin.moveRow(1, 0);
    hot.render();

    expect(parseInt(hot.getCell(0, -1).style.height, 10)).toBe(49);
    expect(parseInt(hot.getCell(1, -1).style.height, 10)).toBe(22);
    expect(parseInt(hot.getCell(2, -1).style.height, 10)).toBeInArray([22, 42]); // -1px of cell border
  });

  it('should resize the column headers properly, according the their content sizes', () => {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(30, 30),
      colHeaders(index) {
        if (index === 22) {
          return 'a<br>much<br>longer<br>label';
        }
        return 'test';
      },
      autoRowSize: true,
      rowHeaders: true,
      width: 300,
      height: 300
    });

    expect(rowHeight(spec().$container, -1)).toBe(89);
  });
});

/***/ }),
/* 340 */
/***/ (function(module, exports) {

describe('ColumnSorting', () => {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}" style="overflow: auto; width: 300px; height: 200px;"></div>`).appendTo('body');

    this.sortByColumn = function (columnIndex) {
      var element = this.$container.find(`th span.columnSorting:eq(${columnIndex})`);

      element.simulate('mousedown');
      element.simulate('mouseup');
    };
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  var arrayOfObjects = function () {
    return [{ id: 1, name: 'Ted', lastName: 'Right' }, { id: 2, name: 'Frank', lastName: 'Honest' }, { id: 3, name: 'Joan', lastName: 'Well' }, { id: 4, name: 'Sid', lastName: 'Strong' }, { id: 5, name: 'Jane', lastName: 'Neat' }, { id: 6, name: 'Chuck', lastName: 'Jackson' }, { id: 7, name: 'Meg', lastName: 'Jansen' }, { id: 8, name: 'Rob', lastName: 'Norris' }, { id: 9, name: 'Sean', lastName: 'O\'Hara' }, { id: 10, name: 'Eve', lastName: 'Branson' }];
  };

  it('should sort table by first visible column', function () {
    var hot = handsontable({
      data: [[1, 9, 3, 4, 5, 6, 7, 8, 9], [9, 8, 7, 6, 5, 4, 3, 2, 1], [8, 7, 6, 5, 4, 3, 3, 1, 9], [0, 3, 0, 5, 6, 7, 8, 9, 1]],
      colHeaders: true,
      columnSorting: true
    });

    var htCore = getHtCore();

    expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
    expect(htCore.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('9');
    expect(htCore.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('3');
    expect(htCore.find('tbody tr:eq(0) td:eq(3)').text()).toEqual('4');

    this.sortByColumn(0);

    expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');
    expect(htCore.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('3');
    expect(htCore.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('0');
    expect(htCore.find('tbody tr:eq(0) td:eq(3)').text()).toEqual('5');
  });

  it('should apply stable sort function #3606', () => {
    var hot = handsontable({
      data: [['mercedes1', 'Mercedes', 'A 160', '01/14/2007'], ['citroen1', 'Citroen', 'C4 Coupe', '12/01/2007'], ['opel1', 'Opel', 'Astra', '02/02/2006'], ['bmw1', 'BMW', '320i Coupe', '07/24/2009'], ['citroen2', 'Citroen', 'C4 Coupe', '12/01/2012'], ['opel2', 'Opel', 'Astra', '02/02/2004'], ['mercedes2', 'Mercedes', 'A 160', '01/14/2008'], ['citroen3', 'Citroen', 'C4 Coupe', '12/01/2007'], ['mercedes3', 'Mercedes', 'A 160', '01/14/2009'], ['opel3', 'Opel', 'Astra', '02/02/2006'], ['bmw2', 'BMW', '320i Coupe', '07/24/2013'], ['bmw3', 'BMW', '320i Coupe', '07/24/2012']],
      columns: [{}, {}, {
        type: 'date',
        dateFormat: 'mm/dd/yy'
      }, {
        type: 'numeric'
      }],
      columnSorting: true
    });

    hot.sort(1, true); // ASC

    expect(hot.getDataAtCol(0)).toEqual(['bmw1', 'bmw2', 'bmw3', 'citroen1', 'citroen2', 'citroen3', 'mercedes1', 'mercedes2', 'mercedes3', 'opel1', 'opel2', 'opel3']);

    hot.sort(1, false); // DESC

    expect(hot.getDataAtCol(0)).toEqual(['opel1', 'opel2', 'opel3', 'mercedes1', 'mercedes2', 'mercedes3', 'citroen1', 'citroen2', 'citroen3', 'bmw1', 'bmw2', 'bmw3']);
  });

  it('should not throw error when trying run handsontable with columnSorting and autoRowSize in the same time.', () => {
    var errors = 0;

    try {
      handsontable({
        data: arrayOfObjects(),
        autoRowSize: true,
        columnSorting: true
      });
    } catch (e) {
      errors++;
    }

    expect(errors).toBe(0);
  });

  it('should sort numbers descending after 2 clicks on table header', function () {
    handsontable({
      data: arrayOfObjects(),
      colHeaders: true,
      columnSorting: true
    });

    this.sortByColumn(0);
    this.sortByColumn(0);

    expect(this.$container.find('tr td').first().html()).toEqual('10');
  });

  it('should remove specified row from sorted table and NOT sort the table again', function () {
    var hot = handsontable({
      data: [[1, 'B'], [3, 'D'], [2, 'A'], [0, 'C']],
      colHeaders: true,
      columnSorting: true
    });

    this.sortByColumn(0);

    var htCore = getHtCore();

    expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');
    expect(htCore.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('1');
    expect(htCore.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('2');
    expect(htCore.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('3');

    expect(htCore.find('tbody tr').length).toEqual(4);

    // Now if sort is launched, sorting ordered will be reversed
    hot.sortOrder = false;

    hot.alter('remove_row', 0);

    expect(htCore.find('tbody tr').length).toEqual(3);
    expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
    expect(htCore.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('2');
    expect(htCore.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('3');
  });

  it('should add an empty row to sorted table', function () {
    var hot = handsontable({
      data: [[1, 'B'], [0, 'A'], [3, 'D'], [2, 'C']],
      colHeaders: true,
      columnSorting: true
    });

    this.sortByColumn(0);

    var htCore = getHtCore();

    expect(htCore.find('tbody tr').length).toEqual(4);

    expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');
    expect(htCore.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('1');
    expect(htCore.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('2');
    expect(htCore.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('3');

    hot.alter('insert_row', 1, 2);

    expect(htCore.find('tbody tr').length).toEqual(6);
    expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');
    expect(htCore.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('');
    expect(htCore.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('');
    expect(htCore.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('1');
    expect(htCore.find('tbody tr:eq(4) td:eq(0)').text()).toEqual('2');
    expect(htCore.find('tbody tr:eq(5) td:eq(0)').text()).toEqual('3');
  });

  it('should add an empty row to sorted table at a given index', function () {
    var hot = handsontable({
      data: [[1, 'B'], [0, 'A'], [3, 'D'], [2, 'C']],
      colHeaders: true,
      columnSorting: true
    });

    var htCore = getHtCore();

    this.sortByColumn(0);

    expect(htCore.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('3');
    expect(htCore.find('tbody tr:eq(4) td:eq(0)').text()).toEqual('');

    hot.alter('insert_row', 2);

    expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');
    expect(htCore.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('1');

    expect(htCore.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('');
    expect(htCore.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('');
    expect(htCore.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('');

    expect(htCore.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('2');
  });

  it('should NOT sort the table after value update in sorted column', function () {
    var hot = handsontable({
      data: [[1, 'B'], [0, 'A'], [3, 'D'], [2, 'C']],
      colHeaders: true,
      columnSorting: true
    });

    var htCore = getHtCore();

    expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');

    this.sortByColumn(0);
    this.sortByColumn(0);

    expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('3');
    expect(htCore.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('2');

    hot.setDataAtCell(1, 0, 20);

    render();

    expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('3');
    expect(htCore.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('20');
  });

  it('defaultSort comparing function shouldn\'t change order when comparing empty string, null and undefined', () => {
    var hot = handsontable({});
    var defaultSort = hot.getPlugin('columnSorting').defaultSort;

    expect(defaultSort(false, {})(['key1', null], ['key2', null])).toEqual(0);
    expect(defaultSort(false, {})(['key1', ''], ['key2', ''])).toEqual(0);
    expect(defaultSort(false, {})(['key1', undefined], ['key2', undefined])).toEqual(0);

    expect(defaultSort(false, {})(['key1', ''], ['key2', null])).toEqual(0);
    expect(defaultSort(false, {})(['key1', null], ['key2', ''])).toEqual(0);

    expect(defaultSort(false, {})(['key1', ''], ['key2', undefined])).toEqual(0);
    expect(defaultSort(false, {})(['key1', undefined], ['key2', ''])).toEqual(0);

    expect(defaultSort(false, {})(['key1', null], ['key2', undefined])).toEqual(0);
    expect(defaultSort(false, {})(['key1', undefined], ['key2', null])).toEqual(0);
  });

  it('should place empty strings, null and undefined values at proper position (stability of default comparing function)', () => {
    var hot = handsontable({
      data: [[null, 'Ted Right'], [undefined, 'Jane Neat'], [null, 'Meg Jansen'], ['', 'Sean Hara'], ['', 'Eve Branson'], [6, 'Frank Honest'], [7, 'Joan Well'], [8, 'Sid Strong'], [9, 'Chuck Jackson'], [10, 'Rob Norris'], [11, 'Eve Well']],
      columnSorting: true
    });

    hot.sort(0, true); // ASC

    expect(hot.getDataAtCol(1)).toEqual(['Frank Honest', 'Joan Well', 'Sid Strong', 'Chuck Jackson', 'Rob Norris', 'Eve Well',
    // empty cells below
    'Ted Right', 'Jane Neat', 'Meg Jansen', 'Sean Hara', 'Eve Branson']);

    hot.sort(0, false); // DESC

    expect(hot.getDataAtCol(1)).toEqual(['Eve Well', 'Rob Norris', 'Chuck Jackson', 'Sid Strong', 'Joan Well', 'Frank Honest',
    // empty cells below
    'Ted Right', 'Jane Neat', 'Meg Jansen', 'Sean Hara', 'Eve Branson']);
  });

  it('should place empty strings, null and undefined values at proper position when `sortEmptyCells` option is enabled ' + '(API call, data type: default)', () => {
    var hot = handsontable({
      data: [[6, 'Frank Honest'], [null, 'Ted Right'], [7, 'Joan Well'], [8, 'Sid Strong'], [undefined, 'Jane Neat'], [9, 'Chuck Jackson'], [null, 'Meg Jansen'], [10, 'Rob Norris'], ['', 'Sean Hara'], ['', 'Eve Branson']],
      columnSorting: {
        sortEmptyCells: true
      }
    });

    hot.sort(0, true); // ASC

    expect(hot.getDataAtCol(1)).toEqual(['Ted Right', 'Jane Neat', 'Meg Jansen', 'Sean Hara', 'Eve Branson',
    // empty cells above
    'Frank Honest', 'Joan Well', 'Sid Strong', 'Chuck Jackson', 'Rob Norris']);

    hot.sort(0, false); // DESC

    expect(hot.getDataAtCol(1)).toEqual(['Rob Norris', 'Chuck Jackson', 'Sid Strong', 'Joan Well', 'Frank Honest',
    // empty cells below
    'Ted Right', 'Jane Neat', 'Meg Jansen', 'Sean Hara', 'Eve Branson']);
  });

  it('should place empty strings, null and undefined values at proper position when `sortEmptyCells` ' + 'option is enabled and `column` property of `columnSorting` option is set (data type: default)', function () {
    var hot = handsontable({
      data: [[6, 'Frank Honest'], [null, 'Ted Right'], [7, 'Joan Well'], [8, 'Sid Strong'], [undefined, 'Jane Neat'], [9, 'Chuck Jackson'], [null, 'Meg Jansen'], [10, 'Rob Norris'], ['', 'Sean Hara'], ['', 'Eve Branson']],
      columnSorting: {
        sortEmptyCells: true,
        sortOrder: true,
        column: 0
      }
    });

    // ASC

    expect(hot.getDataAtCol(1)).toEqual(['Ted Right', 'Jane Neat', 'Meg Jansen', 'Sean Hara', 'Eve Branson',
    // empty cells above
    'Frank Honest', 'Joan Well', 'Sid Strong', 'Chuck Jackson', 'Rob Norris']);

    if (this.$container) {
      destroy();
      this.$container.remove();
    }

    hot = handsontable({
      data: [[6, 'Frank Honest'], [null, 'Ted Right'], [7, 'Joan Well'], [8, 'Sid Strong'], [undefined, 'Jane Neat'], [9, 'Chuck Jackson'], [null, 'Meg Jansen'], [10, 'Rob Norris'], ['', 'Sean Hara'], ['', 'Eve Branson']],
      columnSorting: {
        sortEmptyCells: true,
        sortOrder: false,
        column: 0
      }
    });

    // DESC

    expect(hot.getDataAtCol(1)).toEqual(['Rob Norris', 'Chuck Jackson', 'Sid Strong', 'Joan Well', 'Frank Honest',
    // empty cells below
    'Ted Right', 'Jane Neat', 'Meg Jansen', 'Sean Hara', 'Eve Branson']);
  });

  it('should place empty strings, null and undefined values at proper position when `sortEmptyCells` ' + 'option is enabled and `column` property of `columnSorting` option is set (data type: numeric)', function () {
    var hot = handsontable({
      data: [[6, 'Frank Honest'], [null, 'Ted Right'], [7, 'Joan Well'], [8, 'Sid Strong'], [undefined, 'Jane Neat'], [9, 'Chuck Jackson'], [null, 'Meg Jansen'], [10, 'Rob Norris'], ['', 'Sean Hara'], ['', 'Eve Branson']],
      columns: [{
        type: 'numeric'
      }, {}],
      columnSorting: {
        sortEmptyCells: true,
        sortOrder: true,
        column: 0
      }
    });

    // ASC

    expect(hot.getDataAtCol(1)).toEqual(['Ted Right', 'Jane Neat', 'Meg Jansen', 'Sean Hara', 'Eve Branson',
    // empty cells above
    'Frank Honest', 'Joan Well', 'Sid Strong', 'Chuck Jackson', 'Rob Norris']);

    if (this.$container) {
      destroy();
      this.$container.remove();
    }

    hot = handsontable({
      data: [[6, 'Frank Honest'], [null, 'Ted Right'], [7, 'Joan Well'], [8, 'Sid Strong'], [undefined, 'Jane Neat'], [9, 'Chuck Jackson'], [null, 'Meg Jansen'], [10, 'Rob Norris'], ['', 'Sean Hara'], ['', 'Eve Branson']],
      columnSorting: {
        sortEmptyCells: true,
        sortOrder: false,
        column: 0
      }
    });

    // DESC

    expect(hot.getDataAtCol(1)).toEqual(['Rob Norris', 'Chuck Jackson', 'Sid Strong', 'Joan Well', 'Frank Honest',
    // empty cells below
    'Ted Right', 'Jane Neat', 'Meg Jansen', 'Sean Hara', 'Eve Branson']);
  });

  describe('data type: date', () => {
    it('dateSort comparing function shouldn\'t change order when comparing empty string, null and undefined', () => {
      var hot = handsontable({});
      var dateSort = hot.getPlugin('columnSorting').dateSort;

      expect(dateSort(false, {})(['key1', null], ['key2', null])).toEqual(0);
      expect(dateSort(false, {})(['key1', ''], ['key2', ''])).toEqual(0);
      expect(dateSort(false, {})(['key1', undefined], ['key2', undefined])).toEqual(0);

      expect(dateSort(false, {})(['key1', ''], ['key2', null])).toEqual(0);
      expect(dateSort(false, {})(['key1', null], ['key2', ''])).toEqual(0);

      expect(dateSort(false, {})(['key1', ''], ['key2', undefined])).toEqual(0);
      expect(dateSort(false, {})(['key1', undefined], ['key2', ''])).toEqual(0);

      expect(dateSort(false, {})(['key1', null], ['key2', undefined])).toEqual(0);
      expect(dateSort(false, {})(['key1', undefined], ['key2', null])).toEqual(0);
    });

    it('should place empty strings, null and undefined values at proper position when `sortEmptyCells` ' + 'option is enabled and `column` property of `columnSorting` option is set', function () {
      var hot = handsontable({
        data: [['Citroen1', 'C4 Coupe', null], ['Mercedes1', 'A 160', '12/01/2008'], ['Mercedes2', 'A 160', '01/14/2006'], ['Citroen2', 'C4 Coupe', undefined], ['Audi1', 'A4 Avant', '11/19/2011'], ['Opel1', 'Astra', '02/02/2004'], ['Citroen3', 'C4 Coupe', null], ['BMW1', '320i Coupe', '07/24/2011'], ['Citroen4', 'C4 Coupe', ''], ['Citroen5', 'C4 Coupe', '']],
        columns: [{}, {}, {
          type: 'date',
          dateFormat: 'MM/DD/YYYY'
        }],
        columnSorting: {
          sortEmptyCells: true,
          sortOrder: true,
          column: 2
        }
      });

      // ASC

      expect(hot.getDataAtCol(0)).toEqual(['Citroen1', 'Citroen2', 'Citroen3', 'Citroen4', 'Citroen5',
      // empty cells above
      'Opel1', 'Mercedes2', 'Mercedes1', 'BMW1', 'Audi1']);

      if (this.$container) {
        destroy();
        this.$container.remove();
      }

      hot = handsontable({
        data: [['Citroen1', 'C4 Coupe', null], ['Mercedes1', 'A 160', '12/01/2008'], ['Mercedes2', 'A 160', '01/14/2006'], ['Citroen2', 'C4 Coupe', undefined], ['Audi1', 'A4 Avant', '11/19/2011'], ['Opel1', 'Astra', '02/02/2004'], ['Citroen3', 'C4 Coupe', null], ['BMW1', '320i Coupe', '07/24/2011'], ['Citroen4', 'C4 Coupe', ''], ['Citroen5', 'C4 Coupe', '']],
        columns: [{}, {}, {
          type: 'date',
          dateFormat: 'MM/DD/YYYY'
        }],
        columnSorting: {
          sortEmptyCells: true,
          sortOrder: false,
          column: 2
        }
      });

      // DESC

      expect(hot.getDataAtCol(0)).toEqual(['Audi1', 'BMW1', 'Mercedes1', 'Mercedes2', 'Opel1',
      // empty cells below
      'Citroen1', 'Citroen2', 'Citroen3', 'Citroen4', 'Citroen5']);
    });

    it('should sort date columns (MM/DD/YYYY)', () => {
      var hot = handsontable({
        data: [['Mercedes', 'A 160', '01/14/2006', 6999.9999], ['Citroen', 'C4 Coupe', '12/01/2008', 8330], ['Audi', 'A4 Avant', '11/19/2011', 33900], ['Opel', 'Astra', '02/02/2004', 7000], ['BMW', '320i Coupe', '07/24/2011', 30500]],
        columns: [{}, {}, {
          type: 'date',
          dateFormat: 'MM/DD/YYYY'
        }, {
          type: 'numeric'
        }],
        colHeaders: true,
        columnSorting: true
      });

      hot.sort(2, true); // ASC

      expect(hot.getDataAtRow(0)).toEqual(['Opel', 'Astra', '02/02/2004', 7000]);
      expect(hot.getDataAtRow(1)).toEqual(['Mercedes', 'A 160', '01/14/2006', 6999.9999]);
      expect(hot.getDataAtRow(2)).toEqual(['Citroen', 'C4 Coupe', '12/01/2008', 8330]);
      expect(hot.getDataAtRow(3)).toEqual(['BMW', '320i Coupe', '07/24/2011', 30500]);
      expect(hot.getDataAtRow(4)).toEqual(['Audi', 'A4 Avant', '11/19/2011', 33900]);

      hot.sort(2, false); // DESC

      expect(hot.getDataAtRow(0)).toEqual(['Audi', 'A4 Avant', '11/19/2011', 33900]);
      expect(hot.getDataAtRow(1)).toEqual(['BMW', '320i Coupe', '07/24/2011', 30500]);
      expect(hot.getDataAtRow(2)).toEqual(['Citroen', 'C4 Coupe', '12/01/2008', 8330]);
      expect(hot.getDataAtRow(3)).toEqual(['Mercedes', 'A 160', '01/14/2006', 6999.9999]);
      expect(hot.getDataAtRow(4)).toEqual(['Opel', 'Astra', '02/02/2004', 7000]);
    });

    it('should sort date columns (DD/MM/YYYY)', () => {
      var hot = handsontable({
        data: [['Mercedes', 'A 160', '01/12/2012', 6999.9999], ['Citroen', 'C4 Coupe', '12/01/2013', 8330], ['Audi', 'A4 Avant', '11/10/2014', 33900], ['Opel', 'Astra', '02/02/2015', 7000], ['BMW', '320i Coupe', '07/02/2013', 30500]],
        columns: [{}, {}, {
          type: 'date',
          dateFormat: 'DD/MM/YYYY'
        }, {
          type: 'numeric'
        }],
        colHeaders: true,
        columnSorting: true
      });

      hot.sort(2, true); // ASC

      expect(hot.getDataAtRow(0)).toEqual(['Mercedes', 'A 160', '01/12/2012', 6999.9999]);
      expect(hot.getDataAtRow(1)).toEqual(['Citroen', 'C4 Coupe', '12/01/2013', 8330]);
      expect(hot.getDataAtRow(2)).toEqual(['BMW', '320i Coupe', '07/02/2013', 30500]);
      expect(hot.getDataAtRow(3)).toEqual(['Audi', 'A4 Avant', '11/10/2014', 33900]);
      expect(hot.getDataAtRow(4)).toEqual(['Opel', 'Astra', '02/02/2015', 7000]);

      hot.sort(2, false); // DESC

      expect(hot.getDataAtRow(0)).toEqual(['Opel', 'Astra', '02/02/2015', 7000]);
      expect(hot.getDataAtRow(1)).toEqual(['Audi', 'A4 Avant', '11/10/2014', 33900]);
      expect(hot.getDataAtRow(2)).toEqual(['BMW', '320i Coupe', '07/02/2013', 30500]);
      expect(hot.getDataAtRow(3)).toEqual(['Citroen', 'C4 Coupe', '12/01/2013', 8330]);
      expect(hot.getDataAtRow(4)).toEqual(['Mercedes', 'A 160', '01/12/2012', 6999.9999]);
    });

    it('should sort date columns (MMMM Do YYYY)', () => {
      var hot = handsontable({
        data: [['Mercedes', 'A 160', 'October 28th 2016', 6999.9999], ['Citroen', 'C4 Coupe', 'October 27th 2001', 8330], ['Audi', 'A4 Avant', 'July 8th 1999', 33900], ['Opel', 'Astra', 'June 1st 2001', 7000], ['BMW', '320i Coupe', 'August 3rd 2001', 30500]],
        columns: [{}, {}, {
          type: 'date',
          dateFormat: 'MMMM Do YYYY'
        }, {
          type: 'numeric'
        }],
        colHeaders: true,
        columnSorting: true
      });

      hot.sort(2, true); // ASC

      expect(hot.getDataAtRow(0)).toEqual(['Audi', 'A4 Avant', 'July 8th 1999', 33900]);
      expect(hot.getDataAtRow(1)).toEqual(['Opel', 'Astra', 'June 1st 2001', 7000]);
      expect(hot.getDataAtRow(2)).toEqual(['BMW', '320i Coupe', 'August 3rd 2001', 30500]);
      expect(hot.getDataAtRow(3)).toEqual(['Citroen', 'C4 Coupe', 'October 27th 2001', 8330]);
      expect(hot.getDataAtRow(4)).toEqual(['Mercedes', 'A 160', 'October 28th 2016', 6999.9999]);

      hot.sort(2, false); // DESC

      expect(hot.getDataAtRow(0)).toEqual(['Mercedes', 'A 160', 'October 28th 2016', 6999.9999]);
      expect(hot.getDataAtRow(1)).toEqual(['Citroen', 'C4 Coupe', 'October 27th 2001', 8330]);
      expect(hot.getDataAtRow(2)).toEqual(['BMW', '320i Coupe', 'August 3rd 2001', 30500]);
      expect(hot.getDataAtRow(3)).toEqual(['Opel', 'Astra', 'June 1st 2001', 7000]);
      expect(hot.getDataAtRow(4)).toEqual(['Audi', 'A4 Avant', 'July 8th 1999', 33900]);
    });

    it('should sort date columns along with empty and null values', () => {
      var hot = handsontable({
        data: [['Mercedes', 'A 160', '01/14/2006', 6999.9999], ['Citroen', 'C4 Coupe', '12/01/2008', 8330], ['Citroen', 'C4 Coupe null', null, 8330], ['Citroen', 'C4 Coupe empty', '', 8330], ['Audi', 'A4 Avant', '11/19/2011', 33900], ['Opel', 'Astra', '02/02/2004', 7000], ['BMW', '320i Coupe', '07/24/2011', 30500]],
        columns: [{}, {}, {
          type: 'date',
          dateFormat: 'mm/dd/yy'
        }, {
          type: 'numeric'
        }],
        colHeaders: true,
        columnSorting: true
      });

      hot.sort(2, true); // ASC

      expect(hot.getDataAtRow(0)).toEqual(['Mercedes', 'A 160', '01/14/2006', 6999.9999]);
      expect(hot.getDataAtRow(1)).toEqual(['Opel', 'Astra', '02/02/2004', 7000]);
      expect(hot.getDataAtRow(2)).toEqual(['BMW', '320i Coupe', '07/24/2011', 30500]);
      expect(hot.getDataAtRow(3)).toEqual(['Audi', 'A4 Avant', '11/19/2011', 33900]);
      expect(hot.getDataAtRow(4)).toEqual(['Citroen', 'C4 Coupe', '12/01/2008', 8330]);

      hot.sort(2, false); // DESC

      expect(hot.getDataAtRow(0)).toEqual(['Citroen', 'C4 Coupe', '12/01/2008', 8330]);
      expect(hot.getDataAtRow(1)).toEqual(['Audi', 'A4 Avant', '11/19/2011', 33900]);
      expect(hot.getDataAtRow(2)).toEqual(['BMW', '320i Coupe', '07/24/2011', 30500]);
      expect(hot.getDataAtRow(3)).toEqual(['Opel', 'Astra', '02/02/2004', 7000]);
      expect(hot.getDataAtRow(4)).toEqual(['Mercedes', 'A 160', '01/14/2006', 6999.9999]);
    });
  });

  describe('data type: time', () => {
    it('should properly rewrite time into correct format after sort', done => {
      var hot = handsontable({
        data: [['0:00:01 am'], ['5:30:14 pm'], ['8:00:00 pm'], ['11:15:05 am'], ['4:07:48 am']],
        columns: [{
          type: 'time',
          dateFormat: 'h:mm:ss a',
          correctFormat: true
        }],
        colHeaders: true,
        columnSorting: {
          column: 0,
          sortOrder: false
        }
      });

      hot.setDataAtCell(0, 0, '19:55', 'edit');

      setTimeout(() => {
        expect(hot.getDataAtCell(0, 0)).toEqual('7:55:00 pm');
        done();
      }, 250);
    });
  });

  it('should properly sort numeric data', function () {
    var hot = handsontable({
      data: [['Mercedes', 'A 160', '01/14/2006', '6999.9999'], ['Citroen', 'C4 Coupe', '12/01/2008', 8330], ['Citroen', 'C4 Coupe null', null, '8330'], ['Citroen', 'C4 Coupe empty', '', 8333], ['Audi', 'A4 Avant', '11/19/2011', '33900'], ['Opel', 'Astra', '02/02/2004', '7000'], ['BMW', '320i Coupe', '07/24/2011', 30500]],
      columns: [{}, {}, {}, {
        type: 'numeric'
      }],
      colHeaders: true,
      columnSorting: true
    });

    var htCore = getHtCore();

    this.sortByColumn(3);

    expect(hot.getDataAtCol(3)).toEqual(['6999.9999', '7000', 8330, '8330', 8333, 30500, '33900']);

    this.sortByColumn(3);

    expect(hot.getDataAtCol(3)).toEqual(['33900', 30500, 8333, 8330, '8330', '7000', '6999.9999']);

    this.sortByColumn(3);

    expect(hot.getDataAtCol(3)).toEqual(['6999.9999', 8330, '8330', 8333, '33900', '7000', 30500]);
  });

  it('numericSort comparing function shouldn\'t change order when comparing empty string, null and undefined', () => {
    var hot = handsontable({});
    var numericSort = hot.getPlugin('columnSorting').numericSort;

    expect(numericSort(false, {})(['key1', null], ['key2', null])).toEqual(0);
    expect(numericSort(false, {})(['key1', ''], ['key2', ''])).toEqual(0);
    expect(numericSort(false, {})(['key1', undefined], ['key2', undefined])).toEqual(0);

    expect(numericSort(false, {})(['key1', ''], ['key2', null])).toEqual(0);
    expect(numericSort(false, {})(['key1', null], ['key2', ''])).toEqual(0);

    expect(numericSort(false, {})(['key1', ''], ['key2', undefined])).toEqual(0);
    expect(numericSort(false, {})(['key1', undefined], ['key2', ''])).toEqual(0);

    expect(numericSort(false, {})(['key1', null], ['key2', undefined])).toEqual(0);
    expect(numericSort(false, {})(['key1', undefined], ['key2', null])).toEqual(0);
  });

  it('should sort table with multiple row headers', function () {
    var hot = handsontable({
      data: [[1, 'B'], [0, 'D'], [3, 'A'], [2, 'C']],
      columns: [{}, {}, {
        type: 'date',
        dateFormat: 'mm/dd/yy'
      }, {
        type: 'numeric'
      }],
      colHeaders: true,
      columnSorting: true,
      removeRowPlugin: true // this plugin ads an extra row header, so now we have 2 instead of 1
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');

    this.sortByColumn(0); // sort by first column

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');

    expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('D');

    this.sortByColumn(1); // sort by second column

    expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('A');
  });

  it('should allow to define sorting column and order during initialization', function () {
    var hot = handsontable({
      data: [[1, 'B'], [0, 'D'], [3, 'A'], [2, 'C']],
      colHeaders: true,
      columnSorting: {
        column: 0,
        sortOrder: true
      }
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');
    expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('D');
  });

  it('should allow to change sorting column with updateSettings', function () {
    var hot = handsontable({
      data: [[1, 'B'], [0, 'D'], [3, 'A'], [2, 'C']],
      colHeaders: true,
      columnSorting: {
        column: 0,
        sortOrder: true
      }
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');
    expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('D');

    updateSettings({
      columnSorting: {
        column: 1,
        sortOrder: true
      }
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('3');
    expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('A');
  });

  it('should allow to change sorting order with updateSettings', function () {
    var hot = handsontable({
      data: [[1, 'B'], [0, 'D'], [3, 'A'], [2, 'C']],
      colHeaders: true,
      columnSorting: {
        column: 0,
        sortOrder: true
      }
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');

    updateSettings({
      columnSorting: {
        column: 0,
        sortOrder: false
      }
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('3');
  });

  it('should allow to change if sorting empty cells with updateSettings', () => {
    var hot = handsontable({
      data: [[1, 'B'], [2, ''], [3, 'A'], [4, ''], [6, 'E'], [7, ''], [8, 'F']],
      colHeaders: true,
      columnSorting: {
        column: 1,
        sortOrder: false,
        sortEmptyCells: false
      }
    });

    updateSettings({
      columnSorting: {
        column: 1,
        sortOrder: true,
        sortEmptyCells: true
      }
    });

    // ASC with empty cells sorting
    expect(hot.getDataAtCol(0)).toEqual([2, 4, 7, 3, 1, 6, 8]);

    updateSettings({
      columnSorting: {
        column: 1,
        sortOrder: true,
        sortEmptyCells: false
      }
    });

    // ASC without empty cells sorting
    expect(hot.getDataAtCol(0)).toEqual([3, 1, 6, 8, 2, 4, 7]);
  });

  it('should NOT sort spare rows', () => {
    var myData = [{ a: 'aaa', b: 2, c: 3 }, { a: 'z', b: 11, c: -4 }, { a: 'dddd', b: 13, c: 13 }, { a: 'bbbb', b: 10, c: 11 }];

    function customIsEmptyRow(row) {
      var data = this.getSourceData();
      return data[row].isNew;
    }

    handsontable({
      data: myData,
      rowHeaders: true,
      colHeaders: ['A', 'B', 'C'],
      columns: [{ data: 'a', type: 'text' }, { data: 'b', type: 'text' }, { data: 'c', type: 'text' }],
      dataSchema: { isNew: true, a: false }, // default for a to avoid #bad value#
      columnSorting: true,
      minSpareRows: 3,
      isEmptyRow: customIsEmptyRow
    });

    // ASC

    updateSettings({
      columnSorting: {
        column: 0,
        sortOrder: true
      }
    });

    expect(getData()).toEqual([['aaa', 2, 3], ['bbbb', 10, 11], ['dddd', 13, 13], ['z', 11, -4], [false, null, null], [false, null, null], [false, null, null]]);

    updateSettings({
      columnSorting: {
        column: 0,
        sortOrder: false
      }
    });

    expect(getData()).toEqual([['z', 11, -4], ['dddd', 13, 13], ['bbbb', 10, 11], ['aaa', 2, 3], [false, null, null], [false, null, null], [false, null, null]]);
  });

  it('should reset column sorting with updateSettings', function () {
    var hot = handsontable({
      data: [[1, 'B'], [0, 'D'], [3, 'A'], [2, 'C']],
      colHeaders: true,
      columnSorting: {
        column: 0,
        sortOrder: true
      }
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');

    updateSettings({
      columnSorting: void 0
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
  });

  it('should expose sort method when columnSorting is enabled', () => {
    var hot = handsontable();

    expect(hot.getSettings().columnSorting).toBeFalsy();
    expect(hot.sort).toBeUndefined();

    updateSettings({
      columnSorting: true
    });

    expect(hot.getSettings().columnSorting).toBe(true);
    expect(hot.sort).toBeDefined();
    expect(typeof hot.sort).toBe('function');

    updateSettings({
      columnSorting: false
    });

    expect(hot.getSettings().columnSorting).toBeFalsy();
    expect(hot.sort).toBeUndefined();
  });

  it('should sort table using HOT.sort method', function () {
    var hot = handsontable({
      data: [[1, 'B'], [0, 'D'], [3, 'A'], [2, 'C']],
      columnSorting: true
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
    expect(this.$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('0');
    expect(this.$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('3');
    expect(this.$container.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('2');

    hot.sort(0, true);

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');
    expect(this.$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('1');
    expect(this.$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('2');
    expect(this.$container.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('3');
  });

  it('should reset column sorting with updateSettings', function () {
    var hot = handsontable({
      data: [[1, 'B'], [0, 'D'], [3, 'A'], [2, 'C']],
      colHeaders: true,
      columnSorting: {
        column: 0,
        sortOrder: true
      }
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');

    updateSettings({
      columnSorting: void 0
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
  });

  it('should fire beforeColumnSort event before sorting data', function () {
    var hot = handsontable({
      data: [[2], [4], [1], [3]],
      columnSorting: true
    });

    this.beforeColumnSortHandler = function () {
      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('2');
      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('4');
      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('3');
    };

    spyOn(this, 'beforeColumnSortHandler');

    hot.addHook('beforeColumnSort', this.beforeColumnSortHandler);

    var sortColumn = 0;
    var sortOrder = true;

    hot.sort(sortColumn, sortOrder);

    expect(this.beforeColumnSortHandler.calls.count()).toEqual(1);
    expect(this.beforeColumnSortHandler).toHaveBeenCalledWith(sortColumn, sortOrder, void 0, void 0, void 0, void 0);
  });

  it('should not sorting column when beforeColumnSort returns false', done => {
    var hot = handsontable({
      data: [[2], [4], [1], [3]],
      columnSorting: true,
      beforeColumnSort() {
        return false;
      }
    });

    hot.sort(0, true);

    setTimeout(() => {
      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('2');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('4');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('1');
      expect(spec().$container.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('3');
      done();
    }, 200);
  });

  it('should add beforeColumnSort event listener in constructor', () => {
    var beforeColumnSortCallback = jasmine.createSpy('beforeColumnSortHandler');

    var hot = handsontable({
      data: [[2], [4], [1], [3]],
      columnSorting: true,
      beforeColumnSort: beforeColumnSortCallback
    });

    var sortColumn = 0;
    var sortOrder = true;

    hot.sort(sortColumn, sortOrder);

    expect(beforeColumnSortCallback.calls.count()).toEqual(1);
    expect(beforeColumnSortCallback).toHaveBeenCalledWith(sortColumn, sortOrder, void 0, void 0, void 0, void 0);
  });

  it('should fire afterColumnSort event before data has been sorted but before table render', () => {
    var hot = handsontable({
      data: [[2], [4], [1], [3]],
      columnSorting: true
    });
    var rendered = false;
    var afterColumnSortHandler = jasmine.createSpy('afterColumnSortHandler');
    var afterRenderSpy = jasmine.createSpy('afterRender');

    hot.addHook('afterColumnSort', function () {
      expect(rendered).toBe(false);
      afterColumnSortHandler.apply(afterColumnSortHandler, arguments);
    });
    hot.addHook('afterRender', function () {
      rendered = true;
      afterRenderSpy.apply(afterRenderSpy, arguments);
    });

    var sortColumn = 0;
    var sortOrder = true;
    afterRenderSpy.calls.reset();

    hot.sort(sortColumn, sortOrder);

    expect(afterColumnSortHandler.calls.count()).toBe(1);
    expect(afterColumnSortHandler).toHaveBeenCalledWith(sortColumn, sortOrder, void 0, void 0, void 0, void 0);
    expect(afterRenderSpy.calls.count()).toBe(1);
  });

  it('should add afterColumnSort event listener in constructor', () => {
    var afterColumnSortCallback = jasmine.createSpy('afterColumnSortHandler');

    var hot = handsontable({
      data: [[2], [4], [1], [3]],
      columnSorting: true,
      afterColumnSort: afterColumnSortCallback
    });

    var sortColumn = 0;
    var sortOrder = true;

    hot.sort(sortColumn, sortOrder);

    expect(afterColumnSortCallback.calls.count()).toEqual(1);
    expect(afterColumnSortCallback).toHaveBeenCalledWith(sortColumn, sortOrder, void 0, void 0, void 0, void 0);
  });

  it('should insert row when plugin is enabled, but table hasn\'t been sorted', () => {
    var hot = handsontable({
      data: [[1, 'B'], [0, 'D'], [3, 'A'], [2, 'C']],
      columnSorting: true
    });

    expect(countRows()).toEqual(4);
    expect(hot.sortColumn).toBeUndefined();

    alter('insert_row');

    expect(countRows()).toEqual(5);
  });

  it('should remove row when plugin is enabled, but table hasn\'t been sorted', () => {
    var hot = handsontable({
      data: [[1, 'B'], [0, 'D'], [3, 'A'], [2, 'C']],
      columnSorting: true
    });

    expect(countRows()).toEqual(4);
    expect(hot.sortColumn).toBeUndefined();

    alter('remove_row');

    expect(countRows()).toEqual(3);
  });

  it('should display new row added directly to dataSource, when observeChanges plugin is enabled', function (done) {
    var data = [[1, 'B'], [0, 'A'], [3, 'D'], [2, 'C']];

    var hot = handsontable({
      data,
      colHeaders: true,
      columnSorting: true,
      observeChanges: true
    });

    var htCore = getHtCore();

    expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
    expect(htCore.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('0');
    expect(htCore.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('3');
    expect(htCore.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('2');

    this.sortByColumn(0);

    expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');
    expect(htCore.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('1');
    expect(htCore.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('2');
    expect(htCore.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('3');

    expect(htCore.find('tbody tr').length).toEqual(4);

    var afterChangesObservedCallback = jasmine.createSpy('afterChangesObservedCallback');
    hot.addHook('afterChangesObserved', afterChangesObservedCallback);

    data.push([5, 'E']);

    setTimeout(() => {
      expect(countRows()).toEqual(5);
      expect(spec().$container.find('tbody tr:eq(4) td:eq(0)').text()).toEqual('5');
      expect(spec().$container.find('tbody tr:eq(4) td:eq(1)').text()).toEqual('E');
      done();
    }, 200);
  });

  it('should not display new row added directly to dataSource, when observeChanges plugin is explicitly disabled', function (done) {
    var data = [[1, 'B'], [0, 'A'], [3, 'D'], [2, 'C']];

    var hot = handsontable({
      data,
      colHeaders: true,
      columnSorting: true,
      observeChanges: false
    });

    var afterChangesObservedCallback = jasmine.createSpy('afterChangesObservedCallback');
    hot.addHook('afterChangesObserved', afterChangesObservedCallback);

    var htCore = getHtCore();

    expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
    expect(htCore.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('0');
    expect(htCore.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('3');
    expect(htCore.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('2');

    this.sortByColumn(0);

    expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');
    expect(htCore.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('1');
    expect(htCore.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('2');
    expect(htCore.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('3');
    expect(htCore.find('tbody tr').length).toEqual(4);

    data.push([5, 'E']);

    setTimeout(() => {
      expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');
      expect(htCore.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('1');
      expect(htCore.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('2');
      expect(htCore.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('3');
      expect(htCore.find('tbody tr').length).toEqual(4);
      expect(afterChangesObservedCallback).not.toHaveBeenCalled();
      done();
    }, 100);
  });

  it('should display new row added directly to dataSource, when observeChanges plugin status is undefined', done => {
    var data = [[1, 'B'], [0, 'A'], [3, 'D'], [2, 'C']];

    var onUpdateSettings = jasmine.createSpy('onUpdateSettings');

    var hot = handsontable({
      data,
      colHeaders: true,
      columnSorting: true,
      afterUpdateSettings: onUpdateSettings
    });

    var afterChangesObservedCallback = jasmine.createSpy('afterChangesObservedCallback');
    hot.addHook('afterChangesObserved', afterChangesObservedCallback);

    var htCore = getHtCore();

    // columnSorting enables observeChanges plugin by asynchronously invoking updateSettings
    setTimeout(() => {
      expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
      expect(htCore.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('0');
      expect(htCore.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('3');
      expect(htCore.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('2');

      spec().sortByColumn(0);

      expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');
      expect(htCore.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('1');
      expect(htCore.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('2');
      expect(htCore.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('3');
      expect(htCore.find('tbody tr').length).toEqual(4);

      data.push([5, 'E']);
    }, 100);

    setTimeout(() => {
      expect(countRows()).toEqual(5);
      expect(htCore.find('tbody tr:eq(4) td:eq(0)').text()).toEqual('5');
      expect(htCore.find('tbody tr:eq(4) td:eq(1)').text()).toEqual('E');
      done();
    }, 2000); // 2s delayed needs for safari env
  });

  it('should apply sorting when there are two tables and only one has sorting enabled and has been already sorted (#1020)', function () {
    var hot = handsontable({
      data: [[1, 'B'], [0, 'D'], [3, 'A'], [2, 'C']],
      columnSorting: {
        column: 1
      }
    });

    this.$container2 = $(`<div id="${id}-2"></div>`).appendTo('body');
    this.$container2.handsontable();
    var hot2 = this.$container2.handsontable('getInstance');

    selectCell(0, 1);
    keyDown('enter');
    expect($('.handsontableInput').val()).toEqual('A');

    this.$container2.handsontable('destroy');
    this.$container2.remove();
  });

  it('should reset sorting after loading new data', function () {
    var hot = handsontable({
      data: [[1, 'B'], [0, 'D'], [3, 'A'], [2, 'C']],
      columnSorting: true
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
    expect(this.$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('0');
    expect(this.$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('3');
    expect(this.$container.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('2');

    hot.sort(0, true);

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');
    expect(this.$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('1');
    expect(this.$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('2');
    expect(this.$container.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('3');

    loadData([[50, 'E'], [10, 'G'], [30, 'F'], [60, 'I'], [40, 'J'], [20, 'H']]);

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('50');
    expect(this.$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('10');
    expect(this.$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('30');
    expect(this.$container.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('60');
    expect(this.$container.find('tbody tr:eq(4) td:eq(0)').text()).toEqual('40');
    expect(this.$container.find('tbody tr:eq(5) td:eq(0)').text()).toEqual('20');
  });

  it('should reset sorting after loading new data (default sorting column and order set)', function () {
    var hot = handsontable({
      data: [[1, 'B'], [0, 'D'], [3, 'A'], [2, 'C']],
      columnSorting: {
        column: 1,
        sortOrder: true
      }
    });

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('3');
    expect(this.$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('1');
    expect(this.$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('2');
    expect(this.$container.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('0');

    expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('A');
    expect(this.$container.find('tbody tr:eq(1) td:eq(1)').text()).toEqual('B');
    expect(this.$container.find('tbody tr:eq(2) td:eq(1)').text()).toEqual('C');
    expect(this.$container.find('tbody tr:eq(3) td:eq(1)').text()).toEqual('D');

    hot.sort(0, true);

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('0');
    expect(this.$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('1');
    expect(this.$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('2');
    expect(this.$container.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('3');

    loadData([[50, 'E'], [10, 'G'], [30, 'F'], [60, 'I'], [40, 'J'], [20, 'H']]);

    expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('50');
    expect(this.$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('30');
    expect(this.$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('10');
    expect(this.$container.find('tbody tr:eq(3) td:eq(0)').text()).toEqual('20');
    expect(this.$container.find('tbody tr:eq(4) td:eq(0)').text()).toEqual('60');
    expect(this.$container.find('tbody tr:eq(5) td:eq(0)').text()).toEqual('40');

    expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('E');
    expect(this.$container.find('tbody tr:eq(1) td:eq(1)').text()).toEqual('F');
    expect(this.$container.find('tbody tr:eq(2) td:eq(1)').text()).toEqual('G');
    expect(this.$container.find('tbody tr:eq(3) td:eq(1)').text()).toEqual('H');
    expect(this.$container.find('tbody tr:eq(4) td:eq(1)').text()).toEqual('I');
    expect(this.$container.find('tbody tr:eq(5) td:eq(1)').text()).toEqual('J');
  });

  it('should return updated data at specyfied row after sorted', function () {
    var hot = handsontable({
      data: [[1, 'Ted', 'Right'], [2, 'Frank', 'Honest'], [3, 'Joan', 'Well'], [4, 'Sid', 'Strong'], [5, 'Jane', 'Neat']],
      colHeaders: true,
      rowHeaders: true,
      columnSorting: true
    });

    this.sortByColumn(0);

    expect(getDataAtRow(0)).toEqual([1, 'Ted', 'Right']);
    expect(getDataAtRow(4)).toEqual([5, 'Jane', 'Neat']);

    this.sortByColumn(0);

    expect(getDataAtRow(0)).toEqual([5, 'Jane', 'Neat']);
    expect(getDataAtRow(4)).toEqual([1, 'Ted', 'Right']);

    this.sortByColumn(0);

    expect(getDataAtRow(0)).toEqual([1, 'Ted', 'Right']);
    expect(getDataAtRow(4)).toEqual([5, 'Jane', 'Neat']);
  });

  it('should return updated data at specyfied col after sorted', function () {
    var hot = handsontable({
      data: [[1, 'Ted', 'Right'], [2, 'Frank', 'Honest'], [3, 'Joan', 'Well'], [4, 'Sid', 'Strong'], [5, 'Jane', 'Neat']],
      colHeaders: true,
      rowHeaders: true,
      columnSorting: true
    });

    this.sortByColumn(0);

    expect(getDataAtCol(0)).toEqual([1, 2, 3, 4, 5]);
    expect(getDataAtCol(1)).toEqual(['Ted', 'Frank', 'Joan', 'Sid', 'Jane']);

    this.sortByColumn(0);

    expect(getDataAtCol(0)).toEqual([5, 4, 3, 2, 1]);
    expect(getDataAtCol(1)).toEqual(['Jane', 'Sid', 'Joan', 'Frank', 'Ted']);

    this.sortByColumn(0);

    expect(getDataAtCol(0)).toEqual([1, 2, 3, 4, 5]);
    expect(getDataAtCol(1)).toEqual(['Ted', 'Frank', 'Joan', 'Sid', 'Jane']);
  });

  it('should return original data source at specified row after sorted', function () {
    var hot = handsontable({
      data: [[1, 'Ted', 'Right'], [2, 'Frank', 'Honest'], [3, 'Joan', 'Well'], [4, 'Sid', 'Strong'], [5, 'Jane', 'Neat']],
      colHeaders: true,
      rowHeaders: true,
      columnSorting: true
    });

    this.sortByColumn(0);

    expect(getDataAtRow(0)).toEqual([1, 'Ted', 'Right']);
    expect(getDataAtRow(4)).toEqual([5, 'Jane', 'Neat']);

    expect(getSourceDataAtRow(0)).toEqual([1, 'Ted', 'Right']);
    expect(getSourceDataAtRow(4)).toEqual([5, 'Jane', 'Neat']);

    this.sortByColumn(0);

    expect(getDataAtRow(0)).toEqual([5, 'Jane', 'Neat']);
    expect(getDataAtRow(4)).toEqual([1, 'Ted', 'Right']);

    expect(getSourceDataAtRow(0)).toEqual([1, 'Ted', 'Right']);
    expect(getSourceDataAtRow(4)).toEqual([5, 'Jane', 'Neat']);
  });

  it('should return original data source at specified col after sorted', function () {
    var hot = handsontable({
      data: [[1, 'Ted', 'Right'], [2, 'Frank', 'Honest'], [3, 'Joan', 'Well'], [4, 'Sid', 'Strong'], [5, 'Jane', 'Neat']],
      colHeaders: true,
      rowHeaders: true,
      columnSorting: true
    });

    this.sortByColumn(0);

    expect(getDataAtCol(0)).toEqual([1, 2, 3, 4, 5]);
    expect(getDataAtCol(1)).toEqual(['Ted', 'Frank', 'Joan', 'Sid', 'Jane']);

    expect(getSourceDataAtCol(0)).toEqual([1, 2, 3, 4, 5]);
    expect(getSourceDataAtCol(1)).toEqual(['Ted', 'Frank', 'Joan', 'Sid', 'Jane']);

    this.sortByColumn(0);

    expect(getDataAtCol(0)).toEqual([5, 4, 3, 2, 1]);
    expect(getDataAtCol(1)).toEqual(['Jane', 'Sid', 'Joan', 'Frank', 'Ted']);

    expect(getSourceDataAtCol(0)).toEqual([1, 2, 3, 4, 5]);
    expect(getSourceDataAtCol(1)).toEqual(['Ted', 'Frank', 'Joan', 'Sid', 'Jane']);

    this.sortByColumn(0);

    expect(getDataAtCol(0)).toEqual([1, 2, 3, 4, 5]);
    expect(getDataAtCol(1)).toEqual(['Ted', 'Frank', 'Joan', 'Sid', 'Jane']);

    expect(getSourceDataAtCol(0)).toEqual([1, 2, 3, 4, 5]);
    expect(getSourceDataAtCol(1)).toEqual(['Ted', 'Frank', 'Joan', 'Sid', 'Jane']);
  });

  it('should ignore case when sorting', function () {
    var hot = handsontable({
      data: [[1, 'albuquerque'], [2, 'Alabama'], [3, 'Missouri']],
      colHeaders: true,
      columnSorting: true
    });

    this.sortByColumn(1);
    expect(getDataAtCol(0)).toEqual([2, 1, 3]);
    expect(getDataAtCol(1)).toEqual(['Alabama', 'albuquerque', 'Missouri']);

    this.sortByColumn(1);
    expect(getDataAtCol(0)).toEqual([3, 1, 2]);
    expect(getDataAtCol(1)).toEqual(['Missouri', 'albuquerque', 'Alabama']);
  });

  it('should push empty cells to the end of sorted column', function () {
    var hot = handsontable({
      data: [[1, 'Ted', 'Right'], [2, '', 'Honest'], [3, '', 'Well'], [4, 'Sid', 'Strong'], [5, 'Jane', 'Neat']],
      colHeaders: true,
      rowHeaders: true,
      columnSorting: true,
      minSpareRows: 1
    });

    this.sortByColumn(1);
    expect(getDataAtCol(0)).toEqual([5, 4, 1, 2, 3, null]);
    expect(getDataAtCol(1)).toEqual(['Jane', 'Sid', 'Ted', '', '', null]);

    this.sortByColumn(1);
    expect(getDataAtCol(0)).toEqual([1, 4, 5, 2, 3, null]);
    expect(getDataAtCol(1)).toEqual(['Ted', 'Sid', 'Jane', '', '', null]);
  });

  it('should push numeric values before non-numeric values, when sorting ascending using the default sorting function', function () {
    var hot = handsontable({
      data: [[1, 'Ted', 123], [2, '', 'Some'], [3, '', 321], [4, 'Sid', 'String'], [5, 'Jane', 46]],
      colHeaders: true,
      columnSorting: true
    });

    this.sortByColumn(2);
    expect(getDataAtCol(2)).toEqual([46, 123, 321, 'Some', 'String']);

    this.sortByColumn(2);
    expect(getDataAtCol(2)).toEqual(['String', 'Some', 321, 123, 46]);
  });

  it('should add a sorting indicator to the column header after it\'s been sorted, only if sortIndicator property is set to true', function () {
    var hot = handsontable({
      data: [[1, 'Ted', 'Right'], [2, '', 'Honest'], [3, '', 'Well'], [4, 'Sid', 'Strong'], [5, 'Jane', 'Neat']],
      colHeaders: true,
      columnSorting: true
    });

    this.sortByColumn(1);

    var sortedColumn = this.$container.find('th span.columnSorting')[1],
        afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');

    expect(afterValue === '' || afterValue === 'none').toBe(true);

    // ---------------------------------
    // INDICATOR SET FOR THE WHOLE TABLE
    // ---------------------------------

    hot.updateSettings({
      sortIndicator: true
    });

    this.sortByColumn(1);

    // descending (updateSettings doesn't reset sorting stack)
    sortedColumn = this.$container.find('th span.columnSorting')[1];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue.indexOf(String.fromCharCode(9660))).toBeGreaterThan(-1);

    this.sortByColumn(1);

    sortedColumn = this.$container.find('th span.columnSorting')[1];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue === '' || afterValue === 'none').toBe(true);

    this.sortByColumn(1);

    // ascending
    sortedColumn = this.$container.find('th span.columnSorting')[1];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');

    expect(afterValue.indexOf(String.fromCharCode(9650))).toBeGreaterThan(-1);

    // ---------------------------------
    // INDICATOR SET FOR A SINGLE COLUMN
    // ---------------------------------

    hot.updateSettings({
      sortIndicator: void 0,
      columns: [{}, {}, { sortIndicator: true }]
    });

    this.sortByColumn(0);

    sortedColumn = this.$container.find('th span.columnSorting')[0];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue === '' || afterValue === 'none').toBe(true);

    this.sortByColumn(1);

    // descending
    sortedColumn = this.$container.find('th span.columnSorting')[1];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue === '' || afterValue === 'none').toBe(true);

    this.sortByColumn(2);

    sortedColumn = this.$container.find('th span.columnSorting')[2];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue.indexOf(String.fromCharCode(9650))).toBeGreaterThan(-1);
  });

  it('should change sorting indicator state on every `hot.sort()` method call (continuously for the same column)', function () {
    var hot = handsontable({
      data: [[1, 'Ted', 'Right'], [2, '', 'Honest'], [3, '', 'Well'], [4, 'Sid', 'Strong'], [5, 'Jane', 'Neat']],
      colHeaders: true,
      columnSorting: true,
      sortIndicator: true
    });

    hot.sort(1);

    // ascending
    var sortedColumn = this.$container.find('th span.columnSorting')[1];
    var afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue.indexOf(String.fromCharCode(9650))).toBeGreaterThan(-1);

    hot.sort(1);

    // descending
    sortedColumn = this.$container.find('th span.columnSorting')[1];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue.indexOf(String.fromCharCode(9660))).toBeGreaterThan(-1);

    hot.sort(1);

    sortedColumn = this.$container.find('th span.columnSorting')[1];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue === '' || afterValue === 'none').toBe(true);

    hot.sort(1);

    // ascending
    sortedColumn = this.$container.find('th span.columnSorting')[1];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue.indexOf(String.fromCharCode(9650))).toBeGreaterThan(-1);

    hot.sort(1);

    // descending
    sortedColumn = this.$container.find('th span.columnSorting')[1];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue.indexOf(String.fromCharCode(9660))).toBeGreaterThan(-1);
  });

  it('should change sorting indicator state on every `hot.sort()` method (calling for different columns)', function () {
    var hot = handsontable({
      data: [[1, 'Ted', 'Right'], [2, '', 'Honest'], [3, '', 'Well'], [4, 'Sid', 'Strong'], [5, 'Jane', 'Neat']],
      colHeaders: true,
      columnSorting: true,
      sortIndicator: true
    });

    hot.sort(1);

    // ascending
    var sortedColumn = this.$container.find('th span.columnSorting')[1];
    var afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue.indexOf(String.fromCharCode(9650))).toBeGreaterThan(-1);

    hot.sort(2);

    // ascending
    sortedColumn = this.$container.find('th span.columnSorting')[2];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue.indexOf(String.fromCharCode(9650))).toBeGreaterThan(-1);

    hot.sort(1);

    // ascending
    sortedColumn = this.$container.find('th span.columnSorting')[1];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue.indexOf(String.fromCharCode(9650))).toBeGreaterThan(-1);

    hot.sort(2, false);

    // descending
    sortedColumn = this.$container.find('th span.columnSorting')[2];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue.indexOf(String.fromCharCode(9660))).toBeGreaterThan(-1);

    hot.sort(2, false);

    // descending
    sortedColumn = this.$container.find('th span.columnSorting')[2];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue.indexOf(String.fromCharCode(9660))).toBeGreaterThan(-1);

    hot.sort(2, true);

    // ascending
    sortedColumn = this.$container.find('th span.columnSorting')[2];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue.indexOf(String.fromCharCode(9650))).toBeGreaterThan(-1);
  });

  it('should change sorting indicator state when initial column sorting was provided', function () {
    var hot = handsontable({
      data: [[1, 'Ted', 'Right'], [2, '', 'Honest'], [3, '', 'Well'], [4, 'Sid', 'Strong'], [5, 'Jane', 'Neat']],
      colHeaders: true,
      columnSorting: {
        column: 1,
        sortOrder: false
      },
      sortIndicator: true
    });

    // descending
    var sortedColumn = this.$container.find('th span.columnSorting')[1];
    var afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue.indexOf(String.fromCharCode(9660))).toBeGreaterThan(-1);

    hot.sort(1);

    // default
    sortedColumn = this.$container.find('th span.columnSorting')[1];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue === '' || afterValue === 'none').toBe(true);

    hot.sort(1);

    // ascending
    sortedColumn = this.$container.find('th span.columnSorting')[1];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue.indexOf(String.fromCharCode(9650))).toBeGreaterThan(-1);

    hot.sort(1);

    // descending
    sortedColumn = this.$container.find('th span.columnSorting')[1];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue.indexOf(String.fromCharCode(9660))).toBeGreaterThan(-1);

    hot.sort(1);

    // default
    sortedColumn = this.$container.find('th span.columnSorting')[1];
    afterValue = window.getComputedStyle(sortedColumn, ':after').getPropertyValue('content');
    expect(afterValue === '' || afterValue === 'none').toBe(true);
  });

  it('should properly sort the table, when it\'s scrolled to the far right', () => {
    var data = [['Jasmine Ferguson', 'Britney Carey', 'Kelly Decker', 'Lacey Mcleod', 'Leona Shaffer', 'Kelli Ochoa', 'Adele Roberson', 'Viola Snow', 'Barron Cherry', 'Calhoun Lane', 'Elvia Andrews', 'Katheryn Dale', 'Dorthy Hale', 'Munoz Randall', 'Fields Morse', 'Hubbard Nichols', 'Chang Yang', 'Osborn Anthony', 'Owens Warner', 'Gloria Hampton'], ['Lane Hill', 'Belinda Mathews', 'York Gray', 'Celina Stone', 'Victoria Mays', 'Angelina Lott', 'Joyce Mason', 'Shawn Rodriguez', 'Susanna Mayo', 'Wolf Fuller', 'Long Hester', 'Dudley Doyle', 'Wilder Sutton', 'Oneal Avery', 'James Mclaughlin', 'Lenora Guzman', 'Mcmahon Sullivan', 'Abby Weeks', 'Beverly Joseph', 'Rosalind Church'], ['Myrtle Landry', 'Hays Huff', 'Hernandez Benjamin', 'Mclaughlin Garza', 'Franklin Barton', 'Lara Buchanan', 'Ratliff Beck', 'Rosario Munoz', 'Isabelle Dalton', 'Smith Woodard', 'Marjorie Marshall', 'Spears Stein', 'Brianna Bowman', 'Marci Clay', 'Palmer Harrell', 'Ball Levy', 'Shelley Mendoza', 'Morrow Glass', 'Baker Knox', 'Adrian Holman'], ['Trisha Howell', 'Brooke Harrison', 'Anthony Watkins', 'Ellis Cobb', 'Sheppard Dillon', 'Mathis Bray', 'Foreman Burns', 'Lina Glenn', 'Giles Pollard', 'Weiss Ballard', 'Lynnette Smith', 'Flores Kline', 'Graciela Singleton', 'Santiago Mcclure', 'Claudette Battle', 'Nita Holloway', 'Eula Wolfe', 'Pruitt Stokes', 'Felicia Briggs', 'Melba Bradshaw']];

    var hot = handsontable({
      data,
      colHeaders: true,
      columnSorting: true
    });

    hot.view.wt.wtOverlays.leftOverlay.scrollTo(15);
    hot.render();
    hot.sort(15);

    expect(getDataAtCell(0, 15)).toEqual('Ball Levy');
    expect(getDataAtCell(1, 15)).toEqual('Hubbard Nichols');
    expect(getDataAtCell(2, 15)).toEqual('Lenora Guzman');
    expect(getDataAtCell(3, 15)).toEqual('Nita Holloway');

    hot.sort(15);

    expect(getDataAtCell(3, 15)).toEqual('Ball Levy');
    expect(getDataAtCell(2, 15)).toEqual('Hubbard Nichols');
    expect(getDataAtCell(1, 15)).toEqual('Lenora Guzman');
    expect(getDataAtCell(0, 15)).toEqual('Nita Holloway');

    hot.sort(15);

    expect(getDataAtCell(0, 15)).toEqual('Hubbard Nichols');
    expect(getDataAtCell(1, 15)).toEqual('Lenora Guzman');
    expect(getDataAtCell(2, 15)).toEqual('Ball Levy');
    expect(getDataAtCell(3, 15)).toEqual('Nita Holloway');
  });

  it('should allow specifiyng a custom sorting function', () => {
    var data = [['1 inch'], ['1 yard'], ['2 feet'], ['0.2 miles']];
    var hot = handsontable({
      data,
      colHeaders: true,
      columnSorting: true,
      columns: [{
        sortFunction(sortOrder) {
          return function (a, b) {
            var unitsRatios = {
              inch: 1,
              yard: 36,
              feet: 12,
              miles: 63360
            };

            var newA = a[1],
                newB = b[1];

            Handsontable.helper.objectEach(unitsRatios, (val, prop) => {
              if (a[1].indexOf(prop) > -1) {
                newA = parseFloat(a[1].replace(prop, '')) * val;

                return false;
              }
            });

            Handsontable.helper.objectEach(unitsRatios, (val, prop) => {
              if (b[1].indexOf(prop) > -1) {
                newB = parseFloat(b[1].replace(prop, '')) * val;

                return false;
              }
            });

            if (newA < newB) {
              return sortOrder ? -1 : 1;
            }
            if (newA > newB) {
              return sortOrder ? 1 : -1;
            }
            return 0;
          };
        }
      }]
    });

    expect(getDataAtCell(0, 0)).toEqual('1 inch');
    expect(getDataAtCell(1, 0)).toEqual('1 yard');
    expect(getDataAtCell(2, 0)).toEqual('2 feet');
    expect(getDataAtCell(3, 0)).toEqual('0.2 miles');

    hot.sort(0);

    expect(getDataAtCell(0, 0)).toEqual('1 inch');
    expect(getDataAtCell(1, 0)).toEqual('2 feet');
    expect(getDataAtCell(2, 0)).toEqual('1 yard');
    expect(getDataAtCell(3, 0)).toEqual('0.2 miles');

    hot.sort(0);

    expect(getDataAtCell(0, 0)).toEqual('0.2 miles');
    expect(getDataAtCell(1, 0)).toEqual('1 yard');
    expect(getDataAtCell(2, 0)).toEqual('2 feet');
    expect(getDataAtCell(3, 0)).toEqual('1 inch');

    hot.sort(0);

    expect(getDataAtCell(0, 0)).toEqual('1 inch');
    expect(getDataAtCell(1, 0)).toEqual('1 yard');
    expect(getDataAtCell(2, 0)).toEqual('2 feet');
    expect(getDataAtCell(3, 0)).toEqual('0.2 miles');
  });

  it('should properly sort integers with nulls', function () {
    var hot = handsontable({
      data: [['12'], [null], ['10'], ['-5'], [null], ['1000']],
      colHeaders: true,
      columnSorting: true
    });

    this.sortByColumn(0);
    expect(getDataAtCol(0)).toEqual(['-5', '10', '12', '1000', null, null]);

    this.sortByColumn(0);
    expect(getDataAtCol(0)).toEqual(['1000', '12', '10', '-5', null, null]);
  });

  it('should properly sort floating points', function () {
    var hot = handsontable({
      data: [['0.0561'], ['-10.67'], ['-4.1'], ['-0.01'], ['-127'], ['1000']],
      colHeaders: true,
      columnSorting: true
    });

    this.sortByColumn(0);
    expect(getDataAtCol(0)).toEqual(['-127', '-10.67', '-4.1', '-0.01', '0.0561', '1000']);

    this.sortByColumn(0);
    expect(getDataAtCol(0)).toEqual(['1000', '0.0561', '-0.01', '-4.1', '-10.67', '-127']);
  });

  it('should properly sort floating points with nulls', function () {
    var hot = handsontable({
      data: [['0.0561'], ['-10.67'], [null], ['-4.1'], ['-0.01'], [null], ['-127'], ['1000'], [null]],
      colHeaders: true,
      columnSorting: true
    });

    this.sortByColumn(0);
    expect(getDataAtCol(0)).toEqual(['-127', '-10.67', '-4.1', '-0.01', '0.0561', '1000', null, null, null]);

    this.sortByColumn(0);
    expect(getDataAtCol(0)).toEqual(['1000', '0.0561', '-0.01', '-4.1', '-10.67', '-127', null, null, null]);
  });

  it('should properly sort floating points with non-numerical values', function () {
    var hot = handsontable({
      data: [['0.0561'], ['-10.67'], ['a'], ['-4.1'], ['-0.01'], ['b'], ['-127'], ['1000'], ['hello']],
      colHeaders: true,
      columnSorting: true
    });

    this.sortByColumn(0);
    expect(getDataAtCol(0)).toEqual(['-127', '-10.67', '-4.1', '-0.01', '0.0561', '1000', 'a', 'b', 'hello']);

    this.sortByColumn(0);
    expect(getDataAtCol(0)).toEqual(['hello', 'b', 'a', '1000', '0.0561', '-0.01', '-4.1', '-10.67', '-127']);
  });

  it('should modify row translating process when soring is applied (visual to physical and vice versa)', function () {
    var hot = handsontable({
      data: [[2], [4], [1], [3]],
      colHeaders: true,
      columnSorting: true
    });

    this.sortByColumn(0);

    expect(hot.toPhysicalRow(0)).toBe(2);
    expect(hot.toPhysicalRow(1)).toBe(0);
    expect(hot.toPhysicalRow(2)).toBe(3);
    expect(hot.toPhysicalRow(3)).toBe(1);
    expect(hot.toVisualRow(0)).toBe(1);
    expect(hot.toVisualRow(1)).toBe(3);
    expect(hot.toVisualRow(2)).toBe(0);
    expect(hot.toVisualRow(3)).toBe(2);
  });

  describe('should return sorted properly data when maxRows or / and minSpareRow options are set', () => {
    var testSorting = function (desc, config, result) {
      it(desc, () => {
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(config.rows, config.columns),
          maxRows: config.maxRow,
          minSpareRows: config.minSpareRows,
          columnSorting: {
            column: config.sortByColumnIndex,
            sortOrder: config.sortOrder
          }
        });

        expect(getData().length).toEqual(result.dataLength);

        for (var i = 0; i < result.expectations.length; i += 1) {
          expect(getDataAtCell(result.expectations[i].rowIndex, result.expectations[i].columnIndex)).toEqual(result.expectations[i].value);
        }
      });
    };

    testSorting('maxRows < data.length', { rows: 9, columns: 9, maxRow: 6, sortByColumnIndex: 1, sortOrder: false }, { dataLength: 6, expectations: [{ rowIndex: 0, columnIndex: 2, value: 'C6' }] });

    testSorting('maxRows > data.length', { rows: 8, columns: 8, maxRow: 20, sortByColumnIndex: 1, sortOrder: false }, { dataLength: 8, expectations: [{ rowIndex: 0, columnIndex: 2, value: 'C8' }] });

    testSorting('minSpareRows is set; maxRows < data.length', { rows: 9, columns: 9, maxRow: 5, minSpareRows: 3, sortByColumnIndex: 1, sortOrder: false }, { dataLength: 5, expectations: [{ rowIndex: 0, columnIndex: 2, value: 'C5' }] });

    testSorting('minSpareRows is set; maxRows === data.length', { rows: 6, columns: 6, maxRow: 9, minSpareRows: 3, sortByColumnIndex: 1, sortOrder: false }, { dataLength: 6 + 3, expectations: [{ rowIndex: 0, columnIndex: 2, value: 'C6' }] });

    testSorting('minSpareRows is set; maxRows > data.length', { rows: 9, columns: 9, maxRow: 15, minSpareRows: 2, sortByColumnIndex: 1, sortOrder: false }, { dataLength: 9 + 2, expectations: [{ rowIndex: 0, columnIndex: 2, value: 'C9' }] });
  });
});

/***/ }),
/* 341 */
/***/ (function(module, exports) {

describe('Comments', () => {
  const id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  describe('Enabling the plugin', () => {
    it('should enable the plugin in the initial config', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        comments: true
      });

      expect(hot.getPlugin('comments').isEnabled()).toBe(true);
    });

    it('should enable the plugin using updateSettings', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4)
      });

      expect(hot.getPlugin('comments').isEnabled()).toBe(false);

      updateSettings({
        comments: true
      });

      expect(hot.getPlugin('comments').isEnabled()).toBe(true);
    });
  });

  describe('updateSettings', function () {
    it('should change delay, after which comment is showed #4323', done => {
      const rows = 10;
      const columns = 10;
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(rows, columns),
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        comments: true,
        columns() {
          return {
            comment: {
              value: 'test'
            }
          };
        }
      });

      const plugin = hot.getPlugin('comments');
      const editor = plugin.editor.getInputElement();

      updateSettings({
        comments: {
          displayDelay: 100
        }
      });

      $(getCell(1, 1)).simulate('mouseover', {
        clientX: Handsontable.dom.offset(getCell(1, 1)).left + 5,
        clientY: Handsontable.dom.offset(getCell(1, 1)).top + 5
      });

      setTimeout(() => {
        expect(editor.parentNode.style.display).toEqual('block');
        done();
      }, 150);
    });
  });

  describe('Styling', () => {
    it('should display comment indicators in the appropriate cells', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        comments: true,
        cell: [{ row: 1, col: 1, comment: { value: 'test' } }, { row: 2, col: 2, comment: { value: 'test' } }]
      });

      expect(getCell(1, 1).className.indexOf('htCommentCell')).toBeGreaterThan(-1);
      expect(getCell(2, 2).className.indexOf('htCommentCell')).toBeGreaterThan(-1);
    });
  });

  describe('Displaying comment after `mouseover` event', function () {
    it('should display comment after predefined delay when custom `displayDelay` ' + 'option of `comments` plugin wasn\'t set', done => {
      const rows = 10;
      const columns = 10;
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(rows, columns),
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        comments: true,
        columns() {
          return {
            comment: {
              value: 'test'
            }
          };
        }
      });

      $(getCell(1, 1)).simulate('mouseover', {
        clientX: Handsontable.dom.offset(getCell(1, 1)).left + 5,
        clientY: Handsontable.dom.offset(getCell(1, 1)).top + 5
      });

      const plugin = hot.getPlugin('comments');
      const editor = plugin.editor.getInputElement();

      setTimeout(() => {
        expect(editor.parentNode.style.display).toEqual('block');
        done();
      }, 300);
    });

    it('should display comment after defined delay when custom `displayDelay` ' + 'option of `comments` plugin was set', done => {
      const rows = 10;
      const columns = 10;
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(rows, columns),
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        comments: {
          displayDelay: 400
        },
        columns() {
          return {
            comment: {
              value: 'test'
            }
          };
        }
      });

      $(getCell(1, 1)).simulate('mouseover', {
        clientX: Handsontable.dom.offset(getCell(1, 1)).left + 5,
        clientY: Handsontable.dom.offset(getCell(1, 1)).top + 5
      });

      const plugin = hot.getPlugin('comments');
      const editor = plugin.editor.getInputElement();

      setTimeout(() => {
        expect(editor.parentNode.style.display).toEqual('none');
      }, 300);

      setTimeout(() => {
        expect(editor.parentNode.style.display).toEqual('block');
        done();
      }, 450);
    });
  });

  describe('API', () => {
    it('should return the comment from a proper cell, when using the getCommentAtCell method', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        comments: {
          displayDelay: 400
        },
        cell: [{ row: 1, col: 1, comment: { value: 'test' } }, { row: 2, col: 2, comment: { value: 'another test' } }]
      });

      const plugin = hot.getPlugin('comments');

      expect(plugin.getCommentAtCell(1, 1)).toEqual('test');
      expect(plugin.getCommentAtCell(2, 2)).toEqual('another test');
    });

    it('should return the comment from a proper cell, when using the setRange and getComment methods', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        comments: true,
        cell: [{ row: 1, col: 1, comment: { value: 'test' } }, { row: 2, col: 2, comment: { value: 'another test' } }]
      });

      const plugin = hot.getPlugin('comments');

      plugin.setRange({ from: { row: 1, col: 1 } });
      expect(plugin.getComment()).toEqual('test');
      plugin.setRange({ from: { row: 2, col: 2 } });
      expect(plugin.getComment()).toEqual('another test');
    });

    it('should allow inserting comments using the `setCommentAtCell` method', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        comments: true
      });

      const plugin = hot.getPlugin('comments');

      expect(getCellMeta(1, 1).comment).toEqual(void 0);

      plugin.setCommentAtCell(1, 1, 'test comment');

      expect(getCellMeta(1, 1).comment.value).toEqual('test comment');
    });

    it('should trigger `afterSetCellMeta` callback when `setCommentAtCell` function is invoked', () => {
      const afterSetCellMetaCallback = jasmine.createSpy('afterSetCellMetaCallback');
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        comments: true,
        afterSetCellMeta: afterSetCellMetaCallback
      });

      const plugin = hot.getPlugin('comments');

      plugin.setCommentAtCell(1, 1, 'Added comment');
      expect(afterSetCellMetaCallback).toHaveBeenCalledWith(1, 1, 'comment', { value: 'Added comment' }, undefined, undefined);
    });

    it('should allow removing comments using the `removeCommentAtCell` method', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        comments: true,
        cell: [{ row: 1, col: 1, comment: { value: 'test' } }]
      });

      const plugin = hot.getPlugin('comments');

      expect(getCellMeta(1, 1).comment.value).toEqual('test');

      plugin.removeCommentAtCell(1, 1);

      expect(getCellMeta(1, 1).comment).toEqual(void 0);
    });

    it('should trigger `afterSetCellMeta` callback when `removeCommentAtCell` function is invoked', () => {
      const afterSetCellMetaCallback = jasmine.createSpy('afterSetCellMetaCallback');
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        comments: true,
        cell: [{ row: 1, col: 1, comment: { value: 'test' } }],
        afterSetCellMeta: afterSetCellMetaCallback
      });

      const plugin = hot.getPlugin('comments');

      plugin.removeCommentAtCell(1, 1);
      expect(afterSetCellMetaCallback).toHaveBeenCalledWith(1, 1, 'comment', undefined, undefined, undefined);
    });

    it('should allow opening the comment editor using the `showAtCell` method', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        comments: true
      });

      const plugin = hot.getPlugin('comments');
      const editor = plugin.editor.getInputElement();

      expect(editor.parentNode.style.display).toEqual('none');

      plugin.showAtCell(1, 1);

      expect(editor.parentNode.style.display).toEqual('block');
    });

    it('should allow closing the comment editor using the `hide` method', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        comments: true
      });

      const plugin = hot.getPlugin('comments');
      const editor = plugin.editor.getInputElement();
      plugin.showAtCell(1, 1);
      expect(editor.parentNode.style.display).toEqual('block');

      plugin.hide();

      expect(editor.parentNode.style.display).toEqual('none');
    });
  });

  it('`updateCommentMeta` & `setComment` functions should extend cellMetaObject properly', () => {
    const hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      comments: true
    });
    const plugin = hot.getPlugin('comments');
    let readOnly;
    let comment;

    setCellMeta(0, 0, 'comment', { readOnly: true });
    plugin.updateCommentMeta(0, 0, { value: 'Test' });

    comment = getCellMeta(0, 0).comment;
    readOnly = comment && comment.readOnly;

    expect(readOnly).toEqual(true);

    plugin.setRange({ from: { row: 0, col: 0 }, to: { row: 0, col: 0 } });
    plugin.setComment('Test2');

    comment = getCellMeta(0, 0).comment;
    readOnly = comment && comment.readOnly;

    expect(readOnly).toEqual(true);
  });

  it('should not close the comment editor immediately after opening #4323', done => {
    const hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      contextMenu: true,
      comments: {
        displayDelay: 0
      }
    });

    selectCell(1, 1);
    contextMenu();

    const addCommentButton = $('.htItemWrapper').filter(function () {
      return $(this).text() === 'Add comment';
    })[0];

    $(addCommentButton).simulate('mouseover', {
      clientX: Handsontable.dom.offset(addCommentButton).left + 5,
      clientY: Handsontable.dom.offset(addCommentButton).top + 5
    });

    $(addCommentButton).simulate('mousedown');

    const editor = hot.getPlugin('comments').editor.getInputElement();

    setTimeout(function () {
      expect($(editor).parents('.htComments')[0].style.display).toEqual('block');
      done();
    }, 300);
  });

  describe('Using the Context Menu', () => {
    it('should open the comment editor when clicking the "Add comment" entry', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        comments: true
      });

      selectCell(1, 1);
      contextMenu();

      const addCommentButton = $('.htItemWrapper').filter(function () {
        return $(this).text() === 'Add comment';
      })[0];

      $(addCommentButton).simulate('mousedown');

      const editor = hot.getPlugin('comments').editor.getInputElement();

      expect($(editor).parents('.htComments')[0].style.display).toEqual('block');
    });

    it('should remove the comment from a cell after clicking the "Delete comment" entry', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        comments: true,
        cell: [{ row: 1, col: 1, comment: { value: 'Test comment' } }]
      });

      expect(getCellMeta(1, 1).comment.value).toEqual('Test comment');

      selectCell(1, 1);
      contextMenu();

      const deleteCommentButton = $('.htItemWrapper').filter(function () {
        return $(this).text() === 'Delete comment';
      })[0];

      $(deleteCommentButton).simulate('mousedown');

      expect(getCellMeta(1, 1).comment).toEqual(void 0);
    });

    it('should remove comments from a selected group of cells after clicking the "Delete comment" entry', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        comments: true,
        cell: [{ row: 1, col: 1, comment: { value: 'Test comment' } }, { row: 2, col: 2, comment: { value: 'Test comment 2' } }]
      });

      expect(getCellMeta(1, 1).comment.value).toEqual('Test comment');
      expect(getCellMeta(2, 2).comment.value).toEqual('Test comment 2');

      selectCell(1, 1, 2, 2);
      contextMenu();

      const deleteCommentButton = $('.htItemWrapper').filter(function () {
        return $(this).text() === 'Delete comment';
      })[0];

      $(deleteCommentButton).simulate('mousedown');

      expect(getCellMeta(1, 1).comment).toEqual(void 0);
      expect(getCellMeta(2, 2).comment).toEqual(void 0);
    });

    it('should make the comment editor\'s textarea read-only after clicking the "Read-only comment" entry', done => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        comments: true,
        cell: [{ row: 1, col: 1, comment: { value: 'Test comment' } }]
      });

      selectCell(1, 1);
      contextMenu();

      const editor = hot.getPlugin('comments').editor.getInputElement();

      expect($(editor)[0].readOnly).toBe(false);

      const readOnlyComment = $('.htItemWrapper').filter(function () {
        return $(this).text() === 'Read-only comment';
      })[0];

      $(readOnlyComment).simulate('mousedown');
      $(document).simulate('mouseup');

      $(getCell(1, 1)).simulate('mouseover', {
        clientX: Handsontable.dom.offset(getCell(1, 1)).left + 5,
        clientY: Handsontable.dom.offset(getCell(1, 1)).top + 5
      });

      setTimeout(() => {
        expect($(editor)[0].readOnly).toBe(true);
        done();
      }, 550);
    });
  });

  describe('Hooks invoked after changing cell meta', () => {
    it('should trigger `afterSetCellMeta` callback after deleting comment by context menu', () => {
      const afterSetCellMetaCallback = jasmine.createSpy('afterSetCellMetaCallback');
      const rows = 10,
            columns = 10;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(rows, columns),
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        comments: true,
        columns() {
          return {
            comment: {
              value: 'test'
            }
          };
        },
        afterSetCellMeta: afterSetCellMetaCallback
      });

      expect(afterSetCellMetaCallback).not.toHaveBeenCalled();

      selectCell(1, 1);
      contextMenu();

      const deleteCommentButton = $('.htItemWrapper').filter(function () {
        return $(this).text() === 'Delete comment';
      })[0];

      $(deleteCommentButton).simulate('mousedown');

      expect(afterSetCellMetaCallback).toHaveBeenCalledWith(1, 1, 'comment', undefined, undefined, undefined);
    });

    // Doesn't work in PhantomJS
    // It will work probably when #3961 will be fixed
    xit('should trigger `afterSetCellMeta` callback after editing comment by context menu', done => {
      const afterSetCellMetaCallback = jasmine.createSpy('afterSetCellMetaCallback');
      const rows = 10,
            columns = 10;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(rows, columns),
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        comments: true,
        columns() {
          return {
            comment: {
              value: 'test'
            }
          };
        },
        afterSetCellMeta: afterSetCellMetaCallback
      });

      selectCell(0, 0);
      contextMenu();

      const editCommentButton = $('.htItemWrapper').filter(function () {
        return $(this).text() === 'Edit comment';
      })[0];

      $(editCommentButton).simulate('mousedown');

      setTimeout(() => {
        $('.htCommentTextArea').val('Edited comment');

        // changing focus

        $('body').simulate('mousedown');

        setTimeout(() => {
          expect(afterSetCellMetaCallback).toHaveBeenCalledWith(0, 0, 'comment', { value: 'Edited comment' }, undefined, undefined);
          done();
        }, 100);
      }, 100);
    });
  });
});

/***/ }),
/* 342 */
/***/ (function(module, exports) {

describe('ContextMenu', () => {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  it('should update context menu items by calling `updateSettings` method', async () => {
    var hot = handsontable({
      contextMenu: ['row_above', 'row_below', '---------', 'remove_row'],
      height: 100
    });

    contextMenu();

    var items = $('.htContextMenu tbody td');
    var actions = items.not('.htSeparator');
    var separators = items.filter('.htSeparator');

    expect(actions.length).toEqual(3);
    expect(separators.length).toEqual(1);

    expect(actions.text()).toEqual(['Insert row above', 'Insert row below', 'Remove row'].join(''));

    hot.updateSettings({
      contextMenu: ['remove_row']
    });

    await sleep(300);

    contextMenu();

    items = $('.htContextMenu tbody td');
    actions = items.not('.htSeparator');
    separators = items.filter('.htSeparator');

    expect(actions.length).toEqual(1);
    expect(separators.length).toEqual(0);

    expect(actions.text()).toEqual(['Remove row'].join(''));

    hot.updateSettings({
      contextMenu: {
        items: {
          remove_col: true,
          hsep1: '---------',
          custom: { name: 'My custom item' }
        }
      }
    });

    await sleep(300);

    contextMenu();

    items = $('.htContextMenu tbody td');
    actions = items.not('.htSeparator');
    separators = items.filter('.htSeparator');

    expect(actions.length).toEqual(2);
    expect(separators.length).toEqual(1);

    expect(actions.text()).toEqual(['Remove column', 'My custom item'].join(''));
  });

  describe('menu opening', () => {
    it('should open menu after right click on table cell', () => {
      var hot = handsontable({
        contextMenu: true,
        height: 100
      });

      expect(hot.getPlugin('contextMenu')).toBeDefined();
      expect($('.htContextMenu').is(':visible')).toBe(false);

      contextMenu();

      expect($('.htContextMenu').is(':visible')).toBe(true);
    });

    it('should not open the menu after clicking an open editor', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      selectCell(2, 2);
      keyDownUp('enter');

      expect(hot.getPlugin('contextMenu')).toBeDefined();
      expect($('.htContextMenu').is(':visible')).toBe(false);

      contextMenu(hot.getActiveEditor().TEXTAREA);

      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should open menu after right click on header cell when only header cells are visible', () => {
      var hot = handsontable({
        data: [],
        colHeaders: ['Year', 'Kia'],
        columns: [{ data: 0 }, { data: 1 }],
        contextMenu: true,
        height: 100
      });

      expect(hot.getPlugin('contextMenu')).toBeDefined();
      expect($('.htContextMenu').is(':visible')).toBe(false);

      contextMenu(hot.rootElement.querySelector('.ht_clone_top thead th'));

      expect($('.htContextMenu').is(':visible')).toBe(true);
    });

    it('should open menu after right click on header corner', () => {
      var hot = handsontable({
        data: [],
        colHeaders: true,
        rowHeaders: true,
        contextMenu: true,
        height: 100
      });

      expect(hot.getPlugin('contextMenu')).toBeDefined();
      expect($('.htContextMenu').is(':visible')).toBe(false);

      contextMenu(hot.rootElement.querySelector('.ht_clone_top_left_corner thead th'));

      expect($('.htContextMenu').is(':visible')).toBe(true);
    });

    it('should open menu after right click active cell border', function () {
      var hot = handsontable({
        contextMenu: true,
        height: 100
      });

      expect(hot.getPlugin('contextMenu')).toBeDefined();
      expect($('.htContextMenu').is(':visible')).toBe(false);

      selectCell(0, 0);

      this.$container.find('.wtBorder.current:eq(0)').simulate('contextmenu');

      expect($('.htContextMenu').is(':visible')).toBe(true);
    });
  });

  describe('menu closing', () => {
    it('should close menu after click', function () {
      var hot = handsontable({
        contextMenu: true,
        height: 100
      });

      contextMenu();

      expect($('.htContextMenu').is(':visible')).toBe(true);

      mouseDown(this.$container);

      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should close menu after click under the menu', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(500, 10),
        contextMenu: true,
        height: 500
      });

      contextMenu();

      expect($('.htContextMenu').is(':visible')).toBe(true);

      var rect = $('.htContextMenu')[0].getBoundingClientRect();
      var x = parseInt(rect.left + rect.width / 2, 10);
      var y = parseInt(rect.top + rect.height, 10);
      mouseDown(document.elementFromPoint(x, y));

      expect($('.htContextMenu').is(':visible')).toBe(false);
    });
  });

  describe('menu disabled', () => {
    it('should not open menu after right click', () => {
      var hot = handsontable({
        contextMenu: true,
        height: 100
      });

      hot.getPlugin('contextMenu').disablePlugin();

      expect($('.htContextMenu').is(':visible')).toBe(false);

      contextMenu();

      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should not create context menu if it\'s disabled in constructor options', () => {
      var hot = handsontable({
        contextMenu: false,
        height: 100
      });

      expect(hot.getPlugin('contextMenu').isEnabled()).toBe(false);
    });

    it('should reenable menu', async () => {
      var hot = handsontable({
        contextMenu: true,
        height: 100
      });

      hot.getPlugin('contextMenu').disablePlugin();

      expect($('.htContextMenu').is(':visible')).toBe(false);

      contextMenu();

      expect($('.htContextMenu').is(':visible')).toBe(false);

      hot.getPlugin('contextMenu').enablePlugin();

      await sleep(300);

      contextMenu();

      expect($('.htContextMenu').is(':visible')).toBe(true);
    });

    it('should reenable menu with updateSettings when it was disabled in constructor', () => {
      var hot = handsontable({
        contextMenu: false,
        height: 100
      });

      expect(hot.getPlugin('contextMenu').isEnabled()).toBe(false);

      updateSettings({
        contextMenu: true
      });

      expect(hot.getPlugin('contextMenu').isEnabled()).toBe(true);

      expect($('.htContextMenu').is(':visible')).toBe(false);

      contextMenu();

      setTimeout(() => {
        expect($('.htContextMenu').is(':visible')).toBe(true);
      }, 300);
    });

    it('should disable menu with updateSettings when it was enabled in constructor', () => {
      var hot = handsontable({
        contextMenu: true,
        height: 100
      });

      expect(hot.getPlugin('contextMenu').isEnabled()).toBe(true);

      updateSettings({
        contextMenu: false
      });

      expect(hot.getPlugin('contextMenu').isEnabled()).toBe(false);
    });

    it('should work properly (remove row) after destroy and new init', () => {
      var test = function () {
        handsontable({
          startRows: 5,
          contextMenu: ['remove_row'],
          height: 100
        });
        selectCell(0, 0);
        contextMenu();

        $('.htContextMenu .ht_master .htCore tbody').find('td').not('.htSeparator').eq(0).simulate('mousedown');
        expect(getData().length).toEqual(4);
      };
      test();

      destroy();

      test();
    });
  });

  describe('menu hidden items', () => {
    it('should remove separators from top, bottom and duplicated', () => {
      var hot = handsontable({
        contextMenu: ['---------', '---------', 'row_above', '---------', '---------', 'row_below', '---------', 'remove_row'],
        height: 100
      });

      contextMenu();

      var items = $('.htContextMenu tbody td');
      var actions = items.not('.htSeparator');
      var separators = items.filter('.htSeparator');

      expect(actions.length).toEqual(3);
      expect(separators.length).toEqual(2);
    });

    it('should hide option if hidden function return true', () => {

      var hot = handsontable({
        startCols: 5,
        colHeaders: true,
        contextMenu: [{
          key: '',
          name: 'Custom option',
          hidden() {
            return !this.selection.selectedHeader.cols;
          }
        }]
      });

      contextMenu();
      var items = $('.htContextMenu tbody td');
      var actions = items.not('.htSeparator');

      expect(actions.length).toEqual(0);

      var header = $('.ht_clone_top thead th').eq(1);

      header.simulate('mousedown');
      header.simulate('mouseup');
      contextMenu();

      items = $('.htContextMenu tbody td');
      actions = items.not('.htSeparator');
      expect(actions.length).toEqual(1);
    });
  });

  describe('menu destroy', () => {
    it('should close context menu when HOT is being destroyed', () => {
      var hot = handsontable({
        contextMenu: true,
        height: 100
      });

      contextMenu();

      expect($('.htContextMenu').is(':visible')).toBe(true);

      destroy();

      expect($('.htContextMenu').is(':visible')).toBe(false);
    });
  });

  describe('subMenu', () => {
    it('should not open subMenu immediately', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      item.simulate('mouseover');
      var contextSubMenu = $(`.htContextMenuSub_${item.text()}`).find('tbody td');

      expect(contextSubMenu.length).toEqual(0);
    });

    it('should open subMenu with delay', async () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);

      item.simulate('mouseover');

      await sleep(300);

      var contextSubMenu = $(`.htContextMenuSub_${item.text()}`);

      expect(contextSubMenu.length).toEqual(1);
    });

    it('should NOT open subMenu if there is no subMenu for item', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(8);

      item.simulate('mouseover');

      expect(item.hasClass('htSubmenu')).toBe(false);

      var contextSubMenu = $(`.htContextMenuSub_${item.text()}`);

      expect(contextSubMenu.length).toEqual(0);
    });

    it('should not throw error when opening multi-level menu with name declared as `function` #4550', async () => {
      const spy = spyOn(window, 'onerror');

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: {
          items: {
            alignment: {
              name() {
                return 'Alignment';
              },
              submenu: {
                items: [{ key: 'alignment:left', name: 'Align to LEFT' }]
              }
            }
          }
        }
      });

      contextMenu();

      const $submenu = $('.htSubmenu');

      $submenu.simulate('mouseover');

      await sleep(350);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not throw error when opening multi-level menu with name declared as `function` which return value not castable to string', async () => {
      const spy = spyOn(window, 'onerror');

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: {
          items: {
            alignment: {
              name() {
                return undefined;
              },
              submenu: {
                items: [{ key: 'alignment:left', name: 'Align to LEFT' }]
              }
            },
            custom1: {
              name() {
                return null;
              },
              submenu: {
                items: [{ key: 'custom1:test', name: 'Test1' }]
              }
            },
            custom2: {
              name() {
                return 0;
              },
              submenu: {
                items: [{ key: 'custom2:test', name: 'Test2' }]
              }
            }
          }
        }
      });

      contextMenu();

      const $submenu1 = $('.htSubmenu').eq(0);

      $submenu1.simulate('mouseover');

      await sleep(350);

      const $submenu2 = $('.htSubmenu').eq(1);

      $submenu2.simulate('mouseover');

      await sleep(350);

      const $submenu3 = $('.htSubmenu').eq(2);

      $submenu3.simulate('mouseover');

      await sleep(350);

      expect(spy).not.toHaveBeenCalled();
    }, 1200);

    it('should open subMenu on the left of main menu if on the right there\'s no space left', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, Math.floor(window.innerWidth / 50)),
        contextMenu: true,
        width: window.innerWidth
      });

      selectCell(0, countCols() - 1);
      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      var contextMenuRoot = $('.htContextMenu');

      item.simulate('mouseover');

      expect(item.text()).toBe('Alignment');
      expect(item.hasClass('htSubmenu')).toBe(true);

      var contextSubMenu = $(`.htContextMenuSub_${item.text()}`);

      expect(contextSubMenu.offset().left).toBeLessThan(contextMenuRoot.offset().left - contextSubMenu.width() + 30); // 30 - scroll
    });

    it('should open subMenu on the right of main menu if there\'s free space', async () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, Math.floor(window.innerWidth / 50)),
        contextMenu: true,
        width: window.innerWidth
      });

      selectCell(0, countCols() - 10);
      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      var contextMenuRoot = $('.htContextMenu');

      item.simulate('mouseover');

      await sleep(300);

      expect(item.text()).toBe('Alignment');
      expect(item.hasClass('htSubmenu')).toBe(true);

      var contextSubMenu = $(`.htContextMenuSub_${item.text()}`);

      expect(contextSubMenu.offset().left).toBeGreaterThan(contextMenuRoot.offset().left + contextMenuRoot.width() - 30); // 30 - scroll
    });

    it('should open subMenu on the left-bottom of main menu if there\'s free space', async () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(Math.floor(window.innerHeight / 23), Math.floor(window.innerWidth / 50)),
        contextMenu: true,
        height: window.innerHeight
      });

      window.scrollTo(0, document.body.clientHeight);
      selectCell(0, countCols() - 1);
      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      var contextMenuRoot = $('.htContextMenu');

      item.simulate('mouseover');

      await sleep(300);

      expect(item.text()).toBe('Alignment');
      expect(item.hasClass('htSubmenu')).toBe(true);

      var contextSubMenu = $(`.htContextMenuSub_${item.text()}`);

      expect(parseInt(contextSubMenu.offset().top, 10)).toBeAroundValue(parseInt(item.offset().top, 10) - 1);
      expect(parseInt(contextSubMenu.offset().left, 10)).toBeLessThan(contextMenuRoot.offset().left - contextSubMenu.width() + 30); // 30 - scroll
    });

    it('should open subMenu on the right-bottom of main menu if there\'s free space', async () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(Math.floor(window.innerHeight / 23), Math.floor(window.innerWidth / 50)),
        contextMenu: true,
        height: window.innerHeight
      });

      window.scrollTo(0, document.body.clientHeight);
      selectCell(0, countCols() - 10);

      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      var contextMenuRoot = $('.htContextMenu');

      item.simulate('mouseover');

      await sleep(300);

      expect(item.text()).toBe('Alignment');
      expect(item.hasClass('htSubmenu')).toBe(true);

      var contextSubMenu = $(`.htContextMenuSub_${item.text()}`);

      expect(parseInt(contextSubMenu.offset().top, 10)).toBeAroundValue(parseInt(item.offset().top, 10) - 1);
      expect(parseInt(contextSubMenu.offset().left, 10)).toBeGreaterThan(contextMenuRoot.offset().left + contextMenuRoot.width() - 30); // 30 - scroll
    });

    it('should open subMenu on the left-top of main menu if there\'s no free space on bottom', async () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(Math.floor(window.innerHeight / 23), Math.floor(window.innerWidth / 50)),
        contextMenu: true,
        height: window.innerHeight
      });

      selectCell(countRows() - 1, countCols() - 1);
      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      var contextMenuRoot = $('.htContextMenu');

      item.simulate('mouseover');

      await sleep(300);

      expect(item.text()).toBe('Alignment');
      expect(item.hasClass('htSubmenu')).toBe(true);

      var contextSubMenu = $(`.htContextMenuSub_${item.text()}`);

      expect(contextSubMenu.offset().top + contextSubMenu.height() - 28).toBeAroundValue(item.offset().top);
      expect(contextSubMenu.offset().left).toBeLessThan(contextMenuRoot.offset().left - contextSubMenu.width() + 30); // 30 - scroll
    });

    it('should open subMenu on the right-top of main menu if there\'s no free space on bottom', async () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(Math.floor(window.innerHeight / 23), Math.floor(window.innerWidth / 50)),
        contextMenu: true,
        height: window.innerHeight
      });

      selectCell(countRows() - 1, countCols() - 10);
      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      var contextMenuRoot = $('.htContextMenu');

      item.simulate('mouseover');

      await sleep(300);

      expect(item.text()).toBe('Alignment');
      expect(item.hasClass('htSubmenu')).toBe(true);

      var contextSubMenu = $(`.htContextMenuSub_${item.text()}`);

      expect(contextSubMenu.offset().top + contextSubMenu.height() - 28).toBeAroundValue(item.offset().top);
      expect(contextSubMenu.offset().left).toBeGreaterThan(contextMenuRoot.offset().left + contextMenuRoot.width() - 30); // 30 - scroll
    });
  });

  describe('default context menu actions', () => {
    it('should display the default set of actions', () => {
      var hot = handsontable({
        contextMenu: true,
        comments: true,
        height: 100
      });

      contextMenu();

      var items = $('.htContextMenu tbody td');
      var actions = items.not('.htSeparator');
      var separators = items.filter('.htSeparator');

      expect(actions.length).toEqual(15);
      expect(separators.length).toEqual(7);

      expect(actions.text()).toEqual(['Insert row above', 'Insert row below', 'Insert column left', 'Insert column right', 'Remove row', 'Remove column', 'Undo', 'Redo', 'Read only', 'Alignment', 'Add comment', 'Delete comment', 'Read-only comment', 'Copy', 'Cut'].join(''));
    });

    it('should disable column manipulation when row header selected', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        colHeaders: true,
        rowHeaders: true,
        height: 100
      });

      $('.ht_clone_left .htCore').eq(0).find('tbody').find('th').eq(0).simulate('mousedown', { which: 3 });
      contextMenu();

      expect($('.htContextMenu tbody td.htDisabled').text()).toBe(['Insert column left', 'Insert column right', 'Remove columns', 'Undo', 'Redo'].join(''));
    });

    it('should disable row manipulation when column header selected', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        colHeaders: true,
        rowHeaders: true,
        height: 100
      });

      $('.ht_clone_top .htCore').find('thead').find('th').eq(2).simulate('mousedown', { which: 3 });
      contextMenu();

      expect($('.htContextMenu tbody td.htDisabled').text()).toBe(['Insert row above', 'Insert row below', 'Remove rows', 'Undo', 'Redo'].join(''));
    });

    it('should disable cells manipulation when corner header selected', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        colHeaders: true,
        rowHeaders: true,
        height: 100
      });

      $('.ht_clone_top_left_corner .htCore').find('thead').find('th').eq(0).simulate('mousedown', { which: 3 });
      contextMenu();

      expect($('.htContextMenu tbody td.htDisabled').text()).toBe(['Remove row', 'Remove column', 'Undo', 'Redo', 'Read only', 'Alignment'].join(''));
    });

    it('should insert row above selection', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 400
      });

      var afterCreateRowCallback = jasmine.createSpy('afterCreateRowCallback');
      hot.addHook('afterCreateRow', afterCreateRowCallback);

      expect(countRows()).toEqual(4);

      selectCell(1, 0, 3, 0);
      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(0).simulate('mousedown'); // Insert row above

      expect(afterCreateRowCallback).toHaveBeenCalledWith(1, 1, 'ContextMenu.rowAbove', undefined, undefined, undefined);
      expect(countRows()).toEqual(5);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should insert row above selection when initial data is empty', () => {
      var hot = handsontable({
        rowHeaders: true,
        colHeaders: true,
        data: [],
        dataSchema: [],
        contextMenu: true,
        height: 400
      });

      var afterCreateRowCallback = jasmine.createSpy('afterCreateRowCallback');
      hot.addHook('afterCreateRow', afterCreateRowCallback);

      expect(countRows()).toEqual(0);

      var cell = $('.ht_clone_top_left_corner .htCore').find('thead').find('th').eq(0);

      cell.simulate('mousedown', { which: 3 });
      contextMenu(cell[0]);
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(0).simulate('mousedown'); // Insert row above

      expect(afterCreateRowCallback).toHaveBeenCalledWith(0, 1, 'ContextMenu.rowAbove', undefined, undefined, undefined);
      expect(countRows()).toEqual(1);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should NOT display insert row selection', () => {
      var hot = handsontable({
        contextMenu: true,
        allowInsertRow: false
      });

      contextMenu();

      var items = $('.htContextMenu tbody td');
      var actions = items.not('.htSeparator');
      var separators = items.filter('.htSeparator');

      expect(actions.length).toEqual(10);
      expect(separators.length).toEqual(5);

      expect(actions.text()).toEqual(['Insert column left', 'Insert column right', 'Remove row', 'Remove column', 'Undo', 'Redo', 'Read only', 'Alignment', 'Copy', 'Cut'].join(''));
    });

    it('should NOT display insert column selection', () => {
      var hot = handsontable({
        contextMenu: true,
        allowInsertColumn: false
      });

      contextMenu();

      var items = $('.htContextMenu tbody td');
      var actions = items.not('.htSeparator');

      expect(actions.length).toEqual(10);

      expect(actions.text()).toEqual(['Insert row above', 'Insert row below', 'Remove row', 'Remove column', 'Undo', 'Redo', 'Read only', 'Alignment', 'Copy', 'Cut'].join(''));
    });

    it('should insert row above selection (reverse selection)', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      var afterCreateRowCallback = jasmine.createSpy('afterCreateRowCallback');
      hot.addHook('afterCreateRow', afterCreateRowCallback);

      expect(countRows()).toEqual(4);

      selectCell(3, 0, 1, 0);
      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(0).simulate('mousedown'); // Insert row above

      expect(afterCreateRowCallback).toHaveBeenCalledWith(1, 1, 'ContextMenu.rowAbove', undefined, undefined, undefined);
      expect(countRows()).toEqual(5);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should insert row below selection', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      var afterCreateRowCallback = jasmine.createSpy('afterCreateRowCallback');
      hot.addHook('afterCreateRow', afterCreateRowCallback);

      expect(countRows()).toEqual(4);

      selectCell(1, 0, 3, 0);
      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(1).simulate('mousedown'); // Insert row above

      expect(afterCreateRowCallback).toHaveBeenCalledWith(4, 1, 'ContextMenu.rowBelow', undefined, undefined, undefined);
      expect(countRows()).toEqual(5);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should insert row below selection when initial data is empty', () => {
      var hot = handsontable({
        rowHeaders: true,
        colHeaders: true,
        data: [],
        dataSchema: [],
        contextMenu: true,
        height: 400
      });

      var afterCreateRowCallback = jasmine.createSpy('afterCreateRowCallback');
      hot.addHook('afterCreateRow', afterCreateRowCallback);

      expect(countRows()).toEqual(0);

      var cell = $('.ht_clone_top_left_corner .htCore').find('thead').find('th').eq(0);

      cell.simulate('mousedown', { which: 3 });
      contextMenu(cell[0]);
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(1).simulate('mousedown'); // Insert row below

      expect(afterCreateRowCallback).toHaveBeenCalledWith(0, 1, 'ContextMenu.rowBelow', undefined, undefined, undefined);
      expect(countRows()).toEqual(1);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should insert row below selection (reverse selection)', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      var afterCreateRowCallback = jasmine.createSpy('afterCreateRowCallback');
      hot.addHook('afterCreateRow', afterCreateRowCallback);

      expect(countRows()).toEqual(4);

      selectCell(3, 0, 1, 0);
      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(1).simulate('mousedown'); // Insert row below

      expect(afterCreateRowCallback).toHaveBeenCalledWith(4, 1, 'ContextMenu.rowBelow', undefined, undefined, undefined);
      expect(countRows()).toEqual(5);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should Insert column left of selection', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        width: 400,
        height: 400
      });

      var afterCreateColCallback = jasmine.createSpy('afterCreateColCallback');
      hot.addHook('afterCreateCol', afterCreateColCallback);

      expect(countCols()).toEqual(4);

      selectCell(0, 1, 0, 3);
      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(2).simulate('mousedown'); // Insert col left

      expect(afterCreateColCallback).toHaveBeenCalledWith(1, 1, 'ContextMenu.columnLeft', undefined, undefined, undefined);
      expect(countCols()).toEqual(5);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should Insert column left of selection when initial data is empty', () => {
      var hot = handsontable({
        rowHeaders: true,
        colHeaders: true,
        data: [],
        dataSchema: [],
        contextMenu: true,
        height: 400
      });

      var afterCreateColCallback = jasmine.createSpy('afterCreateColCallback');
      hot.addHook('afterCreateCol', afterCreateColCallback);

      expect(countCols()).toEqual(0);

      var cell = $('.ht_clone_top_left_corner .htCore').find('thead').find('th').eq(0);

      cell.simulate('mousedown', { which: 3 });
      contextMenu(cell[0]);
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(3).simulate('mousedown'); // Insert column left

      expect(afterCreateColCallback).toHaveBeenCalledWith(0, 1, 'ContextMenu.columnRight', undefined, undefined, undefined);
      expect(countCols()).toEqual(1);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should Insert column left of selection (reverse selection)', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      var afterCreateColCallback = jasmine.createSpy('afterCreateColCallback');
      hot.addHook('afterCreateCol', afterCreateColCallback);

      expect(countCols()).toEqual(4);

      selectCell(0, 3, 0, 1);
      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(2).simulate('mousedown'); // Insert col left

      expect(afterCreateColCallback).toHaveBeenCalledWith(1, 1, 'ContextMenu.columnLeft', undefined, undefined, undefined);
      expect(countCols()).toEqual(5);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should Insert column right of selection', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      var afterCreateColCallback = jasmine.createSpy('afterCreateColCallback');
      hot.addHook('afterCreateCol', afterCreateColCallback);

      expect(countCols()).toEqual(4);

      selectCell(0, 1, 0, 3);
      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(2).simulate('mousedown'); // Insert col right

      expect(afterCreateColCallback).toHaveBeenCalledWith(1, 1, 'ContextMenu.columnLeft', undefined, undefined, undefined);
      expect(countCols()).toEqual(5);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should Insert column right of selection when initial data is empty', () => {
      var hot = handsontable({
        rowHeaders: true,
        colHeaders: true,
        data: [],
        dataSchema: [],
        contextMenu: true,
        height: 400
      });

      var afterCreateColCallback = jasmine.createSpy('afterCreateColCallback');
      hot.addHook('afterCreateCol', afterCreateColCallback);

      expect(countCols()).toEqual(0);

      var cell = $('.ht_clone_top_left_corner .htCore').find('thead').find('th').eq(0);

      cell.simulate('mousedown', { which: 3 });
      contextMenu(cell[0]);
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(3).simulate('mousedown'); // Insert column right

      expect(afterCreateColCallback).toHaveBeenCalledWith(0, 1, 'ContextMenu.columnRight', undefined, undefined, undefined);
      expect(countCols()).toEqual(1);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should Insert column right of selection (reverse selection)', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      var afterCreateColCallback = jasmine.createSpy('afterCreateColCallback');
      hot.addHook('afterCreateCol', afterCreateColCallback);

      expect(countCols()).toEqual(4);

      selectCell(0, 3, 0, 1);
      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(3).simulate('mousedown'); // Insert col right

      expect(afterCreateColCallback).toHaveBeenCalledWith(4, 1, 'ContextMenu.columnRight', undefined, undefined, undefined);
      expect(countCols()).toEqual(5);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should remove selected rows', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      var afterRemoveRowCallback = jasmine.createSpy('afterRemoveRowCallback');
      hot.addHook('afterRemoveRow', afterRemoveRowCallback);

      expect(countRows()).toEqual(4);

      selectCell(1, 0, 3, 0);
      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(4).simulate('mousedown'); // Remove row

      expect(afterRemoveRowCallback).toHaveBeenCalledWith(1, 3, [1, 2, 3], 'ContextMenu.removeRow', undefined, undefined);
      expect(countRows()).toEqual(1);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should allow to remove the latest row', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(1, 4),
        contextMenu: true,
        height: 100
      });

      var afterRemoveRowCallback = jasmine.createSpy('afterRemoveRowCallback');
      hot.addHook('afterRemoveRow', afterRemoveRowCallback);

      expect(countRows()).toBe(1);

      selectCell(0, 0, 0, 0);
      contextMenu();

      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(4).simulate('mousedown'); // Remove row

      expect(afterRemoveRowCallback).toHaveBeenCalledWith(0, 1, [0], 'ContextMenu.removeRow', undefined, undefined);
      expect(countRows()).toBe(0);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should remove selected rows (reverse selection)', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      var afterRemoveRowCallback = jasmine.createSpy('afterRemoveRowCallback');
      hot.addHook('afterRemoveRow', afterRemoveRowCallback);

      expect(countRows()).toBe(4);

      selectCell(3, 0, 1, 0);
      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(4).simulate('mousedown'); // Remove row

      expect(afterRemoveRowCallback).toHaveBeenCalledWith(1, 3, [1, 2, 3], 'ContextMenu.removeRow', undefined, undefined);
      expect(countRows()).toBe(1);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should remove selected columns', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      var afterRemoveColCallback = jasmine.createSpy('afterRemoveColCallback');
      hot.addHook('afterRemoveCol', afterRemoveColCallback);

      expect(countCols()).toBe(4);

      selectCell(0, 1, 0, 3);
      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(5).simulate('mousedown'); // Remove col

      expect(afterRemoveColCallback).toHaveBeenCalledWith(1, 3, [1, 2, 3], 'ContextMenu.removeColumn', undefined, undefined);
      expect(countCols()).toBe(1);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should allow to remove the latest column', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 1),
        contextMenu: true,
        height: 100
      });

      var afterRemoveColCallback = jasmine.createSpy('afterRemoveColCallback');
      hot.addHook('afterRemoveCol', afterRemoveColCallback);

      expect(countCols()).toBe(1);

      selectCell(0, 0, 0, 0);
      contextMenu();

      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(5).simulate('mousedown'); // Remove column

      expect(afterRemoveColCallback).toHaveBeenCalledWith(0, 1, [0], 'ContextMenu.removeColumn', undefined, undefined);
      expect(countCols()).toBe(0);
      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should remove selected columns (reverse selection)', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      var afterRemoveColCallback = jasmine.createSpy('afterRemoveColCallback');
      hot.addHook('afterRemoveCol', afterRemoveColCallback);

      expect(countCols()).toEqual(4);

      selectCell(0, 3, 0, 1);

      contextMenu();

      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(5).simulate('mousedown'); // Remove col

      expect(afterRemoveColCallback).toHaveBeenCalledWith(1, 3, [1, 2, 3], 'ContextMenu.removeColumn', undefined, undefined);
      expect(countCols()).toEqual(1);
    });

    it('should undo changes', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      selectCell(0, 0);

      expect(getDataAtCell(0, 0)).toEqual('A1');

      setDataAtCell(0, 0, 'XX');

      expect(getDataAtCell(0, 0)).toEqual('XX');

      contextMenu();

      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(6).simulate('mousedown'); // Undo

      expect(getDataAtCell(0, 0)).toEqual('A1');
    });

    it('should redo changes', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      selectCell(0, 0);

      expect(getDataAtCell(0, 0)).toEqual('A1');

      setDataAtCell(0, 0, 'XX');

      expect(getDataAtCell(0, 0)).toEqual('XX');

      hot.undo();

      expect(getDataAtCell(0, 0)).toEqual('A1');

      contextMenu();

      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(7).simulate('mousedown'); // Redo

      expect(getDataAtCell(0, 0)).toEqual('XX');
    });

    it('should display only the specified actions', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: ['remove_row', 'undo'],
        height: 100
      });

      contextMenu();

      expect($('.htContextMenu .ht_master .htCore').find('tbody td').length).toEqual(2);
    });

    it('should make a single selected cell read-only', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      selectCell(0, 0);

      expect(getDataAtCell(0, 0)).toEqual('A1');
      expect(hot.getCellMeta(0, 0).readOnly).toBe(false);

      selectCell(0, 0);
      contextMenu();
      var menu = $('.htContextMenu .ht_master .htCore tbody');
      menu.find('td').not('.htSeparator').eq(8).simulate('mousedown'); // Make read-only

      expect(hot.getCellMeta(0, 0).readOnly).toBe(true);
    });

    it('should make a single selected cell writable, when it\'s set to read-only', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      selectCell(0, 0);

      expect(getDataAtCell(0, 0)).toEqual('A1');

      hot.getCellMeta(0, 0).readOnly = true;

      selectCell(0, 0);
      contextMenu();
      var menu = $('.htContextMenu .ht_master .htCore tbody');
      menu.find('td').not('.htSeparator').eq(8).simulate('mousedown');

      expect(hot.getCellMeta(0, 0).readOnly).toBe(false);
    });

    it('should make a range of selected cells read-only, if all of them are writable', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      expect(hot.getCellMeta(0, 0).readOnly).toEqual(false);
      expect(hot.getCellMeta(0, 1).readOnly).toEqual(false);
      expect(hot.getCellMeta(1, 0).readOnly).toEqual(false);
      expect(hot.getCellMeta(1, 1).readOnly).toEqual(false);

      selectCell(0, 0, 2, 2);

      contextMenu();
      $('.htContextMenu .ht_master .htCore tbody').find('td').not('.htSeparator').eq(8).simulate('mousedown');

      expect(hot.getCellMeta(0, 0).readOnly).toEqual(true);
      expect(hot.getCellMeta(0, 1).readOnly).toEqual(true);
      expect(hot.getCellMeta(1, 0).readOnly).toEqual(true);
      expect(hot.getCellMeta(1, 1).readOnly).toEqual(true);
      expect(getSelected()).toEqual([[0, 0, 2, 2]]);
    });

    it('should make a multiple of selected cells read-only, if all of them are writable', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      expect(hot.getCellMeta(0, 0).readOnly).toBe(false);
      expect(hot.getCellMeta(0, 1).readOnly).toBe(false);
      expect(hot.getCellMeta(1, 0).readOnly).toBe(false);
      expect(hot.getCellMeta(1, 1).readOnly).toBe(false);

      selectCell(0, 0, 2, 2);

      contextMenu();
      $('.htContextMenu .ht_master .htCore tbody').find('td').not('.htSeparator').eq(8).simulate('mousedown');

      expect(hot.getCellMeta(0, 0).readOnly).toBe(true);
      expect(hot.getCellMeta(0, 1).readOnly).toBe(true);
      expect(hot.getCellMeta(1, 0).readOnly).toBe(true);
      expect(hot.getCellMeta(1, 1).readOnly).toBe(true);
    });

    it('should not close menu after clicking on submenu root item', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: ['row_above', 'remove_row', '---------', 'alignment'],
        height: 400
      });

      selectCell(1, 0, 3, 0);
      contextMenu();

      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(2).simulate('mousedown'); // Alignment
      expect($('.htContextMenu').is(':visible')).toBe(true);
    });

    it('should make a group of selected cells read-only, if all of them are writable (reverse selection)', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      expect(hot.getCellMeta(0, 0).readOnly).toBe(false);
      expect(hot.getCellMeta(0, 1).readOnly).toBe(false);
      expect(hot.getCellMeta(1, 0).readOnly).toBe(false);
      expect(hot.getCellMeta(1, 1).readOnly).toBe(false);

      selectCell(2, 2, 0, 0);

      contextMenu();

      var menu = $('.htContextMenu .ht_master .htCore tbody');
      menu.find('td').not('.htSeparator').eq(8).simulate('mousedown'); // Make read-only

      expect(hot.getCellMeta(0, 0).readOnly).toBe(true);
      expect(hot.getCellMeta(0, 1).readOnly).toBe(true);
      expect(hot.getCellMeta(1, 0).readOnly).toBe(true);
      expect(hot.getCellMeta(1, 1).readOnly).toBe(true);
    });

    it('should make a group of selected cells writable if at least one of them is read-only', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      expect(hot.getCellMeta(0, 0).readOnly).toBe(false);
      expect(hot.getCellMeta(0, 1).readOnly).toBe(false);
      expect(hot.getCellMeta(1, 0).readOnly).toBe(false);
      expect(hot.getCellMeta(1, 1).readOnly).toBe(false);

      hot.getCellMeta(1, 1).readOnly = true;

      selectCell(0, 0, 2, 2);

      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(8).simulate('mousedown'); // Make writable

      expect(hot.getCellMeta(0, 0).readOnly).toBe(false);
      expect(hot.getCellMeta(0, 1).readOnly).toBe(false);
      expect(hot.getCellMeta(1, 0).readOnly).toBe(false);
      expect(hot.getCellMeta(1, 1).readOnly).toBe(false);
    });

    it('should make a group of selected cells writable if at least one of them is read-only (reverse selection)', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      expect(hot.getCellMeta(0, 0).readOnly).toBe(false);
      expect(hot.getCellMeta(0, 1).readOnly).toBe(false);
      expect(hot.getCellMeta(1, 0).readOnly).toBe(false);
      expect(hot.getCellMeta(1, 1).readOnly).toBe(false);

      hot.getCellMeta(1, 1).readOnly = true;

      selectCell(2, 2, 0, 0);

      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(8).simulate('mousedown'); // Make writable

      expect(hot.getCellMeta(0, 0).readOnly).toBe(false);
      expect(hot.getCellMeta(0, 1).readOnly).toBe(false);
      expect(hot.getCellMeta(1, 0).readOnly).toBe(false);
      expect(hot.getCellMeta(1, 1).readOnly).toBe(false);
    });
  });

  describe('disabling actions', () => {
    it('should not close menu after clicking on disabled item', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: ['undo', 'redo'],
        height: 400
      });

      selectCell(1, 0, 3, 0);
      contextMenu();

      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(0).simulate('mousedown'); // Undo
      expect($('.htContextMenu').is(':visible')).toBe(true);
    });

    it('should disable undo and redo action if undoRedo plugin is not enabled ', () => {
      var hot = handsontable({
        contextMenu: true,
        undoRedo: false,
        height: 100
      });

      contextMenu();
      var $menu = $('.htContextMenu .ht_master .htCore');

      expect($menu.find('tbody td:eq(9)').text()).toEqual('Undo');
      expect($menu.find('tbody td:eq(9)').hasClass('htDisabled')).toBe(true);
      expect($menu.find('tbody td:eq(10)').text()).toEqual('Redo');
      expect($menu.find('tbody td:eq(10)').hasClass('htDisabled')).toBe(true);
    });

    it('should disable undo when there is nothing to undo ', () => {
      var hot = handsontable({
        contextMenu: true,
        height: 100
      });

      contextMenu();
      var $menu = $('.htContextMenu .ht_master .htCore');

      expect(hot.undoRedo.isUndoAvailable()).toBe(false);
      expect($menu.find('tbody td:eq(9)').text()).toEqual('Undo');
      expect($menu.find('tbody td:eq(9)').hasClass('htDisabled')).toBe(true);

      closeContextMenu();

      setDataAtCell(0, 0, 'foo');

      contextMenu();
      $menu = $('.htContextMenu .ht_master .htCore');
      expect(hot.undoRedo.isUndoAvailable()).toBe(true);
      expect($menu.find('tbody td:eq(9)').hasClass('htDisabled')).toBe(false);
    });

    it('should disable redo when there is nothing to redo ', () => {
      var hot = handsontable({
        contextMenu: true,
        height: 100
      });

      contextMenu();
      var $menu = $('.htContextMenu .ht_master .htCore');

      expect(hot.undoRedo.isRedoAvailable()).toBe(false);
      expect($menu.find('tbody td:eq(10)').text()).toEqual('Redo');
      expect($menu.find('tbody td:eq(10)').hasClass('htDisabled')).toBe(true);

      closeContextMenu();

      setDataAtCell(0, 0, 'foo');
      hot.undo();

      contextMenu();
      $menu = $('.htContextMenu .ht_master .htCore');
      expect(hot.undoRedo.isRedoAvailable()).toBe(true);
      expect($menu.find('tbody td:eq(10)').hasClass('htDisabled')).toBe(false);
    });

    it('should disable Insert row in context menu when maxRows is reached', () => {
      var hot = handsontable({
        contextMenu: true,
        maxRows: 6,
        height: 100
      });

      contextMenu();
      var $menu = $('.htContextMenu .ht_master .htCore');

      expect($menu.find('tbody td:eq(0)').text()).toEqual('Insert row above');
      expect($menu.find('tbody td:eq(0)').hasClass('htDisabled')).toBe(false);
      expect($menu.find('tbody td:eq(1)').text()).toEqual('Insert row below');
      expect($menu.find('tbody td:eq(1)').hasClass('htDisabled')).toBe(false);

      closeContextMenu();

      alter('insert_row');

      contextMenu();
      $menu = $('.htContextMenu .ht_master .htCore');

      expect($menu.find('tbody td:eq(0)').hasClass('htDisabled')).toBe(true);
      expect($menu.find('tbody td:eq(1)').hasClass('htDisabled')).toBe(true);
    });

    it('should disable Insert col in context menu when maxCols is reached', () => {
      var hot = handsontable({
        contextMenu: true,
        maxCols: 6,
        height: 100
      });

      contextMenu();
      var $menu = $('.htContextMenu .ht_master .htCore');

      expect($menu.find('tbody td:eq(3)').text()).toEqual('Insert column left');
      expect($menu.find('tbody td:eq(3)').hasClass('htDisabled')).toBe(false);
      expect($menu.find('tbody td:eq(4)').text()).toEqual('Insert column right');
      expect($menu.find('tbody td:eq(4)').hasClass('htDisabled')).toBe(false);

      closeContextMenu();

      alter('insert_col');

      contextMenu();
      $menu = $('.htContextMenu .ht_master .htCore');
      expect($menu.find('tbody td:eq(3)').hasClass('htDisabled')).toBe(true);
      expect($menu.find('tbody td:eq(4)').hasClass('htDisabled')).toBe(true);
    });

    it('should NOT disable Insert col in context menu when only one column exists', () => {
      var hot = handsontable({
        data: [['single col']],
        contextMenu: true,
        maxCols: 10,
        height: 100
      });

      selectCell(0, 0);
      contextMenu();
      var $menu = $('.htContextMenu .ht_master .htCore');

      expect($menu.find('tbody td:eq(3)').text()).toEqual('Insert column left');
      expect($menu.find('tbody td:eq(3)').hasClass('htDisabled')).toBe(false);
      expect($menu.find('tbody td:eq(4)').text()).toEqual('Insert column right');
      expect($menu.find('tbody td:eq(4)').hasClass('htDisabled')).toBe(false);
    });

    it('should disable Remove col in context menu when rows are selected by headers', function () {
      var hot = handsontable({
        contextMenu: ['remove_col', 'remove_row'],
        height: 100,
        colHeaders: true,
        rowHeaders: true
      });
      var $rowsHeaders = this.$container.find('.ht_clone_left tr th');

      $rowsHeaders.eq(1).simulate('mousedown');
      $rowsHeaders.eq(2).simulate('mouseover');
      $rowsHeaders.eq(3).simulate('mouseover');
      $rowsHeaders.eq(3).simulate('mousemove');
      $rowsHeaders.eq(3).simulate('mouseup');

      contextMenu();
      var $menu = $('.htContextMenu .ht_master .htCore');

      expect($menu.find('tbody td:eq(0)').text()).toEqual('Remove columns');
      expect($menu.find('tbody td:eq(0)').hasClass('htDisabled')).toBe(true);
    });

    it('should disable Remove row in context menu when columns are selected by headers', function () {
      var hot = handsontable({
        contextMenu: ['remove_col', 'remove_row'],
        height: 100,
        colHeaders: true,
        rowHeaders: true
      });

      this.$container.find('thead tr:eq(0) th:eq(1)').simulate('mousedown');
      this.$container.find('thead tr:eq(0) th:eq(2)').simulate('mouseover');
      this.$container.find('thead tr:eq(0) th:eq(3)').simulate('mouseover');
      this.$container.find('thead tr:eq(0) th:eq(3)').simulate('mousemove');
      this.$container.find('thead tr:eq(0) th:eq(3)').simulate('mouseup');

      contextMenu();
      var $menu = $('.htContextMenu .ht_master .htCore');

      expect($menu.find('tbody td:eq(1)').text()).toEqual('Remove rows');
      expect($menu.find('tbody td:eq(1)').hasClass('htDisabled')).toBe(true);
    });
  });

  describe('custom options', () => {
    it('should have custom items list', () => {

      var callback1 = jasmine.createSpy('callback1');
      var callback2 = jasmine.createSpy('callback2');

      var hot = handsontable({
        contextMenu: {
          items: {
            cust1: {
              name: 'CustomItem1',
              callback: callback1
            },
            cust2: {
              name: 'CustomItem2',
              callback: callback2
            }
          }
        },
        height: 100
      });

      contextMenu();

      expect($('.htContextMenu .ht_master .htCore').find('tbody td').length).toEqual(2);
      expect($('.htContextMenu .ht_master .htCore').find('tbody td').text()).toEqual(['CustomItem1', 'CustomItem2'].join(''));

      $('.htContextMenu .ht_master .htCore').find('tbody td:eq(0)').simulate('mousedown');

      expect(callback1.calls.count()).toEqual(1);
      expect(callback2.calls.count()).toEqual(0);

      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td:eq(1)').simulate('mousedown');

      expect(callback1.calls.count()).toEqual(1);
      expect(callback2.calls.count()).toEqual(1);
    });

    it('should have custom items list (defined as a function)', () => {
      var enabled = false;
      var hot = handsontable({
        contextMenu: {
          items: {
            cust1: {
              name() {
                if (!enabled) {
                  return 'Enable my custom option';
                }
                return 'Disable my custom option';
              },
              callback() {}
            }
          }
        },
        height: 100
      });

      contextMenu();

      expect($('.htContextMenu .ht_master .htCore').find('tbody td').text()).toEqual('Enable my custom option');

      $('.htContextMenu .ht_master .htCore').find('tbody td:eq(0)').simulate('mousedown');

      enabled = true;
      contextMenu();

      expect($('.htContextMenu .ht_master .htCore').find('tbody td').text()).toEqual('Disable my custom option');

      $('.htContextMenu .ht_master .htCore').find('tbody td:eq(0)').simulate('mousedown');
    });

    it('should bind HOT instace to menu\'s `name` function', () => {
      let thisInsideFunction;

      const hot = handsontable({
        contextMenu: {
          items: {
            cust1: {
              name() {
                thisInsideFunction = this;

                return 'Example';
              }
            }
          }
        },
        height: 100
      });

      contextMenu();

      expect(thisInsideFunction).toEqual(hot);
    });

    it('should enable to define item options globally', () => {

      var callback = jasmine.createSpy('callback');

      var hot = handsontable({
        contextMenu: {
          callback,
          items: {
            cust1: {
              name: 'CustomItem1'
            },
            cust2: {
              name: 'CustomItem2'
            }
          }
        },
        height: 100
      });

      contextMenu();

      $('.htContextMenu .ht_master .htCore').find('tbody td:eq(0)').simulate('mousedown');

      expect(callback.calls.count()).toEqual(1);

      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td:eq(1)').simulate('mousedown');

      expect(callback.calls.count()).toEqual(2);
    });

    it('should override default items options', () => {
      var callback = jasmine.createSpy('callback');

      var hot = handsontable({
        contextMenu: {
          items: {
            remove_row: {
              callback
            },
            remove_col: {
              name: 'Delete column'
            }
          }
        },
        height: 100
      });

      contextMenu();

      expect($('.htContextMenu .ht_master .htCore').find('tbody td').length).toEqual(2);
      expect($('.htContextMenu .ht_master .htCore').find('tbody td').text()).toEqual(['Remove row', 'Delete column'].join(''));

      $('.htContextMenu .ht_master .htCore').find('tbody td:eq(0)').simulate('mousedown');

      expect(callback.calls.count()).toEqual(1);

      expect(countCols()).toEqual(5);

      contextMenu();
      $('.htContextMenu .ht_master .htCore').find('tbody td:eq(1)').simulate('mousedown');

      expect(countCols()).toEqual(4);
    });

    it('should fire item callback after item has been clicked', () => {
      var customItem = {
        name: 'Custom item',
        callback() {}
      };

      spyOn(customItem, 'callback');

      var hot = handsontable({
        contextMenu: {
          items: {
            customItemKey: customItem
          }
        },
        height: 100
      });

      contextMenu();

      $('.htContextMenu .ht_master .htCore').find('tbody td:eq(0)').simulate('mousedown');

      expect(customItem.callback.calls.count()).toEqual(1);
      expect(customItem.callback.calls.argsFor(0)[0]).toEqual('customItemKey');
    });
  });

  describe('keyboard navigation', () => {
    describe('no item selected', () => {
      it('should select the first item in menu, when user hits ARROW_DOWN', () => {
        var hot = handsontable({
          contextMenu: true,
          height: 100
        });

        contextMenu();
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        expect(menuHot.getSelected()).toBeUndefined();

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[0, 0, 0, 0]]);
      });

      it('should scroll down, when user hits ARROW_DOWN for item in menu below the viewport', () => {
        var hot = handsontable({
          height: 100,
          contextMenu: {
            items: {
              item1: {
                name: 'Item1'
              },
              item2: {
                name: 'Item2'
              },
              item3: {
                name: 'Item3'
              },
              item4: {
                name: 'Item4'
              },
              item5: {
                name: 'Item5'
              },
              item6: {
                name: 'Item6'
              },
              item7: {
                name: 'Item7'
              },
              item8: {
                name: 'Item8'
              },
              item9: {
                name: 'Item9'
              },
              item10: {
                name: 'Item10'
              },
              item11: {
                name: 'Item11'
              },
              item12: {
                name: 'Item12'
              },
              item13: {
                name: 'Item13'
              },
              item14: {
                name: 'Item14'
              },
              item15: {
                name: 'Item15'
              },
              item16: {
                name: 'Item16'
              },
              item17: {
                name: 'Item17'
              },
              item18: {
                name: 'Item18'
              },
              item19: {
                name: 'Item19'
              },
              item20: {
                name: 'Item20'
              },
              item21: {
                name: 'Item21'
              },
              item22: {
                name: 'Item22'
              },
              item23: {
                name: 'Item23'
              },
              item24: {
                name: 'Item24'
              },
              item25: {
                name: 'Item25'
              },
              item26: {
                name: 'Item26'
              },
              item27: {
                name: 'Item27'
              },
              item28: {
                name: 'Item28'
              },
              item29: {
                name: 'Item29'
              },
              item30: {
                name: 'Item30'
              },
              item31: {
                name: 'Item31'
              },
              item32: {
                name: 'Item32'
              },
              item33: {
                name: 'Item33'
              },
              item34: {
                name: 'Item34'
              },
              item35: {
                name: 'Item35'
              },
              item36: {
                name: 'Item36'
              },
              item37: {
                name: 'Item37'
              },
              item38: {
                name: 'Item38'
              },
              item39: {
                name: 'Item39'
              },
              item40: {
                name: 'Item40'
              }
            }
          }
        }),
            scrollHeight;

        contextMenu();

        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');
        keyDownUp('arrow_down');

        if (typeof window.scrollY !== 'undefined') {
          scrollHeight = window.scrollY;
        } else {
          scrollHeight = document.documentElement.scrollTop;
        }

        expect(scrollHeight).not.toBe(0);
      });

      it('should select the first NOT DISABLED item in menu, when user hits ARROW_DOWN', () => {
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: {
                name: 'Item1',
                disabled: true
              },
              item2: {
                name: 'Item2',
                disabled: true
              },
              item3: {
                name: 'Item3'
              }
            }
          },
          height: 100
        });

        contextMenu();

        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        expect(menuHot.getSelected()).toBeUndefined();

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[2, 0, 2, 0]]);
      });

      it('should NOT select any items in menu, when user hits ARROW_DOWN and there is no items enabled', () => {
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: {
                name: 'Item1',
                disabled: true
              },
              item2: {
                name: 'Item2',
                disabled: true
              },
              item3: {
                name: 'Item3',
                disabled: true
              }
            }
          },
          height: 100
        });

        contextMenu();
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        expect(menuHot.getSelected()).toBeUndefined();

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toBeUndefined();
      });

      it('should select the last item in menu, when user hits ARROW_UP', () => {
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: 'Item1',
              item2: 'Item2',
              item3: 'Item3'
            }
          },
          height: 100
        });

        contextMenu();
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        expect(menuHot.getSelected()).toBeUndefined();

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[2, 0, 2, 0]]);
      });

      it('should select the last NOT DISABLED item in menu, when user hits ARROW_UP', () => {
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: {
                name: 'Item1'
              },
              item2: {
                name: 'Item2',
                disabled: true
              },
              item3: {
                name: 'Item3',
                disabled: true
              }
            }
          },
          height: 100
        });

        contextMenu();
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        expect(menuHot.getSelected()).toBeUndefined();

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[0, 0, 0, 0]]);
      });

      it('should NOT select any items in menu, when user hits ARROW_UP and there is no items enabled', () => {
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: {
                name: 'Item1',
                disabled: true
              },
              item2: {
                name: 'Item2',
                disabled: true
              },
              item3: {
                name: 'Item3',
                disabled: true
              }
            }
          },
          height: 100
        });

        contextMenu();
        var id = $('.htContextMenu')[0].id;
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        expect(menuHot.getSelected()).toBeUndefined();

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toBeUndefined();
      });
    });

    describe('item selected', () => {
      it('should select next item when user hits ARROW_DOWN', () => {
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: {
                name: 'Item1'
              },
              item2: {
                name: 'Item2'
              },
              item3: {
                name: 'Item3'
              }
            }
          },
          height: 100
        });

        contextMenu();
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[0, 0, 0, 0]]);

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[1, 0, 1, 0]]);

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[2, 0, 2, 0]]);
      });

      it('should select next item (skipping disabled items) when user hits ARROW_DOWN', () => {
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: {
                name: 'Item1'
              },
              item2: {
                name: 'Item2',
                disabled: true
              },
              item3: {
                name: 'Item3'
              }
            }
          },
          height: 100
        });

        contextMenu();
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[0, 0, 0, 0]]);

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[2, 0, 2, 0]]);
      });

      it('should select next item (skipping separators) when user hits ARROW_DOWN', () => {
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: {
                name: 'Item1'
              },
              sep1: Handsontable.plugins.ContextMenu.SEPARATOR,
              item2: {
                name: 'Item2'
              },
              item3: {
                name: 'Item3'
              }
            }
          },
          height: 100
        });

        contextMenu();
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[0, 0, 0, 0]]);

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[2, 0, 2, 0]]);

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[3, 0, 3, 0]]);
      });

      it('should not change selection when last item is selected and user hits ARROW_DOWN', () => {
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: {
                name: 'Item1'
              },
              item2: {
                name: 'Item2'
              },
              item3: {
                name: 'Item3'
              }
            }
          },
          height: 100
        });

        contextMenu();
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[0, 0, 0, 0]]);

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[1, 0, 1, 0]]);

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[2, 0, 2, 0]]);

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[2, 0, 2, 0]]);
      });

      it('should not change selection when last enabled item is selected and user hits ARROW_DOWN', () => {
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: {
                name: 'Item1'
              },
              item2: {
                name: 'Item2'
              },
              item3: {
                name: 'Item3',
                disabled: true
              }
            }
          },
          height: 100
        });

        contextMenu();
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[0, 0, 0, 0]]);

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[1, 0, 1, 0]]);

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[1, 0, 1, 0]]);
      });

      it('should select next item when user hits ARROW_UP', () => {
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: {
                name: 'Item1'
              },
              item2: {
                name: 'Item2'
              },
              item3: {
                name: 'Item3'
              }
            }
          },
          height: 100
        });

        contextMenu();
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[2, 0, 2, 0]]);

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[1, 0, 1, 0]]);

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[0, 0, 0, 0]]);
      });

      it('should select next item (skipping disabled items) when user hits ARROW_UP', () => {
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: {
                name: 'Item1'
              },
              item2: {
                name: 'Item2',
                disabled: true
              },
              item3: {
                name: 'Item3'
              }
            }
          },
          height: 100
        });

        contextMenu();
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[2, 0, 2, 0]]);

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[0, 0, 0, 0]]);
      });

      it('should select next item (skipping separators) when user hits ARROW_UP', () => {
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: {
                name: 'Item1'
              },
              sep1: Handsontable.plugins.ContextMenu.SEPARATOR,
              item2: {
                name: 'Item2'
              },
              item3: {
                name: 'Item3'
              }
            }
          },
          height: 100
        });

        contextMenu();
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[3, 0, 3, 0]]);

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[2, 0, 2, 0]]);

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[0, 0, 0, 0]]);
      });

      it('should not change selection when first item is selected and user hits ARROW_UP', () => {
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: {
                name: 'Item1'
              },
              item2: {
                name: 'Item2'
              },
              item3: {
                name: 'Item3'
              }
            }
          },
          height: 100
        });

        contextMenu();
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[2, 0, 2, 0]]);

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[1, 0, 1, 0]]);

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[0, 0, 0, 0]]);

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[0, 0, 0, 0]]);
      });

      it('should not change selection when first enabled item is selected and user hits ARROW_UP', () => {
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: {
                name: 'Item1',
                disabled: true
              },
              item2: {
                name: 'Item2'
              },
              item3: {
                name: 'Item3'
              }
            }
          },
          height: 100
        });

        contextMenu();
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[2, 0, 2, 0]]);

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[1, 0, 1, 0]]);

        keyDownUp('arrow_up');

        expect(menuHot.getSelected()).toEqual([[1, 0, 1, 0]]);
      });

      it('should perform a selected item action, when user hits ENTER', () => {
        var itemAction = jasmine.createSpy('itemAction');
        var hot = handsontable({
          contextMenu: {
            items: {
              item1: {
                name: 'Item1',
                callback: itemAction
              },
              item2: 'Item2'
            }
          },
          height: 100
        });

        contextMenu();
        var menuHot = hot.getPlugin('contextMenu').menu.hotMenu;

        keyDownUp('arrow_down');

        expect(menuHot.getSelected()).toEqual([[0, 0, 0, 0]]);

        expect(itemAction).not.toHaveBeenCalled();

        keyDownUp('enter');

        expect(itemAction).toHaveBeenCalled();
        expect($(hot.getPlugin('contextMenu').menu).is(':visible')).toBe(false);
      });
    });

    it('should close menu when user hits ESC', () => {
      handsontable({
        contextMenu: true,
        height: 100
      });

      contextMenu();

      expect($('.htContextMenu').is(':visible')).toBe(true);

      keyDownUp('esc');

      expect($('.htContextMenu').is(':visible')).toBe(false);
    });

    it('should close sub-menu and parent menu in proper order when user hits ESC twice', async () => {
      handsontable({
        contextMenu: true,
        height: 100
      });

      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      var contextMenuRoot = $('.htContextMenu');

      item.simulate('mouseover');

      await sleep(300);

      expect($('.htContextMenuSub_Alignment').is(':visible')).toBe(true);

      keyDownUp('esc');

      expect($('.htContextMenuSub_Alignment').is(':visible')).toBe(false);

      keyDownUp('esc');

      expect($('.htContextMenu').is(':visible')).toBe(false);
    });
  });

  describe('mouse navigation', () => {
    it('should not scroll window position after fireing mouseenter on menu item', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(1000, 5),
        contextMenu: true
      }),
          scrollHeight;

      hot.selectCell(100, 0);
      contextMenu();
      window.scrollTo(0, 0);
      $('.htContextMenu .ht_master .htCore').find('tr td:eq("0")').simulate('mouseenter');

      if (typeof window.scrollY !== 'undefined') {
        scrollHeight = window.scrollY;
      } else {
        scrollHeight = document.documentElement.scrollTop;
      }

      expect(scrollHeight).toBe(0);
    });

    it('should not scroll window position after fireing click on menu', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(1000, 5),
        contextMenu: {
          items: {
            item1: {
              name: 'Item1'
            },
            sep1: Handsontable.plugins.ContextMenu.SEPARATOR,
            item2: {
              name: 'Item2'
            },
            item3: {
              name: 'Item3'
            }
          }
        }
      }),
          scrollHeight;

      hot.selectCell(100, 0);
      contextMenu();
      window.scrollTo(0, 0);
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(0).simulate('mousedown');

      if (typeof window.scrollY !== 'undefined') {
        scrollHeight = window.scrollY;
      } else {
        scrollHeight = document.documentElement.scrollTop;
      }

      expect(scrollHeight).toBe(0);
    });
  });

  describe('selection', () => {
    it('should not be cleared when a context menu is triggered on a selected single cell', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      selectCell(0, 0);
      contextMenu();

      expect($('.htContextMenu').is(':visible')).toBe(true);
      expect(getSelected()).toEqual([[0, 0, 0, 0]]);
    });

    it('should not be cleared when a context menu is triggered on a range of selected cells', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      selectCell(0, 0, 2, 2);
      contextMenu();

      expect($('.htContextMenu').is(':visible')).toBe(true);
      expect(getSelected()).toEqual([[0, 0, 2, 2]]);
    });

    it('should not be cleared when a context menu is triggered on the first layer of the non-contiguous selection', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        contextMenu: true,
        height: 200
      });

      $(getCell(0, 0)).simulate('mousedown');
      $(getCell(2, 2)).simulate('mouseover');
      $(getCell(2, 2)).simulate('mouseup');

      keyDown('ctrl');

      $(getCell(2, 2)).simulate('mousedown');
      $(getCell(7, 2)).simulate('mouseover');
      $(getCell(7, 2)).simulate('mouseup');

      $(getCell(2, 4)).simulate('mousedown');
      $(getCell(2, 4)).simulate('mouseover');
      $(getCell(2, 4)).simulate('mouseup');

      keyUp('ctrl');
      contextMenu(getCell(0, 0));

      expect($('.htContextMenu').is(':visible')).toBe(true);
      expect(getSelected()).toEqual([[0, 0, 2, 2], [2, 2, 7, 2], [2, 4, 2, 4]]);
    });

    it('should not be cleared when a context menu is triggered on the second layer of the non-contiguous selection', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        contextMenu: true,
        height: 200
      });

      $(getCell(0, 0)).simulate('mousedown');
      $(getCell(2, 2)).simulate('mouseover');
      $(getCell(2, 2)).simulate('mouseup');

      keyDown('ctrl');

      $(getCell(2, 2)).simulate('mousedown');
      $(getCell(7, 2)).simulate('mouseover');
      $(getCell(7, 2)).simulate('mouseup');

      $(getCell(2, 4)).simulate('mousedown');
      $(getCell(2, 4)).simulate('mouseover');
      $(getCell(2, 4)).simulate('mouseup');

      keyUp('ctrl');
      contextMenu(getCell(2, 2));

      expect($('.htContextMenu').is(':visible')).toBe(true);
      expect(getSelected()).toEqual([[0, 0, 2, 2], [2, 2, 7, 2], [2, 4, 2, 4]]);
    });

    it('should not be cleared when a context menu is triggered on the last layer of the non-contiguous selection', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        contextMenu: true,
        height: 200
      });

      $(getCell(0, 0)).simulate('mousedown');
      $(getCell(2, 2)).simulate('mouseover');
      $(getCell(2, 2)).simulate('mouseup');

      keyDown('ctrl');

      $(getCell(2, 2)).simulate('mousedown');
      $(getCell(7, 2)).simulate('mouseover');
      $(getCell(7, 2)).simulate('mouseup');

      $(getCell(2, 4)).simulate('mousedown');
      $(getCell(2, 4)).simulate('mouseover');
      $(getCell(2, 4)).simulate('mouseup');

      keyUp('ctrl');
      contextMenu(getCell(2, 4));

      expect($('.htContextMenu').is(':visible')).toBe(true);
      expect(getSelected()).toEqual([[0, 0, 2, 2], [2, 2, 7, 2], [2, 4, 2, 4]]);
    });
  });

  describe('working with multiple tables', () => {
    beforeEach(function () {
      this.$container2 = $(`<div id="${id}-2"></div>`).appendTo('body');
    });

    afterEach(function () {
      if (this.$container2) {
        this.$container2.handsontable('destroy');
        this.$container2.remove();
      }
    });

    it('should apply enabling/disabling contextMenu using updateSetting only to particular instance of HOT ', function () {
      var hot1 = handsontable({
        contextMenu: false,
        height: 100
      });
      var hot2 = this.$container2.handsontable({
        contextMenu: true,
        height: 100
      });

      hot2 = hot2.handsontable('getInstance');
      var contextMenuContainer = $('.htContextMenu');

      contextMenu();
      expect(hot1.getPlugin('contextMenu').isEnabled()).toBe(false);
      expect(contextMenuContainer.is(':visible')).toBe(false);

      contextMenu2();
      expect(hot2.getPlugin('contextMenu').isEnabled()).toBe(true);
      expect($('.htContextMenu').is(':visible')).toBe(true);

      mouseDown(hot2.rootElement); // close menu

      hot1.updateSettings({
        contextMenu: true
      });
      hot2.updateSettings({
        contextMenu: false
      });

      contextMenu2();
      expect(hot2.getPlugin('contextMenu').isEnabled()).toBe(false);

      contextMenu();

      setTimeout(() => {
        expect($('.htContextMenu').is(':visible')).toBe(true);
      }, 1100);

      function contextMenu2() {
        var hot = spec().$container2.data('handsontable');
        var selected = hot.getSelected();

        if (!selected) {
          hot.selectCell(0, 0);
          selected = hot.getSelected();
        }

        var cell = hot.getCell(selected[0][0], selected[0][1]);
        var cellOffset = $(cell).offset();

        $(cell).simulate('contextmenu', {
          pageX: cellOffset.left,
          pageY: cellOffset.top
        });
      }
    });

    it('should perform a contextMenu action only for particular instance of HOT ', function () {
      var hot1 = handsontable({
        contextMenu: true,
        height: 100
      });

      var hot2 = this.$container2.handsontable({
        contextMenu: true,
        height: 100
      });

      hot2 = hot2.handsontable('getInstance');

      hot1.selectCell(0, 0);
      contextMenu();

      expect(hot1.countRows()).toEqual(5);
      expect(hot2.countRows()).toEqual(5);

      $('.htContextMenu .ht_master .htCore').find('tr td:eq("0")').simulate('mousedown'); // insert row above

      expect(hot1.countRows()).toEqual(6);
      expect(hot2.countRows()).toEqual(5);

      hot2.selectCell(0, 0);
      contextMenu2();

      expect(hot1.countRows()).toEqual(6);
      expect(hot2.countRows()).toEqual(5);

      $('.htContextMenu .ht_master .htCore').find('tr td:eq("0")').simulate('mousedown'); // insert row above

      expect(hot1.countRows()).toEqual(6);
      expect(hot2.countRows()).toEqual(6);

      function contextMenu2() {
        var hot = spec().$container2.data('handsontable');
        var selected = hot.getSelected();

        if (!selected) {
          hot.selectCell(0, 0);
          selected = hot.getSelected();
        }

        var cell = hot.getCell(selected[0][0], selected[0][1]);
        var cellOffset = $(cell).offset();

        $(cell).simulate('contextmenu', {
          pageX: cellOffset.left,
          pageY: cellOffset.top
        });
      }
    });
  });

  describe('context menu with native scroll', () => {
    beforeEach(function () {
      var wrapper = $('<div></div>').css({
        width: 400,
        height: 200,
        overflow: 'scroll'
      });

      this.$wrapper = this.$container.wrap(wrapper).parent();
    });

    afterEach(function () {
      if (this.$container) {
        destroy();
        this.$container.remove();
      }
      this.$wrapper.remove();
    });

    it('should display menu table is not scrolled', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(40, 30),
        colWidths: 50, // can also be a number or a function
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        height: 100
      });

      contextMenu();

      expect($('.htContextMenu').is(':visible')).toBe(true);
    });

    it('should display menu table is scrolled', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(40, 30),
        colWidths: 50, // can also be a number or a function
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        height: 100
      });

      var mainHolder = hot.view.wt.wtTable.holder;

      $(mainHolder).scrollTop(300);
      $(mainHolder).scroll();

      selectCell(15, 3);
      contextMenu();

      expect($('.htContextMenu').is(':visible')).toBe(true);
    });

    it('should not close the menu, when table is scrolled', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(40, 30),
        colWidths: 50, // can also be a number or a function
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        height: 100
      });

      var $mainHolder = $(hot.view.wt.wtTable.holder);

      selectCell(15, 3);
      var scrollTop = $mainHolder.scrollTop();
      contextMenu();

      expect($('.htContextMenu').is(':visible')).toBe(true);

      $mainHolder.scrollTop(scrollTop + 60).scroll();

      expect($('.htContextMenu').is(':visible')).toBe(true);

      contextMenu();

      expect($('.htContextMenu').is(':visible')).toBe(true);

      $mainHolder.scrollTop(scrollTop + 100).scroll();

      expect($('.htContextMenu').is(':visible')).toBe(true);
    });

    it('should not attempt to close menu, when table is scrolled and the menu is already closed', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(40, 30),
        colWidths: 50, // can also be a number or a function
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        height: 100
      });

      var mainHolder = $(hot.view.wt.wtTable.holder);

      selectCell(15, 3);
      var scrollTop = mainHolder.scrollTop();
      contextMenu();
      var $menu = $('.htContextMenu');

      spyOn(hot.getPlugin('contextMenu'), 'close');

      mainHolder.scrollTop(scrollTop + 100).scroll();

      expect(hot.getPlugin('contextMenu').close).not.toHaveBeenCalled();
    });

    it('should not scroll the window when hovering over context menu items (#1897 reopen)', () => {
      spec().$wrapper.css('overflow', 'visible');

      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(403, 303),
        colWidths: 50, // can also be a number or a function
        contextMenu: true
      });

      var beginningScrollX = window.scrollX;

      selectCell(2, 4);
      contextMenu();

      var cmInstance = hot.getPlugin('contextMenu').menu.hotMenu;

      expect(1).toEqual(1);

      cmInstance.selectCell(3, 0);

      expect(window.scrollX).toEqual(beginningScrollX);

      cmInstance.selectCell(4, 0);

      expect(window.scrollX).toEqual(beginningScrollX);

      cmInstance.selectCell(6, 0);

      expect(window.scrollX).toEqual(beginningScrollX);
    });
  });

  describe('afterContextMenuDefaultOptions hook', () => {
    it('should call afterContextMenuDefaultOptions hook with context menu options as the first param', async () => {
      const cb = jasmine.createSpy();

      cb.and.callFake(options => {
        options.items.cust1 = {
          name: 'My custom item',
          callback() {}
        };
      });

      Handsontable.hooks.add('afterContextMenuDefaultOptions', cb);

      handsontable({
        contextMenu: true,
        height: 100
      });

      contextMenu();

      const $menu = $('.htContextMenu .ht_master .htCore');

      expect($menu.find('tbody td').text()).toContain('My custom item');
      expect(cb.calls.count()).toBe(1);
      expect(cb.calls.argsFor(0)[0].items.cust1.key).toBe('cust1');
      expect(cb.calls.argsFor(0)[0].items.cust1.name).toBe('My custom item');

      Handsontable.hooks.remove('afterContextMenuDefaultOptions', cb);
    });
  });

  describe('beforeContextMenuSetItems hook', () => {
    it('should add new menu item even when item is excluded from plugin settings', () => {
      Handsontable.hooks.add('beforeContextMenuSetItems', function (options) {
        if (this === hot || !hot) {
          options.push({
            key: 'test',
            name: 'Test'
          });
        }
      });

      var hot = handsontable({
        contextMenu: ['make_read_only'],
        height: 100
      });

      contextMenu();

      var items = $('.htContextMenu tbody td');
      var actions = items.not('.htSeparator');

      expect(actions.text()).toEqual(['Read only', 'Test'].join(''));
    });

    it('should be called only with items selected in plugin settings', () => {
      var keys = [];

      Handsontable.hooks.add('beforeContextMenuSetItems', function (items) {
        if (this === hot || !hot) {
          keys = items.map(v => v.key);
        }
      });

      var hot = handsontable({
        contextMenu: ['make_read_only', 'col_left'],
        height: 100
      });

      contextMenu();

      expect(keys).toEqual(['make_read_only', 'col_left']);
    });
  });
});

/***/ }),
/* 343 */
/***/ (function(module, exports) {

describe('ContextMenu', function () {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $('<div id="' + id + '"></div>').appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  describe('alignment', function () {
    it('should align text left', function (done) {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      item.simulate('mouseover');

      setTimeout(function () {
        var contextSubMenu = $('.htContextMenuSub_' + item.text());
        var button = contextSubMenu.find('.ht_master .htCore tbody td').not('.htSeparator').eq(0);
        button.simulate('mousedown'); // Text left

        expect(getCellMeta(0, 0).className).toEqual('htLeft');
        expect(getCell(0, 0).className).toContain('htLeft');
        done();
      }, 350);
    });

    it('should align text center', function (done) {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      item.simulate('mouseover');

      setTimeout(function () {
        var contextSubMenu = $('.htContextMenuSub_' + item.text());
        var button = contextSubMenu.find('.ht_master .htCore tbody td').not('.htSeparator').eq(1);

        button.simulate('mousedown'); // Text center
        expect(getCellMeta(0, 0).className).toEqual('htCenter');
        expect(getCell(0, 0).className).toContain('htCenter');
        done();
      }, 350);
    });

    it('should align text right', function (done) {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      item.simulate('mouseover');

      setTimeout(function () {
        var contextSubMenu = $('.htContextMenuSub_' + item.text());
        var button = contextSubMenu.find('.ht_master .htCore tbody td').not('.htSeparator').eq(2);

        button.simulate('mousedown'); // Text right
        expect(getCellMeta(0, 0).className).toEqual('htRight');
        expect(getCell(0, 0).className).toContain('htRight');
        done();
      }, 350);
    });

    it('should justify text', function (done) {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      item.simulate('mouseover');

      setTimeout(function () {
        var contextSubMenu = $('.htContextMenuSub_' + item.text());
        var button = contextSubMenu.find('.ht_master .htCore tbody td').not('.htSeparator').eq(3);

        button.simulate('mousedown'); // Text justify
        deselectCell();
        expect(getCellMeta(0, 0).className).toEqual('htJustify');
        expect(getCell(0, 0).className).toContain('htJustify');
        done();
      }, 350); // menu opens after 300ms
    });

    it('should vertical align text top', function (done) {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      item.simulate('mouseover');

      setTimeout(function () {
        var contextSubMenu = $('.htContextMenuSub_' + item.text());
        var button = contextSubMenu.find('.ht_master .htCore tbody td').not('.htSeparator').eq(4);

        button.simulate('mousedown'); // Text top
        deselectCell();
        expect(getCellMeta(0, 0).className).toEqual('htTop');
        expect(getCell(0, 0).className).toContain('htTop');
        done();
      }, 350); // menu opens after 300ms
    });

    it('should vertical align text middle', function (done) {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      contextMenu();

      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      item.simulate('mouseover');

      setTimeout(function () {
        var contextSubMenu = $('.htContextMenuSub_' + item.text());
        var button = contextSubMenu.find('.ht_master .htCore tbody td').not('.htSeparator').eq(5);

        button.simulate('mousedown'); // Text middle
        deselectCell();
        expect(getCellMeta(0, 0).className).toEqual('htMiddle');
        expect(getCell(0, 0).className).toContain('htMiddle');
        done();
      }, 350); // menu opens after 300ms
    });

    it('should vertical align text bottom', function (done) {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(4, 4),
        contextMenu: true,
        height: 100
      });

      contextMenu();
      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      item.simulate('mouseover');

      setTimeout(function () {
        var contextSubMenu = $('.htContextMenuSub_' + item.text());
        var button = contextSubMenu.find('.ht_master .htCore tbody td').not('.htSeparator').eq(6);
        button.simulate('mousedown'); // Text bottom
        deselectCell();
        expect(getCellMeta(0, 0).className).toEqual('htBottom');
        expect(getCell(0, 0).className).toContain('htBottom');
        done();
      }, 350); // menu opens after 300ms
    });

    it('should trigger `afterSetCellMeta` callback after changing alignment by context menu', function (done) {
      var afterSetCellMetaCallback = jasmine.createSpy('afterSetCellMetaCallback');
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        afterSetCellMeta: afterSetCellMetaCallback
      });

      selectCell(2, 3);
      contextMenu();
      var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(9);
      item.simulate('mouseover');

      setTimeout(function () {
        var contextSubMenu = $('.htContextMenuSub_' + item.text());
        var button = contextSubMenu.find('.ht_master .htCore tbody td').not('.htSeparator').eq(2);
        button.simulate('mousedown'); // Text bottom
        deselectCell();
        expect(afterSetCellMetaCallback).toHaveBeenCalledWith(2, 3, 'className', 'htRight', undefined, undefined);
        done();
      }, 350); // menu opens after 300ms
    });
  });
});

/***/ }),
/* 344 */
/***/ (function(module, exports) {

describe('ContextMenuReadOnly', () => {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  it('should trigger `afterSetCellMeta` callback after changing cell to read only by context menu', () => {
    var afterSetCellMetaCallback = jasmine.createSpy('afterSetCellMetaCallback');
    var rows = 5,
        columns = 5;

    handsontable({
      data: Handsontable.helper.createSpreadsheetData(rows, columns),
      rowHeaders: true,
      colHeaders: true,
      contextMenu: true,
      afterSetCellMeta: afterSetCellMetaCallback
    });

    selectCell(2, 3);
    contextMenu();

    var changeToReadOnluButton = $('.htItemWrapper').filter(function () {
      return $(this).text() === 'Read only';
    })[0];

    $(changeToReadOnluButton).simulate('mousedown');
    expect(afterSetCellMetaCallback).toHaveBeenCalledWith(2, 3, 'readOnly', true, undefined, undefined);
  });
});

/***/ }),
/* 345 */
/***/ (function(module, exports) {

describe('ContextMenu', function () {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $('<div id="' + id + '"></div>').appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  describe('remove columns', function () {
    it('should execute action when single cell is selected', async function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        contextMenu: true
      });

      selectCell(2, 2);
      contextMenu();

      // "Remove column" item
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(5).simulate('mousedown');

      expect(getDataAtRow(0)).toEqual(['A1', 'B1', 'D1', 'E1']);
    });

    it('should execute action when range of the cells are selected', async function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        contextMenu: true
      });

      selectCell(2, 2, 4, 4);
      contextMenu();

      // "Remove column" item
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(5).simulate('mousedown');

      expect(getDataAtRow(0)).toEqual(['A1', 'B1']);
    });

    it('should execute action when multiple cells are selected', async function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(8, 5),
        contextMenu: true
      });

      $(getCell(0, 0)).simulate('mousedown');
      $(getCell(1, 0)).simulate('mouseover');
      $(getCell(1, 0)).simulate('mouseup');

      keyDown('ctrl');

      $(getCell(2, 1)).simulate('mousedown');
      $(getCell(2, 1)).simulate('mouseover');
      $(getCell(2, 1)).simulate('mouseup');

      $(getCell(0, 3)).simulate('mousedown');
      $(getCell(5, 3)).simulate('mouseover');
      $(getCell(5, 3)).simulate('mouseup');

      $(getCell(7, 4)).simulate('mousedown');
      $(getCell(7, 4)).simulate('mouseover');
      $(getCell(7, 4)).simulate('mouseup');

      contextMenu();

      // "Remove column" item
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(5).simulate('mousedown');

      expect(getDataAtRow(0)).toEqual(['C1']);
    });
  });
});

/***/ }),
/* 346 */
/***/ (function(module, exports) {

describe('ContextMenu', function () {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $('<div id="' + id + '"></div>').appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  describe('remove rows', function () {
    it('should execute action when single cell is selected', async function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        contextMenu: true
      });

      selectCell(2, 2);
      contextMenu();

      // "Remove row" item
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(4).simulate('mousedown');

      expect(getDataAtCol(0)).toEqual(['A1', 'A2', 'A4', 'A5']);
    });

    it('should execute action when range of the cells are selected', async function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        contextMenu: true
      });

      selectCell(2, 2, 4, 4);
      contextMenu();

      // "Remove row" item
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(4).simulate('mousedown');

      expect(getDataAtCol(0)).toEqual(['A1', 'A2']);
    });

    it('should execute action when multiple cells are selected', async function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(8, 5),
        contextMenu: true
      });

      $(getCell(0, 0)).simulate('mousedown');
      $(getCell(1, 0)).simulate('mouseover');
      $(getCell(1, 0)).simulate('mouseup');

      keyDown('ctrl');

      $(getCell(2, 1)).simulate('mousedown');
      $(getCell(2, 1)).simulate('mouseover');
      $(getCell(2, 1)).simulate('mouseup');

      $(getCell(0, 3)).simulate('mousedown');
      $(getCell(5, 3)).simulate('mouseover');
      $(getCell(5, 3)).simulate('mouseup');

      $(getCell(5, 0)).simulate('mousedown');
      $(getCell(5, 4)).simulate('mouseover');
      $(getCell(5, 4)).simulate('mouseup');

      $(getCell(7, 4)).simulate('mousedown');
      $(getCell(7, 4)).simulate('mouseover');
      $(getCell(7, 4)).simulate('mouseup');

      contextMenu();

      // "Remove row" item
      $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(4).simulate('mousedown');

      expect(getDataAtCol(0)).toEqual(['A7']);
    });
  });
});

/***/ }),
/* 347 */
/***/ (function(module, exports) {

describe('CopyPaste', () => {
  const id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  class DataTransferObject {
    constructor() {
      this.data = '';
    }
    getData() {
      return this.data;
    }
    setData(type, value) {
      this.data = value;
    }
  };

  function getClipboardEvent() {
    let event = {};
    event.clipboardData = new DataTransferObject();
    event.preventDefault = () => {};
    return event;
  }

  const arrayOfArrays = function () {
    return [['', 'Kia', 'Nissan', 'Toyota', 'Honda'], ['2008', 10, 11, 12, 13], ['2009', 20, 11, 14, 13], ['2010', 30, 15, 12, 13]];
  };

  describe('enabling/disabing plugin', () => {
    it('should copyPaste be set enabled as default', () => {
      const hot = handsontable();

      expect(hot.getSettings().copyPaste).toBeTruthy();
      expect(hot.getPlugin('CopyPaste').textarea).toBeDefined();
    });

    it('should do not create textarea element if copyPaste is disabled on initialization', () => {
      handsontable({
        copyPaste: false
      });

      expect($('#HandsontableCopyPaste').length).toEqual(0);
    });
  });

  describe('working with multiple tables', () => {
    beforeEach(function () {
      this.$container2 = $(`<div id="${id}2"></div>`).appendTo('body');
    });

    afterEach(function () {
      if (this.$container2) {
        this.$container2.handsontable('destroy');
        this.$container2.remove();
      }
    });

    it('should disable copyPaste only in particular table', function () {
      const hot1 = handsontable();
      const hot2 = spec().$container2.handsontable({ copyPaste: false }).handsontable('getInstance');

      expect(hot1.getPlugin('CopyPaste').textarea).toBeDefined();
      expect(hot2.getPlugin('CopyPaste').textarea).toBeUndefined();
    });

    it('should create only one HandsontableCopyPaste regardless of the number of tables', function () {
      handsontable();
      spec().$container2.handsontable();

      expect($('#HandsontableCopyPaste').length).toEqual(1);
    });

    it('should leave HandsontableCopyPaste as long as at least one table has copyPaste enabled', function () {
      const hot1 = handsontable();
      const hot2 = spec().$container2.handsontable().handsontable('getInstance');

      expect($('#HandsontableCopyPaste').length).toEqual(1);

      hot1.updateSettings({ copyPaste: false });

      expect($('#HandsontableCopyPaste').length).toEqual(1);

      hot2.updateSettings({ copyPaste: false });

      expect($('#HandsontableCopyPaste').length).toEqual(0);
    });
  });

  xdescribe('setting values copyable', () => {
    it('should set copyable text when selecting all cells with CTRL+A', done => {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });

      const copyPasteTextarea = $('#HandsontableCopyPaste')[0];

      expect(copyPasteTextarea.value.length).toEqual(0);

      selectCell(0, 0);

      $(document.activeElement).simulate('keydown', { keyCode: Handsontable.helper.KEY_CODES.A, ctrlKey: true });

      setTimeout(() => {
        expect(getSelected()).toEqual([[0, 0, 1, 1]]);
        expect(copyPasteTextarea.value).toEqual('A1\tB1\nA2\tB2');
        done();
      }, 10);
    });

    it('should not throw error when no cell is selected and contextmenu options was clicked', () => {
      // This is ugly trick to check problematic thing (#4390).
      // Unfortunately we cannot open the context menu, when event.target is not an TD element.
      // TODO: we have to looking for a solution for way to test contextMenu in similar use cases.
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });

      // expect no to throw any exception
      expect(() => {
        hot.getPlugin('CopyPaste').setCopyableText();
      }).not.toThrow();
    });

    it('should set copyable text when selecting a single cell with specified type and hitting ctrl (#1300)', () => {
      handsontable({
        data: [['A', 1], ['B', 2]],
        columns: [{ type: 'text' }, { type: 'numeric' }]
      });

      const copyPasteTextarea = $('#HandsontableCopyPaste')[0];

      expect(copyPasteTextarea.value.length).toEqual(0);

      selectCell(0, 0, 1, 1);
      keyDownUp(Handsontable.helper.KEY_CODES.CONTROL);

      expect(copyPasteTextarea.value).toEqual('A\t1\nB\t2');
    });

    it('should set copyable text until copyRowsLimit is reached', () => {
      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          rowsLimit: 2
        }
      });

      selectCell(0, 0, countRows() - 1, countCols() - 1); // selectAll
      keyDownUp('ctrl');

      // should prepare 2 rows for copying
      expect($('#HandsontableCopyPaste')[0].value).toEqual('\tKia\tNissan\tToyota\tHonda\n2008\t10\t11\t12\t13');
    });

    it('should set copyable text until copyColsLimit is reached', () => {
      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          columnsLimit: 2
        }
      });

      selectCell(0, 0, countRows() - 1, countCols() - 1); // selectAll
      keyDownUp('ctrl');

      // should prepare 2 columns for copying
      expect($('#HandsontableCopyPaste')[0].value).toEqual('\tKia\n2008\t10\n2009\t20\n2010\t30');
    });

    it('should call onCopyLimit callback when copy limit was reached', () => {
      let result;

      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          rowsLimit: 2,
          columnsLimit: 2
        },
        afterCopyLimit(selectedRowsCount, selectedColsCount, copyRowsLimit, copyColsLimit) {
          result = [selectedRowsCount, selectedColsCount, copyRowsLimit, copyColsLimit];
        }
      });

      selectCell(0, 0, countRows() - 1, countCols() - 1); // selectAll
      keyDownUp('ctrl');
      expect(result).toEqual([4, 5, 2, 2]);
    });
  });

  describe('copy', () => {
    xit('should be possible to copy data by keyboard shortcut', () => {
      // simulated keyboard shortcuts doesn't run the true events
    });

    xit('should be possible to copy data by contextMenu option', () => {
      // simulated mouse events doesn't run the true browser event
    });

    it('should be possible to copy data by API', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });
      const copyEvent = getClipboardEvent('copy');
      const plugin = hot.getPlugin('CopyPaste');

      selectCell(1, 0);

      plugin.setCopyableText();
      plugin.onCopy(copyEvent);

      expect(copyEvent.clipboardData.getData()).toBe('A2');
    });

    it('should call beforeCopy and afterCopy during copying operation', () => {
      const beforeCopySpy = jasmine.createSpy('beforeCopy');
      const afterCopySpy = jasmine.createSpy('afterCopy');

      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforeCopy: beforeCopySpy,
        afterCopy: afterCopySpy
      });

      const copyEvent = getClipboardEvent('copy');
      const plugin = hot.getPlugin('CopyPaste');

      selectCell(0, 0);

      plugin.setCopyableText();
      plugin.onCopy(copyEvent);

      expect(beforeCopySpy.calls.count()).toEqual(1);
      expect(beforeCopySpy).toHaveBeenCalledWith([['A1']], [{ startRow: 0, startCol: 0, endRow: 0, endCol: 0 }], void 0, void 0, void 0, void 0);
      expect(afterCopySpy.calls.count()).toEqual(1);
      expect(afterCopySpy).toHaveBeenCalledWith([['A1']], [{ startRow: 0, startCol: 0, endRow: 0, endCol: 0 }], void 0, void 0, void 0, void 0);
    });

    it('should be possible to block copying', () => {
      const beforeCopySpy = jasmine.createSpy('beforeCopy');
      const afterCopySpy = jasmine.createSpy('afterCopy');

      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforeCopy() {
          beforeCopySpy();
          return false;
        },
        afterCopy: afterCopySpy
      });

      const copyEvent = getClipboardEvent('copy');
      const plugin = hot.getPlugin('CopyPaste');

      selectCell(0, 0);

      plugin.setCopyableText();
      plugin.onCopy(copyEvent);

      expect(beforeCopySpy.calls.count()).toEqual(1);
      expect(afterCopySpy.calls.count()).toEqual(0);
    });

    it('should be possible modification of changes during copying', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforeCopy(changes) {
          changes.splice(0, 1);
        }
      });

      const copyEvent = getClipboardEvent('copy');
      const plugin = hot.getPlugin('CopyPaste');
      selectCell(0, 0, 1, 0);

      plugin.setCopyableText();
      plugin.onCopy(copyEvent);

      expect(copyEvent.clipboardData.getData()).toEqual('A2');
    });
  });

  describe('cut', () => {
    xit('should be possible to cut data by keyboard shortcut', () => {
      // simulated keyboard shortcuts doesn't run the true events
    });

    xit('should be possible to cut data by contextMenu option', () => {
      // simulated mouse events doesn't run the true browser event
    });

    it('should be possible to cut data by API', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });
      const cutEvent = getClipboardEvent('cut');
      const plugin = hot.getPlugin('CopyPaste');

      selectCell(1, 0);

      plugin.setCopyableText();
      plugin.onCut(cutEvent);

      expect(cutEvent.clipboardData.getData()).toBe('A2');

      // await sleep(100);
      expect(hot.getDataAtCell(1, 0)).toBe('');
    });

    it('should call beforeCut and afterCut during cutting out operation', () => {
      const beforeCutSpy = jasmine.createSpy('beforeCut');
      const afterCutSpy = jasmine.createSpy('afterCut');

      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforeCut: beforeCutSpy,
        afterCut: afterCutSpy
      });
      const cutEvent = getClipboardEvent('cut');
      const plugin = hot.getPlugin('CopyPaste');

      selectCell(0, 0);

      plugin.setCopyableText();
      plugin.onCut(cutEvent);

      expect(beforeCutSpy.calls.count()).toEqual(1);
      expect(beforeCutSpy).toHaveBeenCalledWith([['A1']], [{ startRow: 0, startCol: 0, endRow: 0, endCol: 0 }], void 0, void 0, void 0, void 0);
      expect(afterCutSpy.calls.count()).toEqual(1);
      expect(afterCutSpy).toHaveBeenCalledWith([['A1']], [{ startRow: 0, startCol: 0, endRow: 0, endCol: 0 }], void 0, void 0, void 0, void 0);
    });

    it('should be possible to block cutting out', () => {
      const afterCutSpy = jasmine.createSpy('afterCut');

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforeCut() {
          return false;
        },
        afterCut: afterCutSpy
      });

      selectCell(0, 0);
      keyDown('ctrl');
      keyDown('ctrl+x');

      expect(afterCutSpy.calls.count()).toEqual(0);
    });
  });

  describe('paste', () => {
    it('should not create new rows or columns when allowInsertRow and allowInsertColumn equal false', async () => {
      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          pasteMode: 'shift_down'
        },
        allowInsertRow: false,
        allowInsertColumn: false
      });

      selectCell(3, 4); // selectAll
      triggerPaste('Kia\tNissan\tToyota');

      await sleep(60);

      let expected = arrayOfArrays();
      expected[3][4] = 'Kia';
      expect(getData()).toEqual(expected);
    });

    it('should shift data down instead of overwrite when paste (when allowInsertRow = false)', async () => {
      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          pasteMode: 'shift_down'
        },
        allowInsertRow: false
      });

      selectCell(1, 0); // selectAll
      triggerPaste('Kia\tNissan\tToyota');

      await sleep(60);

      expect(getData().length).toEqual(4);
      expect(getData(0, 0, 2, 4)).toEqual([['', 'Kia', 'Nissan', 'Toyota', 'Honda'], ['Kia', 'Nissan', 'Toyota', 12, 13], ['2008', 10, 11, 14, 13]]);
    });

    it('should shift data down instead of overwrite when paste (minSpareRows > 0)', async () => {
      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          pasteMode: 'shift_down'
        },
        minSpareRows: 1
      });

      selectCell(1, 0); // selectAll
      triggerPaste('Kia\tNissan\tToyota');

      await sleep(60);

      expect(getData().length).toEqual(6);
      expect(getData(0, 0, 2, 4)).toEqual([['', 'Kia', 'Nissan', 'Toyota', 'Honda'], ['Kia', 'Nissan', 'Toyota', 12, 13], ['2008', 10, 11, 14, 13]]);
    });

    it('should shift right insert instead of overwrite when paste', async () => {
      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          pasteMode: 'shift_right'
        },
        allowInsertColumn: false
      });

      selectCell(1, 0); // selectAll
      triggerPaste('Kia\tNissan\tToyota');

      await sleep(60);

      expect(getData()[0].length).toEqual(5);
      expect(getDataAtRow(1)).toEqual(['Kia', 'Nissan', 'Toyota', '2008', 10]);
    });

    it('should shift right insert instead of overwrite when paste (minSpareCols > 0)', done => {
      handsontable({
        data: arrayOfArrays(),
        copyPaste: {
          pasteMode: 'shift_right'
        },
        minSpareCols: 1
      });

      selectCell(1, 0); // selectAll
      triggerPaste('Kia\tNissan\tToyota');

      setTimeout(() => {
        expect(getData()[0].length).toEqual(9);
        expect(getDataAtRow(1)).toEqual(['Kia', 'Nissan', 'Toyota', '2008', 10, 11, 12, 13, null]);
        done();
      }, 60);
    });

    it('should not throw an error when changes are null in `once` hook', async () => {
      let errors = 0;

      try {
        handsontable({
          data: arrayOfArrays(),
          afterChange(changes, source) {
            if (source === 'loadData') {
              return;
            }

            loadData(arrayOfArrays());
          }
        });

        selectCell(1, 0); // selectAll
        triggerPaste('Kia\tNissan\tToyota');
      } catch (e) {
        errors++;
      }

      await sleep(60);

      expect(errors).toEqual(0);
    });

    it('should not paste any data, if no cell is selected', done => {
      const copiedData1 = 'foo';
      const copiedData2 = 'bar';

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(3, 1)
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('A2');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('A3');
      expect(getSelected()).toBeUndefined();

      triggerPaste(copiedData1);

      setTimeout(() => {
        expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
        expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('A2');
        expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('A3');
      }, 100);

      setTimeout(() => {
        selectCell(1, 0, 2, 0);

        triggerPaste(copiedData2);
      }, 200);

      setTimeout(() => {
        expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
        expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual(copiedData2);
        expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual(copiedData2);
        done();
      }, 300);
    });

    it('should not paste any data, if no cell is selected (select/deselect cell using mouse)', async () => {
      const copiedData = 'foo';

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(3, 1)
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('A2');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('A3');

      spec().$container.find('tbody tr:eq(1) td:eq(0)').simulate('mousedown');
      spec().$container.find('tbody tr:eq(1) td:eq(0)').simulate('mouseup');

      expect(getSelected()).toEqual([[1, 0, 1, 0]]);

      $('html').simulate('mousedown').simulate('mouseup');

      expect(getSelected()).toBeUndefined();

      triggerPaste(copiedData);

      await sleep(100);

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('A2');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('A3');
    });

    it('should call beforePaste and afterPaste during pasting operation', async () => {
      const beforePasteSpy = jasmine.createSpy('beforePaste');
      const afterPasteSpy = jasmine.createSpy('afterPaste');

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforePaste: beforePasteSpy,
        afterPaste: afterPasteSpy
      });

      selectCell(0, 0);
      keyDown('ctrl');
      triggerPaste('Kia');

      await sleep(60);

      expect(beforePasteSpy.calls.count()).toEqual(1);
      expect(beforePasteSpy).toHaveBeenCalledWith([['Kia']], [{ startRow: 0, startCol: 0, endRow: 0, endCol: 0 }], void 0, void 0, void 0, void 0);

      expect(afterPasteSpy.calls.count()).toEqual(1);
      expect(afterPasteSpy).toHaveBeenCalledWith([['Kia']], [{ startRow: 0, startCol: 0, endRow: 0, endCol: 0 }], void 0, void 0, void 0, void 0);
    });

    it('should be possible to block pasting', async () => {
      const afterPasteSpy = jasmine.createSpy('afterPaste');

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforePaste() {
          return false;
        },
        afterPaste: afterPasteSpy
      });

      selectCell(0, 0);
      keyDown('ctrl');
      triggerPaste('Kia');

      await sleep(60);

      expect(afterPasteSpy.calls.count()).toEqual(0);
    });

    it('should be possible modification of changes', async () => {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2),
        beforePaste(changes) {
          changes.splice(0, 1);
        }
      });

      selectCell(0, 0);
      keyDown('ctrl');
      triggerPaste('Kia\nToyota');

      await sleep(60);

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('Toyota');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('A2');
    });
  });
});

/***/ }),
/* 348 */
/***/ (function(module, exports) {

describe('CustomBorders', () => {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
    var wrapper = $('<div></div>').css({
      width: 400,
      height: 200,
      overflow: 'scroll'
    });

    this.$wrapper = this.$container.wrap(wrapper).parent();
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
    this.$wrapper.remove();
  });

  it('should draw custom borders for single td', () => {
    handsontable({
      data: Handsontable.helper.createSpreadsheetData(7, 7),
      colHeaders: true,
      rowHeaders: true,
      customBorders: [{
        row: 2,
        col: 2,
        left: {
          width: 2,
          color: 'red'
        },
        right: {
          width: 1,
          color: 'green'
        }
      }]
    });
    // [top,left, bottom, right]

    var borders = $('.wtBorder.border_row2col2');
    expect(borders.length).toEqual(20); // 4 times 5 elements (top,right, bottom, left, corner)
    expect(borders[0].className).toContain('hidden'); // hidden top
    expect(borders[1].style.backgroundColor).toEqual('red'); // left red
    expect(borders[1].style.width).toEqual('2px'); // left 2px width
    expect(borders[2].className).toContain('hidden'); // hidden bottom
    expect(borders[3].style.backgroundColor).toEqual('green'); // green right
    expect(borders[3].style.width).toEqual('1px'); // right 1px width
  });

  it('should draw custom borders for range', () => {
    handsontable({
      data: Handsontable.helper.createSpreadsheetData(7, 7),
      colHeaders: true,
      rowHeaders: true,
      customBorders: [{
        range: {
          from: {
            row: 1,
            col: 1
          },
          to: {
            row: 3,
            col: 4
          }
        },
        top: {
          width: 2,
          color: 'black'
        },
        left: {
          width: 2,
          color: 'red'
        },
        bottom: {
          width: 2,
          color: 'red'
        },
        right: {
          width: 3,
          color: 'black'
        }
      }]
    });

    for (var row = 1; row <= 3; row++) {
      for (var column = 1; column <= 4; column++) {
        if (row == 1) {
          var topRow = $(`.wtBorder.border_row${row}col${column}`);
          expect(topRow.length).toEqual(20); // borders for all tables (main and hiders)
          expect(topRow[0].style.backgroundColor).toEqual('black');
          expect(topRow[0].style.height).toEqual('2px');
        }
        if (column == 1) {
          var leftColumn = $(`.wtBorder.border_row${row}col${column}`);
          expect(leftColumn.length).toEqual(20); // borders for all tables (main and hiders)
          expect(leftColumn[1].style.backgroundColor).toEqual('red');
          expect(leftColumn[1].style.width).toEqual('2px');
        }
        if (row == 3) {
          var bottomRow = $(`.wtBorder.border_row${row}col${column}`);
          expect(bottomRow.length).toEqual(20); // borders for all tables (main and hiders)
          expect(bottomRow[2].style.backgroundColor).toEqual('red');
          expect(bottomRow[2].style.height).toEqual('2px');
        }
        if (column == 4) {
          var rightColumn = $(`.wtBorder.border_row${row}col${column}`);
          expect(rightColumn.length).toEqual(20); // borders for all tables (main and hiders)
          expect(rightColumn[3].style.backgroundColor).toEqual('black');
          expect(rightColumn[3].style.width).toEqual('3px');
        }
      }
    }
  });

  it('should draw top border from context menu options', done => {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      contextMenu: true,
      customBorders: true
    });

    var defaultBorder = {
      color: '#000',
      width: 1
    },
        empty = {
      hide: true
    };

    contextMenu();
    var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(10);
    item.simulate('mouseover');

    setTimeout(() => {
      var contextSubMenu = $(`.htContextMenuSub_${item.text()}`);
      var button = contextSubMenu.find('.ht_master .htCore tbody td').not('.htSeparator').eq(0);

      button.simulate('mousedown');

      // expect(getCellMeta(0,0).borders.hasOwnProperty('top')).toBe(true);
      expect(getCellMeta(0, 0).borders.top).toEqual(defaultBorder);
      expect(getCellMeta(0, 0).borders.left).toEqual(empty);
      expect(getCellMeta(0, 0).borders.bottom).toEqual(empty);
      expect(getCellMeta(0, 0).borders.right).toEqual(empty);
      done();
    }, 350);
  });

  it('should draw left border from context menu options', done => {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      contextMenu: true,
      customBorders: true
    });

    var defaultBorder = {
      color: '#000',
      width: 1
    },
        empty = {
      hide: true
    };

    contextMenu();
    var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(10);
    item.simulate('mouseover');

    setTimeout(() => {
      var contextSubMenu = $(`.htContextMenuSub_${item.text()}`);
      var button = contextSubMenu.find('.ht_master .htCore tbody td').not('.htSeparator').eq(3);

      button.simulate('mousedown');

      /* eslint-disable no-prototype-builtins */
      expect(getCellMeta(0, 0).borders.hasOwnProperty('left')).toBe(true);
      expect(getCellMeta(0, 0).borders.top).toEqual(empty);
      expect(getCellMeta(0, 0).borders.left).toEqual(defaultBorder);
      expect(getCellMeta(0, 0).borders.bottom).toEqual(empty);
      expect(getCellMeta(0, 0).borders.right).toEqual(empty);
      done();
    }, 350);
  });

  it('should draw right border from context menu options', done => {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      contextMenu: true,
      customBorders: true
    });

    var defaultBorder = {
      color: '#000',
      width: 1
    },
        empty = {
      hide: true
    };

    contextMenu();
    var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(10);
    item.simulate('mouseover');

    setTimeout(() => {
      var contextSubMenu = $(`.htContextMenuSub_${item.text()}`);
      var button = contextSubMenu.find('.ht_master .htCore tbody td').not('.htSeparator').eq(1);

      button.simulate('mousedown');

      /* eslint-disable no-prototype-builtins */
      expect(getCellMeta(0, 0).borders.hasOwnProperty('right')).toBe(true);
      expect(getCellMeta(0, 0).borders.top).toEqual(empty);
      expect(getCellMeta(0, 0).borders.left).toEqual(empty);
      expect(getCellMeta(0, 0).borders.bottom).toEqual(empty);
      expect(getCellMeta(0, 0).borders.right).toEqual(defaultBorder);
      done();
    }, 350);
  });

  it('should draw bottom border from context menu options', done => {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      contextMenu: true,
      customBorders: true
    });

    var defaultBorder = {
      color: '#000',
      width: 1
    },
        empty = {
      hide: true
    };

    contextMenu();
    var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(10);
    item.simulate('mouseover');

    setTimeout(() => {
      var contextSubMenu = $(`.htContextMenuSub_${item.text()}`);
      var button = contextSubMenu.find('.ht_master .htCore tbody td').not('.htSeparator').eq(2);

      button.simulate('mousedown');

      /* eslint-disable no-prototype-builtins */
      expect(getCellMeta(0, 0).borders.hasOwnProperty('right')).toBe(true);
      expect(getCellMeta(0, 0).borders.top).toEqual(empty);
      expect(getCellMeta(0, 0).borders.left).toEqual(empty);
      expect(getCellMeta(0, 0).borders.bottom).toEqual(defaultBorder);
      expect(getCellMeta(0, 0).borders.right).toEqual(empty);
      done();
    }, 350);
  });

  it('should remove all bottoms border from context menu options', done => {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      contextMenu: true,
      customBorders: [{
        row: 0,
        col: 0,
        left: {
          width: 2,
          color: 'red'
        },
        right: {
          width: 1,
          color: 'green'
        }
      }]
    });

    contextMenu();
    var item = $('.htContextMenu .ht_master .htCore').find('tbody td').not('.htSeparator').eq(10);
    item.simulate('mouseover');

    setTimeout(() => {
      var contextSubMenu = $(`.htContextMenuSub_${item.text()}`);
      var button = contextSubMenu.find('.ht_master .htCore tbody td').not('.htSeparator').eq(4);

      button.simulate('mousedown');

      expect(getCellMeta(0, 0).borders).toBeUndefined();
      done();
    }, 350);
  });

  it('should disable `Borders` context menu item when menu was triggered from corner header', () => {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetObjectData(10, 5),
      rowHeaders: true,
      colHeaders: true,
      contextMenu: true,
      customBorders: true
    });

    $('.ht_clone_top_left_corner .htCore').find('thead').find('th').eq(0).simulate('mousedown', { which: 3 });
    contextMenu();

    expect($('.htContextMenu tbody td.htDisabled').text()).toBe(['Insert column left', 'Insert column right', 'Remove row', 'Remove column', 'Undo', 'Redo', 'Read only', 'Alignment', 'Borders'].join(''));
  });
});

/***/ }),
/* 349 */
/***/ (function(module, exports) {

describe('DragToScroll', () => {
  let id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  function createBoundaries() {
    return {
      top: 100,
      left: 100,
      width: 900,
      height: 900,
      bottom: 1000,
      right: 1000
    };
  }

  it('exact top, exact left should be in boundaries', () => {
    const hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      dragToScroll: true
    });

    const dragToScroll = hot.getPlugin('dragToScroll');

    dragToScroll.setBoundaries(createBoundaries());

    dragToScroll.setCallback((scrollX, scrollY) => {
      expect(scrollX).toEqual(0);
      expect(scrollY).toEqual(0);
    });

    dragToScroll.check(100, 100);
  });

  it('exact bottom, exact right should be in boundaries', () => {
    const hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      dragToScroll: true
    });

    const dragToScroll = hot.getPlugin('dragToScroll');

    dragToScroll.setBoundaries(createBoundaries());

    dragToScroll.setCallback((scrollX, scrollY) => {
      expect(scrollX).toEqual(0);
      expect(scrollY).toEqual(0);
    });

    dragToScroll.check(1000, 1000);
  });

  it('less than top, less than left should be out in "top" direction', () => {
    const hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      dragToScroll: true
    });

    const dragToScroll = hot.getPlugin('dragToScroll');

    dragToScroll.setBoundaries(createBoundaries());

    dragToScroll.setCallback((scrollX, scrollY) => {
      expect(scrollX).toEqual(-1);
      expect(scrollY).toEqual(-1);
    });

    dragToScroll.check(99, 99);
  });

  it('exact top, less than left should be out in "left" direction', () => {
    const hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      dragToScroll: true
    });

    const dragToScroll = hot.getPlugin('dragToScroll');

    dragToScroll.setBoundaries(createBoundaries());

    dragToScroll.setCallback((scrollX, scrollY) => {
      expect(scrollX).toEqual(-1);
      expect(scrollY).toEqual(0);
    });

    dragToScroll.check(99, 100);
  });

  it('less than top, more than right should be out in "top" direction', () => {
    const hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      dragToScroll: true
    });

    const dragToScroll = hot.getPlugin('dragToScroll');

    dragToScroll.setBoundaries(createBoundaries());

    dragToScroll.setCallback((scrollX, scrollY) => {
      expect(scrollX).toEqual(1);
      expect(scrollY).toEqual(-1);
    });

    dragToScroll.check(1001, 99);
  });

  it('more than bottom, more than right should be out in "bottom" direction', () => {
    const hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      dragToScroll: true
    });

    const dragToScroll = hot.getPlugin('dragToScroll');

    dragToScroll.setBoundaries(createBoundaries());

    dragToScroll.setCallback((scrollX, scrollY) => {
      expect(scrollX).toEqual(1);
      expect(scrollY).toEqual(1);
    });

    dragToScroll.check(1001, 1001);
  });

  it('exact bottom, more than right should be out in "right" direction', () => {
    const hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      dragToScroll: true
    });

    const dragToScroll = hot.getPlugin('dragToScroll');

    dragToScroll.setBoundaries(createBoundaries());

    dragToScroll.setCallback((scrollX, scrollY) => {
      expect(scrollX).toEqual(1);
      expect(scrollY).toEqual(0);
    });

    dragToScroll.check(1001, 1000);
  });

  it('more than bottom, less than left should be out in "bottom" direction', () => {
    const hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      dragToScroll: true
    });

    const dragToScroll = hot.getPlugin('dragToScroll');

    dragToScroll.setBoundaries(createBoundaries());

    dragToScroll.setCallback((scrollX, scrollY) => {
      expect(scrollX).toEqual(-1);
      expect(scrollY).toEqual(1);
    });

    dragToScroll.check(99, 1001);
  });
});

/***/ }),
/* 350 */
/***/ (function(module, exports) {

describe('manualColumnFreeze', () => {
  const id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  describe('freezeColumn', () => {
    it('should increase fixedColumnsLeft setting', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnFreeze: true
      });
      const plugin = hot.getPlugin('manualColumnFreeze');
      plugin.freezeColumn(4);

      expect(hot.getSettings().fixedColumnsLeft).toEqual(1);
    });

    it('should freeze (make fixed) the column provided as an argument', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnFreeze: true
      });

      const plugin = hot.getPlugin('manualColumnFreeze');
      const movePlugin = hot.getPlugin('manualColumnMove');

      plugin.freezeColumn(5);

      expect(movePlugin.columnsMapper.getValueByIndex(0)).toEqual(5);
    });
  });

  describe('unfreezeColumn', () => {
    it('should decrease fixedColumnsLeft setting', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnFreeze: true,
        fixedColumnsLeft: 1
      });
      const plugin = hot.getPlugin('manualColumnFreeze');

      plugin.unfreezeColumn(0);
      expect(hot.getSettings().fixedColumnsLeft).toEqual(0);
    });

    it('should unfreeze (make non-fixed) the column provided as an argument', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnFreeze: true,
        fixedColumnsLeft: 3
      });

      const plugin = hot.getPlugin('manualColumnFreeze');
      const movePlugin = hot.getPlugin('manualColumnMove');

      plugin.unfreezeColumn(0);

      expect(hot.getSettings().fixedColumnsLeft).toEqual(2);
      expect(movePlugin.columnsMapper.getValueByIndex(0)).toEqual(1);
      expect(movePlugin.columnsMapper.getValueByIndex(1)).toEqual(2);
      expect(movePlugin.columnsMapper.getValueByIndex(2)).toEqual(0);
    });

    it('should unfreeze the last column', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnFreeze: true
      });

      const plugin = hot.getPlugin('manualColumnFreeze');
      const movePlugin = hot.getPlugin('manualColumnMove');

      plugin.freezeColumn(9);

      expect(hot.getSettings().fixedColumnsLeft).toEqual(1);
      expect(movePlugin.columnsMapper.getValueByIndex(0)).toEqual(9);
      expect(movePlugin.columnsMapper.getValueByIndex(9)).toEqual(8);

      plugin.unfreezeColumn(0);

      expect(hot.getSettings().fixedColumnsLeft).toEqual(0);
      expect(movePlugin.columnsMapper.getValueByIndex(0)).toEqual(0);
      expect(movePlugin.columnsMapper.getValueByIndex(9)).toEqual(9);
    });
  });

  describe('functionality', () => {

    it('should add a \'freeze column\' context menu entry for non-fixed columns', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnFreeze: true,
        contextMenu: true
      });

      selectCell(1, 1);
      contextMenu();

      const freezeEntry = $(hot.getPlugin('contextMenu').menu.container).find('div').filter(function () {
        return $(this).text() === 'Freeze column';
      });

      expect(freezeEntry.size()).toEqual(1);
    });

    it('should add a \'unfreeze column\' context menu entry for fixed columns', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnFreeze: true,
        contextMenu: true,
        fixedColumnsLeft: 2
      });

      selectCell(1, 1);
      contextMenu();

      const freezeEntry = $(hot.getPlugin('contextMenu').menu.container).find('div').filter(function () {
        return $(this).text() === 'Unfreeze column';
      });

      expect(freezeEntry.size()).toEqual(1);
    });

    it('should fix the desired column after clicking the \'freeze column\' context menu entry', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnFreeze: true,
        fixedColumnsLeft: 1,
        contextMenu: true
      });

      selectCell(1, 3);

      const dataAtCell = hot.getDataAtCell(1, 3);

      contextMenu();

      const freezeEntry = $(hot.getPlugin('contextMenu').menu.container).find('div').filter(function () {
        if ($(this).text() === 'Freeze column') {
          return true;
        }
        return false;
      });

      expect(freezeEntry.size()).toEqual(1);
      freezeEntry.eq(0).simulate('mousedown');

      expect(hot.getSettings().fixedColumnsLeft).toEqual(2);
      expect(hot.getDataAtCell(1, 1)).toEqual(dataAtCell);
    });

    it('should unfix the desired column (and revert it to it\'s original position) after clicking the \'unfreeze column\' context menu entry', async () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnFreeze: true,
        fixedColumnsLeft: 3,
        manualColumnMove: [0, 2, 5, 3, 4, 1, 6, 7, 8, 9],
        contextMenu: true,
        rowHeaders: true
      });

      let dataAtCell = hot.getDataAtCell(1, 0);
      expect(dataAtCell).toEqual('A2');
      dataAtCell = hot.getDataAtCell(1, 1);
      expect(dataAtCell).toEqual('C2');
      dataAtCell = hot.getDataAtCell(1, 2);
      expect(dataAtCell).toEqual('F2');

      selectCell(1, 1);
      contextMenu();

      let freezeEntry = $(hot.getPlugin('contextMenu').menu.container).find('div').filter(function () {
        return $(this).text() === 'Unfreeze column';
      });
      freezeEntry.eq(0).simulate('mousedown');

      expect(hot.getSettings().fixedColumnsLeft).toEqual(2);
      dataAtCell = hot.getDataAtCell(1, 0);
      expect(dataAtCell).toEqual('A2');
      dataAtCell = hot.getDataAtCell(1, 1);
      expect(dataAtCell).toEqual('F2');
      dataAtCell = hot.getDataAtCell(1, 2);
      expect(dataAtCell).toEqual('C2');

      selectCell(1, 1);
      contextMenu();

      freezeEntry = $(hot.getPlugin('contextMenu').menu.container).find('div').filter(function () {
        if ($(this).text() === 'Unfreeze column') {
          return true;
        }
        return false;
      });
      freezeEntry.eq(0).simulate('mousedown');

      expect(hot.getSettings().fixedColumnsLeft).toEqual(1);
      dataAtCell = hot.getDataAtCell(1, 0);
      expect(dataAtCell).toEqual('A2');
      dataAtCell = hot.getDataAtCell(1, 1);
      expect(dataAtCell).toEqual('C2');
      dataAtCell = hot.getDataAtCell(1, 2);
      expect(dataAtCell).toEqual('D2');

      dataAtCell = hot.getDataAtCell(1, 5);
      expect(dataAtCell).toEqual('F2');

      // Use the modified columns position.
      hot.updateSettings({
        fixedColumnsLeft: 0,
        manualColumnMove: [0, 2, 5, 3, 4, 1, 6, 7, 8, 9]
      });

      await sleep(300);

      hot.getSettings().fixedColumnsLeft = 0;

      selectCell(1, 2);
      contextMenu();
      freezeEntry = $(hot.getPlugin('contextMenu').menu.container).find('div').filter(function () {
        return $(this).text() === 'Freeze column';
      });

      freezeEntry.eq(0).simulate('mousedown');

      expect(hot.getSettings().fixedColumnsLeft).toEqual(1);
      dataAtCell = hot.getDataAtCell(1, 0);
      expect(dataAtCell).toEqual('F2');

      selectCell(1, 0);
      contextMenu();
      freezeEntry = $(hot.getPlugin('contextMenu').menu.container).find('div').filter(function () {
        return $(this).text() === 'Unfreeze column';
      });

      freezeEntry.eq(0).simulate('mousedown');

      expect(hot.getSettings().fixedColumnsLeft).toEqual(0);
      dataAtCell = hot.getDataAtCell(1, 2);
      expect(dataAtCell).toEqual('F2');
    });
  });
});

/***/ }),
/* 351 */
/***/ (function(module, exports) {

describe('manualColumnMove', () => {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  describe('init', () => {
    it('should change column order at init', function () {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnMove: [1, 2, 0]
      });

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('C1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('A1');
    });
  });

  describe('persistentState', () => {
    it('should load data from cache after initialization of new Handsontable instance', function (done) {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnMove: true,
        persistentState: true
      });

      var dataAt0x2Cell = getDataAtCell(0, 2);
      var manualColumnMovePlugin = hot.getPlugin('manualColumnMove');

      manualColumnMovePlugin.moveColumn(2, 0);
      manualColumnMovePlugin.persistentStateSave();

      hot.destroy();
      this.$container.remove();
      this.$container = $(`<div id="${id}"></div>`).appendTo('body');

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnMove: true,
        persistentState: true
      });

      expect(getDataAtCell(0, 0)).toEqual(dataAt0x2Cell);
      done();
    });

    it('should work with updateSettings properly', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnMove: true,
        persistentState: true
      });

      var dataAt0x2Cell = getDataAtCell(0, 2);
      var manualColumnMovePlugin = hot.getPlugin('manualColumnMove');

      manualColumnMovePlugin.moveColumn(2, 0);
      manualColumnMovePlugin.persistentStateSave();

      updateSettings({});
      expect(getDataAtCell(0, 0)).toEqual(dataAt0x2Cell);
    });
  });

  describe('updateSettings', () => {
    it('should be enabled after specifying it in updateSettings config', function () {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        colHeaders: true
      });

      updateSettings({
        manualColumnMove: true
      });

      this.$container.find('thead tr:eq(0) th:eq(0)').simulate('mousedown');
      this.$container.find('thead tr:eq(0) th:eq(0)').simulate('mouseup');

      expect(this.$container.hasClass('after-selection--columns')).toBeGreaterThan(0);
    });

    it('should change the default column order with updateSettings', function () {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnMove: true
      });

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('C1');

      updateSettings({
        manualColumnMove: [2, 1, 0]
      });

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('C1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('A1');
    });

    it('should change column order with updateSettings', function () {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnMove: [1, 2, 0]
      });

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('C1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('A1');

      updateSettings({
        manualColumnMove: [2, 1, 0]
      });

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('C1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('A1');
    });

    it('should update columnsMapper when updateSettings change numbers of columns', function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnMove: true
      });

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('C1');

      hot.getPlugin('manualColumnMove').moveColumn(2, 0);

      updateSettings({
        columns: [{ data: 2 }, { data: 0 }, { data: 1 }]
      });

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('C1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('A1');
    });

    it('should reset column order with updateSettings when undefined is passed', function () {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnMove: [1, 2, 0]
      });

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('C1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('A1');

      updateSettings({
        manualColumnMove: void 0
      });

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('C1');
    });
  });

  describe('loadData', function () {
    it('should increase numbers of columns if it is necessary', function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        manualColumnMove: true
      });

      hot.loadData(Handsontable.helper.createSpreadsheetData(10, 10));

      expect(countRows()).toEqual(10);
      expect(hot.getPlugin('manualColumnMove').columnsMapper.__arrayMap.length).toEqual(10);
    });

    it('should decrease numbers of columns if it is necessary', function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        manualColumnMove: true
      });

      hot.loadData(Handsontable.helper.createSpreadsheetData(2, 2));

      expect(countRows()).toEqual(2);
      expect(hot.getPlugin('manualColumnMove').columnsMapper.__arrayMap.length).toEqual(2);
    });
  });

  describe('moving', function () {
    it('should move column by API', function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        colHeaders: true,
        manualColumnMove: true
      });

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('C1');

      hot.getPlugin('manualColumnMove').moveColumn(2, 0);
      hot.render();

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('C1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('A1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('B1');
    });

    it('should move many columns by API', function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        colHeaders: true,
        manualColumnMove: true
      });

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('C1');

      hot.getPlugin('manualColumnMove').moveColumns([7, 9, 8], 0);
      hot.render();

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('H1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('J1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('I1');
    });

    it('should trigger an beforeColumnMove event before column move', function () {
      var beforeMoveColumnCallback = jasmine.createSpy('beforeMoveColumnCallback');

      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        colHeaders: true,
        manualColumnMove: true,
        beforeColumnMove: beforeMoveColumnCallback
      });

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('C1');

      hot.getPlugin('manualColumnMove').moveColumns([8, 9, 7], 0);
      hot.render();

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('I1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('J1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('H1');

      expect(beforeMoveColumnCallback).toHaveBeenCalledWith([8, 9, 7], 0, void 0, void 0, void 0, void 0);
    });

    it('should trigger an afterColumnMove event after column move', function () {
      var afterMoveColumnCallback = jasmine.createSpy('afterMoveColumnCallback');

      this.$container.height(150);

      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        colHeaders: true,
        manualColumnMove: true,
        afterColumnMove: afterMoveColumnCallback
      });

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('C1');

      hot.getPlugin('manualColumnMove').moveColumns([8, 9, 7], 0);
      hot.render();

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('I1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('J1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('H1');

      expect(afterMoveColumnCallback).toHaveBeenCalledWith([8, 9, 7], 0, void 0, void 0, void 0, void 0);
    });

    it('should move the second column to the first column', function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        colHeaders: true,
        manualColumnMove: true
      });

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('C1');

      var $rowsHeaders = this.$container.find('.ht_clone_top tr th');

      $rowsHeaders.eq(1).simulate('mousedown');
      $rowsHeaders.eq(1).simulate('mouseup');
      $rowsHeaders.eq(1).simulate('mousedown');
      $rowsHeaders.eq(0).simulate('mouseover');
      $rowsHeaders.eq(0).simulate('mousemove');
      $rowsHeaders.eq(0).simulate('mouseup');

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('A1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('C1');
    });

    it('should move the second row to the third row', function () {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        colHeaders: true,
        manualColumnMove: true
      });

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('B1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('C1');

      var $rowsHeaders = this.$container.find('.ht_clone_top tr th');

      $rowsHeaders.eq(1).simulate('mousedown');
      $rowsHeaders.eq(1).simulate('mouseup');
      $rowsHeaders.eq(1).simulate('mousedown');
      $rowsHeaders.eq(3).simulate('mouseover');
      $rowsHeaders.eq(3).simulate('mousemove');
      $rowsHeaders.eq(3).simulate('mouseup');

      expect(this.$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('A1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(1)').text()).toEqual('C1');
      expect(this.$container.find('tbody tr:eq(0) td:eq(2)').text()).toEqual('B1');
    });

    it('should properly scrolling viewport if mouse is over part-visible cell', done => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 20),
        colHeaders: true,
        rowHeaders: true,
        manualColumnMove: true,
        width: 600,
        height: 600,
        colWidths: 47
      });

      hot.selectCell(0, 19);

      setTimeout(() => {
        expect(hot.view.wt.wtTable.getFirstVisibleColumn()).toBeGreaterThan(8);

        var $rowsHeaders = spec().$container.find('.ht_clone_top tr th');

        $rowsHeaders.eq(2).simulate('mousedown');
        $rowsHeaders.eq(2).simulate('mouseup');
        $rowsHeaders.eq(2).simulate('mousedown');
        $rowsHeaders.eq(1).simulate('mouseover');
        $rowsHeaders.eq(1).simulate('mousemove');
        $rowsHeaders.eq(1).simulate('mouseup');
      }, 50);

      setTimeout(() => {
        expect(hot.view.wt.wtTable.getFirstVisibleColumn()).toBeLessThan(9);
        done();
      }, 150);
    });

    it('moving column should keep cell meta created using cells function', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        colHeaders: true,
        manualColumnMove: true,
        cells(row, col) {
          if (row == 1 && col == 0) {
            this.readOnly = true;
          }
        }
      });

      var htCore = getHtCore();

      expect(htCore.find('tbody tr:eq(1) td:eq(0)')[0].className.indexOf('htDimmed')).toBeGreaterThan(-1);

      hot.getPlugin('manualColumnMove').moveColumn(0, 3);
      hot.render();

      expect(htCore.find('tbody tr:eq(1) td:eq(2)')[0].className.indexOf('htDimmed')).toBeGreaterThan(-1);
    });

    it('moving column should keep cell meta created using cell array', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        colHeaders: true,
        manualColumnMove: true,
        cell: [{ row: 1, col: 0, readOnly: true }]
      });

      var htCore = getHtCore();

      expect(htCore.find('tbody tr:eq(1) td:eq(0)')[0].className.indexOf('htDimmed')).toBeGreaterThan(-1);

      hot.getPlugin('manualColumnMove').moveColumn(3, 0);
      hot.render();

      expect(htCore.find('tbody tr:eq(1) td:eq(1)')[0].className.indexOf('htDimmed')).toBeGreaterThan(-1);
    });
  });

  describe('callbacks', () => {
    it('should run `beforeColumnMove` and `afterColumnMove` with proper visual `target` parameter', () => {
      let targetParameterInsideBeforeColumnMoveCallback;
      let targetParameterInsideAfterColumnMoveCallback;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(3, 3),
        colHeaders: true,
        manualColumnMove: true,
        beforeColumnMove: (columns, target) => {
          targetParameterInsideBeforeColumnMoveCallback = target;
        },
        afterColumnMove: (columns, target) => {
          targetParameterInsideAfterColumnMoveCallback = target;
        }
      });

      spec().$container.find('thead tr:eq(0) th:eq(0)').simulate('mouseup');
      spec().$container.find('thead tr:eq(0) th:eq(0)').simulate('mousedown');
      spec().$container.find('thead tr:eq(0) th:eq(0)').simulate('mousedown');

      spec().$container.find('thead tr:eq(0) th:eq(2)').simulate('mouseover');
      spec().$container.find('thead tr:eq(0) th:eq(2)').simulate('mousemove');
      spec().$container.find('thead tr:eq(0) th:eq(2)').simulate('mouseup');

      expect(targetParameterInsideBeforeColumnMoveCallback).toEqual(2);
      expect(targetParameterInsideAfterColumnMoveCallback).toEqual(2);
    });
  });

  describe('copy-paste', () => {
    it('should create new columns is are needed', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        colHeaders: true,
        manualColumnMove: true
      });
      var changesSet = [[3, 4, 'A1'], [3, 5, 'B1'], [3, 6, 'C1'], [3, 7, 'D1']];

      // unfortunately couse of security rules, we can't simulate native mechanism (e.g. CTRL+C -> CTRL+V)
      hot.setDataAtCell(changesSet, void 0, void 0, 'CopyPaste.paste');

      expect(hot.countCols()).toEqual(8);
    });
  });

  describe('undoRedo', () => {
    xit('should back changes', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        colHeaders: true,
        manualColumnMove: true
      });
      hot.getPlugin('manualColumnMove').moveColumn(1, 4);
      hot.render();

      expect(hot.getDataAtCell(1, 3)).toBe('B2');

      hot.undo();

      expect(hot.getDataAtCell(1, 3)).toBe('D2');
    });

    xit('should revert changes', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        colHeaders: true,
        manualColumnMove: true
      });
      hot.getPlugin('manualColumnMove').moveColumn(1, 4);
      hot.render();

      expect(hot.getDataAtCell(1, 3)).toBe('A2');

      hot.undo();

      expect(hot.getDataAtCell(1, 1)).toBe('A2');

      hot.redo();

      expect(hot.getDataAtCell(1, 3)).toBe('A2');
    });
  });
});

/***/ }),
/* 352 */
/***/ (function(module, exports) {

describe('manualColumnMove', () => {
  var id = 'testContainer';
  var arrayOfArrays = Handsontable.helper.createSpreadsheetData(30, 30);

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  describe('UI', () => {
    it('should append UI elements to wtHider after click on row header', function () {
      var hot = handsontable({
        data: arrayOfArrays.slice(),
        colHeaders: true,
        manualColumnMove: true
      });

      var $headerTH = this.$container.find('thead tr:eq(0) th:eq(0)');
      $headerTH.simulate('mousedown');
      $headerTH.simulate('mouseup');
      $headerTH.simulate('mousedown');

      expect(this.$container.find('.ht__manualColumnMove--guideline').length).toBe(1);
      expect(this.$container.find('.ht__manualColumnMove--backlight').length).toBe(1);
    });

    it('should part of UI elements be visible on dragging action', function () {
      var hot = handsontable({
        data: arrayOfArrays.slice(),
        colHeaders: true,
        manualColumnMove: true
      });

      var $headerTH = this.$container.find('thead tr:eq(0) th:eq(0)');
      $headerTH.simulate('mousedown');
      $headerTH.simulate('mouseup');
      $headerTH.simulate('mousedown');

      expect(this.$container.find('.ht__manualColumnMove--guideline:visible').length).toBe(0);
      expect(this.$container.find('.ht__manualColumnMove--backlight:visible').length).toBe(1);
    });

    it('should all of UI elements be visible on dragging action', function () {
      var hot = handsontable({
        data: arrayOfArrays.slice(),
        colHeaders: true,
        manualColumnMove: true
      });

      var $headers = [this.$container.find('thead tr:eq(0) th:eq(0)'), this.$container.find('thead tr:eq(0) th:eq(1)'), this.$container.find('thead tr:eq(0) th:eq(2)')];

      $headers[0].simulate('mousedown');
      $headers[0].simulate('mouseup');
      $headers[0].simulate('mousedown');
      $headers[1].simulate('mouseover');
      $headers[2].simulate('mouseover');

      expect(this.$container.find('.ht__manualColumnMove--guideline:visible').length).toBe(1);
      expect(this.$container.find('.ht__manualColumnMove--backlight:visible').length).toBe(1);
    });

    it('should set properly width for the backlight element when stretchH is enabled', function () {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(30, 5),
        width: 600,
        colHeaders: true,
        stretchH: 'all',
        manualColumnMove: true
      });

      var $headerTH = this.$container.find('thead tr:eq(0) th:eq(1)');
      $headerTH.simulate('mousedown');
      $headerTH.simulate('mouseup');
      $headerTH.simulate('mousedown');

      expect(this.$container.find('.ht__manualColumnMove--backlight')[0].offsetWidth).toBe($headerTH[0].offsetWidth);
    });

    it('should set properly width for the backlight element when stretchH is enabled and column order was changed', function () {
      var hot = handsontable({
        data: [{ id: 1, flag: 'EUR', currencyCode: 'EUR', currency: 'Euro', level: 0.9033, units: 'EUR / USD', asOf: '08/19/2015', onedChng: 0.0026 }],
        width: 600,
        colHeaders: true,
        stretchH: 'all',
        manualColumnMove: [2, 4, 6, 3, 1, 0],
        columns: [{ data: 'id', type: 'numeric', width: 40 }, { data: 'currencyCode', type: 'text' }, { data: 'currency', type: 'text' }, { data: 'level', type: 'numeric', numericFormat: { pattern: '0.0000' } }, { data: 'units', type: 'text' }, { data: 'asOf', type: 'date', dateFormat: 'MM/DD/YYYY' }, { data: 'onedChng', type: 'numeric', numericFormat: { pattern: '0.00%' } }]
      });

      var $headerTH = this.$container.find('thead tr:eq(0) th:eq(6)');
      $headerTH.simulate('mousedown');
      $headerTH.simulate('mouseup');
      $headerTH.simulate('mousedown');
      $headerTH.simulate('mouseup');
      $headerTH.simulate('mousedown');

      expect(this.$container.find('.ht__manualColumnMove--backlight')[0].offsetWidth).toBe($headerTH[0].offsetWidth);
    });

    it('should set proper left position of the backlight element when colWidths is undefined', () => {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnMove: true,
        rowHeaders: true,
        colHeaders: true
      });

      let header = spec().$container.find('thead tr:eq(0) th:eq(2)');

      header.simulate('mousedown');
      header.simulate('mouseup');
      header.simulate('mousedown');

      expect(spec().$container.find('.ht__manualColumnMove--backlight')[0].offsetLeft).toBe(100);
    });

    it('should set proper left position of the backlight element when colWidths is defined', () => {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        manualColumnMove: true,
        rowHeaders: true,
        colWidths: 100,
        colHeaders: true
      });

      let header = spec().$container.find('thead tr:eq(0) th:eq(2)');

      header.simulate('mousedown');
      header.simulate('mouseup');
      header.simulate('mousedown');

      expect(spec().$container.find('.ht__manualColumnMove--backlight')[0].offsetLeft).toBe(150);
    });

    it('should not run moving ui if mousedown was fired on sorting element', function () {
      var hot = handsontable({
        data: arrayOfArrays.slice(),
        colHeaders: true,
        manualColumnMove: true,
        columnSorting: true
      });

      var $headerTH = this.$container.find('thead tr:eq(0) th:eq(6)');
      var $summaryElement = $headerTH.find('.columnSorting');

      $headerTH.simulate('mousedown');
      $headerTH.simulate('mouseup');
      $headerTH.simulate('mousedown');
      $headerTH.simulate('mouseup');

      var $backlight = this.$container.find('.ht__manualColumnMove--backlight')[0];
      $summaryElement.simulate('mousedown');

      var displayProp = $backlight.currentStyle ? $backlight.currentStyle.display : getComputedStyle($backlight, null).display;
      expect(displayProp).toEqual('none');
    });
  });
});

/***/ }),
/* 353 */
/***/ (function(module, exports) {

describe('manualColumnResize', () => {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  it('should change column widths at init', function () {
    handsontable({
      manualColumnResize: [100, 150, 180]
    });

    expect(colWidth(this.$container, 0)).toBe(100);
    expect(colWidth(this.$container, 1)).toBe(150);
    expect(colWidth(this.$container, 2)).toBe(180);
  });

  it('should be enabled after specifying it in updateSettings config', function () {
    var hot = handsontable({
      data: [{ id: 1, name: 'Ted', lastName: 'Right' }, { id: 2, name: 'Frank', lastName: 'Honest' }, { id: 3, name: 'Joan', lastName: 'Well' }, { id: 4, name: 'Sid', lastName: 'Strong' }, { id: 5, name: 'Jane', lastName: 'Neat' }],
      colHeaders: true
    });

    updateSettings({ manualColumnResize: true });

    this.$container.find('thead tr:eq(0) th:eq(0)').simulate('mouseover');

    expect($('.manualColumnResizer').size()).toBeGreaterThan(0);
  });

  it('should change the default column widths with updateSettings', function () {
    handsontable({
      manualColumnResize: true
    });

    expect(colWidth(this.$container, 0)).toBe(50);
    expect(colWidth(this.$container, 1)).toBe(50);
    expect(colWidth(this.$container, 2)).toBe(50);

    updateSettings({
      manualColumnResize: [60, 50, 80]
    });

    expect(colWidth(this.$container, 0)).toBe(60);
    expect(colWidth(this.$container, 1)).toBe(50);
    expect(colWidth(this.$container, 2)).toBe(80);
  });

  it('should change column widths with updateSettings', function () {
    handsontable({
      manualColumnResize: [100, 150, 180]
    });

    expect(colWidth(this.$container, 0)).toBe(100);
    expect(colWidth(this.$container, 1)).toBe(150);
    expect(colWidth(this.$container, 2)).toBe(180);

    updateSettings({
      manualColumnResize: [60, 50, 80]
    });

    expect(colWidth(this.$container, 0)).toBe(60);
    expect(colWidth(this.$container, 1)).toBe(50);
    expect(colWidth(this.$container, 2)).toBe(80);
  });

  it('should reset column widths when undefined is passed', function () {
    handsontable({
      manualColumnResize: [100, 150, 180]
    });

    expect(colWidth(this.$container, 0)).toBe(100);
    expect(colWidth(this.$container, 1)).toBe(150);
    expect(colWidth(this.$container, 2)).toBe(180);

    updateSettings({
      manualColumnResize: void 0
    });

    expect(colWidth(this.$container, 0)).toBe(50);
    expect(colWidth(this.$container, 1)).toBe(50);
    expect(colWidth(this.$container, 2)).toBe(50);
  });

  it('should not reset column widths when `true` is passed', function () {
    handsontable({
      manualColumnResize: [100, 150, 180]
    });

    expect(colWidth(this.$container, 0)).toBe(100);
    expect(colWidth(this.$container, 1)).toBe(150);
    expect(colWidth(this.$container, 2)).toBe(180);

    updateSettings({
      manualColumnResize: true
    });

    expect(colWidth(this.$container, 0)).toBe(100);
    expect(colWidth(this.$container, 1)).toBe(150);
    expect(colWidth(this.$container, 2)).toBe(180);
  });

  it('should resize (narrowing) appropriate columns, even when stretchH `all` is enabled', function () {
    this.$container.css('width', '910px');
    handsontable({
      colHeaders: true,
      manualColumnResize: true,
      stretchH: 'all'
    });

    resizeColumn(1, 65);

    var $columnHeaders = this.$container.find('thead tr:eq(1) th');

    expect($columnHeaders.eq(0).width()).toBe(209);
    expect($columnHeaders.eq(1).width()).toBe(64);
    expect($columnHeaders.eq(2).width()).toBe(210);
    expect($columnHeaders.eq(3).width()).toBe(210);
    expect($columnHeaders.eq(4).width()).toBe(211);
  });

  it('should resize (extending) appropriate columns, even when stretchH `all` is enabled', function () {
    this.$container.css('width', '910px');
    handsontable({
      colHeaders: true,
      manualColumnResize: true,
      stretchH: 'all'
    });

    resizeColumn(1, 400);

    var $columnHeaders = this.$container.find('thead tr:eq(1) th');

    expect($columnHeaders.eq(0).width()).toBe(125);
    expect($columnHeaders.eq(1).width()).toBe(399);
    expect($columnHeaders.eq(2).width()).toBe(126);
    expect($columnHeaders.eq(3).width()).toBe(126);
    expect($columnHeaders.eq(4).width()).toBe(128);
  });

  it('should resize (narrowing) selected columns', function (done) {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(10, 20),
      colHeaders: true,
      manualColumnResize: true
    });

    var $columnHeaders = this.$container.find('thead tr:eq(0) th');
    var $colHeader = this.$container.find('thead tr:eq(0) th:eq(1)');
    $colHeader.simulate('mouseover');

    var $resizer = this.$container.find('.manualColumnResizer');
    var resizerPosition = $resizer.position();

    this.$container.find('tr:eq(0) th:eq(1)').simulate('mousedown');
    this.$container.find('tr:eq(0) th:eq(2)').simulate('mouseover');
    this.$container.find('tr:eq(0) th:eq(3)').simulate('mouseover');
    this.$container.find('tr:eq(0) th:eq(3)').simulate('mousemove');
    this.$container.find('tr:eq(0) th:eq(3)').simulate('mouseup');

    $resizer.simulate('mousedown', { clientX: resizerPosition.left });
    $resizer.simulate('mousemove', { clientX: this.$container.find('tr:eq(0) th:eq(1)').position().left + 29 });
    $resizer.simulate('mouseup');

    setTimeout(() => {
      expect($columnHeaders.eq(1).width()).toBe(33);
      expect($columnHeaders.eq(2).width()).toBe(34);
      expect($columnHeaders.eq(3).width()).toBe(34);
      done();
    }, 1000);
  });

  it('should resize (expanding) selected columns', function (done) {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(10, 20),
      colHeaders: true,
      manualColumnResize: true
    });

    var $columnHeaders = this.$container.find('thead tr:eq(0) th');
    var $colHeader = this.$container.find('thead tr:eq(0) th:eq(1)');
    $colHeader.simulate('mouseover');

    var $resizer = this.$container.find('.manualColumnResizer');
    var resizerPosition = $resizer.position();

    this.$container.find('tr:eq(0) th:eq(1)').simulate('mousedown');
    this.$container.find('tr:eq(0) th:eq(2)').simulate('mouseover');
    this.$container.find('tr:eq(0) th:eq(3)').simulate('mouseover');
    this.$container.find('tr:eq(0) th:eq(3)').simulate('mousemove');
    this.$container.find('tr:eq(0) th:eq(3)').simulate('mouseup');

    $resizer.simulate('mousedown', { clientX: resizerPosition.left });
    $resizer.simulate('mousemove', { clientX: this.$container.find('tr:eq(0) th:eq(1)').position().left + 150 });
    $resizer.simulate('mouseup');

    setTimeout(() => {
      expect($columnHeaders.eq(1).width()).toBe(154);
      expect($columnHeaders.eq(2).width()).toBe(155);
      expect($columnHeaders.eq(3).width()).toBe(155);
      done();
    }, 1000);
  });

  it('should resize appropriate columns to calculated stretch width after double click on column handler when stretchH is set as `all`', function (done) {
    this.$container.css('width', '910px');
    handsontable({
      colHeaders: true,
      manualColumnResize: true,
      stretchH: 'all'
    });

    resizeColumn(1, 65);

    var $columnHeaders = this.$container.find('thead tr:eq(1) th');

    expect($columnHeaders.eq(0).width()).toBe(209);
    expect($columnHeaders.eq(1).width()).toBe(64);
    expect($columnHeaders.eq(2).width()).toBe(210);
    expect($columnHeaders.eq(3).width()).toBe(210);
    expect($columnHeaders.eq(4).width()).toBe(211);

    var $th = $columnHeaders.eq(1);

    $th.simulate('mouseover');

    var $resizer = this.$container.find('.manualColumnResizer');
    var resizerPosition = $resizer.position();

    $resizer.simulate('mousedown', { clientX: resizerPosition.left });
    $resizer.simulate('mouseup');

    $resizer.simulate('mousedown', { clientX: resizerPosition.left });
    $resizer.simulate('mouseup');

    setTimeout(() => {
      expect($columnHeaders.eq(0).width()).toBe(180);
      expect($columnHeaders.eq(1).width()).toBe(181);
      expect($columnHeaders.eq(2).width()).toBe(181);
      expect($columnHeaders.eq(3).width()).toBe(181);
      expect($columnHeaders.eq(4).width()).toBe(181);
      done();
    }, 1000);
  });

  it('should resize appropriate columns to calculated autoColumnSize width after double click on column handler when stretchH is set as `last`', function (done) {
    this.$container.css('width', '910px');
    handsontable({
      colHeaders: true,
      manualColumnResize: true,
      stretchH: 'last'
    });

    resizeColumn(0, 65);

    var $columnHeaders = this.$container.find('thead tr:eq(0) th');

    expect($columnHeaders.eq(0).width()).toBe(63);
    expect($columnHeaders.eq(1).width()).toBe(48);
    expect($columnHeaders.eq(2).width()).toBe(49);
    expect($columnHeaders.eq(3).width()).toBe(49);
    expect($columnHeaders.eq(4).width()).toBe(694);

    var $th = $columnHeaders.eq(0);

    $th.simulate('mouseover');

    var $resizer = this.$container.find('.manualColumnResizer');
    var resizerPosition = $resizer.position();

    $resizer.simulate('mousedown', { clientX: resizerPosition.left });
    $resizer.simulate('mouseup');

    $resizer.simulate('mousedown', { clientX: resizerPosition.left });
    $resizer.simulate('mouseup');

    setTimeout(() => {
      expect($columnHeaders.eq(0).width()).toBeAroundValue(19);
      expect($columnHeaders.eq(1).width()).toBe(48);
      expect($columnHeaders.eq(2).width()).toBe(49);
      expect($columnHeaders.eq(3).width()).toBe(49);
      expect($columnHeaders.eq(4).width()).toBeAroundValue(738);
      done();
    }, 1000);
  });

  it('should resize appropriate columns, even if the column order was changed with manualColumnMove plugin', function () {
    handsontable({
      colHeaders: ['First', 'Second', 'Third'],
      manualColumnMove: [2, 1, 0, 3],
      manualColumnResize: true
    });

    var $columnHeaders = this.$container.find('thead tr:eq(0) th');
    var initialColumnWidths = [];

    $columnHeaders.each(function () {
      initialColumnWidths.push($(this).width());
    });

    resizeColumn.call(this, 0, 100);

    var $resizedTh = $columnHeaders.eq(0);

    expect($resizedTh.text()).toEqual('Third');
    expect($resizedTh.outerWidth()).toEqual(100);

    // Sizes of remaining columns should stay the same
    for (var i = 1; i < $columnHeaders.length; i++) {
      expect($columnHeaders.eq(i).width()).toEqual(initialColumnWidths[i]);
    }
  });

  it('should trigger an afterColumnResize event after column size changes', function () {
    var afterColumnResizeCallback = jasmine.createSpy('afterColumnResizeCallback');

    handsontable({
      data: Handsontable.helper.createSpreadsheetData(3, 3),
      colHeaders: true,
      manualColumnResize: true,
      afterColumnResize: afterColumnResizeCallback
    });

    expect(colWidth(this.$container, 0)).toEqual(50);

    resizeColumn(0, 100);

    expect(afterColumnResizeCallback).toHaveBeenCalledWith(0, 100, void 0, void 0, void 0, void 0);
    expect(colWidth(this.$container, 0)).toEqual(100);
  });

  it('should not trigger an afterColumnResize event if column size does not change (mouseMove event width delta = 0)', function () {
    var afterColumnResizeCallback = jasmine.createSpy('afterColumnResizeCallback');

    handsontable({
      data: Handsontable.helper.createSpreadsheetData(3, 3),
      colHeaders: true,
      manualColumnResize: true,
      afterColumnResize: afterColumnResizeCallback
    });

    expect(colWidth(this.$container, 0)).toEqual(50);

    resizeColumn(0, 50);

    expect(afterColumnResizeCallback).not.toHaveBeenCalled();
    expect(colWidth(this.$container, 0)).toEqual(50);
  });

  it('should not trigger an afterColumnResize event if column size does not change (no mouseMove event)', function () {
    var afterColumnResizeCallback = jasmine.createSpy('afterColumnResizeCallback');

    handsontable({
      data: Handsontable.helper.createSpreadsheetData(3, 3),
      colHeaders: true,
      manualColumnResize: true,
      afterColumnResize: afterColumnResizeCallback
    });

    expect(colWidth(this.$container, 0)).toEqual(50);

    var $th = this.$container.find('thead tr:eq(0) th:eq(0)');
    $th.simulate('mouseover');

    var $resizer = this.$container.find('.manualColumnResizer');
    var resizerPosition = $resizer.position();

    $resizer.simulate('mousedown', { clientX: resizerPosition.left });
    $resizer.simulate('mouseup');

    expect(afterColumnResizeCallback).not.toHaveBeenCalled();
    expect(colWidth(this.$container, 0)).toEqual(50);
  });

  it('should trigger an afterColumnResize after column size changes, after double click', function (done) {
    var afterColumnResizeCallback = jasmine.createSpy('afterColumnResizeCallback');

    handsontable({
      data: Handsontable.helper.createSpreadsheetData(3, 3),
      colHeaders: true,
      manualColumnResize: true,
      afterColumnResize: afterColumnResizeCallback
    });

    expect(colWidth(this.$container, 0)).toEqual(50);

    var $th = this.$container.find('thead tr:eq(0) th:eq(0)');

    $th.simulate('mouseover');

    var $resizer = this.$container.find('.manualColumnResizer');
    var resizerPosition = $resizer.position();

    $resizer.simulate('mousedown', { clientX: resizerPosition.left });
    $resizer.simulate('mouseup');

    $resizer.simulate('mousedown', { clientX: resizerPosition.left });
    $resizer.simulate('mouseup');

    setTimeout(() => {
      expect(afterColumnResizeCallback.calls.count()).toEqual(1);
      expect(afterColumnResizeCallback.calls.argsFor(0)[0]).toEqual(0);
      // All modern browsers returns width = 25px, but IE8 seems to compute width differently and returns 24px
      expect(afterColumnResizeCallback.calls.argsFor(0)[1]).toBeInArray([30, 31, 32, 24, 25]);
      expect(colWidth(spec().$container, 0)).toBeInArray([30, 31, 32, 24, 25]);
      done();
    }, 1000);
  });

  it('should autosize column after double click (when initial width is not defined)', function (done) {
    handsontable({
      data: Handsontable.helper.createSpreadsheetData(3, 3),
      colHeaders: true,
      manualColumnResize: true,
      columns: [{ width: 100 }, { width: 200 }, {}]
    });

    expect(colWidth(this.$container, 0)).toEqual(100);
    expect(colWidth(this.$container, 1)).toEqual(200);
    expect(colWidth(this.$container, 2)).toEqual(50);

    resizeColumn(2, 300);

    var $resizer = this.$container.find('.manualColumnResizer');
    var resizerPosition = $resizer.position();

    $resizer.simulate('mousedown', { clientX: resizerPosition.left });
    $resizer.simulate('mouseup');

    $resizer.simulate('mousedown', { clientX: resizerPosition.left });
    $resizer.simulate('mouseup');

    setTimeout(() => {
      expect(colWidth(spec().$container, 2)).toBeAroundValue(29, 3);
      done();
    }, 1000);
  });

  it('should autosize selected columns after double click on handler', function (done) {
    handsontable({
      data: Handsontable.helper.createSpreadsheetData(9, 9),
      colHeaders: true,
      manualColumnResize: true
    });

    resizeColumn(2, 300);

    this.$container.find('thead tr:eq(0) th:eq(1)').simulate('mousedown');
    this.$container.find('thead tr:eq(0) th:eq(2)').simulate('mouseover');
    this.$container.find('thead tr:eq(0) th:eq(3)').simulate('mouseover');
    this.$container.find('thead tr:eq(0) th:eq(3)').simulate('mousemove');
    this.$container.find('thead tr:eq(0) th:eq(3)').simulate('mouseup');

    var $resizer = spec().$container.find('.manualColumnResizer');
    var resizerPosition = $resizer.position();

    setTimeout(() => {
      $resizer.simulate('mousedown', { clientX: resizerPosition.left });
      $resizer.simulate('mouseup');
      $resizer.simulate('mousedown', { clientX: resizerPosition.left });
      $resizer.simulate('mouseup');
    }, 600);

    setTimeout(() => {
      expect(colWidth(spec().$container, 1)).toBeAroundValue(32, 2);
      expect(colWidth(spec().$container, 2)).toBeAroundValue(32, 2);
      expect(colWidth(spec().$container, 3)).toBeAroundValue(32, 2);
      done();
    }, 1200);
  });

  it('should adjust resize handles position after table size changed', function () {
    var maxed = false;

    handsontable({
      colHeaders: true,
      manualColumnResize: true,
      stretchH: 'all',
      width() {
        return maxed ? 614 : 200;
      }
    });

    this.$container.find('thead th:eq(0)').simulate('mouseover');

    var handle = this.$container.find('.manualColumnResizer');
    var handleBox = handle[0].getBoundingClientRect();
    var th0 = this.$container.find('thead th:eq(0)');
    var thBox = th0[0].getBoundingClientRect();

    expect(handleBox.left + handleBox.width).toEqual(thBox.left + thBox.width - 1);

    maxed = true;

    render();
    this.$container.find('thead th:eq(0)').simulate('mouseover');

    handleBox = handle[0].getBoundingClientRect();
    thBox = th0[0].getBoundingClientRect();
    expect(handleBox.left + handleBox.width).toEqual(thBox.left + thBox.width - 1);
  });

  it('should display the resize handle in the correct place after the table has been scrolled', function () {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(10, 20),
      colHeaders: true,
      manualColumnResize: true,
      height: 100,
      width: 200
    });

    var mainHolder = hot.view.wt.wtTable.holder;

    var $colHeader = this.$container.find('.ht_clone_top thead tr:eq(0) th:eq(2)');
    $colHeader.simulate('mouseover');
    var $handle = this.$container.find('.manualColumnResizer');
    $handle[0].style.background = 'red';

    expect($colHeader.offset().left + $colHeader.width() - 5).toBeCloseTo($handle.offset().left, 0);
    expect($colHeader.offset().top).toBeCloseTo($handle.offset().top, 0);

    $(mainHolder).scrollLeft(200);
    hot.render();

    $colHeader = this.$container.find('.ht_clone_top thead tr:eq(0) th:eq(3)');
    $colHeader.simulate('mouseover');
    expect($colHeader.offset().left + $colHeader.width() - 5).toBeCloseTo($handle.offset().left, 0);
    expect($colHeader.offset().top).toBeCloseTo($handle.offset().top, 0);
  });

  describe('handle and guide', () => {
    it('should display the resize handle in the proper position and with a proper size', function () {
      var hot = handsontable({
        data: [{ id: 1, name: 'Ted', lastName: 'Right' }, { id: 2, name: 'Frank', lastName: 'Honest' }, { id: 3, name: 'Joan', lastName: 'Well' }, { id: 4, name: 'Sid', lastName: 'Strong' }, { id: 5, name: 'Jane', lastName: 'Neat' }],
        colHeaders: true,
        manualColumnResize: true
      });

      var $headerTH = this.$container.find('thead tr:eq(0) th:eq(1)');
      $headerTH.simulate('mouseover');

      var $handle = $('.manualColumnResizer');

      expect($handle.offset().left).toEqual($headerTH.offset().left + $headerTH.outerWidth() - $handle.outerWidth() - 1);
      expect($handle.height()).toEqual($headerTH.outerHeight());
    });
  });
});

/***/ }),
/* 354 */
/***/ (function(module, exports) {

describe('manualRowMove', () => {
  var id = 'testContainer';
  var arrayOfObjects = [{ id: 1, name: 'Ted', lastName: 'Right' }, { id: 2, name: 'Frank', lastName: 'Honest' }, { id: 3, name: 'Joan', lastName: 'Well' }, { id: 4, name: 'Sid', lastName: 'Strong' }, { id: 5, name: 'Jane', lastName: 'Neat' }, { id: 6, name: 'Chuck', lastName: 'Jackson' }, { id: 7, name: 'Meg', lastName: 'Jansen' }, { id: 8, name: 'Rob', lastName: 'Norris' }, { id: 9, name: 'Sean', lastName: 'O\'Hara' }, { id: 10, name: 'Eve', lastName: 'Branson' }];

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  describe('init', () => {
    it('should change row order at init', () => {
      handsontable({
        data: arrayOfObjects,
        manualRowMove: [1, 2, 0]
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('2');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('3');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('1');
    });
  });

  describe('updateSettings', () => {
    it('should be enabled after specifying it in updateSettings config', () => {
      handsontable({
        data: arrayOfObjects,
        rowHeaders: true
      });

      updateSettings({
        manualRowMove: true
      });

      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mousedown');
      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mouseup');

      expect(spec().$container.hasClass('after-selection--rows')).toBeGreaterThan(0);
    });

    it('should change the default row order with updateSettings', () => {
      handsontable({
        data: arrayOfObjects,
        manualRowMove: true
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('2');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('3');

      updateSettings({
        manualRowMove: [2, 1, 0]
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('3');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('2');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('1');
    });

    it('should change row order with updateSettings', () => {
      handsontable({
        data: arrayOfObjects,
        manualRowMove: [1, 2, 0]
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('2');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('3');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('1');

      updateSettings({
        manualRowMove: [2, 1, 0]
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('3');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('2');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('1');
    });

    it('should reset row order with updateSettings when undefined is passed', () => {
      handsontable({
        data: arrayOfObjects,
        manualRowMove: [1, 2, 0]
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('2');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('3');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('1');

      updateSettings({
        manualRowMove: void 0
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('2');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('3');
    });

    it('should not change row order with updateSettings when `true` is passed', () => {
      handsontable({
        data: arrayOfObjects,
        manualRowMove: [1, 2, 0]
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('2');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('3');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('1');

      updateSettings({
        manualRowMove: true
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('2');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('3');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('1');
    });
  });

  describe('loadData', () => {
    it('should increase numbers of rows if it is necessary', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        manualRowMove: true
      });

      hot.loadData(Handsontable.helper.createSpreadsheetData(10, 10));

      expect(countRows()).toEqual(10);
      expect(hot.getPlugin('manualRowMove').rowsMapper.__arrayMap.length).toEqual(10);
    });
    it('should decrease numbers of rows if it is necessary', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        manualRowMove: true
      });

      hot.loadData(Handsontable.helper.createSpreadsheetData(2, 2));

      expect(countRows()).toEqual(2);
      expect(hot.getPlugin('manualRowMove').rowsMapper.__arrayMap.length).toEqual(2);
    });
  });

  describe('moving', () => {
    it('should move row by API', () => {
      const hot = handsontable({
        data: arrayOfObjects,
        rowHeaders: true,
        manualRowMove: true
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('2');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('3');

      hot.getPlugin('manualRowMove').moveRow(2, 0);
      hot.render();

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('3');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('1');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('2');
    });

    it('should move many rows by API', () => {
      const hot = handsontable({
        data: arrayOfObjects,
        rowHeaders: true,
        manualRowMove: true
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('2');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('3');

      hot.getPlugin('manualRowMove').moveRows([7, 9, 8], 0);
      hot.render();

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('8');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('10');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('9');
    });

    it('should trigger the `beforeRowMove` hook before row move with visual indexes as parameters', () => {
      const beforeMoveRowCallback = jasmine.createSpy('beforeMoveRowCallback');

      const hot = handsontable({
        data: arrayOfObjects,
        rowHeaders: true,
        manualRowMove: true,
        beforeRowMove: beforeMoveRowCallback,
        modifyRow(row) {
          return row + 10;
        }
      });

      hot.getPlugin('manualRowMove').moveRows([8, 9, 7], 0);
      hot.render();

      expect(beforeMoveRowCallback).toHaveBeenCalledWith([8, 9, 7], 0, void 0, void 0, void 0, void 0);
    });

    it('should trigger the `afterRowMove` hook after row move with visual indexes as parameters', () => {
      const afterMoveRowCallback = jasmine.createSpy('afterMoveRowCallback');

      const hot = handsontable({
        data: arrayOfObjects,
        rowHeaders: true,
        manualRowMove: true,
        afterRowMove: afterMoveRowCallback,
        modifyRow(row) {
          return row + 10;
        }
      });

      hot.getPlugin('manualRowMove').moveRows([8, 9, 7], 0);
      hot.render();

      expect(afterMoveRowCallback).toHaveBeenCalledWith([8, 9, 7], 0, void 0, void 0, void 0, void 0);
    });

    it('should run `beforeRowMove` with proper `target` parameter (moving row above first header)', () => {
      let targetParameterInsideCallback;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(30, 30),
        rowHeaders: true,
        colHeaders: true,
        manualRowMove: true,
        beforeRowMove: (rows, target) => {
          targetParameterInsideCallback = target;
        }
      });
      const $fistHeader = spec().$container.find('tbody tr:eq(0) th:eq(0)');

      spec().$container.find('tbody tr:eq(1) th:eq(0)').simulate('mousedown');
      spec().$container.find('tbody tr:eq(1) th:eq(0)').simulate('mouseup');
      spec().$container.find('tbody tr:eq(1) th:eq(0)').simulate('mousedown');

      $fistHeader.simulate('mouseover');
      $fistHeader.simulate('mousemove', {
        clientY: $fistHeader.offset().bottom - $fistHeader.height() - 50
      });
      $fistHeader.simulate('mouseup');

      expect(targetParameterInsideCallback).toEqual(0);
    });

    it('should run `beforeRowMove` with proper `target` parameter (moving row to the top of first header)', () => {
      let targetParameterInsideCallback;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(30, 30),
        rowHeaders: true,
        manualRowMove: true,
        colHeaders: true,
        beforeRowMove: (rows, target) => {
          targetParameterInsideCallback = target;
        }
      });
      const $fistHeader = spec().$container.find('tbody tr:eq(0) th:eq(0)');

      spec().$container.find('tbody tr:eq(1) th:eq(0)').simulate('mousedown');
      spec().$container.find('tbody tr:eq(1) th:eq(0)').simulate('mouseup');
      spec().$container.find('tbody tr:eq(1) th:eq(0)').simulate('mousedown');

      $fistHeader.simulate('mouseover');
      $fistHeader.simulate('mousemove', {
        clientY: $fistHeader.offset().bottom - $fistHeader.height()
      });
      $fistHeader.simulate('mouseup');

      expect(targetParameterInsideCallback).toEqual(0);
    });

    it('should run `beforeRowMove` with proper `target` parameter (moving row to the middle of the table)', () => {
      let targetParameterInsideCallback;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(30, 30),
        rowHeaders: true,
        manualRowMove: true,
        beforeRowMove: (rows, target) => {
          targetParameterInsideCallback = target;
        }
      });

      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mousedown');
      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mouseup');
      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mousedown');

      spec().$container.find('tbody tr:eq(2) th:eq(0)').simulate('mouseover');
      spec().$container.find('tbody tr:eq(2) th:eq(0)').simulate('mousemove');
      spec().$container.find('tbody tr:eq(2) th:eq(0)').simulate('mouseup');

      expect(targetParameterInsideCallback).toEqual(2);
    });

    it('should run `beforeRowMove` with proper `target` parameter (moving row to the top of last header)', () => {
      let targetParameterInsideCallback;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(30, 30),
        rowHeaders: true,
        manualRowMove: true,
        beforeRowMove: (rows, target) => {
          targetParameterInsideCallback = target;
        }
      });

      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mousedown');
      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mouseup');
      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mousedown');

      spec().$container.find('tbody tr:eq(29) th:eq(0)').simulate('mouseover');
      spec().$container.find('tbody tr:eq(29) th:eq(0)').simulate('mousemove');
      spec().$container.find('tbody tr:eq(29) th:eq(0)').simulate('mouseup');

      expect(targetParameterInsideCallback).toEqual(29);
    });

    it('should run `beforeRowMove` with proper `target` parameter (moving row to the bottom of last header)', () => {
      let targetParameterInsideCallback;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(30, 30),
        rowHeaders: true,
        manualRowMove: true,
        beforeRowMove: (rows, target) => {
          targetParameterInsideCallback = target;
        }
      });
      const $lastHeader = spec().$container.find('tbody tr:eq(29) th:eq(0)');

      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mousedown');
      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mouseup');
      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mousedown');

      $lastHeader.simulate('mouseover');
      $lastHeader.simulate('mousemove', {
        clientY: $lastHeader.offset().top + $lastHeader.height()
      });
      $lastHeader.simulate('mouseup');

      expect(targetParameterInsideCallback).toEqual(30);
    });

    it('should run `beforeRowMove` with proper `target` parameter (moving row below last header)', () => {
      let targetParameterInsideCallback;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(30, 30),
        rowHeaders: true,
        manualRowMove: true,
        beforeRowMove: (rows, target) => {
          targetParameterInsideCallback = target;
        }
      });
      const $lastHeader = spec().$container.find('tbody tr:eq(29) th:eq(0)');

      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mousedown');
      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mouseup');
      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mousedown');

      $lastHeader.simulate('mouseover');
      $lastHeader.simulate('mousemove', {
        clientY: $lastHeader.offset().top + $lastHeader.height() + 200
      });
      $lastHeader.simulate('mouseup');

      expect(targetParameterInsideCallback).toEqual(30);
    });

    it('should run `beforeRowMove` with proper visual `target` parameter', () => {
      let targetParameterInsideCallback;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(30, 30),
        rowHeaders: true,
        manualRowMove: [1, 2, 0],
        beforeRowMove: (rows, target) => {
          targetParameterInsideCallback = target;
        }
      });

      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mousedown');
      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mouseup');
      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mousedown');

      spec().$container.find('tbody tr:eq(2) th:eq(0)').simulate('mouseover');
      spec().$container.find('tbody tr:eq(2) th:eq(0)').simulate('mousemove');
      spec().$container.find('tbody tr:eq(2) th:eq(0)').simulate('mouseup');

      expect(targetParameterInsideCallback).toEqual(2);
    });

    it('should run `afterRowMove` with proper visual `target` parameter', () => {
      let targetParameterInsideCallback;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(30, 30),
        rowHeaders: true,
        manualRowMove: [1, 2, 0],
        afterRowMove: (rows, target) => {
          targetParameterInsideCallback = target;
        }
      });

      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mousedown');
      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mouseup');
      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mousedown');

      spec().$container.find('tbody tr:eq(2) th:eq(0)').simulate('mouseover');
      spec().$container.find('tbody tr:eq(2) th:eq(0)').simulate('mousemove');
      spec().$container.find('tbody tr:eq(2) th:eq(0)').simulate('mouseup');

      expect(targetParameterInsideCallback).toEqual(2);
    });

    it('should move the second row to the first row', () => {
      handsontable({
        data: arrayOfObjects,
        rowHeaders: true,
        manualRowMove: true
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('2');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('3');

      const $rowsHeaders = spec().$container.find('.ht_clone_left tr th');

      $rowsHeaders.eq(1).simulate('mousedown');
      $rowsHeaders.eq(1).simulate('mouseup');
      $rowsHeaders.eq(1).simulate('mousedown');
      $rowsHeaders.eq(0).simulate('mouseover');
      $rowsHeaders.eq(0).simulate('mousemove');
      $rowsHeaders.eq(0).simulate('mouseup');

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('2');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('1');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('3');
    });

    it('should move the second row to the third row', () => {
      handsontable({
        data: arrayOfObjects,
        rowHeaders: true,
        manualRowMove: true
      });

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('2');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('3');

      const $rowsHeaders = spec().$container.find('.ht_clone_left tr th');

      $rowsHeaders.eq(1).simulate('mousedown');
      $rowsHeaders.eq(1).simulate('mouseup');
      $rowsHeaders.eq(1).simulate('mousedown');
      $rowsHeaders.eq(3).simulate('mouseover');
      $rowsHeaders.eq(3).simulate('mousemove');
      $rowsHeaders.eq(3).simulate('mouseup');

      expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('1');
      expect(spec().$container.find('tbody tr:eq(1) td:eq(0)').text()).toEqual('3');
      expect(spec().$container.find('tbody tr:eq(2) td:eq(0)').text()).toEqual('2');
    });

    it('should not move row if it\'s not needed', () => {
      let cache = [];

      handsontable({
        data: arrayOfObjects,
        rowHeaders: true,
        manualRowMove: true,
        afterRowMove(rows, target) {
          cache.push(rows);
        }
      });

      const $rowsHeaders = spec().$container.find('.ht_clone_left tr th');

      $rowsHeaders.eq(1).simulate('mousedown');
      $rowsHeaders.eq(1).simulate('mouseup');
      $rowsHeaders.eq(1).simulate('mousedown');
      $rowsHeaders.eq(3).simulate('mouseup');

      expect(cache.length).toEqual(0);
    });

    it('should properly scrolling viewport if mouse is over part-visible cell', done => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(20, 20),
        colHeaders: true,
        rowHeaders: true,
        manualRowMove: true,
        width: 600,
        height: 600,
        rowHeights: 47
      });

      hot.selectCell(19, 0);

      setTimeout(() => {
        expect(hot.view.wt.wtTable.getFirstVisibleRow()).toBeGreaterThan(8);

        const $rowsHeaders = spec().$container.find('.ht_clone_left tr th');

        $rowsHeaders.eq(10).simulate('mousedown');
        $rowsHeaders.eq(10).simulate('mouseup');
        $rowsHeaders.eq(10).simulate('mousedown');
        $rowsHeaders.eq(8).simulate('mouseover');
        $rowsHeaders.eq(8).simulate('mousemove');
        $rowsHeaders.eq(8).simulate('mouseup');
      }, 50);

      setTimeout(() => {
        expect(hot.view.wt.wtTable.getFirstVisibleRow()).toBeLessThan(8);
        done();
      }, 150);
    });

    it('moving row should keep cell meta created using cells function', () => {
      const hot = handsontable({
        data: arrayOfObjects,
        rowHeaders: true,
        manualRowMove: true,
        cells(row, col) {
          if (row == 1 && col == 0) {
            this.readOnly = true;
          }
        }
      });

      const htCore = getHtCore();

      expect(htCore.find('tbody tr:eq(1) td:eq(0)')[0].className.indexOf('htDimmed')).toBeGreaterThan(-1);

      hot.getPlugin('manualRowMove').moveRow(1, 3);
      hot.render();

      expect(htCore.find('tbody tr:eq(2) td:eq(0)')[0].className.indexOf('htDimmed')).toBeGreaterThan(-1);
    });

    it('moving row should keep cell meta created using cell array', () => {
      var hot = handsontable({
        data: arrayOfObjects,
        rowHeaders: true,
        manualRowMove: true,
        cell: [{ row: 1, col: 0, readOnly: true }]
      });

      var htCore = getHtCore();

      expect(htCore.find('tbody tr:eq(1) td:eq(0)')[0].className.indexOf('htDimmed')).toBeGreaterThan(-1);

      hot.getPlugin('manualRowMove').moveRow(3, 1);
      hot.render();

      expect(htCore.find('tbody tr:eq(2) td:eq(0)')[0].className.indexOf('htDimmed')).toBeGreaterThan(-1);
    });
  });

  describe('callbacks', () => {
    it('should run `beforeRowMove` and `afterRowMove` with proper visual `target` parameter', () => {
      let targetParameterInsideBeforeRowMoveCallback;
      let targetParameterInsideAfterRowMoveCallback;

      handsontable({
        data: Handsontable.helper.createSpreadsheetData(3, 3),
        rowHeaders: true,
        manualRowMove: true,
        beforeRowMove: (rows, target) => {
          targetParameterInsideBeforeRowMoveCallback = target;
        },
        afterRowMove: (rows, target) => {
          targetParameterInsideAfterRowMoveCallback = target;
        }
      });

      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mouseup');
      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mousedown');
      spec().$container.find('tbody tr:eq(0) th:eq(0)').simulate('mousedown');

      spec().$container.find('tbody tr:eq(2) th:eq(0)').simulate('mouseover');
      spec().$container.find('tbody tr:eq(2) th:eq(0)').simulate('mousemove');
      spec().$container.find('tbody tr:eq(2) th:eq(0)').simulate('mouseup');

      expect(targetParameterInsideBeforeRowMoveCallback).toEqual(2);
      expect(targetParameterInsideAfterRowMoveCallback).toEqual(2);
    });
  });

  describe('undoRedo', () => {
    it('should back changes', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        rowHeaders: true,
        manualRowMove: true
      });
      hot.getPlugin('manualRowMove').moveRow(1, 4);
      hot.render();

      expect(hot.getDataAtCell(3, 0)).toBe('A2');

      hot.undo();

      expect(hot.getDataAtCell(1, 0)).toBe('A2');
    });

    it('should revert changes', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        rowHeaders: true,
        manualRowMove: true
      });
      hot.getPlugin('manualRowMove').moveRow(1, 4);
      hot.render();

      expect(hot.getDataAtCell(3, 0)).toBe('A2');

      hot.undo();

      expect(hot.getDataAtCell(1, 0)).toBe('A2');

      hot.redo();

      expect(hot.getDataAtCell(3, 0)).toBe('A2');
    });
  });
});

/***/ }),
/* 355 */
/***/ (function(module, exports) {

describe('manualRowMove', () => {
  const id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  describe('UI', () => {
    it('should append UI elements to wtHider after click on row header', () => {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(30, 30),
        rowHeaders: true,
        manualRowMove: true
      });

      const $headerTH = spec().$container.find('tbody tr:eq(0) th:eq(0)');

      $headerTH.simulate('mousedown');
      $headerTH.simulate('mouseup');
      $headerTH.simulate('mousedown');

      expect(spec().$container.find('.ht__manualRowMove--guideline').length).toBe(1);
      expect(spec().$container.find('.ht__manualRowMove--backlight').length).toBe(1);
    });

    it('should part of UI elements be visible on dragging action', () => {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(30, 30),
        rowHeaders: true,
        manualRowMove: true
      });

      const $headerTH = spec().$container.find('tbody tr:eq(0) th:eq(0)');

      $headerTH.simulate('mousedown');
      $headerTH.simulate('mouseup');
      $headerTH.simulate('mousedown');

      expect(spec().$container.find('.ht__manualRowMove--guideline:visible').length).toBe(0);
      expect(spec().$container.find('.ht__manualRowMove--backlight:visible').length).toBe(1);
    });

    it('should all of UI elements be visible on dragging action', () => {
      handsontable({
        data: Handsontable.helper.createSpreadsheetData(30, 30),
        rowHeaders: true,
        manualRowMove: true
      });

      const $headers = [spec().$container.find('tbody tr:eq(0) th:eq(0)'), spec().$container.find('tbody tr:eq(1) th:eq(0)'), spec().$container.find('tbody tr:eq(2) th:eq(0)')];

      $headers[0].simulate('mousedown');
      $headers[0].simulate('mouseup');
      $headers[0].simulate('mousedown');
      $headers[1].simulate('mouseover');
      $headers[2].simulate('mouseover');

      expect(spec().$container.find('.ht__manualRowMove--guideline:visible').length).toBe(1);
      expect(spec().$container.find('.ht__manualRowMove--backlight:visible').length).toBe(1);
    });

    describe('backlight', () => {
      it('should set proper left position of element when colWidths is undefined', () => {
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          rowHeaders: true,
          manualRowMove: true
        });

        const $headerTH = spec().$container.find('tbody tr:eq(0) th:eq(0)');

        $headerTH.simulate('mousedown');
        $headerTH.simulate('mouseup');
        $headerTH.simulate('mousedown');

        expect(spec().$container.find('.ht__manualRowMove--backlight')[0].offsetLeft).toBe(50);
      });

      it('should set proper left position of element when colWidths is defined', () => {
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          rowHeaders: true,
          manualRowMove: true,
          colWidths: 100
        });

        const $headerTH = spec().$container.find('tbody tr:eq(0) th:eq(0)');

        $headerTH.simulate('mousedown');
        $headerTH.simulate('mouseup');
        $headerTH.simulate('mousedown');

        expect(spec().$container.find('.ht__manualRowMove--backlight')[0].offsetLeft).toBe(50);
      });
    });

    describe('guideline', () => {
      it('should set proper top position of element when target is first row and column headers are disabled', () => {
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(10, 10),
          rowHeaders: true,
          colHeaders: false,
          manualRowMove: true
        });

        const $headers = [spec().$container.find('tbody tr:eq(0) th:eq(0)'), spec().$container.find('tbody tr:eq(1) th:eq(0)')];

        $headers[1].simulate('mousedown');
        $headers[1].simulate('mouseup');
        $headers[1].simulate('mousedown');
        $headers[0].simulate('mouseover');
        $headers[0].simulate('mousemove');

        expect(spec().$container.find('.ht__manualRowMove--guideline')[0].offsetTop).toBe(-1);
      });
    });
  });
});

/***/ }),
/* 356 */
/***/ (function(module, exports) {

describe('manualRowResize', () => {
  var id = 'test';
  var defaultRowHeight = 22;

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  it('should change row heights at init', function () {
    handsontable({
      rowHeaders: true,
      manualRowResize: [50, 40, 100]
    });

    expect(rowHeight(this.$container, 0)).toEqual(51);
    expect(rowHeight(this.$container, 1)).toEqual(40);
    expect(rowHeight(this.$container, 2)).toEqual(100);
  });

  it('should be enabled after specifying it in updateSettings config', function () {
    var hot = handsontable({
      data: [{ id: 1, name: 'Ted', lastName: 'Right' }, { id: 2, name: 'Frank', lastName: 'Honest' }, { id: 3, name: 'Joan', lastName: 'Well' }, { id: 4, name: 'Sid', lastName: 'Strong' }, { id: 5, name: 'Jane', lastName: 'Neat' }],
      rowHeaders: true
    });

    updateSettings({ manualRowResize: true });

    this.$container.find('tbody tr:eq(0) th:eq(0)').simulate('mouseover');

    expect($('.manualRowResizer').size()).toBeGreaterThan(0);
  });

  it('should change the default row height with updateSettings', function () {
    handsontable({
      manualRowResize: true
    });

    expect(rowHeight(this.$container, 0)).toEqual(defaultRowHeight + 2); // + Double border
    expect(rowHeight(this.$container, 1)).toEqual(defaultRowHeight + 1); // + Single border
    expect(rowHeight(this.$container, 2)).toEqual(defaultRowHeight + 1); // + Single border

    updateSettings({
      manualRowResize: [60, 50, 80]
    });

    expect(rowHeight(this.$container, 0)).toEqual(61);
    expect(rowHeight(this.$container, 1)).toEqual(50);
    expect(rowHeight(this.$container, 2)).toEqual(80);
  });

  it('should change the row height with updateSettings', function () {
    handsontable({
      manualRowResize: [60, 50, 80]
    });

    expect(rowHeight(this.$container, 0)).toEqual(61);
    expect(rowHeight(this.$container, 1)).toEqual(50);
    expect(rowHeight(this.$container, 2)).toEqual(80);

    updateSettings({
      manualRowResize: [30, 80, 100]
    });

    expect(rowHeight(this.$container, 0)).toEqual(31);
    expect(rowHeight(this.$container, 1)).toEqual(80);
    expect(rowHeight(this.$container, 2)).toEqual(100);
  });

  it('should not change the row height when `true` is passing', function () {
    handsontable({
      manualRowResize: [60, 50, 80]
    });

    expect(rowHeight(this.$container, 0)).toEqual(61);
    expect(rowHeight(this.$container, 1)).toEqual(50);
    expect(rowHeight(this.$container, 2)).toEqual(80);

    updateSettings({
      manualRowResize: true
    });

    expect(rowHeight(this.$container, 0)).toEqual(61);
    expect(rowHeight(this.$container, 1)).toEqual(50);
    expect(rowHeight(this.$container, 2)).toEqual(80);
  });

  it('should change the row height to defaults when undefined is passed', function () {
    handsontable({
      manualRowResize: [60, 50, 80]
    });

    expect(rowHeight(this.$container, 0)).toEqual(61);
    expect(rowHeight(this.$container, 1)).toEqual(50);
    expect(rowHeight(this.$container, 2)).toEqual(80);

    updateSettings({
      manualRowResize: void 0
    });

    expect(rowHeight(this.$container, 0)).toEqual(defaultRowHeight + 2); // + Double border
    expect(rowHeight(this.$container, 1)).toEqual(defaultRowHeight + 1); // + Single border
    expect(rowHeight(this.$container, 2)).toEqual(defaultRowHeight + 1); // + Single border
  });

  it('should reset row height', function () {
    handsontable({
      manualRowResize: true
    });

    expect(rowHeight(this.$container, 0)).toEqual(defaultRowHeight + 2);
    expect(rowHeight(this.$container, 1)).toEqual(defaultRowHeight + 1);
    expect(rowHeight(this.$container, 2)).toEqual(defaultRowHeight + 1);

    updateSettings({
      manualRowResize: true
    });

    expect(rowHeight(this.$container, 0)).toEqual(defaultRowHeight + 2);
    expect(rowHeight(this.$container, 1)).toEqual(defaultRowHeight + 1);
    expect(rowHeight(this.$container, 2)).toEqual(defaultRowHeight + 1);
  });

  it('should trigger afterRowResize event after row height changes', function () {
    var afterRowResizeCallback = jasmine.createSpy('afterRowResizeCallback');

    handsontable({
      data: Handsontable.helper.createSpreadsheetData(5, 5),
      rowHeaders: true,
      manualRowResize: true,
      afterRowResize: afterRowResizeCallback
    });

    expect(rowHeight(this.$container, 0)).toEqual(defaultRowHeight + 2);

    resizeRow(0, 100);
    expect(afterRowResizeCallback).toHaveBeenCalledWith(0, 100, void 0, void 0, void 0, void 0);
    expect(rowHeight(this.$container, 0)).toEqual(101);
  });

  it('should not trigger afterRowResize event if row height does not change (delta = 0)', function () {
    var afterRowResizeCallback = jasmine.createSpy('afterRowResizeCallback');

    handsontable({
      data: Handsontable.helper.createSpreadsheetData(5, 5),
      rowHeaders: true,
      manualRowResize: true,
      afterRowResize: afterRowResizeCallback
    });

    expect(rowHeight(this.$container, 0)).toEqual(defaultRowHeight + 2);

    resizeRow(0, defaultRowHeight);
    expect(afterRowResizeCallback).not.toHaveBeenCalled();
    expect(rowHeight(this.$container, 0)).toEqual(defaultRowHeight + 2);
  });

  it('should not trigger afterRowResize event after if row height does not change (no mousemove event)', function () {
    var afterRowResizeCallback = jasmine.createSpy('afterRowResizeCallback');

    handsontable({
      data: Handsontable.helper.createSpreadsheetData(5, 5),
      rowHeaders: true,
      manualRowResize: true,
      afterRowResize: afterRowResizeCallback
    });

    expect(rowHeight(this.$container, 0)).toEqual(defaultRowHeight + 2);

    var $th = this.$container.find('tbody tr:eq(0) th:eq(0)');
    $th.simulate('mouseover');

    var $resizer = this.$container.find('.manualRowResizer');
    var resizerPosition = $resizer.position();

    $resizer.simulate('mousedown', {
      clientY: resizerPosition.top
    });

    $resizer.simulate('mouseup');

    expect(afterRowResizeCallback).not.toHaveBeenCalled();
    expect(rowHeight(this.$container, 0)).toEqual(defaultRowHeight + 2);
  });

  it('should trigger an afterRowResize after row size changes, after double click', function (done) {
    var afterRowResizeCallback = jasmine.createSpy('afterRowResizeCallback');

    handsontable({
      data: Handsontable.helper.createSpreadsheetData(5, 5),
      rowHeaders: true,
      manualRowResize: true,
      autoRowSize: true,
      afterRowResize: afterRowResizeCallback
    });

    expect(rowHeight(this.$container, 0)).toEqual(defaultRowHeight + 2);

    var $th = this.$container.find('tbody tr:eq(2) th:eq(0)');
    $th.simulate('mouseover');

    var $resizer = this.$container.find('.manualRowResizer');
    var resizerPosition = $resizer.position();

    $resizer.simulate('mousedown', {
      clientY: resizerPosition.top
    });
    $resizer.simulate('mouseup');

    $resizer.simulate('mousedown', {
      clientY: resizerPosition.top
    });
    $resizer.simulate('mouseup');

    setTimeout(() => {
      expect(afterRowResizeCallback.calls.count()).toEqual(1);
      expect(afterRowResizeCallback.calls.argsFor(0)[0]).toEqual(2);
      expect(afterRowResizeCallback.calls.argsFor(0)[1]).toEqual(defaultRowHeight + 1);
      expect(rowHeight(spec().$container, 2)).toEqual(defaultRowHeight + 1);
      done();
    }, 1000);
  });
  it('should not trigger afterRowResize event after if row height does not change (no dblclick event)', function () {
    var afterRowResizeCallback = jasmine.createSpy('afterRowResizeCallback');

    handsontable({
      data: Handsontable.helper.createSpreadsheetData(5, 5),
      rowHeaders: true,
      manualRowResize: true,
      afterRowResize: afterRowResizeCallback
    });

    expect(rowHeight(this.$container, 0)).toEqual(defaultRowHeight + 2);

    var $th = this.$container.find('tbody tr:eq(2) th:eq(0)');
    $th.simulate('mouseover');

    var $resizer = this.$container.find('.manualRowResizer');
    var resizerPosition = $resizer.position();

    $resizer.simulate('mousedown', {
      clientY: resizerPosition.top
    });
    $resizer.simulate('mouseup');

    expect(afterRowResizeCallback).not.toHaveBeenCalled();
    expect(rowHeight(this.$container, 0)).toEqual(defaultRowHeight + 2);
  });
  it('should display the resize handle in the correct place after the table has been scrolled', function () {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(20, 20),
      rowHeaders: true,
      manualRowResize: true,
      height: 100,
      width: 200
    });

    var mainHolder = hot.view.wt.wtTable.holder;

    var $rowHeader = this.$container.find('.ht_clone_left tbody tr:eq(2) th:eq(0)');
    $rowHeader.simulate('mouseover');
    var $handle = this.$container.find('.manualRowResizer');
    $handle[0].style.background = 'red';

    expect($rowHeader.offset().left).toBeCloseTo($handle.offset().left, 0);
    expect($rowHeader.offset().top + $rowHeader.height() - 5).toBeCloseTo($handle.offset().top, 0);

    $(mainHolder).scrollTop(200);
    $(mainHolder).scroll();

    $rowHeader = this.$container.find('.ht_clone_left tbody tr:eq(2) th:eq(0)');
    $rowHeader.simulate('mouseover');
    expect($rowHeader.offset().left).toBeCloseTo($handle.offset().left, 0);
    expect($rowHeader.offset().top + $rowHeader.height() - 5).toBeCloseTo($handle.offset().top, 0);
  });

  it('should autosize selected rows after double click on handler', function (done) {
    handsontable({
      data: Handsontable.helper.createSpreadsheetData(9, 9),
      rowHeaders: true,
      manualRowResize: true
    });

    resizeRow(2, 300);

    var $resizer = this.$container.find('.manualRowResizer');
    var resizerPosition = $resizer.position();

    this.$container.find('.ht_clone_left tbody tr:eq(1) th:eq(0)').simulate('mousedown');
    this.$container.find('.ht_clone_left tbody tr:eq(2) th:eq(0)').simulate('mouseover');
    this.$container.find('.ht_clone_left tbody tr:eq(3) th:eq(0)').simulate('mouseover');
    this.$container.find('.ht_clone_left tbody tr:eq(3) th:eq(0)').simulate('mousemove');
    this.$container.find('.ht_clone_left tbody tr:eq(3) th:eq(0)').simulate('mouseup');

    setTimeout(() => {
      $resizer.simulate('mousedown', { clientY: resizerPosition.top });
      $resizer.simulate('mouseup');
      $resizer.simulate('mousedown', { clientY: resizerPosition.top });
      $resizer.simulate('mouseup');
    }, 600);

    setTimeout(() => {
      expect(rowHeight(spec().$container, 1)).toBeAroundValue(24);
      expect(rowHeight(spec().$container, 2)).toBeAroundValue(24);
      expect(rowHeight(spec().$container, 3)).toBeAroundValue(24);
      done();
    }, 1600);
  });

  it('should resize (expanding and narrowing) selected rows', function (done) {
    var hot = handsontable({
      data: Handsontable.helper.createSpreadsheetData(10, 20),
      rowHeaders: true,
      manualRowResize: true
    });

    resizeRow(2, 60);

    var $rowsHeaders = this.$container.find('.ht_clone_left tr th');
    this.$container.find('.ht_clone_left tbody tr:eq(1) th:eq(0)').simulate('mouseover');

    $rowsHeaders.eq(1).simulate('mousedown');
    $rowsHeaders.eq(2).simulate('mouseover');
    $rowsHeaders.eq(3).simulate('mouseover');
    $rowsHeaders.eq(3).simulate('mousemove');
    $rowsHeaders.eq(3).simulate('mouseup');

    var $resizer = this.$container.find('.manualRowResizer');
    var resizerPosition = $resizer.position();

    setTimeout(() => {
      $resizer.simulate('mousedown', { clientY: resizerPosition.top });
      $resizer.simulate('mousemove', { clientY: resizerPosition.top - $rowsHeaders.eq(3).height() + 80 });
      $resizer.simulate('mouseup');

      expect($rowsHeaders.eq(1).height()).toEqual(80);
      expect($rowsHeaders.eq(2).height()).toEqual(80);
      expect($rowsHeaders.eq(3).height()).toEqual(80);
    }, 600);

    setTimeout(() => {
      $resizer.simulate('mousedown', { clientY: resizerPosition.top });
      $resizer.simulate('mousemove', { clientY: resizerPosition.top - $rowsHeaders.eq(3).height() + 35 });
      $resizer.simulate('mouseup');

      expect($rowsHeaders.eq(1).height()).toEqual(35);
      expect($rowsHeaders.eq(2).height()).toEqual(35);
      expect($rowsHeaders.eq(3).height()).toEqual(35);
      done();
    }, 1800);
  });

  describe('handle and guide', () => {
    it('should display the resize handle in the proper position and with a proper size', function () {
      var hot = handsontable({
        data: [{ id: 1, name: 'Ted', lastName: 'Right' }, { id: 2, name: 'Frank', lastName: 'Honest' }, { id: 3, name: 'Joan', lastName: 'Well' }, { id: 4, name: 'Sid', lastName: 'Strong' }, { id: 5, name: 'Jane', lastName: 'Neat' }],
        rowHeaders: true,
        manualRowResize: true
      });

      var $headerTH = this.$container.find('tbody tr:eq(1) th:eq(0)');
      $headerTH.simulate('mouseover');

      var $handle = $('.manualRowResizer');

      expect($handle.offset().top).toBeCloseTo($headerTH.offset().top + $headerTH.outerHeight() - $handle.outerHeight() - 1, 0);
      expect($handle.width()).toBeCloseTo($headerTH.outerWidth(), 0);
    });
  });
});

/***/ }),
/* 357 */
/***/ (function(module, exports) {

describe('MergeCells', () => {
  let id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  describe('mergeCells option', () => {
    it('should merge cell in startup', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(10, 5),
        mergeCells: [{ row: 0, col: 0, rowspan: 2, colspan: 2 }]
      });
      let TD = hot.rootElement.querySelector('td');

      expect(TD.getAttribute('rowspan')).toBe('2');
      expect(TD.getAttribute('colspan')).toBe('2');
    });
  });

  describe('mergeCells updateSettings', () => {
    it('should allow to overwrite the initial settings using the updateSettings method', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(10, 10),
        mergeCells: [{ row: 0, col: 0, rowspan: 2, colspan: 2 }]
      });
      let TD = hot.rootElement.querySelector('td');
      expect(TD.getAttribute('rowspan')).toBe('2');
      expect(TD.getAttribute('colspan')).toBe('2');

      updateSettings({
        mergeCells: [{ row: 2, col: 2, rowspan: 2, colspan: 2 }]
      });

      TD = hot.rootElement.querySelector('td');
      expect(TD.getAttribute('rowspan')).toBe(null);
      expect(TD.getAttribute('colspan')).toBe(null);

      TD = getCell(2, 2);

      expect(TD.getAttribute('rowspan')).toBe('2');
      expect(TD.getAttribute('colspan')).toBe('2');
    });

    it('should allow resetting the merged cells by changing it to an empty array', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(10, 10),
        mergeCells: [{ row: 0, col: 0, rowspan: 2, colspan: 2 }]
      });
      let TD = hot.rootElement.querySelector('td');
      expect(TD.getAttribute('rowspan')).toBe('2');
      expect(TD.getAttribute('colspan')).toBe('2');

      updateSettings({
        mergeCells: []
      });

      TD = hot.rootElement.querySelector('td');
      expect(TD.getAttribute('rowspan')).toBe(null);
      expect(TD.getAttribute('colspan')).toBe(null);
    });

    it('should allow resetting and turning off the mergeCells plugin by changing mergeCells to \'false\'', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(10, 10),
        mergeCells: [{ row: 0, col: 0, rowspan: 2, colspan: 2 }]
      });
      let TD = hot.rootElement.querySelector('td');
      expect(TD.getAttribute('rowspan')).toBe('2');
      expect(TD.getAttribute('colspan')).toBe('2');

      updateSettings({
        mergeCells: false
      });

      TD = hot.rootElement.querySelector('td');
      expect(TD.getAttribute('rowspan')).toBe(null);
      expect(TD.getAttribute('colspan')).toBe(null);
    });
  });

  describe('mergeCells copy', () => {
    it('should not copy text of cells that are merged into another cell', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(10, 5),
        mergeCells: [{ row: 0, col: 0, rowspan: 2, colspan: 2 }]
      });
      expect(hot.getCopyableText(0, 0, 2, 2)).toBe('A1\t\tC1\n\t\tC2\nA3\tB3\tC3');
    });
  });

  describe('merged cells selection', () => {

    it('should select the whole range of cells which form a merged cell', function () {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(4, 4),
        mergeCells: [{
          row: 0,
          col: 0,
          colspan: 4,
          rowspan: 1
        }]
      });

      let $table = this.$container.find('table.htCore');
      let $td = $table.find('tr:eq(0) td:eq(0)');

      expect($td.attr('rowspan')).toEqual('1');
      expect($td.attr('colspan')).toEqual('4');

      expect(hot.getSelectedLast()).toBeUndefined();

      hot.selectCell(0, 0);

      expect(hot.getSelectedLast()).toEqual([0, 0, 0, 3]);

      deselectCell();

      hot.selectCell(0, 1);

      expect(hot.getSelectedLast()).toEqual([0, 0, 0, 3]);
    });

    it('should always make a rectangular selection, when selecting merged and not merged cells', function () {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(4, 4),
        mergeCells: [{
          row: 1,
          col: 1,
          colspan: 3,
          rowspan: 2
        }]
      });

      let $table = this.$container.find('table.htCore');
      let $td = $table.find('tr:eq(1) td:eq(1)');

      expect($td.attr('rowspan')).toEqual('2');
      expect($td.attr('colspan')).toEqual('3');

      expect(hot.getSelectedLast()).toBeUndefined();

      hot.selectCell(0, 0);

      expect(hot.getSelectedLast()).toEqual([0, 0, 0, 0]);

      deselectCell();

      hot.selectCell(0, 0, 1, 1);

      expect(hot.getSelectedLast()).not.toEqual([0, 0, 1, 1]);
      expect(hot.getSelectedLast()).toEqual([0, 0, 2, 3]);

      deselectCell();

      hot.selectCell(0, 1, 1, 1);

      expect(hot.getSelectedLast()).toEqual([0, 1, 2, 3]);
    });

    it('should not switch the selection start point when selecting from non-merged cells to merged cells', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(10, 10),
        mergeCells: [{ row: 1, col: 1, rowspan: 3, colspan: 3 }, { row: 3, col: 4, rowspan: 2, colspan: 2 }]
      });

      $(hot.getCell(6, 6)).simulate('mousedown');

      expect(hot.getSelectedRangeLast().from.col).toEqual(6);
      expect(hot.getSelectedRangeLast().from.row).toEqual(6);

      $(hot.getCell(1, 1)).simulate('mouseenter');

      expect(hot.getSelectedRangeLast().from.col).toEqual(6);
      expect(hot.getSelectedRangeLast().from.row).toEqual(6);

      $(hot.getCell(3, 3)).simulate('mouseenter');

      expect(hot.getSelectedRangeLast().from.col).toEqual(6);
      expect(hot.getSelectedRangeLast().from.row).toEqual(6);

      $(hot.getCell(4, 4)).simulate('mouseenter');

      expect(hot.getSelectedRangeLast().from.col).toEqual(6);
      expect(hot.getSelectedRangeLast().from.row).toEqual(6);
    });

    it('should select cells in the correct direction when changing selections around a merged range', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(10, 10),
        mergeCells: [{ row: 4, col: 4, rowspan: 2, colspan: 2 }]
      });

      hot.selectCell(5, 5, 5, 2);
      expect(hot.getSelectedRangeLast().getDirection()).toEqual('SE-NW');

      hot.selectCell(4, 4, 2, 5);
      expect(hot.getSelectedRangeLast().getDirection()).toEqual('SW-NE');

      hot.selectCell(4, 4, 5, 7);
      expect(hot.getSelectedRangeLast().getDirection()).toEqual('NW-SE');

      hot.selectCell(4, 5, 7, 5);
      expect(hot.getSelectedRangeLast().getDirection()).toEqual('NE-SW');
    });

    it('should not add an area class to the selected cell if a single merged cell is selected', () => {
      handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(6, 6),
        mergeCells: [{
          row: 1,
          col: 1,
          colspan: 3,
          rowspan: 2
        }]
      });

      selectCell(1, 1);
      expect(getCell(1, 1).className.indexOf('area')).toEqual(-1);

      selectCell(1, 1, 4, 4);
      expect(getCell(1, 1).className.indexOf('area')).not.toEqual(-1);

      selectCell(1, 1);
      expect(getCell(1, 1).className.indexOf('area')).toEqual(-1);

      selectCell(0, 0);
      expect(getCell(1, 1).className.indexOf('area')).toEqual(-1);
    });

    it('should render fill handle after merge cells', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        mergeCells: true
      });

      const plugin = hot.getPlugin('mergeCells');
      hot.selectCell(0, 0, 2, 2);
      plugin.mergeSelection();

      expect(spec().$container.find('.wtBorder.current.corner:visible').length).toEqual(1);
    });

    it('should render fill handle when merge cells is highlighted cell in right bottom corner', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        mergeCells: [{ row: 2, col: 2, rowspan: 2, colspan: 2 }]
      });

      hot.selectCell(2, 2, 1, 1);

      expect(spec().$container.find('.wtBorder.corner:visible').length).toEqual(1);
    });

    it('should render fill handle when cell in right bottom corner is a merged cell', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        mergeCells: [{ row: 2, col: 2, rowspan: 2, colspan: 2 }]
      });

      hot.selectCell(1, 1, 2, 2);

      expect(spec().$container.find('.wtBorder.corner:visible').length).toEqual(1);
    });
  });

  describe('merged cells scroll', () => {
    it('getCell should return merged cell parent', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(10, 5),
        mergeCells: [{ row: 0, col: 0, rowspan: 2, colspan: 2 }],
        height: 100,
        width: 400
      });

      let mergedCellParent = hot.getCell(0, 0);
      let mergedCellHidden = hot.getCell(1, 1);

      expect(mergedCellHidden).toBe(mergedCellParent);
    });

    it('should scroll viewport to beginning of a merged cell when it\'s clicked', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(10, 5),
        mergeCells: [{ row: 5, col: 0, rowspan: 2, colspan: 2 }],
        height: 100,
        width: 400
      });

      let mainHolder = hot.view.wt.wtTable.holder;

      mainHolder.scrollTop = 130;
      hot.render();

      expect(mainHolder.scrollTop).toBe(130);

      let TD = hot.getCell(5, 0);
      mouseDown(TD);
      mouseUp(TD);
      let mergedCellScrollTop = mainHolder.scrollTop;
      expect(mergedCellScrollTop).toBeLessThan(130);
      expect(mergedCellScrollTop).toBeGreaterThan(0);

      mainHolder.scrollTop = 0;
      hot.render();

      mainHolder.scrollTop = 130;
      hot.render();

      TD = hot.getCell(5, 2);
      mouseDown(TD);
      mouseUp(TD);
      let regularCellScrollTop = mainHolder.scrollTop;
      expect(mergedCellScrollTop).toBe(regularCellScrollTop);
    });

    it('should render whole merged cell even when most rows are not in the viewport - scrolled to top', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(40, 5),
        mergeCells: [{ row: 1, col: 0, rowspan: 21, colspan: 2 }, { row: 21, col: 2, rowspan: 18, colspan: 2 }],
        height: 100,
        width: 400
      });

      expect(hot.countRenderedRows()).toBe(39);
    });

    it('should render whole merged cell even when most rows are not in the viewport - scrolled to bottom', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(40, 5),
        mergeCells: [{ row: 1, col: 0, rowspan: 21, colspan: 2 }, { row: 21, col: 2, rowspan: 18, colspan: 2 }],
        height: 100,
        width: 400
      });

      let mainHolder = hot.view.wt.wtTable.holder;

      $(mainHolder).scrollTop(99999);
      hot.render();

      expect(hot.countRenderedRows()).toBe(39);
    });

    it('should render whole merged cell even when most columns are not in the viewport - scrolled to the left', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(5, 40),
        mergeCells: [{ row: 0, col: 1, rowspan: 2, colspan: 21 }, { row: 2, col: 21, rowspan: 2, colspan: 18 }],
        height: 100,
        width: 400
      });

      expect(hot.countRenderedCols()).toBe(39);
    });

    it('should render whole merged cell even when most columns are not in the viewport - scrolled to the right', function () {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(5, 40),
        mergeCells: [{ row: 0, col: 1, rowspan: 2, colspan: 21 }, { row: 2, col: 21, rowspan: 2, colspan: 18 }],
        height: 100,
        width: 400
      });

      this.$container.scrollLeft(99999);
      hot.render();

      expect(hot.countRenderedCols()).toBe(39);
    });
  });

  describe('merge cells shift', () => {
    it('should shift the merged cells right, when inserting a column on the left side of them', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(20, 20),
        mergeCells: [{ row: 1, col: 1, rowspan: 2, colspan: 2 }, { row: 2, col: 5, rowspan: 2, colspan: 2 }],
        height: 400,
        width: 400
      });

      hot.alter('insert_col', 3, 2);

      let plugin = hot.getPlugin('mergeCells');
      let mergedCellsCollection = plugin.mergedCellsCollection.mergedCells;

      expect(mergedCellsCollection[0].col).toEqual(1);
      expect(mergedCellsCollection[1].col).toEqual(7);
    });

    it('should shift the merged cells left, when removing a column on the left side of them', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(20, 20),
        mergeCells: [{ row: 1, col: 1, rowspan: 2, colspan: 2 }, { row: 2, col: 5, rowspan: 2, colspan: 2 }],
        height: 400,
        width: 400
      });

      hot.alter('remove_col', 3, 2);

      let plugin = hot.getPlugin('mergeCells');
      let mergedCellsCollection = plugin.mergedCellsCollection.mergedCells;

      expect(mergedCellsCollection[0].col).toEqual(1);
      expect(mergedCellsCollection[1].col).toEqual(3);
    });

    it('should shift the merged cells down, when inserting rows above them', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(20, 20),
        mergeCells: [{ row: 1, col: 1, rowspan: 2, colspan: 2 }, { row: 5, col: 5, rowspan: 2, colspan: 2 }],
        height: 400,
        width: 400
      });

      hot.alter('insert_row', 3, 2);

      let plugin = hot.getPlugin('mergeCells');
      let mergedCellsCollection = plugin.mergedCellsCollection.mergedCells;

      expect(mergedCellsCollection[0].row).toEqual(1);
      expect(mergedCellsCollection[1].row).toEqual(7);
    });

    it('should shift the merged cells up, when removing rows above them', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(20, 20),
        mergeCells: [{ row: 1, col: 1, rowspan: 2, colspan: 2 }, { row: 5, col: 5, rowspan: 2, colspan: 2 }],
        height: 400,
        width: 400
      });

      hot.alter('remove_row', 3, 2);

      let plugin = hot.getPlugin('mergeCells');
      let mergedCellsCollection = plugin.mergedCellsCollection.mergedCells;

      expect(mergedCellsCollection[0].row).toEqual(1);
      expect(mergedCellsCollection[1].row).toEqual(3);
    });
  });

  describe('merged cell candidates validation', () => {
    it('should check if the provided merged cell information object contains negative values, and if so, do not add it ' + 'to the collection and throw an appropriate warning', () => {
      const warnSpy = spyOn(console, 'warn');
      const newMergedCells = [{
        row: 0,
        col: 1,
        rowspan: 3,
        colspan: 4
      }, {
        row: -5,
        col: 8,
        rowspan: 3,
        colspan: 4
      }, {
        row: 20,
        col: -21,
        rowspan: 3,
        colspan: 4
      }, {
        row: 200,
        col: 210,
        rowspan: -3,
        colspan: 4
      }, {
        row: 220,
        col: 220,
        rowspan: 3,
        colspan: -4
      }];
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(20, 20),
        mergeCells: newMergedCells
      });

      expect(warnSpy).toHaveBeenCalledWith('The merged cell declared with {row: -5, col: 8, rowspan: 3, colspan: 4} ' + 'contains negative values, which is not supported. It will not be added to the collection.');
      expect(warnSpy).toHaveBeenCalledWith('The merged cell declared with {row: 20, col: -21, rowspan: 3, colspan: 4} ' + 'contains negative values, which is not supported. It will not be added to the collection.');
      expect(warnSpy).toHaveBeenCalledWith('The merged cell declared with {row: 200, col: 210, rowspan: -3, colspan: 4} ' + 'contains negative values, which is not supported. It will not be added to the collection.');
      expect(warnSpy).toHaveBeenCalledWith('The merged cell declared with {row: 220, col: 220, rowspan: 3, colspan: -4} ' + 'contains negative values, which is not supported. It will not be added to the collection.');

      expect(hot.getPlugin('mergeCells').mergedCellsCollection.mergedCells.length).toEqual(1);
    });

    it('should check if the provided merged cell information object has rowspan and colspan declared as 0, and if so, do not add it ' + 'to the collection and throw an appropriate warning', () => {
      const warnSpy = spyOn(console, 'warn');
      const newMergedCells = [{
        row: 0,
        col: 1,
        rowspan: 3,
        colspan: 4
      }, {
        row: 6,
        col: 6,
        rowspan: 0,
        colspan: 0
      }, {
        row: 9,
        col: 9,
        rowspan: 1,
        colspan: 0
      }];
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(20, 20),
        mergeCells: newMergedCells
      });

      expect(warnSpy).toHaveBeenCalledWith('The merged cell declared at [6, 6] has "rowspan" or ' + '"colspan" declared as "0", which is not supported. It cannot be added to the collection.');
      expect(warnSpy).toHaveBeenCalledWith('The merged cell declared at [9, 9] has "rowspan" or ' + '"colspan" declared as "0", which is not supported. It cannot be added to the collection.');

      expect(hot.getPlugin('mergeCells').mergedCellsCollection.mergedCells.length).toEqual(1);
    });

    it('should check if the provided merged cell information object represents a single cell, and if so, do not add it ' + 'to the collection and throw an appropriate warning', () => {
      const warnSpy = spyOn(console, 'warn');
      const newMergedCells = [{
        row: 0,
        col: 1,
        rowspan: 3,
        colspan: 4
      }, {
        row: 5,
        col: 8,
        rowspan: 1,
        colspan: 1
      }, {
        row: 20,
        col: 21,
        rowspan: 3,
        colspan: 4
      }];
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(30, 30),
        mergeCells: newMergedCells
      });

      expect(warnSpy).toHaveBeenCalledWith('The merged cell declared at [5, 8] has both "rowspan" and "colspan" ' + 'declared as "1", which makes it a single cell. It cannot be added to the collection.');
      expect(hot.getPlugin('mergeCells').mergedCellsCollection.mergedCells.length).toEqual(2);
    });

    it('should check if the provided merged cell information object contains merged declared out of bounds, and if so, ' + 'do not add it to the collection and throw an appropriate warning', () => {
      const warnSpy = spyOn(console, 'warn');
      const newMergedCells = [{
        row: 0,
        col: 1,
        rowspan: 3,
        colspan: 4
      }, {
        row: 17,
        col: 17,
        rowspan: 5,
        colspan: 5
      }, {
        row: 20,
        col: 21,
        rowspan: 3,
        colspan: 4
      }];
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(20, 20),
        mergeCells: newMergedCells
      });

      expect(warnSpy).toHaveBeenCalledWith('The merged cell declared at [17, 17] is positioned ' + '(or positioned partially) outside of the table range. It was not added to the table, please fix your setup.');
      expect(warnSpy).toHaveBeenCalledWith('The merged cell declared at [20, 21] is positioned ' + '(or positioned partially) outside of the table range. It was not added to the table, please fix your setup.');
      expect(hot.getPlugin('mergeCells').mergedCellsCollection.mergedCells.length).toEqual(1);
    });
  });

  xdescribe('canMergeRange', () => {
    it('should return false if start and end cell is the same', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(10, 5)
      });
      let mergeCells = new Handsontable.plugins.MergeCells(hot);
      let result = mergeCells.canMergeRange({
        from: {
          row: 0, col: 1
        },
        to: {
          row: 0, col: 1
        }
      });

      expect(result).toBe(false);
    });

    it('should return true for 2 consecutive cells in the same column', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(10, 5)
      });
      let mergeCells = new Handsontable.plugins.MergeCells(hot);
      let result = mergeCells.canMergeRange({
        from: {
          row: 0, col: 1
        },
        to: {
          row: 1, col: 1
        }
      });

      expect(result).toBe(true);
    });

    it('should return true for 2 consecutive cells in the same row', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(10, 5)
      });
      let mergeCells = hot.getPlugin('mergeCells');
      let result = mergeCells.canMergeRange({
        from: {
          row: 0, col: 1
        },
        to: {
          row: 0, col: 2
        }
      });

      expect(result).toBe(true);
    });

    it('should return true for 4 neighboring cells', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(10, 5)
      });
      let mergeCells = hot.getPlugin('mergeCells');
      let result = mergeCells.canMergeRange({
        from: {
          row: 0, col: 1
        },
        to: {
          row: 1, col: 2
        }
      });

      expect(result).toBe(true);
    });
  });

  xdescribe('modifyTransform', () => {
    it('should not transform arrow right when entering a merged cell', () => {
      let mergeCellsSettings = [{ row: 1, col: 1, rowspan: 3, colspan: 3 }];
      let coords = new CellCoords(1, 0);
      let currentSelection = new CellRange(coords, coords, coords);
      let mergeCells = new Handsontable.MergeCells(mergeCellsSettings);
      let inDelta = new CellCoords(0, 1);
      mergeCells.modifyTransform('modifyTransformStart', currentSelection, inDelta);

      expect(inDelta).toEqual(new CellCoords(0, 1));
    });

    it('should transform arrow right when leaving a merged cell', () => {
      let mergeCellsSettings = [{ row: 1, col: 1, rowspan: 3, colspan: 3 }];
      let coords = new CellCoords(1, 1);
      let currentSelection = new CellRange(coords, coords, coords);
      let mergeCells = new Handsontable.MergeCells(mergeCellsSettings);
      let inDelta = new CellCoords(0, 1);
      mergeCells.modifyTransform('modifyTransformStart', currentSelection, inDelta);

      expect(inDelta).toEqual(new CellCoords(0, 3));
    });

    it('should transform arrow right when leaving a merged cell (return to desired row)', () => {
      let mergeCellsSettings = [{ row: 1, col: 1, rowspan: 3, colspan: 3 }];
      let mergeCells = new Handsontable.MergeCells(mergeCellsSettings);

      let coords = new CellCoords(2, 0);
      let currentSelection = new CellRange(coords, coords, coords);
      let inDelta = new CellCoords(0, 1);
      mergeCells.modifyTransform('modifyTransformStart', currentSelection, inDelta);

      expect(inDelta).toEqual(new CellCoords(-1, 1));

      coords = new CellCoords(1, 1);
      currentSelection = new CellRange(coords, coords, coords);
      inDelta = new CellCoords(0, 1);
      mergeCells.modifyTransform('modifyTransformStart', currentSelection, inDelta);

      expect(inDelta).toEqual(new CellCoords(1, 3));
    });

    it('should transform arrow left when entering a merged cell', () => {
      let mergeCellsSettings = [{ row: 1, col: 1, rowspan: 3, colspan: 3 }];
      let coords = new CellCoords(1, 4);
      let currentSelection = new CellRange(coords, coords, coords);
      let mergeCells = new Handsontable.MergeCells(mergeCellsSettings);
      let inDelta = new CellCoords(0, -1);
      mergeCells.modifyTransform('modifyTransformStart', currentSelection, inDelta);

      expect(inDelta).toEqual(new CellCoords(0, -3));
    });

    it('should not transform arrow left when leaving a merged cell', () => {
      let mergeCellsSettings = [{ row: 1, col: 1, rowspan: 3, colspan: 3 }];
      let coords = new CellCoords(1, 1);
      let currentSelection = new CellRange(coords, coords, coords);
      let mergeCells = new Handsontable.MergeCells(mergeCellsSettings);
      let inDelta = new CellCoords(0, -1);
      mergeCells.modifyTransform('modifyTransformStart', currentSelection, inDelta);

      expect(inDelta).toEqual(new CellCoords(0, -1));
    });

    it('should transform arrow left when leaving a merged cell (return to desired row)', () => {
      let mergeCellsSettings = [{ row: 1, col: 1, rowspan: 3, colspan: 3 }];
      let mergeCells = new Handsontable.MergeCells(mergeCellsSettings);

      let coords = new CellCoords(2, 4);
      let currentSelection = new CellRange(coords, coords, coords);
      let inDelta = new CellCoords(0, -1);
      mergeCells.modifyTransform('modifyTransformStart', currentSelection, inDelta);

      expect(inDelta).toEqual(new CellCoords(-1, -3));

      coords = new CellCoords(1, 1);
      currentSelection = new CellRange(coords, coords, coords);
      inDelta = new CellCoords(0, -1);
      mergeCells.modifyTransform('modifyTransformStart', currentSelection, inDelta);

      expect(inDelta).toEqual(new CellCoords(1, -1));
    });

    it('should not transform arrow down when entering a merged cell', () => {
      let mergeCellsSettings = [{ row: 1, col: 1, rowspan: 3, colspan: 3 }];
      let coords = new CellCoords(0, 1);
      let currentSelection = new CellRange(coords, coords, coords);
      let mergeCells = new Handsontable.MergeCells(mergeCellsSettings);
      let inDelta = new CellCoords(0, -1);
      mergeCells.modifyTransform('modifyTransformStart', currentSelection, inDelta);

      expect(inDelta).toEqual(new CellCoords(0, -1));
    });

    it('should transform arrow down when leaving a merged cell', () => {
      let mergeCellsSettings = [{ row: 1, col: 1, rowspan: 3, colspan: 3 }];
      let coords = new CellCoords(1, 1);
      let currentSelection = new CellRange(coords, coords, coords);
      let mergeCells = new Handsontable.MergeCells(mergeCellsSettings);
      let inDelta = new CellCoords(1, 0);
      mergeCells.modifyTransform('modifyTransformStart', currentSelection, inDelta);

      expect(inDelta).toEqual(new CellCoords(3, 0));
    });

    it('should transform arrow up when entering a merged cell', () => {
      let mergeCellsSettings = [{ row: 1, col: 1, rowspan: 3, colspan: 3 }];
      let coords = new CellCoords(4, 1);
      let currentSelection = new CellRange(coords, coords, coords);
      let mergeCells = new Handsontable.MergeCells(mergeCellsSettings);
      let inDelta = new CellCoords(-1, 0);
      mergeCells.modifyTransform('modifyTransformStart', currentSelection, inDelta);

      expect(inDelta).toEqual(new CellCoords(-3, 0));
    });

    it('should not transform arrow up when leaving a merged cell', () => {
      let mergeCellsSettings = [{ row: 1, col: 1, rowspan: 3, colspan: 3 }];
      let coords = new CellCoords(1, 1);
      let currentSelection = new CellRange(coords, coords, coords);
      let mergeCells = new Handsontable.MergeCells(mergeCellsSettings);
      let inDelta = new CellCoords(-1, 0);
      mergeCells.modifyTransform('modifyTransformStart', currentSelection, inDelta);

      expect(inDelta).toEqual(new CellCoords(-1, 0));
    });
  });

  describe('ContextMenu', () => {
    it('should disable `Merge cells` context menu item when context menu was triggered from corner header', () => {
      handsontable({
        data: Handsontable.helper.createSpreadsheetObjectData(10, 5),
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        mergeCells: true
      });

      $('.ht_clone_top_left_corner .htCore').find('thead').find('th').eq(0).simulate('mousedown', { which: 3 });
      contextMenu();

      expect($('.htContextMenu tbody td.htDisabled').text()).toBe(['Insert column left', 'Insert column right', 'Remove row', 'Remove column', 'Undo', 'Redo', 'Read only', 'Alignment', 'Merge cells'].join(''));
    });
  });

  describe('Validation', () => {
    it('should not hide the merged cells after validating the table', done => {
      let onAfterValidate = jasmine.createSpy('onAfterValidate');
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        mergeCells: [{ row: 5, col: 4, rowspan: 2, colspan: 2 }, { row: 1, col: 1, rowspan: 2, colspan: 2 }],
        validator: function (query, callback) {
          callback(true);
        },
        afterValidate: onAfterValidate
      });

      let firstCollection = hot.getCell(5, 4);
      let secondCollection = hot.getCell(1, 1);

      expect(firstCollection.style.display.indexOf('none')).toEqual(-1);
      expect(secondCollection.style.display.indexOf('none')).toEqual(-1);

      hot.validateCells();

      setTimeout(() => {
        expect(onAfterValidate).toHaveBeenCalled();

        firstCollection = hot.getCell(5, 4);
        secondCollection = hot.getCell(1, 1);

        expect(firstCollection.style.display.indexOf('none')).toEqual(-1);
        expect(secondCollection.style.display.indexOf('none')).toEqual(-1);

        done();
      }, 100);
    });
  });

  describe('Entire row/column selection', () => {
    it('should be possible to select a single entire column, when there\'s a merged cell in it', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        mergeCells: [{ row: 5, col: 4, rowspan: 2, colspan: 5 }]
      });

      hot.selectCell(0, 5, 9, 5);
      expect(JSON.stringify(hot.getSelectedLast())).toEqual('[0,5,9,5]');

      // it should work only for selecting the entire column
      hot.selectCell(4, 5, 7, 5);
      expect(JSON.stringify(hot.getSelectedLast())).toEqual('[4,4,7,8]');
    });

    it('should be possible to select a single entire row, when there\'s a merged cell in it', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        mergeCells: [{ row: 5, col: 4, rowspan: 5, colspan: 2 }]
      });

      hot.selectCell(5, 0, 5, 9);
      expect(JSON.stringify(hot.getSelectedLast())).toEqual('[5,0,5,9]');

      // it should work only for selecting the entire row
      hot.selectCell(6, 3, 6, 7);
      expect(JSON.stringify(hot.getSelectedLast())).toEqual('[5,3,9,7]');
    });
  });

  describe('Undo/Redo', () => {
    it('should not be possible to remove initially declared merged cells by calling the \'Undo\' action.', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        mergeCells: [{ row: 5, col: 4, rowspan: 2, colspan: 5 }, { row: 1, col: 1, rowspan: 2, colspan: 2 }]
      });

      hot.undo();

      expect(hot.getPlugin('mergeCells').mergedCellsCollection.mergedCells.length).toEqual(2);
    });

    it('should be possible undo the merging process by calling the \'Undo\' action.', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        mergeCells: true
      });

      const plugin = hot.getPlugin('mergeCells');
      plugin.merge(0, 0, 3, 3);
      hot.selectCell(4, 4, 7, 7);
      plugin.mergeSelection();

      expect(plugin.mergedCellsCollection.mergedCells.length).toEqual(2);
      hot.undo();
      expect(plugin.mergedCellsCollection.mergedCells.length).toEqual(1);
      hot.undo();
      expect(plugin.mergedCellsCollection.mergedCells.length).toEqual(0);
    });

    it('should be possible redo the merging process by calling the \'Redo\' action.', () => {
      const hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(10, 10),
        mergeCells: true
      });

      const plugin = hot.getPlugin('mergeCells');
      plugin.merge(0, 0, 3, 3);
      hot.selectCell(4, 4, 7, 7);
      plugin.mergeSelection();

      hot.undo();
      hot.undo();

      hot.redo();
      expect(plugin.mergedCellsCollection.mergedCells.length).toEqual(1);
      hot.redo();
      expect(plugin.mergedCellsCollection.mergedCells.length).toEqual(2);
    });
  });
});

/***/ }),
/* 358 */
/***/ (function(module, exports) {

describe('HandsontableObserveChanges', () => {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  function createHOT(data, observeChanges) {
    return handsontable({
      data,
      width: 200,
      height: 200,
      observeChanges
    });
  }

  describe('refreshing table after changes have been detected', () => {
    describe('array data', () => {
      it('should render newly added row', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);

        data.push(['A3', 'B3']);

        var htCore = getHtCore();

        setTimeout(() => {
          expect(htCore.find('tr').length).toEqual(3);
          expect(htCore.find('col').length).toEqual(2);
          done();
        }, 200);
      });

      it('should render newly added column', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);
        var htCore = getHtCore();

        data[0].push('C1');
        data[1].push('C2');

        setTimeout(() => {
          expect(htCore.find('tr').length).toEqual(2);
          expect(htCore.find('col').length).toEqual(3);
          done();
        }, 200);
      });

      it('should render removed row', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);
        var htCore = getHtCore();

        data.splice(0, 1); // removes one row at index 0

        setTimeout(() => {
          expect(htCore.find('tr').length).toEqual(1);
          expect(htCore.find('col').length).toEqual(2);
          done();
        }, 200);
      });

      it('should render removed column', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);
        var htCore = getHtCore();

        data[0].splice(0, 1); // removes one column at index 0 in first row
        data[1].splice(0, 1); // removes one column at index 0 in second row

        setTimeout(() => {
          expect(htCore.find('tr').length).toEqual(2);
          expect(htCore.find('col').length).toEqual(1);
          done();
        }, 200);
      });

      it('should render cell change from string to string', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);
        var htCore = getHtCore();

        data[0][0] = 'new string';

        setTimeout(() => {
          expect(htCore.find('td:eq(0)').html()).toEqual('new string');
          done();
        }, 200);
      });

      it('should render cell change in a new row', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);
        var htCore = getHtCore();

        data.push(['A3', 'B3']);

        setTimeout(() => {
          expect(htCore.find('tr:eq(2) td:eq(0)').html()).toEqual('A3');
          data[2][0] = 'new string';
        }, 200);

        setTimeout(() => {
          expect(htCore.find('tr:eq(2) td:eq(0)').html()).toEqual('new string');
          done();
        }, 1200);
      });

      it('should not render cell change when turned off (`observeChanges: false`)', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        createHOT(data, false);
        var htCore = getHtCore();

        data[0][0] = 'new string';

        setTimeout(() => {
          expect(htCore.find('td:eq(0)').html()).toEqual('A1');
          done();
        }, 100);
      });
    });
    describe('object data', () => {
      it('should render newly added row', done => {
        var data = Handsontable.helper.createSpreadsheetObjectData(2, 2);
        var hot = createHOT(data, true);
        var htCore = getHtCore();

        data.push({ prop0: 'A3', prop1: 'B3' });

        setTimeout(() => {
          expect(htCore.find('tr').length).toEqual(3);
          expect(htCore.find('col').length).toEqual(2);
          done();
        }, 200);
      });

      it('should render removed row', done => {
        var data = Handsontable.helper.createSpreadsheetObjectData(2, 2);
        var hot = createHOT(data, true);
        var htCore = getHtCore();

        data.splice(0, 1); // removes one row at index 0

        setTimeout(() => {
          expect(htCore.find('tr').length).toEqual(1);
          expect(htCore.find('col').length).toEqual(2);
          done();
        }, 200);
      });

      it('should render cell change from string to string', done => {
        var data = Handsontable.helper.createSpreadsheetObjectData(2, 2);
        var hot = createHOT(data, true);
        var htCore = getHtCore();

        data[0].prop0 = 'new string';

        setTimeout(() => {
          expect(htCore.find('td:eq(0)').html()).toEqual('new string');
          done();
        }, 200);
      });

      it('should render cell change in a new row', done => {
        var data = Handsontable.helper.createSpreadsheetObjectData(2, 2);
        var hot = createHOT(data, true);
        var htCore = getHtCore();

        data.push({ prop0: 'A3', prop1: 'B3' });

        setTimeout(() => {
          expect(htCore.find('tr:eq(2) td:eq(0)').html()).toEqual('A3');
          data[2].prop0 = 'new string';
        }, 200);

        setTimeout(() => {
          expect(htCore.find('tr:eq(2) td:eq(0)').html()).toEqual('new string');
          done();
        }, 1200);
      });

      it('should not break with undefined data properties', () => {
        var data = Handsontable.helper.createSpreadsheetObjectData(2, 2);
        data[0].prop0 = undefined;

        expect(() => {
          var hot = createHOT(data, true);
          var htCore = getHtCore();
        }).not.toThrow();
      });

      it('should not render cell change when turned off (`observeChanges: false`)', done => {
        var data = Handsontable.helper.createSpreadsheetObjectData(2, 2);
        createHOT(data, false);
        var htCore = getHtCore();

        data[0].prop0 = 'new string';

        setTimeout(() => {
          expect(htCore.find('td:eq(0)').html()).toEqual('A1');
          done();
        }, 200);
      });
    });
  });

  describe('enabling/disabling plugin', () => {
    it('should be possible to enable plugin using updateSettings', done => {
      var data = Handsontable.helper.createSpreadsheetData(2, 2);
      var hot = createHOT(data, false);
      var htCore = getHtCore();

      data[0][0] = 'new string';

      setTimeout(() => {
        expect(htCore.find('td:eq(0)').html()).toEqual('A1');

        updateSettings({
          observeChanges: true
        });
        data[1][0] = 'another new string';
      }, 200);

      setTimeout(() => {
        expect(htCore.find('tr:eq(1) td:eq(0)').html()).toEqual('another new string');
        done();
      }, 400);
    });

    it('should be possible to disable plugin using updateSettings', done => {
      var data = Handsontable.helper.createSpreadsheetData(2, 2);
      var hot = createHOT(data, true);
      var htCore = getHtCore();

      data[0][0] = 'new string';

      setTimeout(() => {
        expect(htCore.find('tbody tr:eq(0) td:eq(0)').html()).toEqual('new string');
        expect(htCore.find('tbody tr:eq(1) td:eq(0)').html()).toEqual('A2');

        updateSettings({
          observeChanges: false
        });

        data[1][0] = 'another new string';
      }, 200);

      setTimeout(() => {
        expect(htCore.find('tbody tr:eq(0) td:eq(0)').html()).toEqual('new string');
        expect(htCore.find('tbody tr:eq(1) td:eq(0)').html()).toEqual('A2');

        hot.render();

        expect(htCore.find('tbody tr:eq(0) td:eq(0)').html()).toEqual('new string');
        expect(htCore.find('tbody tr:eq(1) td:eq(0)').html()).toEqual('another new string');
        done();
      }, 300);
    });

    it('should be possible to pause observing changes without disabling the plugin', done => {
      var data = Handsontable.helper.createSpreadsheetData(2, 2);
      var hot = createHOT(data, true);
      var htCore = getHtCore();

      data[0][0] = 'new string';

      setTimeout(() => {
        expect(htCore.find('tbody tr:eq(0) td:eq(0)').html()).toEqual('new string');
        expect(htCore.find('tbody tr:eq(1) td:eq(0)').html()).toEqual('A2');

        hot.pauseObservingChanges();

        data[1][0] = 'another new string';
      }, 200);

      setTimeout(() => {
        expect(htCore.find('tbody tr:eq(0) td:eq(0)').html()).toEqual('new string');
        expect(htCore.find('tbody tr:eq(1) td:eq(0)').html()).toEqual('A2');

        hot.render();

        expect(htCore.find('tbody tr:eq(0) td:eq(0)').html()).toEqual('new string');
        expect(htCore.find('tbody tr:eq(1) td:eq(0)').html()).toEqual('another new string');
        done();
      }, 300);
    });

    it('should be possible to resume observing changes after it was paused', done => {
      var data = Handsontable.helper.createSpreadsheetData(2, 2);
      var hot = createHOT(data, true);
      var htCore = getHtCore();

      hot.pauseObservingChanges();

      data[0][0] = 'new string';

      setTimeout(() => {
        expect(htCore.find('tbody tr:eq(0) td:eq(0)').html()).toEqual('A1');
        expect(htCore.find('tbody tr:eq(1) td:eq(0)').html()).toEqual('A2');

        hot.resumeObservingChanges();
        data[1][0] = 'another new string';
      }, 100);

      setTimeout(() => {
        expect(htCore.find('tbody tr:eq(0) td:eq(0)').html()).toEqual('new string');
        expect(htCore.find('tbody tr:eq(1) td:eq(0)').html()).toEqual('another new string');
        done();
      }, 1200);
    });
  });

  describe('observeChanges fires appropriate events when changes are detected', () => {
    describe('array data', () => {
      it('should fire afterChangesObserved event after changes has been noticed', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);

        var afterChangesObservedCallback = jasmine.createSpy('afterChangesObservedCallback');
        hot.addHook('afterChangesObserved', afterChangesObservedCallback);

        data[0][0] = 'new string';

        setTimeout(() => {
          expect(afterChangesObservedCallback.calls.count()).toEqual(1);
          done();
        }, 200);
      });

      it('should fire afterCreateRow event after detecting that new row has been added', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);

        var afterCreateRowCallback = jasmine.createSpy('afterCreateRowCallback');
        hot.addHook('afterCreateRow', afterCreateRowCallback);

        data.push(['A2', 'B2']);

        setTimeout(() => {
          expect(afterCreateRowCallback.calls.count()).toEqual(1);
          expect(afterCreateRowCallback).toHaveBeenCalledWith(2, 1, 'ObserveChanges.change', undefined, undefined, undefined);
          done();
        }, 200);
      });

      it('should fire afterRemoveRow event after detecting that row has been removed', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);

        var afterRemoveRowCallback = jasmine.createSpy('afterRemoveRowCallback');
        hot.addHook('afterRemoveRow', afterRemoveRowCallback);

        data.pop();

        setTimeout(() => {
          expect(afterRemoveRowCallback.calls.count()).toEqual(1);
          expect(afterRemoveRowCallback).toHaveBeenCalledWith(1, 1, 'ObserveChanges.change', undefined, undefined, undefined);
          done();
        }, 200);
      });

      it('should fire afterRemoveRow event after detecting that multiple rows have been removed', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);

        var afterRemoveRowCallback = jasmine.createSpy('afterRemoveRowCallback');
        hot.addHook('afterRemoveRow', afterRemoveRowCallback);

        data.splice(0, 2);

        setTimeout(() => {
          expect(afterRemoveRowCallback.calls.count()).toEqual(2);

          // The order of run hooks depends on whether objectObserve uses native Object.observe or a shim
          var args = [];
          args.push(afterRemoveRowCallback.calls.argsFor(0));
          args.push(afterRemoveRowCallback.calls.argsFor(1));
          expect(args).toContain([1, 1, 'ObserveChanges.change', undefined, undefined, undefined]);
          expect(args).toContain([0, 1, 'ObserveChanges.change', undefined, undefined, undefined]);
          done();
        }, 200);
      });

      it('should fire afterCreateCol event after detecting that new col has been added', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);

        var afterCreateColCallback = jasmine.createSpy('afterCreateColCallback');
        hot.addHook('afterCreateCol', afterCreateColCallback);

        data[0].push('C1');
        data[1].push('C2');

        setTimeout(() => {
          expect(afterCreateColCallback.calls.count()).toEqual(1);
          expect(afterCreateColCallback.calls.argsFor(0)).toEqual([2, 1, 'ObserveChanges.change', undefined, undefined, undefined]);
          done();
        }, 200);
      });

      it('should fire afterRemoveCol event after detecting that col has been removed', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);

        var afterRemoveColCallback = jasmine.createSpy('afterRemoveColCallback');
        hot.addHook('afterRemoveCol', afterRemoveColCallback);

        data[0].pop();
        data[1].pop();

        setTimeout(() => {
          expect(afterRemoveColCallback.calls.count()).toEqual(1);
          expect(afterRemoveColCallback.calls.argsFor(0)).toEqual([1, 1, 'ObserveChanges.change', undefined, undefined, undefined]);
          done();
        }, 200);
      });

      it('should fire afterRemoveCol event after detecting that multiple cols have been removed', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);

        var afterRemoveColCallback = jasmine.createSpy('afterRemoveColCallback');
        hot.addHook('afterRemoveCol', afterRemoveColCallback);

        data[0].pop();
        data[0].pop();
        data[1].pop();
        data[1].pop();

        setTimeout(() => {
          expect(afterRemoveColCallback.calls.count()).toEqual(2);

          // The order of run hooks depends on whether objectObserve uses native Object.observe or a shim
          var args = [];
          args.push(afterRemoveColCallback.calls.argsFor(0));
          args.push(afterRemoveColCallback.calls.argsFor(1));
          expect(args).toContain([1, 1, 'ObserveChanges.change', undefined, undefined, undefined]);
          expect(args).toContain([0, 1, 'ObserveChanges.change', undefined, undefined, undefined]);
          done();
        }, 200);
      });

      it('should fire afterChange event after detecting that table data has changed', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);

        var afterChangeCallback = jasmine.createSpy('afterChangeCallback');
        hot.addHook('afterChange', afterChangeCallback);

        data[0][0] = 'new string';

        setTimeout(() => {
          expect(afterChangeCallback.calls.count()).toEqual(1);
          expect(afterChangeCallback).toHaveBeenCalledWith([[0, 0, null, 'new string']], 'ObserveChanges.change', undefined, undefined, undefined, undefined);
          done();
        }, 200);
      });
    });
    describe('object data', () => {
      it('should fire afterChangesObserved event after changes has been noticed', done => {
        var data = Handsontable.helper.createSpreadsheetObjectData(2, 2);
        var hot = createHOT(data, true);

        var afterChangesObservedCallback = jasmine.createSpy('afterChangesObservedCallback');
        hot.addHook('afterChangesObserved', afterChangesObservedCallback);

        data[0].prop0 = 'new string';

        setTimeout(() => {
          expect(afterChangesObservedCallback.calls.count()).toEqual(1);
          done();
        }, 200);
      });

      it('should fire afterCreateRow event after detecting that new row has been added', done => {
        var data = Handsontable.helper.createSpreadsheetObjectData(2, 2);
        var hot = createHOT(data, true);

        var afterCreateRowCallback = jasmine.createSpy('afterCreateRowCallback');
        hot.addHook('afterCreateRow', afterCreateRowCallback);

        data.push({ prop0: 'A2', prop1: 'B2' });

        setTimeout(() => {
          expect(afterCreateRowCallback.calls.count()).toEqual(1);
          expect(afterCreateRowCallback).toHaveBeenCalledWith(2, 1, 'ObserveChanges.change', undefined, undefined, undefined);
          done();
        }, 200);
      });

      it('should fire afterRemoveRow event after detecting that row has been removed', done => {
        var data = Handsontable.helper.createSpreadsheetObjectData(2, 2);
        var hot = createHOT(data, true);

        var afterRemoveRowCallback = jasmine.createSpy('afterRemoveRowCallback');
        hot.addHook('afterRemoveRow', afterRemoveRowCallback);

        data.pop();

        setTimeout(() => {
          expect(afterRemoveRowCallback.calls.count()).toEqual(1);
          expect(afterRemoveRowCallback).toHaveBeenCalledWith(1, 1, 'ObserveChanges.change', undefined, undefined, undefined);
          done();
        }, 200);
      });

      it('should fire afterRemoveRow event after detecting that multiple rows have been removed', done => {
        var data = Handsontable.helper.createSpreadsheetObjectData(2, 2);
        var hot = createHOT(data, true);

        var afterRemoveRowCallback = jasmine.createSpy('afterRemoveRowCallback');
        hot.addHook('afterRemoveRow', afterRemoveRowCallback);

        data.splice(0, 2);

        setTimeout(() => {
          expect(afterRemoveRowCallback.calls.count()).toEqual(2);

          // The order of run hooks depends on whether objectObserve uses native Object.observe or a shim
          var args = [];
          args.push(afterRemoveRowCallback.calls.argsFor(0));
          args.push(afterRemoveRowCallback.calls.argsFor(1));
          expect(args).toContain([1, 1, 'ObserveChanges.change', undefined, undefined, undefined]);
          expect(args).toContain([0, 1, 'ObserveChanges.change', undefined, undefined, undefined]);
          done();
        }, 200);
      });

      it('should fire afterChange event after detecting that table data has changed', done => {
        var data = Handsontable.helper.createSpreadsheetObjectData(2, 2);
        var hot = createHOT(data, true);

        var afterChangeCallback = jasmine.createSpy('afterChangeCallback');
        hot.addHook('afterChange', afterChangeCallback);

        data[0].prop0 = 'new string';

        setTimeout(() => {
          expect(afterChangeCallback.calls.count()).toEqual(1);
          expect(afterChangeCallback).toHaveBeenCalledWith([[0, 'prop0', null, 'new string']], 'ObserveChanges.change', undefined, undefined, undefined, undefined);
          done();
        }, 200);
      });
    });
  });

  describe('using HOT data manipulation methods, when observeChanges plugin is enabled', () => {
    describe('array data', () => {
      it('should run render ONCE after detecting that new row has been added', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);

        var afterRenderSpy = jasmine.createSpy('afterRenderSpy');
        hot.addHook('afterRender', afterRenderSpy);

        alter('insert_row');

        setTimeout(() => {
          expect(countRows()).toEqual(3);
          expect(afterRenderSpy.calls.count()).toEqual(1);
          done();
        }, 200);
      });

      it('should run render ONCE after detecting that row has been removed', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);

        var afterRenderSpy = jasmine.createSpy('afterRenderSpy');
        hot.addHook('afterRender', afterRenderSpy);

        var afterChangesObservedCallback = jasmine.createSpy('afterChangesObservedCallback');
        hot.addHook('afterChangesObserved', afterChangesObservedCallback);

        alter('remove_row');

        setTimeout(() => {
          expect(countRows()).toEqual(1);
          expect(afterChangesObservedCallback.calls.count()).toEqual(1);
          expect(afterRenderSpy.calls.count()).toEqual(1);
          done();
        }, 200);
      });

      it('should run render ONCE after detecting that new column has been added', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);

        var afterRenderSpy = jasmine.createSpy('afterRenderSpy');
        hot.addHook('afterRender', afterRenderSpy);

        alter('insert_col');

        setTimeout(() => {
          expect(countCols()).toEqual(3);
          expect(afterRenderSpy.calls.count()).toEqual(1);
          done();
        }, 200);
      });

      it('should run render ONCE after detecting that column has been removed', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);

        var afterRenderSpy = jasmine.createSpy('afterRenderSpy');
        hot.addHook('afterRender', afterRenderSpy);

        var afterChangesObservedCallback = jasmine.createSpy('afterChangesObservedCallback');
        hot.addHook('afterChangesObserved', afterChangesObservedCallback);

        alter('remove_col');

        setTimeout(() => {
          expect(countCols()).toEqual(1);
          expect(afterChangesObservedCallback.calls.count()).toEqual(1);
          expect(afterRenderSpy.calls.count()).toEqual(1);
          done();
        }, 200);
      });

      it('should run render ONCE after detecting that table data has changed', done => {
        var data = Handsontable.helper.createSpreadsheetData(2, 2);
        var hot = createHOT(data, true);
        var htCore = getHtCore();

        var afterRenderSpy = jasmine.createSpy('afterRenderSpy');
        hot.addHook('afterRender', afterRenderSpy);

        var afterChangesObservedCallback = jasmine.createSpy('afterChangesObservedCallback');
        hot.addHook('afterChangesObserved', afterChangesObservedCallback);

        setDataAtCell(0, 0, 'new value');

        setTimeout(() => {
          expect(htCore.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('new value');
          expect(afterChangesObservedCallback.calls.count()).toEqual(1);
          expect(afterRenderSpy.calls.count()).toEqual(1);
          done();
        }, 200);
      });
    });
    describe('object data', () => {
      it('should run render ONCE after detecting that new row has been added', done => {
        var data = Handsontable.helper.createSpreadsheetObjectData(2, 2);
        var hot = createHOT(data, true);

        var afterRenderSpy = jasmine.createSpy('afterRenderSpy');
        hot.addHook('afterRender', afterRenderSpy);

        alter('insert_row');

        setTimeout(() => {
          expect(countRows()).toEqual(3);
          expect(afterRenderSpy.calls.count()).toEqual(1);
          done();
        }, 200);
      });

      it('should run render ONCE after detecting that row has been removed', done => {
        var data = Handsontable.helper.createSpreadsheetObjectData(2, 2);
        var hot = createHOT(data, true);

        var afterRenderSpy = jasmine.createSpy('afterRenderSpy');
        hot.addHook('afterRender', afterRenderSpy);

        var afterChangesObservedCallback = jasmine.createSpy('afterChangesObservedCallback');
        hot.addHook('afterChangesObserved', afterChangesObservedCallback);

        alter('remove_row');

        setTimeout(() => {
          expect(countRows()).toEqual(1);
          expect(afterChangesObservedCallback.calls.count()).toEqual(1);
          expect(afterRenderSpy.calls.count()).toEqual(1);
          done();
        }, 200);
      });

      it('should run render ONCE after detecting that table data has changed', done => {
        var data = Handsontable.helper.createSpreadsheetObjectData(2, 2);
        var hot = createHOT(data, true);

        var afterRenderSpy = jasmine.createSpy('afterRenderSpy');
        hot.addHook('afterRender', afterRenderSpy);

        var afterChangesObservedCallback = jasmine.createSpy('afterChangesObservedCallback');
        hot.addHook('afterChangesObserved', afterChangesObservedCallback);

        setDataAtRowProp(0, 'prop0', 'new value');

        setTimeout(() => {
          expect(spec().$container.find('tbody tr:eq(0) td:eq(0)').text()).toEqual('new value');
          expect(afterChangesObservedCallback.calls.count()).toEqual(1);
          expect(afterRenderSpy.calls.count()).toEqual(1);
          done();
        }, 200);
      });
    });
  });

  describe('refreshing table after changes have been detected', () => {
    it('should observe changes to new data bound using loadData', done => {
      var data = Handsontable.helper.createSpreadsheetData(2, 2);
      var newData = Handsontable.helper.createSpreadsheetData(2, 2);
      var hot = createHOT(data, true);
      var htCore = getHtCore();
      hot.loadData(newData);

      var afterRenderSpy = jasmine.createSpy('afterRenderSpy');
      hot.addHook('afterRender', afterRenderSpy);

      newData.push(['A3', 'B3']);

      setTimeout(() => {
        expect(afterRenderSpy.calls.count()).toBe(1);
        expect(htCore.find('tr').length).toEqual(3);
        expect(htCore.find('col').length).toEqual(2);
        done();
      }, 200);
    });

    it('should not observe changes to old data after it was replaced using loadData', done => {
      var data = Handsontable.helper.createSpreadsheetData(2, 2);
      var newData = Handsontable.helper.createSpreadsheetData(2, 2);
      var hot = createHOT(data, true);
      var htCore = getHtCore();
      hot.loadData(newData);

      var afterRenderSpy = jasmine.createSpy('afterRenderSpy');
      hot.addHook('afterRender', afterRenderSpy);

      data.push(['A3', 'B3']);

      setTimeout(() => {
        expect(afterRenderSpy.calls.count()).toBe(0);
        expect(htCore.find('tr').length).toEqual(2);
        expect(htCore.find('col').length).toEqual(2);
        done();
      }, 1000);
    });
  });
});

/***/ }),
/* 359 */
/***/ (function(module, exports) {

describe('persistentState', () => {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }

    window.localStorage.clear();
  });

  it('should save data, when persistentStateSave is run', () => {
    var hot = handsontable({
      persistentState: true
    });

    hot.runHooks('persistentStateSave', 'testData', 100);

    var rawStoredData = window.localStorage[`${id}_testData`];

    expect(rawStoredData).toBeDefined();

    var storedData = JSON.parse(rawStoredData);

    expect(storedData).toEqual(100);
  });

  it('should NOT save data, when persistentStateSave is run, if plugin is not enabled', () => {
    var hot = handsontable({
      persistentState: false
    });

    hot.runHooks('persistentStateSave', 'testData', 100);

    var rawStoredData = window.localStorage[`${id}_testData`];

    expect(rawStoredData).toBeUndefined();
  });

  it('should load data, when persistentStateLoad is run', () => {
    var hot = handsontable({
      persistentState: true
    });

    hot.runHooks('persistentStateSave', 'testData', 100);

    var storedData = {};
    hot.runHooks('persistentStateLoad', 'testData', storedData);

    expect(storedData.value).toEqual(100);
  });

  it('should NOT load data, when persistentStateLoad is run, if plugin is not enabled', () => {
    var hot = handsontable({
      persistentState: false
    });

    // We have to manually save data, as persistentStateSave won't work when the plugin is disabled
    window.localStorage[`${id}_testData`] = JSON.stringify(100);

    var storedData = {};
    hot.runHooks('persistentStateLoad', 'testData', storedData);

    expect(storedData.value).toBeUndefined();
  });

  it('should clear the data under the given key, when persistentStateReset is run', () => {
    var hot = handsontable({
      persistentState: true
    });

    hot.runHooks('persistentStateSave', 'testData', 100);

    var storedData = {};
    hot.runHooks('persistentStateLoad', 'testData', storedData);

    expect(storedData.value).toEqual(100);

    hot.runHooks('persistentStateReset', 'testData');

    storedData = {};
    hot.runHooks('persistentStateLoad', 'testData', storedData);

    expect(storedData.value).toBeUndefined();
  });

  it('should NOT clear the data under the given key, when persistentStateReset is run', () => {
    var hot = handsontable({
      persistentState: false
    });

    // We have to manually save data, as persistentStateSave won't work when the plugin is disabled
    window.localStorage[`${id}_testData`] = JSON.stringify(100);

    var storedData = {};
    hot.runHooks('persistentStateReset', 'testData');

    expect(JSON.parse(window.localStorage[`${id}_testData`])).toEqual(100);
  });

  it('should clear all data, when persistentStateReset is run without specifying a key to reset', () => {
    var hot = handsontable({
      persistentState: true
    });

    hot.runHooks('persistentStateSave', 'testData0', 100);
    hot.runHooks('persistentStateSave', 'testData1', 'foo');
    hot.runHooks('persistentStateSave', 'testData2', 200);

    var storedData = [{}, {}, {}];
    hot.runHooks('persistentStateLoad', 'testData0', storedData[0]);
    hot.runHooks('persistentStateLoad', 'testData1', storedData[1]);
    hot.runHooks('persistentStateLoad', 'testData2', storedData[2]);

    expect(storedData[0].value).toEqual(100);
    expect(storedData[1].value).toEqual('foo');
    expect(storedData[2].value).toEqual(200);

    hot.runHooks('persistentStateReset');

    storedData = [{}, {}, {}];
    hot.runHooks('persistentStateLoad', 'testData0', storedData[0]);
    hot.runHooks('persistentStateLoad', 'testData1', storedData[1]);
    hot.runHooks('persistentStateLoad', 'testData2', storedData[2]);

    expect(storedData[0].value).toBeUndefined();
    expect(storedData[1].value).toBeUndefined();
    expect(storedData[2].value).toBeUndefined();
  });

  it('should allow to DISABLE plugin with updateSettings', () => {
    var hot = handsontable({
      persistentState: true
    });

    hot.runHooks('persistentStateSave', 'testData', 100);

    var storedData = {};
    hot.runHooks('persistentStateLoad', 'testData', storedData);

    expect(storedData.value).toEqual(100);

    updateSettings({
      persistentState: false
    });

    storedData = {};
    hot.runHooks('persistentStateLoad', 'testData', storedData);

    expect(storedData.value).toBeUndefined();
  });

  it('should allow to ENABLE plugin with updateSettings', () => {
    var hot = handsontable({
      persistentState: false
    });

    hot.runHooks('persistentStateSave', 'testData', 100);

    var storedData = {};
    hot.runHooks('persistentStateLoad', 'testData', storedData);

    expect(storedData.value).toBeUndefined();

    updateSettings({
      persistentState: true
    });

    hot.runHooks('persistentStateSave', 'testData', 100);

    storedData = {};
    hot.runHooks('persistentStateLoad', 'testData', storedData);

    expect(storedData.value).toEqual(100);
  });
});

/***/ }),
/* 360 */
/***/ (function(module, exports) {

describe('Search plugin', () => {

  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  describe('enabling/disabling plugin', () => {
    it('should expose `search` object when plugin is enabled', () => {

      var hot = handsontable({
        search: true
      });

      expect(hot.search).toBeDefined();
    });

    it('should NOT expose `search` object when plugin is disabled', () => {
      var hot = handsontable({
        search: false
      });

      expect(hot.search).not.toBeDefined();
    });

    it('plugin should be disabled by default', () => {
      var hot = handsontable();

      expect(hot.search).not.toBeDefined();
    });

    it('should disable plugin using updateSettings', () => {
      var hot = handsontable({
        search: true
      });

      expect(hot.search).toBeDefined();

      updateSettings({
        search: false
      });

      expect(hot.search).not.toBeDefined();
    });

    it('should enable plugin using updateSettings', () => {
      var hot = handsontable({
        search: false
      });

      expect(hot.search).not.toBeDefined();

      updateSettings({
        search: true
      });

      expect(hot.search).toBeDefined();
    });
  });

  describe('query method', () => {
    afterEach(() => {
      Handsontable.plugins.Search.global.setDefaultQueryMethod(Handsontable.plugins.Search.DEFAULT_QUERY_METHOD);
    });

    it('should use the default query method if no queryMethod is passed to query function', () => {
      spyOn(Handsontable.plugins.Search, 'DEFAULT_QUERY_METHOD');

      var defaultQueryMethod = Handsontable.plugins.Search.DEFAULT_QUERY_METHOD;

      Handsontable.plugins.Search.global.setDefaultQueryMethod(defaultQueryMethod);

      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: true
      });

      var searchResult = hot.search.query('A');

      expect(defaultQueryMethod.calls.count()).toEqual(25);
    });

    it('should use the custom default query method if no queryMethod is passed to query function', () => {
      var customDefaultQueryMethod = jasmine.createSpy('customDefaultQueryMethod');

      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: true
      });

      Handsontable.plugins.Search.global.setDefaultQueryMethod(customDefaultQueryMethod);

      var searchResult = hot.search.query('A');

      expect(customDefaultQueryMethod.calls.count()).toEqual(25);
    });

    it('should use the query method from the constructor if no queryMethod is passed to query function', () => {
      var customQueryMethod = jasmine.createSpy('customDefaultQueryMethod');

      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: {
          queryMethod: customQueryMethod
        }
      });

      var searchResult = hot.search.query('A');

      expect(customQueryMethod.calls.count()).toEqual(25);
    });

    it('should use method passed to query function', () => {
      var customQueryMethod = jasmine.createSpy('customQueryMethod');

      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: true
      });

      var searchResult = hot.search.query('A', null, customQueryMethod);

      expect(customQueryMethod.calls.count()).toEqual(25);
    });
  });

  describe('default query method', () => {

    it('should use query method to find phrase', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: true
      });

      var searchResult = hot.search.query('A');

      expect(searchResult.length).toEqual(5);

      for (var i = 0; i < searchResult.length; i++) {
        expect(searchResult[i].row).toEqual(i);
        expect(searchResult[i].col).toEqual(0);
        expect(searchResult[i].data).toEqual(hot.getDataAtCell(i, 0));
      }
    });

    it('default query method should be case insensitive', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: true
      });

      var searchResult = hot.search.query('a');

      expect(searchResult.length).toEqual(5);

      searchResult = hot.search.query('A');

      expect(searchResult.length).toEqual(5);
    });

    it('default query method should work with numeric values', () => {
      var hot = handsontable({
        data: [[1, 2], [22, 4]],
        search: true
      });

      var searchResult = hot.search.query('2');

      expect(searchResult.length).toEqual(2);
    });

    it('default query method should interpret query as string, not regex', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: true
      });

      var searchResult = hot.search.query('A*');

      expect(searchResult.length).toEqual(0);
    });

    it('default query method should always return false if query string is empty', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: true
      });

      var searchResult = hot.search.query('A');

      expect(searchResult.length).toEqual(5);

      searchResult = hot.search.query('');

      expect(searchResult.length).toEqual(0);
    });

    it('default query method should always return false if no query string has been specified', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: true
      });

      var searchResult = hot.search.query('A');

      expect(searchResult.length).toEqual(5);

      searchResult = hot.search.query();

      expect(searchResult.length).toEqual(0);
    });

    it('default query method should always return false if no query string is not a string', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: true
      });

      var searchResult = hot.search.query('A');

      expect(searchResult.length).toEqual(5);

      searchResult = hot.search.query([1, 2, 3]);

      expect(searchResult.length).toEqual(0);
    });
  });

  describe('search callback', () => {
    afterEach(() => {
      Handsontable.plugins.Search.global.setDefaultCallback(Handsontable.plugins.Search.DEFAULT_CALLBACK);
    });

    it('should invoke default callback for each cell', () => {
      spyOn(Handsontable.plugins.Search, 'DEFAULT_CALLBACK');

      var defaultCallback = Handsontable.plugins.Search.DEFAULT_CALLBACK;

      Handsontable.plugins.Search.global.setDefaultCallback(defaultCallback);

      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: true
      });

      var searchResult = hot.search.query('A');

      expect(defaultCallback.calls.count()).toEqual(25);
    });

    it('should change the default callback', () => {
      spyOn(Handsontable.plugins.Search, 'DEFAULT_CALLBACK');

      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: true
      });

      var defaultCallback = jasmine.createSpy('defaultCallback');
      Handsontable.plugins.Search.global.setDefaultCallback(defaultCallback);

      var searchResult = hot.search.query('A');

      expect(Handsontable.plugins.Search.DEFAULT_CALLBACK).not.toHaveBeenCalled();
      expect(defaultCallback.calls.count()).toEqual(25);
    });

    it('should invoke callback passed in constructor', () => {
      var searchCallback = jasmine.createSpy('searchCallback');

      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: {
          callback: searchCallback
        }
      });

      var searchResult = hot.search.query('A');

      expect(searchCallback.calls.count()).toEqual(25);
    });

    it('should invoke custom callback for each cell which has been tested', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: true
      });

      var searchCallback = jasmine.createSpy('searchCallback');

      var searchResult = hot.search.query('A', searchCallback);

      expect(searchCallback.calls.count()).toEqual(25);

      for (var rowIndex = 0, rowCount = countRows(); rowIndex < rowCount; rowIndex++) {
        for (var colIndex = 0, colCount = countCols(); colIndex < colCount; colIndex++) {
          var callArgs = searchCallback.calls.argsFor(rowIndex * 5 + colIndex);
          expect(callArgs[0]).toEqual(hot);
          expect(callArgs[1]).toEqual(rowIndex);
          expect(callArgs[2]).toEqual(colIndex);
          expect(callArgs[3]).toEqual(hot.getDataAtCell(rowIndex, colIndex));

          if (colIndex == 0) {
            expect(callArgs[4]).toBe(true);
          } else {
            expect(callArgs[4]).toBe(false);
          }
        }
      }
    });
  });

  describe('default search callback', () => {
    it('should add isSearchResult = true, to cell properties of all matched cells', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: true
      });

      var searchResult = hot.search.query('2');

      for (var rowIndex = 0, rowCount = countRows(); rowIndex < rowCount; rowIndex++) {
        for (var colIndex = 0, colCount = countCols(); colIndex < colCount; colIndex++) {
          var cellProperties = getCellMeta(rowIndex, colIndex);

          if (rowIndex == 1) {
            expect(cellProperties.isSearchResult).toBeTruthy();
          } else {
            expect(cellProperties.isSearchResult).toBeFalsy();
          }
        }
      }
    });
  });

  describe('search result decorator', () => {
    it('should add default search result class to cells which mach the query', () => {

      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: true
      });

      var searchResult = hot.search.query('2');

      render();

      for (var rowIndex = 0, rowCount = countRows(); rowIndex < rowCount; rowIndex++) {
        for (var colIndex = 0, colCount = countCols(); colIndex < colCount; colIndex++) {
          var cell = getCell(rowIndex, colIndex);

          if (rowIndex == 1) {
            expect($(cell).hasClass(Handsontable.plugins.Search.DEFAULT_SEARCH_RESULT_CLASS)).toBe(true);
          } else {
            expect($(cell).hasClass(Handsontable.plugins.Search.DEFAULT_SEARCH_RESULT_CLASS)).toBe(false);
          }
        }
      }
    });

    it('should add custom search result class to cells which mach the query', () => {
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        search: {
          searchResultClass: 'customSearchResultClass'
        }
      });

      var searchResult = hot.search.query('2');

      render();

      for (var rowIndex = 0, rowCount = countRows(); rowIndex < rowCount; rowIndex++) {
        for (var colIndex = 0, colCount = countCols(); colIndex < colCount; colIndex++) {
          var cell = getCell(rowIndex, colIndex);

          if (rowIndex == 1) {
            expect($(cell).hasClass('customSearchResultClass')).toBe(true);
          } else {
            expect($(cell).hasClass('customSearchResultClass')).toBe(false);
          }
        }
      }
    });
  });

  describe('HOT properties compatibility', () => {
    it('should work properly when the last row is empty', () => {
      // connected with https://github.com/handsontable/handsontable/issues/1606
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(5, 5),
        colHeaders: true,
        search: true,
        minSpareRows: 1
      }),
          errorThrown = false;

      try {
        hot.search.query('A');
      } catch (err) {
        errorThrown = true;
      }

      expect(errorThrown).toBe(false);
    });
  });
});

/***/ }),
/* 361 */
/***/ (function(module, exports) {

describe('UndoRedo', () => {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $(`<div id="${id}"></div>`).appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      destroy();
      this.$container.remove();
    }
  });

  describe('core features', () => {
    describe('Array data', () => {
      describe('undo', () => {
        it('should undo single change', () => {
          handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });
          var HOT = getInstance();

          setDataAtCell(0, 0, 'X1');
          expect(getDataAtCell(0, 0)).toBe('X1');

          HOT.undo();
          expect(getDataAtCell(0, 0)).toBe('A1');
        });

        it('should undo single change on cell with validator', done => {
          handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });
          var HOT = getInstance();

          setDataAtCell(0, 0, 'X1');

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('X1');

            HOT.undo();
          }, 200);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('A1');
            done();
          }, 400);
        });

        it('should undo creation of a single row', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });

          expect(countRows()).toEqual(2);

          alter('insert_row');

          expect(countRows()).toEqual(3);

          HOT.undo();

          expect(countRows()).toEqual(2);
        });

        it('should undo creation of multiple rows', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });

          expect(countRows()).toEqual(2);

          alter('insert_row', 0, 5);

          expect(countRows()).toEqual(7);

          HOT.undo();

          expect(countRows()).toEqual(2);
        });

        it('should undo creation of multiple rows with minSpareRows', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 1),
            minSpareRows: 2
          });

          expect(getData()).toEqual([['A1'], ['A2'], [null], [null]]);

          setDataAtCell(2, 0, 'A3');
          setDataAtCell(4, 0, 'A4');

          expect(getData()).toEqual([['A1'], ['A2'], ['A3'], [null], ['A4'], [null], [null]]);

          HOT.undo();
          HOT.undo();

          expect(getData()).toEqual([['A1'], ['A2'], [null], [null]]);
        });

        it('should undo removal of single row', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(3, 2)
          });

          expect(countRows()).toEqual(3);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(2, 0)).toEqual('A3');
          expect(getDataAtCell(2, 1)).toEqual('B3');

          alter('remove_row', 1);

          expect(countRows()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A3');
          expect(getDataAtCell(1, 1)).toEqual('B3');

          HOT.undo();

          expect(countRows()).toEqual(3);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(2, 0)).toEqual('A3');
          expect(getDataAtCell(2, 1)).toEqual('B3');
        });

        it('should undo removal of multiple rows', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(4, 2)
          });

          expect(countRows()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(2, 0)).toEqual('A3');
          expect(getDataAtCell(2, 1)).toEqual('B3');
          expect(getDataAtCell(3, 0)).toEqual('A4');
          expect(getDataAtCell(3, 1)).toEqual('B4');

          alter('remove_row', 1, 2);

          expect(countRows()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A4');
          expect(getDataAtCell(1, 1)).toEqual('B4');

          HOT.undo();

          expect(countRows()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(2, 0)).toEqual('A3');
          expect(getDataAtCell(2, 1)).toEqual('B3');
          expect(getDataAtCell(3, 0)).toEqual('A4');
          expect(getDataAtCell(3, 1)).toEqual('B4');
        });

        it('should undo creation of a single column (colHeaders: undefined)', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 3)
          });

          expect(countCols()).toEqual(3);

          alter('insert_col');

          expect(countCols()).toEqual(4);

          HOT.undo();

          expect(countCols()).toEqual(3);
        });

        it('should undo creation of a single column (colHeaders: true)', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 3),
            colHeaders: true
          });

          expect(countCols()).toEqual(3);
          expect(getColHeader()).toEqual(['A', 'B', 'C']);

          alter('insert_col');

          expect(countCols()).toEqual(4);
          expect(getColHeader()).toEqual(['A', 'B', 'C', 'D']);

          HOT.undo();

          expect(countCols()).toEqual(3);
          expect(getColHeader()).toEqual(['A', 'B', 'C']);
        });

        it('should undo creation of a single column (colHeaders: Array)', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 3),
            colHeaders: ['Header1', 'Header2', 'Header3']
          });

          expect(countCols()).toEqual(3);
          expect(getColHeader()).toEqual(['Header1', 'Header2', 'Header3']);

          alter('insert_col', 1);

          expect(countCols()).toEqual(4);
          expect(getColHeader()).toEqual(['Header1', 'B', 'Header2', 'Header3']);

          HOT.undo();

          expect(countCols()).toEqual(3);
          expect(getColHeader()).toEqual(['Header1', 'Header2', 'Header3']);
        });

        it('should undo creation of multiple columns (colHeaders: undefined)', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });

          expect(countCols()).toEqual(2);

          alter('insert_col', 1, 5);

          expect(countCols()).toEqual(7);

          HOT.undo();

          expect(countCols()).toEqual(2);
        });

        it('should undo creation of multiple columns (colHeaders: true)', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2),
            colHeaders: true
          });

          expect(countCols()).toEqual(2);
          expect(getColHeader()).toEqual(['A', 'B']);

          alter('insert_col', 1, 5);

          expect(countCols()).toEqual(7);
          expect(getColHeader()).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);

          HOT.undo();

          expect(countCols()).toEqual(2);
          expect(getColHeader()).toEqual(['A', 'B']);
        });

        it('should undo creation of multiple columns (colHeaders: Array)', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2),
            colHeaders: ['Header1', 'Header2']
          });

          expect(countCols()).toEqual(2);
          expect(getColHeader()).toEqual(['Header1', 'Header2']);

          alter('insert_col', 1, 5);

          expect(countCols()).toEqual(7);
          expect(getColHeader()).toEqual(['Header1', 'B', 'C', 'D', 'E', 'F', 'Header2']);

          HOT.undo();

          expect(countCols()).toEqual(2);
          expect(getColHeader()).toEqual(['Header1', 'Header2']);
        });

        it('should undo creation of multiple columns with minSpareCols', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(1, 1),
            minSpareCols: 2
          });

          expect(getData()).toEqual([['A1', null, null]]);

          setDataAtCell(0, 1, 'B1');
          setDataAtCell(0, 3, 'C1');

          expect(getData()).toEqual([['A1', 'B1', null, 'C1', null, null]]);

          HOT.undo();
          HOT.undo();

          expect(getData()).toEqual([['A1', null, null]]);
        });

        it('should undo removal of single column (colHeaders: undefined)', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 3)
          });

          expect(countCols()).toEqual(3);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(0, 2)).toEqual('C1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(1, 2)).toEqual('C2');

          alter('remove_col', 1);

          expect(countCols()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('C1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('C2');

          HOT.undo();

          expect(countCols()).toEqual(3);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(0, 2)).toEqual('C1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(1, 2)).toEqual('C2');
        });

        it('should undo removal of single column (colHeaders: true)', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2),
            colHeaders: true
          });

          expect(countCols()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getColHeader()).toEqual(['A', 'B']);

          alter('remove_col');

          expect(countCols()).toEqual(1);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toBeNull();
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toBeNull();
          expect(getColHeader()).toEqual(['A']);

          HOT.undo();

          expect(countCols()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');

          expect(getColHeader()).toEqual(['A', 'B']);
        });

        it('should undo removal of single column (colHeaders: Array)', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2),
            colHeaders: ['Header1', 'Header2']
          });

          expect(countCols()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getColHeader()).toEqual(['Header1', 'Header2']);

          alter('remove_col');

          expect(countCols()).toEqual(1);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toBeNull();
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toBeNull();
          expect(getColHeader()).toEqual(['Header1']);

          HOT.undo();

          expect(countCols()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');

          expect(getColHeader()).toEqual(['Header1', 'Header2']);
        });

        it('should undo removal of multiple columns (colHeaders: undefined)', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 4)
          });

          expect(countCols()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(0, 2)).toEqual('C1');
          expect(getDataAtCell(0, 3)).toEqual('D1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(1, 2)).toEqual('C2');
          expect(getDataAtCell(1, 3)).toEqual('D2');

          alter('remove_col', 1, 2);

          expect(countCols()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('D1');
          expect(getDataAtCell(0, 2)).toBeNull();
          expect(getDataAtCell(0, 3)).toBeNull();
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('D2');
          expect(getDataAtCell(1, 2)).toBeNull();
          expect(getDataAtCell(1, 3)).toBeNull();

          HOT.undo();

          expect(countCols()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(0, 2)).toEqual('C1');
          expect(getDataAtCell(0, 3)).toEqual('D1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(1, 2)).toEqual('C2');
          expect(getDataAtCell(1, 3)).toEqual('D2');
        });

        it('should undo removal of multiple columns (colHeaders: true)', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 4),
            colHeaders: true
          });

          expect(countCols()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(0, 2)).toEqual('C1');
          expect(getDataAtCell(0, 3)).toEqual('D1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(1, 2)).toEqual('C2');
          expect(getDataAtCell(1, 3)).toEqual('D2');
          expect(getColHeader()).toEqual(['A', 'B', 'C', 'D']);

          alter('remove_col', 1, 3);

          expect(countCols()).toEqual(1);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toBeNull();
          expect(getDataAtCell(0, 2)).toBeNull();
          expect(getDataAtCell(0, 3)).toBeNull();
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toBeNull();
          expect(getDataAtCell(1, 2)).toBeNull();
          expect(getDataAtCell(1, 3)).toBeNull();
          expect(getColHeader()).toEqual(['A']);

          HOT.undo();

          expect(countCols()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(0, 2)).toEqual('C1');
          expect(getDataAtCell(0, 3)).toEqual('D1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(1, 2)).toEqual('C2');
          expect(getDataAtCell(1, 3)).toEqual('D2');
          expect(getColHeader()).toEqual(['A', 'B', 'C', 'D']);
        });

        it('should undo removal of multiple columns (colHeaders: Array)', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 4),
            colHeaders: ['Header1', 'Header2', 'Header3', 'Header4']
          });

          expect(countCols()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(0, 2)).toEqual('C1');
          expect(getDataAtCell(0, 3)).toEqual('D1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(1, 2)).toEqual('C2');
          expect(getDataAtCell(1, 3)).toEqual('D2');
          expect(getColHeader()).toEqual(['Header1', 'Header2', 'Header3', 'Header4']);

          alter('remove_col', 1, 2);

          expect(countCols()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('D1');
          expect(getDataAtCell(0, 2)).toBeNull();
          expect(getDataAtCell(0, 3)).toBeNull();
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('D2');
          expect(getDataAtCell(1, 2)).toBeNull();
          expect(getDataAtCell(1, 3)).toBeNull();
          expect(getColHeader()).toEqual(['Header1', 'Header4']);

          HOT.undo();

          expect(countCols()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(0, 2)).toEqual('C1');
          expect(getDataAtCell(0, 3)).toEqual('D1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(1, 2)).toEqual('C2');
          expect(getDataAtCell(1, 3)).toEqual('D2');
          expect(getColHeader()).toEqual(['Header1', 'Header2', 'Header3', 'Header4']);
        });

        it('should undo removal of multiple columns (with a used manualColumnMove)', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 7),
            manualColumnMove: [3, 2, 0, 6, 1, 5, 4]
          });

          expect(countCols()).toEqual(7);
          expect(getDataAtRow(0)).toEqual(['D1', 'C1', 'A1', 'G1', 'B1', 'F1', 'E1']);

          alter('remove_col', 1, 3);

          expect(countCols()).toEqual(4);
          expect(getDataAtRow(0)).toEqual(['D1', 'B1', 'F1', 'E1']);

          // HOT.undo();
          //
          // expect(countCols()).toEqual(7);
          // expect(getDataAtRow(0)).toEqual(['D1', 'C1', 'A1', 'G1', 'B1', 'F1', 'E1']);
        });

        it('should undo multiple changes', () => {
          handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });
          var HOT = getInstance();

          setDataAtCell(0, 0, 'X1');
          setDataAtCell(1, 0, 'X2');
          setDataAtCell(0, 1, 'Y1');
          setDataAtCell(1, 1, 'Y2');

          expect(getDataAtCell(0, 0)).toBe('X1');
          expect(getDataAtCell(1, 0)).toBe('X2');
          expect(getDataAtCell(0, 1)).toBe('Y1');
          expect(getDataAtCell(1, 1)).toBe('Y2');

          HOT.undo();
          expect(getDataAtCell(0, 0)).toBe('X1');
          expect(getDataAtCell(1, 0)).toBe('X2');
          expect(getDataAtCell(0, 1)).toBe('Y1');
          expect(getDataAtCell(1, 1)).toBe('B2');

          HOT.undo();
          expect(getDataAtCell(0, 0)).toBe('X1');
          expect(getDataAtCell(1, 0)).toBe('X2');
          expect(getDataAtCell(0, 1)).toBe('B1');
          expect(getDataAtCell(1, 1)).toBe('B2');

          HOT.undo();
          expect(getDataAtCell(0, 0)).toBe('X1');
          expect(getDataAtCell(1, 0)).toBe('A2');
          expect(getDataAtCell(0, 1)).toBe('B1');
          expect(getDataAtCell(1, 1)).toBe('B2');

          HOT.undo();
          expect(getDataAtCell(0, 0)).toBe('A1');
          expect(getDataAtCell(1, 0)).toBe('A2');
          expect(getDataAtCell(0, 1)).toBe('B1');
          expect(getDataAtCell(1, 1)).toBe('B2');

          HOT.undo();
          expect(getDataAtCell(0, 0)).toBe('A1');
          expect(getDataAtCell(1, 0)).toBe('A2');
          expect(getDataAtCell(0, 1)).toBe('B1');
          expect(getDataAtCell(1, 1)).toBe('B2');
        });

        it('should undo multiple changes in cells with validators', done => {
          handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });
          var HOT = getInstance();

          setDataAtCell(0, 0, 'X1');
          setDataAtCell(1, 0, 'X2');
          setDataAtCell(0, 1, 'Y1');
          setDataAtCell(1, 1, 'Y2');

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('X1');
            expect(getDataAtCell(1, 0)).toBe('X2');
            expect(getDataAtCell(0, 1)).toBe('Y1');
            expect(getDataAtCell(1, 1)).toBe('Y2');

            HOT.undo();
          }, 200);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('X1');
            expect(getDataAtCell(1, 0)).toBe('X2');
            expect(getDataAtCell(0, 1)).toBe('Y1');
            expect(getDataAtCell(1, 1)).toBe('B2');

            HOT.undo();
          }, 400);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('X1');
            expect(getDataAtCell(1, 0)).toBe('X2');
            expect(getDataAtCell(0, 1)).toBe('B1');
            expect(getDataAtCell(1, 1)).toBe('B2');

            HOT.undo();
          }, 600);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('X1');
            expect(getDataAtCell(1, 0)).toBe('A2');
            expect(getDataAtCell(0, 1)).toBe('B1');
            expect(getDataAtCell(1, 1)).toBe('B2');

            HOT.undo();
          }, 800);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('A1');
            expect(getDataAtCell(1, 0)).toBe('A2');
            expect(getDataAtCell(0, 1)).toBe('B1');
            expect(getDataAtCell(1, 1)).toBe('B2');

            HOT.undo();
          }, 1000);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('A1');
            expect(getDataAtCell(1, 0)).toBe('A2');
            expect(getDataAtCell(0, 1)).toBe('B1');
            expect(getDataAtCell(1, 1)).toBe('B2');
            done();
          }, 1200);
        });

        it('should undo multiple row creations', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });

          expect(countRows()).toEqual(2);

          alter('insert_row');
          alter('insert_row');
          alter('insert_row');
          alter('insert_row');

          expect(countRows()).toEqual(6);

          HOT.undo();
          expect(countRows()).toEqual(5);

          HOT.undo();
          expect(countRows()).toEqual(4);

          HOT.undo();
          expect(countRows()).toEqual(3);

          HOT.undo();
          expect(countRows()).toEqual(2);

          HOT.undo();
          expect(countRows()).toEqual(2);
        });

        it('should undo multiple row removals', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(4, 2)
          });

          expect(countRows()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(2, 0)).toEqual('A3');
          expect(getDataAtCell(2, 1)).toEqual('B3');
          expect(getDataAtCell(3, 0)).toEqual('A4');
          expect(getDataAtCell(3, 1)).toEqual('B4');

          alter('remove_row');
          alter('remove_row');
          alter('remove_row');

          expect(countRows()).toEqual(1);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');

          HOT.undo();
          expect(countRows()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');

          HOT.undo();
          expect(countRows()).toEqual(3);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(2, 0)).toEqual('A3');
          expect(getDataAtCell(2, 1)).toEqual('B3');

          HOT.undo();
          expect(countRows()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(2, 0)).toEqual('A3');
          expect(getDataAtCell(2, 1)).toEqual('B3');
          expect(getDataAtCell(3, 0)).toEqual('A4');
          expect(getDataAtCell(3, 1)).toEqual('B4');

          HOT.undo();
          expect(countRows()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(2, 0)).toEqual('A3');
          expect(getDataAtCell(2, 1)).toEqual('B3');
          expect(getDataAtCell(3, 0)).toEqual('A4');
          expect(getDataAtCell(3, 1)).toEqual('B4');
        });

        it('should undo changes only for table where the change actually took place', function () {
          this.$container2 = $(`<div id="${id}-2"></div>`).appendTo('body');

          var hot1 = handsontable({
            data: [[1], [2], [3]]
          });

          this.$container2.handsontable({
            data: [['A'], ['B'], ['C']]
          });

          var hot2 = this.$container2.handsontable('getInstance');

          hot1.setDataAtCell(0, 0, 4);
          expect(hot1.getDataAtCell(0, 0)).toEqual(4);
          expect(hot2.getDataAtCell(0, 0)).toEqual('A');

          hot2.undo();
          expect(hot2.getDataAtCell(0, 0)).toEqual('A');
          expect(hot1.getDataAtCell(0, 0)).toEqual(4);

          hot1.undo();
          expect(hot2.getDataAtCell(0, 0)).toEqual('A');
          expect(hot1.getDataAtCell(0, 0)).toEqual(1);

          hot2.destroy();
          this.$container2.remove();
        });

        it('should return the right amount after undo removal of single column', () => {
          const HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 3)
          });

          const afterCreateColCallback = jasmine.createSpy('afterCreateColCallback');
          HOT.addHook('afterCreateCol', afterCreateColCallback);

          expect(countCols()).toEqual(3);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(0, 2)).toEqual('C1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(1, 2)).toEqual('C2');

          alter('remove_col', 1);

          expect(countCols()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('C1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('C2');

          HOT.undo();

          expect(afterCreateColCallback).toHaveBeenCalledWith(1, 1, 'UndoRedo.undo', void 0, void 0, void 0);

          expect(countCols()).toEqual(3);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(0, 2)).toEqual('C1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(1, 2)).toEqual('C2');
        });
      });
      describe('redo', () => {
        it('should redo single change', () => {
          handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });
          var HOT = getInstance();

          setDataAtCell(0, 0, 'new value');

          expect(getDataAtCell(0, 0)).toBe('new value');

          HOT.undo();
          expect(getDataAtCell(0, 0)).toBe('A1');

          HOT.redo();
          expect(getDataAtCell(0, 0)).toBe('new value');
        });

        it('should redo single change in cell with validator', done => {
          handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });
          var HOT = getInstance();

          setDataAtCell(0, 0, 'new value');

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('new value');

            HOT.undo();
          }, 200);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('A1');

            HOT.redo();
          }, 400);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('new value');
            done();
          }, 600);
        });

        it('should redo creation of a single row', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });

          expect(countRows()).toEqual(2);

          alter('insert_row');

          expect(countRows()).toEqual(3);

          HOT.undo();

          expect(countRows()).toEqual(2);

          HOT.redo();

          expect(countRows()).toEqual(3);
        });

        it('should redo creation of multiple rows', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });

          expect(countRows()).toEqual(2);

          alter('insert_row', 0, 5);

          expect(countRows()).toEqual(7);

          HOT.undo();

          expect(countRows()).toEqual(2);

          HOT.redo();

          expect(countRows()).toEqual(7);
        });

        it('should redo removal of single row', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(3, 2)
          });

          expect(countRows()).toEqual(3);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(2, 0)).toEqual('A3');
          expect(getDataAtCell(2, 1)).toEqual('B3');

          alter('remove_row', 1);

          expect(countRows()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A3');
          expect(getDataAtCell(1, 1)).toEqual('B3');

          HOT.undo();

          expect(countRows()).toEqual(3);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(2, 0)).toEqual('A3');
          expect(getDataAtCell(2, 1)).toEqual('B3');

          HOT.redo();

          expect(countRows()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A3');
          expect(getDataAtCell(1, 1)).toEqual('B3');
        });

        it('should redo removal of multiple rows', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(4, 2)
          });

          expect(countRows()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(2, 0)).toEqual('A3');
          expect(getDataAtCell(2, 1)).toEqual('B3');
          expect(getDataAtCell(3, 0)).toEqual('A4');
          expect(getDataAtCell(3, 1)).toEqual('B4');

          alter('remove_row', 1, 2);

          expect(countRows()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A4');
          expect(getDataAtCell(1, 1)).toEqual('B4');

          HOT.undo();

          expect(countRows()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(2, 0)).toEqual('A3');
          expect(getDataAtCell(2, 1)).toEqual('B3');
          expect(getDataAtCell(3, 0)).toEqual('A4');
          expect(getDataAtCell(3, 1)).toEqual('B4');

          HOT.redo();

          expect(countRows()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A4');
          expect(getDataAtCell(1, 1)).toEqual('B4');
        });

        it('should redo creation of a single column', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });

          expect(countCols()).toEqual(2);

          alter('insert_col');

          expect(countCols()).toEqual(3);

          HOT.undo();

          expect(countCols()).toEqual(2);

          HOT.redo();

          expect(countCols()).toEqual(3);
        });

        it('should redo creation of multiple columns', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });

          expect(countCols()).toEqual(2);

          alter('insert_col', 1, 5);

          expect(countCols()).toEqual(7);

          HOT.undo();

          expect(countCols()).toEqual(2);

          HOT.redo();

          expect(countCols()).toEqual(7);
        });

        it('should redo removal of single column', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });

          expect(countCols()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');

          alter('remove_col');

          expect(countCols()).toEqual(1);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toBeNull();
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toBeNull();

          HOT.undo();

          expect(countCols()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');

          HOT.redo();

          expect(countCols()).toEqual(1);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toBeNull();
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toBeNull();
        });

        it('should redo removal of multiple columns', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 4)
          });

          expect(countCols()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(0, 2)).toEqual('C1');
          expect(getDataAtCell(0, 3)).toEqual('D1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(1, 2)).toEqual('C2');
          expect(getDataAtCell(1, 3)).toEqual('D2');

          alter('remove_col', 1, 3);

          expect(countCols()).toEqual(1);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toBeNull();
          expect(getDataAtCell(0, 2)).toBeNull();
          expect(getDataAtCell(0, 3)).toBeNull();
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toBeNull();
          expect(getDataAtCell(1, 2)).toBeNull();
          expect(getDataAtCell(1, 3)).toBeNull();

          HOT.undo();

          expect(countCols()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(0, 2)).toEqual('C1');
          expect(getDataAtCell(0, 3)).toEqual('D1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(1, 2)).toEqual('C2');
          expect(getDataAtCell(1, 3)).toEqual('D2');

          HOT.redo();

          expect(countCols()).toEqual(1);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toBeNull();
          expect(getDataAtCell(0, 2)).toBeNull();
          expect(getDataAtCell(0, 3)).toBeNull();
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toBeNull();
          expect(getDataAtCell(1, 2)).toBeNull();
          expect(getDataAtCell(1, 3)).toBeNull();
        });

        it('should redo multiple changes', () => {
          handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });
          var HOT = getInstance();

          setDataAtCell(0, 0, 'X1');
          setDataAtCell(1, 0, 'X2');
          setDataAtCell(0, 1, 'Y1');
          setDataAtCell(1, 1, 'Y2');

          expect(getDataAtCell(0, 0)).toBe('X1');
          expect(getDataAtCell(1, 0)).toBe('X2');
          expect(getDataAtCell(0, 1)).toBe('Y1');
          expect(getDataAtCell(1, 1)).toBe('Y2');

          HOT.undo();
          HOT.undo();
          HOT.undo();
          HOT.undo();

          expect(getDataAtCell(0, 0)).toBe('A1');
          expect(getDataAtCell(1, 0)).toBe('A2');
          expect(getDataAtCell(0, 1)).toBe('B1');
          expect(getDataAtCell(1, 1)).toBe('B2');

          HOT.redo();
          expect(getDataAtCell(0, 0)).toBe('X1');
          expect(getDataAtCell(1, 0)).toBe('A2');
          expect(getDataAtCell(0, 1)).toBe('B1');
          expect(getDataAtCell(1, 1)).toBe('B2');

          HOT.redo();
          expect(getDataAtCell(0, 0)).toBe('X1');
          expect(getDataAtCell(1, 0)).toBe('X2');
          expect(getDataAtCell(0, 1)).toBe('B1');
          expect(getDataAtCell(1, 1)).toBe('B2');

          HOT.redo();
          expect(getDataAtCell(0, 0)).toBe('X1');
          expect(getDataAtCell(1, 0)).toBe('X2');
          expect(getDataAtCell(0, 1)).toBe('Y1');
          expect(getDataAtCell(1, 1)).toBe('B2');

          HOT.redo();
          expect(getDataAtCell(0, 0)).toBe('X1');
          expect(getDataAtCell(1, 0)).toBe('X2');
          expect(getDataAtCell(0, 1)).toBe('Y1');
          expect(getDataAtCell(1, 1)).toBe('Y2');

          HOT.redo();
          expect(getDataAtCell(0, 0)).toBe('X1');
          expect(getDataAtCell(1, 0)).toBe('X2');
          expect(getDataAtCell(0, 1)).toBe('Y1');
          expect(getDataAtCell(1, 1)).toBe('Y2');
        });

        it('should redo multiple changes in cell with validator', done => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });

          setDataAtCell(0, 0, 'X1');
          setDataAtCell(1, 0, 'X2');
          setDataAtCell(0, 1, 'Y1');
          setDataAtCell(1, 1, 'Y2');

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('X1');
            expect(getDataAtCell(1, 0)).toBe('X2');
            expect(getDataAtCell(0, 1)).toBe('Y1');
            expect(getDataAtCell(1, 1)).toBe('Y2');

            HOT.undo();
          }, 200);

          setTimeout(() => {
            HOT.undo();
          }, 400);

          setTimeout(() => {
            HOT.undo();
          }, 600);

          setTimeout(() => {
            HOT.undo();
          }, 800);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('A1');
            expect(getDataAtCell(1, 0)).toBe('A2');
            expect(getDataAtCell(0, 1)).toBe('B1');
            expect(getDataAtCell(1, 1)).toBe('B2');

            HOT.redo();
          }, 1000);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('X1');
            expect(getDataAtCell(1, 0)).toBe('A2');
            expect(getDataAtCell(0, 1)).toBe('B1');
            expect(getDataAtCell(1, 1)).toBe('B2');

            HOT.redo();
          }, 1200);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('X1');
            expect(getDataAtCell(1, 0)).toBe('X2');
            expect(getDataAtCell(0, 1)).toBe('B1');
            expect(getDataAtCell(1, 1)).toBe('B2');

            HOT.redo();
          }, 1400);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('X1');
            expect(getDataAtCell(1, 0)).toBe('X2');
            expect(getDataAtCell(0, 1)).toBe('Y1');
            expect(getDataAtCell(1, 1)).toBe('B2');

            HOT.redo();
          }, 1600);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('X1');
            expect(getDataAtCell(1, 0)).toBe('X2');
            expect(getDataAtCell(0, 1)).toBe('Y1');
            expect(getDataAtCell(1, 1)).toBe('Y2');

            HOT.redo();
          }, 1800);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('X1');
            expect(getDataAtCell(1, 0)).toBe('X2');
            expect(getDataAtCell(0, 1)).toBe('Y1');
            expect(getDataAtCell(1, 1)).toBe('Y2');
            done();
          }, 2000);
        });

        it('should redo multiple row creations', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(2, 2)
          });

          expect(countRows()).toEqual(2);

          alter('insert_row');
          alter('insert_row');
          alter('insert_row');
          alter('insert_row');

          expect(countRows()).toEqual(6);

          HOT.undo();
          HOT.undo();
          HOT.undo();
          HOT.undo();

          expect(countRows()).toEqual(2);

          HOT.redo();
          expect(countRows()).toEqual(3);

          HOT.redo();
          expect(countRows()).toEqual(4);

          HOT.redo();
          expect(countRows()).toEqual(5);

          HOT.redo();
          expect(countRows()).toEqual(6);

          HOT.redo();
          expect(countRows()).toEqual(6);
        });

        it('should undo multiple row removals', () => {
          var HOT = handsontable({
            data: Handsontable.helper.createSpreadsheetData(4, 2)
          });

          expect(countRows()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(2, 0)).toEqual('A3');
          expect(getDataAtCell(2, 1)).toEqual('B3');
          expect(getDataAtCell(3, 0)).toEqual('A4');
          expect(getDataAtCell(3, 1)).toEqual('B4');

          alter('remove_row');
          alter('remove_row');
          alter('remove_row');

          expect(countRows()).toEqual(1);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');

          HOT.undo();
          HOT.undo();
          HOT.undo();

          expect(countRows()).toEqual(4);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(2, 0)).toEqual('A3');
          expect(getDataAtCell(2, 1)).toEqual('B3');
          expect(getDataAtCell(3, 0)).toEqual('A4');
          expect(getDataAtCell(3, 1)).toEqual('B4');

          HOT.redo();
          expect(countRows()).toEqual(3);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');
          expect(getDataAtCell(2, 0)).toEqual('A3');
          expect(getDataAtCell(2, 1)).toEqual('B3');

          HOT.redo();
          expect(countRows()).toEqual(2);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
          expect(getDataAtCell(1, 0)).toEqual('A2');
          expect(getDataAtCell(1, 1)).toEqual('B2');

          HOT.redo();
          expect(countRows()).toEqual(1);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');

          HOT.redo();
          expect(countRows()).toEqual(1);
          expect(getDataAtCell(0, 0)).toEqual('A1');
          expect(getDataAtCell(0, 1)).toEqual('B1');
        });

        it('should redo changes only for table where the change actually took place', function () {
          this.$container2 = $(`<div id="${id}-2"></div>`).appendTo('body');

          var hot1 = handsontable({
            data: [[1], [2], [3]]
          });

          this.$container2.handsontable({
            data: [['A'], ['B'], ['C']]
          });

          var hot2 = this.$container2.handsontable('getInstance');

          hot1.setDataAtCell(0, 0, 4);
          expect(hot1.getDataAtCell(0, 0)).toEqual(4);
          expect(hot2.getDataAtCell(0, 0)).toEqual('A');

          hot1.undo();
          expect(hot1.getDataAtCell(0, 0)).toEqual(1);
          expect(hot2.getDataAtCell(0, 0)).toEqual('A');

          hot2.redo();
          expect(hot1.getDataAtCell(0, 0)).toEqual(1);
          expect(hot2.getDataAtCell(0, 0)).toEqual('A');

          hot1.redo();
          expect(hot1.getDataAtCell(0, 0)).toEqual(4);
          expect(hot2.getDataAtCell(0, 0)).toEqual('A');

          hot2.destroy();
          this.$container2.remove();
        });
      });
    });

    describe('Object data', () => {

      function createObjectData() {
        return [{ name: 'Timothy', surname: 'Dalton' }, { name: 'Sean', surname: 'Connery' }, { name: 'Roger', surname: 'Moore' }];
      }

      describe('undo', () => {
        it('should undo single change', () => {
          handsontable({
            data: createObjectData()
          });
          var HOT = getInstance();

          setDataAtRowProp(0, 0, 'Pearce');
          expect(getDataAtRowProp(0, 0)).toBe('Pearce');

          HOT.undo();
          expect(getDataAtCell(0, 0)).toBe('Timothy');
        });

        it('should undo single change in cell with validator', done => {
          handsontable({
            data: createObjectData()
          });
          var HOT = getInstance();

          setDataAtRowProp(0, 0, 'Pearce');

          setTimeout(() => {
            expect(getDataAtRowProp(0, 0)).toBe('Pearce');

            HOT.undo();
          }, 200);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('Timothy');
            done();
          }, 400);
        });

        it('should undo creation of a single row', () => {
          var HOT = handsontable({
            data: createObjectData().slice(0, 2)
          });

          expect(countRows()).toEqual(2);

          alter('insert_row');

          expect(countRows()).toEqual(3);

          HOT.undo();

          expect(countRows()).toEqual(2);
        });

        it('should undo creation of multiple rows', () => {
          var HOT = handsontable({
            data: createObjectData().slice(0, 2)
          });

          expect(countRows()).toEqual(2);

          alter('insert_row', 0, 5);

          expect(countRows()).toEqual(7);

          HOT.undo();

          expect(countRows()).toEqual(2);
        });

        it('should undo removal of single row', () => {
          var HOT = handsontable({
            data: createObjectData().slice(0, 2)
          });

          expect(countRows()).toEqual(2);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toEqual('Sean');
          expect(getDataAtRowProp(1, 'surname')).toEqual('Connery');

          alter('remove_row');

          expect(countRows()).toEqual(1);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toBeNull();
          expect(getDataAtRowProp(1, 'surname')).toBeNull();

          HOT.undo();

          expect(countRows()).toEqual(2);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toEqual('Sean');
          expect(getDataAtRowProp(1, 'surname')).toEqual('Connery');
        });

        it('should undo removal of multiple rows', () => {
          var HOT = handsontable({
            data: createObjectData()
          });

          expect(countRows()).toEqual(3);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toEqual('Sean');
          expect(getDataAtRowProp(1, 'surname')).toEqual('Connery');
          expect(getDataAtRowProp(2, 'name')).toEqual('Roger');
          expect(getDataAtRowProp(2, 'surname')).toEqual('Moore');

          alter('remove_row', 1, 2);

          expect(countRows()).toEqual(1);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toBeNull();
          expect(getDataAtRowProp(1, 'surname')).toBeNull();
          expect(getDataAtRowProp(2, 'name')).toBeNull();
          expect(getDataAtRowProp(2, 'surname')).toBeNull();

          HOT.undo();

          expect(countRows()).toEqual(3);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toEqual('Sean');
          expect(getDataAtRowProp(1, 'surname')).toEqual('Connery');
          expect(getDataAtRowProp(2, 'name')).toEqual('Roger');
          expect(getDataAtRowProp(2, 'surname')).toEqual('Moore');
        });

        it('should undo multiple changes', () => {
          handsontable({
            data: createObjectData().slice(0, 2)
          });
          var HOT = getInstance();

          setDataAtRowProp(0, 'name', 'Pierce');
          setDataAtRowProp(0, 'surname', 'Brosnan');
          setDataAtRowProp(1, 'name', 'Daniel');
          setDataAtRowProp(1, 'surname', 'Craig');

          expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
          expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
          expect(getDataAtRowProp(1, 'name')).toBe('Daniel');
          expect(getDataAtRowProp(1, 'surname')).toBe('Craig');

          HOT.undo();
          expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
          expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
          expect(getDataAtRowProp(1, 'name')).toBe('Daniel');
          expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

          HOT.undo();
          expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
          expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
          expect(getDataAtRowProp(1, 'name')).toBe('Sean');
          expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

          HOT.undo();
          expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
          expect(getDataAtRowProp(0, 'surname')).toBe('Dalton');
          expect(getDataAtRowProp(1, 'name')).toBe('Sean');
          expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

          HOT.undo();
          expect(getDataAtRowProp(0, 'name')).toBe('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toBe('Dalton');
          expect(getDataAtRowProp(1, 'name')).toBe('Sean');
          expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

          HOT.undo();
          expect(getDataAtRowProp(0, 'name')).toBe('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toBe('Dalton');
          expect(getDataAtRowProp(1, 'name')).toBe('Sean');
          expect(getDataAtRowProp(1, 'surname')).toBe('Connery');
        });

        it('should undo multiple changes in cells with validators', done => {
          handsontable({
            data: createObjectData().slice(0, 2)
          });
          var HOT = getInstance();

          setDataAtRowProp(0, 'name', 'Pierce');
          setDataAtRowProp(0, 'surname', 'Brosnan');
          setDataAtRowProp(1, 'name', 'Daniel');
          setDataAtRowProp(1, 'surname', 'Craig');

          setTimeout(() => {
            expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
            expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
            expect(getDataAtRowProp(1, 'name')).toBe('Daniel');
            expect(getDataAtRowProp(1, 'surname')).toBe('Craig');

            HOT.undo();
          }, 200);

          setTimeout(() => {
            expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
            expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
            expect(getDataAtRowProp(1, 'name')).toBe('Daniel');
            expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

            HOT.undo();
          }, 400);

          setTimeout(() => {
            expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
            expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
            expect(getDataAtRowProp(1, 'name')).toBe('Sean');
            expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

            HOT.undo();
          }, 600);

          setTimeout(() => {
            expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
            expect(getDataAtRowProp(0, 'surname')).toBe('Dalton');
            expect(getDataAtRowProp(1, 'name')).toBe('Sean');
            expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

            HOT.undo();
          }, 800);

          setTimeout(() => {
            expect(getDataAtRowProp(0, 'name')).toBe('Timothy');
            expect(getDataAtRowProp(0, 'surname')).toBe('Dalton');
            expect(getDataAtRowProp(1, 'name')).toBe('Sean');
            expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

            HOT.undo();
          }, 1000);

          setTimeout(() => {
            expect(getDataAtRowProp(0, 'name')).toBe('Timothy');
            expect(getDataAtRowProp(0, 'surname')).toBe('Dalton');
            expect(getDataAtRowProp(1, 'name')).toBe('Sean');
            expect(getDataAtRowProp(1, 'surname')).toBe('Connery');
            done();
          }, 1200);
        });

        it('should undo multiple row creations', () => {
          var HOT = handsontable({
            data: createObjectData().slice(0, 2)
          });

          expect(countRows()).toEqual(2);

          alter('insert_row');
          alter('insert_row');
          alter('insert_row');
          alter('insert_row');

          expect(countRows()).toEqual(6);

          HOT.undo();
          expect(countRows()).toEqual(5);

          HOT.undo();
          expect(countRows()).toEqual(4);

          HOT.undo();
          expect(countRows()).toEqual(3);

          HOT.undo();
          expect(countRows()).toEqual(2);

          HOT.undo();
          expect(countRows()).toEqual(2);
        });

        it('should undo multiple row removals', () => {
          var HOT = handsontable({
            data: createObjectData()
          });

          expect(countRows()).toEqual(3);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toEqual('Sean');
          expect(getDataAtRowProp(1, 'surname')).toEqual('Connery');
          expect(getDataAtRowProp(2, 'name')).toEqual('Roger');
          expect(getDataAtRowProp(2, 'surname')).toEqual('Moore');

          alter('remove_row');
          alter('remove_row');

          expect(countRows()).toEqual(1);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');

          HOT.undo();
          expect(countRows()).toEqual(2);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toEqual('Sean');
          expect(getDataAtRowProp(1, 'surname')).toEqual('Connery');

          HOT.undo();
          expect(countRows()).toEqual(3);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toEqual('Sean');
          expect(getDataAtRowProp(1, 'surname')).toEqual('Connery');
          expect(getDataAtRowProp(2, 'name')).toEqual('Roger');
          expect(getDataAtRowProp(2, 'surname')).toEqual('Moore');

          HOT.undo();
          expect(countRows()).toEqual(3);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toEqual('Sean');
          expect(getDataAtRowProp(1, 'surname')).toEqual('Connery');
          expect(getDataAtRowProp(2, 'name')).toEqual('Roger');
          expect(getDataAtRowProp(2, 'surname')).toEqual('Moore');
        });
      });

      describe('redo', () => {
        it('should redo single change', () => {
          handsontable({
            data: createObjectData()
          });
          var HOT = getInstance();

          setDataAtRowProp(0, 0, 'Pearce');
          expect(getDataAtRowProp(0, 0)).toBe('Pearce');

          HOT.undo();
          expect(getDataAtCell(0, 0)).toBe('Timothy');

          HOT.redo();
          expect(getDataAtRowProp(0, 0)).toBe('Pearce');
        });

        it('should redo single change in cell with validator', done => {
          handsontable({
            data: createObjectData()
          });
          var HOT = getInstance();

          setDataAtRowProp(0, 0, 'Pearce');

          setTimeout(() => {
            expect(getDataAtRowProp(0, 0)).toBe('Pearce');

            HOT.undo();
          }, 200);

          setTimeout(() => {
            expect(getDataAtCell(0, 0)).toBe('Timothy');

            HOT.redo();
          }, 400);

          setTimeout(() => {
            expect(getDataAtRowProp(0, 0)).toBe('Pearce');
            done();
          }, 600);
        });

        it('should redo creation of a single row', () => {
          var HOT = handsontable({
            data: createObjectData().slice(0, 2)
          });

          expect(countRows()).toEqual(2);

          alter('insert_row');

          expect(countRows()).toEqual(3);

          HOT.undo();

          expect(countRows()).toEqual(2);

          HOT.redo();

          expect(countRows()).toEqual(3);
        });

        it('should redo creation of multiple rows', () => {
          var HOT = handsontable({
            data: createObjectData().slice(0, 2)
          });

          expect(countRows()).toEqual(2);

          alter('insert_row', 0, 5);

          expect(countRows()).toEqual(7);

          HOT.undo();

          expect(countRows()).toEqual(2);

          HOT.redo();

          expect(countRows()).toEqual(7);
        });

        it('should redo removal of single row', () => {
          var HOT = handsontable({
            data: createObjectData().slice(0, 2)
          });

          expect(countRows()).toEqual(2);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toEqual('Sean');
          expect(getDataAtRowProp(1, 'surname')).toEqual('Connery');

          alter('remove_row');

          expect(countRows()).toEqual(1);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toBeNull();
          expect(getDataAtRowProp(1, 'surname')).toBeNull();

          HOT.undo();

          expect(countRows()).toEqual(2);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toEqual('Sean');
          expect(getDataAtRowProp(1, 'surname')).toEqual('Connery');

          HOT.redo();

          expect(countRows()).toEqual(1);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toBeNull();
          expect(getDataAtRowProp(1, 'surname')).toBeNull();
        });

        it('should redo removal of multiple rows', () => {
          var HOT = handsontable({
            data: createObjectData()
          });

          expect(countRows()).toEqual(3);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toEqual('Sean');
          expect(getDataAtRowProp(1, 'surname')).toEqual('Connery');
          expect(getDataAtRowProp(2, 'name')).toEqual('Roger');
          expect(getDataAtRowProp(2, 'surname')).toEqual('Moore');

          alter('remove_row', 1, 2);

          expect(countRows()).toEqual(1);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toBeNull();
          expect(getDataAtRowProp(1, 'surname')).toBeNull();
          expect(getDataAtRowProp(2, 'name')).toBeNull();
          expect(getDataAtRowProp(2, 'surname')).toBeNull();

          HOT.undo();

          expect(countRows()).toEqual(3);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toEqual('Sean');
          expect(getDataAtRowProp(1, 'surname')).toEqual('Connery');
          expect(getDataAtRowProp(2, 'name')).toEqual('Roger');
          expect(getDataAtRowProp(2, 'surname')).toEqual('Moore');

          HOT.redo();

          expect(countRows()).toEqual(1);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toBeNull();
          expect(getDataAtRowProp(1, 'surname')).toBeNull();
          expect(getDataAtRowProp(2, 'name')).toBeNull();
          expect(getDataAtRowProp(2, 'surname')).toBeNull();
        });

        it('should redo multiple changes', () => {
          handsontable({
            data: createObjectData().slice(0, 2)
          });
          var HOT = getInstance();

          setDataAtRowProp(0, 'name', 'Pierce');
          setDataAtRowProp(0, 'surname', 'Brosnan');
          setDataAtRowProp(1, 'name', 'Daniel');
          setDataAtRowProp(1, 'surname', 'Craig');

          expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
          expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
          expect(getDataAtRowProp(1, 'name')).toBe('Daniel');
          expect(getDataAtRowProp(1, 'surname')).toBe('Craig');

          HOT.undo();
          HOT.undo();
          HOT.undo();
          HOT.undo();

          expect(getDataAtRowProp(0, 'name')).toBe('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toBe('Dalton');
          expect(getDataAtRowProp(1, 'name')).toBe('Sean');
          expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

          HOT.redo();
          expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
          expect(getDataAtRowProp(0, 'surname')).toBe('Dalton');
          expect(getDataAtRowProp(1, 'name')).toBe('Sean');
          expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

          HOT.redo();
          expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
          expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
          expect(getDataAtRowProp(1, 'name')).toBe('Sean');
          expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

          HOT.redo();
          expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
          expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
          expect(getDataAtRowProp(1, 'name')).toBe('Daniel');
          expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

          HOT.redo();
          expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
          expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
          expect(getDataAtRowProp(1, 'name')).toBe('Daniel');
          expect(getDataAtRowProp(1, 'surname')).toBe('Craig');

          HOT.redo();
          expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
          expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
          expect(getDataAtRowProp(1, 'name')).toBe('Daniel');
          expect(getDataAtRowProp(1, 'surname')).toBe('Craig');
        });

        it('should redo multiple changes in cells with validators', done => {
          handsontable({
            data: createObjectData().slice(0, 2)
          });
          var HOT = getInstance();

          setDataAtRowProp(0, 'name', 'Pierce');
          setDataAtRowProp(0, 'surname', 'Brosnan');
          setDataAtRowProp(1, 'name', 'Daniel');
          setDataAtRowProp(1, 'surname', 'Craig');

          setTimeout(() => {
            expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
            expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
            expect(getDataAtRowProp(1, 'name')).toBe('Daniel');
            expect(getDataAtRowProp(1, 'surname')).toBe('Craig');

            HOT.undo();
          }, 200);

          setTimeout(() => {
            HOT.undo();
          }, 400);

          setTimeout(() => {
            HOT.undo();
          }, 600);

          setTimeout(() => {
            HOT.undo();
          }, 800);

          setTimeout(() => {
            expect(getDataAtRowProp(0, 'name')).toBe('Timothy');
            expect(getDataAtRowProp(0, 'surname')).toBe('Dalton');
            expect(getDataAtRowProp(1, 'name')).toBe('Sean');
            expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

            HOT.redo();
          }, 1000);

          setTimeout(() => {
            expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
            expect(getDataAtRowProp(0, 'surname')).toBe('Dalton');
            expect(getDataAtRowProp(1, 'name')).toBe('Sean');
            expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

            HOT.redo();
          }, 1200);

          setTimeout(() => {
            expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
            expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
            expect(getDataAtRowProp(1, 'name')).toBe('Sean');
            expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

            HOT.redo();
          }, 1400);

          setTimeout(() => {
            expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
            expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
            expect(getDataAtRowProp(1, 'name')).toBe('Daniel');
            expect(getDataAtRowProp(1, 'surname')).toBe('Connery');

            HOT.redo();
          }, 1600);

          setTimeout(() => {
            expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
            expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
            expect(getDataAtRowProp(1, 'name')).toBe('Daniel');
            expect(getDataAtRowProp(1, 'surname')).toBe('Craig');

            HOT.redo();
          }, 1800);

          setTimeout(() => {
            expect(getDataAtRowProp(0, 'name')).toBe('Pierce');
            expect(getDataAtRowProp(0, 'surname')).toBe('Brosnan');
            expect(getDataAtRowProp(1, 'name')).toBe('Daniel');
            expect(getDataAtRowProp(1, 'surname')).toBe('Craig');
            done();
          }, 2000);
        });

        it('should redo multiple row creations', () => {
          var HOT = handsontable({
            data: createObjectData().slice(0, 2)
          });

          expect(countRows()).toEqual(2);

          alter('insert_row');
          alter('insert_row');
          alter('insert_row');
          alter('insert_row');

          expect(countRows()).toEqual(6);

          HOT.undo();
          HOT.undo();
          HOT.undo();
          HOT.undo();

          expect(countRows()).toEqual(2);

          HOT.redo();
          expect(countRows()).toEqual(3);

          HOT.redo();
          expect(countRows()).toEqual(4);

          HOT.redo();
          expect(countRows()).toEqual(5);

          HOT.redo();
          expect(countRows()).toEqual(6);

          HOT.redo();
          expect(countRows()).toEqual(6);
        });

        it('should undo multiple row removals', () => {
          var HOT = handsontable({
            data: createObjectData()
          });

          expect(countRows()).toEqual(3);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toEqual('Sean');
          expect(getDataAtRowProp(1, 'surname')).toEqual('Connery');
          expect(getDataAtRowProp(2, 'name')).toEqual('Roger');
          expect(getDataAtRowProp(2, 'surname')).toEqual('Moore');

          alter('remove_row');
          alter('remove_row');

          expect(countRows()).toEqual(1);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');

          HOT.undo();
          HOT.undo();
          HOT.undo();

          expect(countRows()).toEqual(3);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toEqual('Sean');
          expect(getDataAtRowProp(1, 'surname')).toEqual('Connery');
          expect(getDataAtRowProp(2, 'name')).toEqual('Roger');
          expect(getDataAtRowProp(2, 'surname')).toEqual('Moore');

          HOT.redo();
          expect(countRows()).toEqual(2);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
          expect(getDataAtRowProp(1, 'name')).toEqual('Sean');
          expect(getDataAtRowProp(1, 'surname')).toEqual('Connery');

          HOT.redo();
          expect(countRows()).toEqual(1);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');

          HOT.redo();
          expect(countRows()).toEqual(1);
          expect(getDataAtRowProp(0, 'name')).toEqual('Timothy');
          expect(getDataAtRowProp(0, 'surname')).toEqual('Dalton');
        });
      });
    });
  });

  describe('plugin features', () => {
    describe('cell alignment', () => {
      it('should undo a sequence of aligning cells', () => {
        var hot = handsontable({
          data: Handsontable.helper.createSpreadsheetData(9, 9),
          contextMenu: true,
          colWidths: [50, 50, 50, 50, 50, 50, 50, 50, 50],
          rowHeights: [50, 50, 50, 50, 50, 50, 50, 50, 50]
        });

        // top 3 rows center
        selectCell(0, 0, 2, 8);
        hot.getPlugin('contextMenu').executeCommand('alignment:center');

        // middle 3 rows unchanged - left

        // bottom 3 rows right
        selectCell(6, 0, 8, 8);
        hot.getPlugin('contextMenu').executeCommand('alignment:right');

        // left 3 columns - middle
        selectCell(0, 0, 8, 2);
        hot.getPlugin('contextMenu').executeCommand('alignment:middle');

        // middle 3 columns unchanged - top

        // right 3 columns - bottom
        selectCell(0, 6, 8, 8);
        hot.getPlugin('contextMenu').executeCommand('alignment:bottom');

        var cellMeta = hot.getCellMeta(0, 0);
        expect(cellMeta.className.indexOf('htCenter')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htMiddle')).toBeGreaterThan(-1);

        cellMeta = hot.getCellMeta(0, 7);
        expect(cellMeta.className.indexOf('htCenter')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htBottom')).toBeGreaterThan(-1);

        cellMeta = hot.getCellMeta(5, 1);
        expect(cellMeta.className.indexOf('htMiddle')).toBeGreaterThan(-1);

        cellMeta = hot.getCellMeta(5, 7);
        expect(cellMeta.className.indexOf('htBottom')).toBeGreaterThan(-1);

        cellMeta = hot.getCellMeta(7, 1);
        expect(cellMeta.className.indexOf('htRight')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htMiddle')).toBeGreaterThan(-1);

        cellMeta = hot.getCellMeta(7, 5);
        expect(cellMeta.className.indexOf('htRight')).toBeGreaterThan(-1);

        cellMeta = hot.getCellMeta(7, 7);
        expect(cellMeta.className.indexOf('htRight')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htBottom')).toBeGreaterThan(-1);

        hot.undo();
        cellMeta = hot.getCellMeta(0, 7);
        expect(cellMeta.className.indexOf('htCenter')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htBottom')).toEqual(-1);

        cellMeta = hot.getCellMeta(5, 7);
        expect(cellMeta.className.indexOf('htBottom')).toEqual(-1);

        cellMeta = hot.getCellMeta(7, 7);
        expect(cellMeta.className.indexOf('htRight')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htBottom')).toEqual(-1);

        hot.undo();

        cellMeta = hot.getCellMeta(0, 0);
        expect(cellMeta.className.indexOf('htCenter')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htMiddle')).toEqual(-1);

        cellMeta = hot.getCellMeta(5, 1);
        expect(cellMeta.className.indexOf('htMiddle')).toEqual(-1);

        cellMeta = hot.getCellMeta(7, 1);
        expect(cellMeta.className.indexOf('htRight')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htMiddle')).toEqual(-1);

        hot.undo();

        cellMeta = hot.getCellMeta(7, 1);
        expect(cellMeta.className.indexOf('htRight')).toEqual(-1);
        expect(cellMeta.className.indexOf('htMiddle')).toEqual(-1);

        cellMeta = hot.getCellMeta(7, 5);
        expect(cellMeta.className.indexOf('htRight')).toEqual(-1);

        cellMeta = hot.getCellMeta(7, 7);
        expect(cellMeta.className.indexOf('htRight')).toEqual(-1);
        expect(cellMeta.className.indexOf('htBottom')).toEqual(-1);

        hot.undo();

        // check if all cells are either non-adjusted or adjusted to the left (as default)
        var finish;
        for (var i = 0; i < 9; i++) {
          for (var j = 0; j < 9; j++) {
            cellMeta = hot.getCellMeta(i, j);
            finish = cellMeta.className === void 0 || cellMeta.className.trim() === '' || cellMeta.className.trim() === 'htLeft';
            expect(finish).toBe(true);
          }
        }
      });

      it('should redo a sequence of aligning cells', () => {
        var hot = handsontable({
          data: Handsontable.helper.createSpreadsheetData(9, 9),
          contextMenu: true,
          colWidths: [50, 50, 50, 50, 50, 50, 50, 50, 50],
          rowHeights: [50, 50, 50, 50, 50, 50, 50, 50, 50]
        });

        // top 3 rows center
        selectCell(0, 0, 2, 8);
        hot.getPlugin('contextMenu').executeCommand('alignment:center');

        // middle 3 rows unchanged - left

        // bottom 3 rows right
        selectCell(6, 0, 8, 8);
        hot.getPlugin('contextMenu').executeCommand('alignment:right');

        // left 3 columns - middle
        selectCell(0, 0, 8, 2);
        hot.getPlugin('contextMenu').executeCommand('alignment:middle');

        // middle 3 columns unchanged - top

        // right 3 columns - bottom
        selectCell(0, 6, 8, 8);
        hot.getPlugin('contextMenu').executeCommand('alignment:bottom');

        var cellMeta = hot.getCellMeta(0, 0);
        expect(cellMeta.className.indexOf('htCenter')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htMiddle')).toBeGreaterThan(-1);

        cellMeta = hot.getCellMeta(0, 7);
        expect(cellMeta.className.indexOf('htCenter')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htBottom')).toBeGreaterThan(-1);

        cellMeta = hot.getCellMeta(5, 1);
        expect(cellMeta.className.indexOf('htMiddle')).toBeGreaterThan(-1);

        cellMeta = hot.getCellMeta(5, 7);
        expect(cellMeta.className.indexOf('htBottom')).toBeGreaterThan(-1);

        cellMeta = hot.getCellMeta(7, 1);
        expect(cellMeta.className.indexOf('htRight')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htMiddle')).toBeGreaterThan(-1);

        cellMeta = hot.getCellMeta(7, 5);
        expect(cellMeta.className.indexOf('htRight')).toBeGreaterThan(-1);

        cellMeta = hot.getCellMeta(7, 7);
        expect(cellMeta.className.indexOf('htRight')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htBottom')).toBeGreaterThan(-1);

        hot.undo();
        hot.undo();
        hot.undo();
        hot.undo();

        // check if all cells are either non-adjusted or adjusted to the left (as default)
        var finish;
        for (var i = 0; i < 9; i++) {
          for (var j = 0; j < 9; j++) {
            cellMeta = hot.getCellMeta(i, j);
            finish = cellMeta.className === void 0 || cellMeta.className.trim() === '' || cellMeta.className.trim() === 'htLeft';
            expect(finish).toBe(true);
          }
        }

        hot.redo();
        cellMeta = hot.getCellMeta(0, 0);
        expect(cellMeta.className.indexOf('htCenter')).toBeGreaterThan(-1);
        cellMeta = hot.getCellMeta(1, 5);
        expect(cellMeta.className.indexOf('htCenter')).toBeGreaterThan(-1);
        cellMeta = hot.getCellMeta(2, 8);
        expect(cellMeta.className.indexOf('htCenter')).toBeGreaterThan(-1);

        hot.redo();
        cellMeta = hot.getCellMeta(6, 0);
        expect(cellMeta.className.indexOf('htRight')).toBeGreaterThan(-1);
        cellMeta = hot.getCellMeta(7, 5);
        expect(cellMeta.className.indexOf('htRight')).toBeGreaterThan(-1);
        cellMeta = hot.getCellMeta(8, 8);
        expect(cellMeta.className.indexOf('htRight')).toBeGreaterThan(-1);

        hot.redo();
        cellMeta = hot.getCellMeta(0, 0);
        expect(cellMeta.className.indexOf('htMiddle')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htCenter')).toBeGreaterThan(-1);
        cellMeta = hot.getCellMeta(5, 1);
        expect(cellMeta.className.indexOf('htMiddle')).toBeGreaterThan(-1);
        cellMeta = hot.getCellMeta(8, 2);
        expect(cellMeta.className.indexOf('htMiddle')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htRight')).toBeGreaterThan(-1);

        hot.redo();
        cellMeta = hot.getCellMeta(0, 6);
        expect(cellMeta.className.indexOf('htBottom')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htCenter')).toBeGreaterThan(-1);
        cellMeta = hot.getCellMeta(5, 7);
        expect(cellMeta.className.indexOf('htBottom')).toBeGreaterThan(-1);
        cellMeta = hot.getCellMeta(8, 8);
        expect(cellMeta.className.indexOf('htBottom')).toBeGreaterThan(-1);
        expect(cellMeta.className.indexOf('htRight')).toBeGreaterThan(-1);
      });
    });

    it('should exposed new methods when plugin is enabled', () => {
      var hot = handsontable({
        undo: false
      });

      expect(hot.undo).toBeUndefined();
      expect(hot.redo).toBeUndefined();
      expect(hot.isUndoAvailable).toBeUndefined();
      expect(hot.isRedoAvailable).toBeUndefined();
      expect(hot.clearUndo).toBeUndefined();

      updateSettings({
        undo: true
      });

      expect(typeof hot.undo).toEqual('function');
      expect(typeof hot.redo).toEqual('function');
      expect(typeof hot.isUndoAvailable).toEqual('function');
      expect(typeof hot.isRedoAvailable).toEqual('function');
      expect(typeof hot.clearUndo).toEqual('function');
    });

    it('should remove exposed methods when plugin is disbaled', () => {
      var hot = handsontable({
        undo: true
      });

      expect(typeof hot.undo).toEqual('function');
      expect(typeof hot.redo).toEqual('function');
      expect(typeof hot.isUndoAvailable).toEqual('function');
      expect(typeof hot.isRedoAvailable).toEqual('function');
      expect(typeof hot.clearUndo).toEqual('function');

      updateSettings({
        undo: false
      });

      expect(hot.undo).toBeUndefined();
      expect(hot.redo).toBeUndefined();
      expect(hot.isUndoAvailable).toBeUndefined();
      expect(hot.isRedoAvailable).toBeUndefined();
      expect(hot.clearUndo).toBeUndefined();
    });

    describe('Keyboard shortcuts', () => {
      it('should undo single change after hitting CTRL+Z', function () {
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(2, 2)
        });
        var HOT = getInstance();

        selectCell(0, 0);
        setDataAtCell(0, 0, 'new value');

        this.$container.simulate('keydown', { ctrlKey: true, keyCode: 'Z'.charCodeAt(0) });
        expect(getDataAtCell(0, 0)).toBe('A1');
      });

      it('should redo single change after hitting CTRL+Y', function () {
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(2, 2)
        });
        var HOT = getInstance();

        selectCell(0, 0);
        setDataAtCell(0, 0, 'new value');

        expect(getDataAtCell(0, 0)).toBe('new value');

        HOT.undo();
        expect(getDataAtCell(0, 0)).toBe('A1');

        this.$container.simulate('keydown', { ctrlKey: true, keyCode: 'Y'.charCodeAt(0) });

        expect(getDataAtCell(0, 0)).toBe('new value');
      });

      it('should redo single change after hitting CTRL+SHIFT+Z', function () {
        handsontable({
          data: Handsontable.helper.createSpreadsheetData(2, 2)
        });
        var HOT = getInstance();

        selectCell(0, 0);
        setDataAtCell(0, 0, 'new value');

        expect(getDataAtCell(0, 0)).toBe('new value');

        HOT.undo();
        expect(getDataAtCell(0, 0)).toBe('A1');

        this.$container.simulate('keydown', { ctrlKey: true, shiftKey: true, keyCode: 'Z'.charCodeAt(0) });

        expect(getDataAtCell(0, 0)).toBe('new value');
      });
    });
  });

  describe('Hooks', () => {
    it('should fire a `beforeUndo` hook after the undo process begins', done => {
      var beforeUndoSpy = jasmine.createSpy('beforeUndo');
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });
      var hookData = null;

      hot.addHook('beforeUndo', beforeUndoSpy);
      hot.addHook('beforeUndo', data => {
        hookData = data;
      });

      alter('remove_row', 1);

      setTimeout(() => {
        hot.undo();
      }, 10);

      setTimeout(() => {
        expect(beforeUndoSpy.calls.count()).toEqual(1);
        expect(hookData).not.toBe(null);
        expect(hookData.actionType).toEqual('remove_row');
        expect(hookData.data).toEqual([['A2', 'B2']]);
        done();
      }, 100);
    });

    it('should fire a `beforeRedo` hook before the redo process begins', done => {
      var beforeRedoSpy = jasmine.createSpy('beforeRedo');
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });
      var hookData = null;

      hot.addHook('beforeRedo', beforeRedoSpy);
      hot.addHook('beforeRedo', data => {
        hookData = data;
      });

      alter('remove_row', 1);

      setTimeout(() => {
        hot.undo();
        hot.redo();
      }, 10);

      setTimeout(() => {
        expect(beforeRedoSpy.calls.count()).toEqual(1);
        expect(hookData).not.toBe(null);
        expect(hookData.actionType).toEqual('remove_row');
        expect(hookData.data).toEqual([['A2', 'B2']]);
        done();
      }, 100);
    });

    it('should fire a `afterRedo` hook after the redo process begins', done => {
      var afterRedoSpy = jasmine.createSpy('afterRedo');
      var hot = handsontable({
        data: Handsontable.helper.createSpreadsheetData(2, 2)
      });
      var hookData = null;

      hot.addHook('beforeRedo', afterRedoSpy);
      hot.addHook('beforeRedo', data => {
        hookData = data;
      });

      alter('remove_row', 1);

      setTimeout(() => {
        hot.undo();
        hot.redo();
      }, 10);

      setTimeout(() => {
        expect(afterRedoSpy.calls.count()).toEqual(1);
        expect(hookData).not.toBe(null);
        expect(hookData.actionType).toEqual('remove_row');
        expect(hookData.data).toEqual([['A2', 'B2']]);
        done();
      }, 100);
    });
  });
});

/***/ }),
/* 362 */
/***/ (function(module, exports) {

// this file is called MemoryLeakTest.js (not MemoryLeak.spec.js) to make sure it is manually executed as the last suite
describe('MemoryLeakTest', () => {
  it('after all Handsontable instances are destroy()\'d, there should be no more active listeners', () => {
    expect(Handsontable._getListenersCounter()).toBe(0);
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=e2e.entry.js.map