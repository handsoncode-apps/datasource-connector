/**
 * @plugin
 *
 * @description
 * this plugin allow to connect the backend controller with your HandsOnTable instance.
 * All user data are automatically taken from backend, and events are published to backend. 
 *
 * @param hotInstance
 * @constructor
 */
function dataSourceConnectorPlugin(hotInstance) {
  Handsontable.plugins.BasePlugin.call(this, hotInstance);
  this._superClass = Handsontable.plugins.BasePlugin;

  /**
   * Array containing the vocabulary used in the plugin.
   *
   * @type {Array}
   */
  this.vocabularyArray = [];
}

dataSourceConnectorPlugin.prototype = Object.create(
  Handsontable.plugins.BasePlugin.prototype,
  {
    constructor: {
      writable: true,
      configurable: true,
      value: dataSourceConnectorPlugin
    }
  }
);

/**
 * Check if the plugin is enabled in the settings.
 */
dataSourceConnectorPlugin.prototype.isEnabled = function() {
  return !!this.hot.getSettings().dataSourceConnector;
};

dataSourceConnectorPlugin.prototype.afterInit = false
/**
 * Enable the plujgin.
 */
dataSourceConnectorPlugin.prototype.enablePlugin = function() {
  if (!this.afterInit) {
    this.addHook("afterInit", this.onAfterInit.bind(this));
    this.addHook("beforeColumnSort", this.onBeforeColumnSort.bind(this));
    this.addHook("afterColumnSort", this.onAfterColumnSort.bind(this));
  }
  this.addHook("afterChange", this.onAfterChange.bind(this));
  this.addHook("afterRender", this.onAfterRender.bind(this));
  this.addHook("afterCreateRow", this.onAfterCreateRow.bind(this));
  this.addHook("afterCreateCol", this.onAfterCreateCol.bind(this));
  this.addHook("afterColumnMove", this.onAfterColumnMove.bind(this));
  this.addHook("beforeFilter", this.onBeforeFilter.bind(this))
  this.addHook("afterFilter", this.onAfterFilter.bind(this))
  this._superClass.prototype.enablePlugin.call(this);

};

dataSourceConnectorPlugin.prototype.data = []
dataSourceConnectorPlugin.prototype.colHeaders = []

/**
 * Disable the plugin.
 */
dataSourceConnectorPlugin.prototype.disablePlugin = function() {
  this._superClass.prototype.disablePlugin.call(this);
};

/**
 * Update the plugin.
 */
dataSourceConnectorPlugin.prototype.updatePlugin = function() {
  this.disablePlugin();
  this.enablePlugin();

  this._superClass.prototype.updatePlugin.call(this);
};

/**
 * Post data to the controller side
 * 
 * @param {*} controllerUrl 
 * @param {*} endpoint 
 * @param {*} data 
 */
dataSourceConnectorPlugin.prototype._sendData = function(
  controllerUrl,
  endpoint,
  data
) {
  var xhr = dataSourceConnectorPlugin._xhr();
  xhr.open("post", controllerUrl + "/" + endpoint);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
};

/**
 * Get data from conroller
 * 
 * @param {*} url 
 * @param {*} successHandler 
 * @param {*} errorHandler 
 */
dataSourceConnectorPlugin._getData = function(
  url,
  successHandler,
  errorHandler
) {
  var xhr = dataSourceConnectorPlugin._xhr();
  xhr.open("get", url, true);
  xhr.onreadystatechange = function() {
    var status;
    var data;
    // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
    if (xhr.readyState == 4) {
      // `DONE`
      status = xhr.status;
      if (status == 200) {
        data = JSON.parse(xhr.responseText);
        successHandler && successHandler(data);
      } else {
        errorHandler && errorHandler(status);
      }
    }
  };
  xhr.send();
};

/** 
 *  Itnitialize xhr based for different type of browser
 */
