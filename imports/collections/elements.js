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
  parentId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  component: {
    type: Object,
    optional: true,
  },
  'component._id': {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  'component.style': {
    type: String,
    optional: true,
  },
  'component.state': {
    type: String,
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
  structure: {
    type: Object,
    optional: true,
  },
  'structure.type': {
    type: String,
    allowedValues: Object.values(STRUCTURE_TYPES),
  },
}).extend(timestampsSchema)

export const ElementsCollection = new Mongo.Collection(COLLECTION_NAMES.ELEMENTS)
