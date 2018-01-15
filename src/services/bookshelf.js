import dbSettings from '../../db/settings';

const env = process.env.NODE_ENV || 'development';
const db = dbSettings[env];

// Configure knex...
const knex = require('knex')({
  client: db.client,
  connection: db.connection,
  migrations: db.migrations,
  seeds: db.seeds,
  useNullAsDefault: true,
  // debug: true,
});

// Initialize bookshelf...
const bookshelf = require('bookshelf')(knex);

// Enable plugins...
bookshelf.plugin('registry');
bookshelf.plugin('pagination');

module.exports = bookshelf;
