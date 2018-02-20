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

### After Column Sort

Method `POST /afterColumnSort`

Description: Thi event will be send to backend after sorting columns

Request Body schema:
```javascript 

   { 
     column:any,
     order:boolean
   }
```
Response `200 OK`


## Data

TBD