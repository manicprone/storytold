<template>
  <div v-if="itemEditing">

    <v-layout row>
      <v-flex xs8>
        <v-text-field label="Name" v-model.trim="itemEditing.name" />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs8>
        <template v-if="isNew">
          <v-text-field label="Alias" v-model.trim="itemEditing.alias" />
        </template>
        <template v-else>
          <v-text-field disabled label="Alias" v-model.trim="itemEditing.alias" />
        </template>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs8>
        <v-text-field label="City" v-model.trim="itemEditing.city" />
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs8>
        <v-text-field label="Country" v-model.trim="itemEditing.country" />
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
export default {
  name: 'FormOffice',

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
