var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json();
var router = express.Router()

var app = express()
var port = 3005

var settings = {
    rowHeaders: true,
    colHeaders: true,
    datasourceConnectorPlugin: true,
    columnSorting: true,
  
    contextMenu: true,
    manualColumnMove: true,
    manualRowMove: true,
    sortIndicator: true,
    filters: true,
    dropdownMenu: true,
  };
  
  var colOrder = ["id","first_name", "last_name", "age", "sex", "phone"];
  
  var data = [ { id: 1,
      first_name: 'John',
      last_name: 'Smith',
      age: 10,
      sex: 'male',
      phone: '+435564656' },
    { id: 2,
      first_name: 'Kasia',
      last_name: 'Sandwich',
      age: 18,
      sex: 'female',
      phone: '+4325324' },
    { id: 3,
      first_name: 'Jane',
      last_name: 'Walker',
      age: 60,
      sex: 'female',
      phone: '+43553456' },
    { id: 4,
      first_name: 'Rafal',
      last_name: 'Ek',
      age: 34,
      sex: 'male',
      phone: '+4354324234' },
    { id: 5,
      first_name: 'Kam',
      last_name: 'Dobrz',
      age: 20,
      sex: 'male',
      phone: '+435223122' } ]


/**
 * @param {{e.RequestHandler}} jsonParser
 * @param {{changes:[{row:number,column:number,newValue:string,meta:{row:number,col:number,visualRow:number,visualCol:number,prop:number,row_id:number,col_id:any}}], source:String}} req.body
 */
router.post("/update", jsonParser, function (req, res, next) {
  res.json({ data: "ok" });
});

/**
 * @param {{e.RequestHandler}} jsonParser
 * @param {{createRow:{index:number,amount:number,source:string}}} req.body
 */
router.post("/create/row", jsonParser, function (req, res, next) {
  var row = {
    id: 6,
    first_name: '',
    last_name: '',
    age: '',
    sex: '',
    phone: '' }
  res.json({data:row, id:row.id});
});

var num = 0;

/**
 * @param {{e.RequestHandler}} jsonParser
 * @param {{createCol:{index:number,amount:number,source:string}}} req.body
 */
router.post("/create/column", jsonParser, function (req, res, next) {
  num++;
  res.json({name: 'dynamic_' + num})
});

/**
 * @param {{e.RequestHandler}} jsonParser
 * @param {{sort:[{key:string,values[any]}], filter:[key:string,value:string]}} req.query
 */
router.post("/data", function (req, res, next) {  
  let dataOrderedFiltered = JSON.parse(JSON.stringify(data));
  if (req.query.hasOwnProperty('order')) {
    dataOrderedFiltered = dataOrderedFiltered.sort( (a,b) => {
      if (a.last_name < b.last_name)
        return -1
      if (a.last_name > b.last_name)
        return 1
      return 0
    })
  }

  if (req.query.hasOwnProperty('filters')) {
    dataOrderedFiltered = dataOrderedFiltered.filter( (a) => {
      return a.age > 18
    })
  }
  res.json({ data: dataOrderedFiltered, meta: { colOrder: colOrder }, rowId: "id" });

});

/**
 * @param {{e.RequestHandler}} jsonParser
 * @param {{tmp:{columns:array,target:number}}} req.body
 */
router.post("/move/column", jsonParser, function (req, res, next) {
  res.json({ data: colOrder });
});

router.get("/settings", jsonParser, function (req, res, next) {
  res.json({ data: settings });
});

app.use(logger('dev'))
app.use(bodyParser.json())

app.use('/dummyusers', router)
app.use(express.static('public'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.listen(port, function () {
  console.log('Listening on port ' + port + '..')
})

module.exports = app
