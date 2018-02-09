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
      <!-- Prev Chapter Controls -->
      <div class="step-controls-container">
        <v-btn flat v-on:click.native.stop="prev" class="btn-prev-chapter" v-show="activeIndex > 0">
          <v-icon>arrow_upward</v-icon>
        </v-btn>
      </div>

      <!-- Container -->
      <div v-bind:style="containerStyleSettings" class="chapter-tree-container">
        <div class="chapter-tree-canvas"
            ref="treeCanvas"
            v-bind:style="canvasStyleSettings">

          <!-- Story Lead -->
          <div v-bind:style="storyLeadStyleSettings" class="story-lead-wrapper">
            <transition name="fade" mode="out-in">
              <div class="story-lead" v-show="isLeadOpen">
                <div class="story-title">{{ story.title }}</div>
                <div class="story-description" v-if="story.description">{{ story.description }}</div>
              </div>
            </transition>
          </div>

          <!-- Chapter Tree -->
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
      <div class="step-controls-container">
        <v-btn flat v-on:click.native.stop="next" class="btn-next-chapter" v-if="nextChapter">
          <v-icon>arrow_downward</v-icon>
        </v-btn>
      </div>
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
      activeCanvasY: 0,
      containerH: 625,
      leadH: 275,
      isLeadOpen: false,
    };
  },

  props: {
    story: {
      type: Object,
      default: null,
    },
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
    showLead: {
      type: Boolean,
      default: true,
    },
    openStyle: {
      type: String,
      default: 'open-close', // 'open-close', 'open', 'always-open'
    },
    stepSpeed: {
      type: Number,
      default: 800, // milliseconds
    },
    openSpeed: {
      type: Number,
      default: 500, // milliseconds
    },
    closeSpeed: {
      type: Number,
      default: 500, // milliseconds
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
    canvasStyleSettings() {
      return (this.vertical)
        ? `transform:translateY(${this.activeCanvasY}px);-webkit-transform:translateY(${this.activeCanvasY}px);`
        : '';
    },
    storyLeadStyleSettings() {
      const nodeObjectH = 25;
      this.leadH = (this.containerH - (nodeObjectH * 3)) / 2;
      return `height:${this.leadH}px;`;
    },
  },

  mounted() {
    this.activeIndex = this.startAt;
    this.isLeadOpen = (this.activeIndex === 0 && this.showLead);
  },

  methods: {
    onChapterNodeClick(chapter) {
      // console.log('[ChapterTreeStepper] chapter node clicked =>', chapter);
    },
    prev() {
      if (this.activeIndex > 0) {
        // Close active node...
        if (this.openStyle === 'open-close') {
          const activeTreeNode = this.$refs.treeNode[this.activeIndex - 1];
          if (activeTreeNode) activeTreeNode.closeNode();
        }

        setTimeout(() => {
          // Step to prev...
          this.activeIndex -= 1;
          this.activeCanvasY = (this.activeIndex > 0)
              ? -1 * (((this.activeIndex - 1) * this.containerH) + this.leadH)
              : 0;

          // Open node...
          if (this.openStyle !== 'always-open' && this.activeIndex > 0) {
            setTimeout(() => {
              const prevTreeNode = this.$refs.treeNode[this.activeIndex - 1];
              if (prevTreeNode) prevTreeNode.openNode();
            }, 800);
          }

          // Open lead...
          if (this.showLead && this.activeIndex === 0) {
            setTimeout(() => {
              this.isLeadOpen = true;
            }, 800);
          }

        }, 200);
      }
    },
    next() {
      if (this.nextChapter) {
        // Close lead...
        this.isLeadOpen = false;

        // Close active node...
        if (this.openStyle === 'open-close' && this.activeIndex > 0) {
          const activeTreeNode = this.$refs.treeNode[this.activeIndex - 1];
          if (activeTreeNode) activeTreeNode.closeNode();
        }

        setTimeout(() => {
          // Step to next...
          this.activeCanvasY = (this.activeIndex === 0)
              ? -1 * this.leadH
              : -1 * ((this.activeIndex * this.containerH) + this.leadH);
          this.activeIndex += 1;

          // Open node...
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

  /* Story Lead */
  .chapter-tree-stepper.vertical .story-lead-wrapper {
    padding-top: 50px;
  }
  .chapter-tree-stepper.vertical .story-lead {
    background-color: #d9d9d9;
    border-radius: 4px;
    margin: 0 auto;
    padding: 20px;
    max-width: 550px;
    height: 100%;
    overflow-y: scroll;
  }
  .chapter-tree-stepper.vertical .story-lead .story-title {
    font-size: 20px;
    font-weight: 500;
  }
  .chapter-tree-stepper.vertical .story-lead .story-subtitle {
    font-size: 16px;
  }
  .chapter-tree-stepper.vertical .story-lead .story-description {
    font-size: 16px;
    margin-top: 12px;
  }

  /* Stepper */
  .chapter-tree-stepper.vertical .chapter-tree-container {
    background-color: rgba(77, 129, 175, 0.4);
    overflow-y: hidden;
  }
  .chapter-tree-stepper.vertical .chapter-tree-canvas {
    /*-webkit-transform: translateY(0);
    transform: translateY(0);*/
    -webkit-transition: -webkit-transform 0.8s;
    transition: transform 0.8s;
  }

  /* Stepper Controls */
  .chapter-tree-stepper.vertical .step-controls-container {
    background-color: #d9d9d9;
    height: 36px;
  }
  .chapter-tree-stepper.vertical .btn-prev-chapter {
    margin: 0;
    padding: 0;
    /*position: fixed;
    right: 10px;
    z-index: 200;*/
  }
  .chapter-tree-stepper.vertical .btn-next-chapter {
    margin: 0;
    padding: 0;
    /*position: fixed;
    right: 10px;
    bottom: 40px;
    z-index: 200;*/
  }

/* -----------------------------------------------------------------------------
 * Horizontal
 * -------------------------------------------------------------------------- */

  .chapter-tree-stepper.horizontal {
  }

</style>
