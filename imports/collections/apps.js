import {Mongo} from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import {COLLECTION_NAMES} from '../infra/constants/collection-names'
import {APP_CATEGORIES} from '../infra/constants/app-categories'
import {timestampsSchema} from '../schemas/timestamps'

export const AppSchema = new SimpleSchema({
  userId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  name: String,
  category: {
    type: String,
    allowedValues: Object.values(APP_CATEGORIES),
    optional: true,
  },
}).extend(timestampsSchema)

export const AppsCollection = new Mongo.Collection(COLLECTION_NAMES.APPS)
