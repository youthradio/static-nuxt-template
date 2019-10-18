<template>
  <div>
    <RelatedPosts
      class="row"
      :posts-data="postsData"
    />
  </div>
</template>

<script>
import POSTCONFIG from '../../post.config'
import RelatedPosts from './RelatedPosts.vue'

export default {
  components: {
    RelatedPosts
  },
  data () {
    return {
      postsData: null
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    this.loadRelatedPosts()
  },
  mounted () {
  },
  methods: {
    async loadRelatedPosts () {
      const slug = POSTCONFIG.wpPostSlug
      const post = await fetch(`https://yr.media/wp-json/wp/v2/posts?slug=${slug}`)
        .then(d => d.json())
      const relatedIds = post[0].acf.related_posts.join(',')
      const relatedData = await fetch(`https://yr.media/wp-json/wp/v2/posts?include=${relatedIds}`)
        .then(d => d.json())

      // const slug = await ctx.params.slug
      this.postsData = relatedData
    }
  }
}
</script>
