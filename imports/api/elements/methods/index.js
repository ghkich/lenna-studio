import {ElementsCollection} from '../../../collections/elements'

Meteor.methods({
  ['elements.create'](element) {
    return ElementsCollection.insert(element)
  },
  ['elements.remove'](_id) {
    return ElementsCollection.remove(_id)
  },
})
