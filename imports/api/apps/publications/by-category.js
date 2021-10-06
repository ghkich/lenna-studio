import {AppsCollection} from '../../../collections/apps'

Meteor.publish('apps.byCategory', function ({category}) {
  return AppsCollection.find({category})
})
