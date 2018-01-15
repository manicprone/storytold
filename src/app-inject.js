import '../node_modules/vuetify/dist/vuetify.min.css';
import objectAndArrayUtils from './utils/object-utils';
import stringUtils from './utils/string-utils';
import contentUtils from './utils/content-utils';
import I18N from './i18n/I18N';

// NOTE ------------------------------------------------------------------------
// This module is encapsulated away from the root Vue instance (app.js) for
// testing reasons. When performing functional tests, separate Vue instances
// are created and all injected dependencies that are required by the tested
// components must be re-created. This app-inject module is therefore loaded
// with the test Vue instances as well.
//
// If your Vue components require any injected dependencies, you must register
// the dependencies here. - |M|
// -----------------------------------------------------------------------------

export default {
  // ---------------------------------------------------------------------------
  // Inject data for all components to utilize
  // Reference as: this.$root.<data>
  // ---------------------------------------------------------------------------
  data: {
    // Provides a useful set of general utility functions...
    utils: { ...objectAndArrayUtils, ...stringUtils, ...contentUtils },
  },

  // ---------------------------------------------------------------------------
  // Inject functions for all components to utilize
  // Reference as: this.$root.<method>
  // ---------------------------------------------------------------------------
  methods: {
    // Returns the translation for the provided translation key...
    translate(key, interpolations) {
      const activeLocale = this.$store.getters.activeLocale;
      return I18N.getInstance().translate(key, activeLocale, interpolations);
    },

    // -------------------------------------------
    // System Data lookups (all bootstrapped data)
    // -------------------------------------------
    // model           | lookup fields
    // --------------- | --------------
    // Office          | id, alias
    // -------------------------------------------
    lookupOfficeByID(id) {
      const offices = this.$store.getters.offices;
      const lookup = this.$store.getters.officesLookup;
      return offices.items[lookup.byID[id]];
    },
    lookupOfficeByAlias(alias) {
      const offices = this.$store.getters.offices;
      const lookup = this.$store.getters.officesLookup;
      return offices.items[lookup.byAlias[alias]];
    },
  },
};
