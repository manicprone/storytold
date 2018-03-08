<template>
  <v-card v-if="chapter" class="chapter-card">

    <!-- Title, Subtitle, Main Image -->
    <v-container fluid grid-list-lg v-bind:class="['lead-container', { 'with-image': chapter.image_url }]">
      <v-layout row>
        <v-flex xs3 v-if="chapter.image_url">
          <v-card-media contain class="main-image" v-bind:src="chapter.image_url" />
        </v-flex>
        <v-flex v-bind:class="[chapter.image_url ? 'xs9' : 'xs12']">
          <div class="chapter-title">{{ chapter.title }}</div>
          <div class="chapter-subtitle" v-if="chapter.subtitle">{{ chapter.subtitle }}</div>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Tags, Descriptions -->
    <v-container fluid grid-list-lg class="content-container">
      <v-layout row>
        <v-flex xs5 v-if="showTags">
          <div>
            Tags...
          </div>
        </v-flex>
        <v-flex v-bind:class="[showTags ? 'xs7' : 'xs12']">
          <div class="chapter-body">
            {{ chapter.description }}
          </div>
        </v-flex>
      </v-layout>
    </v-container>

  </v-card>
</template>

<script>
export default {
  name: 'ChapterCard',

  data() {
    return {
      isCardExpanded: false,
      showTags: false,
    };
  },

  props: {
    chapter: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
      default: null,
    },
    startExpanded: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
  },

  methods: {
    expandCard() {
      this.isNodeOpen = true;
    },
    collapseCard() {
      this.isNodeOpen = false;
    },
  },
};
</script>

<style scoped>

  .chapter-card {
    border-radius: 6px;
  }

  /* Lead Container */
  .chapter-card .lead-container {
    padding-left: 24px;
    padding-top: 20px;
    padding-right: 24px
  }
  .chapter-card .lead-container .main-image {
    border: 1px solid rgba(0,0,0,.1);
    border-radius: 6px;
    height: 95px !important;
  }
  .chapter-card .lead-container .chapter-title {
    font-size: 24px;
    font-weight: 500;
    line-height: 26px;
    text-align: left;
    margin-top: 4px;
  }
  .chapter-card .lead-container.with-image .chapter-title {
    margin-top: 8px;
  }
  .chapter-card .lead-container .chapter-subtitle {
    font-size: 17px;
    font-weight: 400;
    font-style: italic;
    line-height: 22px;
    text-align: left;
    margin-top: 8px;
  }

  /* Content Container */
  .chapter-card .content-container {
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 20px;
  }
  

</style>
