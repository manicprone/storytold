<template>
  <v-container fluid class="manage-profile-page">

    <!------------------>
    <!-- Page Content -->
    <!------------------>
    <v-layout justify-center class="page-content">
      <v-flex xs12 sm9 md8>
        <local-user-profile-editor class="user-profile-editor"
            v-bind:user="activeUserToEdit" />
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
import User from '../models/User';
import LocalUserProfileEditor from '../components/Admin/LocalUserProfileEditor.vue';

export default {
  name: 'ManageProfilePage',

  components: {
    LocalUserProfileEditor,
  },

  computed: {
    activeUserToEdit() {
      const activeUser = this.$store.getters.activeUser;
      return (activeUser) ? new User(activeUser) : null;
    },
  },
};
</script>

<style scoped>

</style>
