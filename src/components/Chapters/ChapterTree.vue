<template>
  <div v-if="chapters" class="chapter-tree">
    <template v-for="(chapter, index) in chapters">
        <chapter-tree-node class="tree-node"
            v-bind:chapter="chapter"
            v-bind:index="index + 1"
            v-bind:key="'node-' + chapter.id"
            v-on:itemClick="onChapterNodeClick" />
        <v-divider v-if="index < chapters.length - 1"></v-divider>
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

  props: {
    chapters: {
      type: Array,
      default: null,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
  },

  methods: {
    onChapterNodeClick(chapter) {
      console.log('[ChapterTree] chapter node clicked =>', chapter);
    },
  },
};
</script>

<style scoped>

  .chapter-tree {
    overflow-x: scroll;
    text-align: left;
    width: 100%;
  }

  .chapter-tree .tree-node {
    display: inline-block;
  }

  .chapter-tree .divider {
    display: inline-block;
    margin-bottom: 3px;
    width: 30px;
  }

</style>
