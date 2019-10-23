<template>
  <ul class="socialList">
    <li>
      <span class="icon-share" />
    </li>
    <li>
      <a class="icon" @click="facebookThis">
        <span class="share icon-facebook-inverted" />
      </a>
    </li>
    <li>
      <a class="icon" @click="tweetMessage">
        <span class="share icon-twitter-inverted" />
      </a>
    </li><li>
      <a class="icon" @click="emailThis">
        <span class="share icon-email-inverted" />
      </a>
    </li>
  </ul>
</template>

<script>
import POSTCONFIG from '../../post.config'

export default {
  computed: {},
  methods: {
    tweetMessage () {
      const url = window.location.href
      const tweet = POSTCONFIG.title + ` :${url}`
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`
      window.open(tweetUrl, 'pop', 'width=600, height=400, scrollbars=no')
    },
    facebookThis () {
      const url = window.location.href
      const title = POSTCONFIG.title
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`
      window.open(facebookUrl, '_blank')
    },
    emailThis () {
      const url = window.location.href
      const subject = POSTCONFIG.title
      const body = POSTCONFIG.description + `, ${url}`
      const emailURL = `mailto:info@example.com?&subject=${subject}&body=${body}`
      window.open(emailURL)
    }
  }
}
</script>

<style scoped lang="scss" >
@import '~@/css/vars';
@import '~@/css/mixins';

.dark {
    color: $black;
}
.green {
    color: $green;
}
.share{
  cursor: pointer;
}
.icon{
  border-bottom: none;
}
.icon:hover{
  background-color: transparent;
}
.socialList {
    display: flex;
    list-style-type: none;
    width: 100%;
    justify-content: space-around;
    padding: 0;

    @include breakpoint (medium){
        max-width: 10rem;
        margin: 0 auto;
    }

    li {
        display: inline;
    }
}
</style>
