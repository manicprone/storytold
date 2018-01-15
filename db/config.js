module.exports = {

  // ---------------------------------------------------------------------------
  // Development DB Environment
  // ---------------------------------------------------------------------------
  // To create the app database/user for the first time, execute:
  // npm run db-init
  // ---------------------------------------------------------------------------
  development: {
    host: '127.0.0.1',
    port: '5432',
    database: 'storytold_iso_dev',
    collation: 'en_US.UTF-8',
    user: 'storytold',
    password: 'this-is-the-story-told',
  },

};
