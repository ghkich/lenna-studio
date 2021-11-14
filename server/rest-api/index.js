import {WebApp} from 'meteor/webapp'
import {PagesCollection} from '../../imports/collections/pages'
import {createElementsFor} from '../../imports/api/elements/methods/create-elements-for'
import {parse} from 'node-html-parser'
import {STRUCTURE_TYPES} from '../../imports/infra/constants/structure-types'
import {AppsCollection} from '../../imports/collections/apps'
import {generateCss} from '../../imports/api/generate-css'
import {ThemesCollection} from '../../imports/collections/themes'
import {SelectorsCollection} from '../../imports/collections/selectors'

WebApp.connectHandlers.use('/api/sendHtml', (req, res) => {
  req.on(
    'data',
    Meteor.bindEnvironment((data) => {
      const {pathname, html, appId} = JSON.parse(data)
      let pageId = PagesCollection.findOne({appId, path: pathname})?._id
      if (!pageId) {
        const pathnameWithoutSlashes = pathname.replace(/\//g, '')
        const pageName = pathnameWithoutSlashes
          ? pathnameWithoutSlashes[0]?.toUpperCase() + pathnameWithoutSlashes.slice(1)
          : 'Home'
        pageId = PagesCollection.insert({appId, path: pathname, name: pageName})
      }
      const htmlNodes = parse(html)?.childNodes
      createElementsFor({
        appId,
        pageId,
        nodes: htmlNodes,
        structureType: STRUCTURE_TYPES.ACTUAL,
      })
    }),
  )

  req.on(
    'end',
    Meteor.bindEnvironment(() => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type')
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(200)
      res.end(JSON.stringify({status: 'ok'}))
    }),
  )
})

WebApp.connectHandlers.use('/api/getCss', (req, res) => {
  let css
  req.on(
    'data',
    Meteor.bindEnvironment((data) => {
      const {appId} = JSON.parse(data)
      const app = AppsCollection.findOne(appId)
      const theme = ThemesCollection.findOne(app?.themeId)
      const selectors = SelectorsCollection.find({appId}).fetch()
      css = generateCss({theme, selectors, includeTailwindBase: true})
    }),
  )

  req.on(
    'end',
    Meteor.bindEnvironment(() => {
      setTimeout(() => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type')
        res.setHeader('Content-Type', 'application/json')
        res.writeHead(200)
        res.end(JSON.stringify({css}))
      }, 100)
    }),
  )
})
