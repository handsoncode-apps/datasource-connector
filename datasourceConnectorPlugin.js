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
function datasourceConnectorPlugin(hotInstance) {
  Handsontable.plugins.BasePlugin.call(this, hotInstance);
  this._superClass = Handsontable.plugins.BasePlugin;

  /**
   * Array containing the vocabulary used in the plugin.
   *
   * @type {Array}
   */
  this.vocabularyArray = [];
}

datasourceConnectorPlugin.prototype = Object.create(
  Handsontable.plugins.BasePlugin.prototype,
  {
    constructor: {
      writable: true,
      configurable: true,
      value: datasourceConnectorPlugin
    }
  }
);

/**
 * Check if the plugin is enabled in the settings.
 */
datasourceConnectorPlugin.prototype.isEnabled = function() {
  return !!this.hot.getSettings().datasourceConnector;
};

/**
 * Enable the plujgin.
 */
datasourceConnectorPlugin.prototype.enablePlugin = function() {
  this.addHook("afterChange", this.onAfterChange.bind(this));
  this.addHook("afterInit", this.onAfterInit);
  this.addHook("afterRender", this.onAfterRender.bind(this));
  this.addHook("afterCreateRow", this.onAfterCreateRow.bind(this));
  this.addHook("afterColumnSort", this.onAfterColumnSort.bind(this));
  this.addHook("afterCreateCol", this.onAfterCreateCol.bind(this));
  this.addHook("afterColumnMove", this.onAfterColumnMove.bind(this));
  this._superClass.prototype.enablePlugin.call(this);
};

/**
 * Disable the plugin.
 */
datasourceConnectorPlugin.prototype.disablePlugin = function() {
  this._superClass.prototype.disablePlugin.call(this);
};

/**
 * Update the plugin.
 */
datasourceConnectorPlugin.prototype.updatePlugin = function() {
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
datasourceConnectorPlugin.prototype._sendData = function(
  controllerUrl,
  endpoint,
  data
) {
  var xhr = datasourceConnectorPlugin._xhr();
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
datasourceConnectorPlugin._getData = function(
  url,
  successHandler,
  errorHandler
) {
  var xhr = datasourceConnectorPlugin._xhr();
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
datasourceConnectorPlugin._xhr = function() {
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
datasourceConnectorPlugin.prototype.onAfterChange = function(changes, source) {
  if (changes) {
    var arrChanges = [];
    for (var i = 0; i < changes.length; i++) {
      var obj = {
        row: changes[i][0],
        column: changes[i][1],
        oldValue: changes[i][2],
        newValue: changes[i][3],
        meta: this.hot.getCellMeta(changes[i][0], changes[i][1])
      };
      delete obj.meta["instance"];
      arrChanges.push(obj);
    }

    var controllerUrl = this.hot.getSettings().datasourceConnector.controllerUrl;
    this._sendData(controllerUrl, "afterchange", {
      changes: arrChanges,
      source: source
    });
  }
};

datasourceConnectorPlugin.prototype.onAfterInit = function() {

  var controllerUrl = this.getSettings().datasourceConnector.controllerUrl;
  datasourceConnectorPlugin._getData(controllerUrl + "/settings", response => {
    this.updateSettings(response.data)
  })
  datasourceConnectorPlugin._getData(controllerUrl + "/data", response => {
  
    res = response.data
    var colHeaders = []
    for(var key in res[0]) {
      colHeaders.push(key)
    }

    this.updateSettings({
      colHeaders: colHeaders
    });

    var data = [];
    for (var i = 0; i < res.length; i++) {
      let keysArr = []
      console.log("i", i)
      var j = 1
      for (var key in res[i]) {
        console.log("j", j)
        keysArr.push(res[i][key])
        j++
      }
      data.push(keysArr)
    }
    this.loadData(data);
    for (var i = 0; i < res.length; i++) {
    //   for (var j = 0; j < response.columns.length; j++) {
    //     this.setCellMeta(i, j, "row_id", response.data[i].key);
    //     this.setCellMeta(i, j, "col_id", response.columns[j]);
    //   }
    }
  });

  datasourceConnectorPlugin._getData(controllerUrl + "/settings", response => {
      this.updateSettings(response.data)
    })

  // datasourceConnectorPlugin._getData(controllerUrl + "/data", response => {
  //   this.updateSettings({
  //     colHeaders: response.columns
  //   });
  //   var temp = [];
  //   for (var i = 0; i < response.data.length; i++) {
  //     temp.push(response.data[i].values);
  //   }
  //   this.loadData(temp);
  //   for (var i = 0; i < response.data.length; i++) {
  //     for (var j = 0; j < response.columns.length; j++) {
  //       this.setCellMeta(i, j, "row_id", response.data[i].key);
  //       this.setCellMeta(i, j, "col_id", response.columns[j]);
  //     }
  //   }
  // });
}

/**
 * On after render event handler
 * 
 * @param {*} isForced
 */
datasourceConnectorPlugin.prototype.onAfterRender = function(isForced) {};

/**
 * On after Column Sort event handler
 * 
 * @param {*} column 
 * @param {*} order 
 */
datasourceConnectorPlugin.prototype.onAfterColumnSort = function(
  column,
  order
) {
  var controllerUrl = this.hot.getSettings().datasourceConnector.controllerUrl;
  this._sendData(controllerUrl, "aftercolumnsort", { column: column, order: order });
  return false;
};

/**
 * On after Create row event hanlder
 * 
 * @param {*} index 
 * @param {*} amount 
 * @param {*} source 
 */
datasourceConnectorPlugin.prototype.onAfterCreateRow = function(
  index,
  amount,
  source
) {
  var createRow = {
    index: index,
    amount: amount,
    source: source
  };
  var controllerUrl = this.hot.getSettings().datasourceConnector.controllerUrl;
  this._sendData(controllerUrl, "aftercreaterow", createRow);
};

/**
 * On after create event handler
 * 
 * @param {*} index 
 * @param {*} amount 
 * @param {*} source 
 */
datasourceConnectorPlugin.prototype.onAfterCreateCol = function(
  index,
  amount,
  source
) {
  var createCol = {
    index: index,
    amount: amount,
    source: source
  };
  var controllerUrl = this.hot.getSettings().datasourceConnector.controllerUrl;
  this._sendData(controllerUrl, "aftercreatecol", createCol);
};

/**
 * On after column move handler
 * 
 * @param {*} columns 
 * @param {*} target 
 */
datasourceConnectorPlugin.prototype.onAfterColumnMove = function(
  columns,
  target
) {
  var colMoved = {
    columns: columns,
    target: target
  };
  var controllerUrl = this.hot.getSettings().datasourceConnector.controllerUrl;
  this._sendData(controllerUrl, "aftercolumnmove", colMoved);
};
/**
 * Destroy the plugin.
 */
datasourceConnectorPlugin.prototype.destroy = function() {
  this._superClass.prototype.destroy.call(this);
};

Handsontable.plugins.registerPlugin(
  "datasourceConnectorPlugin",
  datasourceConnectorPlugin
);
