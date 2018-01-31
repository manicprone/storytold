<template>
  <div class="local-account-login">

    <form method="post" v-bind:action="loginURL">
      <div class="input-creds-area">
        <div>
          <label>u</label> <input type="text" name="username" />
        </div>
        <div>
          <label>p</label> <input type="password" name="password" />
        </div>
      </div>

      <div class="btn-login-area">
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

  .input-creds-area label {
    display: inline-block;
    line-height: 0.7em;
    border-right: 1px solid #d9d9d9;
    width: 2.7em;
  }
  .input-creds-area input {
    margin-bottom: 7px;
    margin-left: 12px;
  }

  .btn-login-area input {
    font-size: 1.1em;
    border: 1px solid #fafafa;
    border-radius: 4px;
    margin-top: 8px;
    padding: 8px 0;
    width: 80px;
    cursor: pointer;
  }
  .btn-login-area input:hover {
    font-weight: 500;
    border: 1px solid #dedede;
  }

</style>
