<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true,
    }"
  >
    <div
      class="margin"
    >
      <USAMap
        :map-data="mapData"
        :markers-data="markersData"
        :content-data="contentData"
        :map-ready="mapReady"
      />
    </div>
  </div>
</template>

<script>
import { csvParse } from 'd3-dsv'
import USAMap from './USAMap.vue'

export default {
  name: 'MapContainer',
  components: {
    USAMap
  },
  data () {
    return {
      mapData: {},
      markersData: [],
      contentData: [],
      loadingMarkers: false,
      loadingMap: false,
      loadingData: false,
      mapReady: false
    }
  },
  computed: {

  },
  created () {
    // this.loadContentData()
    // this.loadMapData()
    // this.loadMarkersData()
  },
  mounted () {

  },
  methods: {
    async visibilityChanged () {
      await this.loadContentData()
      await this.loadMapData()
      this.mapReady = true
    },
    async loadMarkersData () {
      this.loadingMarkers = true
      this.markersData = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSBL4rLXWCAs0GloIzk-WODWDiBBLBNVwwkmTPuKoYnVtMgE1-VtT_KhTX5SYJ2davMzwOUrqB2lWq6/pub?gid=304433033&single=true&output=csv')
        .then(res => res.text())
        .then(res => csvParse(res))
        .then((data) => {
          delete data.columns
          return data.map(e => ({
            geo: [parseFloat(e.long), parseFloat(e.lat)],
            address: e.Address
          }))
        })
      this.loadingMarkers = false
    },
    async loadContentData () {
      this.loadingData = true
      this.contentData = await fetch('data/age-of-consent-information.csv')
        .then(res => res.text())
        .then(res => csvParse(res))
        .then((data) => {
          const years = data.columns.slice(2)
          return data.map(e =>
            ({
              abbr: e.Abbr,
              state: e.State,
              values: years.map(y => [y, e[y]])
            })
          )
        })
      this.loadingData = false
    },

    async loadMapData () {
      this.loadingMap = true
      this.mapData = await fetch('maps/us-all-states-20m-ligth-basic.json')
        .then(res => res.json())
      this.loadingMap = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/css/_vars';
.margin{
  margin-left: -1.5rem;
  margin-right: -1.5rem;
}
</style>
