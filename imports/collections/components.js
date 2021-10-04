import {Mongo} from 'meteor/mongo'
import {COLLECTION_NAMES} from '../infra/constants/collection-names'
import {COMPONENT_CATEGORIES} from '../infra/constants/component-categories'
import SimpleSchema from 'simpl-schema'

export const ComponentSchema = new SimpleSchema({
  userId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  appId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  name: String,
  category: {
    type: String,
    allowedValues: Object.values(COMPONENT_CATEGORIES),
  },
  styles: {
    type: Array,
    optional: true,
  },
  'styles.$': String,
  states: {
    type: Array,
    optional: true,
  },
  'states.$': String,
})

export const ComponentsCollection = new Mongo.Collection(COLLECTION_NAMES.COMPONENTS)
