import objectUtils from '../utils/object-utils';
import Model from './Model';

export default class UserProfile extends Model {
  constructor(options = {}) {
    super();
    this.model = 'UserProfile';
    this.id = objectUtils.get(options, 'id', null);
    this.user_id = objectUtils.get(options, 'user_id', null);
    this.title = objectUtils.get(options, 'title', null);
    this.tagline = objectUtils.get(options, 'tagline', null);
    this.description = objectUtils.get(options, 'description', null);
  }
}
