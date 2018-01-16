<template>
  <div v-if="itemEditing">

    <v-layout row>
      <v-flex xs8>
        <v-text-field label="Title" v-model.trim="itemEditing.title" />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs8>
        <v-text-field label="Slug" v-model.trim="itemEditing.slug" />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs8>
        <v-text-field label="Subtitle" v-model.trim="itemEditing.subtitle" />
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
export default {
  name: 'FormStory',

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
