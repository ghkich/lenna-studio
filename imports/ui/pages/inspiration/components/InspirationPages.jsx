import React, {useState} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {PagesCollection} from '../../../../collections/pages'
import {Select} from '../../../components/basic/Select'
import {PAGE_CATEGORIES} from '../../../../infra/constants/page-categories'
import {PagesList} from '../../../components/PagesList'

export const InspirationPages = () => {
  const [selectedPageCategory, setSelectedPageCategory] = useState(PAGE_CATEGORIES.LANDING)
  const [selectedPageId, setSelectedPageId] = useState()

  const {pages} = useTracker(() => {
    const sub = Meteor.subscribe('pages.byCategory', {category: selectedPageCategory})
    const pages = PagesCollection.find({category: selectedPageCategory}).fetch()

    setSelectedPageId(pages?.[0]?._id)

    return {
      pages,
      status: sub.ready() ? 'ready' : 'loading',
    }
  }, [selectedPageCategory])

  return (
    <div>
      <div className="mb-2">
        <Select
          value={selectedPageCategory}
          onChange={(e) => setSelectedPageCategory(e.target.value)}
          options={[
            {value: '', label: 'Choose a category...'},
            ...Object.values(PAGE_CATEGORIES).map((category) => ({value: category, label: category})),
          ]}
        />
      </div>
      <PagesList pages={pages} selectedPageId={selectedPageId} onSelectPage={(pageId) => setSelectedPageId(pageId)} />
    </div>
  )
}
