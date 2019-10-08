<template>
  <div class="container">
    <FeatureHeader
      :header-data="headerData"
      @onHeaderImgHeight="setHeaderHeight"
    />
    <MenuHeader :offset="headerImageHeight" />
    <article>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer. Odio ut sem nulla pharetra. Mauris augue neque gravida in fermentum et. Placerat duis ultricies lacus sed. Proin fermentum leo vel orci porta non pulvinar neque laoreet. Maecenas ultricies mi eget mauris. Malesuada fames ac turpis egestas integer eget aliquet nibh. Urna et pharetra pharetra massa massa ultricies. Interdum velit laoreet id donec.</p>
      <p>Vitae purus faucibus ornare suspendisse sed nisi. Dignissim cras tincidunt lobortis feugiat vivamus at. Lorem mollis aliquam ut porttitor. Mauris in aliquam sem fringilla ut morbi tincidunt augue. Lorem ipsum dolor sit amet. Nibh mauris cursus mattis molestie a iaculis at. Vulputate sapien nec sagittis aliquam malesuada bibendum. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Interdum consectetur libero id faucibus nisl tincidunt eget. Vulputate enim nulla aliquet porttitor lacus luctus. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Dignissim cras tincidunt lobortis feugiat vivamus at. Turpis massa tincidunt dui ut ornare lectus.</p>
      <p>Lobortis elementum nibh tellus molestie nunc non blandit massa. Elit duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Semper eget duis at tellus at urna. Sed faucibus turpis in eu. Sit amet volutpat consequat mauris nunc. Libero volutpat sed cras ornare arcu dui. Ut pharetra sit amet aliquam id. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Mi proin sed libero enim sed faucibus turpis in eu. Dui accumsan sit amet nulla facilisi morbi tempus. Leo a diam sollicitudin tempor. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Consectetur libero id faucibus nisl tincidunt. In ornare quam viverra orci sagittis. Morbi tincidunt augue interdum velit euismod in pellentesque massa. Dolor sit amet consectetur adipiscing. Quisque id diam vel quam elementum pulvinar etiam non quam. Pellentesque elit eget gravida cum sociis natoque penatibus. Urna neque viverra justo nec ultrices dui sapien. Sed id semper risus in hendrerit gravida rutrum.</p>
      <p>Arcu odio ut sem nulla pharetra diam sit amet. Non sodales neque sodales ut etiam sit amet nisl purus. Elementum nibh tellus molestie nunc non blandit massa enim. Non diam phasellus vestibulum lorem sed risus ultricies. Vel facilisis volutpat est velit egestas dui. Ut ornare lectus sit amet est placerat in egestas. Scelerisque viverra mauris in aliquam. Tortor posuere ac ut consequat semper viverra nam libero justo. Libero nunc consequat interdum varius sit. Scelerisque felis imperdiet proin fermentum leo vel orci porta. Ut eu sem integer vitae justo eget magna fermentum iaculis. Vitae sapien pellentesque habitant morbi tristique senectus. Elementum tempus egestas sed sed risus. Et sollicitudin ac orci phasellus egestas.</p>
      <p>In vitae turpis massa sed elementum tempus egestas. Eget mi proin sed libero enim sed faucibus. Nullam non nisi est sit amet facilisis magna etiam tempor. Arcu non sodales neque sodales ut etiam. Magna sit amet purus gravida quis blandit turpis. Ultricies mi quis hendrerit dolor magna eget est lorem. Euismod elementum nisi quis eleifend quam adipiscing vitae. Urna porttitor rhoncus dolor purus. Nec ullamcorper sit amet risus nullam eget. Mi tempus imperdiet nulla malesuada pellentesque elit. Vulputate mi sit amet mauris commodo quis imperdiet massa. Integer feugiat scelerisque varius morbi enim.</p>
    </article>
    <RelatedPosts :posts-data="postsData" />
  </div>
</template>

<script>

import CommonUtils from '../mixins/CommonUtils'
import POSTCONFIG from '../post.config'
import ROWS_DATA from '~/data/data.json'
import MenuHeader from '~/components/MenuHeader.vue'
import FeatureHeader from '~/components/FeatureHeader.vue'
import RelatedPosts from '~/components/RelatedPosts.vue'

