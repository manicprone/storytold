import objectUtils from '../utils/object-utils';
import Model from './Model';

export default class Story extends Model {
  constructor(options = {}) {
    super();
    this.model = 'Story';
    this.id = objectUtils.get(options, 'id', null);
    this.user_id = objectUtils.get(options, 'user_id', null);
    this.title = objectUtils.get(options, 'title', null);
    this.subtitle = objectUtils.get(options, 'subtitle', null);
    this.slug = objectUtils.get(options, 'slug', null);
    this.description = objectUtils.get(options, 'description', null);
    this.image_url = objectUtils.get(options, 'image_url', null);
    this.persona_id = objectUtils.get(options, 'persona_id', null);
    this.is_public = objectUtils.get(options, 'is_public', null);
    this.chapters = objectUtils.get(options, 'chapters', []);
  }
}
