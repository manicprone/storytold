<template>
  <main class="admin-root-page with-nav">

    <v-toolbar fixed flat light dense class="page-nav">
      <v-toolbar-title class="page-nav-heading">
        <router-link v-bind:to="{ name: 'admin-dashboard' }">
          <span>Admin</span>
        </router-link>
      </v-toolbar-title>

      <v-toolbar-items>
        <router-link v-bind:to="{ name: 'admin-users' }">
          <v-btn flat v-bind:class="generateNavItemClasses('admin-users')">
            <span>Users</span>
          </v-btn>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>

    <transition name="fade-fast" mode="out-in">
      <router-view class="sub-page"></router-view>
    </transition>

  </main>
</template>

<script>
export default {
  name: 'AdminRootPage',

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
