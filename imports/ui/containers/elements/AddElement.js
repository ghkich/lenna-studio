import React, {useEffect, useState} from 'react'
import {useTracker} from 'meteor/react-meteor-data'
import {COMPONENT_CATEGORIES} from '../../../infra/constants/component-categories'
import {ComponentsCollection} from '../../../collections/components'
import {Select} from '../../components/basic/Select'
import {Form} from '../../components/form/Form'
import {useMethod} from '../../../infra/hooks/useMethod'
import {Button} from '../../components/basic/Button'
import {STRUCTURE_TYPES} from '../../../infra/constants/structure-types'
import {TextInput} from '../../components/basic/TextInput'

export const ELEMENT_TYPES = {
  COMPONENT: 'Component',
  TAG: 'Tag',
  TEXT: 'Text',
}

export const AddElement = ({parentElement}) => {
  const [addMode, setAddMode] = useState(false)
  const [selectedElementType, setSelectedElementType] = useState(ELEMENT_TYPES.TAG)
  const [selectedComponentCategory, setSelectedComponentCategory] = useState()
  const [selectedComponentId, setSelectedComponentId] = useState()
  const [selectedComponentStyle, setSelectedComponentStyle] = useState()
  const [selectedComponentState, setSelectedComponentState] = useState()

  const {components = []} = useTracker(() => {
    if (!selectedComponentCategory) return {}
    const sub = Meteor.subscribe('components.byCategory', {category: selectedComponentCategory})
    const components = ComponentsCollection.find({category: selectedComponentCategory}).fetch()

    return {
      components,
      loading: !sub.ready(),
    }
  }, [selectedComponentCategory])

  const selectedComponent = components?.find((comp) => comp._id === selectedComponentId)

  useEffect(() => {
    if (selectedComponent) {
      setSelectedComponentStyle(selectedComponent.styles?.[0])
      setSelectedComponentState(selectedComponent.states?.[0])
    }
  }, [selectedComponent])

  const addElement = useMethod('elements.create', {
    onSuccess: (teste) => {
      console.log('teste', teste)
    },
  })

  const handleSubmit = (formValues) => {
    let component
    let tagName
    let text
    if (selectedElementType === ELEMENT_TYPES.COMPONENT) {
      component = {
        _id: selectedComponentId,
        style: selectedComponentStyle,
        state: selectedComponentState,
      }
    }
    if (selectedElementType === ELEMENT_TYPES.TAG) {
      tagName = formValues.tagName
    }
    if (selectedElementType === ELEMENT_TYPES.TEXT) {
      text = formValues.text
    }
    addElement.call({
      appId: parentElement.appId,
      pageId: parentElement.pageId,
      componentId: parentElement.componentId,
      parentId: parentElement._id,
      component,
      tagName,
      text,
      structure: {
        type: STRUCTURE_TYPES.EXPECTED,
      },
    })
  }

  return (
    <div>
      {!addMode ? (
        <Button type="button" onClick={() => setAddMode(true)} className="w-full">
          Add element
        </Button>
      ) : (
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <Select
              value={selectedElementType}
              onChange={(e) => setSelectedElementType(e.target.value)}
              options={Object.values(ELEMENT_TYPES).map((type) => ({value: type, label: type}))}
            />
            {selectedElementType === ELEMENT_TYPES.COMPONENT && (
              <>
                <Select
                  value={selectedComponentCategory}
                  onChange={(e) => setSelectedComponentCategory(e.target.value)}
                  options={[
                    {value: '', label: 'Choose a component category...'},
                    ...Object.values(COMPONENT_CATEGORIES)
                      ?.filter((category) => category !== COMPONENT_CATEGORIES.LAYOUTS)
                      .map((category) => ({value: category, label: category})),
                  ]}
                />
                <Select
                  value={selectedComponentId}
                  onChange={(e) => setSelectedComponentId(e.target.value)}
                  options={[
                    {value: '', label: 'Choose a component...'},
                    ...components?.map((comp) => ({value: comp._id, label: comp.name})),
                  ]}
                />
                <div className="flex gap-1">
                  {selectedComponent?.styles?.length > 0 && (
                    <Select
                      value={selectedComponentStyle}
                      onChange={(e) => setSelectedComponentStyle(e.target.value)}
                      options={selectedComponent.styles.map((style) => ({value: style, label: style}))}
                      className="flex-1"
                    />
                  )}
                  {selectedComponent?.states?.length > 0 && (
                    <Select
                      value={selectedComponentState}
                      onChange={(e) => setSelectedComponentState(e.target.value)}
                      options={selectedComponent.states.map((state) => ({value: state, label: state}))}
                      className="flex-1"
                    />
                  )}
                </div>
              </>
            )}
            {selectedElementType === ELEMENT_TYPES.TAG && (
              <>
                <TextInput name="tagName" placeholder="Tag name" />
              </>
            )}
            {selectedElementType === ELEMENT_TYPES.TEXT && (
              <>
                <TextInput name="text" placeholder="Text" />
              </>
            )}
            <div className="flex gap-1 border-t pt-1">
              <Button type="button" onClick={() => setAddMode(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Add
              </Button>
            </div>
          </div>
        </Form>
      )}
    </div>
  )
}
