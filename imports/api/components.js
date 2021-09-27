import {Mongo} from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import {ComponentCategories} from '../infra/data/components-data'

const COLLECTION_NAME = 'components'

const Collection = new Mongo.Collection(COLLECTION_NAME)

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

export const ComponentSchema = new SimpleSchema({
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
})

const MethodRequests = {
  UPDATE: `${COLLECTION_NAME}.UPDATE`,
  INSERT: `${COLLECTION_NAME}.INSERT`,
}

const Methods = {
  [MethodRequests.INSERT](component) {
    ComponentSchema?.validate(component)
    return Collection.insert(component)
  },
  [MethodRequests.UPDATE]({_id, ...component}) {
    if (!_id) {
      throw new Error('component._id is undefined')
    }
    ComponentSchema?.validate(component)
    return Collection.update(_id, {$set: {...component}})
  },
}

export const ComponentsCollection = Collection
export const ComponentsMethodRequests = MethodRequests
export const ComponentsMethods = Methods

export const ComponentsSubscriptions = {
  byAppId: 'components.byAppId',
  byCategory: 'components.byCategory',
}

export const RegisterComponentsPublications = () => {
  Meteor.publish(ComponentsSubscriptions.byAppId, function ({appId} = {}) {
    if (!this.userId) {
      return this.ready()
    }

    new SimpleSchema({
      appId: String,
    })?.validate({appId})

    return Collection.find({
      userId: this.userId,
      appId,
    })
  })

  Meteor.publish(ComponentsSubscriptions.byCategory, function ({appId, category} = {}) {
    if (!this.userId) {
      return this.ready()
    }

    new SimpleSchema({
      appId: String,
      category: {
        type: String,
        allowedValues: ['', ...Object.values(ComponentCategories)],
      },
    })?.validate({appId, category})

    return Collection.find({
      userId: this.userId,
      appId,
      category,
    })
  })
}
