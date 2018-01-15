// ---------------------------------
// Methods for resource: UserProfile
// ---------------------------------

module.exports = {
  modelName: 'UserProfile',

  methods: [
    {
      name: 'createUserProfile',
      action: 'createItem',
      spec: {
        fields: [
          { name: 'user_id', type: 'Number', required: true },
          { name: 'title', type: 'String' },
          { name: 'tagline', type: 'String' },
          { name: 'description', type: 'String' },
        ],
      },
    },
    {
      name: 'updateUserProfile',
      action: 'updateItem',
      spec: {
        fields: [
          { name: 'user_id', type: 'Number', required: true, lookup: true },
          { name: 'tagline', type: 'String' },
          { name: 'tagline', type: 'String' },
          { name: 'description', type: 'String' },
        ],
      },
    },
  ],
};
