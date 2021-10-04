import {Mongo} from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import {COLLECTION_NAMES} from '../infra/constants/collection-names'
import {APP_CATEGORIES} from '../infra/constants/app-categories'

export const AppSchema = new SimpleSchema({
  userId: SimpleSchema.RegEx.Id,
  themeId: SimpleSchema.RegEx.Id,
  name: String,
  category: {
    type: String,
    allowedValues: Object.values(APP_CATEGORIES),
  },
})

export const AppsCollection = new Mongo.Collection(COLLECTION_NAMES.APPS)
