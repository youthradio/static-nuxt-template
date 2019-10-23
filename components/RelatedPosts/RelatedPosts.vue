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
          <div class="section">
            <h3>
              <a :style="'borderBottom: 2px solid' + post.acf.secondary_color" :href="post.link">
                {{ post.title.rendered | unescape }}
              </a>
            </h3>
          </div>
          <div class="section">
            <a :href="post.link">
              <img
                class="img-fluid postImage lazyload"
                :data-src="post.episode_featured_image"
              >
            </a>
          </div>
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
  min-height: 10rem;
  object-fit: cover;
}
.flex{
  display: flex;
}
.postInner{
  margin: 1.5rem;
  h3 {
    font-weight: 800;
  }

  a{
    border-bottom: none;
  }
  a:hover{
    background-color: transparent;
  }
  @include breakpoint (medium){
  .section{
    min-height: 8rem;
    max-height: 100%;
  }
  h3{
    font-size: 1rem;
  }
  }
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
  width: 100%;
  @include breakpoint (medium) {
    margin: 0 0.5rem 0 0.5rem;
    width: calc(100% / 3);
  }
}
</style>
