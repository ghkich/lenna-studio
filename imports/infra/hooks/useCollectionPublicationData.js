import {useTracker} from 'meteor/react-meteor-data'

export const useCollectionPublicationData = ({collection, publicationName, terms}, dependencies) =>
  useTracker(() => {
    const sub = Meteor.subscribe(publicationName, terms)
    const data = collection.find().fetch()

    return {
      data,
      status: !sub.ready() ? 'loading' : 'ready',
    }
  }, [...dependencies])
