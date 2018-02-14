/**
 * @plugin
 *
 * @description
 * Every time you type "Hello" in a cell, HelloWorldPlugins adds "World!" in the next cell.
 * Also, when you type "Handsontable", it adds "is awesome!" in the next cell.
 *
 * @param hotInstance
 * @constructor
 */
function datasourceConnectorPlugin(hotInstance) {
    Handsontable.plugins.BasePlugin.call(this, hotInstance)
    this._superClass = Handsontable.plugins.BasePlugin

    /**
     * Array containing the vocabulary used in the plugin.
     *
     * @type {Array}
     */
    this.vocabularyArray = [];
}

datasourceConnectorPlugin._pluginConfig = { url: 'http://localhost:3005/users' }

datasourceConnectorPlugin.prototype = Object.create(Handsontable.plugins.BasePlugin.prototype, {
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
datasourceConnectorPlugin.prototype.isEnabled = function () {
    return !!this.hot.getSettings().datasourceConnectorPlugin;
};

/**
 * Enable the plujgin.
 */
datasourceConnectorPlugin.prototype.enablePlugin = function () {
    this.addHook('afterChange', this.onAfterChange.bind(this));
    this.addHook('afterInit', this.onAfterInit);
    
    this._superClass.prototype.enablePlugin.call(this);
};

/**
 * Disable the plugin.
 */
datasourceConnectorPlugin.prototype.disablePlugin = function () {
    this._superClass.prototype.disablePlugin.call(this);
};

/**
 * Update the plugin.
 */
datasourceConnectorPlugin.prototype.updatePlugin = function () {
    this.disablePlugin();
    this.enablePlugin();

    this._superClass.prototype.updatePlugin.call(this);
}

datasourceConnectorPlugin.prototype._sendData = function (endpoint, data) {
    let xhr = datasourceConnectorPlugin._xhr();
    xhr.open('post', datasourceConnectorPlugin._pluginConfig.url + '/' + endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}

datasourceConnectorPlugin._getData= function(url, successHandler, errorHandler) {
	var xhr = datasourceConnectorPlugin._xhr()
	xhr.open('get', url, true);
	xhr.onreadystatechange = function() {
		var status;
		var data;
		// https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
		if (xhr.readyState == 4) { // `DONE`
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

datasourceConnectorPlugin._xhr = function() {
    try {
        return new XMLHttpRequest();
    } catch(e) {}
    try {
        return new ActiveXObject("Msxml3.XMLHTTP");
    } catch(e) {}
    try {
        return new ActiveXObject("Msxml2.XMLHTTP.6.0");
    } catch(e) {}
    try {
        return new ActiveXObject("Msxml2.XMLHTTP.3.0");
    } catch(e) {}
    try {
        return new ActiveXObject("Msxml2.XMLHTTP");
    } catch(e) {}
    try {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } catch(e) {}
    return null;
}

/**
 * The afterChange hook callback.
 *
 * @param {Array} changes Array of changes.
 * @param {String} source Describes the source of the change.
 */
datasourceConnectorPlugin.prototype.onAfterChange = function (changes, source) {
    if (changes) {
        let arrChanges = []
        console.log('changes', changes)
        for (let i = 0; i < changes.length; i++) {
            let obj = {
                row: changes[i][0],
                column: changes[i][1],
                oldValue: changes[i][2],
                newValue: changes[i][3]
            }
            arrChanges.push(obj)
        }

        console.log('arrChanges', arrChanges)
        this._sendData('afterchange', {changes: changes, source: source})
    }
};

datasourceConnectorPlugin.prototype.onAfterInit = function() {
    datasourceConnectorPlugin._getData(datasourceConnectorPlugin._pluginConfig.url + '/data',(data)=>{
        this.loadData(data);
    })
};

/**
 * Destroy the plugin.
 */
datasourceConnectorPlugin.prototype.destroy = function () {
    this._superClass.prototype.destroy.call(this);
};

Handsontable.plugins.registerPlugin('datasourceConnectorPlugin', datasourceConnectorPlugin);