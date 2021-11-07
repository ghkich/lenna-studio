import {ThemesCollection} from '../../../collections/themes'

Meteor.methods({
  ['themes.create'](page) {
    if (!page?.name) return
    const existingPageName = ThemesCollection.find({appId: page?.appId, name: page.name}).fetch()
    if (existingPageName?.length > 0) {
      throw new Meteor.Error('page name already exists')
    }
    const terms = {...page, userId: this.userId}
    return ThemesCollection.insert(terms)
  },
  ['themes.update']({_id, ...page}) {
    if (!page?.name) return
    const existingPageName = ThemesCollection.find({_id: {$ne: _id}, appId: page?.appId, name: page.name}).fetch()
    if (existingPageName?.length > 0) {
      throw new Meteor.Error('page name already exists')
    }
    return ThemesCollection.update(_id, {$set: page})
  },
  ['themes.remove'](_id) {
    return ThemesCollection.remove(_id)
  },
})
