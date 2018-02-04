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
      <v-stepper vertical flat v-model="activeIndex">
        <template v-for="(chapter, index) in chapters">
          <v-stepper-step v-bind:step="index + 1" />
          <v-stepper-content v-bind:step="index + 1">
            {{ chapter.title }}
          </v-stepper-content>
        </template>
      </v-stepper>
    </template>
  </div>
</template>

<script>
import ChapterTreeNode from './ChapterTreeNode.vue';

export default {
  name: 'ChapterTreeStepper',

  components: {
    ChapterTreeNode,
  },

  data() {
    return {
      activeIndex: 1,
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
      return ['chapter-tree-stepper', { vertical: this.vertical, horizontal: !this.vertical, mini: this.mini }];
    },
    hasChapters() {
      return (this.chapters && this.chapters.length > 0);
    },
    activeChapter() {
      return (this.hasChapters) ? this.chapters[this.activeIndex - 1] : null;
    },
  },

  methods: {
    onChapterNodeClick(chapter) {
      console.log('[ChapterTreeStepper] chapter node clicked =>', chapter);
    },
  },
};
</script>

<style scoped>

/* -----------------------------------------------------------------------------
 * Vertical
 * -------------------------------------------------------------------------- */

  .chapter-tree-stepper.vertical {
  }

/* -----------------------------------------------------------------------------
 * Horizontal
 * -------------------------------------------------------------------------- */

  .chapter-tree-stepper.horizontal {
  }

</style>
