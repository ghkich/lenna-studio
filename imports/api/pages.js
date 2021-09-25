import {Mongo} from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

export const PagesCollection = new Mongo.Collection('pages')

PagesCollection.schema = new SimpleSchema({
  name: String,
  path: String,
  children: {
    type: Array,
    optional: true,
  },
  'children.$': Object,
})
