<template>
  <transition name="modal">

    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-body">
            <template v-if="hasUsers" v-for="user in users">
              <div v-bind:class="renderUserClass(user)" v-on:click="handleSelection(user, $event)">
                {{ renderUser(user) }}
              </div>
            </template>

            <template v-if="!hasUsers">
              <div class="no-users">{{ textForNoUsers }}</div>
            </template>
          </div>

          <div class="modal-footer">
            <button class="modal-cancel-button" v-on:click.prevent="$emit('close')">
              {{ textForCancel }}
            </button>

            <template v-if="hasMoreUsers">
              <button class="modal-load-more-button" v-on:click.prevent="loadNextPageOfUsers">
                {{ textForLoadMore }}
              </button>
            </template>

            <template v-if="allowMultiSelect">
              <button class="modal-submit-button" v-on:click.prevent="submitMultiSelection">
                {{ textForSubmit }}
              </button>
            </template>
          </div>

        </div>
      </div>
    </div>

  </transition>
</template>

<script>
export default {
  name: 'UserSelectorModal',

  data() {
    return {
      multiSelectedUsers: {},
    };
  },

  props: {
    selectedUsers: {
      type: Array,
      default: null,
    },
    displayField: {
      type: String,
      default: 'name',
    },
    allowMultiSelect: {
      type: Boolean,
      default: false,
    },
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
    fieldForDisplay() {
      return this.displayField || 'id';
    },
    hasSelectedUsers() {
      return (this.selectedUsers && this.selectedUsers.length > 0);
    },
    selectedUserIDs() {
      return (this.hasSelectedUsers) ? this.selectedUsers.map((user) => user.id) : null;
    },
    textForCancel() {
      return 'Cancel';
    },
    textForSubmit() {
      return 'Select';
    },
    textForLoadMore() {
      return 'More...';
    },
    textForNoUsers() {
      return 'Tumbleweeds';
    },
  },

  beforeMount() {
    this.$store.dispatch('LOAD_USERS');
  },

  methods: {
    // For multi-select mode, this method handles both the CSS style and the selection pre-loading...
    renderUserClass(user) {
      const userID = user.id;

      if (this.allowMultiSelect && this.hasSelectedUsers && this.$root.utils.includes(this.selectedUserIDs, userID)) {
        this.multiSelectedUsers[userID] = user;
        return 'selected-item';
      }
      return 'item';
    },
    renderUser(user) {
      return (this.$root.utils.has(user, this.fieldForDisplay))
          ? user[this.fieldForDisplay]
          : user.id;
    },
    handleSelection(user, event) {
      const userID = user.id;

      // Mult-select handling...
      if (this.allowMultiSelect) {
        const isSelected = this.$root.utils.has(this.multiSelectedUsers, userID);
        if (isSelected) {
          delete this.multiSelectedUsers[userID];
          event.target.className = 'item';
        } else {
          this.multiSelectedUsers[userID] = user;
          event.target.className = 'selected-item';
        }

      // Single select handling...
      } else {
        this.submitSingleSelection(user);
      }
    },
    submitMultiSelection() {
      const selectedUsers = [];
      Object.keys(this.multiSelectedUsers).forEach((itemKey) => {
        selectedUsers.push(this.multiSelectedUsers[itemKey]);
      });
      this.$emit('update', selectedUsers);
    },
    submitSingleSelection(user) {
      this.$emit('update', user);
    },
    loadNextPageOfUsers() {
      return this.$store.dispatch('LOAD_USERS_NEXT');
    },
  },
};
</script>

<style scoped>

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 20px 30px 20px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  /* Modal Body */
  .modal-body {
    margin: 0 0 20px 0;
    text-align: left;
  }

  /* Modal Footer */
  .modal-footer button {
    display: inline-block;
    margin-right: 13px;
  }
  .modal-footer .modal-submit-button {
    margin-right: 0;
  }

  /* Selector Items */
  .item {
    color: #676767;
    cursor: pointer;
    margin-bottom: 4px;
    padding: 4px 2px;
  }
  .item:hover {
    color: #111111;
  }
  .selected-item {
    color: #111111;
    cursor: pointer;
    margin-bottom: 4px;
    padding: 4px 2px;
    background-color: #dedede;
  }
  .no-users {
    font-style: italic;
    text-align: center;
    color: #aaaaaa;
  }

  /* Transition Effects */
  .modal-enter {
   opacity: 0;
  }
  .modal-leave-active {
   opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

</style>
