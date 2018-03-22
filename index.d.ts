import Http from "./src/utils/http";

declare module 'datasorce-connector' {
  
  declare class Order {
    column: string;
    order: boolean;
  }
  
  declare class Conditions {
    column: string;
    conditions: Array<Condition>;
  }

  declare class Condition {
    name: string;
    args: Array<Array<string>>
  }


  declare class DatasourceConnector {
    constructor(hot: Object);
    http : Http;
    colHeaders : Array<string>;
    filters : Array<Conditions>;
    order : Order;
  }
}
