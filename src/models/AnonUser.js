
export default class AnonUser {
  constructor() {
    this.model = 'AnonUser';
    this.is_anon = true;
    this.is_logged_in = false;
    this.id = -1;
    this.external_id = -1;
    this.username = null;
    this.display_name = 'Anonymous';
    this.avatar_url = null;
  }
}
