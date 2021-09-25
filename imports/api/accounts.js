import {Mongo} from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

export const AccountsCollection = new Mongo.Collection('account')

AccountsCollection.schema = new SimpleSchema({
  theme: String,
})
