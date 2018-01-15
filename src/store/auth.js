import objectUtils from '../utils/object-utils';
import AjaxService from '../services/Ajax';
import AppMessage from '../models/AppMessage';
import AnonUser from '../models/AnonUser';
import User from '../models/User';
import toModel from './normalizers/toModel';

// Instantiate Ajax service...
const baseURL = 'http://localhost:3005';
const Ajax = new AjaxService({ baseURL });

// -------------------------------------------------------------
// The account info and settings of the active (authorized) user
// -------------------------------------------------------------
export default {
  state: {

    // --------------------------
    // The active authorized user
    // --------------------------
    user: new AnonUser(),

    userProfileEditing_messages: [], // the queue of messages for user profile edits
    userProfileEditing_activeMessage: null, // the active user profile message to be handled

    // -------------------------------------------------
    // All app settings that can be modified by the user
    // -------------------------------------------------
    settings: {
      i18n: {
        locale: null,
      },
    },

  }, // END - state

  getters: {

    // ------------------------------------------------------------- Active User

    activeUser(state) {
      const user = new User(state.user);
      return user;
    },

    userProfileEditingFeedback(state) {
      return state.userProfileEditing_activeMessage;
    },

    // ----------------------------------------------------------- User Settings

    activeUserSettings(state) {
      return state.settings;
    },

    activeLocale(state) {
      return state.settings.i18n.locale;
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

    // -------------------------------------------------------- Session handling

    /*
    WRITE_AUTH_TO_SESSION(context) {
      const { getters } = context;
      const baseURL = getters.baseURL;
      const serializedUserInfo = getters.activeUser.toSession();

      const options = {
        uri: `${baseURL}/auth/sync-to-session?info=${serializedUserInfo}`,
        resolveWithFullResponse: true,
      };

      return requestPromise(options);
    },
    */

    // ------------------------------------------------------------ User actions

    SET_ACTIVE_USER(context, user) {
      context.commit('SET_ACTIVE_USER', user);
    },

    CLEAR_ACTIVE_USER(context) {
      context.commit('CLEAR_ACTIVE_USER');
    },

    MARK_ACTIVE_USER_LOGIN(context) {
      const { state } = context;
      const activeUserID = state.user.id;

      const uri = `/api/user/${activeUserID}/mark_login`;

      return Ajax.post(uri)
        .then(() => {
          return null;
        })
        .catch((error) => {
          console.error(error);
          return null;
        });
    },

    // --------------------------------------------------------- My Data actions

    UPDATE_MY_USER_PROFILE(context, profile = {}) {
      const { state, getters, commit } = context;
      const activeUserID = state.user.id;

      if (!profile.model) return false;

      const uri = `/api/user/${activeUserID}/profile`;
      const body = Object.assign({}, profile.serialize());

      return Ajax.post(uri, { body })
        .then((payload) => {
          const updatedUserProfile = toModel(payload);

          // Load updated profile into user state...
          const user = getters.activeUser;
          user.setProfile(updatedUserProfile);
          commit('SET_ACTIVE_USER', user);

          // Register feedback message...
          const message = new AppMessage({
            source: updatedUserProfile,
            status_code: 200,
            severity: 'success',
          });
          context.dispatch('REGISTER_MESSAGE_FOR_USER_PROFILE_EDITING', message);

          return updatedUserProfile;
        });
    },

    REGISTER_MESSAGE_FOR_USER_PROFILE_EDITING(context, message) {
      context.commit('REGISTER_MESSAGE_FOR_USER_PROFILE_EDITING', message);
      context.commit('ADVANCE_MESSAGE_FOR_USER_PROFILE_EDITING');
    },

    RESOLVE_MESSAGE_FOR_USER_PROFILE_EDITING(context) {
      context.commit('RESOLVE_MESSAGE_FOR_USER_PROFILE_EDITING');
      context.commit('ADVANCE_MESSAGE_FOR_USER_PROFILE_EDITING');
    },

    // --------------------------------------------------- User Settings actions

    LOAD_ACTIVE_USER_SETTINGS(context, defaultSettings) {
      const { dispatch, commit } = context;

      return dispatch('FETCH_ACTIVE_USER_SETTINGS')
        .then((userSettings) => {
          // Load persisted settings...
          const savedUserSettings = objectUtils.get(userSettings, 'settings', {});
          const activeUserSettings = Object.assign(defaultSettings, savedUserSettings);
          return commit('SET_ACTIVE_USER_SETTINGS', activeUserSettings);
        })
        .catch(() => {
          // Just load the default settings...
          return commit('SET_ACTIVE_USER_SETTINGS', defaultSettings);
        });
    },

    FETCH_ACTIVE_USER_SETTINGS(context) {
      const { state } = context;
      const activeUserID = state.user.id;

      const uri = `/api/user/${activeUserID}/settings`;

      return Ajax.get(uri)
        .then((payload) => {
          return toModel(payload);
        })
        .catch(() => {
          return false;
        });
    },

    SAVE_ACTIVE_USER_SETTINGS(context) {
      const { state } = context;
      const activeUserID = state.user.id;
      const activeUserSettings = state.settings;

      const uri = `/api/user/${activeUserID}/settings`;
      const body = { settings: activeUserSettings };

      return Ajax.post(uri, { body })
        .then(() => {
          return true;
        });
    },

    SET_ACTIVE_USER_SETTINGS(context, settings) {
      context.commit('SET_ACTIVE_USER_SETTINGS', settings);
    },

    // ----------------------------------------------------
    // These are all of the settings that a user can change
    // ----------------------------------------------------

    SET_ACTIVE_LOCALE(context, locale) {
      const { dispatch, commit } = context;
      commit('SET_ACTIVE_LOCALE', locale); // write directly into store
      dispatch('SAVE_ACTIVE_USER_SETTINGS'); // persist changes
    },

    // SET_BROWSE_PROJECTS_FILTER_OPTIONS(context, options) {
    //   const { dispatch, commit } = context;
    //   commit('SET_BROWSE_PROJECTS_FILTER_OPTIONS', options); // write directly into store
    //   dispatch('SAVE_ACTIVE_USER_SETTINGS'); // persist changes
    // },

  }, // END - actions

  mutations: {

    // -------------------------------------------------------------------- User

    SET_ACTIVE_USER(state, user) {
      state.user = user;
    },

    CLEAR_ACTIVE_USER(state) {
      // Anonymize user context...
      state.user = new AnonUser();

      // Clear out messages...
      state.userProfileEditing_messages = [];
      state.userProfileEditing_activeMessage = null;
    },

    REGISTER_MESSAGE_FOR_USER_PROFILE_EDITING(state, message) {
      state.userProfileEditing_messages.unshift(message);
    },

    ADVANCE_MESSAGE_FOR_USER_PROFILE_EDITING(state) {
      // Advance next available message, if ready...
      if (!state.userProfileEditing_activeMessage) state.userProfileEditing_activeMessage = state.userProfileEditing_messages.pop();
    },

    RESOLVE_MESSAGE_FOR_USER_PROFILE_EDITING(state) {
      state.userProfileEditing_activeMessage = null;
    },

    // ----------------------------------------------------------- User Settings

    SET_ACTIVE_LOCALE(state, locale) {
      state.settings.i18n.locale = locale;
    },

    // SET_BROWSE_PROJECTS_FILTER_OPTIONS(state, options) {
    //   state.settings.browseProjects.filterView = options;
    // },

    SET_ACTIVE_USER_SETTINGS(state, settings) {
      state.settings = settings;
    },

  }, // END - mutations
};
