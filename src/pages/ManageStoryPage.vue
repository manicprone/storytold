<template>
  <div class="manage-story-page">

    <main class="edit-panel">
      <v-container fluid>
        <transition name="fade-flash" mode="out-in">

          <div v-if="!storyToEdit" class="message-view" key="editOff">
            <span v-if="errorMessage">{{ errorMessage }}</span>
          </div>

          <div v-else class="active-edit-view" key="editOn">
            <admin-content-editor
                v-bind:item="storyToEdit"
                v-bind:resourceType="'user-data'"
                v-on:cancel="clearStoryToEdit"
                v-on:save="saveStory"
                v-on:delete="deleteStory" />
          </div>

        </transition>
      </v-container>
    </main>

  </div>
</template>

<script>
import AdminContentEditor from '../components/Admin/AdminContentEditor.vue';
import AdminContentList from '../components/Admin/AdminContentList.vue';

export default {
  name: 'ManageStoryPage',

  components: {
    AdminContentEditor,
    AdminContentList,
  },

  data() {
    return {
      errorMessage: null,
    };
  },

  props: ['activeStoryID'],

  computed: {
    hasStories() {
      return (this.totalStories > 0);
    },
    storyData() {
      return this.$store.getters.myStories;
    },
    storyItems() {
      return (this.storyData) ? this.storyData.items : null;
    },
    totalStories() {
      return (this.$root.utils.has(this.storyData, 'meta.total_items'))
          ? this.storyData.meta.total_items
          : 0;
    },
    storyToEdit() {
      return this.$store.getters.itemToEdit;
    },
  },

  watch: {
    activeStoryID(storyID) {
      console.log('[PAGE] the story ID changed !!!', storyID);
    },
  },

  // TODO: Add prefetch call !!!

  beforeMount() {
    this.$store.dispatch('CLEAR_ITEM_TO_EDIT'); // clear shared space
    
    if (this.activeStoryID) {
      this.$store.dispatch('LOAD_STORY_TO_EDIT', { story_id: this.activeStoryID })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    }
  },

  methods: {
    // loadStoryToEdit(storyID) {
    //   if (!this.itemToEdit) return this.$store.dispatch('SET_ITEM_TO_EDIT', item);
    //
    //   const activeEditID = this.itemToEdit.id;
    //   if (item && item.id !== activeEditID) {
    //     // Clear first, for transition effect...
    //     return this.clearItemToEdit()
    //       .then(() => {
    //         setTimeout(() => {
    //           return this.$store.dispatch('SET_ITEM_TO_EDIT', item);
    //         }, 200);
    //       });
    //   }
    //
    //   return false;
    // },
    clearStoryToEdit() {
      this.$store.dispatch('CLEAR_ITEM_TO_EDIT')
        .then(() => {
          // Navigate to manage stories page...
          this.$router.push({ name: 'manage-stories' });
        });
    },
    saveStory(item = {}) {
      // Create a new item...
      if (!item.id) {
        this.$store.dispatch('CREATE_ITEM', item)
          .then(() => {
            // Refresh story list...
            this.$store.dispatch('LOAD_MY_STORIES', true);
          });

      // Update an existing item...
      } else {
        this.$store.dispatch('UPDATE_ITEM', item)
          .then(() => {
            // Refresh story list...
            this.$store.dispatch('LOAD_MY_STORIES', true);
          });
      } // end-if (!item.id)
    },
    deleteStory(item = {}) {
      this.$store.dispatch('DELETE_ITEM', item)
        .then(() => {
          // Refresh story list and clear active edit...
          this.$store.dispatch('LOAD_MY_STORIES', true);
          this.clearStoryToEdit();
        });
    },
  },
};
</script>

<style scoped>

  /* ---------- */
  /* List Panel */
  /* ---------- */

  .list-panel {
    margin-top: 49px;
  }
  .list-panel-controls {
    background-color: #ebebeb;
    border-bottom: 1px solid #d9d9d9;
    height: 50px;
  }
  .list-panel-controls .control-set {
    line-height: 50px;
  }

  /* ---------- */
  /* Edit Panel */
  /* ---------- */

  .edit-panel {
    margin: 140px 0 0 0;
  }
  .close-active-edit {
    position: fixed;
    right: 20px;
    top: 65px;
    z-index: 200;
  }

  /* Message View (no active edit) */
  .message-view .message-select-to-edit {
    margin-bottom: 10px;
  }
  .message-view .message-or {
    margin-bottom: 10px;
  }
  .message-view .message-create-draft {
    margin-bottom: 0;
  }

  /* Active Edit View (project is editing) */
  .active-edit-view {}

</style>
