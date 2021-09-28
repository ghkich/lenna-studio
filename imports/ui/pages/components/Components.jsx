import React from 'react'
import {ComponentsApi} from '../../../api/components'
import {useAppContext} from '../../app/AuthContext'

export const Components = () => {
  const {state} = useAppContext()
  const {data} = ComponentsApi.usePublicationData({
    publicationKey: 'byAppId',
    terms: {appId: state.selectedAppId},
  })

  return (
    <div>
      {data?.map((comp) => (
        <div>{comp.name}</div>
      ))}
    </div>
  )
}
