/*!
 * 
 * Version: 1.0.0
 * Release date: 01/03/2018 (built at 26/04/2018 13:08:24)
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Handsontable"));
	else if(typeof define === 'function' && define.amd)
		define("DatasourceConector", ["Handsontable"], factory);
	else if(typeof exports === 'object')
		exports["DatasourceConector"] = factory(require("Handsontable"));
	else
		root["DatasourceConector"] = factory(root["Handsontable"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_1 = __importDefault(__webpack_require__(1));
var Handsontable_1 = __webpack_require__(5);
/**
* @plugin DataSourceConnector
 * Note: keep in mind, that Handsontable instance creates one instance of the plugin class.
 *
 * @description
 * This plugin enable the backend side data management for handsontable instance
 */
var DataSourceConnector = /** @class */ (function (_super) {
    __extends(DataSourceConnector, _super);
    // The argument passed to the constructor is the currently processed Handsontable instance object.
    function DataSourceConnector(hotInstance) {
        var _this = _super.call(this, hotInstance) || this;
        _this.hotInstance = hotInstance;
        _this.colHeaders = [];
        _this.filters = [];
        _this.sort = {};
        return _this;
    }
    /**
     * Checks if the plugin is enabled in the settings.
     */
    DataSourceConnector.prototype.isEnabled = function () {
        var enabled = !!this.hotInstance.getSettings().dataSourceConnector;
        if (enabled) {
            var controllerUrl = this.hotInstance.getSettings().dataSourceConnector.controllerUrl;
            if (this.hotInstance.getSettings().dataSourceConnector.onDataSend !== undefined) {
                this.hotInstance.addHook('onDataSend', this.hotInstance.getSettings().dataSourceConnector.onDataSend);
            }
            this.http = new http_1["default"](controllerUrl);
            this.http.defaultHeaders = this.hotInstance.getSettings().dataSourceConnector.requestHeaders;
            var hotInstance = this.hot;
            var that_1 = this;
            this.http.addListener(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (that_1.hotInstance !== undefined) {
                    that_1.hotInstance.runHooks('onDataSend', args[0]);
                }
            });
        }
        return enabled;
    };
    /**
     * The enablePlugin method is triggered on the beforeInit hook. It should contain your initial plugin setup, along with
     * the hook connections.
     * Note, that this method is run only if the statement in the isEnabled method is true.
     */
    DataSourceConnector.prototype.enablePlugin = function () {
        var _this = this;
        // disable build in sort and filter functions
        this.addHook('beforeColumnSort', function () { return false; });
        this.addHook('beforeFilter', function () { return false; });
        this.addHook('beforeRemoveCol', function (index, amount) { return _this.onRemoveCol(index, amount); });
        this.addHook('beforeRemoveRow', function (index, amount) { return _this.onRemoveRow(index, amount); });
        this.addHook('afterInit', function () { return _this.onAfterInit(); });
        this.addHook('afterChange', function (changes, source) { return _this.onAfterChange(changes, source); });
        this.addHook('afterColumnSort', function (column, sort) { return _this.onAfterColumnSort(column, sort); });
        this.addHook('afterCreateRow', function (index, amount, source) { return _this.onAfterCreateRow(index, amount, source); });
        this.addHook('afterCreateCol', function (index, amount, source) { return _this.onAfterCreateCol(index, amount, source); });
        this.addHook('afterColumnMove', function (columns, target) { return _this.onAfterColumnMove(columns, target); });
        this.addHook('afterFilter', function (conditionsStack) { return _this.onAfterFilter(conditionsStack); });
        this.addHook('beforeRowMove', function (rows, target) { return _this.onRowMove(rows, target); });
        this.addHook('afterRowResize', function (currentColumn, newSize, isDoubleClick) { return _this.onRowResize(currentColumn, newSize); });
        this.addHook('afterMergeCells', function (cellRange, mergeParent, auto) { return _this.onMergeCell(cellRange, mergeParent); });
        this.addHook('afterColumnResize', function (currentColumn, newSize, isDoubleClick) { return _this.onColumnResize(currentColumn, newSize); });
        this.addHook('beforeUnmergeCells', function (cellRange, auto) { return _this.onUnmergeCells(cellRange); });
        this.addHook('afterSetCellMeta', function (row, col, key, value) { return _this.onSetMeta(row, col, key, value); });
        // The super method assigns the this.enabled property to true, which can be later used to check if plugin is already enabled.
        _super.prototype.enablePlugin.call(this);
    };
    /**
     * The onAfterFilter method is called after filtering.
     *
     * @param {array} conditionsStack
     */
    DataSourceConnector.prototype.onAfterFilter = function (conditionsStack) {
        var _this = this;
        var conditions = this.hot.getPlugin('filters').conditionCollection.exportAllConditions();
        conditions.forEach(function (item, index) {
            conditions[index].column = _this.colHeaders[conditionsStack[index].column];
        });
        this.filters = conditions;
        var uri = { sort: this.sort, filters: this.filters };
        this.http.post('/data', uri).then(function (response) {
            _this.loadData(response);
        });
    };
    // move element in array from position to target
    DataSourceConnector.prototype.move = function (array, from, to) {
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
    };
    /**
     * The onAfterColumnMove method is called after moving column.
     *
     * @param {array} columns
     * @param {number} target
     */
    DataSourceConnector.prototype.onAfterColumnMove = function (columns, target) {
        var _this = this;
        var columnNames = [];
        var i = 0;
        for (i = 0; i < columns.length; i++) {
            columnNames.push(this.colHeaders[columns[i]]);
        }
        var colMoved = {
            columnNames: columnNames,
            target: target
        };
        this.http.post('/column/move', colMoved)
            .then(function (value) {
            _this.colHeaders = value.data;
        });
    };
    /**
     * The onAfterCreateCol method is called after creating new column.
     *
     * @param {number} index
     * @param {number} amount
     * @param {string} source
     */
    DataSourceConnector.prototype.onAfterCreateCol = function (index, amount, source) {
        var _this = this;
        var payload = {
            index: index,
            amount: amount,
            source: source
        };
        var sourceIndex = index === 0 ? 1 : 0;
        this.http.put('/column', payload)
            .then(function (value) {
            var noOfRows = _this.hot.getData().length;
            for (var row = 0; row < noOfRows; row++) {
                _this.hotInstance.setCellMeta(row, index, 'row_id', _this.hotInstance.getCellMeta(row, sourceIndex).row_id);
                _this.hotInstance.setCellMeta(row, index, 'col_id', value.name);
            }
        });
    };
    /**
     * The onAfterRemoveCol method is called after removing column.
     *
     * @param {number} index
     * @param {number} amount
     * */
    DataSourceConnector.prototype.onRemoveCol = function (index, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var removedCol, i, value, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        removedCol = [];
                        for (i = 0; i < amount; i++) {
                            removedCol.push(this.colHeaders[i + index]);
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.http["delete"]('/column', removedCol)];
                    case 2:
                        value = _a.sent();
                        if (!value.data) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.http.post('/data')];
                    case 3:
                        response = _a.sent();
                        this.loadData(response);
                        return [2 /*return*/, true];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * Method called after creating new row.
     *
     * @param {number} index
     * @param {number} amount
     * @param {string} source
     */
    DataSourceConnector.prototype.onAfterCreateRow = function (index, amount, source) {
        var _this = this;
        var payload = {
            index: index,
            amount: amount,
            source: source
        };
        this.http.put('/row', payload)
            .then(function (value) {
            var row = _this.hot.getData()[index];
            var sourceIndex = index === 1 ? 2 : 1;
            for (var col = 0; col < row.length; col++) {
                var column = _this.hot.getCellMeta(sourceIndex, col).col_id;
                _this.hotInstance.setCellMeta(index, col, 'row_id', value.id);
                _this.hotInstance.setCellMeta(index, col, 'col_id', column);
                _this.hotInstance.setDataAtCell(index, col, value.data[column]);
            }
        });
    };
    /**
     * Method called after resizing column.
     *
     * @param {number} currentColumn
     * @param {number} newSize
     * @param {boolean} isDoubleClick
     */
    DataSourceConnector.prototype.onColumnResize = function (currentColumn, newSize) {
        var uri = {
            column: this.hot.getCellMeta(1, currentColumn).col_id,
            size: newSize
        };
        this.http.post('/column/resize', uri);
    };
    /**
     * Method called after creating new row.
     *
     * @param {number} index
     * @param {number} amount
     */
    DataSourceConnector.prototype.onRemoveRow = function (index, amount) {
        var rowsRemoved = [];
        for (var i = 0; i < amount; i++) {
            rowsRemoved.push(this.hotInstance.getCellMeta(i + index, 1).row_id);
        }
        this.http["delete"]('/row', rowsRemoved)
            .then(function (value) {
            if (!value) {
                return false;
            }
            return true;
        });
    };
    /**
    * Method called after moving row.
    *
    * @param {array} rows
    * @param {number} target
    */
    DataSourceConnector.prototype.onRowMove = function (rows, target) {
        var rowsMoved = [];
        for (var i = 0; i < rows.length; i++) {
            rowsMoved.push(this.hotInstance.getCellMeta(rows[i], 1).row_id);
        }
        ;
        var payload = {
            rowsMoved: rowsMoved,
            target: target
        };
        this.http.post('/row/move', payload);
    };
    /**
     * Method called after resizing row, event will be passed to backend.
     *
     * @param {number} currentRow
     * @param {number} newSize
     */
    DataSourceConnector.prototype.onRowResize = function (currentRow, newSize) {
        var uri = {
            row: this.hot.getCellMeta(currentRow, 1).row_id,
            size: newSize
        };
        this.http.post('/row/resize', uri);
    };
    /**
     * Method called after sorting column, event will be passed to backend.
     *
     * @param {number} column
     * @param {boolean} order
     */
    DataSourceConnector.prototype.onAfterColumnSort = function (column, order) {
        var _this = this;
        this.sort = order !== undefined ? { column: this.colHeaders[column], order: order === true ? 'ASC' : 'DESC' } : {};
        var uri = { sort: this.sort, filters: this.filters };
        this.http.post('/data', uri)
            .then(function (response) {
            _this.loadData(response);
        });
    };
    /**
     * Method called after merging cells, event will be passed to backend.
     *
     * @param {cellRange} CellRange
     * @param {mergeParent} Object
     */
    DataSourceConnector.prototype.onMergeCell = function (cellRange, mergeParent) {
        var mergedParent = {
            column: this.hot.getCellMeta(mergeParent.row, mergeParent.col).col_id,
            row: this.hot.getCellMeta(mergeParent.row, mergeParent.col).row_id
        };
        var mergedCells = [];
        var range = this._normalizeRange(cellRange);
        for (var i = range.from.row; i <= range.to.row; i++) {
            for (var j = range.from.col; j <= range.to.col; j++) {
                mergedCells.push({ column: this.hot.getCellMeta(i, j).col_id, row: this.hot.getCellMeta(i, j).row_id });
            }
        }
        this.http.post('/cell/merge', {
            mergedParent: mergedParent,
            mergedCells: mergedCells
        });
    };
    /**
     * Normalize cell range
     * @param {*} cellRange
     */
    DataSourceConnector.prototype._normalizeRange = function (cellRange) {
        var from;
        var to;
        if (cellRange.from.row < cellRange.to.row) {
            from = cellRange.from;
            to = cellRange.to;
        }
        else if (cellRange.from.row > cellRange.to.row) {
            from = cellRange.to;
            to = cellRange.from;
        }
        else if (cellRange.from.row === cellRange.to.row) {
            if (cellRange.from.col > cellRange.to.col) {
                from = cellRange.to;
                to = cellRange.from;
            }
            else {
                from = cellRange.from;
                to = cellRange.to;
            }
        }
        return { from: from, to: to };
    };
    DataSourceConnector.prototype.onUnmergeCells = function (cellRange) {
        var mergedParent = {
            column: this.hot.getCellMeta(cellRange.highlight.row, cellRange.highlight.col).col_id,
            row: this.hot.getCellMeta(cellRange.highlight.row, cellRange.highlight.col).row_id
        };
        var mergedCells = [];
        for (var i = cellRange.from.row; i <= cellRange.to.row; i++) {
            for (var j = cellRange.from.col; j <= cellRange.to.col; j++) {
                mergedCells.push({ column: this.hot.getCellMeta(i, j).col_id, row: this.hot.getCellMeta(i, j).row_id });
            }
        }
        this.http.post('/cell/unmerge', {
            mergedParent: mergedParent,
            mergedCells: mergedCells
        });
    };
    /**
     * Load data and setup all dedicated metadata for backend sync
     * @param {object} response
     */
    DataSourceConnector.prototype.loadData = function (response) {
        var _this = this;
        var responseData = response.data;
        var reorderedData = [];
        var _loop_1 = function (i) {
            var row = {};
            response.colOrder.forEach(function (col) {
                row[col] = responseData[i][col];
            });
            reorderedData.push(row);
        };
        for (var i = 0; i < responseData.length; i++) {
            _loop_1(i);
        }
        var normalizedData = reorderedData.map(function (value) { return Object.keys(value).map(function (key) { return value[key]; }); });
        this.hotInstance.loadData(normalizedData);
        var columnNames = Object.keys(responseData[0]);
        this.colHeaders = columnNames;
        var _loop_2 = function (row) {
            var _loop_3 = function (column) {
                if (response.meta) {
                    var meta = response.meta.filter(function (x) { return x.row_id == responseData[row][response.rowId] && x.col_id === columnNames[column]; });
                    meta.forEach(function (x) { _this.hotInstance.setCellMetaObject(row, column, JSON.parse(x.meta)); });
                }
                this_1.hotInstance.setCellMeta(row, column, 'row_id', responseData[row][response.rowId]);
                this_1.hotInstance.setCellMeta(row, column, 'col_id', columnNames[column]);
            };
            for (var column = 0; column < columnNames.length; column++) {
                _loop_3(column);
            }
        };
        var this_1 = this;
        for (var row = 0; row < responseData.length; row++) {
            _loop_2(row);
        }
    };
    /**
     * Method called after Handsontable instance initiation
     */
    DataSourceConnector.prototype.onAfterInit = function () {
        var _this = this;
        this.http.get('/settings')
            .then(function (response) {
            _this.hotInstance.updateSettings(response.data, false);
        });
        this.http.post('/data', null)
            .then(function (response) {
            _this.loadData(response);
        });
    };
    /**
    * Called after cell meta is changed.
    *
    * @param {Number} row
    * @param {Number} col
    * @param {String} key
    * @param {*} value
    */
    DataSourceConnector.prototype.onSetMeta = function (row, col, key, value) {
        if (key !== 'col_id' && key !== 'row_id') {
            var uri = new MetaKeyValue(this.hot.getCellMeta(row, col).row_id, this.hot.getCellMeta(row, col).col_id, key, value);
            this.http.post('/cell/meta', uri);
        }
    };
    /**
     * The disablePlugin method is used to disable the plugin. Reset all of your classes properties to their default values here.
     */
    DataSourceConnector.prototype.disablePlugin = function () {
        // The super method takes care of clearing the hook connections and assigning the 'false' value to the 'this.enabled' property.
        _super.prototype.disablePlugin.call(this);
    };
    /**
     * The updatePlugin method is called on the afterUpdateSettings hook (unless the updateSettings method turned the plugin off).
     * It should contain all the stuff your plugin needs to do to work properly after the Handsontable instance settings were modified.
     */
    DataSourceConnector.prototype.updatePlugin = function () {
        // The updatePlugin method needs to contain all the code needed to properly re-enable the plugin. In most cases simply disabling and enabling the plugin should do the trick.
        this.disablePlugin();
        this.enablePlugin();
        _super.prototype.updatePlugin.call(this);
    };
    /**
     * The afterChange hook callback.
     *
     * @param {Array} changes Array of changes.
     * @param {String} source Describes the source of the change.
     */
    DataSourceConnector.prototype.onAfterChange = function (changes, source) {
        if (changes) {
            var changeItems = [];
            for (var i = 0; i < changes.length; i++) {
                var cellMeta = this.hotInstance.getCellMeta(changes[i][0], changes[i][1]);
                var item = {
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
                source: source
            });
        }
    };
    /**
     * The destroy method should de-assign all of your properties.
     */
    DataSourceConnector.prototype.destroy = function () {
        // The super method takes care of de-assigning the event callbacks, plugin hooks and clearing all the plugin properties.
        _super.prototype.destroy.call(this);
    };
    return DataSourceConnector;
}(Handsontable_1.plugins.BasePlugin));
exports["default"] = DataSourceConnector;
var SimpleResponse = /** @class */ (function () {
    function SimpleResponse(data) {
        this.data = data;
    }
    return SimpleResponse;
}());
var MoveColumnResponse = /** @class */ (function () {
    function MoveColumnResponse(data) {
        this.data = data;
    }
    return MoveColumnResponse;
}());
var CreateColumnResponse = /** @class */ (function () {
    /**
     * @property {any} name Name of column granted by backend server
    */
    function CreateColumnResponse(name) {
        this.name = name;
    }
    return CreateColumnResponse;
}());
var LoadData = /** @class */ (function () {
    function LoadData() {
    }
    return LoadData;
}());
var MetaData = /** @class */ (function () {
    function MetaData() {
    }
    return MetaData;
}());
var MetaKeyValue = /** @class */ (function () {
    /**
     * @param row row id
     * @param column column name
     * @param key meta key name
     * @param value meta value
     */
    function MetaKeyValue(row, column, key, value) {
        this.row = row;
        this.column = column;
        this.key = key;
        this.value = value;
    }
    return MetaKeyValue;
}());
var CreateRowResponse = /** @class */ (function () {
    /**
    * @property {any} data Object of your dataset scheme. Contains values of created row.
    * @property {any} id Id granted by backend server to that row.
    */
    function CreateRowResponse(data, id) {
        this.data = data;
        this.id = id;
    }
    return CreateRowResponse;
}());
Handsontable.plugins.registerPlugin('DataSourceConnector', DataSourceConnector);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var request_1 = __importDefault(__webpack_require__(2));
var data_1 = __webpack_require__(3);
var es6_promise_1 = __webpack_require__(4);
/**
 * Send the xhr request to server
 *
 * @param {Request} obj Request object
 * @returns {Promise}
 */
