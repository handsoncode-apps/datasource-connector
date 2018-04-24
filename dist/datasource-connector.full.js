/*!
 * 
 * Version: 1.0.0
 * Release date: 01/03/2018 (built at 24/04/2018 12:29:33)
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("DatasourceConector", [], factory);
	else if(typeof exports === 'object')
		exports["DatasourceConector"] = factory();
	else
		root["DatasourceConector"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_http__ = __webpack_require__(1);


/**
 * @plugin DataSourceConnector
 * Note: keep in mind, that Handsontable instance creates one instance of the plugin class.
 *
 * @description
 * This plugin enable the backend side data management for handsontable instance
 */
class DataSourceConnector extends Handsontable.plugins.BasePlugin {

  // The argument passed to the constructor is the currently processed Handsontable instance object.
  constructor(hotInstance) {
    super(hotInstance);
    this.http = {};
    this.colHeaders = [];
    this.filters = [];
    this.sort = {};
  }

  /**
   * Checks if the plugin is enabled in the settings.
   */
  isEnabled() {
    let enabled = !!this.hot.getSettings().dataSourceConnector;
    if (enabled) {
      let controllerUrl = this.hot.getSettings().dataSourceConnector.controllerUrl;
      if (this.hot.getSettings().dataSourceConnector.onDataSend !== undefined) {
        this.hot.addHook('onDataSend', this.hot.getSettings().dataSourceConnector.onDataSend);
      }
      this.http = new __WEBPACK_IMPORTED_MODULE_0__utils_http__["a" /* default */](controllerUrl);
      this.http.defaultHeaders = this.hot.getSettings().dataSourceConnector.requestHeaders;
      const hotInstance = this.hot;
      this.http.addListener((...args) => {
        if (hotInstance !== undefined) {
          hotInstance.runHooks('onDataSend', args[0]);
        }
      });
    }
    return enabled;
  }

  /**
   * The enablePlugin method is triggered on the beforeInit hook. It should contain your initial plugin setup, along with
   * the hook connections.
   * Note, that this method is run only if the statement in the isEnabled method is true.
   */
  enablePlugin() {
    // disable build in sort and filter functions
    this.addHook('beforeColumnSort', () => false);
    this.addHook('beforeFilter', () => false);
    this.addHook('beforeRemoveCol', (index, amount) => this.onRemoveCol(index, amount));
    this.addHook('beforeRemoveRow', (index, amount) => this.onRemoveRow(index, amount));

    this.addHook('afterInit', () => this.onAfterInit());
    this.addHook('afterChange', (changes, source) => this.onAfterChange(changes, source));
    this.addHook('afterColumnSort', (column, sort) => this.onAfterColumnSort(column, sort));

    this.addHook('afterCreateRow', (index, amount, source) => this.onAfterCreateRow(index, amount, source));
    this.addHook('afterCreateCol', (index, amount, source) => this.onAfterCreateCol(index, amount, source));
    this.addHook('afterColumnMove', (columns, target) => this.onAfterColumnMove(columns, target));
    this.addHook('afterFilter', conditionsStack => this.onAfterFilter(conditionsStack));
    this.addHook('beforeRowMove', (rows, target) => this.onRowMove(rows, target));
    this.addHook('afterRowResize', (currentColumn, newSize, isDoubleClick) => this.onRowResize(currentColumn, newSize, isDoubleClick));
    this.addHook('afterMergeCells', (cellRange, mergeParent, auto) => this.onMergeCell(cellRange, mergeParent, auto));
    this.addHook('afterColumnResize', (currentColumn, newSize, isDoubleClick) => this.onColumnResize(currentColumn, newSize, isDoubleClick));
    this.addHook('beforeUnmergeCells', (cellRange, auto) => this.onUnmergeCells(cellRange, auto));

    this.addHook('afterSetCellMeta', (row, col, key, value) => this.onSetMeta(row, col, key, value));

    // The super method assigns the this.enabled property to true, which can be later used to check if plugin is already enabled.
    super.enablePlugin();
  }
  /**
   * The onAfterFilter method is called after filtering.
   *
   * @param {array} conditionsStack
   */
  onAfterFilter(conditionsStack) {
    let conditions = hot.getPlugin('filters').conditionCollection.exportAllConditions();
    conditions.forEach((item, index) => {
      conditions[index].column = this.colHeaders[conditionsStack[index].column];
    });

    this.filters = conditions;
    let uri = { sort: this.sort, filters: this.filters };
    this.http.post('/data', uri).then(response => {
      this._loadData(response);
    });
  }

