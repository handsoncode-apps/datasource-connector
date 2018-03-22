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
Expected Response body schema:
```javascript
{
  name:column_name
}
```
Where column_name is the string assigned to the column on backend side.


### After Create Row

Method `POST /afterCreateRow`

Description: This event will be send to backend after creating rows

Request Body schema:

```javascript
{
  index:number,
  amount:number,
  source:string
}
```

Response `200 OK`
Expected Response body schema:
```javascript
{
  "data": {"key1":value1,"key2":value2 (..)},
  "id":"id"
}
```
Where:

`Data` is object represents new created row:

- `key1`, `key2` - Database names of column name 
- `value1`, `value2` -  Database values for each cell

There may be more columns in this object, but all need to have unique name.

`id` is the of unique id column name.


## Data

### Pull data from backend 

Method `GET /data`

Request parameters:

| Name | Description | Type | Required |
--------------------------------------
| column | Column name to be sorted | string | No |  
| order | Ascending order direction | boolean | No |
| filters | Condition filers array | Array of Conditions | No |

Expected response `200 OK` 
Response body format:

```javascript
{
  "data": [
    {"key1":value1,"key2":value2 (..)}
    ],
  "rowId":"id"
}
```
Where:

`Data` is an array of object represents each row:

- `key1`, `key2` - Database names of column name 
- `value1`, `value2` -  Database values for each cell

There may be more columns in this object, but all need to have unique name.

`rowId` is the of unique id column name.
