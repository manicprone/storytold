<template>
  <div v-if="hasChapters"
      v-bind:class="['story-stepper', {
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
                <div class="story-info">
                  <div class="story-title">{{ story.title }}</div>
                  <div class="story-subtitle" v-if="story.subtitle">{{ story.subtitle }}</div>
                  <div class="story-description" v-if="story.description">{{ story.description }}</div>
                </div>
                <v-btn flat v-on:click.native.stop="goTo(1)" class="btn-start-story" v-if="nextChapter">
                  <span>Start Story</span>
                </v-btn>
                <v-btn flat v-on:click.native.stop="goTo(99)" class="btn-start-story">
                  <span>Go to End</span>
                </v-btn>
              </div>
            </transition>
          </div>

          <!-- Chapter Tree -->
          <!-- TODO: Rendering all chapters, for backwards traversal smoothness (but, I think we can tweak it) -->
          <!-- <template v-for="(chapter, index) in chapters" v-if="index <= activeIndex + 1"> -->
          <template v-for="(chapter, index) in chapters">
            <chapter-tree-node
                ref="treeNode"
                v-bind:chapter="chapter"
                v-bind:index="index + 1"
                v-bind:totalChapters="totalChapters"
                v-bind:frameH="containerH"
                v-bind:startOpen="alwaysOpenNode"
                v-bind:vertical="true"
                v-bind:round="true"
                v-bind:key="'node-' + chapter.id"
                v-on:itemClick="onChapterNodeClick" />
          </template>
        </div>
      </div>

      <!-- Next Chapter Controls -->
      <div class="step-controls-container">
        <v-btn flat class="btn-next-chapter"
            v-show="activeIndex > 0 && nextChapter"
            v-on:click.native.stop="next">
          <v-icon>arrow_downward</v-icon>
        </v-btn>
        <v-btn flat class="btn-back-to-start"
            v-on:click.native.stop="goTo(0)"
            v-show="activeIndex > 0 && !nextChapter">
          <span>Start Over</span>
        </v-btn>
      </div>
    </template>

  </div>
</template>

<script>
import ChapterTreeNode from './ChapterTreeNode.vue';

export default {
  name: 'StoryStepper',

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
    chapters() {
      return (this.story) ? this.story.chapters : null;
    },
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
    if (this.startAt > 0) {
      this.goTo(this.startAt);
    } else {
      this.isLeadOpen = (this.activeIndex === 0 && this.showLead);
    }
  },

  methods: {
    onChapterNodeClick(chapter) {
      // console.log('[ChapterTreeStepper] chapter node clicked =>', chapter);
    },
    prev() {
      this.goTo(this.activeIndex - 1);
    },
    next() {
      this.goTo(this.activeIndex + 1);
    },
    goTo(index) {
      if (index !== this.activeIndex) {
        let waitBeforeStep = 200;
        let waitBeforeOpen = 800;
        const fromIndex = this.activeIndex;
        const goToIndex = (index < 0) ? 0 : (index > this.totalChapters) ? this.totalChapters : index;

        // -----------------------
        // Move Stepper Forward...
        // -----------------------
        if (goToIndex > fromIndex) {
          // Clost active node / lead...
          if (this.openStyle === 'open-close') {
            if (fromIndex > 0) {
              const activeTreeNode = this.$refs.treeNode[fromIndex - 1];
              if (activeTreeNode) activeTreeNode.closeNode();
            } else if (this.showLead) {
              waitBeforeStep = 400;
              this.isLeadOpen = false;
            }
          }

          setTimeout(() => {
            // Move to target index...
            this.activeCanvasY = (goToIndex === 1)
                ? -1 * this.leadH
                : -1 * (((goToIndex - 1) * this.containerH) + this.leadH);
            this.activeIndex = goToIndex;

            // Open target node...
            if (this.openStyle !== 'always-open') {
              setTimeout(() => {
                const targetTreeNode = this.$refs.treeNode[this.activeIndex - 1];
                if (targetTreeNode) targetTreeNode.openNode();
              }, waitBeforeOpen);
            }
          }, waitBeforeStep);

        // -------------------------
        // Move Stepper Backwards...
        // -------------------------
        } else {
          // Close active node...
          if (this.openStyle === 'open-close') {
            const activeTreeNode = this.$refs.treeNode[fromIndex - 1];
            if (activeTreeNode) activeTreeNode.closeNode();
          }

          setTimeout(() => {
            // Move to target index...
            this.activeIndex = goToIndex;
            this.activeCanvasY = (goToIndex > 0)
                ? -1 * (((goToIndex - 1) * this.containerH) + this.leadH)
                : 0;

            // Open target node / lead...
            if (this.openStyle !== 'always-open') {
              setTimeout(() => {
                if (goToIndex > 0) {
                  const targetTreeNode = this.$refs.treeNode[this.activeIndex - 1];
                  if (targetTreeNode) targetTreeNode.openNode();
                } else if (this.showLead) {
                  this.isLeadOpen = true;
                }
              }, waitBeforeOpen);
            }
          }, waitBeforeStep);
        } // end-if-else (goToIndex > this.activeIndex)
      } // end-if (index && index !== this.activeIndex)
    },
  },
};
</script>

<style scoped>

/* -----------------------------------------------------------------------------
 * Vertical
 * -------------------------------------------------------------------------- */

  /* Story Lead */
  .story-stepper.vertical .story-lead-wrapper {
    padding-top: 50px;
  }
  .story-stepper.vertical .story-lead {
    position: relative;
    margin: 0 auto;
  }
  .story-stepper.vertical .story-lead .btn-start-story {
    margin-top: 40px;
    font-size: 24px;
    font-weight: 400;
    text-transform: none;
  }
  .story-stepper.vertical .story-lead .story-info {
    background-color: #d9d9d9;
    border-radius: 4px;
    padding: 20px 30px;
    margin: 0 auto;
    height: 300px;
    max-width: 600px;
    overflow-x: hidden;
  }
  .story-stepper.vertical .story-info .story-title {
    font-size: 22px;
    font-weight: 400;
  }
  .story-stepper.vertical .story-info .story-subtitle {
    font-size: 18px;
    font-weight: 400;
    font-style: italic;
    margin-top: 15px;
  }
  .story-stepper.vertical .story-info .story-description {
    font-size: 16px;
    margin-top: 25px;
    max-height: 180px;
    overflow-y: scroll;
  }

  /* Chapter Stepper */
  .story-stepper.vertical .chapter-tree-container {
    background-color: rgba(77, 129, 175, 0.4);
    overflow-y: hidden;
  }
  .story-stepper.vertical .chapter-tree-canvas {
    -webkit-transition: -webkit-transform 0.8s;
    transition: transform 0.8s;
  }

  /* Stepper Controls */
  .story-stepper.vertical .step-controls-container {
    background-color: #d9d9d9;
    height: 36px;
  }
  .story-stepper.vertical .btn-prev-chapter {
    margin: 0;
    padding: 0;
  }
  .story-stepper.vertical .btn-next-chapter {
    margin: 0;
    padding: 0;
  }
  .story-stepper.vertical .btn-back-to-start {
    margin: 0;
    padding: 0;
  }

/* -----------------------------------------------------------------------------
 * Horizontal
 * -------------------------------------------------------------------------- */

  .story-stepper.horizontal {
  }

</style>
