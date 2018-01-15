<template>
  <div v-if="office" class="office-avatar" v-on:click="onItemClick">

    <div class="image-wrapper" v-bind:style="imageWrapperStyle">
      <div v-bind:class="avatarImageClass"
           v-bind:style="avatarImageStyle">
      </div>
    </div>

    <div v-if="showName" class="office-name">
      {{ office.name }}
    </div>

  </div>
</template>

<script>
export default {
  name: 'OfficeAvatar',

  props: {
    office: {
      type: Object,
      default: null,
    },
    size: {
      type: Number,
      default: 100,
    },
    showName: {
      type: Boolean,
      default: false,
    },
    showAlias: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    avatarURL() {
      const existingURL = (this.size <= 128) ? this.office.imageThumbURL : this.office.imageURL;
      return (existingURL) ? existingURL : '/public/default-user-avatar.svg';
    },
    imageWrapperStyle() {
      return `height: ${this.size}px; width: ${this.size}px`;
    },
    avatarImageClass() {
      return 'avatar-image';
    },
    avatarImageStyle() {
      return `background-image: url(${this.avatarURL})`;
    },
  },

  methods: {
    onItemClick() {
      this.$emit('itemClick', this.office);
    },
  },
};
</script>

<style scoped>

  .office-avatar {
    display: inline-block;
    text-align: center;
    border: 2px solid #ebebeb;
    border-radius: 6px;
    padding: 10px;
    width: 200px;
  }
  .office-avatar:hover {
    border-color: #d9d9d9;
  }

  .image-wrapper {
    display: inline-block;
    vertical-align: top;
    user-select: none;
  }

  .avatar-image {
    display: inline-block;
    height: 100%;
    width: 100%;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    border-radius: 50%;
  }

  .office-name {
    text-align: center;
    margin: 10px 0 0 0;
  }

</style>
