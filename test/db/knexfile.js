module.exports = {
  // ---------------------------
  // Test DB: sqlite3 (embedded)
  // ---------------------------
  test: {
    client: 'sqlite3',
    connection: {
      filename: './test/db/myapp_test.sqlite3',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './test/db/seeds',
    },
  },
};
