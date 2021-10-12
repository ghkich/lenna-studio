import React, {useState} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {PagesCollection} from '../../../collections/pages'
import {useAppContext} from '../../app/AuthContext'
import {ElementsCollection} from '../../../collections/elements'
import {SidebarLayout} from '../../layouts/SidebarLayout'
import {ElementsTree} from '../../components/ElementsTree'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/pro-solid-svg-icons'
import {useMethod} from '../../../infra/hooks/useMethod'
import {faArrowRightArrowLeft} from '@fortawesome/pro-duotone-svg-icons'
import {STRUCTURE_TYPES} from '../../../infra/constants/structure-types'
import {ElementsPreview} from '../../components/ElementsPreview'
import {ElementsComparison} from '../../components/ElementsComparison'
import {PagesList} from '../../components/PagesList'

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

  const {elements, actualElements, expectedElements} = useTracker(() => {
    if (!selectedPageId) return {}
    const sub = Meteor.subscribe('elements.byPageId', {pageId: selectedPageId})
    const elements = ElementsCollection.find(structureType ? {'structure.type': structureType} : {}).fetch()
    const actualElements = ElementsCollection.find({'structure.type': STRUCTURE_TYPES.ACTUAL}).fetch()
    const expectedElements = ElementsCollection.find({'structure.type': STRUCTURE_TYPES.EXPECTED}).fetch()

    return {
      elements,
      actualElements,
      expectedElements,
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

  const handleCreatePage = () => {
    createPage.call({
      appId: state.selectedAppId,
      name: pageName,
      path: pagePath,
    })
  }

  return (
    <SidebarLayout contentComponent={<ElementsPreview elements={elements} selectedPageId={selectedPageId} />}>
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
      <PagesList
        pages={pages}
        selectedPageId={selectedPageId}
        onSelectPage={(pageId) => setSelectedPageId(pageId)}
        showRemove
      />
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
      {!structureType ? (
        <ElementsComparison actual={actualElements} expected={expectedElements} />
      ) : (
        <ElementsTree elements={elements} />
      )}
    </SidebarLayout>
  )
}
