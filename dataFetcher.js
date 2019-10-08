import { csvParse } from 'd3-dsv'
import { group } from 'd3-array'
import fetch from 'node-fetch'

const DURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRaNDBN4NpVISkVvaKK_FPQSwRZorhpIKb0bsaPTm0gKwvVviTHvcpHJsr5erVrjpiPH9YZupinUljz/pub?gid=0&single=true&output=csv'

export async function customFetcher () {
  let csvdata = null
  try {
    csvdata = await fetch(DURL)
      .then((d) => {
        return d.text()
      })
      .then(d => csvParse(d))
      .then((data) => {
        data = data.filter(e => e.TOPIC !== '')
        return data
      })
  } catch (e) {
    console.log('Error fetching data', e)
  }

  const dataArray = Array.from(group(csvdata, d => d.TOPIC),
    ([key, value]) => ({ key, values: value }))

  const questionsData = dataArray.map(e => ({
    topic: e.key,
    headline: e.values[0] ? e.values[0].Headline : '',
    options: e.values.map(o => ({
      option: o.OPTIONS,
      response: o.RESPONSES
    }))
  }))

  // return some JSON Object
  return questionsData
}
