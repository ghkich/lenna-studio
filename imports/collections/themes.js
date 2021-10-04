import {Mongo} from 'meteor/mongo'
import {COLLECTION_NAMES} from '../infra/constants/collection-names'
import SimpleSchema from 'simpl-schema'

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
})

export const ThemesCollection = new Mongo.Collection(COLLECTION_NAMES.THEMES)
