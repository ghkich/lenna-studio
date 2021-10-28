import {Mongo} from 'meteor/mongo'
import {COLLECTION_NAMES} from '../infra/constants/collection-names'
import {COMPONENT_CATEGORIES} from '../infra/constants/component-categories'
import SimpleSchema from 'simpl-schema'
import {timestampsSchema} from '../schemas/timestamps'

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
    optional: true,
  },
  childrenContainerElementId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
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
}).extend(timestampsSchema)

export const ComponentsCollection = new Mongo.Collection(COLLECTION_NAMES.COMPONENTS)
