// ------------------------------------------------
// Manages the settings for the running application
// ------------------------------------------------
export default {
  state: {

    // Maintains the active running app meta...
    appName: '',
    appAlias: '',
    appVersion: '0.0.0',

    // Application settings for the active web version...
    // (These values will be loaded on startup)
    settings: {},

  }, // END - state

  getters: {

    appName(state) {
      return state.appName;
    },

    appAlias(state) {
      return state.appAlias;
    },

    appVersion(state) {
      return state.appVersion;
    },

    // ------------------------------------------------------ Persisted settings

    appSettings(state) {
      return state.settings;
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

    SET_APP_NAME(context, name) {
      context.commit('SET_APP_NAME', name);
    },

    SET_APP_ALIAS(context, alias) {
      context.commit('SET_APP_ALIAS', alias);
    },

    SET_APP_VERSION(context, version) {
      context.commit('SET_APP_VERSION', version);
    },

    // -------------------------------------------- Application Settings actions

    SET_APPLICATION_SETTINGS(context, settings) {
      context.commit('SET_APPLICATION_SETTINGS', settings);
    },

  }, // END - actions

  mutations: {

    SET_APP_NAME(state, name) {
      state.appName = name;
    },

    SET_APP_ALIAS(state, alias) {
      state.appAlias = alias;
    },

    SET_APP_VERSION(state, version) {
      state.appVersion = version;
    },

    SET_APPLICATION_SETTINGS(state, settings) {
      state.settings = settings;
    },

  }, // END - mutations
};
