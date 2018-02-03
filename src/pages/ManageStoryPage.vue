<template>
  <div class="manage-story-page with-nav">

    <v-toolbar fixed flat light dense class="page-nav">
      <div class="page-nav-heading">
        <transition name="fade-flash" mode="out-in">
          <v-progress-circular indeterminate v-if="!storyToEdit" key="storyLoading"
              style="margin-top:6px;"
              v-bind:size="21" />
          <span v-else key="storyReady">{{ storyToEdit.title }}</span>
        </transition>
      </div>

      <template v-if="storyToEdit">
        <div class="page-nav-controls">
          <router-link v-bind:to="{ name: 'view-story', params: { activeStoryID: storyToEdit.id } }">
            <v-btn small flat light>
              {{ $root.translate('action.preview') }}
            </v-btn>
          </router-link>
        </div>
        <div class="page-nav-divider"></div>
        <chapter-tree v-bind:chapters="chapterItems" v-bind:mini="true" />
      </template>
    </v-toolbar>

    <v-navigation-drawer persistent right light enable-resize-watcher
        class="list-panel"
        v-bind:mobileBreakPoint="600"
        v-bind:mini-variant.sync="isListPanelMini"
        v-model="isListPanelOpen">
      <v-toolbar flat light dense class="list-panel-controls">
        <template v-if="isListPanelMini">
          <v-btn flat v-on:click.native.stop="isListPanelMini = !isListPanelMini">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn icon v-on:click.native.stop="isListPanelMini = !isListPanelMini">
            <v-icon>chevron_right</v-icon>
          </v-btn>
          <v-toolbar-title class="list-panel-title">
            {{ listPanelTitleText }}
          </v-toolbar-title>
        </template>
      </v-toolbar>
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
      isListPanelMini: false,
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
    pageNavHeadingText() {
      return this.$root.translate('status.unpublished');
    },
    listPanelTitleText() {
      return this.$root.translate('page.manage_story.list_panel_title');
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
