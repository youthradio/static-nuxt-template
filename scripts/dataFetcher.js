// import { csvParse } from 'd3-dsv'
// import { group } from 'd3-array'
// import fetch from 'node-fetch'
import Gootenberg from 'gootenberg'
import marked from 'marked'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import utils from './utils.js'
import credentials from './credentials.json'

const makeSlug = utils.makeSlug
const DOMPurify = createDOMPurify(new JSDOM('').window)

marked.setOptions({
  renderer: new marked.Renderer(),
  baseUrl: null,
  breaks: false,
  gfm: false,
  headerIds: false,
  headerPrefix: '',
  highlight: null,
  mangle: true,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  silent: false,
  smartLists: false,
  smartypants: false,
  xhtml: false,
})

const renderer = {
  link(href, title, text) {
    return `<a target="_blank" rel="nofollow" href="${href}" class="link green underline underline-hover hover-dark-green">${text}</a>`
  },
}

marked.use({ renderer })

function markdown2html(data) {
  const copy = Object.assign(data, {})
  const interate = (obj) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object' || obj[key] instanceof Object) {
        interate(obj[key])
        return
      }
      if (typeof obj[key] === 'string' || obj[key] instanceof String) {
        let configDom = {
          ALLOWED_TAGS: ['a'],
          KEEP_CONTENT: true,
        }
        if (key === 'label') {
          configDom = {
            ADD_ATTR: ['target'],
            ALLOWED_TAGS: ['a', 'b', 'br', 'div', 'style', 'strong', 'i'],
            KEEP_CONTENT: true,
          }
        }
        if (key === 'text') {
          configDom = {
            ADD_ATTR: ['target'],
            ALLOWED_TAGS: [
              'a',
              'p',
              'b',
              'img',
              'br',
              'div',
              'iframe',
              'style',
              'strong',
              'i',
              'li',
              'ul',
            ],
            KEEP_CONTENT: true,
          }
        }
        obj[key] = DOMPurify.sanitize(marked(obj[key]), configDom).trim()
        // make slugs from titles
        if (key === 'title') {
          obj.slug = makeSlug(obj[key])
        }
        if (key === 'name' || key === 'author') {
          obj.authorslug = makeSlug(obj[key])
        }
      }
    })
  }
  interate(copy)
  return copy
}

async function customFetcher(DOC_ID) {
  let convertedData = null
  try {
    const goot = new Gootenberg()
    await goot.auth.jwt(credentials)
    const data = await goot.parse.archie(DOC_ID)
    convertedData = markdown2html(data)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error fetching data', e)
  }
  // convertedData

  // return some JSON Object
  // eslint-disable-next-line no-console
  console.log(convertedData)
  return convertedData
}
export default customFetcher
