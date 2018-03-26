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
/******/ 	return __webpack_require__(__webpack_require__.s = 125);
/******/ })
/************************************************************************/
/******/ ({

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_window__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_window___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_window__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jasmine__ = __webpack_require__(128);
/* eslint-disable import/no-unresolved */




const exportToWindow = helpersHolder => {
  Object.keys(helpersHolder).forEach(key => {
    if (key === '__esModule') {
      return;
    }

    if (__WEBPACK_IMPORTED_MODULE_0_window___default.a[key] !== void 0) {
      throw Error(`Cannot export "${key}" helper because this name is already assigned.`);
    }

    __WEBPACK_IMPORTED_MODULE_0_window___default.a[key] = helpersHolder[key];
  });
};

// Export all helpers to the window.
exportToWindow(__WEBPACK_IMPORTED_MODULE_1__common__);
exportToWindow(__WEBPACK_IMPORTED_MODULE_2__jasmine__);

/***/ }),

/***/ 126:
/***/ (function(module, exports) {

module.exports = window;

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["sleep"] = sleep;
/* harmony export (immutable) */ __webpack_exports__["hot"] = hot;
/* harmony export (immutable) */ __webpack_exports__["handsontable"] = handsontable;
/* harmony export (immutable) */ __webpack_exports__["getHtCore"] = getHtCore;
/* harmony export (immutable) */ __webpack_exports__["getTopClone"] = getTopClone;
/* harmony export (immutable) */ __webpack_exports__["getTopLeftClone"] = getTopLeftClone;
/* harmony export (immutable) */ __webpack_exports__["getLeftClone"] = getLeftClone;
/* harmony export (immutable) */ __webpack_exports__["getBottomClone"] = getBottomClone;
/* harmony export (immutable) */ __webpack_exports__["getBottomLeftClone"] = getBottomLeftClone;
/* harmony export (immutable) */ __webpack_exports__["countCells"] = countCells;
/* harmony export (immutable) */ __webpack_exports__["isEditorVisible"] = isEditorVisible;
/* harmony export (immutable) */ __webpack_exports__["isFillHandleVisible"] = isFillHandleVisible;
/* harmony export (immutable) */ __webpack_exports__["getCorrespondingOverlay"] = getCorrespondingOverlay;
/* harmony export (immutable) */ __webpack_exports__["contextMenu"] = contextMenu;
/* harmony export (immutable) */ __webpack_exports__["closeContextMenu"] = closeContextMenu;
/* harmony export (immutable) */ __webpack_exports__["dropdownMenu"] = dropdownMenu;
/* harmony export (immutable) */ __webpack_exports__["closeDropdownMenu"] = closeDropdownMenu;
/* harmony export (immutable) */ __webpack_exports__["dropdownMenuRootElement"] = dropdownMenuRootElement;
/* harmony export (immutable) */ __webpack_exports__["handsontableMouseTriggerFactory"] = handsontableMouseTriggerFactory;
/* harmony export (immutable) */ __webpack_exports__["mouseDoubleClick"] = mouseDoubleClick;
/* harmony export (immutable) */ __webpack_exports__["handsontableKeyTriggerFactory"] = handsontableKeyTriggerFactory;
/* harmony export (immutable) */ __webpack_exports__["keyDownUp"] = keyDownUp;
/* harmony export (immutable) */ __webpack_exports__["keyProxy"] = keyProxy;
/* harmony export (immutable) */ __webpack_exports__["serveImmediatePropagation"] = serveImmediatePropagation;
/* harmony export (immutable) */ __webpack_exports__["autocompleteEditor"] = autocompleteEditor;
/* harmony export (immutable) */ __webpack_exports__["setCaretPosition"] = setCaretPosition;
/* harmony export (immutable) */ __webpack_exports__["autocomplete"] = autocomplete;
/* harmony export (immutable) */ __webpack_exports__["triggerPaste"] = triggerPaste;
/* harmony export (immutable) */ __webpack_exports__["handsontableMethodFactory"] = handsontableMethodFactory;
/* harmony export (immutable) */ __webpack_exports__["colWidth"] = colWidth;
/* harmony export (immutable) */ __webpack_exports__["rowHeight"] = rowHeight;
/* harmony export (immutable) */ __webpack_exports__["getRenderedValue"] = getRenderedValue;
/* harmony export (immutable) */ __webpack_exports__["getRenderedContent"] = getRenderedContent;
/* harmony export (immutable) */ __webpack_exports__["createNumericData"] = createNumericData;
/* harmony export (immutable) */ __webpack_exports__["Model"] = Model;
/* harmony export (immutable) */ __webpack_exports__["createAccessorForProperty"] = createAccessorForProperty;
/* harmony export (immutable) */ __webpack_exports__["resizeColumn"] = resizeColumn;
/* harmony export (immutable) */ __webpack_exports__["resizeRow"] = resizeRow;
/* harmony export (immutable) */ __webpack_exports__["moveSecondDisplayedRowBeforeFirstRow"] = moveSecondDisplayedRowBeforeFirstRow;
/* harmony export (immutable) */ __webpack_exports__["moveFirstDisplayedRowAfterSecondRow"] = moveFirstDisplayedRowAfterSecondRow;
/* harmony export (immutable) */ __webpack_exports__["swapDisplayedColumns"] = swapDisplayedColumns;
/* harmony export (immutable) */ __webpack_exports__["triggerTouchEvent"] = triggerTouchEvent;
function sleep(delay = 100) {
  return Promise.resolve({
    then(resolve) {
      setTimeout(resolve, delay);
    }
  });
};

function hot() {
  return spec().$container.data('handsontable');
};

function handsontable(options) {
  var currentSpec = spec();

  currentSpec.$container.handsontable(options);
  currentSpec.$container[0].focus(); // otherwise TextEditor tests do not pass in IE8

  return currentSpec.$container.data('handsontable');
};

/**
 * As for v. 0.11 the only scrolling method is native scroll, which creates copies of main htCore table inside of the container.
 * Therefore, simple $(".htCore") will return more than one object. Most of the time, you're interested in the original
 * htCore, not the copies made by native scroll.
 *
 * This method returns the original htCore object
 *
 * @returns {jqObject} reference to the original htCore
 */

function getHtCore() {
  return spec().$container.find('.htCore').first();
};

function getTopClone() {
  return spec().$container.find('.ht_clone_top');
};

function getTopLeftClone() {
  return spec().$container.find('.ht_clone_top_left_corner');
};
// for compatybility
// var getCornerClone = getTopLeftClone;

function getLeftClone() {
  return spec().$container.find('.ht_clone_left');
};

function getBottomClone() {
  return spec().$container.find('.ht_clone_bottom');
};

function getBottomLeftClone() {
  return spec().$container.find('.ht_clone_bottom_left_corner');
};

// Rename me to countTD
function countCells() {
  return getHtCore().find('tbody td').length;
};

function isEditorVisible() {
  return !!(keyProxy().is(':visible') && keyProxy().parent().is(':visible') && !keyProxy().parent().is('.htHidden'));
};

function isFillHandleVisible() {
  return !!spec().$container.find('.wtBorder.corner:visible').length;
};

function getCorrespondingOverlay(cell, container) {
  var overlay = $(cell).parents('.handsontable');

  if (overlay[0] == container[0]) {
    return $('.ht_master');
  }

  return $(overlay[0]);
};

/**
 * Shows context menu
 */
function contextMenu(cell) {
  var hot = spec().$container.data('handsontable');
  var selected = hot.getSelectedLast();

  if (!selected) {
    hot.selectCell(0, 0);
    selected = hot.getSelectedLast();
  }
  if (!cell) {
    cell = getCell(selected[0], selected[1]);
  }
  var cellOffset = $(cell).offset();

  $(cell).simulate('mousedown', { button: 2 });
  $(cell).simulate('contextmenu', {
    clientX: cellOffset.left - Handsontable.dom.getWindowScrollLeft(),
    clientY: cellOffset.top - Handsontable.dom.getWindowScrollTop()
  });
  $(cell).simulate('mouseup', { button: 2 });
};

function closeContextMenu() {
  $(document).simulate('mousedown');
  // $(document).trigger('mousedown');
};

/**
 * Shows dropdown menu
 */
function dropdownMenu(columnIndex) {
  var hot = spec().$container.data('handsontable');
  var th = hot.view.wt.wtTable.getColumnHeader(columnIndex || 0);
  var button = th.querySelector('.changeType');

  if (button) {
    $(button).simulate('mousedown');
    $(button).simulate('click');
  }
};

function closeDropdownMenu() {
  $(document).simulate('mousedown');
};

function dropdownMenuRootElement() {
  var plugin = hot().getPlugin('dropdownMenu');
  var root;

  if (plugin && plugin.menu) {
    root = plugin.menu.container;
  }

  return root;
};

/**
 * Returns a function that triggers a mouse event
 * @param {String} type Event type
 * @return {Function}
 */
function handsontableMouseTriggerFactory(type, button) {
  return function (element) {
    if (!(element instanceof jQuery)) {
      element = $(element);
    }
    var ev = $.Event(type);
    ev.which = button || 1; // left click by default

    element.simulate(type, ev);
  };
};

const mouseDown = handsontableMouseTriggerFactory('mousedown');
/* harmony export (immutable) */ __webpack_exports__["mouseDown"] = mouseDown;

const mouseMove = handsontableMouseTriggerFactory('mousemove');
/* harmony export (immutable) */ __webpack_exports__["mouseMove"] = mouseMove;

const mouseOver = handsontableMouseTriggerFactory('mouseover');
/* harmony export (immutable) */ __webpack_exports__["mouseOver"] = mouseOver;

const mouseUp = handsontableMouseTriggerFactory('mouseup');
/* harmony export (immutable) */ __webpack_exports__["mouseUp"] = mouseUp;


function mouseDoubleClick(element) {
  mouseDown(element);
  mouseUp(element);
  mouseDown(element);
  mouseUp(element);
};

const mouseRightDown = handsontableMouseTriggerFactory('mousedown', 3);
/* harmony export (immutable) */ __webpack_exports__["mouseRightDown"] = mouseRightDown;

const mouseRightUp = handsontableMouseTriggerFactory('mouseup', 3);
/* harmony export (immutable) */ __webpack_exports__["mouseRightUp"] = mouseRightUp;


/**
 * Returns a function that triggers a key event
 * @param {String} type Event type
 * @return {Function}
 */
function handsontableKeyTriggerFactory(type) {
  return function (key, extend) {
    var ev = {}; // $.Event(type);

    if (typeof key === 'string') {
      if (key.indexOf('shift+') > -1) {
        key = key.substring(6);
        ev.shiftKey = true;
      }

      if (key.indexOf('ctrl+') > -1) {
        key = key.substring(5);
        ev.ctrlKey = true;
        ev.metaKey = true;
      }

      switch (key) {
        case 'tab':
          ev.keyCode = 9;
          break;

        case 'enter':
          ev.keyCode = 13;
          break;

        case 'esc':
          ev.keyCode = 27;
          break;

        case 'f2':
          ev.keyCode = 113;
          break;

        case 'arrow_left':
          ev.keyCode = 37;
          break;

        case 'arrow_up':
          ev.keyCode = 38;
          break;

        case 'arrow_right':
          ev.keyCode = 39;
          break;

        case 'arrow_down':
          ev.keyCode = 40;
          break;

        case 'ctrl':
          if (window.navigator.platform.includes('Mac')) {
            ev.keyCode = 91;
          } else {
            ev.keyCode = 17;
          }
          break;

        case 'shift':
          ev.keyCode = 16;
          break;

        case 'backspace':
          ev.keyCode = 8;
          break;

        case 'delete':
          ev.keyCode = 46;
          break;

        case 'space':
          ev.keyCode = 32;
          break;

        case 'x':
          ev.keyCode = 88;
          break;

        case 'c':
          ev.keyCode = 67;
          break;

        case 'v':
          ev.keyCode = 86;
          break;

        default:
          throw new Error(`Unrecognised key name: ${key}`);
      }
    } else if (typeof key === 'number') {
      ev.keyCode = key;
    }
    //    ev.originalEvent = {}; //needed as long Handsontable searches for event.originalEvent
    $.extend(ev, extend);
    $(document.activeElement).simulate(type, ev);
  };
};

const keyDown = handsontableKeyTriggerFactory('keydown');
/* harmony export (immutable) */ __webpack_exports__["keyDown"] = keyDown;

const keyUp = handsontableKeyTriggerFactory('keyup');
/* harmony export (immutable) */ __webpack_exports__["keyUp"] = keyUp;


/**
 * Presses keyDown, then keyUp
 */
function keyDownUp(key, extend) {
  if (typeof key === 'string' && key.indexOf('shift+') > -1) {
    keyDown('shift');
  }

  keyDown(key, extend);
  keyUp(key, extend);

  if (typeof key === 'string' && key.indexOf('shift+') > -1) {
    keyUp('shift');
  }
};

/**
 * Returns current value of the keyboard proxy textarea
 * @return {String}
 */
function keyProxy() {
  return spec().$container.find('textarea.handsontableInput');
};

function serveImmediatePropagation(event) {
  if (event != null && event.isImmediatePropagationEnabled == null) {
    event.stopImmediatePropagation = function () {
      this.isImmediatePropagationEnabled = false;
      this.cancelBubble = true;
    };
    event.isImmediatePropagationEnabled = true;
    event.isImmediatePropagationStopped = function () {
      return !this.isImmediatePropagationEnabled;
    };
  }

  return event;
};

function autocompleteEditor() {
  return spec().$container.find('.handsontableInput');
};

/**
 * Sets text cursor inside keyboard proxy
 */
function setCaretPosition(pos) {
  var el = keyProxy()[0];

  if (el.setSelectionRange) {
    el.focus();
    el.setSelectionRange(pos, pos);
  } else if (el.createTextRange) {
    var range = el.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
};

/**
 * Returns autocomplete instance
 */
function autocomplete() {
  return spec().$container.find('.autocompleteEditor');
};

/**
 * Triggers paste string on current selection
 */
function triggerPaste(str) {
  spec().$container.data('handsontable').getPlugin('CopyPaste').paste(str);
};

/**
 * Calls a method in current Handsontable instance, returns its output
 * @param method
 * @return {Function}
 */
function handsontableMethodFactory(method) {
  return function () {
    var instance;
    try {
      instance = spec().$container.handsontable('getInstance');
    } catch (err) {
      console.error(err);
    }

    if (instance) {
      if (method === 'destroy') {
        spec().$container.removeData();
      }
    } else {
      if (method === 'destroy') {
        return; // we can forgive this... maybe it was destroyed in the test
      }
      throw new Error('Something wrong with the test spec: Handsontable instance not found');
    }

    return instance[method](...arguments);
  };
};

const addHook = handsontableMethodFactory('addHook');
/* harmony export (immutable) */ __webpack_exports__["addHook"] = addHook;

const alter = handsontableMethodFactory('alter');
/* harmony export (immutable) */ __webpack_exports__["alter"] = alter;

const colToProp = handsontableMethodFactory('colToProp');
/* harmony export (immutable) */ __webpack_exports__["colToProp"] = colToProp;

const countCols = handsontableMethodFactory('countCols');
/* harmony export (immutable) */ __webpack_exports__["countCols"] = countCols;

const countEmptyCols = handsontableMethodFactory('countEmptyCols');
/* harmony export (immutable) */ __webpack_exports__["countEmptyCols"] = countEmptyCols;

const countEmptyRows = handsontableMethodFactory('countEmptyRows');
/* harmony export (immutable) */ __webpack_exports__["countEmptyRows"] = countEmptyRows;

const countRows = handsontableMethodFactory('countRows');
/* harmony export (immutable) */ __webpack_exports__["countRows"] = countRows;

const countSourceCols = handsontableMethodFactory('countSourceCols');
/* harmony export (immutable) */ __webpack_exports__["countSourceCols"] = countSourceCols;

const countSourceRows = handsontableMethodFactory('countSourceRows');
/* harmony export (immutable) */ __webpack_exports__["countSourceRows"] = countSourceRows;

const deselectCell = handsontableMethodFactory('deselectCell');
/* harmony export (immutable) */ __webpack_exports__["deselectCell"] = deselectCell;

const destroy = handsontableMethodFactory('destroy');
/* harmony export (immutable) */ __webpack_exports__["destroy"] = destroy;

const destroyEditor = handsontableMethodFactory('destroyEditor');
/* harmony export (immutable) */ __webpack_exports__["destroyEditor"] = destroyEditor;

const emptySelectedCells = handsontableMethodFactory('emptySelectedCells');
/* harmony export (immutable) */ __webpack_exports__["emptySelectedCells"] = emptySelectedCells;

const getActiveEditor = handsontableMethodFactory('getActiveEditor');
/* harmony export (immutable) */ __webpack_exports__["getActiveEditor"] = getActiveEditor;

const getCell = handsontableMethodFactory('getCell');
/* harmony export (immutable) */ __webpack_exports__["getCell"] = getCell;

const getCellEditor = handsontableMethodFactory('getCellEditor');
/* harmony export (immutable) */ __webpack_exports__["getCellEditor"] = getCellEditor;

const getCellMeta = handsontableMethodFactory('getCellMeta');
/* harmony export (immutable) */ __webpack_exports__["getCellMeta"] = getCellMeta;

const getCellMetaAtRow = handsontableMethodFactory('getCellMetaAtRow');
/* harmony export (immutable) */ __webpack_exports__["getCellMetaAtRow"] = getCellMetaAtRow;

const getCellRenderer = handsontableMethodFactory('getCellRenderer');
/* harmony export (immutable) */ __webpack_exports__["getCellRenderer"] = getCellRenderer;

const getCellsMeta = handsontableMethodFactory('getCellsMeta');
/* harmony export (immutable) */ __webpack_exports__["getCellsMeta"] = getCellsMeta;

const getCellValidator = handsontableMethodFactory('getCellValidator');
/* harmony export (immutable) */ __webpack_exports__["getCellValidator"] = getCellValidator;

const getColHeader = handsontableMethodFactory('getColHeader');
/* harmony export (immutable) */ __webpack_exports__["getColHeader"] = getColHeader;

const getCopyableData = handsontableMethodFactory('getCopyableData');
/* harmony export (immutable) */ __webpack_exports__["getCopyableData"] = getCopyableData;

const getCopyableText = handsontableMethodFactory('getCopyableText');
/* harmony export (immutable) */ __webpack_exports__["getCopyableText"] = getCopyableText;

const getData = handsontableMethodFactory('getData');
/* harmony export (immutable) */ __webpack_exports__["getData"] = getData;

const getDataAtCell = handsontableMethodFactory('getDataAtCell');
/* harmony export (immutable) */ __webpack_exports__["getDataAtCell"] = getDataAtCell;

const getDataAtCol = handsontableMethodFactory('getDataAtCol');
/* harmony export (immutable) */ __webpack_exports__["getDataAtCol"] = getDataAtCol;

const getDataAtRow = handsontableMethodFactory('getDataAtRow');
/* harmony export (immutable) */ __webpack_exports__["getDataAtRow"] = getDataAtRow;

const getDataAtRowProp = handsontableMethodFactory('getDataAtRowProp');
/* harmony export (immutable) */ __webpack_exports__["getDataAtRowProp"] = getDataAtRowProp;

const getDataType = handsontableMethodFactory('getDataType');
/* harmony export (immutable) */ __webpack_exports__["getDataType"] = getDataType;

const getInstance = handsontableMethodFactory('getInstance');
/* harmony export (immutable) */ __webpack_exports__["getInstance"] = getInstance;

const getRowHeader = handsontableMethodFactory('getRowHeader');
/* harmony export (immutable) */ __webpack_exports__["getRowHeader"] = getRowHeader;

const getSelected = handsontableMethodFactory('getSelected');
/* harmony export (immutable) */ __webpack_exports__["getSelected"] = getSelected;

const getSelectedLast = handsontableMethodFactory('getSelectedLast');
/* harmony export (immutable) */ __webpack_exports__["getSelectedLast"] = getSelectedLast;

const getSelectedRange = handsontableMethodFactory('getSelectedRange');
/* harmony export (immutable) */ __webpack_exports__["getSelectedRange"] = getSelectedRange;

const getSelectedRangeLast = handsontableMethodFactory('getSelectedRangeLast');
/* harmony export (immutable) */ __webpack_exports__["getSelectedRangeLast"] = getSelectedRangeLast;

const getSourceData = handsontableMethodFactory('getSourceData');
/* harmony export (immutable) */ __webpack_exports__["getSourceData"] = getSourceData;

const getSourceDataArray = handsontableMethodFactory('getSourceDataArray');
/* harmony export (immutable) */ __webpack_exports__["getSourceDataArray"] = getSourceDataArray;

const getSourceDataAtCell = handsontableMethodFactory('getSourceDataAtCell');
/* harmony export (immutable) */ __webpack_exports__["getSourceDataAtCell"] = getSourceDataAtCell;

const getSourceDataAtCol = handsontableMethodFactory('getSourceDataAtCol');
/* harmony export (immutable) */ __webpack_exports__["getSourceDataAtCol"] = getSourceDataAtCol;

const getSourceDataAtRow = handsontableMethodFactory('getSourceDataAtRow');
/* harmony export (immutable) */ __webpack_exports__["getSourceDataAtRow"] = getSourceDataAtRow;

const getValue = handsontableMethodFactory('getValue');
/* harmony export (immutable) */ __webpack_exports__["getValue"] = getValue;

const loadData = handsontableMethodFactory('loadData');
/* harmony export (immutable) */ __webpack_exports__["loadData"] = loadData;

const populateFromArray = handsontableMethodFactory('populateFromArray');
/* harmony export (immutable) */ __webpack_exports__["populateFromArray"] = populateFromArray;

const propToCol = handsontableMethodFactory('propToCol');
/* harmony export (immutable) */ __webpack_exports__["propToCol"] = propToCol;

const removeCellMeta = handsontableMethodFactory('removeCellMeta');
/* harmony export (immutable) */ __webpack_exports__["removeCellMeta"] = removeCellMeta;

const render = handsontableMethodFactory('render');
/* harmony export (immutable) */ __webpack_exports__["render"] = render;

const selectCell = handsontableMethodFactory('selectCell');
/* harmony export (immutable) */ __webpack_exports__["selectCell"] = selectCell;

const setCellMeta = handsontableMethodFactory('setCellMeta');
/* harmony export (immutable) */ __webpack_exports__["setCellMeta"] = setCellMeta;

const setDataAtCell = handsontableMethodFactory('setDataAtCell');
/* harmony export (immutable) */ __webpack_exports__["setDataAtCell"] = setDataAtCell;

const setDataAtRowProp = handsontableMethodFactory('setDataAtRowProp');
/* harmony export (immutable) */ __webpack_exports__["setDataAtRowProp"] = setDataAtRowProp;

const spliceCellsMeta = handsontableMethodFactory('spliceCellsMeta');
/* harmony export (immutable) */ __webpack_exports__["spliceCellsMeta"] = spliceCellsMeta;

const spliceCol = handsontableMethodFactory('spliceCol');
/* harmony export (immutable) */ __webpack_exports__["spliceCol"] = spliceCol;

const spliceRow = handsontableMethodFactory('spliceRow');
/* harmony export (immutable) */ __webpack_exports__["spliceRow"] = spliceRow;

const updateSettings = handsontableMethodFactory('updateSettings');
/* harmony export (immutable) */ __webpack_exports__["updateSettings"] = updateSettings;


/**
 * Returns column width for HOT container
 * @param $elem
 * @param col
 * @returns {Number}
 */
function colWidth($elem, col) {
  var TR = $elem[0].querySelector('TBODY TR');
  var cell;

  if (TR) {
    cell = TR.querySelectorAll('TD')[col];
  } else {
    cell = $elem[0].querySelector('THEAD TR').querySelectorAll('TH')[col];
  }

  if (!cell) {
    throw new Error(`Cannot find table column of index '${col}'`);
  }

  return cell.offsetWidth;
}

/**
 * Returns row height for HOT container
 * @param $elem
 * @param row
 * @returns {Number}
 */
function rowHeight($elem, row) {
  var TD;

  if (row >= 0) {
    TD = $elem[0].querySelector(`tbody tr:nth-child(${row + 1}) td`);
  } else {
    TD = $elem[0].querySelector(`thead tr:nth-child(${Math.abs(row)})`);
  }

  if (!TD) {
    throw new Error(`Cannot find table row of index '${row}'`);
  }

  return Handsontable.dom.outerHeight(TD);
}

/**
 * Returns value that has been rendered in table cell
 * @param {Number} trIndex
 * @param {Number} tdIndex
 * @returns {String}
 */
function getRenderedValue(trIndex, tdIndex) {
  return spec().$container.find('tbody tr').eq(trIndex).find('td').eq(tdIndex).html();
}

/**
 * Returns nodes that have been rendered in table cell
 * @param {Number} trIndex
 * @param {Number} tdIndex
 * @returns {String}
 */
function getRenderedContent(trIndex, tdIndex) {
  return spec().$container.find('tbody tr').eq(trIndex).find('td').eq(tdIndex).children();
}

/**
 * Create numerical data values for the table
 * @param rowCount
 * @param colCount
 * @returns {Array}
 */
function createNumericData(rowCount, colCount) {
  rowCount = typeof rowCount === 'number' ? rowCount : 100;
  colCount = typeof colCount === 'number' ? colCount : 4;

  var rows = [],
      i,
      j;

  for (i = 0; i < rowCount; i++) {
    var row = [];

    for (j = 0; j < colCount; j++) {
      row.push(i + 1);
    }
    rows.push(row);
  }

  return rows;
}

/**
 * Model factory, which creates object with private properties, accessible by setters and getters.
 * Created for the purpose of testing HOT with Backbone-like Models
 * @param opts
 * @returns {{}}
 * @constructor
 */
function Model(opts) {
  var obj = {};

  var _data = $.extend({
    id: undefined,
    name: undefined,
    address: undefined
  }, opts);

  obj.attr = function (name, value) {
    if (typeof value === 'undefined') {
      return this.get(name);
    }

    return this.set(name, value);
  };

  obj.get = function (name) {
    return _data[name];
  };

  obj.set = function (name, value) {
    _data[name] = value;

    return this;
  };

  return obj;
}
/**
 * Factory which produces an accessor for objects of type "Model" (see above).
 * This function should be used to create accessor for a given property name and pass it as `data` option in column
 * configuration.
 *
 * @param name - name of the property for which an accessor function will be created
 * @returns {Function}
 */
function createAccessorForProperty(name) {
  return function (obj, value) {
    return obj.attr(name, value);
  };
}

function resizeColumn(displayedColumnIndex, width) {
  var $container = spec().$container;
  var $th = $container.find(`thead tr:eq(0) th:eq(${displayedColumnIndex})`);

  $th.simulate('mouseover');

  var $resizer = $container.find('.manualColumnResizer');
  var resizerPosition = $resizer.position();

  $resizer.simulate('mousedown', {
    clientX: resizerPosition.left
  });

  var delta = width - $th.width() - 2;
  var newPosition = resizerPosition.left + delta;
  $resizer.simulate('mousemove', {
    clientX: newPosition
  });

  $resizer.simulate('mouseup');
}

function resizeRow(displayedRowIndex, height) {
  var $container = spec().$container;
  var $th = $container.find(`tbody tr:eq(${displayedRowIndex}) th:eq(0)`);

  $th.simulate('mouseover');

  var $resizer = $container.find('.manualRowResizer');
  var resizerPosition = $resizer.position();

  $resizer.simulate('mousedown', {
    clientY: resizerPosition.top
  });

  var delta = height - $th.height() - 2;

  if (delta < 0) {
    delta = 0;
  }

  $resizer.simulate('mousemove', {
    clientY: resizerPosition.top + delta
  });

  $resizer.simulate('mouseup');
}

function moveSecondDisplayedRowBeforeFirstRow(container, secondDisplayedRowIndex) {
  var $mainContainer = container.parents('.handsontable').not('[class*=clone]').not('[class*=master]').first(),
      $rowHeaders = container.find('tbody tr th'),
      $firstRowHeader = $rowHeaders.eq(secondDisplayedRowIndex - 1),
      $secondRowHeader = $rowHeaders.eq(secondDisplayedRowIndex);

  $secondRowHeader.simulate('mouseover');
  var $manualRowMover = $mainContainer.find('.manualRowMover');

  if ($manualRowMover.length) {
    $manualRowMover.simulate('mousedown', {
      clientY: $manualRowMover[0].getBoundingClientRect().top
    });

    $manualRowMover.simulate('mousemove', {
      clientY: $manualRowMover[0].getBoundingClientRect().top - 20
    });

    $firstRowHeader.simulate('mouseover');
    $secondRowHeader.simulate('mouseup');
  }
}

function moveFirstDisplayedRowAfterSecondRow(container, firstDisplayedRowIndex) {
  var $mainContainer = container.parents('.handsontable').not('[class*=clone]').not('[class*=master]').first(),
      $rowHeaders = container.find('tbody tr th'),
      $firstRowHeader = $rowHeaders.eq(firstDisplayedRowIndex),
      $secondRowHeader = $rowHeaders.eq(firstDisplayedRowIndex + 1);

  $secondRowHeader.simulate('mouseover');
  var $manualRowMover = $mainContainer.find('.manualRowMover');

  if ($manualRowMover.length) {
    $manualRowMover.simulate('mousedown', {
      clientY: $manualRowMover[0].getBoundingClientRect().top
    });

    $manualRowMover.simulate('mousemove', {
      clientY: $manualRowMover[0].getBoundingClientRect().top + 20
    });

    $firstRowHeader.simulate('mouseover');
    $secondRowHeader.simulate('mouseup');
  }
}

function swapDisplayedColumns(container, from, to) {
  var $mainContainer = container.parents('.handsontable').not('[class*=clone]').not('[class*=master]').first();
  var $colHeaders = container.find('thead tr:eq(0) th');
  var $to = $colHeaders.eq(to);
  var $from = $colHeaders.eq(from);

  // Enter the second column header
  $from.simulate('mouseover');
  var $manualColumnMover = $mainContainer.find('.manualColumnMover');

  // Grab the second column
  $manualColumnMover.simulate('mousedown', {
    pageX: $manualColumnMover[0].getBoundingClientRect().left
  });

  // Drag the second column over the first column
  $manualColumnMover.simulate('mousemove', {
    pageX: $manualColumnMover[0].getBoundingClientRect().left - 20
  });

  $to.simulate('mouseover');

  // Drop the second column
  $from.simulate('mouseup');
}

function triggerTouchEvent(type, target, pageX, pageY) {
  var e = document.createEvent('TouchEvent');
  var targetCoords = target.getBoundingClientRect();
  var touches;
  var targetTouches;
  var changedTouches;

  if (!pageX && !pageY) {
    pageX = parseInt(targetCoords.left + 3, 10);
    pageY = parseInt(targetCoords.top + 3, 10);
  }

  var touch = document.createTouch(window, target, 0, pageX, pageY, pageX, pageY);

  if (type == 'touchend') {
    touches = document.createTouchList();
    targetTouches = document.createTouchList();
    changedTouches = document.createTouchList(touch);
  } else {
    touches = document.createTouchList(touch);
    targetTouches = document.createTouchList(touch);
    changedTouches = document.createTouchList(touch);
  }

  e.initTouchEvent(type, true, true, window, null, 0, 0, 0, 0, false, false, false, false, touches, targetTouches, changedTouches, 1, 0);
  target.dispatchEvent(e);
};

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["spec"] = spec;
/* eslint-disable import/prefer-default-export */
var currentSpec;

function spec() {
  return currentSpec;
};

function hot() {
  return spec().$container.data('handsontable');
};

// http://stackoverflow.com/questions/986937/how-can-i-get-the-browsers-scrollbar-sizes
const scrollbarWidth = function calculateScrollbarWidth() {
  const inner = document.createElement('div');

  inner.style.height = '200px';
  inner.style.width = '100%';

  const outer = document.createElement('div');

  outer.style.boxSizing = 'content-box';
  outer.style.height = '150px';
  outer.style.left = '0px';
  outer.style.overflow = 'hidden';
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  outer.style.width = '200px';
  outer.style.visibility = 'hidden';
  outer.appendChild(inner);

  (document.body || document.documentElement).appendChild(outer);
  const w1 = inner.offsetWidth;

  outer.style.overflow = 'scroll';

  let w2 = inner.offsetWidth;

  if (w1 === w2) {
    w2 = outer.clientWidth;
  }

  (document.body || document.documentElement).removeChild(outer);

  return w1 - w2;
}();

beforeEach(function () {
  currentSpec = this;

  var matchers = {
    toBeInArray() {
      return {
        compare(actual, expected) {
          return {
            pass: Array.isArray(expected) && expected.indexOf(actual) > -1
          };
        }
      };
    },
    toBeFunction() {
      return {
        compare(actual, expected) {
          return {
            pass: typeof actual === 'function'
          };
        }
      };
    },
    toBeAroundValue() {
      return {
        compare(actual, expected, diff) {
          diff = diff || 1;

          var pass = actual >= expected - diff && actual <= expected + diff;
          var message = `Expected ${actual} to be around ${expected} (between ${expected - diff} and ${expected + diff})`;

          if (!pass) {
            message = `Expected ${actual} NOT to be around ${expected} (between ${expected - diff} and ${expected + diff})`;
          }

          return {
            pass,
            message
          };
        }
      };
    },
    toBeVisibleInViewport() {
      return {
        compare(actual) {
          const viewport = hot().view.wt.wtTable.holder;
          const verticalPosition = actual.offsetTop - viewport.scrollTop + scrollbarWidth + actual.clientHeight;
          const horizontalPosition = actual.offsetLeft - viewport.scrollLeft + scrollbarWidth + actual.clientWidth;

          const pass = verticalPosition < viewport.offsetHeight && verticalPosition > 0 && horizontalPosition < viewport.offsetWidth && horizontalPosition > 0;

          return {
            pass,
            message: 'Expected the element to be visible in the Handsontable viewport'
          };
        }
      };
    },
    toBeVisibleAtTopOfViewport() {
      return {
        compare(actual) {
          const viewport = hot().view.wt.wtTable.holder;
          const verticalPosition = actual.offsetTop - viewport.scrollTop - 1;

          return {
            pass: verticalPosition === 0,
            message: 'Expected the element to be scrolled to the top of the Handsontable viewport'
          };
        }
      };
    },
    toBeVisibleAtBottomOfViewport() {
      return {
        compare(actual) {
          const viewport = hot().view.wt.wtTable.holder;
          const verticalPosition = actual.offsetTop - viewport.scrollTop + scrollbarWidth + actual.clientHeight + 1;

          return {
            pass: verticalPosition === viewport.offsetHeight,
            message: 'Expected the element to be scrolled to the bottom of the Handsontable viewport'
          };
        }
      };
    },
    toBeVisibleAtLeftOfViewport() {
      return {
        compare(actual) {
          const viewport = hot().view.wt.wtTable.holder;
          const horizontalPosition = viewport.scrollLeft - actual.offsetLeft;

          return {
            pass: horizontalPosition === 0,
            message: 'Expected the element to be scrolled to the top of the Handsontable viewport'
          };
        }
      };
    },
    toBeVisibleAtRightOfViewport() {
      return {
        compare(actual) {
          const viewport = hot().view.wt.wtTable.holder;
          const horizontalPosition = viewport.scrollLeft - actual.offsetLeft + actual.clientWidth - scrollbarWidth + 1;

          return {
            pass: horizontalPosition === viewport.offsetWidth,
            message: 'Expected the element to be scrolled to the top of the Handsontable viewport'
          };
        }
      };
    },
    toBeListFulfillingCondition() {
      const redColor = '\x1b[31m';
      const resetColor = '\x1b[0m';

      return {
        compare(checkedArray, conditionFunction) {
          if (typeof conditionFunction !== 'function') {
            throw Error('Parameter passed to `toBeListFulfillingCondition` should be a function.');
          }

          const isListWithValues = Array.isArray(checkedArray) || checkedArray.length > 0;
          const elementNotFulfillingCondition = checkedArray.find(element => !conditionFunction(element));
          const containsUndefined = isListWithValues && checkedArray.includes(undefined);
          const pass = isListWithValues && !containsUndefined && elementNotFulfillingCondition === undefined;
          let message;

          if (!isListWithValues) {
            message = 'Non-empty list should be passed as expect parameter.';
          } else if (containsUndefined) {
            message = `List ${redColor}${checkedArray.join(', ')}${resetColor} contains ${redColor}undefined${resetColor} value.`;
          } else if (elementNotFulfillingCondition !== undefined) {
            let entityValue = elementNotFulfillingCondition;

            if (typeof elementNotFulfillingCondition === 'string') {
              entityValue = `"${elementNotFulfillingCondition}"`;
            }

            message = `Entity ${redColor}${entityValue}${resetColor}, from list: ${redColor}${checkedArray.join(', ')}${resetColor} doesn't satisfy the condition.`;
          }

          return {
            pass,
            message
          };
        }
      };
    },
    toBeMatchToSelectionPattern() {
      const symbols = new Map([['C', 'current']]);

      return {
        compare(actualPattern) {
          const currentState = [];
          const rowsCount = hot().countRows();
          const colsCount = hot().countCols();
          const message = 'Expected the pattern selection to match to the visual state of the rendered selection.';

          if (!Array.isArray(actualPattern)) {
            return {
              pass: false,
              message
            };
          }

          for (let r = 0; r < rowsCount; r++) {
            const currentRowState = [];

            for (let c = 0; c < colsCount; c++) {
              if (!actualPattern[r] || !actualPattern[r][c]) {
                break;
              }

              const actualCell = actualPattern[r][c];

              if (actualCell === ' ') {
                currentRowState.push(' ');
              } else {
                const cell = hot().getCell(r, c);
                const layerName = parseInt(actualCell, 10);
                const isLayerChecking = !isNaN(layerName);
                let className;

                if (isLayerChecking) {
                  className = layerName === 0 ? 'area' : `area-${layerName <= 7 ? layerName : 7}`;
                } else {
                  className = symbols.get(actualCell);
                }

                if (cell.classList.contains(className)) {
                  currentRowState.push(actualCell);
                } else {
                  currentRowState.push('x');
                }
              }
            }
            currentState.push(currentRowState);
          }

          return {
            pass: JSON.stringify(currentState) === JSON.stringify(actualPattern),
            message
          };
        }
      };
    }
  };

  jasmine.addMatchers(matchers);

  if (document.activeElement && document.activeElement != document.body) {
    document.activeElement.blur();
  } else if (!document.activeElement) {
    // IE
    document.body.focus();
  }
});

afterEach(() => {
  window.scrollTo(0, 0);
});

/***/ })

/******/ });
//# sourceMappingURL=helpers.entry.js.map