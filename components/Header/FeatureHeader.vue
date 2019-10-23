<template>
  <header ref="headerImage">
    <img
      :data-srcset="`${headerData.featureImage}x375.jpg 375w,
        ${headerData.featureImage}x563.jpg 563w,
        ${headerData.featureImage}x1125.jpg 1125w,
        ${headerData.featureImage}x1500.jpg 1500w,
        ${headerData.featureImage}x1875.jpg 1875w,
        `"
      :data-src="`${headerData.featureImage}x1875.jpg`"
      alt="Elva dressed as a fairy"

      class="img-fluid lazyload"
      @load="updateHeaderHeight"
    >
    <div class="title">
      <h2> {{ headerData.title }}</h2>
      <h3> by {{ headerData.author }}</h3>
      <h5> {{ headerData.publishDate }}</h5>
    </div>
    <div class="image-caption">
      <span> {{ headerData.imageCaption }}</span>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    headerData: {
      type: Object,
      require: true,
      default: null
    }
  },
  data () {
    return {
      innervalue: null
    }
  },
  methods: {
    updateHeaderHeight () {
      this.$emit('onHeaderImgHeight', this.$refs.headerImage.getBoundingClientRect().height)
    }
  }

}
</script>

<style lang="scss" scoped>
@import '~@/css/vars';
.img-fluid{
  max-width: 100%;
  width: 100%;
  height: auto;
  object-fit: cover;
}
header {
  position: relative;
  display: flex;
  height: 80vh;
  &::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 45%;
    background-color:rgba($green, 0.65);
    z-index: 0;
  }
}
.title{
  position: absolute;
  bottom: 0px;
  // max-width:40%;
  left: 10%;
  z-index: 1;

  h2 {
    font-family: "Days Sans", sans-serif;
    font-weight: 900;
    letter-spacing: 0.64px;
    text-transform: uppercase;
    color: $white;
    word-break: break-word;
    padding-bottom: 0px;
  }
  h3 {
    padding-top: 0px;
    font-weight: 500;
    font-family: "Solano Gothic MVB", sans-serif;
    text-transform: none;
  }
  h5 {
    padding-top: 0px;
    // font-weight: 500;
    // font-family: "Solano Gothic MVB", sans-serif;
    text-transform: uppercase;
  }
}
.image-caption{
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: -1rem;
  z-index: 1;
  span {
    font-weight: 400;
    font-size: 0.5rem;
    line-height: 1rem;
    font-family: 'Roboto Mono', sans-serif;
    text-align: center;
    color: $blue-button;
  }
}

</style>
