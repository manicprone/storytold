import Vue from 'vue';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import App from './pages/App.vue';
import { createStore } from './store';
import { createRouter } from './routers/view';
import appConfig from './config/app-config';
import appInject from './app-inject';

Vue.config.productionTip = false;

Vue.use(Vuetify);

export function createApp() {
  // Create store and router instances...
  const store = createStore();
  const router = createRouter();

  // Sync the router with the vuex store...
  sync(store, router);

  // Set active app meta...
  store.dispatch('SET_APP_NAME', appConfig.name);
  store.dispatch('SET_APP_ALIAS', appConfig.alias);
  store.dispatch('SET_APP_VERSION', appConfig.version);

  // Set application settings...
  store.dispatch('SET_APPLICATION_SETTINGS', appConfig.appSettings);

  // Set default user settings...
  store.dispatch('SET_ACTIVE_USER_SETTINGS', appConfig.userSettings);

  // Instantiate root Vue instance...
  const app = new Vue({
    // Inject router for all components to utilize
    // Reference as: this.$router
    router,

    // Inject store for all components to utilize
    // Reference as: this.$store
    store,

    // Inject global data and functions
    ...appInject,

    // Load app components (Pages and Components)
    render: h => h(App),
  });

  // Expose the app, the router and the store...
  // (Note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server)
  return { app, router, store };
}
