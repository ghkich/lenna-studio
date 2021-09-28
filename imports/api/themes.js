import {Api} from './api'

export const ThemesApi = new Api({
  collectionName: 'themes',
  collectionSchema: {
    name: String,
  },
  publications: {
    byAppId: {
      schema: {
        appId: String,
      },
    },
  },
})