export default {
  components: {
    MenuHeader,
    FeatureHeader,
    RelatedPosts
  },
  mixins: [
    CommonUtils
  ],
  data () {
    return {
      isReadyToResult: false,
      showResult: false,
      answeredQuestions: [],
      headerImageHeight: 0
    }
  },
  computed: {
    resultStatements () {
      return this.answeredQuestions
        .filter(r => r !== undefined)
        .map(response => response.response.replace(/\{\{.*\}\}/g, response.option.toLowerCase()))
    },
    headerData () {
      return {
        featureImage: POSTCONFIG.featureImagePath,
        title: POSTCONFIG.title,
        author: POSTCONFIG.author,
        imageCaption: POSTCONFIG.featureImageCaption,
        publishDate: POSTCONFIG.publishDate,
        location: POSTCONFIG.location
      }
    }
  },
  watch: {
    answeredQuestions () {
      this.isReadyToResult = true
    }
  },
  async asyncData (ctx) {
    const slug = POSTCONFIG.wpPostSlug
    const post = await fetch(`https://yr.media/wp-json/wp/v2/posts?slug=${slug}`)
      .then(d => d.json())
    const relatedIds = post[0].acf.related_posts.join(',')
    const relatedData = await fetch(`https://yr.media/wp-json/wp/v2/posts?include=${relatedIds}`)
      .then(d => d.json())

    // const slug = await ctx.params.slug
    return {
      questionsData: ROWS_DATA.content,
      postsData: relatedData
    }
  },
  mounted () {
  },
  methods: {
    setHeaderHeight (val) {
      this.headerImageHeight = val
    },
    processResult () {
      this.showResult = true
      // nextTick() waits for the next update cycle, very useful for focusing on new DOM objects.
      this.$nextTick(() => this.$refs.result.scrollIntoView({ behavior: 'smooth' }))
    },
    printPage () {
      window.print()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/css/vars";
@import "~@/css/base";
// Unique colors for both Subheader and Break question
.question-0{
  background-color: #FFDB5A;
}
.question-1{
  background-color: #F7825D;
}
.question-2{
  background-color: #ED5B5B;
}
.question-3{
  background-color: #3C76CB;
}
.question-4{
  background-color: #3CC2CB;
}
.buttonContainer{
   width: 100%;
   text-align: center;
 }
.result-button{
   transition: 0.3s;
   font-weight: 600;
   font-size: 1rem;
   background-color: #3CCB98;
   padding: 1rem;
   border: 2px solid #3CCB98;
   border-radius: 1rem;
   margin-bottom: -1rem;
   z-index: 1;
 }
.result-button:hover{
   transition: 0.3s;
   font-weight: 600;
   font-size: 1rem;
   background-color: #3CCB98;
   padding: 1rem;
   border: 2px solid grey;
   border-radius: 1rem;
   box-shadow: 0px 0px 6px black;
 }
.printButton{
   transition: 0.3s;
   font-weight: 600;
   font-size: 1rem;
   background-color: #90E0C3;
   padding: 1rem;
   border: 2px solid #90E0C3;
   border-radius: 1rem;
   margin-bottom: -1rem;
   z-index: 1;
 }
.printButton:hover{
   transition: 0.3s;
   font-weight: 600;
   font-size: 1rem;
   background-color: #90E0C3;
   padding: 1rem;
   border: 2px solid grey;
   border-radius: 1rem;
   box-shadow: 0px 0px 6px black;
 }

.resultContainer{
  margin: auto;
  background-color: #1AFFA3;
  border-radius: 1rem;
  width: 100%;
  text-align: left;
  .content{
      max-width: 32rem;
      margin: auto;
  }
 }
.resultChild{
  list-style-type: circle;
  list-style-position: inside;
}
ul{
  list-style-type: none;
  font-size: 0.8rem;
  padding: 1rem;
  margin:auto;
}
.credits{
  font-size: 0.8rem;
}
.chapter {
  display: inline-block;
  color: black;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin-left: -1rem;
  margin-bottom: 1rem;
  &:not(:first-child){
    margin-top: 1rem;
  }
  h4 {
    padding: 0;
    font-weight: 800;
  }
}
</style>
