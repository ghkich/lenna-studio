import {Mongo} from 'meteor/mongo'
import {COLLECTION_NAMES} from '../infra/constants/collection-names'
import SimpleSchema from 'simpl-schema'

export const PageSchema = new SimpleSchema({
  appId: SimpleSchema.RegEx.Id,
  name: String,
  path: String,
})

export const PagesCollection = new Mongo.Collection(COLLECTION_NAMES.PAGES)
