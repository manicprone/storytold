<template>
  <div v-if="itemEditing">

    <v-layout row>
      <v-flex xs8>
        <v-text-field label="Title" v-model.trim="itemEditing.title" />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs8>
        <v-text-field label="Slug" v-model.trim="itemEditing.slug" />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs8>
        <v-text-field label="Subtitle" v-model.trim="itemEditing.subtitle" />
      </v-flex>
    </v-layout>

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
</template>

<script>
/*
<v-select return-object multiple class="button-add-chapters"
    v-bind:itemValue="'id'"
    v-bind:itemText="'title'"
    v-bind:items="chapterItems"
    v-model="itemEditing.chapters" />
*/

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
    availableChaptersToAdd() {
      return this.chapterItems;
    },
  },

  beforeMount() {
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
