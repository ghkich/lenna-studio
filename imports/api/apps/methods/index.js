import {AppsCollection} from '../../../collections/apps'

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
})
