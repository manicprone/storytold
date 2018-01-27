<template>
  <div v-if="itemEditing" class="admin-content-editor">

    <form class="editor-form">
      <component ref="activeForm"
          v-bind:is="activeFormName"
          v-bind:itemEditing="itemEditing"
          v-bind:isNew="isNew" />
    </form>

    <v-toolbar flat light class="editor-main-controls editor-controls">
      <editor-feedback v-bind:resource="resourceType" v-bind:autoCloseAfterMillis="5000" />
      <v-spacer />
      <v-btn light v-on:click="cancel">Cancel</v-btn>
      <v-btn light v-on:click="save">Save</v-btn>
    </v-toolbar>

    <div v-if="!isNew" class="editor-delete-controls editor-controls">
      <v-btn dark error class="button-delete" v-on:click="deleteForever">Delete</v-btn>
    </div>

  </div>
</template>

<script>
import EditorFeedback from './EditorFeedback.vue';
import FormChapter from './FormChapter.vue';
import FormStory from './FormStory.vue';

export default {
  name: 'AdminContentEditor',

  components: {
    EditorFeedback,
    FormChapter,
    FormStory,
  },

  data() {
    return {
      itemEditing: this.item,
      activeFormName: (this.item)
        ? this.item.model.endsWith('Tag') ? 'FormTag' : `Form${this.item.model}`
        : null,
    };
  },

  props: {
    item: {
      type: Object,
      default: null,
    },
    resourceType: {
      type: String,
      default: 'system-data',
    },
  },

  computed: {
    isNew() {
      return (this.item.id === null);
    },
  },

  methods: {
    cancel() {
      this.$emit('cancel', this.item);
    },
    save() {
      this.$emit('save', this.item);
    },
    deleteForever() {
      this.$emit('delete', this.item);
    },
  },
};
</script>

<style scoped>

  /* -------------- */
  /* Main Page Area */
  /* -------------- */

  .admin-content-editor {
    padding: 0 30px;
    max-width: 750px;
  }

  /* ----------- */
  /* Editor Form */
  /* ----------- */

  .editor-form {
    text-align: left;
  }

  /* --------------- */
  /* Editor Controls */
  /* --------------- */

  .editor-controls {
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    padding: 4px 6px;
  }
  .editor-main-controls {
    text-align: right;
    margin-top: 70px !important;
  }

  /* Delete controls */
  .editor-delete-controls {
    text-align: left;
    margin-top: 80px;
  }
  .editor-delete-controls .button-delete {
    background-color: #d7222a !important;
    border: 1px solid #c0341d !important;
    padding: 0 20px;
  }

  /* --------------- */
  /* Editor Feedback */
  /* --------------- */

  .admin-editor-feedback {
    margin: 6px 40px 0 6px;
    width: 100%;
  }

</style>
