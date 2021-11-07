import React, {useState} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {ElementsCollection} from '../../../collections/elements'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {ElementsTree} from '../../containers/elements/ElementsTree'
import {ElementsPreview} from '../../components/ElementsPreview'
import {useParams} from 'react-router-dom'
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

export const ViewPage = () => {
  const {id: pageId} = useParams() || {}
  const [layoutComponentId, setLayoutComponentId] = useState()

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

  const {previewElements, treeElements, layoutHasChildrenContainer} = useTracker(() => {
    if (!pageId || !layoutComponentId) return {}
    const subs = [
      Meteor.subscribe('components.byId', {_id: layoutComponentId}),
      Meteor.subscribe('elements.byComponentId', {componentId: layoutComponentId}),
      Meteor.subscribe('elements.byPageId', {pageId}),
    ]
    const pageElements = ElementsCollection.find({pageId, 'structure.type': STRUCTURE_TYPES.EXPECTED}).fetch()
    const layoutComponent = ComponentsCollection.findOne({_id: layoutComponentId})
    const layoutElements = ElementsCollection.find({componentId: layoutComponentId}).fetch()

    const layoutChildrenContainer = layoutElements.find((el) => el?._id === layoutComponent?.childrenContainerElementId)

    let previewElements = layoutElements
    let treeElements = layoutElements

    if (layoutChildrenContainer) {
      const mainLayoutContainerElement = layoutElements.find((el) => !el.parentId)
      const pageElementsInLayoutContainer = pageElements.map((el) =>
        !el.parentId ? {...el, parentId: layoutChildrenContainer._id} : el,
      )
      previewElements = [
        ...layoutElements.filter((el) => el.parentId !== layoutChildrenContainer._id),
        ...pageElementsInLayoutContainer,
      ]
      treeElements = [
        ...pageElementsInLayoutContainer,
        {...layoutChildrenContainer, component: mainLayoutContainerElement?.component, parentId: undefined},
      ]
    }

    return {
      previewElements,
      treeElements,
      layoutHasChildrenContainer: !!layoutChildrenContainer,
      loading: subs.some((sub) => !sub.ready()),
    }
  }, [pageId, layoutComponentId])

  const {components} = useTracker(() => {
    const sub = Meteor.subscribe('components.byCategory', {category: COMPONENT_CATEGORIES.LAYOUTS})
    const components = ComponentsCollection.find({category: COMPONENT_CATEGORIES.LAYOUTS}).fetch()

    return {
      components,
      loading: !sub.ready(),
    }
  }, [])

  const savePage = useMethod('pages.update', {
    onSuccess: () => {},
  })

  const onSubmit = ({name, path}) => {
    savePage.call({_id: page?._id, name, path, layoutComponentId})
  }

  return (
    <SidebarLayout menuMinimized contentComponent={<ElementsPreview elements={previewElements} />}>
      <PageHeader title={page?.name} />
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
              <ElementsTree
                targetPage={page}
                elements={treeElements}
                addElementDisabled={!layoutHasChildrenContainer}
              />
              <div className="mb-2" />
            </>
          )}
        </>
      )}
    </SidebarLayout>
  )
}
