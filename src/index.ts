import Http from './utils/http';

import { plugins, Core } from 'Handsontable';

import { Data } from './utils/data';

declare var Handsontable: any;

/** 
* @plugin DataSourceConnector
 * Note: keep in mind, that Handsontable instance creates one instance of the plugin class.
 *
 * @description
 * This plugin enable the backend side data management for handsontable instance
 */
class DataSourceConnector extends plugins.BasePlugin {
  public http: Http;
  public colHeaders: Array<string>;
  public filters: Array<object>;
  public sort: Object;
  public mergeCells: Array<any>;

  // The argument passed to the constructor is the currently processed Handsontable instance object.
  constructor(public hotInstance: Core) {
    super(hotInstance);
    this.colHeaders = [];
    this.filters = [];
    this.sort = {};
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
      const hotInstance = this.hot;
      let that = this;
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
    this.addHook('afterColumnSort', (column, sort) => this.onAfterColumnSort(column, sort));

    this.addHook('afterCreateRow', (index, amount, source) => this.onAfterCreateRow(index, amount, source));
    this.addHook('afterCreateCol', (index, amount, source) => this.onAfterCreateCol(index, amount, source));
    this.addHook('afterColumnMove', (columns, target) => this.onAfterColumnMove(columns, target));
    this.addHook('afterFilter', (conditionsStack) => this.onAfterFilter(conditionsStack));
    this.addHook('beforeRowMove', (rows, target) => this.onRowMove(rows, target));
    this.addHook('afterRowResize', (currentColumn, newSize, isDoubleClick) => this.onRowResize(currentColumn, newSize));
    this.addHook('afterMergeCells', (cellRange, mergeParent, auto) => this.onMergeCell(cellRange, mergeParent));
    this.addHook('afterColumnResize', (currentColumn, newSize, isDoubleClick) => this.onColumnResize(currentColumn, newSize));
    this.addHook('beforeUnmergeCells', (cellRange, auto) => this.onUnmergeCells(cellRange));

    this.addHook('afterSetCellMeta', (row, col, key, value) => this.onSetMeta(row, col, key, value));

    // The super method assigns the this.enabled property to true, which can be later used to check if plugin is already enabled.
    super.enablePlugin();
  }
  /**
   * The onAfterFilter method is called after filtering.
   *
   * @param {array} conditionsStack
   */
  public onAfterFilter(conditionsStack: Array<any>) {
    let conditions = this.hot.getPlugin('filters').conditionCollection.exportAllConditions();
    conditions.forEach((item: any, index: any) => {
      conditions[index].column = this.colHeaders[conditionsStack[index].column];
    });

    this.filters = conditions;
    let uri = { sort: this.sort, filters: this.filters };
    this.http.post('/data', uri).then((response: any) => {
      this.loadData(response);
    });
  }

