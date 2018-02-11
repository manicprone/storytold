<template>
  <v-container fluid class="admin-editor" v-if="itemEditing">

    <!-- Active Editor Form -->
    <v-layout row>
      <v-flex xs12>
        <form class="editor-form">
          <component ref="activeForm"
              v-bind:is="activeFormName"
              v-bind:itemEditing="itemEditing"
              v-bind:isNew="isNew" />
        </form>
      </v-flex>
    </v-layout>

    <!-- Cancel, Save Controls -->
    <v-layout row>
      <v-flex xs12>
        <v-toolbar flat light class="editor-main-controls editor-controls">
          <editor-feedback v-bind:resource="resourceType" v-bind:autoCloseAfterMillis="5000" />
          <v-spacer />
          <v-btn light v-on:click="cancel">Cancel</v-btn>
          <v-btn light v-on:click="save">Save</v-btn>
        </v-toolbar>
      </v-flex>
    </v-layout>

    <!-- Delete Controls -->
    <v-layout row>
      <v-flex xs12>
        <div v-if="!isNew" class="editor-delete-controls editor-controls">
          <v-btn dark error class="button-delete" v-on:click="deleteForever">Delete</v-btn>
        </div>
      </v-flex>
    </v-layout>

  </v-container>
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

/* -----------------------------------------------------------------------------
 * Editor Form
 * -------------------------------------------------------------------------- */

  .editor-form {
    text-align: left;
  }

/* -----------------------------------------------------------------------------
 * Editor Controls
 * -------------------------------------------------------------------------- */

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

/* -----------------------------------------------------------------------------
 * Editor Feedback
 * -------------------------------------------------------------------------- */

  .admin-editor-feedback {
    margin: 6px 40px 0 6px;
    width: 100%;
  }

</style>
