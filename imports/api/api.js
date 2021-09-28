import {Mongo} from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import {useCollectionPublicationData} from '../infra/hooks/useCollectionPublicationData'

export class Api {
  constructor({collectionName, collectionSchema, publications}) {
    this.collection = new Mongo.Collection(collectionName)
    this._collectionSchema = new SimpleSchema(collectionSchema)
    this.methodRequests = {
      UPDATE: `${collectionName}.UPDATE`,
      INSERT: `${collectionName}.INSERT`,
    }
    this._publications = Object.entries(publications)
    this._getPublicationNameByKey = function (publicationKey) {
      return `${collectionName}.${publicationKey}`
    }
  }

  getMethods() {
    return {
      [this.methodRequests.INSERT](doc) {
        this._collectionSchema?.validate(doc)
        return this.collection.insert(doc)
      },
      [this.methodRequests.UPDATE]({_id, ...doc}) {
        if (!_id) {
          throw new Error(`[${this.collectionName}] _id is undefined`)
        }
        this._collectionSchema?.validate(doc)
        return this.collection.update(_id, {$set: {...doc}})
      },
    }
  }

  registerPublications() {
    this._publications.forEach(([publicationKey, publication]) => {
      Meteor.publish(this._getPublicationNameByKey(publicationKey), function (terms = {}) {
        if (!this.userId) {
          return this.ready()
        }
        new SimpleSchema(publication.schema)?.validate(terms)
        return this.collection.find({
          userId: this.userId,
          ...terms,
        })
      })
    })
  }

  usePublicationData({publicationKey, terms} = {}, dependencies) {
    return useCollectionPublicationData(
      {
        collection: this.collection,
        publicationName: this._getPublicationNameByKey(publicationKey),
        terms,
      },
      dependencies || Object.values(terms),
    )
  }
}
