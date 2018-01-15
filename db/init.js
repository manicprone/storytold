const dbManager = require('knex-db-manager');
const sysConfig = require('./config');
const dbConfig = require('./settings');

const log = true;

const superUser = process.env.superuser;
const superPassword = process.env.superpassword || '';
const sysInfo = sysConfig.development;

const dbManagerConfig = {
  knex: {
    client: 'postgres',
    connection: dbConfig.development.connection,
    pool: dbConfig.development.pool,
    migrations: dbConfig.development.migrations,
  },
  dbManager: {
    collate: [sysInfo.collation],
    superUser,
    superPassword,
  },
};

const DB = dbManager.databaseManagerFactory(dbManagerConfig);
const engine = dbManagerConfig.knex.client;
const owner = dbConfig.development.connection.user;
const database = dbConfig.development.connection.database;

if (log) console.log(`[DB-INIT] bootstrapping development (${engine})...`);

DB.createDbOwnerIfNotExist()
  .then(() => {
    if (log) console.log('[DB-INIT] DB owner:', owner);
    return DB.createDb()
      .then(() => {
        if (log) console.log('[DB-INIT] Database created:', database);
      })
      .catch((createDbError) => {
        if (log) console.error('[DB-INIT] encountered an error =>', createDbError);
      });
  })
  .catch((createOwnerError) => {
    if (log) console.error('[DB-INIT] encountered an error =>', createOwnerError);
  })
  .finally(() => {
    DB.close();
    return true;
  });
