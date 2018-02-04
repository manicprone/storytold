<template>
  <v-container fluid fill-height v-bind:class="baseClasses">

    <!-------------->
    <!-- Page Nav -->
    <!-------------->
    <v-toolbar fixed flat light dense class="page-nav">
      <v-toolbar-title class="page-nav-heading">
        <router-link v-bind:to="{ name: 'admin-dashboard' }">
          <span>Admin</span>
        </router-link>
      </v-toolbar-title>

      <v-toolbar-items class="page-nav-items">
        <router-link v-bind:to="{ name: 'admin-users' }">
          <v-btn flat v-bind:class="generateNavItemClasses('admin-users')">
            <span>Users</span>
          </v-btn>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>

    <!------------------>
    <!-- Page Content -->
    <!------------------>
    <v-layout justify-center class="page-content">
      <transition name="fade-fast" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  name: 'AdminRootPage',

  computed: {
    baseClasses() {
      return 'admin-root-page with-nav';
    },
  },

  methods: {
    generateNavItemClasses(routeName) {
      return (this.$route.name === routeName)
          ? 'nav-item selected-nav-item'
          : 'nav-item';
    },
  },
};
</script>

<style scoped>

</style>
