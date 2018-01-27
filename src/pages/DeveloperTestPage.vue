<template>
  <main class="developer-test-page">

    <div style="margin:50px 50px;">

      <v-layout row>
        <v-flex xs8>
          <v-menu v-bind:close-on-content-click="false">
            <v-btn primary dark slot="activator">Add Chapters</v-btn>
            <v-list>
              <v-list-tile v-for="chapter in availableChaptersToAdd"
                  v-bind:key="chapter.title"
                  v-on:click="addChapterToStory(chapter)">
                <v-list-tile-title>{{ chapter.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>
      </v-layout>

    </div>

    <div v-if="storyEditing" style="margin:50px 50px;">
      <admin-content-editor
          v-bind:item="storyEditing"
          v-bind:resourceType="'user-data'" />
    </div>

  </main>
</template>

<script>
import AdminContentEditor from '../components/Admin/AdminContentEditor.vue';
import FormStory from '../components/Admin/FormStory.vue';

export default {
  name: 'DeveloperTestPage',

  components: {
    AdminContentEditor,
    FormStory,
  },

  computed: {
    storyEditing() {
      return (this.storyItems.length > 0) ? this.storyItems[0] : null;
    },
    chapterEditing() {
      return (this.chapterItems.length > 0) ? this.chapterItems[0] : null;
    },
    storyData() {
      return this.$store.getters.myStories;
    },
    storyItems() {
      return (this.storyData) ? this.storyData.items : [];
    },
    chapterData() {
      return this.$store.getters.myChapters;
    },
    chapterItems() {
      return (this.chapterData) ? this.chapterData.items : [];
    },
    totalChapters() {
      return (this.$root.utils.has(this.chapterData, 'meta.total_items'))
          ? this.chapterData.meta.total_items
          : 0;
    },
    availableChaptersToAdd() {
      return this.chapterItems;
    },
  },

  beforeMount() {
    this.$store.dispatch('LOAD_MY_STORIES');
    this.$store.dispatch('LOAD_MY_CHAPTERS');
  },

  methods: {
    addChapterToStory(item) {
      console.log('[FormStory] Add chapter =>', item);
    },
  },
};
</script>

<style scoped>

</style>
