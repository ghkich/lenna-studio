import React, {useState} from 'react'
import {SidebarLayout} from '../../layouts/SidebarLayout'
import {useTracker} from 'meteor/react-meteor-data'
import {APP_CATEGORIES} from '../../../infra/constants/app-categories'
import {Select} from '../../components/Select'
import {AppsCollection} from '../../../collections/apps'

const INSPIRATION_TYPES = {
  APPS: 'apps',
  PAGES: 'pages',
  COMPONENTS: 'components',
}

export const InspirationPage = () => {
  const [selectedInspirationType, setSelectedInspirationType] = useState(INSPIRATION_TYPES.APPS)
  const [selectedAppCategory, setSelectedAppCategory] = useState(APP_CATEGORIES.ADMIN)
  const [selectedAppId, setSelectedAppId] = useState()

  const {apps} = useTracker(() => {
    if (!selectedAppCategory) return {}
    const sub = Meteor.subscribe('apps.byCategory', {category: selectedAppCategory})
    const apps = AppsCollection.find({category: selectedAppCategory}).fetch()

    return {
      apps,
      status: sub.ready() ? 'ready' : 'loading',
    }
  }, [selectedAppCategory])

  return (
    <SidebarLayout>
      <div className="flex border border-r-0">
        {Object.values(INSPIRATION_TYPES).map((inspirationType) => (
          <div
            key={inspirationType}
            className={`flex-1 border-r text-center py-1 capitalize cursor-pointer ${
              inspirationType === selectedInspirationType ? 'bg-blue-50 text-blue-500' : ''
            }`}
            onClick={() => setSelectedInspirationType(inspirationType)}
          >
            {inspirationType}
          </div>
        ))}
      </div>
      <div className="my-2">
        <Select
          value={selectedAppCategory}
          onChange={(e) => setSelectedAppCategory(e.target.value)}
          options={Object.values(APP_CATEGORIES).map((value) => ({value, label: value}))}
        />
      </div>
      <div className="mb-2">
        <Select
          value={selectedAppId}
          onChange={(e) => setSelectedAppId(e.target.value)}
          options={apps?.map(({_id, name}) => ({value: _id, label: name}))}
        />
      </div>
    </SidebarLayout>
  )
}
