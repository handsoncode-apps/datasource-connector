export default class URI {
    constructor(object) {
        this.object = object;
    }

    _serialie(object, prefix) {
        let queryStrings = [], property;
        for (property in object) {
            if (object.hasOwnProperty(property)) {
                let key = prefix ? prefix + '[' + property + ']' : property;
                let value = object[property];
                queryStrings.push((value !== null && typeof value === 'object') ? this._serialie(value, key) : encodeURIComponent(key) + '=' + encodeURIComponent(value));
            }
        }
        return queryStrings.join('&');
    }

    string() {
        if (this.object === undefined) {
            return '';
        }
        return '?' + this._serialie(this.object)
    }
}