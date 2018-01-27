import objectUtils from '../utils/object-utils';
import Model from './Model';

export default class StoryChapter extends Model {
  constructor(options = {}) {
    super();
    this.model = 'StoryChapter';
    this.id = objectUtils.get(options, 'id', null);
    this.story_id = objectUtils.get(options, 'story_id', null);
    this.chapter_id = objectUtils.get(options, 'chapter_id', null);
    this.story_order = objectUtils.get(options, 'story_order', null);
  }
}