  // move element in array from position to target
  private move(array: Array<any>, from: number, to: number) {
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
  public onAfterColumnMove(columns: Array<number>, target: number) {

    let columnNames = [];
    let i = 0;
    for (i = 0; i < columns.length; i++) {
      columnNames.push(this.colHeaders[columns[i]]);
    }

    let colMoved = {
      columnNames,
      target
    };

    this.http.post('/column/move', colMoved)
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
    let payload = {
      index,
      amount,
      source
    };
    let sourceIndex = index === 0 ? 1 : 0;
    this.http.put('/column', payload)
      .then((value: CreateColumnResponse) => {
        let noOfRows = this.hot.getData().length;
        for (let row = 0; row < noOfRows; row++) {
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
    let removedCol = [];
    for (let i = 0; i < amount; i++) {
      removedCol.push(this.colHeaders[i + index]);
    }
    try {
      let value = await this.http.delete('/column', removedCol);
      if (value.data) {
        let response = await this.http.post('/data');
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
    let payload = {
      index,
      amount,
      source
    };
    this.http.put('/row', payload)
      .then((value: CreateRowResponse) => {
        let row = this.hot.getData()[index];
        let sourceIndex = index === 1 ? 2 : 1;
        for (let col = 0; col < row.length; col++) {
          let column = this.hot.getCellMeta(sourceIndex, col).col_id;
          this.hotInstance.setCellMeta(index, col, 'row_id', value.id);
          this.hotInstance.setCellMeta(index, col, 'col_id', column);
          this.hotInstance.setDataAtCell(index, col, value.data[column]);
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
  onColumnResize(currentColumn: number, newSize: number) {
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
  public onRemoveRow(index: number, amount: number) {
    let rowsRemoved = [];
    for (let i = 0; i < amount; i++) {
      rowsRemoved.push((this.hotInstance.getCellMeta(i + index, 1) as any).row_id);
    }
    this.http.delete('/row', rowsRemoved)
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
    let rowsMoved = [];
    for (let i = 0; i < rows.length; i++) {
      rowsMoved.push((this.hotInstance.getCellMeta(rows[i], 1) as any).row_id);
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
  onRowResize(currentRow: number, newSize: number) {
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
  public onAfterColumnSort(column: number, order: boolean) {
    this.sort = order !== undefined ? { column: this.colHeaders[column], order: order === true ? 'ASC' : 'DESC' } : {};

    let uri = { sort: this.sort, filters: this.filters };
    this.http.post('/data', uri)
      .then((response: any) => {
        this.loadData(response);
      });
  }

  /**
   * Method called after merging cells, event will be passed to backend.
   *
   * @param {cellRange} CellRange
   * @param {mergeParent} Object
   */
  onMergeCell(cellRange: any, mergeParent: any) {
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
  private loadData(response: LoadData) {
    let responseData = response.data;
    let mergeCells;

    let reorderedData = []
    for (let i = 0; i < responseData.length; i++) {
      let row = {}
      response.colOrder.forEach((col) => {
        row[col] = responseData[i][col];
      })
      reorderedData.push(row)
    }

    let normalizedData = reorderedData.map((value: any) => Object.keys(value).map(key => value[key]));
    this.hotInstance.loadData(normalizedData);

    let columnNames = Object.keys(responseData[0]);

    this.colHeaders = columnNames;
    mergeCells = this._normalizeMergeCells(response.merged)

    for (let row = 0; row < responseData.length; row++) {
      for (let column = 0; column < columnNames.length; column++) {
        if (response.meta) {
          let meta = response.meta.filter(x => x.row_id == responseData[row][response.rowId] && x.col_id === columnNames[column]);
          let tempMerge = []
          mergeCells.forEach((cell) => {
            if (cell.col === columnNames[column]) {
              cell.col = column;
            }
            if (cell.row === responseData[row][response.rowId]) {
              cell.row = row;
            }
            const {cell_col_id, cell_row_id, ...rest } = cell
            tempMerge.push(rest)
          })
          mergeCells = tempMerge
          meta.forEach(x => {
            let parsedMeta = {}
            parsedMeta['row_id'] = responseData[row][response.rowId];
            parsedMeta['col_id'] = columnNames[column];           
          });
        }
        this.hotInstance.setCellMeta(row, column, 'row_id', responseData[row][response.rowId]);
        this.hotInstance.setCellMeta(row, column, 'col_id', columnNames[column]);
      }
    }
    return mergeCells;
  }

  /**
   * Method called after Handsontable instance initiation
   */
  public onAfterInit() {
    let mergedCells;
    this.http.post('/data', null)
      .then((response: any) => {
        mergedCells = this.loadData(response);
        this.http.get('/settings')
        .then((response: any) => {
          response.data["mergeCells"] = mergedCells;
          this.hotInstance.updateSettings(response.data, false);
        })
      })
  }

  _normalizeMergeCells(mergedCells) {
    let tempMerge: Array<any> = [];
    mergedCells.forEach((merged) => {
      if (tempMerge.length === 0) {
        tempMerge.push((<any>Object).assign(
          {}, 
          { row: merged.parent_row_id, col: merged.parent_col_id, cell_col_id: merged.cell_col_id, cell_row_id: merged.cell_row_id },
          { colspan: 1, rowspan: 1 }
        ));
      } else {
        let el = tempMerge.filter((o) => o.row === merged.parent_row_id && o.col === merged.parent_col_id)
        if (el.length) {
          el[0]["col"] === merged["cell_col_id"] ? el[0].rowspan += 1 : '';
          el[0]["row"] === merged["cell_row_id"] ? el[0].colspan += 1 : ''
        } else {
          tempMerge.push((<any>Object).assign(
            {}, 
            { row: merged.parent_row_id, col: merged.parent_col_id, cell_col_id: merged.cell_col_id, cell_row_id: merged.cell_row_id },
            { colspan: 1, rowspan: 1 }))
        }
      }
    });
    return tempMerge;
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
      let uri = new MetaKeyValue(this.hot.getCellMeta(row, col).row_id, this.hot.getCellMeta(row, col).col_id, key, value);
      this.http.post('/cell/meta', uri);
    }
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
        console.log("changes[i]", changes[i])
        let cellMeta = this.hotInstance.getCellMeta(changes[i][0], changes[i][1]);
        let item = {
          row: (cellMeta).row_id,
          column: (cellMeta).col_id,
          oldValue: changes[i][2],
          newValue: changes[i][3],
          meta: cellMeta
        };
        delete (item.meta).instance;
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
  public destroy() {
    // The super method takes care of de-assigning the event callbacks, plugin hooks and clearing all the plugin properties.
    super.destroy();
  }
}

export default DataSourceConnector;

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

class LoadData {
  public data: Array<any>;
  public rowId: string;
  public meta: Array<MetaData>;
  public colOrder: Array<string>;
  public merged : any;
}

class MetaData {
  public id: any;
  public row_id: any;
  public col_id: string;
  public meta: string;
}

class MetaKeyValue {
  /**
   * @param row row id
   * @param column column name
   * @param key meta key name
   * @param value meta value
   */
  constructor(public row: any, public column: string, public key: string, public value: any) { }
}
class CreateRowResponse {
  /**
  * @property {any} data Object of your dataset scheme. Contains values of created row.
  * @property {any} id Id granted by backend server to that row.
  */
  constructor(public data: { [index: string]: any }, public id: string) { }
}

Handsontable.plugins.registerPlugin('DataSourceConnector', DataSourceConnector);