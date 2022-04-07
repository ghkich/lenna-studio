import React, {useEffect, useState} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {PagesCollection} from '../../../../collections/pages'
import {Select} from '../../../components/basic/Select'
import {APP_CATEGORIES} from '../../../../infra/constants/app-categories'
import {AppsCollection} from '../../../../collections/apps'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye} from '@fortawesome/pro-solid-svg-icons'

export const CopyExistingApps = ({onAppSelect, onPageClick, onPageCheck}) => {
  const [selectedAppCategory, setSelectedAppCategory] = useState('')
  const [selectedAppId, setSelectedAppId] = useState()
  const [pagesCheckedState, setPagesCheckedState] = useState({})
  const [selectedPage, setSelectedPage] = useState()

  useEffect(() => {
    onPageCheck(
      Object.entries(pagesCheckedState)
        .map(([pageId, isChecked]) => (isChecked ? pageId : undefined))
        .filter(Boolean),
    )
    return () => {
      onPageCheck([])
    }
  }, [pagesCheckedState])

  useEffect(() => {
    onAppSelect(selectedAppId)
  }, [selectedAppId])

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

    setPagesCheckedState({})

    return {
      pages,
      loading: !sub.ready(),
    }
  }, [selectedAppId])

  const handleCheckPage = (e) => {
    const pageId = e.target.name
    const isChecked = e.target.checked
    setPagesCheckedState((prev) => ({...prev, [pageId]: isChecked}))
  }

  const handleSelectPage = (page) => {
    setSelectedPage(page)
    onPageClick(page)
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
            <div className="relative" key={page._id}>
              <label
                className="flex items-center border mb-0.5 px-2 py-1.5 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSelectPage(page)}
              >
                <input
                  type="checkbox"
                  name={page._id}
                  checked={pagesCheckedState[page._id] || false}
                  onChange={handleCheckPage}
                  className="mr-1.5"
                />
                <span>{page.name}</span>
              </label>
              <button
                type="button"
                onClick={() => handleSelectPage(page)}
                className="py-1 px-3 text-xs text-gray-300 rounded absolute right-0 top-1"
              >
                <FontAwesomeIcon icon={faEye} className={selectedPage?._id === page?._id ? 'text-purple-500' : ''} />
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
