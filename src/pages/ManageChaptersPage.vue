<template>
  <v-layout row class="manage-chapters-page">

    <v-flex xs3>
      <v-navigation-drawer permanent light class="list-panel">
        <div class="list-panel-controls">
          <div class="control-set">Filters, etc</div>
        </div>
        <admin-content-list
            v-bind:items="chapterItems"
            v-bind:displayField="'title'"
            v-bind:itemStyle="'card'"
            v-on:itemClick="loadItemToEdit" />
      </v-navigation-drawer>
    </v-flex>

    <v-flex xs9>
      <div class="edit-panel">
        <v-container>
          <transition name="fade-flash" mode="out-in">

            <div v-if="!itemToEdit" class="message-view" key="editOff">
              <template v-if="hasChapters">
                <div class="message-select-to-edit">Select a Chapter to edit</div>
                <div class="message-or">-or-</div>
              </template>
              <div>
                <a class="message-create-draft"
                   v-on:click="createDraftItem">+ Create a new Chapter</a>
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
      </div>
    </v-flex>

  </v-layout>
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

  computed: {
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
            this.clearItemToEdit();
            this.$store.dispatch('LOAD_MY_CHAPTERS', true);
          });

      // Update an existing item...
      } else {
        this.$store.dispatch('UPDATE_ITEM', item)
          .then(() => {
            // Clear active edit and refresh list...
            this.clearItemToEdit();
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

  /* ---------- */
  /* List Panel */
  /* ---------- */

  .list-panel {
    /*margin-top: 49px;*/
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
    /*margin: 140px 0 0 0;*/
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
