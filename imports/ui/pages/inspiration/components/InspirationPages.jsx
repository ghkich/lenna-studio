import React, {useState} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {PagesCollection} from '../../../../collections/pages'
import {Select} from '../../../components/Select'
import {PAGE_CATEGORIES} from '../../../../infra/constants/page-categories'
import {PagesList} from '../../../components/PagesList'
import {ElementsTree} from '../../../components/ElementsTree'
import {ElementsCollection} from '../../../../collections/elements'

export const InspirationPages = () => {
  const [selectedPageCategory, setSelectedPageCategory] = useState(PAGE_CATEGORIES.LANDING)
  const [selectedPageId, setSelectedPageId] = useState()

  const {pages} = useTracker(() => {
    if (!selectedPageCategory) return {}
    const sub = Meteor.subscribe('pages.byCategory', {category: selectedPageCategory})
    const pages = PagesCollection.find({category: selectedPageCategory}).fetch()

    setSelectedPageId(pages?.[0]?._id)

    return {
      pages,
      status: sub.ready() ? 'ready' : 'loading',
    }
  }, [selectedPageCategory])

  const {elements} = useTracker(() => {
    if (!selectedPageId) return {}
    const sub = Meteor.subscribe('elements.byPageId', {pageId: selectedPageId})
    const elements = ElementsCollection.find().fetch()

    return {
      elements,
      status: sub.ready() ? 'ready' : 'loading',
    }
  }, [selectedPageId])

  return (
    <div>
      <div className="my-2">
        <Select
          value={selectedPageCategory}
          onChange={(e) => setSelectedPageCategory(e.target.value)}
          options={Object.values(PAGE_CATEGORIES).map((value) => ({value, label: value}))}
        />
      </div>
      <PagesList pages={pages} selectedPageId={selectedPageId} onSelectPage={(pageId) => setSelectedPageId(pageId)} />
      <div className="mb-2" />
      <ElementsTree elements={elements} />
      <div className="flex flex-col mt-2 gap-1 pt-2 border-t">
        <button type="button" className="p-2 flex-1 bg-gray-500 text-white hover:bg-gray-400">
          Copy to my app
        </button>
        <button type="button" className="p-2 flex-1 bg-gray-500 text-white hover:bg-gray-400">
          Create a new app
        </button>
      </div>
    </div>
  )
}
