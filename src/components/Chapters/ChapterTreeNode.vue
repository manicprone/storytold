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
    background-color: #d9d9d9;
    border: 1px solid #cccccc;
    height: 35px;
    width: 65px;
    cursor: pointer;
  }

</style>
