<template>
  <div class="row">
    <USAMap
      :map-data="mapData"
      :markers-data="markersData"
      :loading-markers="loadingMarkers"
      :loading-map="loadingMap"
    />
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
      loadingMarkers: false,
      loadingMap: false
    }
  },
  computed: {

  },
  created () {
    this.loadMapData()
    this.loadMarkersData()
  },
  mounted () {

  },
  methods: {
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
    async loadMapData () {
      this.loadingMap = true
      this.mapData = await fetch('maps/all-states-5m.json')
        .then(res => res.json())
      this.loadingMap = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/css/_vars';

</style>
