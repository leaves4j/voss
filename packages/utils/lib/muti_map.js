/* eslint-disable no-underscore-dangle */
/**
 * MutiMap
 *
 * @export
 * @class MutiMap
 * @extends {Map}
 */
export default class MutiMap extends Map {
  _reserved = null;


  set(key, value) {
    if (!this._reserved) {
      this._reserved = new MutiMap();
      this._reserved.reserved = this;
    }
    this._set(key, value);
    this._reserved._set(value, key);
  }

  _set(key, value) {
    let values = this.get(key);
    if (values === undefined) {
      values = new Set();
      super.set(key, values);
    }
    values.add(value);
  }

  delete(key, value) {
    if (arguments.length === 2) {
      this._reserved._delete(value, key);
      this._delete(key, value);
    } else {
      const values = this.get(key);
      if (values === undefined) return;
      values.forEach((reservedKey) => {
        this._reserved._delete(reservedKey, key);
      });
    }

    this._delete(key);
  }

  _delete(key, value) {
    if (arguments.length === 1) {
      super.delete(key);
    } else {
      const values = this.get(key);
      if (values === undefined) return;
      values.delete(value);
      if (values.size === 0) {
        super.delete(key);
      }
    }
  }

  reserve() {
    return this._reserved;
  }

  clear() {
    this._clear();
    this._reserved._clear();
  }

  _clear() {
    super.clear();
  }
}
