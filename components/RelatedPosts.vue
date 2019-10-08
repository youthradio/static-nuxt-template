<template>
  <footer>
    <h2>RELATED POSTS </h2>
    <div class="flex postContainer">
      <div
        v-for="post in postsData"
        :key="post.id"
        class="postElement"
        :style="{ borderColor: post.acf.secondary_color }"
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
  },
  computed: {

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

.postContainer{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.postElement{
  margin-bottom: 15px;
  border-style: solid;
  border-width: 7px;
}
</style>
