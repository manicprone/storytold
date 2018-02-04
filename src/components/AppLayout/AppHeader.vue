<template>
  <v-toolbar app fixed flat light dense class="app-header">

    <v-toolbar-title class="">
      <router-link v-bind:to="logoTargetURI">{{ appAlias }}</router-link>
    </v-toolbar-title>

    <v-spacer />

    <language-picker />

    <account-controls />

  </v-toolbar>
</template>

<script>
import AccountControls from '../AppControls/AccountControls.vue';
import LanguagePicker from '../AppControls/LanguagePicker.vue';

export default {
  name: 'AppHeader',

  components: {
    AccountControls,
    LanguagePicker,
  },

  props: [
    'logoTargetURI',
  ],

  computed: {
    appAlias() {
      return this.$store.getters.appAlias;
    },
  },
};
</script>

<style scoped>

  .app-header {
    background-color: #ededed;
    border-bottom: 1px solid #d9d9d9;
  }

</style>
