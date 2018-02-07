<template>
  <div v-if="hasChapters"
      v-bind:class="['chapter-tree-stepper', { vertical: this.vertical, horizontal: !this.vertical, mini: this.mini }]">

    <!-------------------->
    <!-- Mini Tree Mode -->
    <!-------------------->
    <template v-if="mini">
      <template v-for="(chapter, index) in chapters">
        <chapter-tree-node
            v-bind:chapter="chapter"
            v-bind:index="index + 1"
            v-bind:key="'node-' + chapter.id"
            v-on:itemClick="onChapterNodeClick" />
        <v-divider v-if="index < chapters.length - 1"></v-divider>
      </template>
    </template>

    <!----------------------->
    <!-- Default Tree Mode -->
    <!----------------------->
    <template v-else>
      <!-- Story Lead -->
      <div v-if="!activeChapter" class="story-lead">
        <transition name="fade-fast" mode="out-in">
          <div>Start the story...</div>
        </transition>
      </div>

      <!-- Prev Chapter Controls -->
      <v-btn flat v-on:click.native.stop="prev" class="btn-prev-chapter" v-if="prevChapter">
        <v-icon>arrow_upward</v-icon>
      </v-btn>

      <!-- Chapter Tree -->
      <div class="chapter-tree-container">
        <template v-if="prevChapter">
          <chapter-tree-node
              v-bind:vertical="true"
              v-bind:round="true"
              v-bind:chapter="prevChapter"
              v-bind:index="activeIndex - 1"
              v-bind:key="'node-' + prevChapter.id"
              v-on:itemClick="onChapterNodeClick" />
        </template>

        <template v-if="activeChapter">
          <chapter-tree-node
              v-bind:vertical="true"
              v-bind:round="true"
              v-bind:chapter="activeChapter"
              v-bind:index="activeIndex"
              v-bind:key="'node-' + activeChapter.id"
              v-on:itemClick="onChapterNodeClick" />
        </template>

        <template v-if="nextChapter">
          <chapter-tree-node
              v-bind:vertical="true"
              v-bind:round="true"
              v-bind:chapter="nextChapter"
              v-bind:index="activeIndex + 1"
              v-bind:key="'node-' + nextChapter.id"
              v-on:itemClick="onChapterNodeClick" />

          <chapter-tree-node v-if="nextNextChapter"
              v-bind:vertical="true"
              v-bind:round="true"
              v-bind:chapter="nextNextChapter"
              v-bind:index="activeIndex + 2"
              v-bind:key="'node-' + nextNextChapter.id"
              v-on:itemClick="onChapterNodeClick" />
        </template>
      </div>

      <!-- Next Chapter Controls -->
      <v-btn flat v-on:click.native.stop="next" class="btn-next-chapter" v-if="nextChapter">
        <v-icon>arrow_downward</v-icon>
      </v-btn>
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
      activeIndex: 0,
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
    totalChapters() {
      return (this.chapters) ? this.chapters.length : 0;
    },
    hasChapters() {
      return (this.totalChapters > 0);
    },
    prevChapter() {
      return (this.activeIndex > 1) ? this.chapters[this.activeIndex - 2] : null;
    },
    activeChapter() {
      return (this.activeIndex > 0) ? this.chapters[this.activeIndex - 1] : null;
    },
    nextChapter() {
      return (this.activeIndex < this.totalChapters)
          ? this.chapters[this.activeIndex]
          : null;
    },
    nextNextChapter() {
      return (this.activeIndex + 1 < this.totalChapters)
          ? this.chapters[this.activeIndex + 1]
          : null;
    },
  },

  methods: {
    onChapterNodeClick(chapter) {
      console.log('[ChapterTreeStepper] chapter node clicked =>', chapter);
    },
    prev() {
      if (this.prevChapter) this.activeIndex -= 1;
    },
    next() {
      if (this.nextChapter) this.activeIndex += 1;
    },
  },
};
</script>

<style scoped>

  .story-lead {
    background-color: #d9d9d9;
    margin: 10px 20px;
    min-height: 60px;
  }

/* -----------------------------------------------------------------------------
 * Vertical
 * -------------------------------------------------------------------------- */

  .chapter-tree-stepper.vertical {
  }
  .chapter-tree-stepper.vertical .chapter-tree-container {
    background-color: #4299e6;
    max-height: 400px;
    overflow-y: scroll;
  }
  .chapter-tree-stepper.vertical .chapter-tree-node {
  }

  .chapter-tree-stepper.vertical .btn-prev-chapter {
    position: relative;
    z-index: 200;
  }
  .chapter-tree-stepper.vertical .btn-next-chapter {
    position: relative;
    z-index: 200;
  }

/* -----------------------------------------------------------------------------
 * Horizontal
 * -------------------------------------------------------------------------- */

  .chapter-tree-stepper.horizontal {
  }

</style>
