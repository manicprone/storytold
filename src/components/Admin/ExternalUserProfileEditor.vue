<template>
  <v-container class="user-profile-editor">
    <v-layout row wrap>

      <v-flex xs12>
        <v-card v-if="showAccountInfo" class="account-info">
          <v-container fluid>

            <v-layout>
              <v-flex xs12>
                <v-card-title class="info-title">Personal Info</v-card-title>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs5>
                <user-avatar v-bind:user="user" v-bind:size="200" />
              </v-flex>
              <v-flex xs5>
                <v-text-field readonly label="Username" v-model.trim="user.username" />
                <v-text-field readonly label="Display Name" v-model.trim="user.display_name" />
                <v-text-field readonly label="First Name" v-model.trim="user.first_name" />
                <v-text-field readonly label="Last Name" v-model.trim="user.last_name" />
                <v-text-field readonly label="Email" v-model.trim="user.email" />
              </v-flex>
            </v-layout>

            <v-card-actions class="info-controls transparent">
              <v-spacer />
              <v-btn light>Edit on Google+</v-btn>
            </v-card-actions>

          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card v-if="showEmployeeInfo" class="employee-info">
          <v-container fluid>

            <v-layout>
              <v-flex xs12>
                <v-card-title class="info-title">Exployee Info</v-card-title>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs5 class="office-info">
                <div class="office-photo">
                  <div v-if="myOffice">({{ myOffice.name }} Office Photo)</div>
                </div>
                <v-layout>
                  <v-select single-line persistent-hint clearable
                      hint="Office"
                      v-bind:itemValue="'id'"
                      v-bind:itemText="'name'"
                      v-bind:items="availableOffices"
                      v-model="itemEditing.profile.office_id" />
                </v-layout>
                <v-layout row>
                  <v-select single-line persistent-hint
                      hint="Career Level"
                      v-bind:itemValue="'code'"
                      v-bind:itemText="'display_name'"
                      v-bind:items="availableCareerLevels"
                      v-model="itemEditing.profile.career_level_code" />
                </v-layout>
                <v-layout row>
                  <v-checkbox light primary hide-details
                      label="I am a Hive Master"
                      v-model="itemEditing.profile.is_hive_master" />
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-text-field label="Professional Title" v-model.trim="itemEditing.profile.professional_title" />
                <v-text-field label="Tagline" v-model.trim="itemEditing.profile.tagline" />
                <v-text-field textarea label="About Me" v-model.trim="itemEditing.profile.description" />
              </v-flex>
            </v-layout>

            <v-card-actions class="info-controls transparent">
              <editor-feedback v-bind:resource="'user-profile'" v-bind:autoCloseAfterMillis="5000" />
              <v-spacer />
              <v-btn light v-on:click="saveEmployeeInfo">Save</v-btn>
            </v-card-actions>

          </v-container>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card v-if="showExpertiseInfo" class="expertise-info">
          <v-container fluid>

            <v-layout>
              <v-flex xs12>
                <v-card-title class="info-title">Expertise</v-card-title>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12 class="core-discipline-info">
                <div class="info-sub-heading">My Core Disciplines</div>
                <v-select chips return-object multiple clearable
                    hint="Core Disciplines"
                    v-bind:itemValue="'id'"
                    v-bind:itemText="'label'"
                    v-bind:items="availableCoreDisciplines"
                    v-model="itemEditing.core_disciplines" />
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12 class="expertise-tag-info">
                <div class="info-sub-heading">Software</div>
                <v-select chips return-object multiple clearable
                    v-if="availableSoftwareTags"
                    hint="Software"
                    v-bind:itemValue="'id'"
                    v-bind:itemText="'label'"
                    v-bind:items="availableSoftwareTags"
                    v-model="itemEditing.software_tags" />
              </v-flex>
            </v-layout>

            <v-card-actions class="info-controls transparent">
              <editor-feedback v-bind:resource="'user-expertise'" v-bind:autoCloseAfterMillis="5000" />
              <v-spacer />
              <v-btn light v-on:click="saveExpertiseInfo">Save</v-btn>
            </v-card-actions>

          </v-container>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import UserAvatar from '../Users/UserAvatar.vue';
import EditorFeedback from './EditorFeedback.vue';

export default {
  name: 'ExternalUserProfileEditor',

  components: {
    UserAvatar,
    EditorFeedback,
  },

  data() {
    return {
      itemEditing: this.user,
      availableCareerLevels: [
        {
          code: 1,
          alias: 'junior-consultant',
          display_name: 'Junior Consultant',
          description: null,
        },
        {
          code: 2,
          alias: 'consultant',
          display_name: 'Consultant',
          description: null,
        },
        {
          code: 3,
          alias: 'senior Consultant',
          display_name: 'Senior Consultant',
          description: null,
        },
        {
          code: 4,
          alias: 'leader',
          display_name: 'Leader',
          description: null,
        },
        {
          code: 5,
          alias: 'advisor',
          display_name: 'Advisor',
          description: null,
        },
      ],
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
    showEmployeeInfo: {
      type: Boolean,
      default: true,
    },
    showExpertiseInfo: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    myOffice() {
      const officeID = this.user.profile.office_id;
      return (officeID) ? this.$root.lookupOfficeByID(officeID) : null;
    },
    availableOffices() {
      const data = this.$store.getters.offices;
      return (data) ? data.items : null;
    },
    availableCoreDisciplines() {
      const data = this.$store.getters.coreDisciplines;
      return (data) ? data.items : null;
    },
    availableSoftwareTags() {
      const data = this.$store.getters.softwareTags;
      return (data) ? data.items : null;
    },
  },

  beforeMount() {
    this.$store.dispatch('LOAD_SOFTWARE_TAGS');
  },

  methods: {
    saveEmployeeInfo() {
      this.$store.dispatch('UPDATE_MY_USER_PROFILE', this.itemEditing.profile);
    },
    saveExpertiseInfo() {
      const saveActions = [];

      // Core Disciplines...
      const udpateCoreDisciplines = this.$store.dispatch('UPDATE_MY_CORE_DISCIPLINES', this.itemEditing.core_disciplines);
      saveActions.push(udpateCoreDisciplines);

      // Software Tags...
      const udpateSoftwareTags = this.$store.dispatch('UPDATE_MY_EXPERTISE', { tagset: 'software', tags: this.itemEditing.software_tags });
      saveActions.push(udpateSoftwareTags);

      // Perform save...
      return Promise.all([saveActions]);
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

  /* ------------- */
  /* Employee Info */
  /* ------------- */

  .employee-info {
    background-color: #f2f2f2;
    padding: 12px;
    margin-bottom: 20px;
    min-width: 500px;
  }
  .employee-info .office-info {
    padding: 0 30px 0 20px;
  }
  .employee-info .office-info .office-photo {
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    min-height: 140px;
    min-width: 100px;
  }
  .employee-info .tag-selector {
    margin-bottom: 20px;
  }

  /* -------------- */
  /* Expertise Info */
  /* -------------- */

  .expertise-info {
    background-color: #f2f2f2;
    padding: 12px;
    margin-bottom: 20px;
    min-width: 500px;
  }
  .expertise-info .core-discipline-info {
    padding: 0 30px 0 20px;
    margin-bottom: 20px;
  }
  .expertise-info .expertise-tag-info {
    padding: 0 30px 0 20px;
  }

</style>
