import {ComponentsCollection} from '../../../collections/components'

Meteor.publish('components.byIds', function (componentIds = []) {
  if (!this.userId) {
    return this.ready()
  }
  return ComponentsCollection.find({_id: {$in: componentIds}})
})
