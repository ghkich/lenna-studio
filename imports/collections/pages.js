import {Mongo} from 'meteor/mongo'
import {COLLECTION_NAMES} from '../infra/constants/collection-names'
import SimpleSchema from 'simpl-schema'
import {PAGE_CATEGORIES} from '../infra/constants/page-categories'

export const PageSchema = new SimpleSchema({
  userId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  appId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  category: {
    type: String,
    allowedValues: Object.values(PAGE_CATEGORIES),
    optional: true,
  },
  name: String,
  path: String,
})

export const PagesCollection = new Mongo.Collection(COLLECTION_NAMES.PAGES)