var Http = /** @class */ (function () {
    function Http(controllerUrl) {
        this.controllerUrl = controllerUrl;
        this.listeners = [];
        this.defaultHeaders = {};
    }
    /**
       * make a callback function that listen for HTTP events
       *
       * @param {function} callback
       */
    Http.prototype.addListener = function (callback) {
        if (typeof callback === 'function' || false) {
            this.listeners.push(callback);
        }
    };
    /**
       * this method emit the onDataSend event to listeners
       *
       * @param {any} args
       */
    Http.prototype.onDataSend = function (data) {
        if (this.listeners && this.listeners.length) {
            this.listeners.forEach(function (listener) {
                setTimeout(function () { listener(data); }, 5);
            });
        }
    };
    /**
     * make HTTP DELETE to url with payload data
     *
     * @param {string} url
     * @param {any} data
     */
    Http.prototype["delete"] = function (url, data) {
        var _this = this;
        var requestData = new request_1["default"](this.defaultHeaders);
        requestData.url = this.controllerUrl + url;
        requestData.method = 'DELETE';
        requestData.body = JSON.stringify(data);
        return this.request(requestData).then(function (value) {
            _this.onDataSend(new data_1.Data(requestData, JSON.parse(value)));
            return JSON.parse(value);
        });
    };
    /**
       * make HTTP PUT to url with payload data
       *
       * @param {string} url
       * @param {any} data
       */
    Http.prototype.put = function (url, data) {
        var _this = this;
        var requestData = new request_1["default"](this.defaultHeaders);
        requestData.url = this.controllerUrl + url;
        requestData.method = 'PUT';
        requestData.body = JSON.stringify(data);
        return this.request(requestData).then(function (value) {
            _this.onDataSend(new data_1.Data(requestData, JSON.parse(value)));
            return JSON.parse(value);
        });
    };
    /**
       * make HTTP POST to url with payload data
       *
       * @param {string} url
       * @param {any} data
       */
    Http.prototype.post = function (url, data) {
        var _this = this;
        var requestData = new request_1["default"](this.defaultHeaders);
        requestData.url = this.controllerUrl + url;
        requestData.method = 'POST';
        requestData.body = JSON.stringify(data ? data : {});
        return this.request(requestData).then(function (value) {
            _this.onDataSend(new data_1.Data(requestData, JSON.parse(value)));
            return JSON.parse(value);
        });
    };
    /**
       * make HTTP GET call on url
       *
       * @param {string} url
       */
    Http.prototype.get = function (url) {
        var _this = this;
        var requestData = new request_1["default"](this.defaultHeaders);
        requestData.url = this.controllerUrl + url;
        return this.request(requestData).then(function (value) {
            _this.onDataSend(new data_1.Data(requestData, JSON.parse(value)));
            return JSON.parse(value);
        });
    };
    /**
      *
      * @param {Request} obj
      */
    Http.prototype.request = function (obj) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(obj.method || 'GET', obj.url);
            if (obj.headers) {
                Object.keys(obj.headers).forEach(function (key) {
                    xhr.setRequestHeader(key, obj.headers[key]);
                });
            }
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                }
                else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = function () { return reject(xhr.statusText); };
            xhr.send(obj.body);
        });
    };
    ;
    return Http;
}());
exports["default"] = Http;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * This class represents the http request call in xhr context
 */
var Request = /** @class */ (function () {
    function Request(headers) {
        this.body = '';
        this.url = '';
        this.method = 'GET';
        this.headers = headers !== undefined ? headers : { 'Content-Type': 'application/json' };
        this.body = '';
    }
    return Request;
}());
exports["default"] = Request;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Data = /** @class */ (function () {
    function Data(request, response) {
        this.request = request;
        this.response = response;
    }
    return Data;
}());
exports.Data = Data;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    return promise.then(function (value) {
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return constructor.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=datasource-connector.js.map