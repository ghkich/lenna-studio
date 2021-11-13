import {AppsCollection} from '../../../collections/apps'

Meteor.publish('apps.byId', function (_id) {
  if (!this.userId) {
    return this.ready()
  }
  return AppsCollection.find(_id)
})
