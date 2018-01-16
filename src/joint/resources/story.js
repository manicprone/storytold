// -----------------------------
// Methods for resource: Story
// -----------------------------

module.exports = {
  modelName: 'Story',

  methods: [
    {
      name: 'createStory',
      action: 'createItem',
      spec: {
        fields: [
          { name: 'user_id', type: 'Number', required: true },
          { name: 'title', type: 'String', required: true },
          { name: 'subtitle', type: 'String' },
          { name: 'slug', type: 'String', defaultValue: '% kebabCase(title) %' },
          { name: 'description', type: 'String' },
          { name: 'image_url', type: 'String' },
          { name: 'is_public', type: 'Boolean', defaultValue: false },
          { name: 'persona_id', type: 'Number' },
        ],
      },
    },
    {
      name: 'updateStory',
      action: 'updateItem',
      spec: {
        fields: [
          { name: 'id', type: 'Number', required: true, lookup: true },
          { name: 'title', type: 'String' },
          { name: 'subtitle', type: 'String' },
          { name: 'slug', type: 'String' },
          { name: 'description', type: 'String' },
          { name: 'image_url', type: 'String' },
          { name: 'is_public', type: 'Boolean' },
          { name: 'persona_id', type: 'Number' },
        ],
      },
    },
    {
      name: 'getStory',
      action: 'getItem',
      spec: {
        fields: [
          { name: 'id', type: 'Number', requiredOr: true },
          { name: 'slug', type: 'String', requiredOr: true },
        ],
      },
    },
    {
      name: 'getStories',
      action: 'getItems',
      spec: {
        fields: [
          { name: 'user_id', type: 'String' },
          { name: 'is_public', type: 'Boolean' },
          { name: 'persona_id', type: 'Number' },
        ],
        defaultOrderBy: '-created_at,title',
      },
    },
    {
      name: 'getPublicStories',
      action: 'getItems',
      spec: {
        fields: [
          { name: 'is_public', type: 'Boolean', locked: true, defaultValue: true },
          { name: 'user_id', type: 'String' },
          { name: 'persona_id', type: 'Number' },
        ],
        defaultOrderBy: '-updated_at',
      },
    },
    {
      name: 'deleteStory',
      action: 'deleteItem',
      spec: {
        fields: [
          { name: 'id', type: 'Number', required: true },
        ],
      },
    },
  ],
};
