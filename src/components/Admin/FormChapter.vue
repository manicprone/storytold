<template>
  <div v-if="itemEditing">

    <v-layout row>
      <v-flex xs12>
        <v-text-field label="Title" v-model.trim="itemEditing.title" />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <v-text-field label="Subtitle" v-model.trim="itemEditing.subtitle" />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <v-text-field textarea label="The Story" v-model="itemEditing.description" />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs4>
        <label>Started:</label>
      </v-flex>
      <v-flex xs4></v-flex xs4>
      <v-flex xs4>
        <label>Finished:</label>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs4>
        <v-menu lazy offset-y full-width
            transition="scale-transition"
            v-bind:close-on-content-click="true"
            v-model="showStartedAtDatePicker">
          <v-text-field readonly
              slot="activator"
              hint="Started"
              v-model="itemEditing.started_at"
              prepend-icon="event" />
          <v-date-picker autosave v-model="itemEditing.started_at" />
        </v-menu>
      </v-flex>
      <v-flex xs4></v-flex xs4>
      <v-flex xs4>
        <v-menu lazy offset-y full-width
            transition="scale-transition"
            v-bind:close-on-content-click="true"
            v-model="showFinishedAtDatePicker">
          <v-text-field readonly
              slot="activator"
              hint="Ended"
              v-model="itemEditing.finished_at"
              prepend-icon="event" />
          <v-date-picker autosave v-model="itemEditing.finished_at" />
        </v-menu>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
export default {
  name: 'FormChapter',

  data() {
    return {
      showStartedAtDatePicker: false,
      showFinishedAtDatePicker: false,
    };
  },

  props: {
    itemEditing: {
      type: Object,
      default: null,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
</style>
