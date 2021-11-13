import {ComponentsCollection} from '../../../collections/components'

Meteor.publish('components.byCategory', function ({appId, category} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  return ComponentsCollection.find({appId, category})
})
