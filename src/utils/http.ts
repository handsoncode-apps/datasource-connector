import Request from './request';
import Data from './data';

/**
 * Send the xhr request to server
 *
 * @param {Request} obj Request object
 * @returns {Promise}
 */
export default class Http {
  private listeners: { (data: Data): void;} [];
  public defaultHeaders: object;
  
  constructor(public controllerUrl: string) {
    this.listeners = [];
    this.defaultHeaders = {};
  }

  /**
     * make a callback function that listen for HTTP events
     *
     * @param {function} callback
     */
  public addListener(callback: (data: Data)=>void) {
    if (typeof callback === 'function' || false) {
      this.listeners.push(callback);
    }
  }

  /**
     * this method emit the onDataSend event to listeners
     *
     * @param {any} args
     */
  public onDataSend(data: Data) {
    if (this.listeners && this.listeners.length) {
      this.listeners.forEach((listener) => {
        setTimeout(() => { listener(data); }, 5);
      });
    }
  }

  /**
   * make HTTP DELETE to url with payload data
   *
   * @param {string} url
   * @param {any} data
   */
  public delete(url: string, data: any) {
    var request = new Request(this.defaultHeaders);
    request.url = this.controllerUrl + url;
    request.method = 'DELETE';
    request.body = JSON.stringify(data);

    return this.request(request).then(
      (value: any) => {
        this.onDataSend(new Data(request, JSON.parse(value)));
        return JSON.parse(value);
      }
    );
  }

  /**
     * make HTTP PUT to url with payload data
     *
     * @param {string} url
     * @param {any} data
     */
  put(url: string, data: object) {
    var request = new Request(this.defaultHeaders);
    request.url = this.controllerUrl + url;
    request.method = 'PUT';
    request.body = JSON.stringify(data);

    return this.request(request).then(
      (value: any) => {
        this.onDataSend(new Data(request, JSON.parse(value)));
        return JSON.parse(value);
      }
    );
  }

  /**
     * make HTTP POST to url with payload data
     *
     * @param {string} url
     * @param {any} data
     */
  public post(url: string, data: any) {
    var request = new Request(this.defaultHeaders);
    request.url = this.controllerUrl + url;
    request.method = 'POST';
    request.body = JSON.stringify(data);

    return this.request(request).then(
      (value: any) => {
        this.onDataSend(new Data(request, JSON.parse(value)));
        return JSON.parse(value);
      }
    );
  }

  /**
     * make HTTP GET call on url
     *
     * @param {string} url
     */
  public get(url: string) {
    var request = new Request(this.defaultHeaders);
    request.url = this.controllerUrl + url;

    return this.request(request).then(
      (value: any) => {
        this.onDataSend(new Data(request, JSON.parse(value)));
        return JSON.parse(value);
      }
    );
  }

  /**
    *
    * @param {Request} obj
    */
  public request(obj: Request) {
    return new Promise((resolve: any, reject: any) => {
      let xhr = new XMLHttpRequest();
      xhr.open(obj.method || 'GET', obj.url);
      if (obj.headers) {
        Object.keys(obj.headers).forEach((key) => {
          xhr.setRequestHeader(key, (obj as { [index: string]: any }).headers[key]);
        });
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send(obj.body);
    });
  };
}
