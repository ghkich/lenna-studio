import {AppsCollection} from '../../../collections/apps'
import {ElementsCollection} from '../../../collections/elements'
import {ComponentsCollection} from '../../../collections/components'
import {ThemesCollection} from '../../../collections/themes'
import {SelectorsCollection} from '../../../collections/selectors'
import {PagesCollection} from '../../../collections/pages'

Meteor.methods({
  ['apps.create'](app) {
    if (!app?.name) return
    const existingAppName = AppsCollection.find({name: app.name}).fetch()
    if (existingAppName?.length > 0) {
      throw new Meteor.Error('app name already exists')
    }
    return AppsCollection.insert({...app, userId: this.userId})
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
