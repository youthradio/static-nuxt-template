import * as selection from 'd3-selection'
import * as transition from 'd3-transition'
import * as ease from 'd3-ease'
import * as geo from 'd3-geo'
import * as annotation from 'd3-svg-annotation'

const d3 = Object.assign({},
  selection,
  transition,
  geo,
  ease,
  annotation
)

export default d3
