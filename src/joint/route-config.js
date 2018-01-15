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

    // ----------------------------------------------------------- User Chapters
    {
      uri: '/user/:user_id/chapter',
      post: { method: 'Chapter.createChapter', successStatus: 201, body: true },
    },
    {
      uri: '/user/:user_id/chapter/:id',
      get: { method: 'Chapter.getChapter' },
      post: { method: 'Chapter.updateChapter', body: true },
      delete: { method: 'Chapter.deleteChapter', successStatus: 204 },
    },
    {
      uri: '/user/:user_id/chapters',
      get: { method: 'Chapter.getChapters' },
    },
  ], // END - routes

};
