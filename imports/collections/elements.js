import {Mongo} from 'meteor/mongo'
import {COLLECTION_NAMES} from '../infra/constants/collection-names'
import SimpleSchema from 'simpl-schema'
import {STRUCTURE_TYPES} from '../infra/constants/structure-types'

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
  childrenIds: {
    type: Array,
    optional: true,
  },
  'childrenIds.$': SimpleSchema.RegEx.Id,
  parentId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  structure: {
    type: Object,
    optional: true,
  },
  'structure.type': {
    type: String,
    allowedValues: Object.values(STRUCTURE_TYPES),
  },
  'structure.index': SimpleSchema.Integer,
})

export const ElementsCollection = new Mongo.Collection(COLLECTION_NAMES.ELEMENTS)
