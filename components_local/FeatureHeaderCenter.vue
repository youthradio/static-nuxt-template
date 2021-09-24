<template>
  <div ref="headerImage" class="relative white">
    <picture>
      <source
        type="image/webp"
        :srcset="`compressed/${headerData.featureImage}@0.5x.webp 110w,
        compressed/${headerData.featureImage}@0.25x.webp 552w,
        compressed/${headerData.featureImage}@0.75x.webp 1651w,
        compressed/${headerData.featureImage}.webp 2200w
        `"
      />
      <source
        type="image/jpeg"
        :srcset="`compressed/${headerData.featureImage}@0.5x.jpg 110w,
        compressed/${headerData.featureImage}@0.25x.jpg 552w,
        compressed/${headerData.featureImage}@0.75x.jpg 1651w,
        compressed/${headerData.featureImage}.jpg 2200w
        `"
      />

      <img
        class="w-100 db img-fluid"
        :srcset="`compressed/${headerData.featureImage}@0.5x.jpg 110w,
        compressed/${headerData.featureImage}@0.25x.jpg 552w,
        compressed/${headerData.featureImage}@0.75x.jpg 1651w,
        compressed/${headerData.featureImage}.jpg 2200w
        `"
        :src="`compressed/${headerData.featureImage}@0.75x.jpg`"
        alt="A man gets visualized by a machine, Header image"
      />
    </picture>
    <!-- The header image should get a better alt but maybe it's ignorable for screen readers -->
    <div
      :class="[
        'flex absolute justify-center items-end tc z-1 w-100 h-75 top-0',
        isvisible ? 'transition-on' : 'transition-off',
      ]"
    >
      <div class="mw7 ph3 ph4-ns center purple bg-white br2">
        <h1 class="lh-title-1-1 daysans f1-ns f3 mb0 pa0 ttu">
          {{ headerData.title }}
        </h1>
        <h2 class="lh-title-1-1 normal assistant f3-ns f5 ma0 pa0">
          {{ headerData.subheadline }}
        </h2>
        <h3 class="lh-title-1-1 normal f3-ns f5 solano-gothic">
          By {{ headerData.author }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headerData: {
      type: Object,
      require: true,
      default: null,
    },
    mode: {
      type: String,
      required: false,
      default: 'base',
    },
  },
  data() {
    return {
      isvisible: false,
    }
  },
  mounted() {
    setTimeout(async () => {
      await this.checkFont()
      this.isvisible = true
    }, 500)
  },
  methods: {
    checkFont() {
      return new Promise((resolve, reject) => {
        this.interval = setInterval(() => {
          if (typeof document.fonts.check === 'function') {
            if (document.fonts.check('12px Days Sans')) {
              clearInterval(this.interval)
              resolve()
            }
          } else {
            resolve()
          }
        }, 10)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/variables';
.img-fluid {
  max-width: 100%;
  object-fit: cover;
  height: calc(100vh - 70px);
}
.transition-off {
  opacity: 0;
}
.transition-on {
  transition: opacity 0.5s ease-in;
  opacity: 1;
}
</style>
