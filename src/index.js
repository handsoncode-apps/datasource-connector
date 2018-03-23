import URI from './utils/uri';
import Http from './utils/http';

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
      let onDataSend = this.hot.getSettings().dataSourceConnector.onDataSend;
      this.http = new Http(controllerUrl);
      this.http.addListener(onDataSend);
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

    this.addHook('afterInit', () => this.onAfterInit());
    this.addHook('afterChange', (changes, source) => this.onAfterChange(changes, source));
    this.addHook('afterColumnSort', (column, order) => this.onAfterColumnSort(column, order));

    this.addHook('afterCreateRow', (index, amount, source) => this.onAfterCreateRow(index, amount, source));
    this.addHook('afterCreateCol', (index, amount, source) => this.onAfterCreateCol(index, amount, source));
    this.addHook('afterColumnMove', (columns, target) => this.onAfterColumnMove(columns, target));
    this.addHook('afterFilter', (conditionsStack) => this.onAfterFilter(conditionsStack));

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
    let uri = { order: this.order, filters: this.filters};
    this.http.post('/data', uri).then((response) => {
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

    this.http.post('/move/column', colMoved);
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
    this.http.post('/create/column', payload)
      .then((value) => {
        var noOfRows = this.hot.getData().length;
        for (var row = 0; row < noOfRows; row++) {
          this.hot.setCellMeta(row, index, 'row_id', this.hot.getCellMeta(row, sourceIndex).row_id);
          this.hot.setCellMeta(row, index, 'col_id', value.name);
        }
      });
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
    this.http.post('/create/row', payload)
      .then((value) => {
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
   * Method called after sorting column, event will be passed to backend.
   *
   * @param {number} column
   * @param {boolean} order
   */
  onAfterColumnSort(column, order) {
    this.order = order !== undefined ? { column: this.colHeaders[column], order: order === true ? 'ASC' : 'DESC' } : {};

    let uri = { order: this.order, filters: this.filters};
    this.http.post(`/data`, uri)
      .then((response) => {
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
    this.http.get('/settings')
      .then((response) => {
        this.hot.updateSettings(response.data);
      });
    this.http.post('/data')
      .then((response) => {
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

export default DataSourceConnector;

// register plugin
Handsontable.plugins.registerPlugin('DataSourceConnector', DataSourceConnector);
