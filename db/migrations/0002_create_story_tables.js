
exports.up = function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('stories', (table) => {
      table.increments();
      table.integer('user_id').notNullable().unsigned().references('users.id');
      table.string('title').notNullable();
      table.string('subtitle').nullable();
      table.string('slug').nullable();
      table.text('description').nullable();
      table.string('image_url').nullable();
      table.integer('persona_id').nullable().unsigned().references('personas.id');
      table.boolean('is_public').notNullable().defaultTo(false);
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('chapters', (table) => {
      table.increments();
      table.integer('user_id').notNullable().unsigned().references('users.id');
      table.string('title').notNullable();
      table.string('subtitle').nullable();
      table.string('label').nullable();
      table.text('description').nullable();
      table.string('image_url').nullable();
      table.dateTime('started_at').nullable();
      table.dateTime('finished_at').nullable();
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('story_chapters_ref', (table) => {
      table.increments();
      table.integer('story_id').notNullable().unsigned().references('stories.id');
      table.integer('chapter_id').notNullable().unsigned().references('chapters.id');
      table.integer('story_order').nullable();
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('places', (table) => {
      table.increments();
      table.integer('user_id').notNullable().unsigned().references('users.id');
      table.string('name').notNullable();
      table.text('description').nullable();
      table.string('image_url').nullable();
      table.string('city').nullable();
      table.string('state').nullable();
      table.string('territory').nullable();
      table.string('country').nullable();
      table.integer('latitude').nullable();
      table.integer('longitude').nullable();
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('organizations', (table) => {
      table.increments();
      table.integer('user_id').notNullable().unsigned().references('users.id');
      table.string('name').notNullable();
      table.text('description').nullable();
      table.string('image_url').nullable();
      table.string('website_url').nullable();
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('projects', (table) => {
      table.increments();
      table.integer('user_id').notNullable().unsigned().references('users.id');
      table.string('name').notNullable();
      table.text('description').nullable();
      table.text('technical_details').nullable();
      table.string('image_url').nullable();
      table.string('website_url').nullable();
      table.integer('org_id').nullable().unsigned().references('organizations.id');
      table.dateTime('started_at').nullable();
      table.dateTime('finished_at').nullable();
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('people', (table) => {
      table.increments();
      table.integer('user_id').notNullable().unsigned().references('users.id');
      table.string('name').notNullable();
      table.text('description').nullable();
      table.string('image_url').nullable();
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('chapter_places_ref', (table) => {
      table.increments();
      table.integer('chapter_id').notNullable().unsigned().references('chapters.id');
      table.integer('place_id').notNullable().unsigned().references('places.id');
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('chapter_organizations_ref', (table) => {
      table.increments();
      table.integer('chapter_id').notNullable().unsigned().references('chapters.id');
      table.integer('org_id').notNullable().unsigned().references('organizations.id');
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('chapter_projects_ref', (table) => {
      table.increments();
      table.integer('chapter_id').notNullable().unsigned().references('chapters.id');
      table.integer('project_id').notNullable().unsigned().references('projects.id');
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists('chapter_people_ref', (table) => {
      table.increments();
      table.integer('chapter_id').notNullable().unsigned().references('chapters.id');
      table.integer('person_id').notNullable().unsigned().references('people.id');
      table.timestamps();
    }),
  ]);
};

exports.down = function down(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('chapter_people_ref'),
    knex.schema.dropTableIfExists('chapter_projects_ref'),
    knex.schema.dropTableIfExists('chapter_organizations_ref'),
    knex.schema.dropTableIfExists('chapter_places_ref'),
    knex.schema.dropTableIfExists('story_chapters_ref'),
  ]).then(() => {
    return Promise.all([
      knex.schema.dropTableIfExists('people'),
      knex.schema.dropTableIfExists('projects'),
      knex.schema.dropTableIfExists('organizations'),
      knex.schema.dropTableIfExists('places'),
      knex.schema.dropTableIfExists('chapters'),
      knex.schema.dropTableIfExists('stories'),
    ]);
  });
};
