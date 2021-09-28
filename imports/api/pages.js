import {Api} from './api'

export const PagesApi = new Api({
  collectionName: 'pages',
  collectionSchema: {
    name: String,
    path: String,
    elementId: {
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
