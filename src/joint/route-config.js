// ------------
// route-config
// ------------

export default [
  // ------------------------------------------------------------ Public Stories
  {
    uri: '/stories',
    get: { method: 'Story.getPublicStories' },
  },

  // ---------------------------------------------------------------------- User
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
    post: { method: 'UserProfile.updateUserProfile', body: true },
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

  // ------------------------------------------------------------- User Chapters
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

  // -------------------------------------------------------------- User Stories
  {
    uri: '/user/:user_id/story',
    post: { method: 'Story.createStory', successStatus: 201, body: true },
  },
  {
    uri: '/user/:user_id/story/:id',
    get: { method: 'Story.getStory' },
    post: { method: 'Story.updateStory', body: true },
    delete: { method: 'Story.deleteStory', successStatus: 204 },
  },
  {
    uri: '/user/:user_id/stories',
    get: { method: 'Story.getStories' },
  },

  // ------------------------------------------------------------ Story Chapters
  {
    uri: '/story-chapter',
    post: { method: 'StoryChapter.createRef', successStatus: 201, body: true },
  },
  {
    uri: '/story-chapter/:id',
    get: { method: 'StoryChapter.getRef' },
    post: { method: 'StoryChapter.updateRef', body: true },
    delete: { method: 'StoryChapter.deleteRef', successStatus: 204 },
  },
  {
    uri: '/story-chapters',
    get: { method: 'StoryChapter.getRefs' },
  },
];
