<template>
  <main class="admin-users-page">

    <template v-if="!hasUsers">
      <div class="loading-users">Loading users...</div>
    </template>

    <template v-else>
      <v-toolbar flat dense class="main-controls">
        <v-spacer />
        <v-text-field
          class="search-input"
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search" />
      </v-toolbar>

      <v-data-table class="table-view elevation-1"
          select-all
          v-bind:rows-per-page-items="[10, 25, 50, 100]"
          v-bind:headers="headers"
          v-bind:items="users"
          v-bind:search="search"
          v-model="selected">
        <template slot="items" slot-scope="props">
          <td>
            <v-checkbox light primary hide-details v-model="props.selected" />
          </td>
          <td class="text-xs-left" nowrap>
            <user-avatar v-bind:user="props.item" v-bind:showDisplayName="true" />
          </td>
          <td class="text-xs-left">{{ props.item.username }}</td>
          <td class="text-xs-left">{{ props.item.roles.join(',') }}</td>
          <td class="text-xs-left">{{ props.item.preferred_locale }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
        </template>
      </v-data-table>
    </template>

  </main>
</template>

<script>
import UserAvatar from '../components/Users/UserAvatar.vue';

export default {
  name: 'AdminUsersPage',

  components: {
    UserAvatar,
  },

  data() {
    return {
      headers: [
        { text: 'User', align: 'left', sortable: false },
        { text: 'Username', align: 'left', value: 'username' },
        { text: 'Roles', align: 'left', value: 'roles' },
        { text: 'Locale', align: 'left', value: 'preferred_locale' },
        { text: 'Email', align: 'left', value: 'email' },
      ],
      selected: [],
      search: '',
    };
  },

  computed: {
    userData() {
      return this.$store.getters.users;
    },
    users() {
      return (this.userData) ? this.userData.items : null;
    },
    hasUsers() {
      return (this.users && this.users.length > 0);
    },
    hasMoreUsers() {
      return (this.userData && this.userData.meta.next);
    },
  },

  beforeMount() {
    this.$store.dispatch('LOAD_ALL_USERS');
  },

  methods: {
  },
};
</script>

<style scoped>

  .admin-users-page {
    margin-right: 30px;
    margin-left: 30px;
  }

  .loading-users {
    margin-top: 50px;
  }

  .main-controls {
    background-color: inherit;
    margin: 20px auto 40px auto;
  }
  .main-controls .search-input {
    max-width: 300px;
  }

  .table-view .user-avatar {
    display: inline-block;
  }

</style>
