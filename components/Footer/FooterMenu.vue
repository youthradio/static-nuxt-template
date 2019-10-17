<template>
  <div class="top-block">
    <div class="item logo-container">
      <a href="https://yr.media"><FullLogo class="logo" /></a>
    </div>
    <div class="item menu-container">
      <ul class="pages-menu">
        <li class="menu-item">
          <a href="https://yr.media/join-us/">Join Us</a>
        </li>
        <li class="menu-item">
          <a href="https://yr.media/about-yr/">About YR Media</a>
        </li>
        <li class="menu-item">
          <a href="https://yr.media/donate/">Support Us</a>
        </li>
        <li class="menu-item">
          <a href="https://yr.media/career-opportunities/">Careers at YR</a>
        </li>
        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-43302">
          <a href="https://yr.media/contact/">Contact Us</a>
        </li>
        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-49761">
          <a href="https://yr.media/privacy-policy/">Privacy Policy</a>
        </li>
      </ul>
    </div>
    <div class="item social-container">
      <ul class="social-menu">
        <li><a href="https://www.youtube.com/user/youthradio" target="_blank"><span class="icon-youtube" /></a></li>
        <li><a href="https://www.facebook.com/yrmediapage" target="_blank"><span class="icon-facebook" /></a></li>
        <li><a href="https://twitter.com/itsYRmedia" target="_blank"><span class="icon-twitter" /></a></li>
        <li><a href="https://www.instagram.com/yr.media" target="_blank"><span class="icon-instagram" /></a></li>
      </ul><p>YR Media © 2019</p>
    </div>
  </div>
</template>

<script>
import FullLogo from './FullLogo'

export default {
  components: {
    FullLogo
  }
}
</script>

<style scoped lang="scss">
@import '~@/css/mixins';
@import "~@/css/vars";

ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
}
a {
    border-bottom: 0px;
}

footer {
    padding-top: 1rem;
}

.top-block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 3rem 2rem 3rem 2rem;
    background-color: $black;
    @include breakpoint (medium){
        padding: 2rem 4rem 2rem 4rem;
        flex-direction: row;
    }
    .item {
        padding: 1rem 1rem 1rem 1rem;
        @include breakpoint (medium){
            padding: 0rem 0.5rem 0rem 0.5rem;
        }
    }
}
.logo{
    display: none;
    width: 0;
    margin-right: 0;
    transform: translateY(0) scale(0);
    @include breakpoint (small){
        transform: translateY(0.5rem) scale(1.65);
        display: block;
        width: 40px;
        margin-right: 2rem;
    }
}
.menu-container{
    text-transform: uppercase;
      font: 900 22px/1.8 "Roboto Mono", sans-serif;
      letter-spacing: 2px;
      text-transform: uppercase;
        a {
        color: $green;

        }
        a:hover {
            color: $white;
            background-color: inherit;
        }
        ul {
            column-count: 1;
              @include breakpoint (large){
                column-count: 2;
              }
            column-gap: 40px;
        }
        li {
          padding: 0.2rem 0 0.2rem 0;
        }
}
.social-container{

        a {
        color: $grey;
        }
        p {
        font-size: 70%;
        color: $grey;
        }
        li {
            text-align: center;
        }
        ul {
            column-count: 4;
        }
}
</style>
