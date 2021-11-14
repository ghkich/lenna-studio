import {ComponentsCollection} from '../../../collections/components'

Meteor.publish('components.byAppId', function ({appId} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  return ComponentsCollection.find({appId})
})
