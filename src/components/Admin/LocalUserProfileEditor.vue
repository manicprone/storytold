<template>
  <div class="user-profile-editor">
    <v-layout row wrap>

      <v-flex xs12>
        <v-card v-if="showAccountInfo" class="account-info">
          <v-container fluid>

            <v-layout>
              <v-flex xs12>
                <v-card-title class="info-title">Account Info</v-card-title>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs5>
                <user-avatar v-bind:user="user" v-bind:size="200" />
              </v-flex>
              <v-flex xs5>
                <v-text-field label="Username" v-model.trim="user.username" />
                <v-text-field label="Display Name" v-model.trim="user.display_name" />
                <v-text-field label="First Name" v-model.trim="user.first_name" />
                <v-text-field label="Last Name" v-model.trim="user.last_name" />
                <v-text-field label="Email" v-model.trim="user.email" />
              </v-flex>
            </v-layout>

            <v-card-actions class="info-controls transparent">
              <v-spacer />
              <v-btn light v-on:click="saveAccountInfo">Save</v-btn>
            </v-card-actions>

          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card v-if="showProfileInfo" class="profile-info">
          <v-container fluid>

            <v-layout>
              <v-flex xs12>
                <v-card-title class="info-title">Profile Info</v-card-title>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12>
                <v-text-field label="Title" v-model.trim="itemEditing.profile.title" />
                <v-text-field label="Tagline" v-model.trim="itemEditing.profile.tagline" />
                <v-text-field textarea label="About Me" v-model.trim="itemEditing.profile.description" />
              </v-flex>
            </v-layout>

            <v-card-actions class="info-controls transparent">
              <editor-feedback v-bind:resource="'user-profile'" v-bind:autoCloseAfterMillis="5000" />
              <v-spacer />
              <v-btn light v-on:click="saveProfileInfo">Save</v-btn>
            </v-card-actions>

          </v-container>
        </v-card>
      </v-flex>

    </v-layout>
  </div>
</template>

<script>
import UserAvatar from '../Users/UserAvatar.vue';
import EditorFeedback from './EditorFeedback.vue';

export default {
  name: 'LocalUserProfileEditor',

  components: {
    UserAvatar,
    EditorFeedback,
  },

  data() {
    return {
      itemEditing: this.user,
    };
  },

  props: {
    user: {
      type: Object,
      default: null,
    },
    showAccountInfo: {
      type: Boolean,
      default: true,
    },
    showProfileInfo: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
  },

  methods: {
    saveAccountInfo() {
    },
    saveProfileInfo() {
      this.$store.dispatch('UPDATE_MY_USER_PROFILE', this.itemEditing.profile);
    },
  },
};
</script>

<style scoped>

  .user-profile-editor {
    margin: 0 auto;
  }
  .controls .btn {
    margin: 0 auto;
  }
  .info-title {
    font-size: 23px;
    padding: 12px;
    margin-bottom: 10px;
  }
  .info-sub-heading {
    text-align: left;
    font-size: 16px;
  }
  .info-controls {
    height: 69px;
    margin: 40px 20px 0 20px;
    padding: 20px 0 10px 0 !important;
    border-top: 1px solid #d9d9d9 !important;
  }

  /* ------------ */
  /* Account Info */
  /* ------------ */

  .account-info {
    background-color: #f2f2f2;
    padding: 12px;
    margin-bottom: 20px;
    min-width: 500px;
  }
  .account-info .user-avatar {
    margin-bottom: 40px;
  }

  /* ------------ */
  /* Profile Info */
  /* ------------ */

  .profile-info {
    background-color: #f2f2f2;
    padding: 12px;
    margin-bottom: 20px;
    min-width: 500px;
  }

</style>
