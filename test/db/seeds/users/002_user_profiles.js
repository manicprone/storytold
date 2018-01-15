import moment from 'moment';

const tableName = 'user_info';

const seeds = [
  // ---------------------------------
  // user: 4, username: the_manic_edge
  // ---------------------------------
  {
    id: 1,
    user_id: 4,
    title: 'EdgeCaser',
    tagline: 'Catapult like impulse, infect like madness',
    description: null,
  },

  // ----------------------------
  // user: 5, username: segmented
  // ----------------------------
  {
    id: 2,
    user_id: 5,
    title: 'Divergent Thinker',
    tagline: 'History favors the impetus of the author',
    description: null,
  },

  // ------------------------------
  // user: 6, username: ricksanchez
  // ------------------------------
  {
    id: 3,
    user_id: 6,
    title: 'Rickforcer',
    tagline: 'The Rickiest',
    description: null,
  },

  // -----------------------------
  // user: 7, username: mortysmith
  // -----------------------------
  {
    id: 4,
    user_id: 7,
    title: 'Afterthought',
    tagline: 'Umm.',
    description: null,
  },
];

exports.seed = function seed(knex, Promise) {
  return knex(tableName).del().then(() => {
    const time = moment().utc();

    return Promise.all(seeds.map((data) => {
      const timestamp = time.add(5, 'minutes').format();

      return knex(tableName).insert({
        ...data,
        created_at: timestamp,
        updated_at: timestamp,
      });
    }));
  });
};
