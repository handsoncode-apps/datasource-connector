/*!
 * 
 * Version: 1.0.0
 * Release date: 01/03/2018 (built at 03/04/2018 14:02:50)
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("DatasourceConector",[],e):"object"==typeof exports?exports.DatasourceConector=e():t.DatasourceConector=e()}(window,function(){return function(t){var e={};function o(r){if(e[r])return e[r].exports;var s=e[r]={i:r,l:!1,exports:{}};return t[r].call(s.exports,s,s.exports,o),s.l=!0,s.exports}return o.m=t,o.c=e,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},o.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";o.r(e);class r{constructor(t){this.url="",this.method="GET",this.headers=void 0!==t?t:{"Content-Type":"application/json"},this.body=""}}class s{constructor(t){this.controllerUrl=t,this.listeners=[],this.defaultHeaders={}}addListener(t){"function"==typeof t&&this.listeners.push(t)}onDataSend(...t){this.listeners&&this.listeners.length&&this.listeners.forEach(e=>{e(...t)})}post(t,e){var o=new r(this.defaultHeaders);return o.url=this.controllerUrl+t,o.method="POST",o.body=JSON.stringify(e),this.request(o).then(t=>(this.onDataSend({request:o,response:JSON.parse(t)}),JSON.parse(t)))}get(t){var e=new r(this.defaultHeaders);return e.url=this.controllerUrl+t,this.request(e).then(t=>(this.onDataSend({request:e,response:JSON.parse(t)}),JSON.parse(t)))}request(t){return new Promise((e,o)=>{let r=new XMLHttpRequest;r.open(t.method||"GET",t.url),t.headers&&Object.keys(t.headers).forEach(e=>{r.setRequestHeader(e,t.headers[e])}),r.onload=(()=>{r.status>=200&&r.status<300?e(r.response):o(r.statusText)}),r.onerror=(()=>o(r.statusText)),r.send(t.body)})}}class a extends Handsontable.plugins.BasePlugin{constructor(t){super(t),this.http={},this.colHeaders=[],this.filters=[],this.order={}}isEnabled(){let t=!!this.hot.getSettings().dataSourceConnector;if(t){let t=this.hot.getSettings().dataSourceConnector.controllerUrl;this.hot.addHook("onDataSend",this.hot.getSettings().dataSourceConnector.onDataSend),this.http=new s(t),this.http.defaultHeaders=this.hot.getSettings().dataSourceConnector.requestHeaders,this.http.addListener((...t)=>{this.hot.runHooks("onDataSend",t[0])})}return t}enablePlugin(){this.addHook("beforeColumnSort",()=>!1),this.addHook("beforeFilter",()=>!1),this.addHook("beforeRemoveCol",(t,e)=>this.onRemoveCol(t,e)),this.addHook("beforeRemoveRow",(t,e)=>this.onRemoveRow(t,e)),this.addHook("afterInit",()=>this.onAfterInit()),this.addHook("afterChange",(t,e)=>this.onAfterChange(t,e)),this.addHook("afterColumnSort",(t,e)=>this.onAfterColumnSort(t,e)),this.addHook("afterCreateRow",(t,e,o)=>this.onAfterCreateRow(t,e,o)),this.addHook("afterCreateCol",(t,e,o)=>this.onAfterCreateCol(t,e,o)),this.addHook("afterColumnMove",(t,e)=>this.onAfterColumnMove(t,e)),this.addHook("afterFilter",t=>this.onAfterFilter(t)),this.addHook("beforeRowMove",(t,e)=>this.onRowMove(t,e)),super.enablePlugin()}onAfterFilter(t){var e=hot.getPlugin("filters").conditionCollection.exportAllConditions();e.forEach((o,r)=>{e[r].column=this.colHeaders[t[r].column]}),this.filters=e;let o={order:this.order,filters:this.filters};this.http.post("/data",o).then(t=>{this._loadData(t)})}_move(t,e,o){if(o===e)return t;for(var r=t[e],s=o<e?-1:1,a=e;a!==o;a+=s)t[a]=t[a+s];return t[o]=r,t}onAfterColumnMove(t,e){var o=[],r=0;for(r=0;r<t.length;r++)o.push(this.colHeaders[t[r]]);var s={columnNames:o,target:e};this.http.post("/move/column",s).then(t=>{this.colHeaders=t.data})}onAfterCreateCol(t,e,o){var r={index:t,amount:e,source:o},s=0===t?1:0;this.http.post("/create/column",r).then(e=>{for(var o=this.hot.getData().length,r=0;r<o;r++)this.hot.setCellMeta(r,t,"row_id",this.hot.getCellMeta(r,s).row_id),this.hot.setCellMeta(r,t,"col_id",e.name)})}async onRemoveCol(t,e){for(var o=[],r=0;r<e;r++)o.push(this.colHeaders[r+t]);try{if((await this.http.post("/remove/column",o)).data){var s=await this.http.post("/data");return this._loadData(s),!0}}catch(t){return!1}}onAfterCreateRow(t,e,o){var r={index:t,amount:e,source:o};this.http.post("/create/row",r).then(e=>{for(var o=this.hot.getData()[t],r=1===t?2:1,s=0;s<o.length;s++){var a=this.hot.getCellMeta(r,s).col_id;this.hot.setCellMeta(t,s,"row_id",e.id),this.hot.setCellMeta(t,s,"col_id",a),this.hot.setDataAtCell(t,s,e.data[a])}})}onRemoveRow(t,e){for(var o=[],r=0;r<e;r++)o.push(this.hot.getCellMeta(r+t,1).row_id);this.http.post("/remove/row",o).then(t=>{if(!t)return!1})}onRowMove(t,e){for(var o=[],r=0;r<t.length;r++)o.push(this.hot.getCellMeta(t[r],1).row_id);var s={rowsMoved:o,target:e};this.http.post("/move/row",s)}onAfterColumnSort(t,e){this.order=void 0!==e?{column:this.colHeaders[t],order:!0===e?"ASC":"DESC"}:{};let o={order:this.order,filters:this.filters};this.http.post("/data",o).then(t=>{this._loadData(t)})}_loadData(t){let e=t.data,o=[];for(let t=0;t<e.length;t++){let r=[];for(let o in e[t])r.push(e[t][o]);o.push(r)}this.hot.loadData(o);let r=[];for(let t in e[0])r.push(t);this.colHeaders=r;for(let o=0;o<e.length;o++)for(let s=0;s<r.length;s++)this.hot.setCellMeta(o,s,"row_id",e[o][t.rowId]),this.hot.setCellMeta(o,s,"col_id",r[s])}onAfterInit(){this.http.get("/settings").then(t=>{this.hot.updateSettings(t.data)}),this.http.post("/data").then(t=>{this._loadData(t)})}disablePlugin(){super.disablePlugin()}updatePlugin(){this.disablePlugin(),this.enablePlugin(),super.updatePlugin()}onAfterChange(t,e){if(t){let o=[];for(let e=0;e<t.length;e++){let r=this.hot.getCellMeta(t[e][0],t[e][1]),s={row:r.row_id,column:r.col_id,oldValue:t[e][2],newValue:t[e][3],meta:r};delete s.meta.instance,o.push(s)}this.http.post("/update",{changes:o,source:e})}}destroy(){super.destroy()}}e.default=a;Handsontable.plugins.registerPlugin("DataSourceConnector",a)}]).default});