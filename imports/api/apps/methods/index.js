import {AppsCollection} from '../../../collections/apps'
import {ElementsCollection} from '../../../collections/elements'
import {ComponentsCollection} from '../../../collections/components'
import {ThemesCollection} from '../../../collections/themes'
import {SelectorsCollection} from '../../../collections/selectors'
import {PagesCollection} from '../../../collections/pages'

Meteor.methods({
  ['apps.create']({fromAppId, name, themeId, checkedPageIds}) {
    if (!name) return
    const existingAppName = AppsCollection.find({name}).fetch()
    if (existingAppName?.length > 0) {
      throw new Meteor.Error('app name already exists')
    }
    const userId = this.userId
    const appId = AppsCollection.insert({name, themeId, userId})
    if (appId && checkedPageIds?.length > 0) {
      const oldNewPageMap = {}
      checkedPageIds.forEach((pageId) => {
        const {_id: oldPageId, ...page} = PagesCollection.findOne(pageId)
        oldNewPageMap[oldPageId] = PagesCollection.insert({...page, userId, appId})
      })
      SelectorsCollection.find({appId: fromAppId})
        .fetch()
        .forEach(({_id, ...selector}) => {
          SelectorsCollection.insert({...selector, appId})
        })
      const oldNewElementMap = {}
      ElementsCollection.find({appId: fromAppId, pageId: {$exists: false}})
        .fetch()
        .forEach(({_id: oldElementId, ...element}) => {
          oldNewElementMap[oldElementId] = ElementsCollection.insert({...element, appId})
        })
      ElementsCollection.find({pageId: {$in: checkedPageIds}})
        .fetch()
        .forEach(({_id: oldElementId, ...element}) => {
          oldNewElementMap[oldElementId] = ElementsCollection.insert({...element, appId})
        })
      const oldNewComponentMap = {}
      ComponentsCollection.find({appId: fromAppId})
        .fetch()
        .forEach(({_id: oldComponentId, ...component}) => {
          oldNewComponentMap[oldComponentId] = ComponentsCollection.insert({...component, userId, appId})
        })
      // Remap pageIds
      Object.entries(oldNewPageMap).forEach(([oldId, newId]) => {
        ElementsCollection.update(
          {appId, pageId: oldId},
          {
            $set: {
              pageId: newId,
            },
          },
          {multi: true},
        )
      })
      // Remap componentIds
      Object.entries(oldNewComponentMap).forEach(([oldId, newId]) => {
        PagesCollection.update(
          {appId, layoutComponentId: oldId},
          {
            $set: {
              layoutComponentId: newId,
            },
          },
          {multi: true},
        )
        ElementsCollection.update(
          {appId, componentId: oldId},
          {
            $set: {
              componentId: newId,
            },
          },
          {multi: true},
        )
        SelectorsCollection.update(
          {appId, componentId: oldId},
          {
            $set: {
              componentId: newId,
            },
          },
          {multi: true},
        )
      })
      // Remap elementIds
      Object.entries(oldNewElementMap).forEach(([oldId, newId]) => {
        ComponentsCollection.update(
          {appId, childrenContainerElementId: oldId},
          {$set: {childrenContainerElementId: newId}},
          {multi: true},
        )
        ElementsCollection.update({appId, parentId: oldId}, {$set: {parentId: newId}}, {multi: true})
      })
    }
    return appId
  },
  ['apps.update'](_id, app) {
    if (!app?.name) return
    const existingPageName = AppsCollection.find({_id: {$ne: _id}, name: app.name}).fetch()
    if (existingPageName?.length > 0) {
      throw new Meteor.Error('app name already exists')
    }
    return AppsCollection.update(_id, {$set: app})
  },
  ['apps.remove'](appId) {
    ElementsCollection.remove({appId})
    ComponentsCollection.remove({appId})
    ThemesCollection.remove({appId})
    SelectorsCollection.remove({appId})
    PagesCollection.remove({appId})
    return AppsCollection.remove(appId)
  },
})
