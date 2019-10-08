<template>
  <div class="flex">
    <div
      v-for="post in postsData"
      :key="post.id"
    >
      <img
        class="img-fluid"
        :src="post.episode_featured_image"
      >
      // eslint-disable-next-line vue/no-v-html
      <h3 v-html="post.title.rendered" />
    </div>
    >
  </div>
  </div>
</template>

<script>

// import POSTCONFIG from '../post.config'

export default {
  props: {
    postsData: {
      type: Array,
      default: null
    }
  }

}
</script>

<style lang="scss" scoped>
@import '~@/css/vars';

.img-fluid{
  width: 100%;
  max-width: 100%;
  height: auto;
}
.flex{
  display: flex;
}
</style>
