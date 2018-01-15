<template>
  <div v-if="itemEditing">

    <v-layout row>
      <v-flex xs8>
        <v-text-field label="Name" v-model.trim="itemEditing.name" />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs8>
        <template>
          <v-text-field label="Label" v-model.trim="itemEditing.label" />
        </template>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
export default {
  name: 'FormChapter',

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
