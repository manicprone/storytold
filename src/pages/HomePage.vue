<template>

  <!--------------------------------->
  <!-- Splash Page (not logged-in) -->
  <!--------------------------------->
  <v-container fluid fill-height class="splash-page" v-if="!activeUser.is_logged_in">
    <v-layout align-center justify-center>
      <v-flex xs12 sm9 md8>
        <div class="title-wrapper">
          <div class="title-text-the">the</div>
          <div class="title-text-storytold">
            <span class="title-text-story">story</span><span class="title-text-told">told</span>
          </div>
          <div class="tagline-text">{{ appTaglineText }}</div>
        </div>

        <local-account-login class="login-link" />
      </v-flex>
    </v-layout>
  </v-container>

  <!--------------------------->
  <!-- Home Page (logged-in) -->
  <!--------------------------->
  <v-container fluid class="home-page" v-else>

    <v-layout justify-center row>
      <v-flex xs12 sm9 md8>
        <div class="welcome-message">
          <span>{{ welcomeMessageText }}</span>
        </div>
      </v-flex>
    </v-layout>

    <v-layout justify-center row>
      <v-flex xs12 sm9 md8>
        <div class="dashboard">Dashboard</div>
      </v-flex>
    </v-layout>

    <v-layout justify-center row class="temp-link-group">
      <v-flex xs12 sm9 md8>
        <v-layout row wrap>
          <v-flex xs2>
            <div class="group-heading">Everyone</div>
          </v-flex>
          <v-flex xs2>
            <router-link v-bind:to="{ name: 'manage-chapters' }">
              <span>Manage Chapters</span>
            </router-link>
          </v-flex>
          <v-flex xs2>
            <router-link v-bind:to="{ name: 'manage-stories' }">
              <span>Manage Stories</span>
            </router-link>
          </v-flex>
          <v-flex xs2>
            <router-link v-bind:to="{ name: 'manage-profile' }">
              <span>Manage My Account</span>
            </router-link>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout justify-center row class="temp-link-group">
      <v-flex xs12 sm9 md8>
        <v-layout row wrap>
          <v-flex xs2>
            <div class="group-heading">By Role</div>
          </v-flex>
          <v-flex xs2>
            <router-link v-bind:to="{ name: 'admin-dashboard' }">
              <span>Admin</span>
            </router-link>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

  </v-container>

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
      return 'Map the chapters of your life into stories to tell.';
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

/* -----------------------------------------------------------------------------
 * Splash Page (not logged-in)
 * -------------------------------------------------------------------------- */

  /* Title Styling */
  .title-text-the {
    display: none;
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
    margin-top: 50px;
  }

/* -----------------------------------------------------------------------------
 * Home Page (logged-in)
 * -------------------------------------------------------------------------- */

  .home-page {
    padding-left: 12px;
    padding-right: 12px;
  }

  /* Welcome Message */
  .welcome-message {
    font-size: 28px;
    text-align: left;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  /* Dashboard */
  .dashboard {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    padding: 4px;
    margin-bottom: 40px;
    min-height: 140px;
  }

  /* Temp Links (will move to app-header menu) */
  .temp-link-group {
    text-align: left;
    margin-top: 20px;
  }
  .temp-link-group .group-heading {
    font-weight: 500;
  }

</style>
