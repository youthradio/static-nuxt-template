<template>
  <div>
    <div id="map" />
    <div>
      <div class="title">
        Years
      </div>
      <div class="options">
        <button
          v-for="(year,id) in yearsButtonsData"
          :key="year"
          :class="[yearSlider === id?'active':'']"
          @click="yearSlider = id"
        >
          {{ year }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { geoAlbersUsaTerritories } from 'd3-composite-projections'
import * as topojson from 'topojson-client'
import d3 from '../../util/d3'
import customLabels from './customLabels.js'

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
    mapReady: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      ageStateColorData: {},
      svg: null,
      aspect: null,
      projection: null,
      path: null,
      isMapReady: false,
      annotations: [],
      makeAnnotations: null,
      yearSlider: 0,
      legendData: null,
      yearsButtonsData: []
    }
  },
  computed: {
  },
  watch: {
    yearSlider () {
      this.svg.selectAll('.states')
        .attr('fill', (d) => {
          if (this.ageStateColorData[d.properties.STUSPS]) {
            return this.ageStateColorData[d.properties.STUSPS][this.yearSlider][1]
          }
          return 'black'
        })

      this.makeAnnotations.annotations().forEach((annotation) => {
        if (annotation.note.years) {
          annotation.note.title = annotation.note.years[this.yearSlider][1]
        }
      })
      this.makeAnnotations.updateText()
      this.fixCustomAnnotations()
    },
    mapReady () {
      if (this.mapReady) {
        this.preRender()
        this.drawMap()
        this.renderAnnotations()
        this.renderLegend()
        // this.setAnimation(true)
      }
    }
  },
  created () {
  },
  mounted () {
    this.createSvg()

    // topojson.feature(this.mapData, this.mapData.objects.states).features
  },
  methods: {
    createSvg () {
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
    },
    preRender () {
      const basetype = d3.annotationCustomType(
        d3.annotationLabel, {
          note: {
            padding: 0,
            bgPadding: 0,
            wrap: 10
          }
        })
      const allAges = this.contentData.map(e => e.values.map(d => +d[1])).flat()
      const ageRange = d3.extent(allAges)
      const allUniqueAges = allAges
        .filter((e, i, values) => values.indexOf(e) === i)
        .sort((a, b) => a - b)

      const color = (val) => {
        // const ind = allUniqueAges.indexOf(val)
        if (!isNaN(val)) {
          return d3.interpolatePlasma(0.35 + ((val - ageRange[0]) * (1 - 0) / (ageRange[1] - ageRange[0]) + 0) * 0.55)
        }
        return 'lightgrey'
      }

      // get years options from first content data row, only years

      this.yearsButtonsData = this.contentData[0].values.map(e => e[0])

      // filter unique ages from flat array make array of colors
      this.legendData = allUniqueAges.map(age => [age, color(age)])

      this.annotations = topojson.feature(this.mapData, this.mapData.objects.states).features.map((e) => {
        const x = this.path.centroid(e)[0]
        const y = this.path.centroid(e)[1]
        const label = e.properties.STUSPS
        const custom = customLabels.find(d => d.note.label === label)
        const stateData = this.contentData.find(e => e.abbr === label)
        const age = stateData ? (stateData.values[this.yearSlider][1]) : ''
        this.ageStateColorData[label] = stateData ? stateData.values.map(d => [d[0], color(+d[1])]) : ''
        return ({
          note: {
            label,
            title: age,
            align: custom ? ((label === 'VT') ? 'middle' : 'dynamic') : '',
            orientation: custom ? ((label === 'VT') ? 'topBottom' : 'leftRight') : 'topBottom',
            custom: !!(custom),
            years: stateData ? stateData.values : null
          },
          offset: 0,
          type: basetype,
          x,
          y,
          dx: custom ? custom.dx : 0,
          dy: custom ? custom.dy : 0
        })
      })
    },
    getTransform (el) {
      const transform = d3.select(el).style('transform')
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      g.setAttributeNS(null, 'transform', transform)
      const matrix = g.transform.baseVal.consolidate().matrix
      return { x: matrix.e, y: matrix.f }
    },
    renderAnnotations () {
      this.makeAnnotations = d3.annotation()
        .annotations(this.annotations)
      this.svg
        .append('g')
        .attr('class', 'annotation-group')
        .call(this.makeAnnotations)
      // .on('dblclick', function () {
      //   makeAnnotations.editMode(!makeAnnotations.editMode()).update()
      // })
      this.fixCustomAnnotations()
    },
    fixCustomAnnotations () {
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
    },
    renderLegend () {
      const side = 10
      const legend = this.svg
        .append('g')
        .attr('class', 'age-legend')
        .attr('transform', `translate(${WIDTH - 150}, ${HEIGHT - 100})`)

      const dots = legend.selectAll('g')
        .data(this.legendData)
        .enter()
        .append('g')
        .attr('transform', (_, i) => `translate(${i * side}, ${0})`)

      dots
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', side)
        .attr('height', side)
        .attr('fill', d => d[1])

      const legendWidth = legend.node().getBoundingClientRect().width
      legend
        .append('text')
        .attr('x', 0)
        .attr('y', '-0.25rem')
        .text('Youngest')
      legend
        .append('text')
        .attr('x', legendWidth)
        .attr('y', '-0.25rem')
        .text('Oldest')

      legend.append('text')
        .text('Age Range')
        .attr('class', 'legend-title')
        .attr('x', legendWidth / 2)
        .attr('y', '-1rem')
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
        .attr('fill', (d) => {
          if (this.ageStateColorData[d.properties.STUSPS]) {
            return this.ageStateColorData[d.properties.STUSPS][this.yearSlider][1]
          }
          return 'lightgrey'
        })

      // this.svg.append('path')
      //   .style('fill', 'none')
      //   // .style('stroke', 'black')
      //   .attr('d', this.projection.getCompositionBorders())
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
    // setAnimation (state) {
    //   if (state && !this.timer) {
    //     this.timer = setInterval(() => {
    //       this.yearSlider = (this.yearSlider + 1) % this.yearsButtonsData.length
    //     }, 600)
    //   } else {
    //     clearInterval(this.timer)
    //   }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~@/css/vars";
@import "~@/css/mixins";

.title {
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  @include breakpoint(medium) {
    font-size: 0.7rem;
  }
}
.options {
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  font-family: "Assistant", sans-serif;
  font-size: 1.1rem;

  font-weight: bold;
  background-color: $white;
  border-color: $black;
  border-radius: 0.3rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  margin: 5px;
  box-shadow: 0px 2px #0000004a;
  &:hover {
    box-shadow: 0px 0px #0000004a;
  }
  &:active {
    background-color: lighten($grey, 0.5);
    box-shadow: 0px 1px #0000004a;
  }
  &.active {
    background-color: lighten($grey, 0.5);
    box-shadow: 0px 1px #0000004a;
  }
  @include breakpoint(medium) {
    font-size: 1.2rem;
  }
}

/deep/ #map {
  .legend-title {
    font-weight: bold;
  }
  .annotation-note-title {
    font-size: 2rem;
    fill: $black;
    stroke: $white;
    stroke-opacity: 0.8;
    stroke-width: 2;
    margin: 2px;
    paint-order: stroke;
    @include breakpoint(medium) {
      font-size: 1.2rem;
    }
  }
  .annotation-note-label {
    font-size: 0.5rem;
    fill: $black;
    stroke: $white;
    stroke-opacity: 0.8;
    stroke-width: 2;
    paint-order: stroke;
  }
  // .annotation-note-bg{
  //   // fill-opacity: 0.5;
  //   // fill: rgba(255, 0, 0, 0.379);
  // }
  .state-label {
    text-transform: uppercase;
    font-weight: bold;
  }
  .states {
    stroke: $white;
    stroke-width: 1px;
    stroke-linejoin: round;
    // fill: #fdc997;
  }
  // .states:hover {
  //     fill: $sky-blue;
  //     opacity: 1.0;
  // }
  .state-borders {
    fill: none;
    stroke: $dark;
    stroke-width: 3px;
    stroke-linejoin: round;
    stroke-linecap: round;
    pointer-events: none;
  }
  // .marker {
  //     opacity: 1;
  //     stroke-width: 5;
  //     stroke: black;
  //     &:hover {
  //       /* fill: #c65067; */
  //       opacity: 1;
  //     }
  // }
  .marker-category-0 {
    fill: $red;
  }
  .marker-category-1 {
    fill: $dusk;
  }
  .marker-category-3 {
    fill: $dark;
  }
  .age-legend {
    font-size: 1rem;
    text-anchor: middle;
    @include breakpoint(medium) {
      font-size: 0.7rem;
    }
  }
}
</style>
