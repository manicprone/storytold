// ----------------------------------
// Methods for resource: UserSettings
// ----------------------------------

module.exports = {
  modelName: 'UserSettings',

  methods: [
    {
      name: 'saveSettings',
      action: 'upsertItem',
      spec: {
        fields: [
          { name: 'user_id', type: 'Number', required: true, lookup: true },
          { name: 'settings', type: 'JSON', required: true },
        ],
      },
    },
    {
      name: 'getSettings',
      action: 'getItem',
      spec: {
        fields: [
          { name: 'user_id', type: 'Number', required: true },
        ],
      },
    },
  ],
};
