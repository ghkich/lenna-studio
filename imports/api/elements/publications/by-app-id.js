import {ElementsCollection} from '../../../collections/elements'

Meteor.publish('elements.byAppId', function ({appId} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  return ElementsCollection.find({appId})
})
