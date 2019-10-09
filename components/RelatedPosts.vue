<template>
  <footer class="relatedPostContainer">
    <h2>RELATED POSTS </h2>
    <div class="flex postContainer">
      <div
        v-for="post in postsData"
        :key="post.id"
        class="postElement"
        :style="{ borderColor: post.acf.secondary_color }"
      >
        <div class="postInner">
          <h3>
            {{ post.title.rendered | unescape }}
          </h3>
          <img
            class="img-fluid postImage"
            :src="post.episode_featured_image"
          >
        </div>
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
  },
  computed: {

  }

}
</script>

<style lang="scss" scoped>
@import '~@/css/vars';
@import '~@/css/mixins';

.img-fluid{
  width: 100%;
  max-width: 100%;
  height: auto;
}
.flex{
  display: flex;
}
.postInner{
  margin: 1.5rem;
}
.relatedPostContainer{
  max-width: 90%;
  margin: 0 auto;
}
.postContainer{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @include breakpoint (medium) {
    flex-wrap: nowrap;
  }
}
.postElement{
  flex-grow: 1;
  margin-bottom: 15px;
  border-style: solid;
  border-width: 7px;
  @include breakpoint (medium) {
    margin: 0 0.5rem 0 0.5rem;
  }
}
</style>
