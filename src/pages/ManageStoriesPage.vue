<template>
  <div class="manage-stories-page">

    <v-navigation-drawer permanent clipped light class="list-panel">
      <div class="list-panel-controls">
        <div class="control-set">Filters, etc</div>
      </div>
      <admin-content-list
          v-bind:items="storyItems"
          v-bind:displayField="'title'"
          v-bind:itemStyle="'card'"
          v-on:itemClick="loadItemToEdit" />
    </v-navigation-drawer>

    <main class="edit-panel">
      <v-container fluid>
        <transition name="fade-flash" mode="out-in">

          <div v-if="!itemToEdit" class="message-view" key="editOff">
            <template v-if="hasStories">
              <div class="message-select-to-edit">Select a Story to edit</div>
              <div class="message-or">-or-</div>
            </template>
            <div>
              <a class="message-create-draft"
                 v-on:click="createDraftItem">+ Start a new Story</a>
            </div>
          </div>

          <div v-else class="active-edit-view" key="editOn">
            <admin-content-editor
                v-bind:item="itemToEdit"
                v-bind:resourceType="'user-data'"
                v-on:cancel="clearItemToEdit"
                v-on:save="saveItem"
                v-on:delete="deleteItem" />

            <div class="close-active-edit"><a v-on:click="clearItemToEdit">(Close)</a></div>
          </div>

        </transition>
      </v-container>
    </main>

  </div>
</template>

<script>
import AdminContentEditor from '../components/Admin/AdminContentEditor.vue';
import AdminContentList from '../components/Admin/AdminContentList.vue';

export default {
  name: 'ManageStoriesPage',

  components: {
    AdminContentEditor,
    AdminContentList,
  },

  computed: {
    hasStories() {
      return (this.totalStories > 0);
    },
    storyData() {
      return this.$store.getters.myStories;
    },
    storyItems() {
      return (this.storyData) ? this.storyData.items : null;
    },
    totalStories() {
      return (this.$root.utils.has(this.storyData, 'meta.total_items'))
          ? this.storyData.meta.total_items
          : 0;
    },
    itemToEdit() {
      return this.$store.getters.itemToEdit;
    },
  },

  beforeMount() {
    this.clearItemToEdit(); // clear shared space
    this.$store.dispatch('LOAD_MY_STORIES');
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
      return this.$store.dispatch('LOAD_DRAFT_ITEM_TO_EDIT', 'Story');
    },
    saveItem(item = {}) {
      // Create a new item...
      if (!item.id) {
        this.$store.dispatch('CREATE_ITEM', item)
          .then(() => {
            // Clear active edit and refresh list...
            this.clearItemToEdit();
            this.$store.dispatch('LOAD_MY_STORIES', true);
          });

      // Update an existing item...
      } else {
        this.$store.dispatch('UPDATE_ITEM', item)
          .then(() => {
            // Clear active edit and refresh list...
            this.clearItemToEdit();
            this.$store.dispatch('LOAD_MY_STORIES', true);
          });
      } // end-if (!item.id)
    },
    deleteItem(item = {}) {
      this.$store.dispatch('DELETE_ITEM', item)
        .then(() => {
          // Clear active edit and refresh list...
          this.clearItemToEdit();
          this.$store.dispatch('LOAD_MY_STORIES', true);
        });
    },
  },
};
</script>

<style scoped>

  /* ---------- */
  /* List Panel */
  /* ---------- */

  .list-panel {
    margin-top: 49px;
  }
  .list-panel-controls {
    background-color: #ebebeb;
    border-bottom: 1px solid #d9d9d9;
    height: 50px;
  }
  .list-panel-controls .control-set {
    line-height: 50px;
  }

  /* ---------- */
  /* Edit Panel */
  /* ---------- */

  .edit-panel {
    margin: 140px 0 0 0;
  }
  .close-active-edit {
    position: fixed;
    right: 20px;
    top: 65px;
    z-index: 200;
  }

  /* Message View (no active edit) */
  .message-view .message-select-to-edit {
    margin-bottom: 10px;
  }
  .message-view .message-or {
    margin-bottom: 10px;
  }
  .message-view .message-create-draft {
    margin-bottom: 0;
  }

  /* Active Edit View (project is editing) */
  .active-edit-view {}

</style>
