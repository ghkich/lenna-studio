import {Meteor} from 'meteor/meteor'
import {ComponentsCollection} from '../imports/api/components'
import {INITIAL_COMPONENTS_DATA} from '../imports/infra/data/components'

Meteor.methods({
  'components.insert'(component) {
    ComponentsCollection.insert(component)
  },
})

Meteor.publish('components', function () {
  return ComponentsCollection.find()
})

Meteor.startup(() => {
  if (ComponentsCollection.find().count()) return
  INITIAL_COMPONENTS_DATA.forEach((component) => ComponentsCollection.insert(component))
})
