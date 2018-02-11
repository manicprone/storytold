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

    <v-layout row wrap v-if="showImageOption" class="image-section">
      <v-flex xs3 class="pr-4">
        <div class="image-wrapper">
          <v-card-media contain v-if="itemEditing.image_url" class="active-image"
              v-bind:src="itemEditing.image_url" />
        </div>
      </v-flex>
      <v-flex xs9 style="align-self:flex-end;">
        <v-text-field class="image-url" label="Image URL" v-model.trim="itemEditing.image_url" />
      </v-flex>
    </v-layout>

    <v-divider />

    <v-layout row>
      <v-flex xs12>
        <div class="section-title">{{ $root.translate('page.manage_chapters.section_timeline_title') }}</div>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs5>
        <label>Began:</label>

        <v-menu lazy offset-y full-width
            min-width="290px"
            max-width="290px"
            transition="scale-transition"
            v-bind:close-on-content-click="false"
            v-model="showStartedAtDatePicker">
          <v-text-field readonly
              slot="activator"
              v-model="itemEditing.started_at"
              prepend-icon="event" />
          <v-date-picker no-title actions scrollable
              class="started-at-date-picker"
              v-model="itemEditing.started_at">
            <template slot-scope="{ save, cancel }">
              <v-card-actions class="date-picker-controls">
                <v-spacer />
                <v-btn flat color="primary" v-on:click="cancel">Cancel</v-btn>
                <v-btn flat color="primary" v-on:click="save">OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
      </v-flex>
      <v-spacer />
      <v-flex xs5>
        <label>Ended:</label>

        <v-menu lazy offset-y full-width
            min-width="290px"
            max-width="290px"
            transition="scale-transition"
            v-bind:close-on-content-click="false"
            v-model="showFinishedAtDatePicker">
          <v-text-field readonly
              slot="activator"
              v-model="itemEditing.finished_at"
              prepend-icon="event" />
          <v-date-picker no-title actions scrollable
              class="finished-at-date-picker"
              v-model="itemEditing.finished_at">
            <template slot-scope="{ save, cancel }">
              <v-card-actions class="date-picker-controls">
                <v-spacer />
                <v-btn flat color="primary" v-on:click="cancel">Cancel</v-btn>
                <v-btn flat color="primary" v-on:click="save">OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>

    <v-divider />

    <v-layout row>
      <v-flex xs12>
        <div class="section-title">{{ $root.translate('page.manage_chapters.section_monuments_title') }}</div>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
export default {
  name: 'FormChapter',

  data() {
    return {
      showImageOption: true,
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

  .image-section .image-wrapper {
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 6px;
    /*max-width: 140px;*/
    height: 87px;
  }
  .image-section .active-image {
    height: 85px !important;
  }

</style>
