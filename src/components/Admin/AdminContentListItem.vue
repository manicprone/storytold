<template>
  <div v-bind:class="baseClasses" v-on:click="onItemClick">

    <template v-if="isDivStyle">
      <div>{{ displayLabel }}</div>
    </template>

    <template v-else>
      <a><span>{{ displayLabel }}</span></a>
    </template>

  </div>
</template>

<script>
export default {
  name: 'AdminContentListItem',

  props: {
    item: {
      type: Object,
      default: null,
    },
    displayField: {
      type: String,
      default: 'id',
    },
    itemStyle: {
      type: String,
      default: 'anchor', // options: ['anchor', 'div', 'card']
    },
  },

  computed: {
    fieldForDisplay() {
      return this.displayField || 'id';
    },
    displayLabel() {
      return (this.$root.utils.has(this.item, this.fieldForDisplay))
          ? this.item[this.fieldForDisplay]
          : this.item.id;
    },
    isDivStyle() {
      return (this.itemStyle === 'div' || this.itemStyle === 'card');
    },
    baseClasses() {
      let classes = 'content-list-item';
      if (this.isDivStyle) {
        switch(this.itemStyle) {
          case 'card': classes += ' item-card'; break;
          default: classes += ' item-div';
        }
      }
      return classes;
    },
  },

  methods: {
    onItemClick() {
      this.$emit('itemClick', this.item);
    },
  },
};
</script>

<style scoped>

  .item-card {
    cursor: pointer;
    padding: 16px 16px;
    background-color: #f2f2f2;
    border-bottom: 1px solid #e3e3e3;
  }
  .item-card:hover {
    background-color: #ffffff;
  }

</style>
