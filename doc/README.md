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
Method `POST /afterChange`
Description: Thi event will be send to backend after change of value of any cells
Request Body schema:
`
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
`
Response `200 OK`
### After Create Row
### After Column Sort
## Data