import AjaxService from '../services/Ajax';
import objectUtils from '../utils/object-utils';
import Collection from '../models/Collection';
import toModel from './normalizers/toModel';

// Instantiate Ajax service...
const baseURL = 'http://localhost:3005';
const Ajax = new AjaxService({ baseURL });

// TODO: Move to app settings (to be loaded in app store) !!!
const defaultPageSize = 5;

// -------------------------------
// Manages the users of the system
// -------------------------------
export default {
  state: {

    // ------------------------------------------
    // User data
    // ------------------------------------------
    users: null,

  }, // END - state

  getters: {

    // --------------------------------------------------------------- User data

    users(state) {
      return state.users;
    },

  }, // END - getters

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------
  //
  // The "context" parameter is implicitly injected into every
  // "store.dispatch()" invocation made by the components. Use the functions
  // and data exposed by the context object, in order to implement the
  // action logic.
  //
  // The context object will expose:
  //
  // context: {
  //   commit(),        [use this function to invoke a mutation]
  //   dispatch(),      [use this function to invoke an action]
  //   getters,         [use this function to invoke a getter]
  //   rootState,       [access to the full state]
  //   state,           [access to the local state of this module]
  // }
  // ---------------------------------------------------------------------------
  actions: {

    // ------------------------------------------------------- User data actions

    LOAD_ALL_USERS(context, force = false) {
      const { commit, dispatch, state } = context;
      const users = state.users;

      if (!users || force) {
        return dispatch('FETCH_USERS')
          .then((collection) => {
            commit('SET_USERS', collection);
            return collection;
          });
      }

      return false;
    },

    LOAD_USERS(context, force = false) {
      const { commit, dispatch, state } = context;
      const users = state.users;

      const opts = { skip: 0, limit: defaultPageSize };

      if (!users || force) {
        return dispatch('FETCH_USERS', opts)
          .then((collection) => {
            commit('SET_USERS', collection);
            return collection;
          });
      }

      return false;
    },

    LOAD_USERS_NEXT(context) {
      const { commit, getters, dispatch } = context;
      const users = getters.users;
      const next = users.meta.next;

      if (next) {
        const opts = { skip: next.skip, limit: next.limit };

        return dispatch('FETCH_USERS', opts)
          .then((collection) => {
            // Append next page of results to collection, set new meta info...
            const updatedCollection = new Collection();
            updatedCollection.meta = collection.meta;
            updatedCollection.items = (collection.items.length > 0)
              ? users.items.concat(collection.items)
              : users.items;

            // Load updated data into store...
            commit('SET_USERS', updatedCollection);

            return updatedCollection;
          });
      } // end-if (next)

      return false;
    },

    FETCH_USERS(context, options = {}) {
      const isPaginated = objectUtils.has(options, 'skip');

      const uri = '/api/users';
      const query = {};

      // Apply pagination...
      if (isPaginated) {
        query.skip = options.skip;
        query.limit = objectUtils.get(options, 'limit', defaultPageSize);
      }

      return Ajax.get(uri, { query })
        .then((payload) => {
          return toModel(payload);
        })
        .catch(() => {
          return false;
        });
    },

  }, // END - actions

  mutations: {

    // --------------------------------------------------------------- User data

    SET_USERS(state, collection) {
      state.users = collection;
    },

  }, // END - mutations
};
