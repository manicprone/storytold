<template>
  <div v-if="chapter" class="chapter-tree-node" v-on:click="onItemClick">

    <div class="chapter-node-wrapper">
      <div>{{ index }}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ChapterTreeNode',

  props: {
    chapter: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
      default: null,
    },
  },

  computed: {
  },

  methods: {
    onItemClick() {
      this.$emit('itemClick', this.chapter);
    },
  },
};
</script>

<style scoped>

  .chapter-node-wrapper {
    font-size: 12px;
    line-height: 26px;
    text-align: center;
    background-color: #d9d9d9;
    border: 1px solid #cccccc;
    height: 28px;
    width: 60px;
    cursor: pointer;
  }

</style>
