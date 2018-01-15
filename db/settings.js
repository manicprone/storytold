const sysConfig = require('./config');

module.exports = {
  // -------------------------
  // Development (development)
  // -------------------------
  development: {
    client: 'pg',
    connection: {
      host: sysConfig.development.host,
      port: sysConfig.development.port,
      database: sysConfig.development.database,
      user: sysConfig.development.user,
      password: sysConfig.development.password,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds/development/' + process.env.SEED_DATA,
    },
  },

  // -----------------------
  // Production (production)
  // -----------------------
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds/production/' + process.env.SEED_DATA,
    },
  },
};
