import Vue from 'vue';
import Vuex from 'vuex';
import appStore from './app';
import authStore from './auth';
import systemDataStore from './systemData';
import userDataStore from './users';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    modules: {
      // The settings for the running application
      app: appStore,

      // The account info and settings of the active authorized user
      auth: authStore,

      // The system data managed by administrators
      systemData: systemDataStore,

      // User data and actions
      userData: userDataStore,
    },
  });
}
