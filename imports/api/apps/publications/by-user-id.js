import {AppsCollection} from '../../../collections/apps'

Meteor.publish('apps.byUserId', function () {
  if (!this.userId) {
    return this.ready()
  }
  return AppsCollection.find({userId: this.userId})
})
