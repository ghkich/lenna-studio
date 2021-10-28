import {PagesCollection} from '../../../collections/pages'

Meteor.publish('pages.byId', function ({pageId} = {}) {
  if (!this.userId) {
    return this.ready()
  }
  return PagesCollection.find({_id: pageId})
})
