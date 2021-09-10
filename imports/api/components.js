import {Mongo} from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

export const ComponentsCollection = new Mongo.Collection('components')

ComponentsCollection.schema = new SimpleSchema({
  // typeId: SimpleSchema.RegEx.Id,
  name: String,
  classes: [String],
  selectors: {
    type: Array,
    optional: true,
  },
  'selectors.$': Object,
  'selectors.$.value': String,
  'selectors.$.classes': [String],
  variants: {
    type: Array,
    optional: true,
  },
  'variants.$': String,
})
