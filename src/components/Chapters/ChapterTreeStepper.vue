<template>
  <div v-if="hasChapters"
      v-bind:class="['chapter-tree-stepper', {
        vertical: this.vertical,
        horizontal: !this.vertical,
        mini: this.mini,
      }]">

    <!-------------------->
    <!-- Mini Tree Mode -->
    <!-------------------->
    <template v-if="mini">
      <template v-for="(chapter, index) in chapters">
        <chapter-tree-node
            v-bind:chapter="chapter"
            v-bind:index="index + 1"
            v-bind:key="'node-' + chapter.id"
            v-on:nodeClick="onChapterNodeClick" />
        <v-divider v-if="index < chapters.length - 1"></v-divider>
      </template>
    </template>

    <!----------------------->
    <!-- Default Tree Mode -->
    <!----------------------->
    <template v-else>
      <!-- Story Lead -->
      <div class="story-lead-wrapper">
        <transition name="fade-fast" mode="out-in">
          <div class="story-lead">Start the story...</div>
        </transition>
      </div>

      <!-- Prev Chapter Controls -->
      <v-btn flat v-on:click.native.stop="prev" class="btn-prev-chapter" v-if="prevChapter">
        <v-icon>arrow_upward</v-icon>
      </v-btn>

      <!-- Chapter Tree -->
      <div v-bind:style="containerStyleSettings" class="chapter-tree-container">
        <div class="chapter-tree-canvas" ref="treeCanvas">
          <template v-for="(chapter, index) in chapters" v-if="index <= activeIndex + 1">
            <chapter-tree-node
                ref="treeNode"
                v-bind:chapter="chapter"
                v-bind:index="index + 1"
                v-bind:frameH="containerH"
                v-bind:startOpen="alwaysOpenNode || (index + 1 === activeIndex)"
                v-bind:vertical="true"
                v-bind:round="true"
                v-bind:key="'node-' + chapter.id"
                v-on:itemClick="onChapterNodeClick" />
          </template>
        </div>
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
      containerH: 625,
    };
  },

  props: {
    chapters: {
      type: Array,
      default: null,
    },
    startAt: {
      type: Number,
      default: 0,
    },
    mini: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    openStyle: {
      type: String,
      default: 'open-close', // 'open-close', 'open', 'always-open'
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
    treeCanvas() {
      return this.$refs.treeCanvas;
    },
    alwaysOpenNode() {
      return this.openStyle === 'always-open';
    },
    containerStyleSettings() {
      return `height:${this.containerH}px;`;
    },
  },

  mounted() {
    this.activeIndex = this.startAt;
  },

  methods: {
    onChapterNodeClick(chapter) {
      // console.log('[ChapterTreeStepper] chapter node clicked =>', chapter);
    },
    prev() {
      if (this.prevChapter) {
        if (this.openStyle === 'open-close') {
          const activeTreeNode = this.$refs.treeNode[this.activeIndex - 1];
          if (activeTreeNode) activeTreeNode.closeNode();
        }

        setTimeout(() => {
          this.activeIndex -= 1;
          const targetY = (this.activeIndex - 1) * this.containerH;
          this.treeCanvas.style.transform = (`translateY(-${targetY}px)`);

          if (this.openStyle !== 'always-open') {
            setTimeout(() => {
              const prevTreeNode = this.$refs.treeNode[this.activeIndex - 1];
              if (prevTreeNode) prevTreeNode.openNode();
            }, 800);
          }

        }, 200);
      }
    },
    next() {
      if (this.nextChapter) {
        if (this.openStyle === 'open-close') {
          const activeTreeNode = this.$refs.treeNode[this.activeIndex - 1];
          if (activeTreeNode) activeTreeNode.closeNode();
        }

        setTimeout(() => {
          const targetY = this.activeIndex * this.containerH;
          this.treeCanvas.style.transform = (`translateY(-${targetY}px)`);
          this.activeIndex += 1;

          if (this.openStyle !== 'always-open') {
            setTimeout(() => {
              const nextTreeNode = this.$refs.treeNode[this.activeIndex - 1];
              if (nextTreeNode) nextTreeNode.openNode();
            }, 800);
          }

        }, 200);
      }
    },
  },
};
</script>

<style scoped>

/* -----------------------------------------------------------------------------
 * Vertical
 * -------------------------------------------------------------------------- */

  .chapter-tree-stepper.vertical .story-lead-wrapper {
   height: 100px;
  }
  .chapter-tree-stepper.vertical .story-lead {
   background-color: #d9d9d9;
   max-height: 80px;
   width: 75%;
   margin: auto;
   overflow-y: scroll;
  }

  .chapter-tree-stepper.vertical .chapter-tree-container {
    background-color: rgba(77, 129, 175, 0.4);
    overflow-y: hidden;
  }
  .chapter-tree-stepper.vertical .chapter-tree-canvas {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-transition: -webkit-transform 0.8s;
    transition: transform 0.8s;
  }

  .chapter-tree-stepper.vertical .btn-prev-chapter {
    position: fixed;
    right: 10px;
    z-index: 200;
  }
  .chapter-tree-stepper.vertical .btn-next-chapter {
    position: fixed;
    right: 10px;
    bottom: 40px;
    z-index: 200;
  }

/* -----------------------------------------------------------------------------
 * Horizontal
 * -------------------------------------------------------------------------- */

  .chapter-tree-stepper.horizontal {
  }

</style>
