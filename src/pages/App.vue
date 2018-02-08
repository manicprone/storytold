<template>
  <v-app light>
    <template v-if="showAppHeader">
      <transition name="fade" appear>
        <app-header v-bind:logoTargetURI="logoTargetURI" />
      </transition>
    </template>

    <v-content>
      <transition name="fade-fast" mode="out-in">
        <router-view class="page"></router-view>
      </transition>
    </v-content>

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
    showAppHeader() {
      return (this.activeUser.is_logged_in && this.$route.name !== 'view-story');
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

  /* -----------------------------------------------------  fade-slow (2 sec) */
  .fade-slow-enter-active,
  .fade-slow-leave-active {
    transition: opacity 2s;
  }
  .fade-slow-enter,
  .fade-slow-leave-to {
    opacity: 0;
  }

  /* ----------------------------------------------------------  fade (1 sec) */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  /* ---------------------------------------------------  fade-fast (0.5 sec) */
  .fade-fast-enter-active,
  .fade-fast-leave-active {
    transition: opacity 0.5s;
  }
  .fade-fast-enter,
  .fade-fast-leave-to {
    opacity: 0;
  }

  /* -------------------------------------------------  fade-flash (0.25 sec) */
  .fade-flash-enter-active,
  .fade-flash-leave-active {
    transition: opacity 0.25s;
  }
  .fade-flash-enter,
  .fade-flash-leave-to {
    opacity: 0;
  }

  /* ----------------------------------------------------------------  draw-x */
  .draw-x-enter-active,
  .draw-x-leave-active {
    transition: width 0.5s ease;
  }
  .draw-x-enter,
  .draw-x-leave-to {
    width: 0%;
  }

/* -----------------------------------------------------------------------------
 * Page Styles
 * -------------------------------------------------------------------------- */

  .container {
    padding-top: 0;
    padding-right: 0;
    padding-left: 0;
    padding-bottom: 10px;
  }

  /* ----------------------------------------------------------  Page Content */
  .page-content {
    padding-top: 30px;
    padding-left: 12px;
    padding-right: 12px;
  }
  .page.with-nav .page-content {
    padding-top: 79px;
  }
  .page.with-list-left .page-content {
    padding-left: 300px;
  }
  .page.with-list-left-mini .page-content {
    padding-left: 32px;
  }
  .page.with-list-right .page-content {
    padding-right: 300px;
  }
  .page.with-list-right-mini .page-content {
    padding-right: 32px;
  }

  /* Active Item View */
  .page-content .close-active-item {
    position: fixed;
    right: 20px;
    top: 65px;
    z-index: 200;
  }
  .page.with-nav .close-active-item {
    top: 115px;
  }

  /* Message View (no active item) */
  .page-content .message-view {
    margin-top: 30px;
  }
  .page-content .message-view .message-select-to-activate {
    margin-bottom: 10px;
  }
  .page-content .message-view .message-or {
    margin-bottom: 10px;
  }

  /* -------------------------------------------------------  Page Navigation */
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
  .page-nav-items {
    margin-left: 10px;
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

  /* ------------------------------------------------------------  List Panel */
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
    width: 32px !important;
  }
  .list-panel.navigation-drawer--mini-variant .list-panel-controls button {
    margin: 0;
    min-width: 32px;
    height: 50px;
  }

/* -----------------------------------------------------------------------------
 * Editor / Form Styles
 * -------------------------------------------------------------------------- */

  /* --------------------------------------------------------------  Sections */
  .editor-form .section-title {
   font-size: 1.73em;
   font-weight: 400;
   margin-bottom: 40px;
  }
  .editor-form .divider {
   margin-top: 40px;
   margin-bottom: 40px;
  }

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

</style>
