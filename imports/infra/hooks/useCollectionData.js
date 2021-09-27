import {useTracker} from 'meteor/react-meteor-data'

export const useCollectionData = ({collection, subscription, terms}, dependencies) =>
  useTracker(() => {
    const sub = Meteor.subscribe(subscription, terms)
    const data = collection.find().fetch()

    console.log(data)

    return {
      data,
      status: !sub.ready() ? 'loading' : 'ready',
    }
  }, [...dependencies])
