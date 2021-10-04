import {PagesCollection} from '../../../collections/pages'

Meteor.methods({
  ['pages.create'](pages) {
    return PagesCollection.insert(pages)
  },
  ['pages.update']({_id, ...pages}) {
    return PagesCollection.update(_id, {$set: pages})
  },
  ['pages.remove'](_id) {
    return PagesCollection.remove(_id)
  },
})
