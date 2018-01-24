export default {

  // ----------------
  // App name & alias
  // ----------------
  name: 'Storytold',
  alias: 'storytold',

  // -----------
  // App version
  // -----------
  version: '0.0.0',

  // ------------------------------------------------------
  // App settings (grouped by resource)
  // ------------------------------------------------------
  // Core configuration settings for the app.
  // These values cannot be altered by the user.
  // ------------------------------------------------------
  appSettings: {},

  // ------------------------------------------------------
  // Default user settings (grouped by component)
  // ------------------------------------------------------
  // These values can be altered by the user.
  // All values will be loaded into the user state (store)
  // whenever a persisted state is not available for the
  // authorized user.
  // ------------------------------------------------------
  userSettings: {
    i18n: {
      locale: 'en-GB',
    },
  },

};
