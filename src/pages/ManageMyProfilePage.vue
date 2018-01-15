<template>
  <div class="manage-my-profile-page">

    <local-user-profile-editor v-bind:user="activeUserToEdit" />

  </div>
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
    margin-top: 40px;
    max-width: 720px;
  }

</style>
