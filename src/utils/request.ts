/**
 * This class represents the http request call in xhr context
 */
export default class Request {
  public url: string;
  public method: string;
  public headers: object;
  public body = '';
  
  constructor(headers: object) {
    this.url = '';
    this.method = 'GET';
    this.headers = headers !== undefined ? headers : { 'Content-Type': 'application/json' };
    this.body = '';
  }
}
