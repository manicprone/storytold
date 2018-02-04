<template>
  <main class="view-story-page">

    <template v-if="!storyToView">
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </template>

    <template v-else>
      <v-navigation-drawer persistent light enable-resize-watcher
          class="full-view"
          v-bind:mobileBreakPoint="600"
          v-model="isFullViewOpen">

        <div>Full View</div>
      </v-navigation-drawer>

      <main class="main-view">
        <v-container>
          <div>View: {{ activeStoryID }}</div>
          <div>
            <router-link v-bind:to="{ name: 'manage-story', params: { activeStoryID: storyToView.id } }">
              <span><< Back</span>
            </router-link>
          </div>

          <chapter-tree-stepper v-bind:chapters="chapterItems" v-bind:vertical="true" />
        </v-container>
      </main>

      <!-- <v-navigation-drawer right persistent light enable-resize-watcher
          class="bio-view"
          v-bind:mobileBreakPoint="600"
          v-model="isBioViewOpen">

        <div>Bio View</div>
      </v-navigation-drawer> -->
    </template>

  </main>
</template>

<script>
import ChapterTree from '../components/Chapters/ChapterTree.vue';
import ChapterTreeStepper from '../components/Chapters/ChapterTreeStepper.vue';

export default {
  name: 'ViewStoryPage',

  components: {
    ChapterTree,
    ChapterTreeStepper,
  },

  data() {
    return {
      isFullViewOpen: true,
      isBioViewOpen: true,
      errorMessage: null,
    };
  },

  props: ['activeStoryID'],

  computed: {
    storyToView() {
      return this.$store.getters.storyToView;
    },
    chapterItems() {
      return (this.storyToView && this.storyToView.chapters) ? this.storyToView.chapters : null;
    },
  },

  // TODO: Add prefetch call !!!

  beforeMount() {
    this.$store.dispatch('CLEAR_STORY_TO_VIEW'); // clear view space

    if (this.activeStoryID) {
      this.$store.dispatch('LOAD_STORY_TO_VIEW', { story_id: this.activeStoryID })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    }
  },

  methods: {
  },
};
</script>

<style scoped>

  .full-view {
    max-width: 200px;
  }

</style>
