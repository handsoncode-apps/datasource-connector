import Http from './utils/http';

import { _plugins } from "handsontable"
import Handsontable from 'handsontable';
import Data from './utils/data';
/** 
* @plugin DataSourceConnector
 * Note: keep in mind, that Handsontable instance creates one instance of the plugin class.
 *
 * @description
 * This plugin enable the backend side data management for handsontable instance
 */
class DataSourceConnector extends _plugins.Base {
  public http!: Http;
  public colHeaders: Array<string>;
  public filters: Array<object>;
  public order: Object;
  // The argument passed to the constructor is the currently processed Handsontable instance object.
  constructor(public hotInstance: Handsontable) {
    super(hotInstance);
    this.colHeaders = [];
    this.filters = [];
    this.order = {};
  }

  /**
   * Checks if the plugin is enabled in the settings.
   */
  public isEnabled() {
    let enabled = !!(this.hotInstance.getSettings() as any).dataSourceConnector;
    if (enabled) {
      let controllerUrl = (this.hotInstance.getSettings() as any).dataSourceConnector.controllerUrl;
      if ((this.hotInstance.getSettings() as any).dataSourceConnector.onDataSend !== undefined) {
        this.hotInstance.addHook('onDataSend', (this.hotInstance.getSettings() as any).dataSourceConnector.onDataSend);
      }
      this.http = new Http(controllerUrl);
      this.http.defaultHeaders = (this.hotInstance.getSettings() as any).dataSourceConnector.requestHeaders;
      var that = this;
      this.http.addListener((...args: Data[]) => {
        if (that.hotInstance !== undefined) {
          that.hotInstance.runHooks('onDataSend', args[0]);
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
  public enablePlugin() {
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
    this.addHook('afterFilter', (conditionsStack) => this.onAfterFilter(conditionsStack));
    this.addHook('beforeRowMove', (rows, target) => this.onRowMove(rows, target));

    // The super method assigns the this.enabled property to true, which can be later used to check if plugin is already enabled.
    super.enablePlugin();
  }
  /**
   * The onAfterFilter method is called after filtering.
   *
   * @param {array} conditionsStack
   */
  public onAfterFilter(conditionsStack: Array<any>) {
    var conditions = this.hotInstance.getPlugin('filters').conditionCollection.exportAllConditions();
    conditions.forEach((item: any, index: any) => {
      conditions[index].column = this.colHeaders[conditionsStack[index].column];
    });

    this.filters = conditions;
    let uri = { order: this.order, filters: this.filters};
    this.http.post('/data', uri).then((response: any) => {
      this.loadData(response);
    });
  }

  // move element in array from position to target
  private move(array: Array<any>, from: number, to: number) {
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
  public onAfterColumnMove(columns: Array<number>, target: number) {

    var columnNames = [];
    var i = 0;
    for (i = 0; i < columns.length; i++) {
      columnNames.push(this.colHeaders[columns[i]]);
    }

    var colMoved = {
      columnNames,
      target
    };

    this.http.post('/move/column', colMoved)
      .then((value: MoveColumnResponse) => {
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
  public onAfterCreateCol(index: number, amount: number, source: string) {
    var payload = {
      index,
      amount,
      source
    };
    var sourceIndex = index === 0 ? 1 : 0;
    this.http.post('/create/column', payload)
      .then((value: CreateColumnResponse) => {
        var noOfRows = this.hotInstance.getData().length;
        for (var row = 0; row < noOfRows; row++) {
          this.hotInstance.setCellMeta(row, index, 'row_id', (this.hotInstance.getCellMeta(row, sourceIndex) as any).row_id);
          this.hotInstance.setCellMeta(row, index, 'col_id', value.name);
        }
      });
  }
  /**
   * The onAfterRemoveCol method is called after removing column.
   *
   * @param {number} index
   * @param {number} amount
   * */
  public async onRemoveCol(index: number, amount: number) {
    var removedCol = [];
    for (var i = 0; i < amount; i++) {
      removedCol.push(this.colHeaders[i + index]);
    }
    try {
      var value = await this.http.post('/remove/column', removedCol);
      if (value.data) {
        var response = await this.http.post('/data', null);
        this.loadData(response);
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
  public onAfterCreateRow(index: number, amount: number, source: string) {
    var payload = {
      index,
      amount,
      source
    };
    this.http.post('/create/row', payload)
      .then((value: CreateRowResponse) => {
        var row = this.hotInstance.getData()[index];
        var sourceIndex = index === 1 ? 2 : 1;
        for (var col = 0; col < row.length; col++) {
          var column = (this.hotInstance.getCellMeta(sourceIndex, col)as any).col_id;
          this.hotInstance.setCellMeta(index, col, 'row_id', value.id);
          this.hotInstance.setCellMeta(index, col, 'col_id', column);
          this.hotInstance.setDataAtCell(index, col, value.data[column]);
        }
      });
  }

  /**
   * Method called after creating new row.
   *
   * @param {number} index
   * @param {number} amount
   */
  public onRemoveRow(index: number, amount: number) {
    var rowsRemoved = [];
    for (var i = 0; i < amount; i++) {
      rowsRemoved.push((this.hotInstance.getCellMeta(i + index, 1) as any).row_id);
    }
    this.http.post('/remove/row', rowsRemoved)
      .then((value: SimpleResponse) => {
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
  public onRowMove(rows: Array<number>, target: number) {
    var rowsMoved = [];
    for (var i = 0; i < rows.length; i++) {
      rowsMoved.push((this.hotInstance.getCellMeta(rows[i], 1) as any).row_id);
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
  public onAfterColumnSort(column: number, order: boolean) {
    this.order = order !== undefined ? { column: this.colHeaders[column], order: order === true ? 'ASC' : 'DESC' } : {};

    let uri = { order: this.order, filters: this.filters};
    this.http.post('/data', uri)
      .then((response: any) => {
        this.loadData(response);
      });
  }

  /**
   * Load data and setup all dedicated metadata for backend sync
   * @param {object} response
   */
  private loadData(response: any) {
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

    this.hotInstance.loadData(normalizedData);

    let columnNames = [];

    // eslint-disable-next-line guard-for-in
    for (let columnName in responseData[0]) {
      columnNames.push(columnName);
    }

    this.colHeaders = columnNames;

    for (let row = 0; row < responseData.length; row++) {
      for (let column = 0; column < columnNames.length; column++) {
        this.hotInstance.setCellMeta(row, column, 'row_id', responseData[row][response.rowId]);
        this.hotInstance.setCellMeta(row, column, 'col_id', columnNames[column]);
      }
    }
  }

  /**
   * Method called after Handsontable instance initiation
   */
  public onAfterInit() {
    this.http.get('/settings')
      .then((response: any) => {
        this.hotInstance.updateSettings(response.data, false);
      });
    this.http.post('/data', null)
      .then((response: any) => {
        this.loadData(response);
      });
  }

  /**
   * The disablePlugin method is used to disable the plugin. Reset all of your classes properties to their default values here.
   */
  public disablePlugin() {
    // The super method takes care of clearing the hook connections and assigning the 'false' value to the 'this.enabled' property.
    super.disablePlugin();
  }

  /**
   * The updatePlugin method is called on the afterUpdateSettings hook (unless the updateSettings method turned the plugin off).
   * It should contain all the stuff your plugin needs to do to work properly after the Handsontable instance settings were modified.
   */
  public updatePlugin() {

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
  public onAfterChange(changes: Array<any>, source: string) {
    if (changes) {
      let changeItems = [];
      for (let i = 0; i < changes.length; i++) {
        let cellMeta = this.hotInstance.getCellMeta(changes[i][0], changes[i][1]);
        let item = {
          row: (cellMeta as any).row_id,
          column: (cellMeta as any).col_id,
          oldValue: changes[i][2],
          newValue: changes[i][3],
          meta: cellMeta
        };
        delete (item.meta as any).instance;
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
  public destroy() {
    // The super method takes care of de-assigning the event callbacks, plugin hooks and clearing all the plugin properties.
    super.destroy();
  }
}

export default DataSourceConnector;

// register plugin
Handsontable.plugins.registerPlugin('DataSourceConnector', DataSourceConnector);

class SimpleResponse {
  constructor(public data: string) { }
}

class MoveColumnResponse {
  constructor(public data: Array<string>) { }
}

class CreateColumnResponse {
  /**
   * @property {any} name Name of column granted by backend server
  */
  constructor(public name: any) { }
}

class CreateRowResponse {
  /**
  * @property {any} data Object of your dataset scheme. Contains values of created row.
  * @property {any} id Id granted by backend server to that row.
  */
  constructor(public data: { [index: string]: any }, public id: string) { }
}
