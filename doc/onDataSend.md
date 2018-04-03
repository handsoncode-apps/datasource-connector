# Registration for OnDataSend event on datasource-connector plugin 

The **onDataSend** event is emmited after each POST or GET call to the server.
Configuration is described below. 

In your spreadsheet div "container":

```html
<div id="container"></div>
```
setup your backend controller url by passing into controllerUrl option, then add function to onDataSend option:

```javascript
var container = document.getElementById('container');

var hot = new Handsontable(container, {
  rowHeaders: true,
  colHeaders: true,
  datasourceConnector: {
    controllerUrl: 'http://yourdomain.com/controller'
    onDataSend : function(data){}
  }
});
```

Where **data** represents object: 

```javascript
  {
    request: {
      url: 'http://' 
      method: (GET|POST)
      body: any
      headers: {'header':'value'}
    },
    response: any
  }
```

| Element name | Description |
| :----------- | :----------:|
| request.url  | url including parameters |
| request.method | GET or POST |
| request.body | any |
| request.headers | object like { 'header-name' : 'value' } |
| response | any |