  // move element in array from position to target
  _move(array, from, to) {
    if (to === from) {
      return array;
    }

    let target = array[from];
    let increment = to < from ? -1 : 1;

    for (let k = from; k !== to; k += increment) {
      array[k] = array[k + increment];
    }
    array[to] = target;
    return array;
  }

  /**
   * The onAfterColumnMove method is called after moving column.
   *
   * @param {array} columns
   * @param {number} target
   */
  onAfterColumnMove(columns, target) {

    let columnNames = [];
    let i = 0;
    for (i = 0; i < columns.length; i++) {
      columnNames.push(this.colHeaders[columns[i]]);
    }

    let colMoved = {
      columnNames,
      target
    };

    this.http.post('/column/move', colMoved).then(value => {
      this.colHeaders = value.data;
    });
  }

  /**
   * The onAfterCreateCol method is called after creating new column.
   *
   * @param {number} index
   * @param {number} amount
   * @param {string} source
   */
  onAfterCreateCol(index, amount, source) {
    let payload = {
      index,
      amount,
      source
    };
    let sourceIndex = index === 0 ? 1 : 0;
    this.http.put('/column', payload).then(value => {
      let noOfRows = this.hot.getData().length;
      for (let row = 0; row < noOfRows; row++) {
        this.hot.setCellMeta(row, index, 'row_id', this.hot.getCellMeta(row, sourceIndex).row_id);
        this.hot.setCellMeta(row, index, 'col_id', value.name);
      }
    });
  }
  /**
   * The onAfterRemoveCol method is called after removing column.
   *
   * @param {number} index
   * @param {number} amount
   * */
  async onRemoveCol(index, amount) {
    let removedCol = [];
    for (let i = 0; i < amount; i++) {
      removedCol.push(this.colHeaders[i + index]);
    }
    try {
      let value = await this.http.delete('/column', removedCol);
      if (value.data) {
        let response = await this.http.post('/data');
        this._loadData(response);
        return true;
      }
    } catch (err) {
      return false;
    }
    return false;
  }

  /**
   * Method called after creating new row.
   *
   * @param {number} index
   * @param {number} amount
   * @param {string} source
   */
  onAfterCreateRow(index, amount, source) {
    let payload = {
      index,
      amount,
      source
    };
    this.http.put('/row', payload).then(value => {
      let row = this.hot.getData()[index];
      let sourceIndex = index === 1 ? 2 : 1;
      for (let col = 0; col < row.length; col++) {
        let column = this.hot.getCellMeta(sourceIndex, col).col_id;
        this.hot.setCellMeta(index, col, 'row_id', value.id);
        this.hot.setCellMeta(index, col, 'col_id', column);
        this.hot.setDataAtCell(index, col, value.data[column]);
      }
    });
  }

  /**
   * Method called after resizing column.
   *
   * @param {number} currentColumn
   * @param {number} newSize
   * @param {boolean} isDoubleClick
   */
  onColumnResize(currentColumn, newSize) {
    let uri = {
      column: this.hot.getCellMeta(1, currentColumn).col_id,
      size: newSize
    };
    this.http.post('/column/resize', uri);
  }

  /**
   * Method called after creating new row.
   *
   * @param {number} index
   * @param {number} amount
   */
  onRemoveRow(index, amount) {
    let rowsRemoved = [];
    for (let i = 0; i < amount; i++) {
      rowsRemoved.push(this.hot.getCellMeta(i + index, 1).row_id);
    }
    this.http.delete('/row', rowsRemoved).then(value => {
      if (!value) {
        return false;
      }
      return true;
    });
  }

  /**
  * Method called after moving row.
  *
  * @param {array} rows
  * @param {number} target
  */
  onRowMove(rows, target) {
    let rowsMoved = [];
    for (let i = 0; i < rows.length; i++) {
      rowsMoved.push(this.hot.getCellMeta(rows[i], 1).row_id);
    };
    let payload = {
      rowsMoved,
      target
    };
    this.http.post('/row/move', payload);
  }

  /**
   * Method called after resizing row, event will be passed to backend.
   *
   * @param {number} currentRow
   * @param {number} newSize
   */
  onRowResize(currentRow, newSize) {
    let uri = {
      row: this.hot.getCellMeta(currentRow, 1).row_id,
      size: newSize
    };
    this.http.post('/row/resize', uri);
  }

