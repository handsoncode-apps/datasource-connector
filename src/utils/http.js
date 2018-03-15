import Request from './request'

/**
 * Send the xhr request to server 
 * 
 * @param {Reqest} obj Request object
 * @returns {Promise}
 */
export default class Http {

    constructor(controllerUrl) {
        this.controllerUrl = controllerUrl;
        this.listeners = new Map();
    }

    addListener(callback) {
        if (typeof callback === 'function' || false) {
            this.listeners.push(callback);
        }
    }

    onDataSend(...args){
        if (this.listeners && this.listeners.length) {
            this.listeners.forEach((listener) => {
                listener(...args); 
            });
        }
    }

    /**
     * make HTTP POST to url with payload data
     * 
     * @param {string} url 
     * @param {any} data 
     */
    post(url, data) {

        let request = new Request();
        request.url = this.controllerUrl + url;
        request.method = 'POST';
        request.body = JSON.stringify(data);

        return this.request(request).then(
            value => {
                this.onDataSend({ reqest: request, response: JSON.parse(value) });
                return JSON.parse(value);
            }
        )
    }

    /**
     * make HTTP GET call on url
     * 
     * @param {string} url 
     */
    get(url) {
        var request = new Request();
        request.url = this.controllerUrl + url;

        return this.request(request).then(
            value => {
                this.onDataSend({ reqest: request, response: JSON.parse(value) });
                return JSON.parse(value);
            }
        )
    }

    /**
     * 
     * @param {object} obj 
     */
    request(obj) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(obj.method || "GET", obj.url);
            if (obj.headers) {
                Object.keys(obj.headers).forEach(key => {
                    xhr.setRequestHeader(key, obj.headers[key]);
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