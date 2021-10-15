import {AppsCollection} from '../../../collections/apps'

Meteor.methods({
  ['apps.create'](app) {
    console.log(app)
    if (!app?.name) return
    const existingAppName = AppsCollection.find({name: app.name}).fetch()
    console.log(existingAppName)

    if (existingAppName?.length > 0) {
      throw new Meteor.Error('app name already exists')
    }
    return AppsCollection.insert({...app, userId: this.userId})
  },
})
