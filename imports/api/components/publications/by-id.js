import {ComponentsCollection} from '../../../collections/components'

Meteor.publish('components.byId', function ({componentId} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  return ComponentsCollection.find({_id: componentId})
})
