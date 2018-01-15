import moment from 'moment';

const tableName = 'roles';

const seeds = [
  {
    id: 1,
    name: 'transcendent',
    display_name: 'Transcendent',
    description: 'Has no limits.',
  },
  {
    id: 2,
    name: 'admin',
    display_name: 'Admin',
    description: 'Can view and manage users, system data, and application settings',
  },
  {
    id: 3,
    name: 'moderator',
    display_name: 'Moderator',
    description: 'Can view and moderate all user-generated content',
  },
];

exports.seed = function seed(knex, Promise) {
  const time = moment().utc();

  return Promise.all(seeds.map((data) => {
    const timestamp = time.add(5, 'minutes').format();

    return knex(tableName).insert({
      ...data,
      created_at: timestamp,
      updated_at: timestamp,
    });
  }));
};
