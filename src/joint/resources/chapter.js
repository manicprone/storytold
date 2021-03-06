// -----------------------------
// Methods for resource: Chapter
// -----------------------------

module.exports = {
  modelName: 'Chapter',

  methods: [
    {
      name: 'createChapter',
      action: 'createItem',
      spec: {
        fields: [
          { name: 'user_id', type: 'Number', required: true },
          { name: 'title', type: 'String', required: true },
          { name: 'subtitle', type: 'String' },
          { name: 'label', type: 'String' },
          { name: 'description', type: 'String' },
          { name: 'image_url', type: 'String' },
          { name: 'started_at', type: 'String' },
          { name: 'finished_at', type: 'String' },
        ],
      },
    },
    {
      name: 'updateChapter',
      action: 'updateItem',
      spec: {
        fields: [
          { name: 'id', type: 'Number', required: true, lookup: true },
          { name: 'title', type: 'String' },
          { name: 'subtitle', type: 'String' },
          { name: 'label', type: 'String' },
          { name: 'description', type: 'String' },
          { name: 'image_url', type: 'String' },
          { name: 'started_at', type: 'String' },
          { name: 'finished_at', type: 'String' },
        ],
      },
    },
    {
      name: 'getChapter',
      action: 'getItem',
      spec: {
        fields: [
          { name: 'id', type: 'Number', required: true },
        ],
      },
    },
    {
      name: 'getChapters',
      action: 'getItems',
      spec: {
        fields: [
          { name: 'user_id', type: 'String' },
        ],
        defaultOrderBy: '-created_at,title',
      },
    },
    {
      name: 'deleteChapter',
      action: 'deleteItem',
      spec: {
        fields: [
          { name: 'id', type: 'Number', required: true },
        ],
      },
    },
  ],
};
