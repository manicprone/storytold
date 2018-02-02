<template>
  <v-app light>

    <main>
      <template v-if="activeUser.is_logged_in">
        <transition name="fade" appear>
          <app-header v-bind:logoTargetURI="logoTargetURI" />
        </transition>
      </template>

      <transition name="fade-fast" mode="out-in">
        <router-view class="page"></router-view>
      </transition>
    </main>

  </v-app>
</template>

<script>
import AppHeader from '../components/AppLayout/AppHeader.vue';

export default {
  name: 'App',

  components: {
    AppHeader,
  },

  computed: {
    activeUser() {
      return this.$store.getters.activeUser;
    },
    logoTargetURI() {
      return '/';
    },
  },
};
</script>

<style>

/* -----------------------------------------------------------------------------
 * Global App Styles
 * -------------------------------------------------------------------------- */

  body {
    font-size: 14px;
    color: #252525;
    background-color: #f9f9f9;
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
  }

  a, .application a {
    color: #676767;
    cursor: pointer;
    text-decoration: none;
  }
  a:hover, .application a:hover {
    color: #111111;
  }

  select {
    border: 1px solid #929292;
    padding: 5px;
  }

/* -----------------------------------------------------------------------------
 * Component Transitions
 * -------------------------------------------------------------------------- */

  /* ------------------------------  fade-slow (2 sec) */
  .fade-slow-enter-active,
  .fade-slow-leave-active {
    transition: opacity 2s;
  }
  .fade-slow-enter,
  .fade-slow-leave-to {
    opacity: 0;
  }

  /* -----------------------------------  fade (1 sec) */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  /* ----------------------------  fade-fast (0.5 sec) */
  .fade-fast-enter-active,
  .fade-fast-leave-active {
    transition: opacity 0.5s;
  }
  .fade-fast-enter,
  .fade-fast-leave-to {
    opacity: 0;
  }

  /* ---------------------------  fade-flash (0.25 sec) */
  .fade-flash-enter-active,
  .fade-flash-leave-active {
    transition: opacity 0.25s;
  }
  .fade-flash-enter,
  .fade-flash-leave-to {
    opacity: 0;
  }

/* -----------------------------------------------------------------------------
 * Page Styles
 * -------------------------------------------------------------------------- */

  .container {
    padding-top: 30px;
    padding-bottom: 10px;
  }

  /* --------------------------------  Page Navigation */
  .page-nav {
    top: 49px;
    background-color: #ffffff !important;
    border-bottom: 1px solid #d9d9d9;
  }
  .page-nav-heading {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    border-right: 1px solid #d9d9d9;
    padding-right: 24px;
    margin-left: 20px;
    margin-right: 2px;
    max-width: 10em;
  }
  .page-nav-controls {
    font-size: 16px;
  }
  .page-nav-controls .btn {
    text-transform: none;
    font-size: 16px;
    font-weight: 400;
  }
  .page-nav-divider {
    border-right: 1px solid #d9d9d9;
    margin-right: 2px;
    height: 55%;
    width: 4px;
  }
  .page-nav .nav-item {
    text-transform: none;
  }
  .page-nav .nav-item:hover {
    background-color: rgba(5,204,152,.2) !important;
  }
  .page-nav .selected-nav-item {
    background-color: rgba(5,204,152,.2) !important;
  }
  .page-nav .selected-nav-item span {
    color: #111111;
  }

  /* -------------------------------------  List Panel */
  .page .list-panel {
    margin-top: 49px !important;
  }
  .page.with-nav .list-panel {
    margin-top: 98px !important;
  }
  .list-panel-controls {
    background-color: #ebebeb;
    border-bottom: 1px solid #d9d9d9;
    height: 50px;
  }
  .list-panel-controls .list-panel-title {
    font-size: 15px;
  }
  /* Mini Mode (for Vuetify v-navigation-drawer) */
  .list-panel.navigation-drawer--mini-variant {
    width: 32px;
  }
  .list-panel.navigation-drawer--mini-variant .list-panel-controls button {
    margin: 0;
    min-width: 32px;
    height: 50px;
  }

  /* -------------------------------------  Edit Panel */
  .page.with-nav .edit-panel {
    padding-top: 98px !important;
  }
  .edit-panel .container {
    padding: 40px 30px 10px 30px;
  }
  .page .edit-panel .close-active-edit {
    position: fixed;
    right: 20px;
    top: 65px;
    z-index: 200;
  }
  /* Active Edit View */
  .edit-panel .active-edit-view {
    margin: 0 auto;
    max-width: 700px;
  }
  /* Message View (no active edit) */
  .edit-panel .message-view {
    margin-top: 30px;
  }
  .edit-panel .message-view .message-select-to-edit {
    margin-bottom: 10px;
  }
  .edit-panel .message-view .message-or {
    margin-bottom: 10px;
  }
  .edit-panel .message-view .message-create-draft {
    margin-bottom: 0;
  }

/* -----------------------------------------------------------------------------
 * Editor / Form Styles
 * -------------------------------------------------------------------------- */

  /* Text Areas (override styles for Vuetify v-text-field textarea) */
  .input-group.input-group--textarea .input-group__input {
    border-width: 1px !important;
  }

  /* Checkboxes (override styles for Vuetify v-checkbox) */
  .checkbox {
    padding: 0;
  }
  .checkbox i {
    font-size: 1.6em;
  }
  .checkbox label {
    font-size: 1em;
  }

  /* Data Tables (override styles for Vuetify v-data-table) */
  table.datatable th {
    background-color: #f2f2f2;
    border-right: 1px solid #d9d9d9;
  }
  table.datatable td {
    border-right: 1px solid #d9d9d9;
  }
  table.datatable thead tr {
    border-top: 1px solid #e2e2e2;
    height: 45px;
  }
  table.datatable thead th {
    font-size: 14px;
  }
  table.datatable tfoot td {
    background-color: #f2f2f2;
  }
  table.datatable tfoot .datatable__actions {
    font-size: 14px;
  }

  /* ---------------------------------------  Sections */
  .editor-form .section-title {
    font-size: 1.73em;
    font-weight: 400;
    margin-bottom: 40px;
  }
  .editor-form .divider {
    margin-top: 40px;
    margin-bottom: 40px;
  }

</style>
