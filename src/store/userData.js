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

// TODO: Move to app settings (to be loaded in app store) !!!
const defaultPageSize = 10;

// -----------------------------------------
// The data being managed by the active user
// -----------------------------------------
export default {
  state: {

    // ------------------------------------------
    // User Data
    // ------------------------------------------
    chapters: null,
    stories: null,
    personas: null,

    // TODO: Direct the generic data actions to store management data
    //       in separate spaces !!!

    // ------------------------------------------
    // Story Management Space
    // ------------------------------------------
    // storyToEdit: null,
    // storyToEdit_messages: [], // the queue of messages for this item
    // storyToEdit_activeMessage: null, // the active message to be handled

    // ------------------------------------------
    // Shared Management Space
    // ------------------------------------------
    itemToPreview: null,
    itemToEdit: null,
    itemToEdit_messages: [], // the queue of messages for this item
    itemToEdit_activeMessage: null, // the active message to be handled

  }, // END - state

  getters: {

    // --------------------------------------------------------------- User data

    myChapters(state) {
      return state.chapters;
    },

    myStories(state) {
      return state.stories;
    },

    myPersonas(state) {
      return state.personas;
    },

    // ------------------------------------------------------ Story editing data

    // storyToEdit(state) {
    //   return state.storyToEdit;
    // },
    //
    // storyToEditFeedback(state) {
    //   return state.storyToEdit_activeMessage;
    // },

    // -------------------------------------------------- Shared data management

    itemToPreview(state) {
      return state.itemToPreview;
    },

    itemToEdit(state) {
      return state.itemToEdit;
    },

    itemToEditFeedback(state) {
      return state.itemToEdit_activeMessage;
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

    // ---------------------------------------------------- Chapter data actions

    LOAD_MY_CHAPTERS(context, force = false) {
      const { commit, dispatch, state } = context;
      const chapters = state.chapters;

      const opts = { skip: 0, limit: defaultPageSize };

      if (!chapters || force) {
        return dispatch('FETCH_MY_CHAPTERS', opts)
          .then((collection) => {
            commit('SET_MY_CHAPTERS', collection);
            return collection;
          });
      }

      return false;
    },

    LOAD_MY_CHAPTERS_NEXT(context) {
      const { commit, getters, dispatch } = context;
      const chapters = getters.myChapters;
      const next = chapters.meta.next;

      if (next) {
        const opts = { skip: next.skip, limit: next.limit };

        return dispatch('FETCH_MY_CHAPTERS', opts)
          .then((collection) => {
            // Append next page of results to collection, set new meta info...
            const updatedCollection = new Collection();
            updatedCollection.meta = collection.meta;
            updatedCollection.items = (collection.items.length > 0)
              ? chapters.items.concat(collection.items)
              : chapters.items;

            // Load updated data into store...
            commit('SET_MY_CHAPTERS', updatedCollection);

            return updatedCollection;
          });
      } // end-if (next)

      return false;
    },

    FETCH_MY_CHAPTERS(context, options = {}) {
      const { getters } = context;
      const activeUserID = getters.activeUser.id;
      const isPaginated = objectUtils.has(options, 'skip');

      const uri = `/api/user/${activeUserID}/chapters`;
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

    // ------------------------------------------------------ Story data actions

    LOAD_MY_STORIES(context, force = false) {
      const { commit, dispatch, state } = context;
      const stories = state.stories;

      const opts = { skip: 0, limit: defaultPageSize };

      if (!stories || force) {
        return dispatch('FETCH_MY_STORIES', opts)
          .then((collection) => {
            commit('SET_MY_STORIES', collection);
            return collection;
          });
      }

      return false;
    },

    LOAD_MY_STORIES_NEXT(context) {
      const { commit, getters, dispatch } = context;
      const stories = getters.myStories;
      const next = stories.meta.next;

      if (next) {
        const opts = { skip: next.skip, limit: next.limit };

        return dispatch('FETCH_MY_STORIES', opts)
          .then((collection) => {
            // Append next page of results to collection, set new meta info...
            const updatedCollection = new Collection();
            updatedCollection.meta = collection.meta;
            updatedCollection.items = (collection.items.length > 0)
              ? stories.items.concat(collection.items)
              : stories.items;

            // Load updated data into store...
            commit('SET_MY_STORIES', updatedCollection);

            return updatedCollection;
          });
      } // end-if (next)

      return false;
    },

    FETCH_MY_STORIES(context, options = {}) {
      const { getters } = context;
      const activeUserID = getters.activeUser.id;
      const isPaginated = objectUtils.has(options, 'skip');

      const uri = `/api/user/${activeUserID}/stories`;
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

    LOAD_STORY_TO_EDIT(context, options = {}) {
      const { commit, dispatch } = context;

      return dispatch('FETCH_STORY', options)
        .then((story) => {
          commit('SET_ITEM_TO_EDIT', story);
          return story;
        })
        .catch((error) => {
          // Register feedback message...
          const message = new AppMessage({
            source: error.error,
            status_code: error.error.status,
            severity: 'error',
          });
          dispatch('REGISTER_MESSAGE_FOR_ITEM_TO_EDIT', message);

          return Promise.reject(error.error);
        });
    },

    FETCH_STORY(context, options = {}) {
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

    CREATE_DRAFT_STORY_TO_EDIT(context, options = {}) {
      const { getters, dispatch, commit } = context;
      const activeUserID = getters.activeUser.id;
      const title = objectUtils.get(options, 'title', 'New Story');

      // Create draft story...
      const DraftStory = Model('Story');
      const draft = new DraftStory({ title });

      const uri = `/api/user/${activeUserID}/story`;
      const body = Object.assign({}, draft.serialize());

      return Ajax.post(uri, { body })
        .then((payload) => {
          const createdItem = toModel(payload);
          commit('SET_ITEM_TO_EDIT', createdItem);

          return createdItem;
        })
        .catch((error) => {
          // Register feedback message...
          const message = new AppMessage({
            source: error.error,
            status_code: error.error.status,
            severity: 'error',
          });
          dispatch('REGISTER_MESSAGE_FOR_ITEM_TO_EDIT', message);

          return Promise.reject(error.error);
        });
    },

    ADD_CHAPTER_TO_STORY(context, ref = {}) {
      const { dispatch } = context;

      if (!ref.story_id || !ref.chapter_id) return false;

      const uri = '/api/story-chapter';
      const body = Object.assign({}, ref);

      return Ajax.post(uri, { body })
        .then((payload) => {
          const chapterRef = toModel(payload);

          // Register feedback message...
          const message = new AppMessage({
            source: chapterRef,
            status_code: 201,
            severity: 'success',
          });
          dispatch('REGISTER_MESSAGE_FOR_ITEM_TO_EDIT', message);

          return chapterRef;
        })
        .catch((error) => {
          // Register feedback message...
          const message = new AppMessage({
            source: error.error,
            status_code: error.error.status,
            severity: 'error',
          });
          dispatch('REGISTER_MESSAGE_FOR_ITEM_TO_EDIT', message);

          return Promise.reject(error.error);
        });
    },

    // ------------------------------------------- Shared (generic) data actions

    SET_ITEM_TO_PREVIEW(context, item) {
      context.commit('SET_ITEM_TO_PREVIEW', item);
    },

    // TODO: Try returning a Promise to resolve the timing issue !!!
    //       i.e. return Promise.resolve(true);
    CLEAR_ITEM_TO_PREVIEW(context) {
      context.commit('CLEAR_ITEM_TO_PREVIEW');
    },

    LOAD_DRAFT_ITEM_TO_EDIT(context, modelName) {
      const Item = Model(modelName);
      const draft = new Item();
      context.commit('SET_ITEM_TO_EDIT', draft);
    },

    SET_ITEM_TO_EDIT(context, item) {
      context.commit('SET_ITEM_TO_EDIT', item);
    },

    // TODO: Try returning a Promise to resolve the timing issue !!!
    //       i.e. return Promise.resolve(true);
    CLEAR_ITEM_TO_EDIT(context) {
      context.commit('CLEAR_ITEM_TO_EDIT');
    },

    REGISTER_MESSAGE_FOR_ITEM_TO_EDIT(context, message) {
      context.commit('REGISTER_MESSAGE_FOR_ITEM_TO_EDIT', message);
      context.commit('ADVANCE_MESSAGE_FOR_ITEM_TO_EDIT');
    },

    RESOLVE_MESSAGE_FOR_ITEM_TO_EDIT(context) {
      context.commit('RESOLVE_MESSAGE_FOR_ITEM_TO_EDIT');
      context.commit('ADVANCE_MESSAGE_FOR_ITEM_TO_EDIT');
    },

    CREATE_ITEM(context, item = {}) {
      const { getters, dispatch } = context;
      const activeUserID = getters.activeUser.id;

      if (!item.model) return false;

      const resourceURI = stringUtils.toKebabCase(item.model);
      const uri = `/api/user/${activeUserID}/${resourceURI}`;
      const body = Object.assign({}, item.serialize());

      return Ajax.post(uri, { body })
        .then((payload) => {
          const createdItem = toModel(payload);

          // Register feedback message...
          const message = new AppMessage({
            source: createdItem,
            status_code: 201,
            severity: 'success',
          });
          dispatch('REGISTER_MESSAGE_FOR_ITEM_TO_EDIT', message);

          return createdItem;
        })
        .catch((error) => {
          // Register feedback message...
          const message = new AppMessage({
            source: error.error,
            status_code: error.error.status,
            severity: 'error',
          });
          dispatch('REGISTER_MESSAGE_FOR_ITEM_TO_EDIT', message);

          return Promise.reject(error.error);
        });
    },

    UPDATE_ITEM(context, item = {}) {
      const { getters, dispatch } = context;
      const activeUserID = getters.activeUser.id;

      if (!item.model) return false;

      const resourceURI = stringUtils.toKebabCase(item.model);
      const uri = `/api/user/${activeUserID}/${resourceURI}/${item.id}`;
      const body = Object.assign({}, item.serialize());

      return Ajax.post(uri, { body })
        .then((payload) => {
          const updatedItem = toModel(payload);

          // Register feedback message...
          const message = new AppMessage({
            source: updatedItem,
            status_code: 200,
            severity: 'success',
          });
          dispatch('REGISTER_MESSAGE_FOR_ITEM_TO_EDIT', message);

          return updatedItem;
        })
        .catch((error) => {
          // Register feedback message...
          const message = new AppMessage({
            source: error.error,
            status_code: error.error.status,
            severity: 'error',
          });
          dispatch('REGISTER_MESSAGE_FOR_ITEM_TO_EDIT', message);

          return Promise.reject(error.error);
        });
    },

    DELETE_ITEM(context, item = {}) {
      const { getters, dispatch } = context;
      const activeUserID = getters.activeUser.id;

      if (!item.model) return false;

      const resourceURI = stringUtils.toKebabCase(item.model);
      const uri = `/api/user/${activeUserID}/${resourceURI}/${item.id}`;

      return Ajax.delete(uri)
        .then(() => {
          // Register feedback message...
          const message = new AppMessage({
            source: null,
            status_code: 204,
            severity: 'success',
          });
          dispatch('REGISTER_MESSAGE_FOR_ITEM_TO_EDIT', message);

          return true;
        })
        .catch((error) => {
          // Register feedback message...
          const message = new AppMessage({
            source: error.error,
            status_code: error.error.status,
            severity: 'error',
          });
          dispatch('REGISTER_MESSAGE_FOR_ITEM_TO_EDIT', message);

          return Promise.reject(error.error);
        });
    },

  }, // END - actions

  mutations: {

    // --------------------------------------------------------------- User data

    SET_MY_CHAPTERS(state, collection) {
      state.chapters = collection;
    },

    SET_MY_STORIES(state, collection) {
      state.stories = collection;
    },

    SET_MY_PERSONAS(state, collection) {
      state.personas = collection;
    },

    // ---------------------------------------- Shared (generic) data management

    SET_ITEM_TO_PREVIEW(state, item) {
      if (item.model) state.itemToPreview = item;
    },

    CLEAR_ITEM_TO_PREVIEW(state) {
      state.itemToPreview = null;
    },

    SET_ITEM_TO_EDIT(state, item) {
      if (item.model) {
        // Build a copy of the item...
        const Item = Model(item.model);
        const copy = new Item(item);
        state.itemToEdit = copy;
      }
    },

    CLEAR_ITEM_TO_EDIT(state) {
      state.itemToEdit = null;
      state.itemToEdit_messages = [];
      state.itemToEdit_activeMessage = null;
    },

    REGISTER_MESSAGE_FOR_ITEM_TO_EDIT(state, message) {
      state.itemToEdit_messages.unshift(message);
    },

    ADVANCE_MESSAGE_FOR_ITEM_TO_EDIT(state) {
      // Advance next available message, if ready...
      if (!state.itemToEdit_activeMessage) state.itemToEdit_activeMessage = state.itemToEdit_messages.pop();
    },

    RESOLVE_MESSAGE_FOR_ITEM_TO_EDIT(state) {
      state.itemToEdit_activeMessage = null;
    },

  }, // END - mutations
};
