import {WebApp} from 'meteor/webapp'
import {PagesCollection} from '../../imports/collections/pages'
import {createElementsFor} from '../../imports/api/elements/methods/create-elements-for'
import {parse} from 'node-html-parser'
import {STRUCTURE_TYPES} from '../../imports/infra/constants/structure-types'
import {AppsCollection} from '../../imports/collections/apps'

WebApp.connectHandlers.use('/api/sendHtml', (req, res, next) => {
  req.on(
    'data',
    Meteor.bindEnvironment((data) => {
      const {pathname, html} = JSON.parse(data)
      const appId = AppsCollection.findOne({name: 'Admin sample app'})?._id
      const pageId = PagesCollection.findOne({path: pathname})?._id
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
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(200)
      res.end(JSON.stringify({status: 'ok'}))
    }),
  )
})
