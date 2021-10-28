import {Mongo} from 'meteor/mongo'
import {COLLECTION_NAMES} from '../infra/constants/collection-names'
import SimpleSchema from 'simpl-schema'
import {PAGE_CATEGORIES} from '../infra/constants/page-categories'
import {timestampsSchema} from '../schemas/timestamps'

export const PageSchema = new SimpleSchema({
  userId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  appId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  layoutComponentId: {
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
}).extend(timestampsSchema)

export const PagesCollection = new Mongo.Collection(COLLECTION_NAMES.PAGES)
