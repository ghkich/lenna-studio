import React, {useEffect, useState} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {ElementsTree} from '../../containers/elements/ElementsTree'
import {ElementsPreview} from '../../components/ElementsPreview'
import {useHistory, useParams} from 'react-router-dom'
import {PageHeader} from '../../components/PageHeader'
import {PagesCollection} from '../../../collections/pages'
import {TextInput} from '../../components/basic/TextInput'
import {useMethod} from '../../../infra/hooks/useMethod'
import {Select} from '../../components/basic/Select'
import {COMPONENT_CATEGORIES} from '../../../infra/constants/component-categories'
import {ComponentsCollection} from '../../../collections/components'
import {Form} from '../../components/form/Form'
import {STRUCTURE_TYPES} from '../../../infra/constants/structure-types'
import {Button} from '../../components/basic/Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRightArrowLeft} from '@fortawesome/pro-duotone-svg-icons'
import {ElementsComparison} from '../../components/ElementsComparison'
import {RoutePaths} from '../../app/routes'
import {usePageLayoutElements} from '../../hooks/usePageLayoutElements'

export const ViewPage = () => {
  const {appId, pageId} = useParams() || {}
  const history = useHistory()
  const [layoutComponentId, setLayoutComponentId] = useState()
  const [structureType, setStructureType] = useState(STRUCTURE_TYPES.EXPECTED)

  const {page} = useTracker(() => {
    if (!pageId) return {}
    const sub = Meteor.subscribe('pages.byId', {pageId})
    const page = PagesCollection.findOne({_id: pageId})

    setLayoutComponentId(page?.layoutComponentId)

    return {
      page,
      loading: !sub.ready(),
    }
  }, [pageId])

  const {actualElements, previewElements, treeElements, layoutHasChildrenContainer, loading} = usePageLayoutElements({
    pageId,
    layoutComponentId,
  })

  if (page && !loading) {
    window.top.postMessage({message: 'pageAccess', pagePath: page.path}, '*')
  }

  useEffect(() => {
    if (structureType === STRUCTURE_TYPES.ACTUAL) {
      window.top.postMessage({message: 'toggleView', value: 'sidebar'}, '*')
    } else {
      window.top.postMessage({message: 'toggleView', value: 'full'}, '*')
    }
    return () => {
      window.top.postMessage({message: 'toggleView', value: 'sidebar'}, '*')
    }
  }, [structureType])

  const {components} = useTracker(() => {
    const sub = Meteor.subscribe('components.byCategory', {appId, category: COMPONENT_CATEGORIES.LAYOUTS})
    const components = ComponentsCollection.find({appId, category: COMPONENT_CATEGORIES.LAYOUTS}).fetch()

    return {
      components,
      loading: !sub.ready(),
    }
  }, [])

  const savePage = useMethod('pages.update', {
    onSuccess: () => {},
  })

  const removePage = useMethod('pages.remove', {
    onSuccess: () => {
      history.push(`${RoutePaths.APPS}/${appId}${RoutePaths.PAGES}`)
    },
  })

  const onSubmit = ({name, path}) => {
    savePage.call({...page, appId, name, path, layoutComponentId})
  }

  return (
    <SidebarLayout
      menuMinimized
      contentComponent={
        <ElementsPreview
          appId={appId}
          elements={structureType === STRUCTURE_TYPES.ACTUAL ? actualElements : previewElements}
        />
      }
    >
      <PageHeader
        title={page?.name}
        goBackTo={`${RoutePaths.APPS}/${appId}${RoutePaths.PAGES}`}
        onDelete={() => removePage.call(page?._id)}
        showCopyButton
      />
      {page?.name && (
        <>
          <Form onSubmit={onSubmit} defaultValues={{name: page.name, path: page.path}}>
            <TextInput name="name" placeholder="Name" />
            <TextInput name="path" placeholder="Route path" />
            <Select
              value={layoutComponentId}
              onChange={(e) => setLayoutComponentId(e.target.value)}
              options={[
                {value: '', label: 'Choose a layout component...'},
                ...components?.map((comp) => ({value: comp._id, label: comp.name})),
              ]}
            />
            <div className="flex gap-2 pb-2 mb-2 border-b">
              <Button type="submit" className="flex-1">
                Save
              </Button>
            </div>
          </Form>
          {page?._id && treeElements?.length > 0 && (
            <>
              <div className="flex mb-2">
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
                    structureType === undefined ? 'text-white bg-blue-500 border-blue-600' : ''
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
              {!structureType && <ElementsComparison actual={actualElements} expected={treeElements} />}
              {structureType === STRUCTURE_TYPES.EXPECTED && (
                <ElementsTree
                  appId={appId}
                  targetPage={page}
                  elements={treeElements}
                  addElementDisabled={!layoutHasChildrenContainer}
                />
              )}
              {structureType === STRUCTURE_TYPES.ACTUAL && (
                <>
                  {actualElements.length > 0 ? (
                    <ElementsTree elements={actualElements} addElementDisabled />
                  ) : (
                    <div className="bg-gray-50 border p-2 text-center text-2xs">
                      No elements received for <b>{page.path}</b>.
                    </div>
                  )}
                </>
              )}
              <div className="mb-2" />
            </>
          )}
        </>
      )}
    </SidebarLayout>
  )
}
