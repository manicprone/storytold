import objectUtils from '../utils/object-utils';
import Model from './Model';

export default class UserSettings extends Model {
  constructor(options = {}) {
    super();
    this.model = 'UserSettings';
    this.id = objectUtils.get(options, 'id', null);
    this.user_id = objectUtils.get(options, 'user_id', null);
    this.settings = objectUtils.get(options, 'settings', {});
  }
}
