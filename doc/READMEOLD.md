# Communication specification

To get formal specification go to [Handsontable Datasource Communication Models](communication.md)

## Events

To receive hot event on backend you should implement these methods: 

### After change data

Method `POST /update`

Description: This event will be send to backend after change of value of any cells

Request Body schema:

```javascript
{
  changes: [{
      row: number,
      column: any,
      oldValue: any,
      newValue: any,
      meta: [{
          metaName: metaValue,
          ...
        }
      }
    ]
  }
],
  source: string
}
```


Response `200 OK`
Expected Response body schema:
```javascript
{
  data:"ok"
}
```

### After Create Column

Method `POST /create/column`

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

### After Remove Column

Method `POST /data`

Description: This event will be send to backend after removing columns

Request Body schema:

```javascript
  {
    index:number,
    amount:number,
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

Method `POST /users/update`

Description: This event will be send to backend after creating rows

Request Body schema:

```javascript
{
  changes: [{
      row: number,
      column: any,
      oldValue: any,
      newValue: any,
      meta: [{
          metaName: metaValue,
          ...
        }
      }
    ]
  }
],
  source: string
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

### After Move Row

Method `POST /


## Data

### Pull data from backend 

Method `POST /data`

Request Body schema:

```javascript
{
  "order": {
    "column": "first_name",
    "order": "ASC"
  },
  "filters": [{
    "column": "first_name",
    "conditions": [{
      "name": "by_value",
      "args": [
        [
          "Jane"
        ]
      ]
    }]
  }]
}
```
- `order` is not required object
  - `column` (string): name of the column to sort by
  - `order`: ASC for ascending or DESC for descending 
- `filers` is not required array of objects with properties:
  - `column` - value of column is name of the column to filer by 
  - `conditions` - array of condition:
    - `name` with one of values:
      - "eq" - is equal to
      - "neq" - is not equal to
      - "empty" - is empty
      - "not_empty" - is not empty
      - "begins_with" - begins with
      - "ends_with" - ends with
      - "contains" - contains
      - "not_contains" - does not contain
      - "by_value" - by chosen values. In this case args array contains object where values of properties are chosen values. 
    - `args` - array of array of string arguments


Expected response `200 OK` 
Response body schemia:

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

`rowId` is the unique id for column name.
