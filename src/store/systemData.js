import AjaxService from '../services/Ajax';
// import objectUtils from '../utils/object-utils';
import stringUtils from '../utils/string-utils';
import AppMessage from '../models/AppMessage';
import Model from '../models';
import toModel from './normalizers/toModel';

// Instantiate Ajax service...
const baseURL = 'http://localhost:3005';
const Ajax = new AjaxService({ baseURL });

// TODO: Move to app settings (to be loaded in app store) !!!
// const defaultPageSize = 10;

// -----------------------------------------
// The system data managed by administrators
// -----------------------------------------
export default {
  state: {

    // ------------------------------------------
    // Office Data
    // ------------------------------------------
    offices: null,
    officesLookup: {
      byID: {},
      byAlias: {},
    },

    // ------------------------------------------
    // Shared Editing Space
    // ------------------------------------------
    itemToEdit: null,
    itemToEdit_messages: [], // the queue of messages for this item
    itemToEdit_activeMessage: null, // the active message to be handled

  }, // END - state

  getters: {

    // ------------------------------------------------------------- Office data

    offices(state) {
      return state.offices;
    },

    officesLookup(state) {
      return state.officesLookup;
    },

    // ----------------------------------------------- Shared editing data space

    systemItemToEdit(state) {
      return state.itemToEdit;
    },

    systemItemToEditFeedback(state) {
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

    BOOTSTRAP_SYSTEM_DATA(/* context */) {
      // const { dispatch } = context;

      return Promise.all([
        // dispatch('LOAD_ALL_OFFICES'),
      ]);
    },

    // ----------------------------------------------------- Office data actions

    // LOAD_ALL_OFFICES(context, force = false) {
    //   const { commit, state } = context;
    //   const offices = state.offices;
    //
    //   const uri = '/api/offices';
    //
    //   if (!offices || force) {
    //     return Ajax.get(uri)
    //       .then((payload) => {
    //         const collection = toModel(payload);
    //         commit('SET_OFFICES', collection);
    //         return collection;
    //       })
    //       .catch(() => {
    //         return false;
    //       });
    //   }
    //
    //   return false;
    // },

    // ---------------------------------------- Editing actions for shared space

    LOAD_DRAFT_SYSTEM_ITEM_TO_EDIT(context, modelName) {
      const Item = Model(modelName);
      const draft = new Item();
      context.commit('SET_SYSTEM_ITEM_TO_EDIT', draft);
    },

    SET_SYSTEM_ITEM_TO_EDIT(context, item) {
      context.commit('SET_SYSTEM_ITEM_TO_EDIT', item);
    },

    CLEAR_SYSTEM_ITEM_TO_EDIT(context) {
      context.commit('CLEAR_SYSTEM_ITEM_TO_EDIT');
    },

    REGISTER_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT(context, message) {
      context.commit('REGISTER_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT', message);
      context.commit('ADVANCE_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT');
    },

    RESOLVE_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT(context) {
      context.commit('RESOLVE_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT');
      context.commit('ADVANCE_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT');
    },

    CREATE_SYSTEM_ITEM(context, item = {}) {
      const { getters } = context;
      const activeUser = getters.activeUser;

      if (!item.model) return false;

      const resourceURI = stringUtils.toKebabCase(item.model);
      const uri = `/api/${resourceURI}`;
      const body = Object.assign({}, item.serialize(), { created_by: activeUser.id });

      return Ajax.post(uri, { body })
        .then((payload) => {
          const createdItem = toModel(payload);

          // Register feedback message...
          const message = new AppMessage({
            source: createdItem,
            status_code: 201,
            severity: 'success',
          });
          context.dispatch('REGISTER_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT', message);

          return createdItem;
        })
        .catch((error) => {
          // Register feedback message...
          const message = new AppMessage({
            source: error.error,
            status_code: error.error.status,
            severity: 'error',
          });
          context.dispatch('REGISTER_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT', message);

          return Promise.reject(error.error);
        });
    },

    UPDATE_SYSTEM_ITEM(context, item = {}) {
      if (!item.model) return false;

      const resourceURI = stringUtils.toKebabCase(item.model);
      const uri = `/api/${resourceURI}/${item.id}`;
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
          context.dispatch('REGISTER_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT', message);

          return updatedItem;
        })
        .catch((error) => {
          // Register feedback message...
          const message = new AppMessage({
            source: error.error,
            status_code: error.error.status,
            severity: 'error',
          });
          context.dispatch('REGISTER_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT', message);

          return Promise.reject(error.error);
        });
    },

    DELETE_SYSTEM_ITEM(context, item = {}) {
      if (!item.model) return false;

      const resourceURI = stringUtils.toKebabCase(item.model);
      const uri = `/api/${resourceURI}/${item.id}`;

      return Ajax.delete(uri)
        .then(() => {
          // Register feedback message...
          const message = new AppMessage({
            source: null,
            status_code: 204,
            severity: 'success',
          });
          context.dispatch('REGISTER_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT', message);

          return true;
        })
        .catch((error) => {
          // Register feedback message...
          const message = new AppMessage({
            source: error.error,
            status_code: error.error.status,
            severity: 'error',
          });
          context.dispatch('REGISTER_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT', message);

          return Promise.reject(error.error);
        });
    },

  }, // END - actions

  mutations: {

    // ------------------------------------------------------------- Office data

    // SET_OFFICES(state, collection) {
    //   // Reset lookup map...
    //   state.officesLookup.byID = {};
    //   state.officesLookup.byAlias = {};
    //
    //   // Build lookup map...
    //   if (collection.items.length > 0) {
    //     collection.items.forEach((item, index) => {
    //       state.officesLookup.byID[item.id] = index;
    //       state.officesLookup.byAlias[item.alias] = index;
    //     });
    //   }
    //
    //   state.offices = collection;
    // },

    // ------------------------------------------------------------ Editing data

    SET_SYSTEM_ITEM_TO_EDIT(state, item) {
      if (item.model) {
        // Build a copy of the item...
        const Item = Model(item.model);
        const copy = new Item(item);
        state.itemToEdit = copy;
      }
    },

    CLEAR_SYSTEM_ITEM_TO_EDIT(state) {
      state.itemToEdit = null;
      state.itemToEdit_messages = [];
      state.itemToEdit_activeMessage = null;
    },

    REGISTER_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT(state, message) {
      state.itemToEdit_messages.unshift(message);
    },

    ADVANCE_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT(state) {
      // Advance next available message, if ready...
      if (!state.itemToEdit_activeMessage) state.itemToEdit_activeMessage = state.itemToEdit_messages.pop();
    },

    RESOLVE_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT(state) {
      state.itemToEdit_activeMessage = null;
    },

  }, // END - mutations
};
