<template>
  <div class="google-account-login">

    <div>
      <a v-bind:href="loginURL">{{ loginText }}</a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'GoogleAccountLogin',

  props: [
    'linkText',
  ],

  computed: {
    loginURL() {
      return this.$store.getters.loginViaGoogleURL;
    },
    loginText() {
      return this.linkText || 'Login with Google';
    },
  },
};
</script>

<style scoped>
</style>
