import {ComponentsCollection} from '../../../collections/components'

Meteor.publish('components.byCategory', function ({category} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  return ComponentsCollection.find({category})
})
