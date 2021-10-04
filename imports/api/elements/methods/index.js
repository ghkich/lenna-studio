import {ElementsCollection} from '../../../collections/elements'

Meteor.methods({
  ['elements.create'](element) {
    return ElementsCollection.insert(element)
  },
})
