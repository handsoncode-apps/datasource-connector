Handsontable Datasource Node
============================
API description for Handsontable backend. To receive HOT events on backend you should implement methods listed below. Each method has it's own request and response schema that is described with examples in [Models section](#models). You may get the [OpenAPI Specification](swagger.yaml) for this communication endpoint and models (for view it please use swagger editor).

**Version:** 1.0.0

[Find out more about Handsontable](https://docs.handsontable.com/pro/1.18.1/tutorial-introduction.html)
### /cell
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

### /cell/meta
---
##### ***POST***
**Summary:** Method that should handle change of cell meta

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| CellMetaModel | body |  | Yes | [CellMetaModel](#cellmetamodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [SimpleResponseModel](#simpleresponsemodel) |

### /cell/merge
---
##### ***POST***
**Summary:** Method that should be used for merging selected cells

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| MergeCellsModel | body |  | Yes | [MergeCellsModel](#mergecellsmodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [SimpleResponseModel](#simpleresponsemodel) |

### /cell/unmerge
---
##### ***POST***
**Summary:** Method that should be used for spliting merged cells

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| UnmergeCellsModel | body |  | Yes | [UnmergeCellsModel](#unmergecellsmodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [UnmergeCellsResponseModel](#unmergecellsresponsemodel) |

### /column
---
##### ***PUT***
**Summary:** Method that should handle creating a new column on a server side

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| CreateModel | body |  | Yes | [CreateModel](#createmodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [CreateColumnResponseModel](#createcolumnresponsemodel) |

##### ***DELETE***
**Summary:** Method that should handle removing column on a server side

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| RemoveRowModel | body | Array that contains unique names of removed columns | Yes | [ string ] |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [SimpleResponseModel](#simpleresponsemodel) |

### /column/move
---
##### ***POST***
**Summary:** Method that should be used for moving column to different position in dataset

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| MoveColumnModel | body |  | Yes | [MoveColumnModel](#movecolumnmodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [MoveColumnResponseModel](#movecolumnresponsemodel) |

### /column/resize
---
##### ***POST***
**Summary:** Method that should be used for setting new size of column

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| ResizeColumnModel | body |  | Yes | [ResizeColumnModel](#resizecolumnmodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [SimpleResponseModel](#simpleresponsemodel) |

### /data
---
##### ***POST***
**Summary:** Method that should return sorted and filtered data

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| DataModel | body |  | No | [DataModel](#datamodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [DataResponseModel](#dataresponsemodel) |

### /row
---
##### ***PUT***
**Summary:** Method that should handle creating a new row on a server side

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| CreateModel | body |  | Yes | [CreateModel](#createmodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [CreateRowResponseModel](#createrowresponsemodel) |

##### ***DELETE***
**Summary:** Method that should handle removing row on a server side

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| RemoveRowModel | body | Array that contains ids of removed rows | Yes | [ string ] |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [SimpleResponseModel](#simpleresponsemodel) |

### /row/move
---
##### ***POST***
**Summary:** Method that should be used for moving row to different position in dataset

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| MoveRowModel | body |  | Yes | [MoveRowModel](#moverowmodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [SimpleResponseModel](#simpleresponsemodel) |

### /row/resize
---
##### ***POST***
**Summary:** Method that should be used for setting new size of the row

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| ResizeRowModel | body |  | Yes | [ResizeRowModel](#resizerowmodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [SimpleResponseModel](#simpleresponsemodel) |

### /settings
---
##### ***GET***
**Summary:** Method that should return all set options for Handsontable.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| SettingsModel | body |  | Yes | [SettingsModel](#settingsmodel) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | successful operation | [MoveColumnResponseModel](#movecolumnresponsemodel) |

### Models
---

### CellMetaModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| row | number | rowId from database | Yes |
| column | string | colId from database | Yes |
| key | string | Updated meta key | Yes |
| value | string | Updated meta value | Yes |

### ChangeModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| row | string | Specifies the row unique name. Could be either number or string type. | Yes |
| column | string | Specifies the column unique name. Could be either number or string type. | Yes |
| oldValue | string | Previous value of the cell | Yes |
| newValue | string | New value of the cell | Yes |

### ConditionModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string | Name of filtering type. <br>* `eq` - equal to <br>* `neq` - not equal to <br>* `empty` - is empty <br>* `not_empty` - is not empty <br>* `begins_with` - begins with <br>* `ends_with` - ends with <br>* `contains` - contains <br>* `not_contains` - does not contains <br>
 | No |
| args | [ string ] |  | No |

### CreateColumnResponseModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | object | Name of column granted by backend server. | Yes |

### CreateModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| index | integer | Index of the created row/column. | Yes |
| amount | integer | Amount of created rows/columns. | Yes |
| source | string | Defines the source of the change. F.e "ContextMenu.rowBelow" | Yes |

### CreateRowResponseModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | object | Object of your dataset scheme. Contains values of created row. | Yes |
| id | string | Id granted by backend server to that row. | Yes |

### DataModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| sort | [OrderModel](#ordermodel) |  | No |
| filters | [ [FilterModel](#filtermodel) ] |  | No |

### DataResponseModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ object ] | Object of your dataset scheme. Contains values of created row. | Yes |
| rowId | string | Unique name of key column. | Yes |
| meta | [ object ] | Additional meta properties. Can contains order of columns. | No |
| colOrder | object |  | No |

### FilterModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| column | string | Unique column name. | No |
| conditions | [ [ConditionModel](#conditionmodel) ] |  | No |

### MergeCellsModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| rows | [ string ] | Array that contains rowIds | Yes |
| columns | [ string ] | Array that contains column names | Yes |

### MoveColumnModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| columnNames | [ string ] | Array that contains unique names of moved columns. | Yes |
| target | integer | Target index in dataset for moved column. | Yes |

### MoveColumnResponseModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | [ string ] | Array that contains a current sequence of columns. | Yes |

### MoveRowModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| rowsMoved | [ integer ] | Array that contains Ids of moved rows | Yes |
| target | integer | Target index in dataset for moved row. | Yes |

### OrderModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| column | string | Unique column name. | No |
| order | string | Specifies ascending or descending order of column values. <br>Sort order <br>* `asc` - Ascending, from A to Z <br>* `desc` - Descending, from Z to A <br>
 | No |

### ResizeColumnModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| column | string | The unique name of the column. | Yes |
| size | number | New column width. | Yes |

### ResizeRowModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| row | number | Unique row Id. | Yes |
| size | number | New row height. | Yes |

### SettingsModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | object | Object contaings all set options for Handsontable. For all available option properties go to https://docs.handsontable.com/0.38.1/Options.html | Yes |

### SimpleResponseModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | string | Response message. | Yes |

### UnmergeCellsModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| cellRange | string | Selection cell range | Yes |

### UnmergeCellsResponseModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| data | string | Response message. | Yes |

### UpdateModel  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| changes | [ [ChangeModel](#changemodel) ] | Object containg all changes made by Handsontable user | Yes |
| meta | object | Additional meta properties | Yes |
| source | string | Defines the source of the changes. F.e. "edit" | Yes |