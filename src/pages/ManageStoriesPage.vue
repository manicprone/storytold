<template>
  <div class="manage-stories-page">

    <v-navigation-drawer permanent clipped light class="list-panel">
      <div class="list-panel-controls">
        <div class="control-set">Filters, etc</div>
      </div>
      <admin-content-list
          v-bind:items="storyItems"
          v-bind:displayField="'title'"
          v-bind:itemStyle="'card'"
          v-on:itemClick="loadStoryToQuickView" />
    </v-navigation-drawer>

    <main class="edit-panel">
      <v-container fluid>
        <transition name="fade-flash" mode="out-in">

          <div v-if="!storyToQuickView" class="message-view" key="quickViewOff">
            <template v-if="hasStories">
              <div class="message-select-to-edit">Select a Story to preview</div>
              <div class="message-or">-or-</div>
            </template>
            <div>
              <a class="message-create-draft"
                 v-on:click="startNewStory">+ Start a new Story</a>
            </div>
          </div>

          <div v-else class="active-edit-view" key="quickViewOn">

            <div>
              <router-link v-bind:to="{ name: 'manage-story', params: { activeStoryID: storyToQuickView.id } }">
                <span>Edit Story</span>
              </router-link>
            </div>
            <br />
            <div>Previewing: {{ storyToQuickView.title }}</div>

            <div class="close-active-edit"><a v-on:click="clearStoryToQuickView">(Close)</a></div>
          </div>

        </transition>
      </v-container>
    </main>

  </div>
</template>

<script>
import AdminContentList from '../components/Admin/AdminContentList.vue';

export default {
  name: 'ManageStoriesPage',

  components: {
    AdminContentList,
  },

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
    storyToQuickView() {
      return this.$store.getters.itemToPreview;
    },
  },

  beforeMount() {
    this.clearStoryToQuickView(); // clear shared space
    this.$store.dispatch('LOAD_MY_STORIES');
  },

  methods: {
    loadStoryToQuickView(story) {
      if (!this.storyToQuickView) return this.$store.dispatch('SET_ITEM_TO_PREVIEW', story);

      const activeQuickViewID = this.storyToQuickView.id;
      if (story && story.id !== activeQuickViewID) {
        // Clear first, for transition effect...
        return this.clearStoryToQuickView()
          .then(() => {
            setTimeout(() => {
              return this.$store.dispatch('SET_ITEM_TO_PREVIEW', story);
            }, 200);
          });
      }

      return false;
    },
    clearStoryToQuickView() {
      return this.$store.dispatch('CLEAR_ITEM_TO_PREVIEW');
    },
    startNewStory() {
      this.$store.dispatch('CREATE_DRAFT_STORY_TO_EDIT')
        .then((story) => {
          // Navigate to edit page...
          this.$router.push({ name: 'manage-story', params: { activeStoryID: story.id }});
        })
        .catch((error) => {
          console.log('[ManageStoriesPage] error =>', error);
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
