<template>
  <div class="admin-content-list">

    <template v-if="hasItems">
      <admin-content-list-item v-for="item in items"
            v-bind:item="item"
            v-bind:key="'list-item-' + item.id"
            v-bind:displayField="displayField"
            v-bind:itemStyle="itemStyle"
            v-on:itemClick="onItemClick" />
    </template>

    <template v-else>
      <div class="empty-results">{{ noItemsText }}</div>
    </template>

  </div>
</template>

<script>
import AdminContentListItem from './AdminContentListItem.vue';

export default {
  name: 'AdminContentList',

  components: {
    AdminContentListItem,
  },

  props: {
    items: {
      type: Array,
      default: null,
    },
    displayField: {
      type: String,
      default: 'id',
    },
    itemStyle: {
      type: String,
      default: 'anchor',
    },
    noItemsText: {
      type: String,
      default: 'no items yet',
    },
  },

  computed: {
    hasItems() {
      return this.items && this.items.length > 0;
    },
  },

  methods: {
    onItemClick(item) {
      this.$emit('itemClick', item);
    },
  },
};
</script>

<style scoped>

  .admin-content-list {
    text-align: left;
  }

  .empty-results {
    color: #727272;
    font-style: italic;
    text-align: center;
    margin: 20% auto;
  }

</style>
