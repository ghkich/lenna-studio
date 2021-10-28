import {Mongo} from 'meteor/mongo'
import {COLLECTION_NAMES} from '../infra/constants/collection-names'
import SimpleSchema from 'simpl-schema'
import {STRUCTURE_TYPES} from '../infra/constants/structure-types'
import {timestampsSchema} from '../schemas/timestamps'

export const ElementSchema = new SimpleSchema({
  appId: SimpleSchema.RegEx.Id,
  pageId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  componentId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  tagName: {
    type: String,
    optional: true,
  },
  text: {
    type: String,
    optional: true,
  },
  attrs: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  parentId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  structure: {
    type: Object,
    optional: true,
  },
  'structure.index': SimpleSchema.Integer,
  'structure.type': {
    type: String,
    allowedValues: Object.values(STRUCTURE_TYPES),
  },
}).extend(timestampsSchema)

export const ElementsCollection = new Mongo.Collection(COLLECTION_NAMES.ELEMENTS)
