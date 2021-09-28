import {Api} from './api'

export const ElementsApi = new Api({
  collectionName: 'elements',
  collectionSchema: {
    tag: String,
    attributes: {
      type: Object,
      optional: true,
    },
    'attributes.class': {
      type: String,
      optional: true,
    },
    component: {
      type: Object,
      optional: true,
    },
    'component.name': String,
    'component.style': {
      type: String,
      optional: true,
    },
    'component.state': {
      type: String,
      optional: true,
    },
  },
  publications: {
    byAppId: {
      schema: {
        appId: String,
      },
    },
  },
})
