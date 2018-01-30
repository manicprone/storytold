// ----------------------------------
// Methods for resource: StoryChapter
// ----------------------------------

module.exports = {
  modelName: 'StoryChapter',

  methods: [
    {
      name: 'createRef',
      action: 'createItem',
      spec: {
        fields: [
          { name: 'story_id', type: 'Number', required: true },
          { name: 'chapter_id', type: 'Number', required: true },
          { name: 'story_order', type: 'Number' },
        ],
      },
    },
    {
      name: 'updateRef',
      action: 'updateItem',
      spec: {
        fields: [
          { name: 'id', type: 'Number', required: true, lookup: true },
          { name: 'story_order', type: 'Number' },
        ],
      },
    },
    {
      name: 'getRef',
      action: 'getItem',
      spec: {
        fields: [
          { name: 'id', type: 'Number', required: true },
        ],
      },
    },
    {
      name: 'getRefs',
      action: 'getItems',
      spec: {
        fields: [
          { name: 'story_id', type: 'Number', required: true },
        ],
        defaultOrderBy: 'story_order',
      },
    },
    {
      name: 'deleteRef',
      action: 'deleteItem',
      spec: {
        fields: [
          { name: 'id', type: 'Number', required: true },
        ],
      },
    },
  ],
};
