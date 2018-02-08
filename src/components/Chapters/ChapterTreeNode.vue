<template>
  <div v-if="chapter"
      v-bind:class="['chapter-tree-node', {
        vertical: this.vertical,
        horizontal: !this.vertical,
        round: this.round
      }]">

    <!-- Vertical -->
    <template v-if="vertical">
      <v-layout row class="node-container">
        <v-flex xs2>
          <v-layout row>
            <v-flex xs12>
              <div v-bind:class="['branch', { hidden:!hasPrev }]">&nbsp;</div>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <div class="node-object" v-on:click="onItemClick">{{ index }}</div>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <div v-bind:class="['branch', { hidden:!hasNext }]">&nbsp;</div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs10>
          <div class="node-content-panel">
            <transition name="draw-x">
              <v-container fill-height class="content-card-wrapper" v-show="isNodeOpen">
                <v-layout fill-height>
                  <v-flex xs9>
                    <v-card class="content-card">
                      {{ chapter.title }}
                    </v-card>
                  </v-flex>
                  <v-flex xs3 class="content-fringe">
                    project lists
                  </v-flex>
                </v-layout>
              </v-container>
            </transition>
          </div>
        </v-flex>
      </v-layout>
    </template>

    <!-- Horizontal -->
    <template v-else>
      <div class="node-container">
        <div class="node-object">
          <div>{{ index }}</div>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  name: 'ChapterTreeNode',

  data() {
    return {
      isNodeOpen: false,
    };
  },

  props: {
    chapter: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
      default: null,
    },
    startOpen: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    hasPrev() {
      return this.index > 1;
    },
    hasNext() {
      return true;
    },
  },

  mounted() {
    setTimeout(() => {
      this.isNodeOpen = this.startOpen;
    }, 500);
  },

  methods: {
    onItemClick() {
      this.isNodeOpen = !this.isNodeOpen;
      this.$emit('itemClick', this.chapter);
    },
    openNode() {
      this.isNodeOpen = true;
    },
    closeNode() {
      this.isNodeOpen = false;
    },
  },
};
</script>

<style scoped>

  .node-container .layout {
    height: auto;
  }

/* -----------------------------------------------------------------------------
 * Vertical
 * -------------------------------------------------------------------------- */

  .chapter-tree-node.vertical {
    height: 625px;
  }
  .chapter-tree-node.vertical .container {
    padding-bottom: 0;
  }
  .chapter-tree-node.vertical .branch {
    border-right: 2px solid #525252;
    height: 300px;
    margin-right: 11px;
  }
  .chapter-tree-node.vertical .branch.hidden {
    border-right: inherit;
    height: 300px;
    margin-right: 11px;
  }

  .chapter-tree-node.vertical .node-content-panel {
    height: 100%;
  }
  .chapter-tree-node.vertical .content-card-wrapper {
    overflow-x: hidden;
    margin: 0 auto 0 0;
  }
  .chapter-tree-node.vertical .content-card-wrapper::before {
    content: "";
    position: relative;
    top: 2px;
    left: -4px;
    margin-top: -5px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent white transparent transparent;
  }
  .chapter-tree-node.vertical .content-card {
    background-color: #ffffff;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 0;
    margin-left: -4px;
    width: 510px;
    height: 525px !important;
  }
  .chapter-tree-node.vertical .content-fringe {
    text-align: left;
  }

/* -----------------------------------------------------------------------------
 * Horizontal
 * -------------------------------------------------------------------------- */

  /* Default Node Style */
  .chapter-tree-node .node-container {
  }

  .node-object {
    font-size: 12px;
    line-height: 26px;
    text-align: center;
    background-color: #d9d9d9;
    border: 1px solid #cccccc;
    height: 28px;
    width: 60px;
    cursor: pointer;
  }

  /* Round Node Style */
  .chapter-tree-node.round .node-object {
    font-size: 10px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    background-color: #d9d9d9;
    border: 1px solid #d1d1d1;
    border-radius: 50%;
    margin: 0 0 0 auto;
    height: 25px;
    width: 25px;
    cursor: pointer;
  }

</style>
