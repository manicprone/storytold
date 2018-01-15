<template>
  <div class="local-account-login">

    <form method="post" v-bind:action="loginURL">
      <div>
        <div>
          <span>u . </span> <input type="text" name="username" />
        </div>
        <div>
          <span>p . </span> <input type="password" name="password" />
        </div>
      </div>

      <div>
        <input type="submit" value="Login" />
      </div>
    </form>

  </div>
</template>

<script>
export default {
  name: 'LocalAccountLogin',

  computed: {
    loginURL() {
      return '/auth/local-login';
    },
  },
};
</script>

<style scoped>
</style>
