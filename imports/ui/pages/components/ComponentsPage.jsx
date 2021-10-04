import React, {useEffect, useState} from 'react'
import {useAppContext} from '../../app/AuthContext'
import {ComponentsCollection} from '../../../collections/components'
import {useTracker} from 'meteor/react-meteor-data'
import {ElementsCollection} from '../../../collections/elements'
import {SidebarLayout} from '../../layouts/SidebarLayout'
import {ElementsTree} from '../../components/ElementsTree'
import {ElementsPreview} from '../../components/ElementsPreview'
import {SelectorsCollection} from '../../../collections/selectors'
import {generateCss} from '../../../api/generate-css'
import {ManageStyles} from './components/ManageStyles'
import {ManageStates} from './components/ManageStates'
import {ClassesInput} from './components/ClassesInput'
import {NewComponent} from './components/NewComponent'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/pro-solid-svg-icons'
import {LENNA_ATTR_KEYS} from '../../../infra/constants/lenna-attr-keys'

export const ComponentsPage = () => {
  const {state} = useAppContext()
  const [selectedComponentId, setSelectedComponentId] = useState()
  const [componentSearchValue, setComponentSearchValue] = useState('')
  const [selectedState, setSelectedState] = useState()
  const [selectedStyle, setSelectedStyle] = useState()
  const [selectedSelectorValue, setSelectedSelectorValue] = useState()
  const [css, setCss] = useState('')
  const [createComponentMode, setCreateComponentMode] = useState()

  const {components} = useTracker(() => {
    if (!state.selectedAppId) return {}
    const sub = Meteor.subscribe('components.byAppId', {appId: state.selectedAppId})
    const components = ComponentsCollection.find({
      name: {$regex: componentSearchValue, $options: 'i'},
    }).fetch()

    return {
      components,
      status: sub.ready() ? 'ready' : 'loading',
    }
  }, [state.selectedAppId, componentSearchValue])

  const {elements} = useTracker(() => {
    if (!selectedComponentId) return {}
    const sub = Meteor.subscribe('elements.byComponentId', {componentId: selectedComponentId})
    const elements = ElementsCollection.find().fetch()

    return {
      elements,
      status: sub.ready() ? 'ready' : 'loading',
    }
  }, [selectedComponentId])

  const selectedComponent = components?.find((component) => component._id === selectedComponentId)

  const {selectors} = useTracker(() => {
    if (!selectedComponentId) return {}
    const sub = Meteor.subscribe('selectors.byComponentId', {componentId: selectedComponentId})
    const selectors = SelectorsCollection.find().fetch()

    const css = generateCss({selectors})
    setCss(css)

    return {
      selectors,
      status: sub.ready() ? 'ready' : 'loading',
    }
  }, [selectedComponentId])

  const selectedSelector = selectors?.find((selector) => selector.value === selectedSelectorValue)

  useEffect(() => {
    setSelectedState(selectedComponent?.states?.[0])
    setSelectedStyle(selectedComponent?.styles?.[0])
  }, [selectedComponent])

  return (
    <SidebarLayout
      contentComponent={
        <>
          <style>{css}</style>
          <div className="">
            <ElementsPreview elements={elements} />
          </div>
        </>
      }
    >
      <div className="flex">
        <div className="flex-1">
          <div className="">
            <input
              type="text"
              placeholder="Components"
              value={componentSearchValue}
              onChange={(e) => setComponentSearchValue(e.target.value)}
              className="py-2 w-full outline-none"
            />
          </div>
        </div>
        <div className="">
          <button
            type="button"
            className="w-6 h-6 border rounded-sm hover:bg-gray-100"
            onClick={() => setCreateComponentMode((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faPlus} className="p-0" />
          </button>
        </div>
      </div>
      {createComponentMode && <NewComponent />}
      <div className="border-b mb-2">
        {components?.map((comp) => (
          <div
            key={comp._id}
            className={`flex border border-b-0 px-2 py-1 w-full text-left cursor-pointer ${
              comp._id === selectedComponentId ? 'bg-blue-50 text-blue-500' : ''
            }`}
            onClick={() => setSelectedComponentId((prev) => (prev === comp._id ? undefined : comp._id))}
          >
            {comp.name}
          </div>
        ))}
      </div>
      {selectedComponent?._id && (
        <>
          <div className="text-2xs border px-1 border-b-0 bg-gray-50">
            [{LENNA_ATTR_KEYS.COMPONENT}="{selectedComponent.name}"]
          </div>
          <input
            placeholder="Selector"
            value={selectedSelectorValue}
            onChange={(e) => setSelectedSelectorValue(e.target.value)}
            className="w-full p-2 mb-2 border"
          />
          <ElementsTree
            elements={elements}
            onElementClick={(element) => {
              if (element.component?.name) {
                setSelectedSelectorValue('')
              }
            }}
          />
          <div className="mb-2" />
          <ClassesInput
            componentId={selectedComponent._id}
            selectorId={selectedSelector?._id}
            selectorValue={selectedSelectorValue}
            classes={selectedSelector?.classes}
          />
          <ManageStyles
            componentId={selectedComponent._id}
            styles={selectedComponent?.styles}
            selectedStyle={selectedStyle}
            onChangeStyle={(style) => setSelectedStyle(style)}
          />
          <ClassesInput
            componentId={selectedComponent._id}
            selectorId={selectedSelector?._id}
            selectorValue={selectedSelectorValue}
            classes={selectedSelector?.classesByStyles?.find(({style}) => style === selectedStyle)?.classes}
            style={selectedStyle}
            disabled={!selectedComponent?.styles || selectedComponent?.styles.length <= 0}
          />
          <ManageStates
            componentId={selectedComponent._id}
            states={selectedComponent?.states}
            selectedState={selectedState}
            onChangeState={(state) => setSelectedState(state)}
          />
          <ClassesInput
            componentId={selectedComponent._id}
            selectorId={selectedSelector?._id}
            selectorValue={selectedSelectorValue}
            classes={selectedSelector?.classesByStates?.find(({state}) => state === selectedState)?.classes}
            state={selectedState}
            disabled={!selectedComponent?.states || selectedComponent?.states.length <= 0}
          />
        </>
      )}
    </SidebarLayout>
  )
}
