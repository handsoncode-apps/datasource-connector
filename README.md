## **How to initialize  dataSourceConnectorPlugin**

### On frontend:

In your index.html file:

- Add in head element:

  ` <script>datasourceConnectorPlugin.js</script>`


- In handsontable instance add the datasourceConnector property with your baseURL value (url that you are connecting to on server):

example

```bash
var hot = new Handsontable(container, {
rowHeaders: true,
colHeaders: true,
datasourceConnector: {
baseURL: 'http://localhost:3005/users'
}
});
```

### On backend:

In your app.js file add line:

app.use('name of your controller)
