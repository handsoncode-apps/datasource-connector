/**
 * This class represents the http request call in xhr context
 */
export default class Request {
  constructor() {
    this.url = '';
    this.method = 'GET';
    this.headers = { 'Content-Type': 'application/json' };
    this.body = '';
  }
}
