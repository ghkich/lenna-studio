import React, {useState} from 'react'
import {useCollectionData} from '../../../infra/hooks/useCollectionData'
import {ComponentsCollection, ComponentsSubscriptions} from '../../../api/components'
import {Select} from '../../components/Select'
import {ComponentCategories} from '../../../infra/data/components'
import {useAppContext} from '../../app/AuthContext'

export const Components = () => {
  const {state} = useAppContext()

  const {data} = useCollectionData(
    {
      collection: ComponentsCollection,
      subscription: selectedCategory ? ComponentsSubscriptions.byCategory : ComponentsSubscriptions.byAppId,
      terms: {appId: state.selectedAppId, category: selectedCategory},
    },
    [selectedCategory],
  )

  return (
    <div>
      <Select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        options={Object.values(ComponentCategories).map((cat) => ({label: cat, value: cat}))}
      />
      {data?.map((comp) => (
        <div>{comp.name}</div>
      ))}
    </div>
  )
}
