const DataSourceConnectorWrapper = () => {
  let SuperClass = Handsontable.plugins.BasePlugin
  /**
   * @plugin InternalPluginSkeleton
   * Note: keep in mind, that Handsontable instance creates one instance of the plugin class.
   *
   * @description
   * Blank plugin template. It needs to inherit from the BasePlugin class.
   */
  class DataSourceConnector extends SuperClass {

    // The argument passed to the constructor is the currently processed Handsontable instance object.
    constructor(hotInstance) {
      super(hotInstance)
      this.controllerUrl = '';
    }

    /**
     * Checks if the plugin is enabled in the settings.
     */
    isEnabled() {
      this.controllerUrl = this.hot.getSettings().dataSourceConnector.controllerUrl
      return !!this.hot.getSettings().dataSourceConnector;
    }

    /**
     * The enablePlugin method is triggered on the beforeInit hook. It should contain your initial plugin setup, along with
     * the hook connections.
     * Note, that this method is run only if the statement in the isEnabled method is true.
     */
    enablePlugin() {


      // disable build in sort and filter functions
      this.addHook('beforeColumnSort', () => { return false; });
      this.addHook('beforeFilter', () => { return false; })
      this.addHook('afterRender', (isForced) => { });

      this.addHook('afterInit', () => this.onAfterInit());
      this.addHook('afterChange', (changes, source) => this.onAfterChange(changes, source));
      this.addHook('afterColumnSort', (column, order) => this.onAfterColumnSort(column, order));

      this.addHook('afterCreateRow', (index, amount, source) => this.onAfterCreateRow(index, amount, source));
      this.addHook('afterCreateCol', (index, amount, source) => this.onAfterCreateCol(index, amount, source));
      this.addHook('afterColumnMove', (columns, target) => this.onAfterColumnMove(columns, target));
      this.addHook('afterFilter', (conditionsStack) => this.onAfterFilter(conditionsStack))

      // The super method assigns the this.enabled property to true, which can be later used to check if plugin is already enabled.
      super.enablePlugin();
    }

    onAfterFilter(conditionsStack) {
      let queryArr = []
      if (conditionsStack.length > 0) {
        for (let i = 0; i < conditionsStack.length; i++) {
          operator = this.hot.getPlugin('filters').conditionCollection.columnTypes[conditionsStack[i].column]
          switch (operator) {
            case 'conjunction':
              operator = ['and']
              break;
            case 'disjunction':
              operator = ['or']
              break;
            case 'disjunctionAndVariable':
              operator = ['or', 'and']
              break;
          }
          for (let j = 0; j < conditionsStack[i].conditions.length; j++) {
            if (operator[j]) {
              conditionsStack[i].conditions[j].operator = operator[j]
            }
            if (conditionsStack[i].conditions[j].args.length != 0) {
              if (typeof conditionsStack[i].conditions[j].args[0] === 'string') {
                queryArr.push("[" + this.colHeaders[conditionsStack[i].column] + "][" + conditionsStack[i].conditions[j].name + "]=" + conditionsStack[i].conditions[j].args[0])
              } else {
                for (let k = 0; k < conditionsStack[i].conditions[j].args[0].length; k++) {
                  queryArr.push("[" + this.colHeaders[conditionsStack[i].column] + "][" + conditionsStack[i].conditions[j].name + "]=" + conditionsStack[i].conditions[j].args[0][k])
                }
              }
            } else {
              queryArr.push("[" + this.colHeaders[conditionsStack[0].column] + "][" + conditionsStack[i].conditions[j].name + "]=true")
            }
            if (j < conditionsStack[i].conditions.length - 1) {
              tempOperator = conditionsStack[i].conditions[j].operator || 'and'
              queryArr.push("[" + this.colHeaders[conditionsStack[i].column] + "][operator]=" + tempOperator)
            }
          }
          operatorWithVariable = false
        }
        var query = "?" + queryArr.join('&')
        console.log(query)
        // this._get(controllerUrl + '/data' + query).then(response => {
        //   this._loadData(response)
        // })
      }
    }

    onAfterColumnMove(columns, target) {
      var colMoved = {
        columns: columns,
        target: target
      };
      this._post(this.controllerUrl + '/aftercolumnmove', colMoved);
    }

    onAfterCreateCol(index, amount, source) {
      var payload = {
        index: index,
        amount: amount,
        source: source
      };
      this._post(this.controllerUrl + '/aftercreatecol', payload).then(value => {
        // TODO: setup meta for new created row
        return value;
      });
    }

    onAfterCreateRow(index, amount, source) {
      var payload = {
        index: index,
        amount: amount,
        source: source
      };
      this._post(this.controllerUrl + '/aftercreaterow', payload).then(value => {
        // TODO: setup meta for new created row
        return value;
      });
    }

    onAfterColumnSort(column, order) {
      let uri = new URI({ column: this.colHeaders[column], order: order });
      this._get(controllerUrl + "/aftercolumnsort" + uri.string())
        .then(response => {
          this._loadData(reponse)
        })
    }

    /**
     * Load data and setup all dedicated metadata for backend sync
     * @param {object} response 
     */
    _loadData(response) {
      let responseData = response.data
      let normalizedData = []
      for (let row = 0; row < responseData.length; row++) {
        let item = []
        for (let columnName in responseData[row]) {
          item.push(responseData[row][columnName])
        }
        normalizedData.push(item)
      }

      this.hot.loadData(normalizedData);

      let columnNames = []
      for (let columnName in responseData[0]) {
        columnNames.push(columnName)
      }
      for (let row = 0; row < responseData.length; row++) {
        for (let column = 0; column < columnNames.length; column++) {
          this.hot.setCellMeta(row, column, "row_id", responseData[row][response.rowId]);
          this.hot.setCellMeta(row, column, "col_id", columnNames[column]);
        }
      }
    }

    onAfterInit() {
      this._get(this.controllerUrl + '/settings')
        .then(response => {
          this.hot.updateSettings(response.data)
        })
      this._get(this.controllerUrl + '/data')
        .then(response => {
          this._loadData(response)
        })
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
          let cellMeta = this.hot.getCellMeta(changes[i][0], changes[i][1])
          let item = {
            row: cellMeta.row_id,
            column: cellMeta.col_id,
            oldValue: changes[i][2],
            newValue: changes[i][3],
            meta: cellMeta
          };
          delete item.meta["instance"];
          changeItems.push(item);
        }
        this._post(this.controllerUrl + '/afterchange', {
          changes: changeItems,
          source: source
        })
      }
    }

    /**
     * The destroy method should de-assign all of your properties.
     */
    destroy() {
      // The super method takes care of de-assigning the event callbacks, plugin hooks and clearing all the plugin properties.
      super.destroy();
    }

    /**
     * 
     * @param {Object} any data send to  
     */
    onDataSend(value) {
      let onData = this.hot.getSettings().dataSourceConnector.onDataSend;
      if (typeof onData === 'function') {
        onData(value)
      }
    }

    /**
     * make HTTP POST to url with payload data
     * 
     * @param {string} url 
     * @param {any} data 
     */
    _post(url, data) {

      let request = new Request();
      request.url = url;
      request.method = 'POST';
      request.body = JSON.stringify(data);

      return this._request(request).then(
        value => {
          this.onDataSend({ reqest: request, response: JSON.parse(value) });
          return JSON.parse(value);
        }
      )
    }

    /**
     * make HTTP GET call on url
     * 
     * @param {string} url 
     */
    _get(url) {

      var request = new Request();
      request.url = url;

      return this._request(request).then(
        value => {
          this.onDataSend({ reqest: request, response: JSON.parse(value) });
          return JSON.parse(value);
        }
      )
    }

    /**
     * Send the xhr request to server 
     * 
     * @param {Reqest} obj Request object
     * @returns {Promise}
     */
    _request(obj) {
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url);
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
    };
  }

  class URI {
    constructor(object) {
      this.object = object;
    }

    _serialie(object, prefix) {
      let queryStrings = [], property;
      for (property in object) {
        if (object.hasOwnProperty(property)) {
          let key = prefix ? prefix + '[' + property + ']' : property;
          let value = object[property];
          queryStrings.push((value !== null && typeof value === 'object') ? this._serialie(value, key) : encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
      }
      return queryStrings.join('&');
    }

    string() {
      if (this.object === undefined) {
        return '';
      }
      return '?' + this._serialie(this.object)
    }
  }

  class Request {
    constructor() {
      this.url = '';
      this.method = 'GET';
      this.headers = { 'Content-Type' : 'application/json' };
      this.body = {};
    }
  }

  // register plugin
  Handsontable.plugins.registerPlugin('DataSourceConnector',DataSourceConnector)
}

DataSourceConnectorWrapper();