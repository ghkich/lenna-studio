import {ComponentCategories} from '../infra/data/components-data'
import {Api} from './api'
import SimpleSchema from 'simpl-schema'

const SelectorSchema = new SimpleSchema({
  value: String,
  classes: [String],
})

const VariantSchema = new SimpleSchema({
  selectors: {
    type: Array,
    optional: true,
  },
  'selectors.$': SelectorSchema,
})

export const ComponentsApi = new Api({
  collectionName: 'components',
  collectionSchema: {
    tag: String,
    name: String,
    children: {
      type: Array,
      optional: true,
    },
    'children.$': {
      type: Object,
      blackbox: true,
    },
    category: {
      type: String,
      allowedValues: Object.values(ComponentCategories),
    },
    selectors: {
      type: Array,
      optional: true,
    },
    'selectors.$': SelectorSchema,
    variants: {
      type: Object,
      optional: true,
    },
    'variants.styles': {
      type: Array,
      optional: true,
    },
    'variants.styles.$': VariantSchema,
    'variants.states': {
      type: Array,
      optional: true,
    },
    'variants.states.$': VariantSchema,
  },
  publications: {
    byAppId: {
      schema: {
        appId: String,
      },
    },
  },
})
