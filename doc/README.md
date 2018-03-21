# Communication specification

## Events

To receive hot event in backend you should implement these methods: 

### After change

Method `POST /afterChange`

Description: This event will be send to backend after change of value of any cells

Request Body schema:

```javascript
{
  changes:[
   {
     row:number,
     column:any,
     oldValue:any,
     newValue:any
   }
  ],
  source: string
 }
```

Response `200 OK`

### After Create Col

Method `POST /afterCreateCol`

Description: This event will be send to backend after creating columns

Request Body schema:

```javascript
  {
    index:number,
    amount:number,
    source:string
  }
  ```

Response `200 OK`

### After Create Row

Method `POST /afterCreateRow`

Description: Thi event will be send to backend after creating rows

Request Body schema:

```javascript
{
  index:number,
  amount:number,
  source:string
}
```

Response `200 OK`

## Data

**data** is an array of objects that represent each row in table. Objects have two properties:

```javascript

{
    key: string,
    values: any
}
```
example of data format is:

```javascript

var data = [
   {
    key: "key1",
    value: "value1"
   },
  {
    key: "key2",
    value: "value3"
   },
   {
    key: "key3",
    value: "value3"
   },
  ];

```