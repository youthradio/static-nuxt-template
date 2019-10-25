<template>
  <div class="row">
    <div id="map" />
  </div>
</template>

<script>
import { geoAlbersUsaTerritories } from 'd3-composite-projections'
import * as topojson from 'topojson-client'
import d3 from '../../util/d3'

const WIDTH = 920
const HEIGHT = 600
const MARKER_S_MIN = 0.07
const MARKER_S_MAX = 0.15
const MARKER_PATH = 'M -19.732,-10.330125 C -165.03,-220.96916 -192,-242.58716 -192,-320.00016 c 0,-106.039 85.961,-192 192,-192 106.039,0 192,85.961 192,192 0,77.413 -26.97,99.031 -172.268,309.670035 -9.535,13.774 -29.93,13.773 -39.464,0 z'
export default {
  name: 'USAMap',
  props: {
    markersData: {
      type: Array,
      default: null,
      required: false
    },
    contentData: {
      type: Array,
      default: null,
      required: false
    },
    mapData: {
      type: Object,
      default: null,
      required: true
    },
    loadingMarkers: {
      type: Boolean,
      default: false,
      required: true
    },
    loadingMap: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      svg: null,
      aspect: null,
      projection: null,
      path: null,
      isMapReady: false,
      annotations: []
    }
  },
  computed: {
  },
  watch: {
    loadingMap () {
      if (!this.loadingMap) {
        const b = [
          {
            'x': 740.0849895461586,
            'y': 268.9751849465421,
            'dx': 61.118896484375,
            'dy': 72.91372680664062,
            'note': {
              'label': 'DC',
              'title': '10',
              'align': 'dynamic',
              'orientation': 'leftRight',
              'custom': true
            }
          },
          {
            'x': 743.4746223867401,
            'y': 265.89961992131657,
            'dx': 57.9022216796875,
            'dy': 48.25177001953125,
            'note': {
              'label': 'MD',
              'title': '10',
              'align': 'dynamic',
              'orientation': 'leftRight',
              'custom': true
            }
          },
          {
            'x': 815.4069125271898,
            'y': 126.2672009342402,
            'dx': 39.673583984375,
            'dy': 8.578094482421875,
            'note': {
              'label': 'ME',
              'title': '10',
              'align': 'dynamic',
              'orientation': 'leftRight',
              'custom': true
            }
          },
          {
            'x': 787.8938928856286,
            'y': 205.75244924877535,
            'dx': 67.55242919921875,
            'dy': 47.179473876953125,
            'note': {
              'label': 'CT',
              'title': '10',
              'align': 'dynamic',
              'orientation': 'leftRight',
              'custom': true
            }
          },
          {
            'x': 761.065598396688,
            'y': 262.7419972859574,
            'dx': 40.745849609375,
            'dy': 23.5897216796875,
            'note': {
              'label': 'DE',
              'title': '7',
              'align': 'dynamic',
              'orientation': 'leftRight',
              'custom': true
            }
          },
          {
            'x': 798.0169056737703,
            'y': 191.16485949689456,
            'dx': 57.90216064453125,
            'dy': 2.1445159912109375,
            'note': {
              'label': 'MA',
              'title': '10',
              'align': 'dynamic',
              'orientation': 'leftRight',
              'custom': true
            }
          },
          {
            'x': 793.4707328728683,
            'y': 164.364382245589,
            'dx': 62.191162109375,
            'dy': 0,
            'note': {
              'label': 'NH',
              'title': '10',
              'align': 'dynamic',
              'orientation': 'leftRight',
              'custom': true
            }
          },
          {
            'x': 767.8506848054253,
            'y': 238.40275364135388,
            'dx': 34.3123779296875,
            'dy': 20.373016357421875,
            'note': {
              'label': 'NJ',
              'title': '10',
              'align': 'dynamic',
              'orientation': 'leftRight',
              'custom': true
            }
          },
          {
            'x': 803.736373653626,
            'y': 200.8502403038496,
            'dx': 52.540771484375,
            'dy': 22.517471313476562,
            'note': {
              'label': 'RI',
              'title': '10',
              'align': 'dynamic',
              'orientation': 'leftRight',
              'custom': true
            }
          },
          {
            'x': 777.5488720941044,
            'y': 160.9148348403736,
            'dx': -1.07232666015625,
            'dy': -23.58971405029297,
            'note': {
              'label': 'VT',
              'title': '10',
              'align': 'middle',
              'orientation': 'topBottom',
              'custom': true
            }
          }
        ]

        const basetype = d3.annotationCustomType(
          d3.annotationLabel, {
            className: 'bbg-custom',
            note: {
              padding: 0,
              bgPadding: 0,
              wrap: 10
            }
          })

        this.annotations = topojson.feature(this.mapData, this.mapData.objects.states).features.map((e) => {
          const x = this.path.centroid(e)[0]
          const y = this.path.centroid(e)[1]
          const label = e.properties.STUSPS
          const custom = b.find(d => d.note.label === label)
          const stateData = this.contentData.find(e => e.abbr === label)
          const age = stateData ? (stateData.values[0][1]) : ''
          return ({
            note: {
              label,
              title: age,
              align: custom ? ((label === 'VT') ? 'middle' : 'dynamic') : '',
              orientation: custom ? ((label === 'VT') ? 'topBottom' : 'leftRight') : 'topBottom',
              custom: !!(custom)
            },
            offset: 0,
            type: basetype,
            x,
            y,
            dx: custom ? custom.dx : 0,
            dy: custom ? custom.dy : 0
          })
        })
        this.renderMap()
      }
    },
    loadingMarkers () {
      this.renderMap()
    }
  },
  created () {
  },
  mounted () {
    this.svg = d3.select('#map').append('svg')
    this.aspect = WIDTH / HEIGHT
    this.projection = geoAlbersUsaTerritories()
      .translate([WIDTH / 2, HEIGHT / 2])
    this.path = d3.geoPath(this.projection)
    this.svg.attr('width', WIDTH)
      .attr('height', HEIGHT)
    this.svg.attr('viewBox', '0 0 ' + WIDTH + ' ' + HEIGHT)
      .attr('perserveAspectRatio', 'xMinYMid meet')

    const defs = this.svg.append('defs')
    // create filter with id #drop-shadow
    // height=130% so that the shadow is not clipped
    const filter = defs.append('filter')
      .attr('id', 'drop-shadow')
      .attr('height', '130%')
      // SourceAlpha refers to opacity of graphic that this filter will be applied to
      // convolve that with a Gaussian with standard deviation 3 and store result
      // in blur
    filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', 5)
      .attr('result', 'blur')
      // translate output of Gaussian blur to the right and downwards with 2px
      // store result in offsetBlur
    filter.append('feOffset')
      .attr('in', 'blur')
      .attr('dx', 5)
      .attr('dy', 5)
      .attr('result', 'offsetBlur')
      // overlay original SourceGraphic over translated blurred opacity by using
      // feMerge filter. Order of specifying inputs is important!
    const feMerge = filter.append('feMerge')
    feMerge.append('feMergeNode')
      .attr('in', 'offsetBlur')
    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic')
    this.resizeContainer()
    window.addEventListener('resize', this.resizeContainer)

    // topojson.feature(this.mapData, this.mapData.objects.states).features
  },
  methods: {
    getTransform (el) {
      const transform = d3.select(el).style('transform')
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      g.setAttributeNS(null, 'transform', transform)
      const matrix = g.transform.baseVal.consolidate().matrix
      return { x: matrix.e, y: matrix.f }
    },
    renderAnnotations () {
      const makeAnnotations = d3.annotation()
        .annotations(this.annotations)
      this.svg
        .append('g')
        .attr('class', 'annotation-group')
        .call(makeAnnotations)
      // .on('dblclick', function () {
      //   makeAnnotations.editMode(!makeAnnotations.editMode()).update()
      // })
      this.svg.select('.annotation-group')
        .selectAll('.annotation-note-title')
        .select('tspan')
        .attr('dy', 0)

      this.svg.select('.annotation-group')
        .selectAll('.annotation-note-label')
        .attr('y', 0)
        .select('tspan')

      this.svg.select('.annotation-group')
        .selectAll('.annotation-note-label')
        .filter(d => d.note.label === 'VT')
        .attr('y', 0)
        .select('tspan')

      this.svg.select('.annotation-group')
        .selectAll('.annotation-note-content')
        .filter(d => d.note.label === 'VT')
        .attr('transform', (d, i, nodes) => {
          const { x, y } = this.getTransform(nodes[i])
          return `translate(${x} ${y * 0.3})`
        })

      // window.ann = makeAnnotations
    },
    renderMap () {
      if (!this.loadingMap && !this.loadingMarkers) {
        this.drawMap()
        // this.drawMarkers()
      }
    },
    drawMap () {
      this.svg.append('g')
        .attr('class', 'boundaries')
        .append('path')
        // .attr('filter', 'url(#drop-shadow)')
        .attr('d', this.path(topojson.mesh(this.mapData, this.mapData.objects.states, (a, b) => a === b)))
      this.svg.append('g').selectAll('.states')
        .data(topojson.feature(this.mapData, this.mapData.objects.states).features)
        .enter().append('path')
        .attr('class', 'states')
        .attr('d', this.path)
      this.svg.append('path')
        .style('fill', 'none')
        // .style('stroke', 'black')
        .attr('d', this.projection.getCompositionBorders())

      this.renderAnnotations()
    },
    drawMarkers () {
      this.svg.append('g').selectAll('.marker')
        .data(this.markersData.filter(e => (e.geo ? (!isNaN(e.geo[0]) || !isNaN(e.geo[1])) : false)))
        .enter()
        .append('path')
        .attr('d', MARKER_PATH)
        .attr('id', (e, i) => `marker-id-${i}`)
        .attr('class', (e, i) => `marker marker-category-${i % 4}`)
        .attr('transform', e => `translate(${this.projection(e.geo)[0]},${(-Math.random() * 1000)})scale(${MARKER_S_MAX},${MARKER_S_MAX})`)
        .transition()
        .ease(d3.easeBounce)
        .duration(1500)
        .attr('transform', e => `translate(${this.projection(e.geo)[0]},${this.projection(e.geo)[1]})scale(${MARKER_S_MIN},${MARKER_S_MIN})`)
        .attr('filter', 'url(#drop-shadow)')
    },
    drawContentData () {

    },
    resizeContainer () {
      const targetWidth = parseInt(this.svg.node().parentNode.clientWidth)
      this.svg.attr('width', targetWidth)
      this.svg.attr('height', Math.round(targetWidth / this.aspect))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~@/css/vars';
@import '~@/css/mixins';

/deep/ #map {
  .annotation-note-label tspan {
    // text-anchor: middle;
  }
  .annotation-note-title{
    font-size: 2rem;
    stroke: 'black';
    stroke-width:'2.5';
    stroke-opacity:'0.8';
    @include breakpoint (medium){
          font-size: 1rem;
    }
  }
  .annotation-note-label{
    font-size: 0.5rem;
    stroke: 'black';
    stroke-width:'2.5';
    stroke-opacity:'0.8';
  }
  // .annotation-note-bg{
  //   // fill-opacity: 0.5;
  //   // fill: rgba(255, 0, 0, 0.379);
  // }
  .state-label{
    text-transform: uppercase;
    font-weight: bold;
  }
  .states {
      stroke: $dark;
      stroke-width: 1px;
      fill: $white;
      stroke-linejoin: round;
  }
  .states:hover {
      fill: $sky-blue;
      opacity: 1.0;
  }
  .state-borders {
      fill: none;
      stroke: $dark;
      stroke-width: 3px;
      stroke-linejoin: round;
      stroke-linecap: round;
      pointer-events: none;
  }
  .marker {
      opacity: 1;
      stroke-width: 5;
      stroke: black;
      &:hover {
        /* fill: #c65067; */
        opacity: 1;
      }
  }
  .marker-category-0 {
    fill: $red;
  }
  .marker-category-1 {
    fill: $dusk;
  }
  .marker-category-3 {
    fill: $dark;
  }
}
</style>
