import {Mongo} from 'meteor/mongo'
import {COLLECTION_NAMES} from '../infra/constants/collection-names'
import SimpleSchema from 'simpl-schema'
import {timestampsSchema} from '../schemas/timestamps'

export const ThemeSchema = new SimpleSchema({
  userId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  name: String,
  settings: {
    type: Object,
    blackbox: true,
  },
}).extend(timestampsSchema)

export const ThemesCollection = new Mongo.Collection(COLLECTION_NAMES.THEMES)
