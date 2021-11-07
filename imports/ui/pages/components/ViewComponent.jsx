import React, {useEffect, useState} from 'react'
import {ComponentsCollection} from '../../../collections/components'
import {useTracker} from 'meteor/react-meteor-data'
import {ElementsCollection} from '../../../collections/elements'
import {SidebarLayout} from '../../components/layouts/SidebarLayout'
import {ElementsTree} from '../../containers/elements/ElementsTree'
import {ElementsPreview} from '../../components/ElementsPreview'
import {SelectorsCollection} from '../../../collections/selectors'
import {ManageStyles} from './components/ManageStyles'
import {ManageStates} from './components/ManageStates'
import {ClassesInput} from './components/ClassesInput'
import {useParams} from 'react-router-dom'
import {PageHeader} from '../../components/PageHeader'
import {CUSTOM_ATTR_KEYS} from '../../../infra/constants/custom-attr-keys'

export const ViewComponent = () => {
  const {id: componentId} = useParams() || {}
  const [selectedState, setSelectedState] = useState()
  const [selectedStyle, setSelectedStyle] = useState()
  const [selectedSelectorValue, setSelectedSelectorValue] = useState()

  const {component} = useTracker(() => {
    if (!componentId) return {}
    const sub = Meteor.subscribe('components.byId', {componentId})
    const component = ComponentsCollection.findOne({_id: componentId})

    return {
      component,
      loading: !sub.ready(),
    }
  }, [componentId])

  const {elements} = useTracker(() => {
    if (!componentId) return {}
    const sub = Meteor.subscribe('elements.byComponentId', {componentId})
    const elements = ElementsCollection.find()
      .fetch()
      .map((el) => (!el.parentId ? {...el, attrs: {...el.attrs, [CUSTOM_ATTR_KEYS.COMPONENT]: component.name}} : el))

    return {
      elements,
      loading: !sub.ready(),
    }
  }, [componentId, component])

  const {selectors} = useTracker(() => {
    if (!componentId) return {}
    const sub = Meteor.subscribe('selectors.byComponentId', {componentId})
    const selectors = SelectorsCollection.find({componentId}).fetch()

    return {
      selectors,
      loading: !sub.ready(),
    }
  }, [componentId])

  const selectedSelector = selectors?.find((selector) => selector.value === selectedSelectorValue)

  useEffect(() => {
    setSelectedState(component?.states?.[0])
    setSelectedStyle(component?.styles?.[0])
  }, [component])

  return (
    <SidebarLayout
      menuMinimized
      contentComponent={
        <ElementsPreview
          elements={elements}
          selectedComponentId={component?._id}
          selectedStyle={selectedStyle}
          selectedState={selectedState}
        />
      }
    >
      <PageHeader title={component?.name} />
      {component?._id && (
        <>
          <ElementsTree
            targetComponent={component}
            elements={elements}
            onElementClick={(element) => {
              if (element.component?.name) {
                setSelectedSelectorValue('')
              }
            }}
          />
          <div className="mb-2" />
          <input
            placeholder="Selector"
            value={selectedSelectorValue}
            onChange={(e) => setSelectedSelectorValue(e.target.value)}
            className="w-full p-2 mb-2 border"
          />
          <ClassesInput
            componentId={component._id}
            selectorId={selectedSelector?._id}
            selectorValue={selectedSelectorValue}
            classes={selectedSelector?.classes}
          />
          <ManageStyles
            componentId={component._id}
            styles={component?.styles}
            selectedStyle={selectedStyle}
            onChangeStyle={(style) => setSelectedStyle(style)}
          />
          <ClassesInput
            componentId={component._id}
            selectorId={selectedSelector?._id}
            selectorValue={selectedSelectorValue}
            classes={selectedSelector?.classesByStyles?.find(({style}) => style === selectedStyle)?.classes}
            style={selectedStyle}
            disabled={!component?.styles || component?.styles.length <= 0}
          />
          <ManageStates
            componentId={component._id}
            states={component?.states}
            selectedState={selectedState}
            onChangeState={(state) => setSelectedState(state)}
          />
          <ClassesInput
            componentId={component._id}
            selectorId={selectedSelector?._id}
            selectorValue={selectedSelectorValue}
            classes={selectedSelector?.classesByStates?.find(({state}) => state === selectedState)?.classes}
            state={selectedState}
            disabled={!component?.states || component?.states.length <= 0}
          />
        </>
      )}
    </SidebarLayout>
  )
}
