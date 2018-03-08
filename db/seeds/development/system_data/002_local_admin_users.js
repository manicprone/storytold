import moment from 'moment';

const tableNameUsers = 'users';
const tableNameUserInfo = 'user_info';
const tableNameUserRolesRef = 'user_roles_ref';

const seeds = [
  // ---------------------------------------------------------------------------
  // User: UberAdmin
  // ---------------------------------------------------------------------------
  {
    user: {
      external_id: null,
      email: 'uber_admin@mail.com',
      username: 'uber',
      display_name: 'UberAdmin',
      first_name: 'UberAdmin',
      last_name: null,
      preferred_locale: 'en-GB',
      avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Dopamine.svg/2000px-Dopamine.svg.png',
    },
    info: {
      title: 'Uber Administrator',
      tagline: 'Transcendent',
      description: null,
    },
    roles: [1], // transcendent
  },

  // ---------------------------------------------------------------------------
  // User: Admin
  // ---------------------------------------------------------------------------
  {
    user: {
      external_id: null,
      email: 'admin@mail.com',
      username: 'admin',
      display_name: 'Admin',
      first_name: 'Admin',
      last_name: null,
      preferred_locale: 'en-GB',
      avatar_url: 'http://3.bp.blogspot.com/-tvboVsCkKsQ/UElREyyTXMI/AAAAAAAAC7E/6RrGYyEWZuQ/s1600/cahaya+utara+september+2012.jpg',
    },
    info: {
      title: 'Administrator',
      tagline: 'Just Good Ol\' Admin',
      description: null,
    },
    roles: [2, 3], // admin, moderator
  },

  // ---------------------------------------------------------------------------
  // User: Mod
  // ---------------------------------------------------------------------------
  {
    user: {
      external_id: null,
      email: 'moderator@mail.com',
      username: 'mod',
      display_name: 'Mod',
      first_name: 'Mod',
      last_name: null,
      preferred_locale: 'en-GB',
      avatar_url: 'https://i.pinimg.com/736x/88/30/dc/8830dc9d1edd322189fe8530faa7421d--thunderstorm-photography-storms-photography.jpg',
    },
    info: {
      title: 'Moderator',
      tagline: 'Moderator of Ill Humanity',
      description: null,
    },
    roles: [3], // moderator
  },

];

exports.seed = function seed(knex, Promise) {
  const time = moment().utc();

  return Promise.all(seeds.map((data) => {
    const timestamp = time.add(5, 'minutes').format();

    const userData = data.user;
    const infoData = data.info;
    const roleRefs = data.roles;

    // Seed user...
    return knex(tableNameUsers).insert({
      ...userData,
      created_at: timestamp,
      updated_at: timestamp,
    }).returning('id').then((userID) => {

      // Seed user info...
      return knex(tableNameUserInfo).insert({
        ...infoData,
        user_id: Number(userID),
        created_at: timestamp,
        updated_at: timestamp,
      }).then(() => {

        // Seed user role refs...
        if (roleRefs) {
          const seedRoleRefs = [];
          const timeForRR = moment().utc();
          roleRefs.forEach((roleID) => {
            const timestampForRR = timeForRR.add(10, 'minutes').format();
            const seedEntry = knex(tableNameUserRolesRef).insert({
              user_id: Number(userID),
              role_id: Number(roleID),
              created_at: timestampForRR,
              updated_at: timestampForRR,
            });
            seedRoleRefs.push(seedEntry);
          });

          return Promise.all(seedRoleRefs);
        } // end-if (roleRefs)

        return true;
      });
    });

  }));
};
