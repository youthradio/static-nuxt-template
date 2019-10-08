import dotenv from 'dotenv'
import POSTCONFIG from './post.config'
dotenv.config()
process.env.DEBUG = 'nuxt:*'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  router: {
    base: POSTCONFIG.baseURL
  },
  head: {
    title: POSTCONFIG.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: POSTCONFIG.description },
      { property: 'og:title', content: POSTCONFIG.title },
      { property: 'og:site_name', content: POSTCONFIG.title },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: POSTCONFIG.url },
      { property: 'og:image', content: POSTCONFIG.featureImage },
      { property: 'og:description', content: POSTCONFIG.description },
      { property: 'og:image:alt', content: POSTCONFIG.featureImageDescription },
      { property: 'fb:app_id', content: POSTCONFIG.fbAppID },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: POSTCONFIG.twitterHandler },
      { name: 'twitter:site', content: POSTCONFIG.twitterHandler },
      { name: 'twitter:title', content: POSTCONFIG.title },
      { name: 'twitter:description', content: POSTCONFIG.description },
      { name: 'twitter:image', content: POSTCONFIG.featureImage },
      { name: 'twitter:image:alt', content: POSTCONFIG.featureImageDescription },
      { itemprop: 'description', conten: POSTCONFIG.description },
      { itemprop: 'image', conten: POSTCONFIG.featureImage },
      { name: 'msapplication-TileColor', conten: '#da532c' },
      { name: 'theme-color', conten: '#ffffff' }
    ],
    link: [
      { rel: 'icon', type: 'apple-touch-icon', sizes: '180x180', href: 'favicon/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'favicon/favicon-16x16.png' },
      { rel: 'shortcut icon', href: 'favicon/favicon-32x32.png' },
      { rel: 'manifest', href: 'favicon/site.webmanifest' },
      { rel: 'mask-icon', color: '#5bbad5', href: 'favicon/safari-pinned-tab.svg' },
      { rel: 'stylesheet', href: 'https://yr.media/statics/yr-media-typography/yr-typography.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~plugins/vue-observable.js',
      ssr: false
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '~/modules/getdata',
    '@nuxtjs/google-gtag'
  ],
  'google-gtag': {
    id: 'UA-6029148-3',
    config: {
      anonymize_ip: true, // anonymize IP
      page_title: POSTCONFIG.title,
      page_path: POSTCONFIG.baseURL
    },
    debug: false, // enable to track in dev mode
    disableAutoPageTrack: true // disable if you don't want to track each page route with router.afterEach(...).
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
  // server: {
  //   https: {
  //     key: readFileSync(`${process.env.SSLKEY}`),
  //     cert: readFileSync(`${process.env.SSLCRT}`)
  //   }
  // }
}
