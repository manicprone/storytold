import Vue from 'vue';
import Vuex from 'vuex';
import appStore from './app';
import authStore from './auth';
import userDataStore from './userData';
import publicDataStore from './publicData';
import systemDataStore from './systemData';
import systemUserStore from './users';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    modules: {
      // The settings for the running application
      app: appStore,

      // The public data being viewed by the active user session
      publicData: publicDataStore,

      // The account info and settings of the active authorized user
      auth: authStore,

      // The data managed by the active authorized user
      userData: userDataStore,

      // The system data managed by administrators
      systemData: systemDataStore,

      // The system users managed by administrators
      systemUsers: systemUserStore,
    },
  });
}
