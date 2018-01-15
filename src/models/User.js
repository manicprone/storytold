import objectUtils from '../utils/object-utils';
import UserProfile from './UserProfile';
import Model from './Model';

export default class User extends Model {
  constructor(options = {}) {
    super();
    this.model = 'User';
    this.is_anon = false;
    this.is_logged_in = objectUtils.get(options, 'is_logged_in', false);
    this.id = objectUtils.get(options, 'id', -1);
    this.external_id = objectUtils.get(options, 'external_id', -1);
    this.username = objectUtils.get(options, 'username', null);
    this.email = objectUtils.get(options, 'email', null);
    this.display_name = objectUtils.get(options, 'display_name', null);
    this.first_name = objectUtils.get(options, 'first_name', null);
    this.last_name = objectUtils.get(options, 'last_name', null);
    this.preferred_locale = objectUtils.get(options, 'preferred_locale', null);
    this.avatar_url = objectUtils.get(options, 'avatar_url', null);
    this.avatar_thumb_url = (this.avatar_url) ? `${this.avatar_url}?sz=50` : null;
    this.roles = objectUtils.get(options, 'roles', []);
    if (options.profile) this.setProfile(options.profile);
  }

  login() {
    this.is_logged_in = true;
    return true;
  }

  logout() {
    this.is_logged_in = false;
    return true;
  }

  setProfile(profile) {
    this.profile = new UserProfile(profile);
  }

  hasRole(roleName) {
    return objectUtils.includes(this.roles, roleName);
  }

  getInfo() {
    return {
      is_logged_in: this.is_logged_in,
      user_id: this.id,
      external_id: this.external_id,
      username: this.username,
      email: this.email,
      display_name: this.display_name,
      avatar_url: this.avatar_url,
      roles: this.roles,
    };
  }

  toSession() {
    return JSON.stringify(this.getInfo());
  }
}
