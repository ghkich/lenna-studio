import {Mongo} from 'meteor/mongo'
import {COLLECTION_NAMES} from '../infra/constants/collection-names'
import SimpleSchema from 'simpl-schema'
import {timestampsSchema} from '../schemas/timestamps'

export const SelectorSchema = new SimpleSchema({
  appId: {
    type: SimpleSchema.RegEx.Id,
    optional: true,
  },
  componentId: SimpleSchema.RegEx.Id,
  value: {
    type: String,
    optional: true,
  },
  classes: {
    type: Array,
    optional: true,
  },
  'classes.$': {
    type: String,
    optional: true,
  },
  classesByStyles: {
    type: Array,
    optional: true,
  },
  'classesByStyles.$': {
    type: Object,
    optional: true,
  },
  'classesByStyles.$.style': String,
  'classesByStyles.$.classes': {
    type: Array,
    optional: true,
  },
  'classesByStyles.$.classes.$': {
    type: String,
    optional: true,
  },
  classesByStates: {
    type: Array,
    optional: true,
  },
  'classesByStates.$': {
    type: Object,
    optional: true,
  },
  'classesByStates.$.state': String,
  'classesByStates.$.classes': {
    type: Array,
    optional: true,
  },
  'classesByStates.$.classes.$': {
    type: String,
    optional: true,
  },
}).extend(timestampsSchema)

export const SelectorsCollection = new Mongo.Collection(COLLECTION_NAMES.SELECTORS)
