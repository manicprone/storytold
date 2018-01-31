<template>
  <main class="admin-dashboard-page">
    <v-container fluid>
      <div class="page-content-area">

        <div class="dashboard">
          (Dashboard)
        </div>

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

  .page-content-area {
    margin: 0 auto;
    max-width: 750px;
  }

  .dashboard {
    line-height: 140px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    padding: 4px;
    margin: 10px 0 40px 0;
    min-height: 140px;
  }

</style>
