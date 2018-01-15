
exports.up = function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', (table) => {
      table.increments();
      table.string('external_id').nullable();
      table.string('username').notNullable().unique();
      table.string('email').nullable().unique();
      table.string('display_name').nullable();
      table.string('first_name').nullable();
      table.string('last_name').nullable();
      table.string('preferred_locale').nullable();
      table.string('avatar_url').nullable();
      table.dateTime('last_login_at').nullable();
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('user_credentials', (table) => {
      table.string('username').notNullable().unique();
      table.string('credentials').nullable();
      table.integer('failed_attempts').notNullable().defaultTo(0);
      table.boolean('is_locked').notNullable().defaultTo(false);
      table.dateTime('last_accessed_at').nullable();
    }),
    knex.schema.createTableIfNotExists('user_info', (table) => {
      table.increments();
      table.integer('user_id').notNullable().unsigned().references('users.id');
      table.string('title').nullable();
      table.string('tagline').nullable();
      table.text('description').nullable();
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('roles', (table) => {
      table.increments();
      table.string('name').notNullable().unique();
      table.string('display_name').nullable();
      table.string('description').nullable();
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('user_roles_ref', (table) => {
      table.increments();
      table.integer('user_id').notNullable().unsigned().references('users.id');
      table.integer('role_id').notNullable().unsigned().references('roles.id');
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('user_app_settings', (table) => {
      table.increments();
      table.integer('user_id').notNullable().unsigned().references('users.id');
      table.jsonb('settings').nullable();
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('personas', (table) => {
      table.increments();
      table.integer('user_id').notNullable().unsigned().references('users.id');
      table.string('name').nullable();
      table.string('tagline').nullable();
      table.text('description').nullable();
      table.string('avatar_url').nullable();
      table.boolean('use_account_avatar').notNullable().defaultTo(false);
      table.boolean('is_default').notNullable().defaultTo(false);
      table.timestamps();
    }),
  ]);
};

exports.down = function down(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('personas'),
    knex.schema.dropTableIfExists('user_app_settings'),
    knex.schema.dropTableIfExists('user_roles_ref'),
    knex.schema.dropTableIfExists('user_info'),
    knex.schema.dropTableIfExists('user_credentials'),
  ]).then(() => {
    return Promise.all([
      knex.schema.dropTableIfExists('roles'),
      knex.schema.dropTableIfExists('users'),
    ]);
  });
};
