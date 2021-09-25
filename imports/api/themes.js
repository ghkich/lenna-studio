import {Mongo} from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

export const ThemesCollection = new Mongo.Collection('themes')

ThemesCollection.schema = new SimpleSchema({
  name: String,
  colors: Array,
  'colors.$': Object,
  'colors.$.primary': String,
  'colors.$.secondary': String,
})
