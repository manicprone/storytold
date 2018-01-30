<template>
  <v-app light>

    <main>
      <v-container fluid>
        <template v-if="activeUser.is_logged_in">
          <transition name="fade" appear>
            <app-header v-bind:logoTargetURI="logoTargetURI" />
          </transition>
        </template>

        <transition name="fade-fast" mode="out-in">
          <router-view class="page"></router-view>
        </transition>
      </v-container>
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

  /* ------------------- */
  /* General HTML Styles */
  /* ------------------- */

  body {
    background-color: #f9f9f9;
    margin: 0;
    color: #252525;
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

  /* --------------------- */
  /* Component Transitions */
  /* --------------------- */

  /* fade-slow (2 sec) */
  .fade-slow-enter-active, .fade-slow-leave-active {
    transition: opacity 2s;
  }
  .fade-slow-enter, .fade-slow-leave-to {
    opacity: 0;
  }
  /* fade (1 sec) */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  /* fade-fast (0.5 sec) */
  .fade-fast-enter-active, .fade-fast-leave-active {
    transition: opacity 0.5s;
  }
  .fade-fast-enter, .fade-fast-leave-to {
    opacity: 0;
  }
  /* fade-flash (0.25 sec) */
  .fade-flash-enter-active, .fade-flash-leave-active {
    transition: opacity 0.25s;
  }
  .fade-flash-enter, .fade-flash-leave-to {
    opacity: 0;
  }

  /* ----------------- */
  /* App Global Styles */
  /* ----------------- */

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  /* Common Display Labels */
  .empty-results {
    color: #727272;
    font-style: italic;
    text-align: center;
    margin: 20% auto;
  }

  /* Page Layout */
  .sub-page {
    margin: 100px 0 0 0;
  }
  .container {
    padding: 0;
    margin: 0;
  }

  /* Form Styles */
  .editor-input-group-header {
    font-size: 18px;
  }
  .editor-info-text {
    color: #828282;
    font-style: italic;
  }
  .section-content-textarea .input-group__input textarea {
    padding-top: 12px !important;
    padding-left: 6px !important;
    padding-right: 6px !important;
    border-top: 1px solid #e9e9e9;
    border-radius: 1px;
    border-left: 1px solid #e9e9e9;
    border-right: 1px solid #e9e9e9;
  }
  .application--light .input-group.input-group--textarea .input-group__input {
    border-width: 1px !important;
  }

  /* Checkboxes (override styles for Vuetify v-checkbox) */
  .checkbox {
    padding: 0;
  }
  .checkbox i {
    font-size: 20px;
  }
  .checkbox label {
    font-size: 14px;
  }

  /* Data Tables (override styles for Vuetify v-data-table) */
  table.datatable thead tr {
    border-top: 1px solid #e2e2e2;
    height: 40px;
  }
  table.datatable tfoot td {
    background-color: #f2f2f2;
  }
  table.datatable th {
    background-color: #f2f2f2;
    border-right: 1px solid #d9d9d9;
  }
  table.datatable td {
    border-right: 1px solid #d9d9d9;
  }

  /* Exansion Panel (override styles for Vuetify v-expansion-panel) */
  .expansion-panel {
    box-shadow: none;
  }
  .expansion-panel li {
    background-color: transparent !important;
  }
  .expansion-panel .input-group {
    padding: 0;
  }
  .expansion-panel__header {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 16px;
    color: #252525;
    padding: 6px 24px 6px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    background-color: #e5e5e5;
    margin-bottom: 12px;
  }
  .section .expansion-panel__header {
    font-size: 18px;
    border: none;
    border-radius: 3px;
    background-color: transparent;
    margin: 30px 0 8px 0;
    padding: 12px 16px 12px 12px;
  }
  .section .expansion-panel__header:hover {
    background-color: #f2f2f2;
  }
  .section .expansion-panel__body {
    padding: 0 12px;
  }
  .controls .expansion-panel__header {
    font-size: 14px;
    border: none;
    border-radius: 0;
    background-color: transparent;
    margin: 0;
    padding: 0 16px 0 0;
  }
  .controls .expansion-panel__header:hover {
    background-color: #f2f2f2;
  }
  .controls .expansion-panel__body {
    padding: 8px 16px 12px 16px;
    border-top: 1px solid #d9d9d9;
  }
  .controls .toolbar--dense .toolbar__content {
    height: 35px;
  }
  .presentation-settings .expansion-panel__header {
    background-color: #d1d1d1;
    border: 1px solid #b9b9b9;
    padding: 0 25px 0 0;
    width: 171px;
    float: right;
  }
  .presentation-settings .expansion-panel__header button {
    margin: 0 4px 0 0;
  }
  .presentation-settings .expansion-panel__header .toolbar--dense .toolbar__content {
    height: 40px;
  }
  .presentation-settings .expansion-panel__body {
    border-left: 2px solid #9a9a9a;
    margin-bottom: 30px;
    padding: 10px 0 10px 10px;
  }

  /* Page Navigation (uses Vuetify v-toolbar) */
  .page-nav {
    top: 49px;
    background-color: #ffffff !important;
    border-bottom: 1px solid #d9d9d9;
  }
  .page-nav-heading {
    border-right: 1px solid #d9d9d9;
    padding-right: 28px;
    margin: 0 10px 0 20px;
  }
  .page-nav-heading span {
    font-size: 16px;
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

</style>
