import React from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {ComponentsCollection} from '../../../api/components'

export const useComponents = () =>
  useTracker(() => {
    const subscription = Meteor.subscribe('components')
    const components = ComponentsCollection.find()
    return {
      data: components,
      status: !subscription.ready() ? 'loading' : 'ready',
    }
  }, [])

export const Components = () => {
  const components = useComponents()

  return (
    <div>
      {components?.data?.map((comp) => (
        <div>{comp.name}</div>
      ))}
    </div>
  )
}
