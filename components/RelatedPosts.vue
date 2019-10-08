<template>
  <footer>
    <h2>RELATED POSTS </h2>
    <div class="flex">
      <div
        v-for="post in postsData"
        :key="post.id"
      >
        <img
          class="img-fluid"
          :src="post.episode_featured_image"
        >
        <h3>
          {{ post.title.rendered | unescape }}
        </h3>
      </div>
      >
    </div>
    </div>
  </footer>
</template>

<script>

// import POSTCONFIG from '../post.config'

export default {
  filters: {
    unescape (value) {
      if (!value) { return '' }
      if (process.client) {
        const d = document.createElement('div')
        d.innerHTML = value

        return d.innerHTML
      } else {
        return ''
      }
    }
  },
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
