import React, {useState} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {PagesCollection} from '../../../../collections/pages'
import {Select} from '../../../components/basic/Select'
import {APP_CATEGORIES} from '../../../../infra/constants/app-categories'
import {AppsCollection} from '../../../../collections/apps'

export const InspirationApps = () => {
  const [selectedAppCategory, setSelectedAppCategory] = useState('')
  const [selectedAppId, setSelectedAppId] = useState()
  const [checkedPageIds, setCheckedPageIds] = useState({})

  const {apps} = useTracker(() => {
    if (!selectedAppCategory) return {}
    const sub = Meteor.subscribe('apps.byCategory', {category: selectedAppCategory})
    const apps = AppsCollection.find({category: selectedAppCategory}).fetch()

    setSelectedAppId(apps?.[0]?._id)

    return {
      apps,
      loading: !sub.ready(),
    }
  }, [selectedAppCategory])

  const {pages} = useTracker(() => {
    if (!selectedAppId) return {}
    const sub = Meteor.subscribe('pages.byAppId', {appId: selectedAppId})
    const pages = PagesCollection.find({appId: selectedAppId}).fetch()

    setCheckedPageIds({})

    return {
      pages,
      loading: !sub.ready(),
    }
  }, [selectedAppId])

  const handlePageCheck = (e) => {
    const pageId = e.target.name
    const isChecked = e.target.checked
    setCheckedPageIds((prev) => ({...prev, [pageId]: isChecked}))
  }

  return (
    <div>
      <div className="mb-2">
        <Select
          value={selectedAppCategory}
          onChange={(e) => setSelectedAppCategory(e.target.value)}
          options={[
            {value: '', label: 'Choose an app category...'},
            ...Object.values(APP_CATEGORIES).map((value) => ({value, label: value})),
          ]}
        />
      </div>
      {selectedAppCategory && (
        <>
          <div className="mb-2">
            <Select
              value={selectedAppId}
              onChange={(e) => setSelectedAppId(e.target.value)}
              options={apps?.map(({_id, name}) => ({value: _id, label: name}))}
            />
          </div>

          {pages?.map((page) => (
            <label
              key={page._id}
              className="flex items-center border mb-0.5 px-2 py-1.5 cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                name={page._id}
                checked={checkedPageIds[page._id] || false}
                onChange={handlePageCheck}
                className="mr-1"
              />
              <span> {page.name}</span>
            </label>
          ))}
        </>
      )}
      {/*{Object.values(checkedPageIds)?.some((isChecked) => isChecked) && (*/}
      {/*  <>*/}
      {/*    <div className="flex flex-col mt-2 gap-1 pt-2 border-t">*/}
      {/*      <button type="button" className="p-2 flex-1 bg-gray-500 text-white hover:bg-gray-400">*/}
      {/*        Copy to my app*/}
      {/*      </button>*/}
      {/*      <button type="button" className="p-2 flex-1 bg-gray-500 text-white hover:bg-gray-400">*/}
      {/*        Create a new app*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  )
}
