<template>
  <v-container fluid fill-height v-bind:class="baseClasses">

    <!---------------->
    <!-- List Panel -->
    <!---------------->
    <v-navigation-drawer fixed persistent light enable-resize-watcher
        class="list-panel"
        v-bind:mobileBreakPoint="600"
        v-model="isListPanelOpen">
      <div class="list-panel-controls">
        <div class="control-set">Filters, etc</div>
      </div>
      <admin-content-list
          v-bind:items="chapterItems"
          v-bind:displayField="'title'"
          v-bind:itemStyle="'card'"
          v-on:itemClick="loadItemToEdit" />
    </v-navigation-drawer>

    <!------------------>
    <!-- Page Content -->
    <!------------------>
    <v-layout justify-center class="page-content">
      <transition name="fade-flash" mode="out-in">

        <!-- Message View (no active item) -->
        <v-flex xs12 class="message-view" key="editOff" v-if="!itemToEdit">
          <template v-if="hasChapters">
            <div class="message-select-to-activate">Select a Chapter to edit</div>
            <div class="message-or">-or-</div>
          </template>
          <div>
            <a class="message-create-draft"
               v-on:click="createDraftItem">+ Create a new Chapter</a>
          </div>
        </v-flex>

        <!-- Active Item View -->
        <v-flex xs12 sm9 md8 class="active-item-view" key="editOn" v-else>
          <admin-content-editor
              v-bind:item="itemToEdit"
              v-bind:resourceType="'user-data'"
              v-on:cancel="clearItemToEdit"
              v-on:save="saveItem"
              v-on:delete="deleteItem" />

          <div class="close-active-item"><a v-on:click="clearItemToEdit">(Close)</a></div>
        </v-flex>

      </transition>
    </v-layout>

  </v-container>
</template>

<script>
import AdminContentEditor from '../components/Admin/AdminContentEditor.vue';
import AdminContentList from '../components/Admin/AdminContentList.vue';

export default {
  name: 'ManageChaptersPage',

  components: {
    AdminContentEditor,
    AdminContentList,
  },

  data() {
    return {
      isListPanelOpen: true,
    };
  },

  computed: {
    baseClasses() {
      return ['manage-chapters-page', { 'with-list-left': this.isListPanelOpen }];
    },
    hasChapters() {
      return (this.totalChapters > 0);
    },
    chapterData() {
      return this.$store.getters.myChapters;
    },
    chapterItems() {
      return (this.chapterData) ? this.chapterData.items : null;
    },
    totalChapters() {
      return (this.$root.utils.has(this.chapterData, 'meta.total_items'))
          ? this.chapterData.meta.total_items
          : 0;
    },
    itemToEdit() {
      return this.$store.getters.itemToEdit;
    },
  },

  beforeMount() {
    this.clearItemToEdit(); // clear shared space
    this.$store.dispatch('LOAD_MY_CHAPTERS');
  },

  methods: {
    loadItemToEdit(item) {
      if (!this.itemToEdit) return this.$store.dispatch('SET_ITEM_TO_EDIT', item);

      const activeEditID = this.itemToEdit.id;
      if (item && item.id !== activeEditID) {
        // Clear first, for transition effect...
        return this.clearItemToEdit()
          .then(() => {
            setTimeout(() => {
              return this.$store.dispatch('SET_ITEM_TO_EDIT', item);
            }, 200);
          });
      }

      return false;
    },
    clearItemToEdit() {
      return this.$store.dispatch('CLEAR_ITEM_TO_EDIT');
    },
    createDraftItem() {
      return this.$store.dispatch('LOAD_DRAFT_ITEM_TO_EDIT', 'Chapter');
    },
    saveItem(item = {}) {
      // Create a new item...
      if (!item.id) {
        this.$store.dispatch('CREATE_ITEM', item)
          .then(() => {
            // Clear active edit and refresh list...
            // this.clearItemToEdit();
            this.$store.dispatch('LOAD_MY_CHAPTERS', true);
          });

      // Update an existing item...
      } else {
        this.$store.dispatch('UPDATE_ITEM', item)
          .then(() => {
            // Clear active edit and refresh list...
            // this.clearItemToEdit();
            this.$store.dispatch('LOAD_MY_CHAPTERS', true);
          });
      } // end-if (!item.id)
    },
    deleteItem(item = {}) {
      this.$store.dispatch('DELETE_ITEM', item)
        .then(() => {
          // Clear active edit and refresh list...
          this.clearItemToEdit();
          this.$store.dispatch('LOAD_MY_CHAPTERS', true);
        });
    },
  },
};
</script>

<style scoped>

</style>