dataSourceConnectorPlugin._xhr = function() {
  try {
    return new XMLHttpRequest();
  } catch (e) {}
  try {
    return new ActiveXObject("Msxml3.XMLHTTP");
  } catch (e) {}
  try {
    return new ActiveXObject("Msxml2.XMLHTTP.6.0");
  } catch (e) {}
  try {
    return new ActiveXObject("Msxml2.XMLHTTP.3.0");
  } catch (e) {}
  try {
    return new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {}
  try {
    return new ActiveXObject("Microsoft.XMLHTTP");
  } catch (e) {}
  return null;
};

/**
 * The afterChange hook callback.
 *
 * @param {Array} changes Array of changes.
 * @param {String} source Describes the source of the change.
 */
dataSourceConnectorPlugin.prototype.onAfterChange = function(changes, source) {
  if (changes) {   
    var arrChanges = [];
    for (var i = 0; i < changes.length; i++) {
      var meta = this.hot.getCellMeta(changes[i][0], changes[i][0])
      var obj = {
        row: meta.row,
        column: changes[i][1],
        oldValue: changes[i][2],
        newValue: changes[i][3],
        meta: meta
      };
      delete obj.meta["instance"];
      arrChanges.push(obj);

    }

    var controllerUrl = this.hot.getSettings().dataSourceConnector.controllerUrl;
    this._sendData(controllerUrl, "afterchange", {
      changes: arrChanges,
      source: source
    });
  }
};

dataSourceConnectorPlugin.prototype.onAfterInit = function() {
  var baseURL = this.hot.getSettings().dataSourceConnector.controllerUrl;
  dataSourceConnectorPlugin._getData(baseURL + "/settings", response => {
    this.hot.updateSettings(response.data)
  })
  dataSourceConnectorPlugin._getData(baseURL + "/data", response => {
    var res = response.data
    for (var key in res[0]) {
      this.colHeaders.push(key)
    }

    this.hot.updateSettings({
      colHeaders: this.colHeaders
    });

    for (var i = 0; i < res.length; i++) {
      let keysArr = []
      var j = 1
      for (var key in res[i]) {
        keysArr.push(res[i][key])
        this.hot.setCellMeta(i, j, "row_id", i);
        this.hot.setCellMeta(i, j, "col_id", j);
        j++;
      }
      this.data.push(keysArr)
    }
    this.afterInit = true
    this.hot.loadData(this.data);
  })}
/**
 * On after render event handler
 * 
 * @param {*} isForced
 */
dataSourceConnectorPlugin.prototype.onAfterRender = function(isForced) {};

// Prevent sorting on front-end side
dataSourceConnectorPlugin.prototype.onBeforeColumnSort = function(
  column,
  order
) {
  return false
};

/**
 * On after Column Sort event handler
 * 
 * @param {*} column 
 * @param {*} order 
 */
dataSourceConnectorPlugin.prototype.onAfterColumnSort = function(
  column,
  order
) {
  var controllerUrl = this.hot.getSettings().dataSourceConnector.controllerUrl;
  var params = { column: this.colHeaders[column], order: order }
  var query = '?'
  for (var key in params) {
   query += key + "=" + params[key] + "&"
  }
  query = query.slice(0, -1)

  dataSourceConnectorPlugin._getData(controllerUrl + "/aftercolumnsort" + query, response => {
    data = response.data
    this.hot.loadData(data)
    return false;
  })
  return false;
};

/**
 * On after Create row event hanlder
 * 
 * @param {*} index 
 * @param {*} amount 
 * @param {*} source 
 */
dataSourceConnectorPlugin.prototype.onAfterCreateRow = function(
  index,
  amount,
  source
) {
  var createRow = {
    index: index,
    amount: amount,
    source: source
  };
  var controllerUrl = this.hot.getSettings().dataSourceConnector.controllerUrl;
  this._sendData(controllerUrl, "aftercreaterow", createRow);
};

/**
 * On after create event handler
 * 
 * @param {*} index 
 * @param {*} amount 
 * @param {*} source 
 */
dataSourceConnectorPlugin.prototype.onAfterCreateCol = function(
  index,
  amount,
  source
) {
  var createCol = {
    index: index,
    amount: amount,
    source: source
  };
  var controllerUrl = this.hot.getSettings().dataSourceConnector.controllerUrl;
  this._sendData(controllerUrl, "aftercreatecol", createCol);
};

/**
 * On after column move handler
 * 
 * @param {*} columns 
 * @param {*} target 
 */
dataSourceConnectorPlugin.prototype.onAfterColumnMove = function(
  columns,
  target
) {
  var colMoved = {
    columns: columns,
    target: target
  };
  var controllerUrl = this.hot.getSettings().dataSourceConnector.controllerUrl;
  this._sendData(controllerUrl, "aftercolumnmove", colMoved);
};


dataSourceConnectorPlugin.prototype.onBeforeFilter = function(
  conditionsStack
) {
  return false;
}

dataSourceConnectorPlugin.prototype.onAfterFilter = function(
  conditionsStack
) {
  if (conditionsStack.length > 0) {
    var query = "?"
    for (var i = 0; i < conditionsStack.length; i ++) {
      for (let j = 0; j < conditionsStack[i].conditions.length; j++) {
        if (conditionsStack[i].conditions[j].args.length != 0) {
          for (let k = 0; k < conditionsStack[i].conditions[j].args[0].length; k++) {
            query += "[" + this.colHeaders[conditionsStack[0].column] + "]" + "[" + conditionsStack[i].conditions[j].name + "]=" + conditionsStack[i].conditions[j].args[0][k]
            if (k !== conditionsStack[i].conditions[j].args[0].length - 1) {
              query += "&"
            }
          }
        } else {
          query += "[" + this.colHeaders[conditionsStack[0].column] + "]" + "[" + conditionsStack[i].conditions[j].name + "]=true"
          if (j !== conditionsStack[i].conditions.length - 1) {
            query += "&"
          }
        }
      }
    }
    var controllerUrl = this.hot.getSettings().dataSourceConnector.controllerUrl;
    dataSourceConnectorPlugin._getData(controllerUrl + "/afterfilter" + query, response => {
      this.hot.loadData(response.data)
    })  
  }
}

/**
 * Destroy the plugin.
 */
dataSourceConnectorPlugin.prototype.destroy = function() {
  this._superClass.prototype.destroy.call(this);
};

Handsontable.plugins.registerPlugin(
  "dataSourceConnectorPlugin",
  dataSourceConnectorPlugin
);
