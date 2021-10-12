import {AppsCollection} from '../../../collections/apps'

Meteor.publish('apps.byCategory', function ({category} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  return AppsCollection.find({category})
})