  /**
   * Method called after sorting column, event will be passed to backend.
   *
   * @param {number} column
   * @param {boolean} order
   */
  onAfterColumnSort(column, order) {
    this.sort = order !== undefined ? { column: this.colHeaders[column], order: order === true ? 'ASC' : 'DESC' } : {};

    let uri = { sort: this.sort, filters: this.filters };
    this.http.post('/data', uri).then(response => {
      this._loadData(response);
    });
  }

  /**
   * Method called after merging cells, event will be passed to backend.
   *
   * @param {cellRange} CellRange
   * @param {mergeParent} Object
   * @param {auto} boolean
   */
  onMergeCell(cellRange, mergeParent) {
    let mergedParent = {
      column: this.hot.getCellMeta(mergeParent.row, mergeParent.col).col_id,
      row: this.hot.getCellMeta(mergeParent.row, mergeParent.col).row_id
    };
    let mergedCells = [];

    let range = this._normalizeRange(cellRange);

    for (let i = range.from.row; i <= range.to.row; i++) {
      for (let j = range.from.col; j <= range.to.col; j++) {
        mergedCells.push({ column: this.hot.getCellMeta(i, j).col_id, row: this.hot.getCellMeta(i, j).row_id });
      }
    }
    this.http.post('/cell/merge', {
      mergedParent,
      mergedCells
    });
  }

  /**
   * Normalize cell range
   * @param {*} cellRange
   */
  _normalizeRange(cellRange) {
    let from;
    let to;
    if (cellRange.from.row < cellRange.to.row) {
      from = cellRange.from;
      to = cellRange.to;
    } else if (cellRange.from.row > cellRange.to.row) {
      from = cellRange.to;
      to = cellRange.from;
    } else if (cellRange.from.row === cellRange.to.row) {
      if (cellRange.from.col > cellRange.to.col) {
        from = cellRange.to;
        to = cellRange.from;
      } else {
        from = cellRange.from;
        to = cellRange.to;
      }
    }
    return { from, to };
  }

  onUnmergeCells(cellRange) {
    let mergedParent = {
      column: this.hot.getCellMeta(cellRange.highlight.row, cellRange.highlight.col).col_id,
      row: this.hot.getCellMeta(cellRange.highlight.row, cellRange.highlight.col).row_id
    };
    let mergedCells = [];
    for (let i = cellRange.from.row; i <= cellRange.to.row; i++) {
      for (let j = cellRange.from.col; j <= cellRange.to.col; j++) {
        mergedCells.push({ column: this.hot.getCellMeta(i, j).col_id, row: this.hot.getCellMeta(i, j).row_id });
      }
    }
    this.http.post('/cell/unmerge', {
      mergedParent,
      mergedCells
    });
  }

  /**
   * Load data and setup all dedicated metadata for backend sync
   * @param {object} response
   */
  _loadData(response) {
    let responseData = response.data;
    let normalizedData = responseData.map(value => Object.values(value));
    this.hot.loadData(normalizedData);

    let columnNames = Object.keys(responseData[0]);

    this.colHeaders = columnNames;

    for (let row = 0; row < responseData.length; row++) {
      for (let column = 0; column < columnNames.length; column++) {
        this.hot.setCellMeta(row, column, 'row_id', responseData[row][response.rowId]);
        this.hot.setCellMeta(row, column, 'col_id', columnNames[column]);
      }
    }
  }

  /**
   * Method called after Handsontable instance initiation
   */
  onAfterInit() {
    this.http.get('/settings').then(response => {
      this.hot.updateSettings(response.data);
    });
    this.http.post('/data').then(response => {
      this._loadData(response);
    });
  }

  /**
  * Called after cell meta is changed.
  *
  * @param {Number} row
  * @param {Number} col
  * @param {String} key
  * @param {*} value
  */
  onSetMeta(row, col, key, value) {
    if (key !== 'col_id' && key !== 'row_id') {
      let uri = { row: this.hot.getCellMeta(row, col).row_id, column: this.hot.getCellMeta(row, col).col_id, key, value };
      this.http.post('/cell/meta', uri);
    }
  }

  /**
   * The disablePlugin method is used to disable the plugin. Reset all of your classes properties to their default values here.
   */
  disablePlugin() {
    // The super method takes care of clearing the hook connections and assigning the 'false' value to the 'this.enabled' property.
    super.disablePlugin();
  }

  /**
   * The updatePlugin method is called on the afterUpdateSettings hook (unless the updateSettings method turned the plugin off).
   * It should contain all the stuff your plugin needs to do to work properly after the Handsontable instance settings were modified.
   */
  updatePlugin() {

    // The updatePlugin method needs to contain all the code needed to properly re-enable the plugin. In most cases simply disabling and enabling the plugin should do the trick.
    this.disablePlugin();
    this.enablePlugin();

    super.updatePlugin();
  }

