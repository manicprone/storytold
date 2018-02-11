<template>
  <div v-if="hasChapters" class="story-scroller">
    <div class="story-scroller-container">

      <!-- Story Lead -->
      <transition name="fade" mode="out-in">
        <div class="story-lead" v-show="isLeadOpen">
          <div class="story-info">
            <div class="story-title">{{ story.title }}</div>
            <div class="story-subtitle" v-if="story.subtitle">{{ story.subtitle }}</div>
            <div class="story-description" v-if="story.description">{{ story.description }}</div>
          </div>
        </div>
      </transition>

      <!-- Chapters -->
      <template v-for="(chapter, index) in chapters">
        <chapter-card
            v-bind:chapter="chapter"
            v-bind:index="index + 1"
            v-bind:key="'card-' + chapter.id" />
      </template>

    </div>
  </div>
</template>

<script>
import ChapterCard from '../Chapters/ChapterCard.vue';

export default {
  name: 'StoryScroller',

  components: {
    ChapterCard,
  },

  data() {
    return {
      activeIndex: 0,
      isLeadOpen: false,
    };
  },

  props: {
    story: {
      type: Object,
      default: null,
    },
    startAt: {
      type: Number,
      default: 0,
    },
    showLead: {
      type: Boolean,
      default: true,
    },
    openStyle: {
      type: String,
      default: 'open-close', // 'open-close', 'open', 'always-open'
    },
  },

  computed: {
    chapters() {
      return (this.story) ? this.story.chapters : null;
    },
    totalChapters() {
      return (this.chapters) ? this.chapters.length : 0;
    },
    hasChapters() {
      return (this.totalChapters > 0);
    },
    alwaysOpenNode() {
      return this.openStyle === 'always-open';
    },
  },
};
</script>

<style scoped>

  .story-scroller-container {
    background-color: rgba(77, 129, 175, 0.4);
    padding: 10px 10px;
  }

  /* Story Lead */
  .story-scroller .story-lead {}
  .story-scroller .story-lead .story-info {
    background-color: #d9d9d9;
    border-radius: 4px;
    padding: 20px 30px;
    margin: 0 auto;
    height: 300px;
    max-width: 600px;
    overflow-x: hidden;
  }
  .story-scroller .story-info .story-title {
    font-size: 22px;
    font-weight: 400;
  }
  .story-scroller .story-info .story-subtitle {
    font-size: 18px;
    font-weight: 400;
    font-style: italic;
    margin-top: 15px;
  }
  .story-scroller .story-info .story-description {
    font-size: 16px;
    margin-top: 25px;
    max-height: 180px;
    overflow-y: scroll;
  }

  /* Chapters */
  .story-scroller .chapter-card {
    margin: 0 auto 50px auto;
    max-width: 750px;
  }

</style>
