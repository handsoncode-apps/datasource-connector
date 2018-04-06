Handsontable Datasource Communication
============================
API description for Handsontable datasource backend

[Find out more about Handsontable](https://docs.handsontable.com/pro/1.18.1/tutorial-introduction.html)

To receive HOT events on backend you should implement methods listed below. Each method has it's own request and response schema that is described with examples in [Models section](#models).

You may get the [OpenAPI Specification](swagger.yaml) for this communication endpoint and models (for view it please use swagger editor).

**controllerName** is the custom name given to your controller, where all endpoints definitions.

### /controllerName/data
---
##### ***POST***
**Summary:** Method that should return sorted and filtered data

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| DataModel | body | Object containing changes of filterng and order made by Handsontable user | Yes | [DataModel](#datamodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [DataResponseModel](#dataresponsemodel) |

### /controllerName/update
---
##### ***POST***
**Summary:** Method that should be used for update specific cell value

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| UpdateModel | body | Object containg all changes made by Handsontable user | Yes | [UpdateModel](#updatemodel) |


**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [SimpleResponseModel](#simpleresponsemodel) |

### /controllerName/create/row
---
##### ***POST***
**Summary:** Method that should handle creating a new row on a server side

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| CreateModel | body | Object containing information about created  rows | Yes | [CreateModel](#createmodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [CreateRowResponseModel](#createrowresponsemodel) |

### /controllerName/remove/row
---
##### ***POST***
**Summary:** Method that should handle removing row on a server side

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| RemoveRowModel | body | Array that contains ids of removed rows | Yes | [RemoveRowModel](#removerowmodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [SimpleResponseModel](#simpleresponsemodel) |

### /controllerName/move/row
---
##### ***POST***
**Summary:** Method that should be used for moving row to different position in dataset

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| MoveRowModel | body | Object containing informations about moved rows | Yes | [MoveRowModel](#moverowmodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [SimpleResponseModel](#simpleresponsemodel) |

### /controllerName/create/column
---
##### ***POST***
**Summary:** Method that should handle creating a new column on a server side

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| CreateModel | body | Object containing information about created columns | Yes | [CreateModel](#createmodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [CreateColumnResponseModel](#createcolumnresponsemodel) |

### /controllerName/remove/column
---
##### ***POST***
**Summary:** Method that should handle removing column on a server side

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| RemoveColModel | body | Array that contains unique names of removed columns | Yes | [ string ] |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [SimpleResponseModel](#simpleresponsemodel) |

### /controllerName/move/column
---
##### ***POST***
**Summary:** Method that should be used for moving column to different position in dataset

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| MoveColModel | body | Object containing array of moved columns unique names | Yes | [MoveColModel](#movecolmodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [MoveColumnResponseModel](#movecolumnresponsemodel) |

### /controllerName/settings
---
##### ***GET***
**Summary:** Method that should return all set options for Handsontable.

**Parameters**

No parameters required

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [SettingsModel](#movecolumnresponsemodel) |

### Models
---

### ChangeModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| row | string | Specifies the row unique name. Could be either number or string type. | Yes |
| column | string | Specifies the column unique name. Could be either number or string type. | Yes |
| oldValue | string | Previous value of the cell | Yes |
| newValue | string | New value of the cell | Yes |

example:
```json
"changes": [
    {
      "row": "string",
      "column": "string",
      "oldValue": "string",
      "newValue": "string"
    }
  ]
```
### ConditionModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string | Name of filtering type. 
 * `eq` - equal to
 * `neq` - not equal to
 * `empty` - is empty
 * `not_empty` - is not empty
 * `begins_with` - begins with
 * `ends_with` - ends with
 * `contains` - contains
 * `not_contains` - does not contains
 | No |
| args | [ string ] |  | No |

### CreateColumnResponseModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string | Name of column granted by backend server. | Yes |

example:
```json
{
  "name": "dynamic_1"
}
```

### CreateModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| index | integer | Index of the created row/column. | Yes |
| amount | integer | Amount of created rows/columns. | Yes |
| source | string | Defines the source of the change. F.e "ContextMenu.rowBelow" | Yes |

example:
```json
{
  "index": 0,
  "amount": 0,
  "source": "string"
}
```

### CreateRowResponseModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | object | Object of your dataset scheme. Contains values of created row. | Yes |
| id | string | Id granted by backend server to that row. | Yes |

example:
```json
{
  "data": {},
  "id": "string"
}
```

### DataModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| order | [OrderModel](#ordermodel) |  | No |
| filters | [ [FilterModel](#filtermodel) ] |  | No |

example:
```json
{
  "order": {
    "column": "string",
    "order": "ASC"
  },
  "filters": [
    {
      "column": "string",
      "conditions": [
        {
          "name": "eq",
          "args": [
            "string"
          ]
        }
      ]
    }
  ]
}
```
### DataResponseModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ object ] | Object of your dataset scheme. Contains values of created row. | Yes |
| rowId | string | Unique name of key column. | Yes |
| meta | object | Additional meta properties. Can contains order of columns. | No |

example:
```json
{
  "data": [
    {}
  ],
  "rowId": "string",
  "meta": {
    "colOrder": [
      "id",
      "first_name",
      "last_name",
      "age",
      "sex"
    ]
  }
}
```

### FilterModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| column | string | Unique column name. | No |
| conditions | [ [ConditionModel](#conditionmodel) ] |  | No |

example:
```json
 "filters": [
    {
      "column": "string",
      "conditions": [
        {
          "name": "eq",
          "args": [
            "string"
          ]
        }
      ]
    }
  ]
  ```

### MoveColModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| colsMoved | [ string ] | Array that contains unique names of moved columns. | No |
| target | integer | Target index in dataset for moved columns. | Yes |

example:
```json
{
  "colsMoved": [
    "string"
  ],
  "target": 0
}
```
### MoveColumnResponseModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ string ] | Array that contains a current sequence of columns. | Yes |

example:
```json
{
  "data": [
    "string"
  ]
}
```

### MoveRowModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| rowsMoved | [ integer ] | Array that contains Ids of moved rows | Yes |
| target | integer | Target index in dataset for moved rows. | Yes |

example:
```json
{
  "rowsMoved": [
    0
  ],
  "target": 0
}
```

### OrderModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| column | string | Unique column name. | No |
| order | string | Specifies ascending or descending order of column values.  Sort order<br>* `ASC` - Ascending, from A to Z<br>* `DESC` - Descending, from Z to A | No |

 example:
```json
 "order": {
    "column": "string",
    "order": "ASC|DESC"
  }
```

### RemoveRowModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| rowsRemoved | [ integer ] | Array that contains Ids of removed rows | Yes |


example:
```json
{
  "rowsRemoved": [
    0
  ]
}
```

### SettingsModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | object | Object contains whole set of options for Handsontable. For all available option properties go to https://docs.handsontable.com/0.38.1/Options.html | Yes |

example:
```json
{
  "data": {}
}
```

### SimpleResponseModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | string | Response message. | Yes |

example:
```json
{
  "data": "string"
}
```

### UpdateModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| changes | [ [ChangeModel](#changemodel) ] | todo | Yes |
| meta | object | Additional meta properties | Yes |
| source | string | Defines the source of the changes. F.e. "edit" | Yes |

example:
```json
{
  "changes": [
    {
      "row": "string",
      "column": "string",
      "oldValue": "string",
      "newValue": "string"
    }
  ],
  "meta": {
    "row": 1,
    "col": 1,
    "visualRow": 1,
    "visualCol": 1,
    "prop": 1,
    "row_id": 2,
    "col_id": "first_name"
  },
  "source": "string"
}
```