import {PagesCollection} from '../../../collections/pages'
import {ElementsCollection} from '../../../collections/elements'

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
  ['pages.remove'](pageId) {
    ElementsCollection.remove({pageId})
    return PagesCollection.remove(pageId)
  },
  ['pages.findByPath']({appId, path}) {
    return PagesCollection.findOne({appId, path})
  },
})
