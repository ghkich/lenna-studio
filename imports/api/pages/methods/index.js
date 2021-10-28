import {PagesCollection} from '../../../collections/pages'

Meteor.methods({
  ['pages.create'](page) {
    if (!page?.name) return
    const existingPageName = PagesCollection.find({appId: page?.appId, name: page.name}).fetch()
    if (existingPageName?.length > 0) {
      throw new Meteor.Error('page name already exists')
    }
    const terms = {...page, userId: this.userId}
    return PagesCollection.insert(terms)
  },
  ['pages.update']({_id, ...page}) {
    if (!page?.name) return
    const existingPageName = PagesCollection.find({_id: {$ne: _id}, appId: page?.appId, name: page.name}).fetch()
    if (existingPageName?.length > 0) {
      throw new Meteor.Error('page name already exists')
    }
    return PagesCollection.update(_id, {$set: page})
  },
  ['pages.remove'](_id) {
    return PagesCollection.remove(_id)
  },
})
