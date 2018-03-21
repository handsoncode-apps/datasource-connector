export default class URI {
  constructor(object) {
    this.object = object;
  }

  _serialize(object, prefix) {
    let queryStrings = [],
      property;
    for (property in object) {
      if (Object.prototype.hasOwnProperty.call(object, property)) {
        let key = prefix ? `${prefix}[${property}]` : property;
        let value = object[property];
        queryStrings.push((value !== null && typeof value === 'object') ? this._serialize(value, key) : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
    return queryStrings.join('&');
  }

  string() {
    return this.object === undefined ? '' : `?${this._serialize(this.object)}`;
  }
}
