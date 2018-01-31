<template>
  <main class="manage-my-profile-page">
    <v-container>

      <local-user-profile-editor class="user-profile-editor"
          v-bind:user="activeUserToEdit" />

    </v-container>
  </main>
</template>

<script>
import User from '../models/User';
import LocalUserProfileEditor from '../components/Admin/LocalUserProfileEditor.vue';

export default {
  name: 'ManageMyProfilePage',

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

  .user-profile-editor {
    margin: 0 auto;
    max-width: 750px;
  }

</style>
