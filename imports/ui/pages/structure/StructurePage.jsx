import React, {useState} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {PagesCollection} from '../../../collections/pages'
import {useAppContext} from '../../app/AuthContext'
import {ElementsCollection} from '../../../collections/elements'
import {SidebarLayout} from '../../layouts/SidebarLayout'
import {ElementsTree} from '../../components/ElementsTree'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faTrashCan} from '@fortawesome/pro-solid-svg-icons'
import {useMethod} from '../../../infra/hooks/useMethod'
import {faArrowRightArrowLeft} from '@fortawesome/pro-duotone-svg-icons'
import {STRUCTURE_TYPES} from '../../../infra/constants/structure-types'
import {ElementsPreview} from '../../components/ElementsPreview'

export const StructurePage = () => {
  const {state} = useAppContext()
  const [selectedPageId, setSelectedPageId] = useState()
  const [pageSearchValue, setPageSearchValue] = useState('')
  const [addPageMode, setAddPageMode] = useState()
  const [pageName, setPageName] = useState('')
  const [pagePath, setPagePath] = useState('')
  const [structureType, setStructureType] = useState()

  const {pages} = useTracker(() => {
    if (!state.selectedAppId) return {}
    const sub = Meteor.subscribe('pages.byAppId', {appId: state.selectedAppId})
    const pages = PagesCollection.find({
      name: {$regex: pageSearchValue, $options: 'i'},
    }).fetch()

    return {
      pages,
      status: sub.ready() ? 'ready' : 'loading',
    }
  }, [state.selectedAppId, pageSearchValue])

  const {elements} = useTracker(() => {
    if (!selectedPageId || !structureType) return {}
    const sub = Meteor.subscribe('elements.byPageId', {pageId: selectedPageId, structureType})
    const elements = ElementsCollection.find().fetch()

    return {
      elements,
      status: sub.ready() ? 'ready' : 'loading',
    }
  }, [selectedPageId, structureType])

  const createPage = useMethod('pages.create', {
    onSuccess: () => {
      setPagePath('')
      setPageName('')
      setAddPageMode(false)
    },
  })

  const removePage = useMethod('pages.remove')

  const handleCreatePage = () => {
    createPage.call({
      appId: state.selectedAppId,
      name: pageName,
      path: pagePath,
    })
  }

  const handleRemovePage = (pageId) => {
    removePage.call(pageId)
  }

  return (
    <SidebarLayout contentComponent={<ElementsPreview elements={elements} />}>
      <div className="flex">
        <div className="flex-1">
          <div className="">
            <input
              type="text"
              placeholder="Pages"
              value={pageSearchValue}
              onChange={(e) => setPageSearchValue(e.target.value)}
              className="py-2 w-full outline-none"
            />
          </div>
        </div>
        <div className="">
          <button
            type="button"
            className="w-6 h-6 border rounded-sm hover:bg-gray-100"
            onClick={() => setAddPageMode((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faPlus} className="p-0" />
          </button>
        </div>
      </div>
      {addPageMode && (
        <div className="flex">
          <input
            type="text"
            placeholder="name"
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            className="py-2 w-full outline-none"
          />
          <input
            type="text"
            placeholder="path"
            value={pagePath}
            onChange={(e) => setPagePath(e.target.value)}
            className="py-2 w-full outline-none"
          />
          <button type="button" onClick={handleCreatePage}>
            Create
          </button>
        </div>
      )}
      <div className="border-b">
        {pages?.map((page) => (
          <button
            key={page._id}
            type="button"
            className={`flex border border-b-0 px-2 py-1 w-full text-left ${
              page._id === selectedPageId ? 'bg-blue-50 text-blue-500' : ''
            }`}
            onClick={() => setSelectedPageId((prev) => (prev === page._id ? undefined : page._id))}
          >
            <div className="flex-1">{page.name}</div>
            <div onClick={() => handleRemovePage(page._id)} className="opacity-25 hover:opacity-75">
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          </button>
        ))}
      </div>
      {selectedPageId && (
        <div className="my-2 flex">
          <div
            className={`p-2 flex-1 bg-gray-100 border text-center cursor-pointer ${
              structureType === STRUCTURE_TYPES.ACTUAL ? 'text-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => setStructureType(STRUCTURE_TYPES.ACTUAL)}
          >
            Actual
          </div>
          <div
            className={`px-4 flex items-center border mx-1.5 bg-gray-100 cursor-pointer text-md ${
              structureType === undefined ? 'text-white bg-blue-500' : ''
            }`}
            onClick={() => setStructureType(undefined)}
          >
            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
          </div>
          <div
            className={`p-2 flex-1 bg-gray-100 border text-center cursor-pointer ${
              structureType === STRUCTURE_TYPES.EXPECTED ? 'text-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => setStructureType(STRUCTURE_TYPES.EXPECTED)}
          >
            Expected
          </div>
        </div>
      )}
      <ElementsTree elements={elements} />
    </SidebarLayout>
  )
}
