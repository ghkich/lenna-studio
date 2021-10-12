import {PagesCollection} from '../../../collections/pages'

Meteor.publish('pages.byCategory', function ({category} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  return PagesCollection.find({category})
})
