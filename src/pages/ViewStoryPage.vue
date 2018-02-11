<template>
  <v-container fluid fill-height
      v-bind:class="['view-story-page', {
        'with-list-left': isFullViewOpen,
        'with-list-right': isBioViewOpen,
      }]">

    <template v-if="!storyToView">
      <v-layout align-center justify-center>
        <div v-if="errorMessage">{{ errorMessage }}</div>
      </v-layout>
    </template>

    <template v-else>
      <!--------------------->
      <!-- Full View Panel -->
      <!--------------------->
      <!-- <v-navigation-drawer fixed persistent light enable-resize-watcher
          class="full-view-panel"
          v-bind:mobileBreakPoint="600"
          v-model="isFullViewOpen">

        <div>The Big Picture</div>
      </v-navigation-drawer> -->

      <!------------------------------>
      <!-- Page Content (main view) -->
      <!------------------------------>
      <v-layout justify-center class="page-content">
        <v-flex xs12>
          <div>{{ storyToView.title }}</div>
          <div>
            <router-link v-bind:to="{ name: 'manage-story', params: { activeStoryID: storyToView.id } }">
              <span><< Back</span>
            </router-link>
          </div>

          <component v-bind:is="activeViewComponent"
              v-bind:story="storyToView"
              v-bind:startAt="0"
              v-bind:vertical="true" />
        </v-flex>
      </v-layout>

      <!-------------------->
      <!-- Bio View Panel -->
      <!-------------------->
      <!-- <v-navigation-drawer fixed right persistent light enable-resize-watcher
          class="bio-view-panel"
          v-bind:mobileBreakPoint="960"
          v-model="isBioViewOpen">

        <div>Bio View</div>
      </v-navigation-drawer> -->
    </template>

  </v-container>
</template>

<script>
import StoryScroller from '../components/Stories/StoryScroller.vue';
import StoryStepper from '../components/Stories/StoryStepper.vue';

export default {
  name: 'ViewStoryPage',

  components: {
    StoryScroller,
    StoryStepper,
  },

  data() {
    return {
      // activeViewComponent: 'StoryStepper',
      activeViewComponent: 'StoryScroller',
      isFullViewOpen: false,
      isBioViewOpen: false,
      errorMessage: null,
    };
  },

  props: ['activeStoryID'],

  computed: {
    storyToView() {
      return this.$store.getters.storyToView;
    },
  },

  // TODO: Add prefetch call !!!

  beforeMount() {
    this.$store.dispatch('CLEAR_STORY_TO_VIEW'); // clear view space

    if (this.activeStoryID) {
      this.$store.dispatch('LOAD_STORY_TO_VIEW', { story_id: this.activeStoryID })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    }
  },

  methods: {
  },
};
</script>

<style scoped>

  /* Full View Panel */
  .full-view-panel {
    width: 240px !important;
  }

  /* Bio View Panel */
  .bio-view-panel {
  }

  /* Page Content */
  .page-content {
    padding-top: 0px;
    padding-left: 12px;
    padding-right: 12px;
  }
  .page.with-nav .page-content {
    padding-top: 79px;
  }
  .page.with-list-left .page-content {
    padding-left: 240px;
  }
  .page.with-list-left-mini .page-content {
    padding-left: 32px;
  }
  .page.with-list-right .page-content {
    padding-right: 300px;
  }
  .page.with-list-right-mini .page-content {
    padding-right: 32px;
  }

</style>
