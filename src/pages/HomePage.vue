<template>
  <div class="home-page">

    <template v-if="!activeUser.is_logged_in">
      <div class="splash-screen">
        <div class="title-container">
          <div class="title-text-the">the</div>
          <div class="title-text-storytold">
            <span class="title-text-story">story</span><span class="title-text-told">told</span>
          </div>
          <div class="tagline-text">{{ appTaglineText }}</div>
        </div>
        <local-account-login class="login-link" />
      </div>
    </template>

    <template v-else>
      <div class="welcome-message">
        <div class="message-text">{{ welcomeMessageText }}</div>
      </div>

      <div class="dashboard">
        Your dashboard will appear here
      </div>

      <div class="temp-link-group">
        <div class="group-heading">
          <div class="heading-text">Everyone</div>
          <div class="separator">|</div>
        </div>
        <div class="link-item">
          <router-link v-bind:to="{ name: 'manage-profile' }">
            <span>Manage My Profile</span>
          </router-link>
        </div>
      </div>

      <div class="temp-link-group">
        <div class="group-heading">
          <div class="heading-text">By Role</div>
          <div class="separator">|</div>
        </div>
        <div class="link-item">
          <router-link v-bind:to="{ name: 'admin-dashboard' }">
            <span>Admin</span>
          </router-link>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
import LocalAccountLogin from '../components/Auth/LocalAccountLogin.vue';
// import GoogleAccountLogin from '../components/Auth/GoogleAccountLogin.vue';

export default {
  name: 'HomePage',

  components: {
    LocalAccountLogin,
    // GoogleAccountLogin,
  },

  computed: {
    activeUser() {
      return this.$store.getters.activeUser;
    },
    appTaglineText() {
      return 'The chapters of our life, the stories we tell';
    },
    loginText() {
      return 'Login with your account';
    },
    welcomeMessageText() {
      return `Welcome, ${this.activeUser.display_name}.`;
    },
  },
};
</script>

<style scoped>

  /* --------------------------------------- */
  /* Frontdoor Splash Screen (not logged-in) */
  /* --------------------------------------- */

  .splash-screen {
    margin: 10% 30px;
  }

  /* Title Styling */
  .title-text-the {
  }
  .title-text-storytold {
    font-size: 350%;
  }
  .title-text-told {
    font-style: italic;
    color: #aeaeae;
  }
  .tagline-text {
    display: none;
    position: relative;
    top: 17px;
    font-size: 16px;
    font-style: italic;
    color: #8e8e8e;
  }

  /* Login Link */
  .login-link {
    margin-top: 75px;
  }

  /* ------------------------ */
  /* Welcome Page (logged-in) */
  /* ------------------------ */

  /* Welcome Message */
  .welcome-message {}
  .welcome-message .message-text {
    text-align: left;
    font-size: 28px;
    margin: 30px auto 30px auto;
    width: 650px;
    max-width: 650px;
  }

  /* Dashboard */
  .dashboard {
    line-height: 140px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    padding: 4px;
    margin: 30px auto 30px auto;
    min-height: 140px;
    width: 650px;
    max-width: 650px;
  }

  .temp-link-group {
    text-align: left;
    margin: 40px auto;
    width: 650px;
  }
  .temp-link-group .separator {
    font-weight: 300;
    display: inline-block;
    text-align: center;
    width: 30px;
  }
  .temp-link-group .link-item {
    display: inline-block;
  }
  .temp-link-group .group-heading {
    font-weight: 500;
    display: inline-block;
    margin-left: 10px;
  }
  .temp-link-group .group-heading .heading-text {
    display: inline-block;
    width: 70px;
  }
  .temp-link-group .group-heading .separator {
    margin-right: 3px;
    width: 50px;
  }

</style>
