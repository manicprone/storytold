<template>
  <div v-if="chapter" v-bind:class="baseClasses" v-on:click="onItemClick">

    <template v-if="round">
      <div class="node-wrapper">
        <div class="node-object"></div>
        <div class="node-details" v-if="isNodeOpen">
          {{ chapter.title }}
        </div>
      </div>
    </template>

    <template v-else>
      <div class="node-wrapper">
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
      isNodeOpen: true,
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
    baseClasses() {
      return ['chapter-tree-node', { vertical: this.vertical, horizontal: !this.vertical, round: this.round }];
    },
  },

  methods: {
    onItemClick() {
      this.$emit('itemClick', this.chapter);
    },
  },
};
</script>

<style scoped>

  /* Default Node Style */
  .node-wrapper {
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
  .node-wrapper {
  }

  .chapter-tree-node.round .node-object {
    font-size: 10px;
    line-height: 10px;
    text-align: center;
    background-color: #d9d9d9;
    border: 1px solid #d1d1d1;
    border-radius: 10px;
    height: 20px;
    width: 20px;
    cursor: pointer;
  }

</style>
