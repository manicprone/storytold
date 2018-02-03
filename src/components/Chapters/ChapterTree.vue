<template>
  <div v-if="hasChapters" v-bind:class="baseClasses">
    <template v-if="mini">
      <template v-for="(chapter, index) in chapters">
        <chapter-tree-node class="tree-node"
            v-bind:chapter="chapter"
            v-bind:index="index + 1"
            v-bind:key="'node-' + chapter.id"
            v-on:itemClick="onChapterNodeClick" />
        <v-divider v-if="index < chapters.length - 1"></v-divider>
      </template>
    </template>

    <template v-else>
      <chapter-tree-node class="tree-node"
          v-bind:chapter="activeChapter"
          v-bind:index="chapterIndex + 1"
          v-bind:vertical="vertical"
          v-bind:round="true" />
    </template>
  </div>
</template>

<script>
import ChapterTreeNode from './ChapterTreeNode.vue';

export default {
  name: 'ChapterTree',

  components: {
    ChapterTreeNode,
  },

  data() {
    return {
      chapterIndex: 0,
    };
  },

  props: {
    chapters: {
      type: Array,
      default: null,
    },
    mini: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    baseClasses() {
      return ['chapter-tree', { vertical: this.vertical, horizontal: !this.vertical, mini: this.mini }];
    },
    hasChapters() {
      return (this.chapters && this.chapters.length > 0);
    },
    activeChapter() {
      return (this.hasChapters) ? this.chapters[this.chapterIndex] : null;
    },
  },

  methods: {
    onChapterNodeClick(chapter) {
      console.log('[ChapterTree] chapter node clicked =>', chapter);
    },
  },
};
</script>

<style scoped>

/* -----------------------------------------------------------------------------
 * Vertical
 * -------------------------------------------------------------------------- */

  .chapter-tree.vertical .tree-node {
    display: block;
  }

/* -----------------------------------------------------------------------------
 * Horizontal
 * -------------------------------------------------------------------------- */

  .chapter-tree.horizontal {
    overflow-x: scroll;
    overflow-y: hidden;
    text-align: left;
    white-space: nowrap;
  }
  .chapter-tree.horizontal .tree-node {
    display: inline-block;
  }
  .chapter-tree.horizontal .divider {
    display: inline-block;
    margin-bottom: 3px;
    width: 30px;
  }

</style>
