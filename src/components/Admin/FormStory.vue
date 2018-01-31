<template>
  <div v-if="itemEditing">

    <v-layout row>
      <v-flex xs12>
        <v-text-field label="Title" v-model.trim="itemEditing.title" />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <v-text-field label="Slug" v-model.trim="itemEditing.slug" />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <v-text-field label="Subtitle" v-model.trim="itemEditing.subtitle" />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <v-text-field textarea
            rows="3"
            label="The Story"
            v-model.trim="itemEditing.description" />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <v-menu v-bind:close-on-content-click="false">
          <v-btn primary dark slot="activator">Add Chapters</v-btn>
          <v-list>
            <v-list-tile ripple v-for="chapter in availableChaptersToAdd"
                v-bind:key="chapter.title"
                v-on:click="addChapterToStory(chapter)">
              <v-list-tile-title>{{ chapter.title }}</v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-if="!hasChaptersToAdd">
              <v-list-tile-title>No more chapters</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
export default {
  name: 'FormStory',

  props: {
    itemEditing: {
      type: Object,
      default: null,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
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
    hasChaptersToAdd() {
      return (this.availableChaptersToAdd && this.availableChaptersToAdd.length > 0);
    },
    availableChaptersToAdd() {
      return this.$root.utils.filter(this.chapterItems, (item) => {
        return !this.$root.utils.includesObject(this.itemEditing.chapters, 'id', item.id);
      });
    },
  },

  beforeMount() {
    this.$store.dispatch('LOAD_MY_CHAPTERS');
  },

  methods: {
    addChapterToStory(chapter) {
      const ref = { story_id: this.itemEditing.id, chapter_id: chapter.id };
      this.$store.dispatch('ADD_CHAPTER_TO_STORY', ref)
        .then(() => {
          this.itemEditing.chapters.push(chapter);
        });
    },
  },
};
</script>

<style scoped>
</style>
