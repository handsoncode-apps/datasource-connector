/*!
 * 
 * Version: 1.0.0
 * Release date: 01/03/2018 (built at 04/04/2018 12:50:37)
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
    this.order = {};
  }

  /**
   * Checks if the plugin is enabled in the settings.
   */
  isEnabled() {
    let enabled = !!this.hot.getSettings().dataSourceConnector;
    if (enabled) {
      let controllerUrl = this.hot.getSettings().dataSourceConnector.controllerUrl;
      this.hot.addHook('onDataSend', this.hot.getSettings().dataSourceConnector.onDataSend);
      this.http = new __WEBPACK_IMPORTED_MODULE_0__utils_http__["a" /* default */](controllerUrl);
      this.http.defaultHeaders = this.hot.getSettings().dataSourceConnector.requestHeaders;
      this.http.addListener((...args) => {
        this.hot.runHooks('onDataSend', args[0]);
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
    this.addHook('afterColumnSort', (column, order) => this.onAfterColumnSort(column, order));

    this.addHook('afterCreateRow', (index, amount, source) => this.onAfterCreateRow(index, amount, source));
    this.addHook('afterCreateCol', (index, amount, source) => this.onAfterCreateCol(index, amount, source));
    this.addHook('afterColumnMove', (columns, target) => this.onAfterColumnMove(columns, target));
    this.addHook('afterFilter', conditionsStack => this.onAfterFilter(conditionsStack));
    this.addHook('beforeRowMove', (rows, target) => this.onRowMove(rows, target));

    // The super method assigns the this.enabled property to true, which can be later used to check if plugin is already enabled.
    super.enablePlugin();
  }
  /**
   * The onAfterFilter method is called after filtering.
   *
   * @param {array} conditionsStack
   */
  onAfterFilter(conditionsStack) {
    var conditions = hot.getPlugin('filters').conditionCollection.exportAllConditions();
    conditions.forEach((item, index) => {
      conditions[index].column = this.colHeaders[conditionsStack[index].column];
    });

    this.filters = conditions;
    let uri = { order: this.order, filters: this.filters };
    this.http.post('/data', uri).then(response => {
      this._loadData(response);
    });
  }

  // move element in array from position to target
  _move(array, from, to) {
    if (to === from) {
      return array;
    }

    var target = array[from];
    var increment = to < from ? -1 : 1;

    for (var k = from; k !== to; k += increment) {
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
    var columnNames = [];
    var i = 0;
    for (i = 0; i < columns.length; i++) {
      columnNames.push(this.colHeaders[columns[i]]);
    }

    var colMoved = {
      columnNames,
      target
    };

    this.http.post('/move/column', colMoved).then(value => {
      this.colHeaders = value.data;
      // hot.updateSettings({colHeaders: value.data});
      // console.log(hot.getSettings());
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
    var payload = {
      index,
      amount,
      source
    };
    var sourceIndex = index === 0 ? 1 : 0;
    this.http.post('/create/column', payload).then(value => {
      var noOfRows = this.hot.getData().length;
      for (var row = 0; row < noOfRows; row++) {
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
    var removedCol = [];
    for (var i = 0; i < amount; i++) {
      removedCol.push(this.colHeaders[i + index]);
    }
    try {
      var value = await this.http.post('/remove/column', removedCol);
      if (value.data) {
        var response = await this.http.post('/data');
        this._loadData(response);
        return true;
      }
    } catch (err) {
      return false;
    }
  }

  /**
   * Method called after creating new row.
   *
   * @param {number} index
   * @param {number} amount
   * @param {string} source
   */
  onAfterCreateRow(index, amount, source) {
    var payload = {
      index,
      amount,
      source
    };
    this.http.post('/create/row', payload).then(value => {
      var row = this.hot.getData()[index];
      var sourceIndex = index === 1 ? 2 : 1;
      for (var col = 0; col < row.length; col++) {
        var column = this.hot.getCellMeta(sourceIndex, col).col_id;
        this.hot.setCellMeta(index, col, 'row_id', value.id);
        this.hot.setCellMeta(index, col, 'col_id', column);
        this.hot.setDataAtCell(index, col, value.data[column]);
      }
    });
  }

  /**
   * Method called after creating new row.
   *
   * @param {number} index
   * @param {number} amount
   */
  onRemoveRow(index, amount) {
    var rowsRemoved = [];
    for (var i = 0; i < amount; i++) {
      rowsRemoved.push(this.hot.getCellMeta(i + index, 1).row_id);
    }
    this.http.post('/remove/row', rowsRemoved).then(value => {
      if (!value) {
        return false;
      }
    });
  }

  /**
  * Method called after moving row.
  *
  * @param {array} rows
  * @param {number} target
  */
  onRowMove(rows, target) {
    var rowsMoved = [];
    for (var i = 0; i < rows.length; i++) {
      rowsMoved.push(this.hot.getCellMeta(rows[i], 1).row_id);
    };
    var payload = {
      rowsMoved,
      target
    };
    this.http.post('/move/row', payload);
  }

  /**
   * Method called after sorting column, event will be passed to backend.
   *
   * @param {number} column
   * @param {boolean} order
   */
  onAfterColumnSort(column, order) {
    this.order = order !== undefined ? { column: this.colHeaders[column], order: order === true ? 'ASC' : 'DESC' } : {};

    let uri = { order: this.order, filters: this.filters };
    this.http.post('/data', uri).then(response => {
      this._loadData(response);
    });
  }

  /**
   * Load data and setup all dedicated metadata for backend sync
   * @param {object} response
   */
  _loadData(response) {
    let responseData = response.data;
    let normalizedData = [];
    for (let row = 0; row < responseData.length; row++) {
      let item = [];
      // eslint-disable-next-line guard-for-in
      for (let columnName in responseData[row]) {
        item.push(responseData[row][columnName]);
      }
      normalizedData.push(item);
    }

    this.hot.loadData(normalizedData);

    let columnNames = [];

    // eslint-disable-next-line guard-for-in
    for (let columnName in responseData[0]) {
      columnNames.push(columnName);
    }

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
      this.http.post('/update', {
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
        listener(...args);
      });
    }
  }

  /**
     * make HTTP POST to url with payload data
     *
     * @param {string} url
     * @param {any} data
     */
  post(url, data) {
    var request = new __WEBPACK_IMPORTED_MODULE_0__request__["a" /* default */](this.defaultHeaders);
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
    var request = new __WEBPACK_IMPORTED_MODULE_0__request__["a" /* default */](this.defaultHeaders);
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