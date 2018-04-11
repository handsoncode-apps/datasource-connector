export default class URI {
  constructor(private object: object) {
  }

   private serialize(object: object, prefix: string): string {
    let queryStrings = [],
      property;
    for (property in object) {
      if (Object.prototype.hasOwnProperty.call(object, property)) {
        let key = prefix ? `${prefix}[${property}]` : property;
        let value = (object as { [index: string]: any })[property];
        queryStrings.push((value !== null && typeof value === 'object') ? this.serialize(value, key) : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
    return queryStrings.join('&');
  }

  public string() {
    return this.object === undefined ? '' : `?${this.serialize(this.object, "")}`;
  }
}