  /**
   * The afterChange hook callback.
   *
   * @param {Array} changes Array of changes.
   * @param {String} source Describes the source of the change.
   */
  onAfterChange(changes, source) {
    if (changes) {
      let changeItems = [];
      for (let i = 0; i < changes.length; i++) {
        let cellMeta = this.hot.getCellMeta(changes[i][0], changes[i][1]);
        let item = {
          row: cellMeta.row_id,
          column: cellMeta.col_id,
          oldValue: changes[i][2],
          newValue: changes[i][3],
          meta: cellMeta
        };
        delete item.meta.instance;
        changeItems.push(item);
      }
      this.http.post('/cell', {
        changes: changeItems,
        source
      });
    }
  }

  /**
   * The destroy method should de-assign all of your properties.
   */
  destroy() {
    // The super method takes care of de-assigning the event callbacks, plugin hooks and clearing all the plugin properties.
    super.destroy();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (DataSourceConnector);

// register plugin
Handsontable.plugins.registerPlugin('DataSourceConnector', DataSourceConnector);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__request__ = __webpack_require__(2);


/**
 * Send the xhr request to server
 *
 * @param {Request} obj Request object
 * @returns {Promise}
 */
class Http {

  constructor(controllerUrl) {
    this.controllerUrl = controllerUrl;
    this.listeners = [];
    this.defaultHeaders = {};
  }

  /**
     * make a callback function that listen for HTTP events
     *
     * @param {function} callback
     */
  addListener(callback) {
    if (typeof callback === 'function' || false) {
      this.listeners.push(callback);
    }
  }

  /**
     * this method emit the onDataSend event to listeners
     *
     * @param {any} args
     */
  onDataSend(...args) {
    if (this.listeners && this.listeners.length) {
      this.listeners.forEach(listener => {
        setTimeout(() => {
          listener(...args);
        }, 5);
      });
    }
  }

  /**
   * make HTTP DELETE to url with payload data
   *
   * @param {string} url
   * @param {any} data
   */
  delete(url, data) {
    let request = new __WEBPACK_IMPORTED_MODULE_0__request__["a" /* default */](this.defaultHeaders);
    request.url = this.controllerUrl + url;
    request.method = 'DELETE';
    request.body = JSON.stringify(data);

    return this.request(request).then(value => {
      this.onDataSend({ request, response: JSON.parse(value) });
      return JSON.parse(value);
    });
  }

  /**
     * make HTTP PUT to url with payload data
     *
     * @param {string} url
     * @param {any} data
     */
  put(url, data) {
    let request = new __WEBPACK_IMPORTED_MODULE_0__request__["a" /* default */](this.defaultHeaders);
    request.url = this.controllerUrl + url;
    request.method = 'PUT';
    request.body = JSON.stringify(data);

    return this.request(request).then(value => {
      this.onDataSend({ request, response: JSON.parse(value) });
      return JSON.parse(value);
    });
  }

  /**
     * make HTTP POST to url with payload data
     *
     * @param {string} url
     * @param {any} data
     */
  post(url, data) {
    let request = new __WEBPACK_IMPORTED_MODULE_0__request__["a" /* default */](this.defaultHeaders);
    request.url = this.controllerUrl + url;
    request.method = 'POST';
    request.body = JSON.stringify(data);

    return this.request(request).then(value => {
      this.onDataSend({ request, response: JSON.parse(value) });
      return JSON.parse(value);
    });
  }

  /**
     * make HTTP GET call on url
     *
     * @param {string} url
     */
  get(url) {
    let request = new __WEBPACK_IMPORTED_MODULE_0__request__["a" /* default */](this.defaultHeaders);
    request.url = this.controllerUrl + url;

    return this.request(request).then(value => {
      this.onDataSend({ request, response: JSON.parse(value) });
      return JSON.parse(value);
    });
  }

  /**
    *
    * @param {object} obj
    */
  request(obj) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(obj.method || 'GET', obj.url);
      if (obj.headers) {
        Object.keys(obj.headers).forEach(key => {
          xhr.setRequestHeader(key, obj.headers[key]);
        });
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send(obj.body);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Http;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * This class represents the http request call in xhr context
 */
class Request {
  constructor(headers) {
    this.url = '';
    this.method = 'GET';
    this.headers = headers !== undefined ? headers : { 'Content-Type': 'application/json' };
    this.body = '';
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Request;


/***/ })
/******/ ])["default"];
});