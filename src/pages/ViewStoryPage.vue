<template>
  <main class="view-story-page">
    <v-container fluid>
      <transition name="fade-flash" mode="out-in">

        <v-container v-if="!storyToView" class="message-view" key="viewOff">
          <span v-if="errorMessage">{{ errorMessage }}</span>
        </v-container>

        <v-container v-else class="main-view" key="viewOn">
          <div>View: {{ activeStoryID }}</div>
          <div>
            <router-link v-bind:to="{ name: 'manage-story', params: { activeStoryID: storyToView.id } }">
              <span><< Back</span>
            </router-link>
          </div>

          <chapter-tree v-bind:chapters="chapterItems" v-bind:vertical="true" />
        </v-container>

      </transition>
    </v-container>
  </main>
</template>

<script>
import ChapterTree from '../components/Chapters/ChapterTree.vue';

export default {
  name: 'ViewStoryPage',

  components: {
    ChapterTree,
  },

  data() {
    return {
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

</style>
