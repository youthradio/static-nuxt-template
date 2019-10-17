<template>
  <ul class="socialList">
    <li>
      <a href="https://google.com" target="_blank">
        <span class="share icon-share" />
      </a>
    </li>
    <li>
      <a href="https://google.com" target="_blank">
        <span class="share icon-facebook-inverted" />
      </a>
    </li>
    <li>
      <a href="https://google.com" target="_blank">
        <span class="share icon-twitter-inverted" />
      </a>
    </li>
    <li>
      <a href="https://google.com" target="_blank">
        <span class="share icon-email-inverted" />
      </a>
    </li>
  </ul>
</template>

<script>

export default {
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
