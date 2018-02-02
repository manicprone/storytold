<template>
  <div class="account-controls">

    <div class="user-avatar-wrapper">
      <user-avatar
          v-bind:user="activeUser"
          v-bind:showDisplayName="true"/>
    </div>

    <div class="user-action-area">
      <template v-if="!activeUser.is_logged_in">
          <span><router-link to="/login">{{ $root.translate('action.login') }}</router-link></span>
      </template>

      <template v-else>
        <a href="/auth/logout">{{ $root.translate('action.logout') }}</a>
      </template>
    </div>

  </div>
</template>

<script>
import UserAvatar from '../Users/UserAvatar.vue';

export default {
  name: 'AccountControls',

  components: {
    UserAvatar,
  },

  computed: {
    activeUser() {
      return this.$store.getters.activeUser;
    },
  },
};
</script>

<style scoped>

  .user-avatar-wrapper {
    display: inline-block;
    vertical-align: middle;
    margin-right: 15px;
  }

  .user-action-area {
    margin-left: 15px;
    display: inline-block;
  }

</style>
