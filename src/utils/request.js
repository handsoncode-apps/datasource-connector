/**
 * This class represents the http request call in xhr context
 */
export default class Request {
  constructor(headers) {
    this.url = '';
    this.method = 'GET';
    this.headers = headers !== undefined ? headers : { 'Content-Type': 'application/json' };
    this.body = '';
  }
}
