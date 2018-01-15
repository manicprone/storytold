<template>
  <v-btn flat class="language-picker" v-on:click="switchLanguage">
    {{ altLanguage }}
  </v-btn>
</template>

<script>
export default {
  name: 'LanguagePicker',

  computed: {
    activeLocale() {
      return this.$store.getters.activeLocale;
    },
    altLanguage() {
      return (this.activeLocale === 'zh-CN') ? 'English' : '中文';
    },
  },

  methods: {
    switchLanguage() {
      const targetLocale = (this.activeLocale === 'zh-CN') ? 'en-GB' : 'zh-CN';
      this.$store.dispatch('SET_ACTIVE_LOCALE', targetLocale);
    },
  },
};
</script>

<style scoped>
</style>
