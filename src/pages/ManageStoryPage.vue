<template>
  <div class="manage-story-page with-nav">

    <v-toolbar fixed flat light dense class="page-nav">
      <v-toolbar-title class="page-nav-heading">
        <transition name="fade-flash" mode="out-in">
          <span v-if="!storyToEdit" key="titleLoading">loading...</span>
          <span v-else key="titleReady">{{ storyToEdit.title }}</span>
        </transition>
      </v-toolbar-title>

      <chapter-tree v-bind:chapters="chapterItems" />
    </v-toolbar>

    <v-navigation-drawer persistent clipped right light
        class="list-panel hidden-xs-only"
        v-model="isListPanelOpen">
      <div class="list-panel-controls">
        <div class="control-set">Chapters</div>
      </div>
      <admin-content-list
          v-bind:items="chapterItems"
          v-bind:displayField="'title'"
          v-bind:itemStyle="'card'"
          v-bind:noItemsText="'no chapters yet'" />
    </v-navigation-drawer>

    <main class="edit-panel">
      <v-container>
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
import ChapterTree from '../components/Chapters/ChapterTree.vue';

export default {
  name: 'ManageStoryPage',

  components: {
    AdminContentEditor,
    AdminContentList,
    ChapterTree,
  },

  data() {
    return {
      isListPanelOpen: true,
      errorMessage: null,
    };
  },

  props: ['activeStoryID'],

  computed: {
    storyToEdit() {
      return this.$store.getters.itemToEdit;
    },
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
    chapterItems() {
      return (this.storyToEdit && this.storyToEdit.chapters) ? this.storyToEdit.chapters : null;
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

  .page-nav .chapter-tree {
    margin-left: 20px;
  }

</style>
