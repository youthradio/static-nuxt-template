import * as selection from 'd3-selection'
import * as transition from 'd3-transition'
import * as ease from 'd3-ease'
import * as geo from 'd3-geo'
import * as annotation from 'd3-svg-annotation'
import * as interpolate from 'd3-scale-chromatic'
import * as array from 'd3-array'

const d3 = Object.assign({},
  selection,
  transition,
  geo,
  ease,
  annotation,
  array,
  interpolate
)

export default d3
