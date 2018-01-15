// ------------
// route-config
// ------------

module.exports = {

  routes: [
    // -------------------------------------------------------------------- User
    {
      uri: '/user',
      get: { method: 'User.getUser' },
      post: { method: 'User.createUser', successStatus: 201, body: true },
    },
    {
      uri: '/user/:id/mark_login',
      post: { method: 'User.markLogin' },
    },
    {
      uri: '/user/:id',
      get: { method: 'User.getUser' },
      post: { method: 'User.updateUser', body: true },
      delete: { method: 'User.deleteUser', successStatus: 204, query: false },
    },
    {
      uri: '/user/:id/profile',
      post: { method: 'UserInfo.updateUserProfile', body: true },
    },
    {
      uri: '/user/:user_id/settings',
      get: { method: 'UserSettings.getSettings' },
      post: { method: 'UserSettings.saveSettings', body: true },
    },
    {
      uri: '/users',
      get: { method: 'User.getUsers' },
    },
  ], // END - routes

};
