// ---------------------------------------
// Methods for resource: StoryViewSettings
// ---------------------------------------

module.exports = {
  modelName: 'StoryViewSettings',

  methods: [
    {
      name: 'saveSettings',
      action: 'upsertItem',
      spec: {
        fields: [
          { name: 'story_id', type: 'Number', required: true, lookup: true },
          { name: 'settings', type: 'JSON', required: true },
        ],
      },
    },
    {
      name: 'getSettings',
      action: 'getItem',
      spec: {
        fields: [
          { name: 'story_id', type: 'Number', required: true },
        ],
      },
    },
  ],
};
