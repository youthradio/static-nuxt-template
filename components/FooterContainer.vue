<template>
  <footer>
    <div class="top-block">
      <div class="item logo-container">
        <FullLogo class="logo" />
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
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import FullLogo from '../components/FullLogo'

export default {
  components: {
    FullLogo
  }
}
</script>

<style scoped lang="scss">
@import '~@/css/mixins';
@import "~@/css/vars";
@import "~@/css/base";

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
        padding: 3rem 4rem 3rem 4rem;
        flex-direction: row;
    }
    .item {
        padding: 1rem 1rem 1rem 1rem;
        @include breakpoint (medium){
            padding: 0rem 1rem 0rem 1rem;
        }
    }
}
.logo{
    display: none;
    width: 0;
    margin-right: 0;
    transform: translateY(0) scale(0);
    @include breakpoint (small){
        transform: translateY(1.3rem) scale(1.65);
        display: block;
        width: 40px;
        margin-right: 2rem;
    }
}
.menu-container{
        a {
        color: $green;
        font: 500 1rem/1.6 'Roboto Mono', sans-serif;
        letter-spacing: 3px;
        font-weight: 800;
        }
        a:hover {
            color: $white;
            background-color: inherit;
        }
        ul {
            column-count: 2;
            column-gap: 40px;
        }
}
.social-container{
        a {
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
