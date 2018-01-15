<template>
  <main class="admin-dashboard-page">
    <v-container fluid>

      <div class="dashboard">
        (Dashboard)
      </div>

    </v-container>
  </main>
</template>

<script>
export default {
  name: 'AdminDashboardPage',

  computed: {
  },
};
</script>

<style scoped>

  .dashboard {
    line-height: 140px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    padding: 4px;
    margin: 30px auto 30px auto;
    min-height: 140px;
    min-width: 320px;
    max-width: 750px;
  }

</style>
