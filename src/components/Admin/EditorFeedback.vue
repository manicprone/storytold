<template>
  <transition name="fade-fast" mode="out-in">

    <div v-if="activeMessage" class="editor-feedback" v-on:click.prevent="closeNotification">
      <v-toolbar class="message" flat light dense center>
        <div class="feedback-icon">
          <i class="material-icons">{{ notificationIcon }}</i>
        </div>
        <div class="feedback-text">
          {{ activeMessage.text }}
        </div>
        <div v-if="actionLink" class="col feedback-link">
          <a v-bind:href="actionLink" target="_blank"></a>
        </div>
      </v-toolbar>
    </div>

  </transition>
</template>

<script>
export default {
  name: 'EditorFeedback',

  props: {
    resource: {
      type: String,
      default: 'system-data', // 'system-data' | 'user-data' | 'story' | 'user-profile'
    },
    autoCloseAfterMillis: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    activeMessage() {
      let message = null;

      switch (this.resource) {
        case 'system-data': message = this.$store.getters.systemItemToEditFeedback; break;
        case 'user-data': message = this.$store.getters.itemToEditFeedback; break;
        // case 'story': message = this.$store.getters.storyToEditFeedback; break;
        case 'user-profile': message = this.$store.getters.userProfileEditingFeedback; break;
      }

      if (message && this.autoCloseDelay) {
        setTimeout(() => {
          this.closeNotification();
        }, this.autoCloseDelay);
      }

      return message;
    },
    actionLink() {
      return this.activeMessage.action_link;
    },
    autoCloseDelay() {
      return (this.autoCloseAfterMillis && this.autoCloseAfterMillis > 0) ? this.autoCloseAfterMillis : false;
    },
    notificationIcon() {
      switch (this.activeMessage.severity) {
        case 'info': return 'info';
        case 'warning': return 'info';
        case 'error': return 'warning';
        case 'success': return 'check_circle';
        default: return 'check_circle';
      }
    },
  },

  methods: {
    closeNotification() {
      if (this.activeMessage) {
        switch (this.resource) {
          case 'system-data': return this.$store.dispatch('RESOLVE_MESSAGE_FOR_SYSTEM_ITEM_TO_EDIT');
          case 'user-data': return this.$store.dispatch('RESOLVE_MESSAGE_FOR_ITEM_TO_EDIT');
          // case 'story': return this.$store.dispatch('RESOLVE_MESSAGE_FOR_STORY_TO_EDIT');
          case 'user-profile': return this.$store.dispatch('RESOLVE_MESSAGE_FOR_USER_PROFILE_EDITING');
        }
      }
    },
  },
};
</script>

<style scoped>

  .message {
    cursor: pointer;
  }
  .message .feedback-icon {
    margin-right: 7px;
    margin-left: 24px !important;
  }
  .message .feedback-text {
    font-size: 16px;
    margin-bottom: 4px;
  }
  .message .feedback-link {}

</style>
