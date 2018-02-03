import AjaxService from '../services/Ajax';
import objectUtils from '../utils/object-utils';
import stringUtils from '../utils/string-utils';
import AppMessage from '../models/AppMessage';
import Model from '../models';
import Collection from '../models/Collection';
import toModel from './normalizers/toModel';

// Instantiate Ajax service...
const baseURL = 'http://localhost:3005';
const Ajax = new AjaxService({ baseURL });

// -----------------------------------------------------------------------------
// The public data being viewed by the active session
// -----------------------------------------------------------------------------
export default {
  state: {

    storyToView: null, // the active story being viewed
    storyToView_messages: [], // the queue of messages for this item
    storyToView_activeMessage: null, // the active message to be handled

  }, // END - state

  getters: {

    storyToView(state) {
      return state.storyToView;
    },

    storyToViewFeedback(state) {
      return state.storyToView_activeMessage;
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

    // ------------------------------------------------------ Story data actions

    LOAD_STORY_TO_VIEW(context, options = {}) {
      const { commit, dispatch } = context;

      return dispatch('FETCH_PUBLIC_STORY', options)
        .then((story) => {
          commit('SET_STORY_TO_VIEW', story);
          return story;
        })
        .catch((error) => {
          // Register feedback message...
          const message = new AppMessage({
            source: error.error,
            status_code: error.error.status,
            severity: 'error',
          });
          dispatch('REGISTER_MESSAGE_FOR_STORY_TO_VIEW', message);

          return Promise.reject(error.error);
        });
    },

    FETCH_PUBLIC_STORY(context, options = {}) {
      const { getters } = context;
      const activeUserID = getters.activeUser.id;
      const storyID = objectUtils.get(options, 'story_id', null);
      const includeChapters = objectUtils.get(options, 'include_chapters', true);
      const includePersona = objectUtils.get(options, 'include_persona', true);

      if (!storyID) return false;

      const uri = `/api/user/${activeUserID}/story/${storyID}`;
      const query = {};
      if (includeChapters || includePersona) {
        const assocs = [];
        if (includeChapters) assocs.push('chapters');
        if (includePersona) assocs.push('persona');
        query.with = assocs.toString();
      }

      return Ajax.get(uri, { query })
        .then((payload) => {
          return toModel(payload);
        });
    },

    SET_STORY_TO_VIEW(context, item) {
      context.commit('SET_STORY_TO_VIEW', item);
    },

    // TODO: Try returning a Promise to resolve the timing issue !!!
    //       i.e. return Promise.resolve(true);
    CLEAR_STORY_TO_VIEW(context) {
      context.commit('CLEAR_STORY_TO_VIEW');
    },

    REGISTER_MESSAGE_FOR_STORY_TO_VIEW(context, message) {
      context.commit('REGISTER_MESSAGE_FOR_STORY_TO_VIEW', message);
      context.commit('ADVANCE_MESSAGE_FOR_STORY_TO_VIEW');
    },

    RESOLVE_MESSAGE_FOR_STORY_TO_VIEW(context) {
      context.commit('RESOLVE_MESSAGE_FOR_STORY_TO_VIEW');
      context.commit('ADVANCE_MESSAGE_FOR_STORY_TO_VIEW');
    },

  }, // END - actions

  mutations: {

    // --------------------------------------------------- Story data management

    SET_STORY_TO_VIEW(state, item) {
      if (item.model) state.storyToView = item;
    },

    CLEAR_STORY_TO_VIEW(state) {
      state.storyToView = null;
    },

    CLEAR_STORY_TO_VIEW(state) {
      state.storyToView = null;
      state.storyToView_messages = [];
      state.storyToView_activeMessage = null;
    },

    REGISTER_MESSAGE_FOR_STORY_TO_VIEW(state, message) {
      state.storyToView_messages.unshift(message);
    },

    ADVANCE_MESSAGE_FOR_STORY_TO_VIEW(state) {
      // Advance next available message, if ready...
      if (!state.storyToView_activeMessage) state.storyToView_activeMessage = state.storyToView_messages.pop();
    },

    RESOLVE_MESSAGE_FOR_STORY_TO_VIEW(state) {
      state.storyToView_activeMessage = null;
    },

  }, // END - mutations
};
