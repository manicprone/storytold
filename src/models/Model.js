import objectUtils from '../utils/object-utils';

export default class Model {
  constructor() {
    this.model = 'Model';
  }

  serialize() {
    return objectUtils.mapValues(this, (value) => {
      if (typeof value === 'boolean') return String(value);
      return value;
    });
  }
}
