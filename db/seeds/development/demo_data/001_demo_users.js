import moment from 'moment';

const tableNameUsers = 'users';
const tableNameUserInfo = 'user_info';
const tableNameUserRolesRef = 'user_roles_ref';

const seeds = [
  // ---------------------------------------------------------------------------
  // User: The Rickiest
  // ---------------------------------------------------------------------------
  {
    user: {
      external_id: null,
      email: 'rick.sanchez@dimensionC-132.verse',
      username: 'therickiest',
      display_name: 'The Rickiest',
      first_name: 'Rick',
      last_name: 'Sanchez',
      preferred_locale: 'en-GB',
      avatar_url: 'http://68.media.tumblr.com/9384cedef1bdea756d8a4a9dc5663a7e/tumblr_ntrc5bBq7W1uz53k3o1_500.png',
    },
    info: {
      title: 'The Rickiest of all Ricks',
      tagline: 'Sometimes science is more art than science',
      description: 'Whatever you\'re asking, the answer is "I\'m amazing".',
    },
    roles: [2], // admin
  },

  // ---------------------------------------------------------------------------
  // User: Tiny Rick!
  // ---------------------------------------------------------------------------
  {
    user: {
      external_id: null,
      email: 'tiny.rick@sfdshs.edu',
      username: 'tinyrick',
      display_name: 'Tiny Rick!',
      first_name: null,
      last_name: null,
      preferred_locale: 'en-GB',
      avatar_url: 'https://scontent-sea1-1.cdninstagram.com/t51.2885-15/e35/12677599_779320058838806_1338315069_n.jpg',
    },
    info: {
      title: null,
      tagline: 'I\'m Tiny Rick, Bitch!',
      description: null,
    },
    roles: null,
  },

  // ---------------------------------------------------------------------------
  // User: Pickle Rick
  // ---------------------------------------------------------------------------
  {
    user: {
      external_id: null,
      email: 'picklerick@glassjar.co',
      username: 'picklerick',
      display_name: 'Pickle Rick',
      first_name: null,
      last_name: null,
      preferred_locale: 'en-GB',
      avatar_url: 'https://vignette2.wikia.nocookie.net/rickandmorty/images/7/7b/Picklerick.jpg/revision/latest?cb=20170725205548',
    },
    info: {
      title: 'I\'m a pickle.',
      tagline: 'What more do you want from me? I did it. I turned myself into a pickle.',
      description: null,
    },
    roles: null,
  },

  // ---------------------------------------------------------------------------
  // User: Ricksenberg
  // ---------------------------------------------------------------------------
  {
    user: {
      external_id: null,
      email: 'ricksenberg@bluedreams.org',
      username: 'ricksenberg',
      display_name: 'Ricksenberg',
      first_name: null,
      last_name: null,
      preferred_locale: 'en-GB',
      avatar_url: 'https://i.pinimg.com/736x/df/dd/74/dfdd74bb3d651b2fd9c866d2087b982a--funny-shirts-graphic-tees.jpg',
    },
    info: {
      title: 'The One Who Knocks',
      tagline: null,
      description: null,
    },
    roles: null,
  },

  // ---------------------------------------------------------------------------
  // User: Morty
  // ---------------------------------------------------------------------------
  {
    user: {
      external_id: null,
      email: 'morty.smith@gmail.com',
      username: 'mortysmith',
      display_name: 'Morty',
      first_name: 'Morty',
      last_name: 'Smith',
      preferred_locale: 'en-GB',
      avatar_url: 'http://vignette3.wikia.nocookie.net/rickandmorty/images/f/f4/PockeMortyAppIcon.jpg/revision/latest',
    },
    info: {
      title: null,
      tagline: null,
      description: null,
    },
    roles: null,
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
      last_login_at: timestamp,
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
